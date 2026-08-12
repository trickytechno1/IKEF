'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'eo' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string, defaultText?: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  eo: {
    // Nav
    'nav.home': 'Hejmo',
    'nav.vocabulary': 'Vortaro',
    'nav.directory': 'Direktorio',
    'nav.opportunities': 'Ŝancoj',
    'nav.events': 'Eventoj',
    'nav.join': 'Kreu Profilon',
    'nav.subtitle': 'Futbala Sekcio de IKEF',

    // Hero
    'hero.badge': 'Oficiala Reto de IKEF Futbalo',
    'hero.title': 'Tutmonda Esperanta Futbala Reto',
    'hero.subtitle': 'Unuigas ludantojn, trejnistojn, arbitraciistojn kaj futbal-amandojn tra la mondo per la internacia lingvo Esperanto.',
    'hero.cta.primary': 'Kreu Vian Profilon',
    'hero.cta.secondary': 'Esploru la Adresaron',
    'hero.cta.dict': 'Futbala Vortaro',

    // Stats
    'stats.title': 'IKEF Futbalo en Ciferoj',
    'stats.members': 'Aktivaj Membroj',
    'stats.countries': 'Landoj Reprezentataj',
    'stats.players': 'Profesiaj & Amatoraj Ludantoj',
    'stats.languages': 'Parolataj Lingvoj',

    // Value Props
    'value.title': 'Kial Aliĝi al IKEF Futbalo?',
    'value.subtitle': 'Malkovru la avantaĝojn de nia tutmonda sporta komunumo',
    'prop1.title': 'Tutmonda Adresaro',
    'prop1.desc': 'Trovu futbalistojn, trejnistojn kaj amikojn en pli ol 40 landoj por amikaj matĉoj, interŝanĝoj kaj kunlaboro.',
    'prop2.title': 'Kontrolita Komunumo',
    'prop2.desc': 'Aŭtentika kaj fidinda reto eltenata de la Internacia Komerca kaj Ekonomia Strebado (IKEF) kaj partneraj kluboj.',
    'prop3.title': 'Novaĵoj kaj Eventoj',
    'prop3.desc': 'Restu informita pri internaciaj kongresaj matĉoj, turniroj, prelegoj kaj trejnadaj semajnfinoj.',

    // Opportunities
    'opp.section.title': 'Plej Recentaj Ŝancoj',
    'opp.section.subtitle': 'Ebloj por ludantoj, trejnistoj kaj esploristoj en internaciaj kluboj',
    'opp.card.title': 'Unu Plena Sezono ĉe Real Valladolid C',
    'opp.card.org': 'Real Valladolid C / IKEF Partnero',
    'opp.card.desc': 'Integra programo por talenta futbalisto kun Esperanto-scioj. Inkluzivas loĝadon, trejnadon en Hispanio kaj oficialajn matĉojn.',
    'opp.card.apply': 'Petu Informojn / Aliĝu',
    'opp.card.tag1': 'Hispanio',
    'opp.card.tag2': 'Ludanto',
    'opp.card.tag3': 'Full Season',

    // Why Join
    'why.title': 'Sporto kaj Esperanto: Lingvo sen Limaĵoj',
    'why.desc': 'Futbalo estas la plej populara sporto sur la terglobo, kaj Esperanto estas la plej efika pontlingvo. Kune ili kreas senegalan fratecon sur la ludejo kaj ekster ĝi.',
    'why.feat1': 'Internaciaj amikaj matĉoj dum Universala Kongreso (UK)',
    'why.feat2': 'Apoteko de futbalaj terminologioj kaj tradukado',
    'why.feat3': 'Kariera subteno por junaj talentoj en internaciaj akademioj',

    // CTA Section
    'cta.title': 'Preta plivastigi vian reton?',
    'cta.desc': 'Aliĝu al centoj da futbal-amikoj el ĉiuj kontinentoj hodiaŭ. Aliĝo estas senpaga!',
    'cta.button': 'Kreu Vian Profilon Hodiaŭ',

    // Vocabulary
    'voc.title': 'Esperanta Futbala Vortaro',
    'voc.subtitle': 'Faka terminologio por ludantoj, arbitraciistoj kaj spektantoj',
    'voc.search': 'Serĉi vorton (esperante aŭ angle)...',
    'voc.cat.all': 'Ĉiuj Fakoj',
    'voc.cat.taktiko': 'Taktiko',
    'voc.cat.tekniko': 'Tekniko',
    'voc.cat.rolo': 'Rolo',
    'voc.cat.organizo': 'Organizo',
    'voc.cat.ekipajho': 'Ekipaĵo',
    'voc.cat.reguloj': 'Reguloj',
    'voc.cat.evento': 'Evento',
    'voc.termEo': 'Esperanta Vorto',
    'voc.termEn': 'Angla Traduko',
    'voc.category': 'Kategorio',
    'voc.listen': 'Aŭskulti',
    'voc.count': 'Trovitaj vortoj',

    // Directory
    'dir.title': 'Membara Adresaro',
    'dir.subtitle': 'Konektiĝu kun Esperanto-parolantaj futbalistoj kaj fakuloj tutmonde',
    'dir.search': 'Serĉi laŭ nomo, lando, rolo...',
    'dir.filter.country': 'Ĉiuj Landoj',
    'dir.filter.role': 'Ĉiuj Roloj',
    'dir.filter.lang': 'Lingvo',
    'dir.role.player': 'Ludanto',
    'dir.role.coach': 'Trejnisto',
    'dir.role.referee': 'Arbitraciisto',
    'dir.role.organizer': 'Organizanto',
    'dir.role.researcher': 'Esploristo',
    'dir.role.scout': 'Skolto',
    'dir.viewProfile': 'Vidi Profilon',
    'dir.contact': 'Mesaĝi',
    'dir.addMe': 'Aldonu Vian Profilon',

    // Opportunities page
    'opp.page.title': 'Futbalaj Ŝancoj kaj Programoj',
    'opp.page.subtitle': 'Internaciaj provludoj, stipendioj kaj kunlaboraj projektoj',

    // Events page
    'ev.page.title': 'Novaĵoj kaj Eventoj',
    'ev.page.subtitle': 'Venontaj internaciaj matĉoj, kongresoj kaj interretaj kunsidoj',

    // Footer
    'footer.copy': '© 2026 Futbala Sekcio de IKEF (IKEF Futbalo). Prizorgata de la Internacia Komerca kaj Ekonomia Strebado.',
    'footer.motto': 'Futbalo unuecigas la mondon — Esperanto faciligas la dialogon.',
    'footer.quicklinks': 'Rapidaj Ligiloj',
    'footer.mainSite': 'Ĉefa Retejo de IKEF',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.vocabulary': 'Vocabulary',
    'nav.directory': 'Directory',
    'nav.opportunities': 'Opportunities',
    'nav.events': 'Events',
    'nav.join': 'Create Profile',
    'nav.subtitle': 'Football Section of IKEF',

    // Hero
    'hero.badge': 'Official Network of IKEF Football',
    'hero.title': 'Global Esperanto Football Network',
    'hero.subtitle': 'Uniting players, coaches, referees, and football enthusiasts across the globe through the international language Esperanto.',
    'hero.cta.primary': 'Create Your Profile',
    'hero.cta.secondary': 'Explore Directory',
    'hero.cta.dict': 'Football Dictionary',

    // Stats
    'stats.title': 'IKEF Football in Numbers',
    'stats.members': 'Active Members',
    'stats.countries': 'Countries Represented',
    'stats.players': 'Pro & Amateur Players',
    'stats.languages': 'Languages Spoken',

    // Value Props
    'value.title': 'Why Join IKEF Football?',
    'value.subtitle': 'Discover the benefits of our global sporting community',
    'prop1.title': 'Global Directory',
    'prop1.desc': 'Find footballers, coaches, and contacts in over 40 countries for friendly matches, exchanges, and collaboration.',
    'prop2.title': 'Verified Community',
    'prop2.desc': 'An authentic and trusted network backed by IKEF (International Economic and Commercial Esperanto Association) and partner clubs.',
    'prop3.title': 'News and Events',
    'prop3.desc': 'Stay informed about international congress matches, tournaments, lectures, and training weekends.',

    // Opportunities
    'opp.section.title': 'Featured Opportunities',
    'opp.section.subtitle': 'Programs for players, coaches, and researchers in international clubs',
    'opp.card.title': 'One Full Season at Real Valladolid C',
    'opp.card.org': 'Real Valladolid C / IKEF Partner',
    'opp.card.desc': 'Integrated development program for talented footballers with Esperanto proficiency. Includes housing, high-performance training in Spain, and official matches.',
    'opp.card.apply': 'Apply / Learn More',
    'opp.card.tag1': 'Spain',
    'opp.card.tag2': 'Player',
    'opp.card.tag3': 'Full Season',

    // Why Join
    'why.title': 'Sports and Esperanto: Language Without Borders',
    'why.desc': 'Football is the most popular sport on earth, and Esperanto is the most effective bridge language. Together they build unmatched camaraderie on and off the field.',
    'why.feat1': 'International friendly matches during the World Esperanto Congress (UK)',
    'why.feat2': 'Comprehensive football terminology database and translations',
    'why.feat3': 'Career development support for young talents in international academies',

    // CTA Section
    'cta.title': 'Ready to expand your network?',
    'cta.desc': 'Join hundreds of football enthusiasts from every continent today. Registration is free!',
    'cta.button': 'Create Your Profile Today',

    // Vocabulary
    'voc.title': 'Esperanto Football Vocabulary',
    'voc.subtitle': 'Specialized terminology for players, referees, and spectators',
    'voc.search': 'Search word (Esperanto or English)...',
    'voc.cat.all': 'All Categories',
    'voc.cat.taktiko': 'Tactics',
    'voc.cat.tekniko': 'Technique',
    'voc.cat.rolo': 'Role',
    'voc.cat.organizo': 'Organization',
    'voc.cat.ekipajho': 'Equipment',
    'voc.cat.reguloj': 'Rules',
    'voc.cat.evento': 'Event',
    'voc.termEo': 'Esperanto Term',
    'voc.termEn': 'English Translation',
    'voc.category': 'Category',
    'voc.listen': 'Listen',
    'voc.count': 'Matching terms',

    // Directory
    'dir.title': 'Member Directory',
    'dir.subtitle': 'Connect with Esperanto-speaking footballers and professionals worldwide',
    'dir.search': 'Search by name, country, role...',
    'dir.filter.country': 'All Countries',
    'dir.filter.role': 'All Roles',
    'dir.filter.lang': 'Language',
    'dir.role.player': 'Player',
    'dir.role.coach': 'Coach',
    'dir.role.referee': 'Referee',
    'dir.role.organizer': 'Organizer',
    'dir.role.researcher': 'Researcher',
    'dir.role.scout': 'Scout',
    'dir.viewProfile': 'View Profile',
    'dir.contact': 'Message',
    'dir.addMe': 'Add Your Profile',

    // Opportunities page
    'opp.page.title': 'Football Opportunities & Programs',
    'opp.page.subtitle': 'International trials, scholarships, and collaborative exchange projects',

    // Events page
    'ev.page.title': 'News & Events',
    'ev.page.subtitle': 'Upcoming international matches, congresses, and online tactical seminars',

    // Footer
    'footer.copy': '© 2026 Futbala Sekcio de IKEF (IKEF Futbalo). Managed by the International Economic and Commercial Esperanto Association.',
    'footer.motto': 'Football unites the world — Esperanto makes the dialogue seamless.',
    'footer.quicklinks': 'Quick Links',
    'footer.mainSite': 'Main IKEF Website',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('eo');

  useEffect(() => {
    const saved = localStorage.getItem('ikef_lang') as Language;
    if (saved === 'eo' || saved === 'en') {
      setLang(saved);
    }
  }, []);

  const changeLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('ikef_lang', newLang);
  };

  const toggleLang = () => {
    changeLang(lang === 'eo' ? 'en' : 'eo');
  };

  const t = (key: string, defaultText?: string): string => {
    return translations[lang]?.[key] || translations['eo']?.[key] || defaultText || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
