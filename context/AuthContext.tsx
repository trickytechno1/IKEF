'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import {
  MemberItem,
  VocabItem,
  OpportunityItem,
  EventItem
} from '../lib/data';
import {
  subscribeMembers,
  subscribeVocabulary,
  subscribeOpportunities,
  subscribeEvents,
  cleanDatabase,
  registerUserInFirestore,
  createSampleRegistration,
  updateMemberVerificationInFirestore,
  RegisterPayload
} from '../lib/dbService';

interface AuthContextType {
  user: User | null;
  authLoading: boolean;
  emailVerified: boolean;
  members: MemberItem[];
  vocabulary: VocabItem[];
  opportunities: OpportunityItem[];
  events: EventItem[];
  dbConnected: boolean;
  
  // Auth methods
  signUp: (email: string, pass: string) => Promise<{ success: boolean; message: string; user?: User }>;
  signIn: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  resendVerification: () => Promise<{ success: boolean; message: string }>;

  // Database actions
  registerMember: (payload: RegisterPayload) => Promise<{ success: boolean; message: string; memberId?: number }>;
  verifyMemberByAdmin: (memberId: number, verified: boolean) => Promise<boolean>;
  triggerSampleRegistration: () => Promise<{ success: boolean; name: string }>;
  cleanAndResetDb: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);

  const [members, setMembers] = useState<MemberItem[]>([]);
  const [vocabulary, setVocabulary] = useState<VocabItem[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [dbConnected, setDbConnected] = useState(true);

  // 1. Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setEmailVerified(currentUser ? currentUser.emailVerified : false);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore Subscriptions
  useEffect(() => {
    const unsubMembers = subscribeMembers((data) => setMembers(data));
    const unsubVocab = subscribeVocabulary((data) => setVocabulary(data));
    const unsubOpps = subscribeOpportunities((data) => setOpportunities(data));
    const unsubEvents = subscribeEvents((data) => setEvents(data));

    return () => {
      unsubMembers();
      unsubVocab();
      unsubOpps();
      unsubEvents();
    };
  }, []);

  // SignUp with Email Verification
  const signUp = async (email: string, pass: string) => {
    if (pass && pass.length < 6) {
      return { success: false, message: 'La pasvorto devas esti almenaŭ 6-simbola.' };
    }
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      if (userCred.user) {
        // Send email verification
        try {
          await sendEmailVerification(userCred.user);
        } catch (verifErr) {
          console.warn("Retpoŝta konfirmo ne povis esti sendita:", verifErr);
        }
        return {
          success: true,
          message: 'Konto kreita! Ni sendis retpoŝtan konfirmon. Bonvolu kontroli vian enirkeston.',
          user: userCred.user
        };
      }
      return { success: false, message: 'Ne eblis krei konton.' };
    } catch (err: any) {
      console.error("SignUp error:", err);
      let errMsg = err?.message || 'Eraro dum registrado.';
      if (err?.code === 'auth/email-already-in-use') {
        errMsg = 'Tiu retpoŝto jam estas uzata por alia konto.';
      } else if (err?.code === 'auth/weak-password') {
        errMsg = 'La pasvorto devas esti almenaŭ 6-simbola.';
      } else if (err?.code === 'auth/operation-not-allowed') {
        // Firebase Auth Email/Password sign-in provider is disabled in Firebase console.
        // Fallback gracefully so Firestore profile registration still succeeds.
        return {
          success: true,
          isGuestFallback: true,
          message: 'Retpoŝta/pasvorta aŭtentigo ne estas ebligita en la Firebase-konzolo, sed via profilo estos registrita en Firestore.'
        };
      }
      return { success: false, message: errMsg };
    }
  };

  // SignIn
  const signIn = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      return { success: true, message: 'Sukcese ensalutinta!' };
    } catch (err: any) {
      console.error("SignIn error:", err);
      let errMsg = 'Nevalida retpoŝto aŭ pasvorto.';
      if (err?.code === 'auth/operation-not-allowed') {
        errMsg = 'Pasvorta ensalutado ne estas ebligita en Firebase Console.';
      }
      return { success: false, message: errMsg };
    }
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  // Resend Email Verification
  const resendVerification = async () => {
    if (!auth.currentUser) return { success: false, message: 'Neniu uzanto ensalutinta.' };
    try {
      await sendEmailVerification(auth.currentUser);
      return { success: true, message: 'Konfirmeblo re-sendita al via retpoŝto.' };
    } catch (err: any) {
      return { success: false, message: `Eraro: ${err.message}` };
    }
  };

  // Register Member Profile in Firestore
  const registerMember = async (payload: RegisterPayload) => {
    return await registerUserInFirestore(payload, user?.uid);
  };

  // Admin Profile Verification Method
  const verifyMemberByAdmin = async (memberId: number, verified: boolean) => {
    return await updateMemberVerificationInFirestore(memberId, verified);
  };

  // Sample Registration Trigger
  const triggerSample = async () => {
    const res = await createSampleRegistration();
    return { success: res.success, name: res.name };
  };

  // Clean & Reset Firestore
  const cleanAndResetDb = async () => {
    return await cleanDatabase();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        emailVerified,
        members,
        vocabulary,
        opportunities,
        events,
        dbConnected,
        signUp,
        signIn,
        logout,
        resendVerification,
        registerMember,
        verifyMemberByAdmin,
        triggerSampleRegistration: triggerSample,
        cleanAndResetDb
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
