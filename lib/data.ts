export interface VocabItem {
  id: number;
  termEo: string;
  termEn: string;
  category: 'Taktiko' | 'Tekniko' | 'Rolo' | 'Organizo' | 'Ekipaĵo' | 'Reguloj' | 'Evento';
  definitionEo?: string;
  exampleEo?: string;
}

export interface MemberItem {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  role: 'Player' | 'Coach' | 'Referee' | 'Organizer' | 'Researcher' | 'Scout' | 'Fan';
  roleEo: string;
  languages: string[];
  eoLevel: 'Komencanto' | 'Progresanto' | 'Spertulo' | 'Aglina / Denaska';
  position?: string;
  club?: string;
  bio: string;
  email?: string;
  verified: boolean;
  avatarBg?: string;
}

export interface OpportunityItem {
  id: number;
  titleEo: string;
  titleEn: string;
  organization: string;
  location: string;
  type: 'Trial' | 'Contract' | 'Scholarship' | 'Exchange';
  typeEo: string;
  descriptionEo: string;
  descriptionEn: string;
  requirementsEo: string[];
  requirementsEn: string[];
  deadline: string;
  featured: boolean;
  tags: string[];
}

export interface EventItem {
  id: number;
  titleEo: string;
  titleEn: string;
  date: string;
  location: string;
  type: 'Match' | 'Congress' | 'Webinar' | 'Training';
  descriptionEo: string;
  descriptionEn: string;
  attendeesCount: number;
}

// 30+ Football vocabulary words
export const INITIAL_VOCABULARY: VocabItem[] = [
  {
    id: 1,
    termEo: 'Golo',
    termEn: 'Goal',
    category: 'Taktiko',
    definitionEo: 'Pilkpaserigo trans la golevidentan linion en la kontraŭulan reton.',
    exampleEo: 'La striketo pafis mirindan golon de 25 metroj!'
  },
  {
    id: 2,
    termEo: 'Paso',
    termEn: 'Pass',
    category: 'Tekniko',
    definitionEo: 'Pilkdissendo al samteamo.',
    exampleEo: 'Lerta paso tra la defenda linio kreis la ŝancon.'
  },
  {
    id: 3,
    termEo: 'Defendo',
    termEn: 'Defense',
    category: 'Taktiko',
    definitionEo: 'La taktika organizo por malebligi al la kontraŭulo skori golojn.',
    exampleEo: 'Nia defendo restis trankvila kaj forta dum la tuta matĉo.'
  },
  {
    id: 4,
    termEo: 'Striketo',
    termEn: 'Striker',
    category: 'Rolo',
    definitionEo: 'Antaŭa atakanto kies ĉefa tasko estas skori golojn.',
    exampleEo: 'La rapidpieda striketo jam trafis 15 golojn ĉi-sezone.'
  },
  {
    id: 5,
    termEo: 'Arbitraciisto',
    termEn: 'Referee',
    category: 'Rolo',
    definitionEo: 'La oficisto prizorganta la respekton de la futbalaj reguloj dum matĉo.',
    exampleEo: 'La arbitraciisto fajfis la matĉkomencon je la 15:00 horo.'
  },
  {
    id: 6,
    termEo: 'Trejnisto',
    termEn: 'Coach',
    category: 'Rolo',
    definitionEo: 'La teknika gvidanto respondeca pri taktiko, fiziko kaj teamformado.',
    exampleEo: 'La trejnisto klarigis la novan forman Taktikon 4-3-3.'
  },
  {
    id: 7,
    termEo: 'Ekipo',
    termEn: 'Team',
    category: 'Organizo',
    definitionEo: 'Grupo de 11 ludantoj kunbatalantaj sur la ludejo.',
    exampleEo: 'Nia internacia ekipo konsistas el ludantoj de 8 landoj.'
  },
  {
    id: 8,
    termEo: 'Stadiono',
    termEn: 'Stadium',
    category: 'Ekipaĵo',
    definitionEo: 'Sporta konstruaĵo kun futbalejo kaj spektantejoj.',
    exampleEo: 'La matĉo okazos en la ĉefa urba stadiono.'
  },
  {
    id: 9,
    termEo: 'Pilkisto',
    termEn: 'Footballer',
    category: 'Rolo',
    definitionEo: 'Persono kiu ludas futbalon amatore aŭ profesie.',
    exampleEo: 'Ĉiu Esperantista pilkisto estas bonvena en IKEF Futbalo.'
  },
  {
    id: 10,
    termEo: 'Futbalejo',
    termEn: 'Football field',
    category: 'Ekipaĵo',
    definitionEo: 'La herba aŭ sinteza ludejo kun difinitaj markolinioj.',
    exampleEo: 'La herbo sur la futbalejo estis perfekte tondita.'
  },
  {
    id: 11,
    termEo: 'Golulo',
    termEn: 'Goalkeeper',
    category: 'Rolo',
    definitionEo: 'La sola ludanto permesita uzi la manojn en sia punareo.',
    exampleEo: 'La golulo kaptis la danĝeran pafon en la lasta minuto.'
  },
  {
    id: 12,
    termEo: 'Kornero',
    termEn: 'Corner',
    category: 'Taktiko',
    definitionEo: 'Kvara angulŝoto kiam la pilko eliras preter la fona linio per defendanto.',
    exampleEo: 'El la kornero nia centra defendisto skoris per kapŝoto.'
  },
  {
    id: 13,
    termEo: 'Punalto',
    termEn: 'Penalty',
    category: 'Reguloj',
    definitionEo: 'Rekta ŝoto de la punpunkto (11 m) pro bafo en la punareo.',
    exampleEo: 'La kapitano trankvile konvertis la punalton.'
  },
  {
    id: 14,
    termEo: 'Asististo',
    termEn: 'Assistant',
    category: 'Rolo',
    definitionEo: 'Liniulo aŭ la helpanto de la ĉefa arbitraciisto/trejnisto.',
    exampleEo: 'La asistista arbitraciisto altigis la flagon pro forŝoto.'
  },
  {
    id: 15,
    termEo: 'Turniro',
    termEn: 'Tournament',
    category: 'Evento',
    definitionEo: 'Serio da matĉoj inter pluraj teamoj por eltrovi la ĉampionon.',
    exampleEo: 'La UK-Futbala Turniro okazos dum la Somera Kongreso.'
  },
  {
    id: 16,
    termEo: 'Ligilo',
    termEn: 'Link',
    category: 'Organizo',
    definitionEo: 'Rilato aŭ federacia ligo inter kluboj kaj asocioj.',
    exampleEo: 'IKEF formas la oficialan ligilon inter Esperanto kaj sporta komerco.'
  },
  {
    id: 17,
    termEo: 'Respondeculo',
    termEn: 'Manager',
    category: 'Rolo',
    definitionEo: 'Administra gvidanto de la teamo aŭ sekcio.',
    exampleEo: 'La respondeculo prizorgis ĉiujn vojaĝdokumentojn de la teamo.'
  },
  {
    id: 18,
    termEo: 'Taktiko',
    termEn: 'Tactics',
    category: 'Taktiko',
    definitionEo: 'Strategia plano de ludado kaj moviĝado sur la ludejo.',
    exampleEo: 'Alta premad-taktiko surprizis niajn kontraŭulojn.'
  },
  {
    id: 19,
    termEo: 'Tekniko',
    termEn: 'Technique',
    category: 'Tekniko',
    definitionEo: 'Persona lerteco kun la pilko (driblado, kontrolo, ŝoto).',
    exampleEo: 'Lia unua pilkokontrolo montras altnivelan teknikon.'
  },
  {
    id: 20,
    termEo: 'Fizioterapiisto',
    termEn: 'Physiotherapist',
    category: 'Rolo',
    definitionEo: 'Medicinaspertulo responda pri sano, masaĝo kaj resaniĝo de ludantoj.',
    exampleEo: 'La fizioterapiisto rapide diagnozis la muskolan vundon.'
  },
  // Additional terms to exceed 30+ total
  {
    id: 21,
    termEo: 'De flanko (Forŝoto)',
    termEn: 'Offside',
    category: 'Reguloj',
    definitionEo: 'Regulrompo kiam atakanto estas pli proksima al la fona linio ol la antaŭlasta defendanto kiam pilko estas pasata.',
    exampleEo: 'La golo estis nuligita pro forŝoto.'
  },
  {
    id: 22,
    termEo: 'Flava karto',
    termEn: 'Yellow card',
    category: 'Reguloj',
    definitionEo: 'Oficiala averto donita de la arbitraciisto pro malmilda faŭlo.',
    exampleEo: 'La defendanto ricevis flavan karton pro taktika faŭlo.'
  },
  {
    id: 23,
    termEo: 'Ruĝa karto',
    termEn: 'Red card',
    category: 'Reguloj',
    definitionEo: 'Eskpulso el la ludejo pro severa faŭlo aŭ du flavaj kartoj.',
    exampleEo: 'La ruĝa karto devigis la teamon ludi kun 10 homoj.'
  },
  {
    id: 24,
    termEo: 'Kapŝoto',
    termEn: 'Header',
    category: 'Tekniko',
    definitionEo: 'Bati la pilkon per la fronto de la kapo.',
    exampleEo: 'Lia potenca kapŝoto trafis la supran angulon de la reto.'
  },
  {
    id: 25,
    termEo: 'Driblado',
    termEn: 'Dribbling',
    category: 'Tekniko',
    definitionEo: 'Gvidi la pilkon per mallongaj tuŝoj preter kontraŭuloj.',
    exampleEo: 'Magia driblado preter tri defendantoj reĝojigis la publikon.'
  },
  {
    id: 26,
    termEo: 'Mezkampulo',
    termEn: 'Midfielder',
    category: 'Rolo',
    definitionEo: 'Ludanto funkcianta inter la defendo kaj atako.',
    exampleEo: 'La centra mezkampulo reĝisoris la tutan ludritmon.'
  },
  {
    id: 27,
    termEo: 'Flanka defendisto',
    termEn: 'Full-back / Wing-back',
    category: 'Rolo',
    definitionEo: 'Defendisto ludanta ĉe la maldekstra aŭ dekstra flanko.',
    exampleEo: 'Nia dekstra flanka defendisto ofte partoprenas la atakon.'
  },
  {
    id: 28,
    termEo: 'Kapitano',
    termEn: 'Captain',
    category: 'Rolo',
    definitionEo: 'Gvida ludanto reprezentanta la teamon sur la ludejo, portanta brakbendon.',
    exampleEo: 'La kapitano interŝanĝis flamstandardojn kun la kontraŭa teamo.'
  },
  {
    id: 29,
    termEo: 'Libera ŝoto',
    termEn: 'Free kick',
    category: 'Reguloj',
    definitionEo: 'Restartigo de la ludo post faŭlo, de la loko de la bafado.',
    exampleEo: 'Lia rekta libera ŝoto superpasis la muron kaj eniris la golon.'
  },
  {
    id: 30,
    termEo: 'Ligo / Ĉampioneco',
    termEn: 'League / Championship',
    category: 'Organizo',
    definitionEo: 'Longdaŭra konkurso inter kluboj kun punktopunktoj.',
    exampleEo: 'IKEF planas organizi la unuan Interkontinentan Esperanto-Ligon.'
  },
  {
    id: 31,
    termEo: 'Partio / Matĉo',
    termEn: 'Match / Game',
    category: 'Evento',
    definitionEo: 'Duoble 45-minuta konkurso inter du 11-homa teamoj.',
    exampleEo: 'La hodiaŭa amika matĉo finiĝis kun amikeca poentaro 2-2.'
  },
  {
    id: 32,
    termEo: 'Pilkokontrolo',
    termEn: 'Ball control / First touch',
    category: 'Tekniko',
    definitionEo: 'Kapacito mildigi kaj haltigi la pasatan pilkon per la piedo aŭ brusto.',
    exampleEo: 'Bona pilkokontrolo estas la fundamento de rapida futbalo.'
  }
];

// 15+ Hardcoded members (incorporating the 10 from prompt + additions)
export const INITIAL_MEMBERS: MemberItem[] = [
  {
    id: 1,
    name: 'John Smith',
    country: 'USA',
    countryCode: 'US',
    role: 'Player',
    roleEo: 'Ludanto',
    languages: ['en', 'eo'],
    eoLevel: 'Progresanto',
    position: 'Midfielder',
    club: 'Seattle Sounders Academy',
    bio: 'Semi-professional midfielder passionate about international tournaments and global football culture.',
    email: 'john.smith@example.org',
    verified: true,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 2,
    name: 'Maria Garcia',
    country: 'Spain',
    countryCode: 'ES',
    role: 'Coach',
    roleEo: 'Trejnisto',
    languages: ['es', 'eo'],
    eoLevel: 'Spertulo',
    position: 'Head Youth Coach',
    club: 'Real Valladolid C Partner',
    bio: 'UEFA B licensed coach focused on youth development and integrating Esperanto exchange players in Spain.',
    email: 'maria.garcia@example.org',
    verified: true,
    avatarBg: 'bg-green-700'
  },
  {
    id: 3,
    name: 'Taro Tanaka',
    country: 'Japan',
    countryCode: 'JP',
    role: 'Researcher',
    roleEo: 'Esploristo',
    languages: ['ja', 'en', 'eo'],
    eoLevel: 'Aglina / Denaska',
    position: 'Sports Sociologist',
    club: 'Waseda Sports Institute',
    bio: 'Researching intercultural communication in team sports and Esperanto as a tool for sports diplomacy.',
    email: 'taro.tanaka@example.org',
    verified: true,
    avatarBg: 'bg-teal-700'
  },
  {
    id: 4,
    name: 'Anna Kowalski',
    country: 'Poland',
    countryCode: 'PL',
    role: 'Organizer',
    roleEo: 'Organizanto',
    languages: ['pl', 'eo'],
    eoLevel: 'Spertulo',
    position: 'Tournament Coordinator',
    club: 'IKEF Europa',
    bio: 'Coordinator of the UK (Universala Kongreso) annual football match and European Esperanto cup.',
    email: 'anna.kowalski@example.org',
    verified: true,
    avatarBg: 'bg-emerald-700'
  },
  {
    id: 5,
    name: 'Carlos Martinez',
    country: 'Mexico',
    countryCode: 'MX',
    role: 'Player',
    roleEo: 'Ludanto',
    languages: ['es', 'eo'],
    eoLevel: 'Progresanto',
    position: 'Striker / Antaŭulo',
    club: 'CF Pachuca Youth',
    bio: 'Goalscorer eager to connect with international academies and play in European Esperanto tournaments.',
    email: 'carlos.m@example.org',
    verified: true,
    avatarBg: 'bg-lime-700'
  },
  {
    id: 6,
    name: 'Li Wei',
    country: 'China',
    countryCode: 'CN',
    role: 'Researcher',
    roleEo: 'Esploristo',
    languages: ['zh', 'en'],
    eoLevel: 'Komencanto',
    position: 'Sports Data Analyst',
    club: 'Beijing Sports University',
    bio: 'Specialist in performance metrics and international player transfer networks.',
    email: 'li.wei@example.org',
    verified: false,
    avatarBg: 'bg-emerald-800'
  },
  {
    id: 7,
    name: 'Sarah Johnson',
    country: 'UK',
    countryCode: 'GB',
    role: 'Referee',
    roleEo: 'Arbitraciisto',
    languages: ['en', 'eo'],
    eoLevel: 'Spertulo',
    position: 'FA Certified Referee',
    club: 'English Football Association',
    bio: 'Active referee officiating regional leagues and advocating for Esperanto in FIFA fair play initiatives.',
    email: 'sarah.j@example.org',
    verified: true,
    avatarBg: 'bg-green-800'
  },
  {
    id: 8,
    name: 'Pierre Dupont',
    country: 'France',
    countryCode: 'FR',
    role: 'Coach',
    roleEo: 'Trejnisto',
    languages: ['fr', 'eo'],
    eoLevel: 'Aglina / Denaska',
    position: 'Tactical Analyst',
    club: 'Olympique Lyonnais Youth Academy',
    bio: 'Tactician specializing in possession football and multilingual player integration in academies.',
    email: 'pierre.d@example.org',
    verified: true,
    avatarBg: 'bg-teal-800'
  },
  {
    id: 9,
    name: 'Hans Mueller',
    country: 'Germany',
    countryCode: 'DE',
    role: 'Organizer',
    roleEo: 'Organizanto',
    languages: ['de', 'en', 'eo'],
    eoLevel: 'Spertulo',
    position: 'IKEF Treasurer & Sports Liaison',
    club: 'IKEF Deutschland',
    bio: 'Long-time Esperanto organizer building partnerships between European amateur clubs and IKEF.',
    email: 'hans.m@example.org',
    verified: true,
    avatarBg: 'bg-emerald-900'
  },
  {
    id: 10,
    name: 'Elena Popova',
    country: 'Russia',
    countryCode: 'RU',
    role: 'Player',
    roleEo: 'Ludanto',
    languages: ['ru', 'eo'],
    eoLevel: 'Progresanto',
    position: 'Goalkeeper / Golulo',
    club: 'Zenit Women Reserve',
    bio: 'Aspirations to play in international friendlies and teach football vocabulary in Esperanto clubs.',
    email: 'elena.p@example.org',
    verified: true,
    avatarBg: 'bg-green-900'
  },
  {
    id: 11,
    name: 'Kofi Mensah',
    country: 'Ghana',
    countryCode: 'GH',
    role: 'Scout',
    roleEo: 'Skolto',
    languages: ['en', 'eo'],
    eoLevel: 'Progresanto',
    position: 'West Africa Talent Scout',
    club: 'IKEF Afrika Talent',
    bio: 'Scouting young African footballers and offering language scholarships for international exchange.',
    email: 'kofi.m@example.org',
    verified: true,
    avatarBg: 'bg-emerald-600'
  },
  {
    id: 12,
    name: 'Lucia Rossi',
    country: 'Italy',
    countryCode: 'IT',
    role: 'Referee',
    roleEo: 'Arbitraciisto',
    languages: ['it', 'eo', 'en'],
    eoLevel: 'Spertulo',
    position: 'Serio B Assistant Referee',
    club: 'AIA Italia',
    bio: 'Promoting clear field communications through standardized Esperanto referee signals.',
    email: 'lucia.r@example.org',
    verified: true,
    avatarBg: 'bg-teal-600'
  },
  {
    id: 13,
    name: 'Mateo Fernandez',
    country: 'Argentina',
    countryCode: 'AR',
    role: 'Player',
    roleEo: 'Ludanto',
    languages: ['es', 'eo'],
    eoLevel: 'Progresanto',
    position: 'Winger / Flankulo',
    club: 'Rosario Central B',
    bio: 'Creative winger looking for trial opportunities with IKEF partner clubs in Europe.',
    email: 'mateo.f@example.org',
    verified: true,
    avatarBg: 'bg-lime-800'
  },
  {
    id: 14,
    name: 'Astrid Lindqvist',
    country: 'Sweden',
    countryCode: 'SE',
    role: 'Fan',
    roleEo: 'Amatoro',
    languages: ['sv', 'en', 'eo'],
    eoLevel: 'Aglina / Denaska',
    position: 'Fan Club President',
    club: 'IKEF Supporter Network',
    bio: 'Lover of Scandinavian football and Esperanto literature. Organizes match viewing meetups.',
    email: 'astrid.l@example.org',
    verified: true,
    avatarBg: 'bg-green-700'
  },
  {
    id: 15,
    name: 'Barthélémy Zinsou',
    country: 'Benin',
    countryCode: 'BJ',
    role: 'Coach',
    roleEo: 'Trejnisto',
    languages: ['fr', 'eo'],
    eoLevel: 'Progresanto',
    position: 'Grassroots Director',
    club: 'Espérance Cotonou',
    bio: 'Developing football schools in West Africa that teach Esperanto alongside core sports skills.',
    email: 'bart.z@example.org',
    verified: true,
    avatarBg: 'bg-emerald-700'
  }
];

export const FEATURED_OPPORTUNITIES: OpportunityItem[] = [
  {
    id: 1,
    titleEo: 'Unu Plena Sezono ĉe Real Valladolid C',
    titleEn: 'One Full Season at Real Valladolid C',
    organization: 'Real Valladolid C / IKEF Partner',
    location: 'Valladolid, Hispanio',
    type: 'Contract',
    typeEo: 'Sezona Kontrakto',
    descriptionEo: 'Integra programo por talenta futbalisto (18-23 jara) kun Esperanto-scioj. Inkluzivas loĝadon, trejnadon en Hispanio, nutradon, kaj oficialajn ligmaĉojn en la hispana teritoria divido.',
    descriptionEn: 'Full immersion program for talented footballers (ages 18-23) with basic Esperanto knowledge. Includes housing, high-performance training in Spain, nutrition, and official regional league matches.',
    requirementsEo: [
      'Aĝo inter 18 kaj 23 jaroj',
      'Pruvita sperto en duonprofesia aŭ akademia nivelo',
      'Baza aŭ meza scio de Esperanto (A2/B1)',
      'Preteco loĝi en Valladolid dum 10 monatoj'
    ],
    requirementsEn: [
      'Age between 18 and 23',
      'Proven experience in semi-pro or academy football',
      'Basic to intermediate Esperanto (A2/B1)',
      'Willingness to reside in Valladolid for 10 months'
    ],
    deadline: '2026-10-15',
    featured: true,
    tags: ['Hispanio', 'Real Valladolid', 'Full Season', 'Esperanto Exchange']
  },
  {
    id: 2,
    titleEo: 'Internacia Provludo por Esperanta Elekto (UK 2026)',
    titleEn: 'International Trial for Esperanto Selection (UK 2026)',
    organization: 'Futbala Sekcio de IKEF',
    location: 'Brno, Ĉeĥio',
    type: 'Trial',
    typeEo: 'Provludo',
    descriptionEo: 'Elektado de ludantoj por reprezenti la Esperanto-Selektitaron en la amika Internacia Pokalo dum la 111-a Universala Kongreso en Brno.',
    descriptionEn: 'Player trials to represent the Esperanto National Selection team in the International Cup during the 111th World Congress in Brno.',
    requirementsEo: [
      'Membro de IKEF aŭ loka Esperanto-asocio',
      'Certa fizika pretigo por du-duonaj matĉoj',
      'Aperu en Brno de la 24-a ĝis 30-a de julio 2026'
    ],
    requirementsEn: [
      'Member of IKEF or local Esperanto association',
      'Match fitness for 90-minute competitive games',
      'Available in Brno from July 24-30, 2026'
    ],
    deadline: '2026-06-01',
    featured: true,
    tags: ['Ĉeĥio', 'UK 2026', 'Provludo', 'Selektitaro']
  },
  {
    id: 3,
    titleEo: 'Akademia Interŝanĝo en Lyon Youth Center',
    titleEn: 'Academy Youth Exchange in Lyon',
    organization: 'Olympique Lyonnais Partner / IKEF France',
    location: 'Lyon, Francio',
    type: 'Exchange',
    typeEo: 'Interŝanĝo',
    descriptionEo: '3-monata taktika kaj lingva interŝanĝo por juna trejnisto aŭ asististo celanta lerni francajn trejnmetodojn kaj instrui futbalan Esperanton.',
    descriptionEn: '3-month tactical and language exchange for a young coach or assistant aiming to study French coaching methodologies while conducting Esperanto workshops.',
    requirementsEo: [
      'Trejnista licenco (UEFA C aŭ ekvivalento)',
      'Aglina Esperanto-parolanto',
      'Intereso pri junaĵa metodologio'
    ],
    requirementsEn: [
      'Coaching license (UEFA C or equivalent)',
      'Fluent Esperanto speaker',
      'Interest in youth football methodology'
    ],
    deadline: '2026-09-01',
    featured: false,
    tags: ['Francio', 'Lyon', 'Trejnisto', '3 Monatoj']
  },
  {
    id: 4,
    titleEo: 'Stipendio pri Sporta Ĵurnalismo & Esperanta Terminejo',
    titleEn: 'Sports Journalism & Esperanto Terminology Fellowship',
    organization: 'IKEF Esplora Sekcio',
    location: 'Rotterdam / Distance',
    type: 'Scholarship',
    typeEo: 'Stipendio',
    descriptionEo: 'Esplora kaj redakta projekto por disvolvi la interretan Esperantan Futbalan Vortaron kaj verki raportojn pri internaciaj matĉoj.',
    descriptionEn: 'Research and editorial project to expand the online Esperanto Football Dictionary and write match coverage for international publications.',
    requirementsEo: [
      'Esperanto-nivelo C1/C2',
      'Sperto pri verkado aŭ sporta raportado',
      'IKEF-membro'
    ],
    requirementsEn: [
      'Esperanto level C1/C2',
      'Writing or sports reporting experience',
      'IKEF membership'
    ],
    deadline: '2026-08-30',
    featured: false,
    tags: ['Rotterdam', 'Ĵurnalismo', 'Remote', 'Stipendio']
  }
];

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 1,
    titleEo: 'Esperanto Pokalo dum UK 2026 en Brno',
    titleEn: 'Esperanto Cup at UK 2026 in Brno',
    date: '2026-07-26',
    location: 'Brno Municipal Stadium, Ĉeĥio',
    type: 'Match',
    descriptionEo: 'La tradicia granda futbala matĉo okaze de la Universala Kongreso. Esperanta Elektito ludos kontraŭ loka amatora selektitaro de Brno.',
    descriptionEn: 'The flagship annual football match held during the World Esperanto Congress. Esperanto Selection plays against a local Brno amateur XI.',
    attendeesCount: 142
  },
  {
    id: 2,
    titleEo: 'Interreta Seminario: Taktika Terminologio en Esperanto',
    titleEn: 'Webinar: Tactical Terminology in Esperanto',
    date: '2026-09-12',
    location: 'Zoom / IKEF Live',
    type: 'Webinar',
    descriptionEo: 'Interaktiva prelego kun UEFA B trejnisto Maria Garcia kaj lingvisto Taro Tanaka pri modernaj futbalaj nocioj en la Internacia Lingvo.',
    descriptionEn: 'Interactive session with UEFA B coach Maria Garcia and linguist Taro Tanaka discussing modern tactical concepts in the International Language.',
    attendeesCount: 85
  },
  {
    id: 3,
    titleEo: 'Amikeca Matĉo: IKEF Selektitaro vs. ConIFA Teamo',
    titleEn: 'Friendly Match: IKEF Selection vs. ConIFA Team',
    date: '2026-10-24',
    location: 'Valladolid, Hispanio',
    type: 'Match',
    descriptionEo: 'Amikeca matĉo okazanta en Hispanio kun la subteno de Real Valladolid C, antaŭeniganta interkulturan toleremon en sporto.',
    descriptionEn: 'Friendly fixture hosted in Spain with support from Real Valladolid C, promoting intercultural tolerance in sports.',
    attendeesCount: 210
  }
];
