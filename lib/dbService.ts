import {
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';
import {
  INITIAL_VOCABULARY,
  INITIAL_MEMBERS,
  FEATURED_OPPORTUNITIES,
  UPCOMING_EVENTS,
  MemberItem,
  VocabItem,
  OpportunityItem,
  EventItem
} from './data';

// Sanitization & Security Helper
export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
}

// 1. Members Subscription & Operations
export function subscribeMembers(onUpdate: (members: MemberItem[]) => void) {
  const colRef = collection(db, 'members');
  const q = query(colRef, orderBy('id', 'desc'));

  return onSnapshot(q, (snapshot) => {
    if (snapshot.empty) {
      // Seed initial members if empty
      seedInitialMembers().then(() => {
        // Will re-trigger snapshot
      });
      return;
    }

    const items: MemberItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as MemberItem;
      items.push({
        ...data,
        id: data.id || parseInt(docSnap.id.replace(/\D/g, '') || '999', 10)
      });
    });

    onUpdate(items);
  }, (err) => {
    console.error("Firestore members subscription error:", err);
    // Fallback to local
    onUpdate(INITIAL_MEMBERS);
  });
}

// 2. Vocabulary Subscription & Operations
export function subscribeVocabulary(onUpdate: (vocab: VocabItem[]) => void) {
  const colRef = collection(db, 'vocabulary');
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      seedInitialVocabulary();
      return;
    }
    const items: VocabItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push(docSnap.data() as VocabItem);
    });
    // Sort by termEo
    items.sort((a, b) => a.termEo.localeCompare(b.termEo));
    onUpdate(items);
  }, (err) => {
    console.error("Firestore vocabulary subscription error:", err);
    onUpdate(INITIAL_VOCABULARY);
  });
}

// 3. Opportunities Subscription
export function subscribeOpportunities(onUpdate: (opps: OpportunityItem[]) => void) {
  const colRef = collection(db, 'opportunities');
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      seedInitialOpportunities();
      return;
    }
    const items: OpportunityItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push(docSnap.data() as OpportunityItem);
    });
    onUpdate(items);
  }, (err) => {
    console.error("Firestore opportunities subscription error:", err);
    onUpdate(FEATURED_OPPORTUNITIES);
  });
}

// 4. Events Subscription
export function subscribeEvents(onUpdate: (events: EventItem[]) => void) {
  const colRef = collection(db, 'events');
  return onSnapshot(colRef, (snapshot) => {
    if (snapshot.empty) {
      seedInitialEvents();
      return;
    }
    const items: EventItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push(docSnap.data() as EventItem);
    });
    onUpdate(items);
  }, (err) => {
    console.error("Firestore events subscription error:", err);
    onUpdate(UPCOMING_EVENTS);
  });
}

// SEED FUNCTIONS
export async function seedInitialMembers() {
  try {
    for (const member of INITIAL_MEMBERS) {
      const docRef = doc(db, 'members', `member_${member.id}`);
      await setDoc(docRef, {
        ...member,
        createdAt: new Date().toISOString()
      }, { merge: true });
    }
  } catch (err) {
    console.error("Failed to seed members:", err);
  }
}

export async function seedInitialVocabulary() {
  try {
    for (const vocab of INITIAL_VOCABULARY) {
      const docRef = doc(db, 'vocabulary', `vocab_${vocab.id}`);
      await setDoc(docRef, vocab, { merge: true });
    }
  } catch (err) {
    console.error("Failed to seed vocabulary:", err);
  }
}

export async function seedInitialOpportunities() {
  try {
    for (const opp of FEATURED_OPPORTUNITIES) {
      const docRef = doc(db, 'opportunities', `opp_${opp.id}`);
      await setDoc(docRef, opp, { merge: true });
    }
  } catch (err) {
    console.error("Failed to seed opportunities:", err);
  }
}

export async function seedInitialEvents() {
  try {
    for (const ev of UPCOMING_EVENTS) {
      const docRef = doc(db, 'events', `event_${ev.id}`);
      await setDoc(docRef, ev, { merge: true });
    }
  } catch (err) {
    console.error("Failed to seed events:", err);
  }
}

// CLEAN DATABASE
export async function cleanDatabase(): Promise<boolean> {
  try {
    const collectionsToClean = ['members', 'registrations', 'vocabulary', 'opportunities', 'events'];
    for (const colName of collectionsToClean) {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      const deletePromises = snapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    }

    // Re-seed with fresh structured initial data
    await seedInitialMembers();
    await seedInitialVocabulary();
    await seedInitialOpportunities();
    await seedInitialEvents();

    return true;
  } catch (err) {
    console.error("Error cleaning database:", err);
    return false;
  }
}

// SECURE USER REGISTRATION WITH SPAM & ROBOT PROTECTION
export interface RegisterPayload {
  name: string;
  email: string;
  country: string;
  countryCode: string;
  role: 'Player' | 'Coach' | 'Referee' | 'Organizer' | 'Researcher' | 'Scout' | 'Fan';
  roleEo: string;
  languages: string[];
  eoLevel: 'Komencanto' | 'Progresanto' | 'Spertulo' | 'Aglina / Denaska';
  bio: string;
  position?: string;
  club?: string;
  // Anti-spam security fields
  botField?: string; // Honeypot field (must be empty)
  securityChallengeAnswer?: string; // e.g., expected math or keyword answer
}

export async function registerUserInFirestore(payload: RegisterPayload, uid?: string): Promise<{ success: boolean; message: string; memberId?: number }> {
  // 1. Honeypot Bot Filter
  if (payload.botField && payload.botField.trim().length > 0) {
    console.warn("Bot detected via honeypot field!");
    return { success: false, message: "Spam detektita (Honeypot Trigger)." };
  }

  // 2. Input Sanitation
  const cleanName = sanitizeInput(payload.name);
  const cleanEmail = sanitizeInput(payload.email).toLowerCase();
  const cleanCountry = sanitizeInput(payload.country);
  const cleanCountryCode = sanitizeInput(payload.countryCode).toUpperCase().slice(0, 3);
  const cleanBio = sanitizeInput(payload.bio);

  if (!cleanName || cleanName.length < 2) {
    return { success: false, message: "Bonvolu inserigi validan nomon." };
  }

  if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
    return { success: false, message: "Bonvolu inserigi validan retpoŝton." };
  }

  const newId = Date.now();
  const memberObj: MemberItem = {
    id: newId,
    name: cleanName,
    email: cleanEmail,
    country: cleanCountry,
    countryCode: cleanCountryCode || 'EO',
    role: payload.role,
    roleEo: payload.roleEo || payload.role,
    languages: payload.languages.length > 0 ? payload.languages : ['eo'],
    eoLevel: payload.eoLevel,
    position: payload.position ? sanitizeInput(payload.position) : 'Pilkisto',
    club: payload.club ? sanitizeInput(payload.club) : 'IKEF Futbalo',
    bio: cleanBio,
    verified: false,
    avatarBg: 'bg-green-700'
  };

  try {
    // 3. Write Audit Log in registrations collection
    const regRef = collection(db, 'registrations');
    await addDoc(regRef, {
      uid: uid || `guest_${newId}`,
      email: cleanEmail,
      name: cleanName,
      status: 'pending_verification',
      securityPassed: true,
      createdAt: new Date().toISOString()
    });

    // 4. Save Member Profile in Firestore
    const memberDocRef = doc(db, 'members', `member_${newId}`);
    await setDoc(memberDocRef, {
      ...memberObj,
      uid: uid || null,
      emailVerified: false,
      createdAt: new Date().toISOString()
    });

    return {
      success: true,
      message: "Gratulon! Via profilo estas registrita en la datumbazo en reala tempo.",
      memberId: newId
    };
  } catch (err: any) {
    console.error("Error writing user registration to Firestore:", err);
    return {
      success: false,
      message: `Eraro dum konservado: ${err?.message || 'Nekonata eraro'}`
    };
  }
}

// SAMPLE USER REGISTRATION TRIGGER
export async function createSampleRegistration(): Promise<{ success: boolean; name: string; memberId: number }> {
  const sampleNames = ['Sébastien Lecomte', 'Mateo Rossi', 'Elena Santos', 'Lukas Becker', 'Hiroshi Yamamoto'];
  const sampleCountries = [
    { country: 'France', code: 'FR' },
    { country: 'Italy', code: 'IT' },
    { country: 'Brazil', code: 'BR' },
    { country: 'Germany', code: 'DE' },
    { country: 'Japan', code: 'JP' }
  ];
  
  const randIndex = Math.floor(Math.random() * sampleNames.length);
  const selectedName = sampleNames[randIndex];
  const selectedCountry = sampleCountries[randIndex];

  const payload: RegisterPayload = {
    name: selectedName,
    email: `${selectedName.toLowerCase().replace(/\s+/g, '.')}@esperanto.org`,
    country: selectedCountry.country,
    countryCode: selectedCountry.code,
    role: 'Player',
    roleEo: 'Ludanto',
    languages: ['eo', selectedCountry.code.toLowerCase()],
    eoLevel: 'Progresanto',
    bio: 'Ekzamena specimena aliĝo en reala tempo por IKEF Futbalo datumbazo.',
    club: 'IKEF Internacia',
    position: 'Mezkampulo'
  };

  const res = await registerUserInFirestore(payload);
  return {
    success: res.success,
    name: selectedName,
    memberId: res.memberId || Date.now()
  };
}

// ADMIN VERIFICATION OF MEMBER PROFILES
export async function updateMemberVerificationInFirestore(memberId: number, verified: boolean): Promise<boolean> {
  try {
    const memberDocRef = doc(db, 'members', `member_${memberId}`);
    await setDoc(memberDocRef, {
      verified: verified,
      verifiedByAdminAt: new Date().toISOString()
    }, { merge: true });
    return true;
  } catch (err) {
    console.error("Error updating member verification status:", err);
    return false;
  }
}
