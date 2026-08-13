export interface VocabItem {
  id: number;
  termEo: string;
  termEn: string;
  category: string;
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
  type: 'Trial' | 'Contract' | 'Scholarship' | 'Exchange' | 'Collaborator';
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

// Officially Corrected Football Vocabulary (Fakaj Kategorioj de la Futbala Vortaro)
export const INITIAL_VOCABULARY: VocabItem[] = [
  // 1. Bazaj Futbalaj Terminoj (Basic Terms)
  {
    id: 1,
    termEo: 'Futbalo',
    termEn: 'Football / Soccer',
    category: 'Bazaj Terminoj',
    definitionEo: 'La sporto mem; ludo inter du dekunuanaj teamoj per ronda pilko.',
    exampleEo: 'Futbalo estas la plej populara sporto en la mondo.'
  },
  {
    id: 2,
    termEo: 'Futbalisto',
    termEn: 'Footballer / Player',
    category: 'Bazaj Terminoj',
    definitionEo: 'Profesionulo aŭ amatoro, kiu ludas futbalon.',
    exampleEo: 'Nia kluba futbalisto bone trejnis por la sekva konkurso.'
  },
  {
    id: 3,
    termEo: 'Futbalteamo',
    termEn: 'Football team',
    category: 'Bazaj Terminoj',
    definitionEo: 'Grupo de ludantoj kune konkurantaj sub unu nomo.',
    exampleEo: 'La futbalteamo unuanime venkis en la amika matĉo.'
  },
  {
    id: 4,
    termEo: 'Futbalklubo',
    termEn: 'Football club',
    category: 'Bazaj Terminoj',
    definitionEo: 'La organiza aŭ jura strukturo malantaŭ la teamoj, stadiono kaj asocio.',
    exampleEo: 'IKEF estas tutmonda futbalklubo por Esperanto-parolantoj.'
  },
  {
    id: 5,
    termEo: 'Stadiono',
    termEn: 'Stadium',
    category: 'Bazaj Terminoj',
    definitionEo: 'La tuta spaco enhavanta la futbalan kampon, la tribunojn por spektantoj kaj la ceterajn servajzojn.',
    exampleEo: 'La nova stadiono povas gastigi 50 000 spektantojn.'
  },
  {
    id: 6,
    termEo: 'Trejnado',
    termEn: 'Training / Practice',
    category: 'Bazaj Terminoj',
    definitionEo: 'Praktika procezo por plibonigi fizikajn kaj taktikajn kapablojn.',
    exampleEo: 'Ĉiutaga trejnado helpas al ludantoj atingi pinton de sia rendimento.'
  },
  {
    id: 7,
    termEo: 'Matĉo',
    termEn: 'Match',
    category: 'Bazaj Terminoj',
    definitionEo: 'Oficiala konkurso inter du teamoj daŭranta kutime 90 minutojn.',
    exampleEo: 'La matĉo daŭris 90 minutojn plus kroma tempo.'
  },
  {
    id: 8,
    termEo: 'Pilko',
    termEn: 'Ball',
    category: 'Bazaj Terminoj',
    definitionEo: 'La sfera objekto, el ledo aŭ sinteza materialo, kiun oni devas enigi en la golejon.',
    exampleEo: 'La pilko glite trapasis la gollinion.'
  },
  {
    id: 9,
    termEo: 'Arbitraciisto',
    termEn: 'Referee',
    category: 'Bazaj Terminoj',
    definitionEo: 'La ĉefa juĝisto respondeca pri la apliko de la regularo sur la kampo.',
    exampleEo: 'La arbitraciisto regas la ludon sur la kampo trankvile.'
  },
  {
    id: 10,
    termEo: 'Golulo',
    termEn: 'Goalkeeper',
    category: 'Bazaj Terminoj',
    definitionEo: 'La speciala ludanto taskita gardi la golejon.',
    exampleEo: 'Nia golulo faris mirindan salvon en la fina minuto.'
  },

  // 2. Pozicioj de la Ludantoj (Player Positions)
  {
    id: 11,
    termEo: 'Golulo',
    termEn: 'Goalkeeper',
    category: 'Pozicioj',
    definitionEo: 'Defendanto de la kadrularo, la sola rajtigita uzi la manojn ene de la punareo.',
    exampleEo: 'La golulo restas sola en la punareo kiam kontraŭulo pafas.'
  },
  {
    id: 12,
    termEo: 'Dekstra / Maldekstra defendanto',
    termEn: 'Full-back / Wing-back',
    category: 'Pozicioj',
    definitionEo: 'Flankaj defendantoj protektantaj la eksterajn koridorojn de la kampa malantaŭo.',
    exampleEo: 'La dekstra defendanto kuras rapide por subteni la atakon.'
  },
  {
    id: 13,
    termEo: 'Centra defendanto',
    termEn: 'Centre-back',
    category: 'Pozicioj',
    definitionEo: 'Tiu, kiu ludas meze de la defenda linio por bloki la kontraŭulajn centrajn atakantojn.',
    exampleEo: 'La centra defendanto sukcese blokis la pafon per sia korpo.'
  },
  {
    id: 14,
    termEo: 'Defenda mezulo',
    termEn: 'Defensive midfielder',
    category: 'Pozicioj',
    definitionEo: 'Mezkampulo fokusita al la detruado de kontraŭulaj atakoj tuj antaŭ la defenda linio.',
    exampleEo: 'La defenda mezulo forprenas la pilkon kaj restarigas trankvilon.'
  },
  {
    id: 15,
    termEo: 'Centra mezulo',
    termEn: 'Central midfielder',
    category: 'Pozicioj',
    definitionEo: 'La motoro de la teamo; ludanto kiu balancas defendon kaj atakon el la centro de la kampo.',
    exampleEo: 'La centra mezulo estas la vera gvidanto sur la kampo.'
  },
  {
    id: 16,
    termEo: 'Ataka mezulo',
    termEn: 'Attacking midfielder',
    category: 'Pozicioj',
    definitionEo: 'Kreiva ludanto poziciita profunde en la mezkampo por nutri la avanulojn per spritaj pasedoj.',
    exampleEo: 'Lia lerteco kiel ataka mezulo kreas multajn golŝancojn.'
  },
  {
    id: 17,
    termEo: 'Flankulo (aŭ Alreĝulo)',
    termEn: 'Winger',
    category: 'Pozicioj',
    definitionEo: 'Atakema ludanto funkcianta rapide ĉe la randoj de la ludkampo.',
    exampleEo: 'La rapida flankulo centrifugis la pilkon en la punareon.'
  },
  {
    id: 18,
    termEo: 'Centrulo (aŭ Centra avanulo)',
    termEn: 'Centre-forward',
    category: 'Pozicioj',
    definitionEo: 'La ĉefa frapforto poziciita rekte antaŭ la kontraŭula golejo.',
    exampleEo: 'La centrulo ricevis la pasedon kaj rekte ŝutis golen.'
  },
  {
    id: 19,
    termEo: 'Strikisto',
    termEn: 'Striker',
    category: 'Pozicioj',
    definitionEo: 'Purrasa gol-skoranto, kies ĉefa celo estas eksplodi en la punareon kaj ŝuti.',
    exampleEo: 'Nia strikisto jam skoris dek kvin golojn dum ĉi tiu sezono.'
  },

  // 3. Teknikaj Agoj (Technical Actions)
  {
    id: 20,
    termEo: 'Pasi',
    termEn: 'Pass',
    category: 'Teknikaj Agoj',
    definitionEo: 'Sendi aŭ transdoni la pilkon al samteamano.',
    exampleEo: 'Grave estas pasi la pilkon senprokraste al libera samteamano.'
  },
  {
    id: 21,
    termEo: 'Dribli',
    termEn: 'Dribble',
    category: 'Teknikaj Agoj',
    definitionEo: 'Moviĝi kun la pilko ĉe la piedoj preterpasantaj defendojn per lertaj feintoj.',
    exampleEo: 'Li lerte driblis preter du defendantoj.'
  },
  {
    id: 22,
    termEo: 'Ŝuti',
    termEn: 'Shoot',
    category: 'Teknikaj Agoj',
    definitionEo: 'Lanĉi la pilkon per granda forto direkte al la golejo.',
    exampleEo: 'Kiam vi estas proksime de la punareo, ne hezitu ŝuti!'
  },
  {
    id: 23,
    termEo: 'Kapbati (aŭ Kapumi)',
    termEn: 'Header / Head the ball',
    category: 'Teknikaj Agoj',
    definitionEo: 'Frapi aŭ direkti la pilkon per la frunto.',
    exampleEo: 'Li bele kapbatis la pilkon en la supran angulon de la reto.'
  },
  {
    id: 24,
    termEo: 'Bloki',
    termEn: 'Block',
    category: 'Teknikaj Agoj',
    definitionEo: 'Intersekci ŝoton aŭ pasedon por haltigi la trajektorion de la pilko.',
    exampleEo: 'La defendanto kuraĝe saltis por bloki la forta pafon.'
  },
  {
    id: 25,
    termEo: 'Interkapti',
    termEn: 'Intercept',
    category: 'Teknikaj Agoj',
    definitionEo: 'Forpreni la pilkon meze de kontraŭula pasedo antaŭ ol ĝi atingas la celitan ricevanton.',
    exampleEo: 'Nia mezulo interkaptis la danĝeran pasedon de la kontraŭulo.'
  },
  {
    id: 26,
    termEo: 'Kontraŭataki',
    termEn: 'Counter-attack',
    category: 'Teknikaj Agoj',
    definitionEo: 'Rapide ataki tuj post kiam oni reakiris la pilkon el la kontraŭulo.',
    exampleEo: 'La teamo kontraŭatakis tre rapide kaj skoris golon.'
  },
  {
    id: 27,
    termEo: 'Premi',
    termEn: 'Press',
    category: 'Teknikaj Agoj',
    definitionEo: 'Intensa premo sur la kontraŭulo por devigi lin fari eraron aŭ perdi la pilkon.',
    exampleEo: 'Ni devas premi la kontraŭulon en ties propra kampa duono.'
  },
  {
    id: 28,
    termEo: 'Marki',
    termEn: 'Mark',
    category: 'Teknikaj Agoj',
    definitionEo: 'Gardi specifan kontraŭulon por malebligi al li ricevi la pilkon aŭ agi libere.',
    exampleEo: 'Persona instrukcio: marki la plej danĝeran atakanton.'
  },
  {
    id: 29,
    termEo: 'Senmarkiĝi',
    termEn: 'Get open / Unmark oneself',
    category: 'Teknikaj Agoj',
    definitionEo: 'Moviĝi en liberan spacon for de la gardanta defendanto por esti preta por pasedo.',
    exampleEo: 'Moviĝu kapable por senmarkiĝi kiam samteamano havas la pilkon.'
  },
  {
    id: 30,
    termEo: 'Centri',
    termEn: 'Cross',
    category: 'Teknikaj Agoj',
    definitionEo: 'Sendi la pilkon de la flanko profunde en la kontraŭulan punareon por kapbato aŭ tuja ŝoto.',
    exampleEo: 'La flankulo bele centris la pilkon al la mezo de la punareo.'
  },

  // 4. Taktikaj Terminoj (Tactical Terms)
  {
    id: 31,
    termEo: 'Alta premo (High press)',
    termEn: 'High press',
    category: 'Taktikaj Terminoj',
    definitionEo: 'Defenda taktiko kie la ataka linio premas la kontraŭulon tre proksime al ties propra golejo.',
    exampleEo: 'Alta premo devigis la kontraŭulan golulon fari eraron.'
  },
  {
    id: 32,
    termEo: 'Malalta bloko (Low block)',
    termEn: 'Low block',
    category: 'Taktikaj Terminoj',
    definitionEo: 'Defenda strategio kie la tuta teamo defendas profunde en sia propra kampa duono, lasante tre malmulte da spaco malantaŭe.',
    exampleEo: 'Ili uzis malaltan blokon por protekti siajn unu-golan avantaĝon.'
  },
  {
    id: 33,
    termEo: 'Kontraŭatako',
    termEn: 'Counter-attack',
    category: 'Taktikaj Terminoj',
    definitionEo: 'Rapida transiro de defendo al atako dum la kontraŭulo ankoraŭ estas malorganizita.',
    exampleEo: 'Fulmrapida kontraŭatako kondukis al la decida golo.'
  },
  {
    id: 34,
    termEo: 'Pilkregado (Possession)',
    termEn: 'Possession',
    category: 'Taktikaj Terminoj',
    definitionEo: 'La procento de tempo aŭ la kapablo teni la pilkon sub la kontrolo de sia teamo.',
    exampleEo: 'Nia teamo havis 65% da pilkregado dum la unua duontempo.'
  },
  {
    id: 35,
    termEo: 'Transiro (Transition)',
    termEn: 'Transition',
    category: 'Taktikaj Terminoj',
    definitionEo: 'La rapida faza ŝanĝo de la teamo kiam la pilko estas perdita (atako al defendo) aŭ gajnita (defendo al atako).',
    exampleEo: 'Bona taktika transiro estas esenca por modernaj teamoj.'
  },
  {
    id: 36,
    termEo: 'Zonmarkado',
    termEn: 'Zonal marking',
    category: 'Taktikaj Terminoj',
    definitionEo: 'Defenda sistemo kie ĉiu ludanto respondecas pri specifa spaco (zono) sur la kampo prefere ol pri specifa homo.',
    exampleEo: 'Nia defendo uzas zonmarkadon dum angulŝotoj.'
  },
  {
    id: 37,
    termEo: 'Persona markado',
    termEn: 'Man-to-man marking',
    category: 'Taktikaj Terminoj',
    definitionEo: 'Defenda sistemo kie ĉiu ludanto strikte sekvas kaj gardas unu saman kontraŭulon.',
    exampleEo: 'Persona markado strikte haltigis la plej bonan lundanton de la kontraŭulo.'
  },
  {
    id: 38,
    termEo: 'Formacio',
    termEn: 'Formation',
    category: 'Taktikaj Terminoj',
    definitionEo: 'La struktura aranĝo de la ludantoj sur la kampo (ekz. 4-3-3, 4-4-2).',
    exampleEo: 'La trejnisto elektis la klasikan formacion 4-3-3.'
  },
  {
    id: 39,
    termEo: 'Ludsistemo',
    termEn: 'System of play',
    category: 'Taktikaj Terminoj',
    definitionEo: 'La pli larĝa filozofio kaj taktika gvidlinio de la trejnisto por la teamo.',
    exampleEo: 'La tuta klubo sekvas la saman atakan ludsistemon.'
  },

  // 5. Arbitracio (Match Officials)
  {
    id: 40,
    termEo: 'Arbitraciisto (aŭ Ĉefjuĝisto)',
    termEn: 'Referee / Chief official',
    category: 'Arbitracio',
    definitionEo: 'La supera aŭtoritato sur la ludkampo.',
    exampleEo: 'La arbitraciisto fajfis por montri la finon de la matĉo.'
  },
  {
    id: 41,
    termEo: 'Help-arbitraciisto (aŭ Liniojuĝisto)',
    termEn: 'Assistant referee / Linesman',
    category: 'Arbitracio',
    definitionEo: 'Kurantaj laŭ la flankaj linioj por signali ofsajdojn kaj enĵetojn.',
    exampleEo: 'La help-arbitraciisto levis sian flagon pro forŝoto.'
  },
  {
    id: 42,
    termEo: 'Kvara arbitraciisto',
    termEn: 'Fourth official',
    category: 'Arbitracio',
    definitionEo: 'Funkciulo ĉe la rando de la kampo kiu administras anstataŭigojn kaj la kromtempon.',
    exampleEo: 'La kvara arbitraciisto montris tabulon kun 4 minutoj da kromtempo.'
  },
  {
    id: 43,
    termEo: 'VAR (Vide-Asistanta Arbitraciisto)',
    termEn: 'Video Assistant Referee (VAR)',
    category: 'Arbitracio',
    definitionEo: 'Sistemo kaj teamo de arbitraciistoj analizantaj video-ripetojn por korekti klarajn erarojn.',
    exampleEo: 'VAR ekzamenis la situacion kaj konfirmis la punŝoton.'
  },
  {
    id: 44,
    termEo: 'Arbitracia decido',
    termEn: 'Referee decision',
    category: 'Arbitracio',
    definitionEo: 'La fina verdikto donita de la arbitraciisto pri iu ajn kampa situacio.',
    exampleEo: 'Ĉiuj ludantoj devas respekti la arbitracian decidon.'
  },

  // 6. Disciplino (Discipline)
  {
    id: 45,
    termEo: 'Flava karto',
    termEn: 'Yellow card',
    category: 'Disciplino',
    definitionEo: 'Oficiala averto pro meze grava faŭlo aŭ nesporta konduto.',
    exampleEo: 'Li ricevis flavan karton pro tro frua provo haltigi la libera ŝoton.'
  },
  {
    id: 46,
    termEo: 'Ruĝa karto',
    termEn: 'Red card',
    category: 'Disciplino',
    definitionEo: 'Tuja elpelo de ludanto pro grava faŭlo, perforto, aŭ dua flava karto.',
    exampleEo: 'La severa faŭlo gajnis rektan ruĝan karton.'
  },
  {
    id: 47,
    termEo: 'Averto',
    termEn: 'Caution / Warning',
    category: 'Disciplino',
    definitionEo: 'Parola aŭ kart-montrita averto fare de la juĝisto.',
    exampleEo: 'La juĝisto donis buŝan averton al la defendanto.'
  },
  {
    id: 48,
    termEo: 'Elpelo',
    termEn: 'Sending-off / Expulsion',
    category: 'Disciplino',
    definitionEo: 'La devigo forlasi la kampon kaj la benkon pro ruĝa karto.',
    exampleEo: 'La elpelo devigis la teamon ludadi kun dek homoj.'
  },
  {
    id: 49,
    termEo: 'Puno',
    termEn: 'Penalty / Sanction',
    category: 'Disciplino',
    definitionEo: 'Regula sekvo (libera ŝoto, penalo, aŭ suspendo) pro malobservo de la regularo.',
    exampleEo: 'La puno pro la grafa faŭlo estis tridek-taga suspendo.'
  },

  // 7. Fiksitaj Situacioj (Set Pieces)
  {
    id: 50,
    termEo: 'Angulŝoto (Kornero)',
    termEn: 'Corner kick',
    category: 'Fiksitaj Situacioj',
    definitionEo: 'Ŝoto el la kampa angulo se la pilko transiris la gollinion laste tuŝite de defendanto.',
    exampleEo: 'Nia teamo gajnis angulŝoton en la fina sekundo.'
  },
  {
    id: 51,
    termEo: 'Libera ŝoto',
    termEn: 'Free kick',
    category: 'Fiksitaj Situacioj',
    definitionEo: 'Rekomenco de la ludo post faŭlo; povas esti rekta (rajtas trafi golon rekte) aŭ nerekta.',
    exampleEo: 'Lia rekta libera ŝoto pasis super la defendan muron.'
  },
  {
    id: 52,
    termEo: 'Punŝoto (Penalo)',
    termEn: 'Penalty kick',
    category: 'Fiksitaj Situacioj',
    definitionEo: 'Rekta pafo de la 11-metra punkto kiel puno kontraŭ grava defenda faŭlo en la punareon.',
    exampleEo: 'La kapitano trankvile pafis kaj skoris el la punŝoto.'
  },
  {
    id: 53,
    termEo: 'Enĵeto',
    termEn: 'Throw-in',
    category: 'Fiksitaj Situacioj',
    definitionEo: 'Rekomenco per la manoj de malantaŭ la kapo post kiam la pilko eliras el la flanklinio.',
    exampleEo: 'Rapida enĵeto permesis al nia flankulo ekludi antaŭ ol la defando organiziĝis.'
  },
  {
    id: 54,
    termEo: 'Golŝoto',
    termEn: 'Goal kick',
    category: 'Fiksitaj Situacioj',
    definitionEo: 'Rekomenco fare de la golulo el sia sesmetra areo, post kiam ataka ludanto elpasis la pilkon preter la gollinio.',
    exampleEo: 'La golulo profunde pafis la golŝoton ĝis la mezkampo.'
  },

  // 8. Konkurado (Competition)
  {
    id: 55,
    termEo: 'Ĉampioneco (Ligo)',
    termEn: 'League / Championship',
    category: 'Konkurado',
    definitionEo: 'Longdaŭra konkurso kie ĉiuj teamoj ludas periodajn matĉojn por kolekti poentojn.',
    exampleEo: 'IKEF organizas la unuan internacian Esperanto-ĉampionecon.'
  },
  {
    id: 56,
    termEo: 'Pokalo (Kupo)',
    termEn: 'Cup',
    category: 'Konkurado',
    definitionEo: 'Konkurso bazita ĉefe sur rekta elimino de la malvenkantoj.',
    exampleEo: 'La Pokala turniro okazas ĉiujare dum la Somera Kongreso.'
  },
  {
    id: 57,
    termEo: 'Finalo',
    termEn: 'Final',
    category: 'Konkurado',
    definitionEo: 'La lasta kaj decida matĉo de turniro por determini la ĉampionon.',
    exampleEo: 'Miloj da adorantoj spektis la grandiozan finalon.'
  },
  {
    id: 58,
    termEo: 'Duonfinalo',
    termEn: 'Semi-final',
    category: 'Konkurado',
    definitionEo: 'La rando antaŭ la finalo; matĉoj inter la lastaj kvar ceteraj teamoj.',
    exampleEo: 'Venko en la duonfinalo garantias medalon.'
  },
  {
    id: 59,
    termEo: 'Kvaronfinalo',
    termEn: 'Quarter-final',
    category: 'Konkurado',
    definitionEo: 'Matĉoj inter la lastaj ok teamoj de la turniro.',
    exampleEo: 'Oko da plej bonaj teamoj elkonkuras en la kvaronfinalo.'
  },
  {
    id: 60,
    termEo: 'Grupo',
    termEn: 'Group',
    category: 'Konkurado',
    definitionEo: 'Subdivido de teamoj en la frua fazo de turniro (ekz. "Grupo A").',
    exampleEo: 'Nia teamo sukcese kvalifikiĝis el Grupo A.'
  },
  {
    id: 61,
    termEo: 'Rangotabelo',
    termEn: 'Standings / Table',
    category: 'Konkurado',
    definitionEo: 'La klasifiko de la teamoj laŭ iliaj gajnitaj poentoj kaj goloj.',
    exampleEo: 'Post kvin venkoj, ni estas ĉe la pinto de la rangotabelo.'
  },

  // 9. Trejnado (Training)
  {
    id: 62,
    termEo: 'Varmigo',
    termEn: 'Warm-up',
    category: 'Trejnado',
    definitionEo: 'Komencaj facilaj ekzercoj por prepari la muskolojn kaj la kardiovaskulan sistemon por la penado.',
    exampleEo: 'Dudekminuta varmigo estas deviga antaŭ ĉiu matĉo.'
  },
  {
    id: 63,
    termEo: 'Malvarmigo',
    termEn: 'Cool-down',
    category: 'Trejnado',
    definitionEo: 'Finaj ekzercoj (kiel streĉado kaj malrapida kuro) por iom post iom revenigi la korpon al ripoza stato.',
    exampleEo: 'Ne forgesu la malvarmigon por eviti muskolajn dolorojn.'
  },
  {
    id: 64,
    termEo: 'Trejna sesio',
    termEn: 'Training session',
    category: 'Trejnado',
    definitionEo: 'Difinita tempoperiodo dediĉita al la fizika aŭ taktika trejnado en tago.',
    exampleEo: 'La matena trejna sesio temis pri rapidaj pasedoj kaj taktiko.'
  },
  {
    id: 65,
    termEo: 'Reakiro',
    termEn: 'Recovery',
    category: 'Trejnado',
    definitionEo: 'Procezo ripozigi la korpon post intensa penado por eviti vundojn kaj adapti la muskolojn.',
    exampleEo: 'Taŭga nutrado kaj dormo estas esencaj por bona reakiro.'
  },
  {
    id: 66,
    termEo: 'Fortotrejnado',
    termEn: 'Strength training',
    category: 'Trejnado',
    definitionEo: 'Ekzercoj uzantaj pezojn aŭ reziston por pliigi muskolan forton.',
    exampleEo: 'Fortotrejnado helpas al ludantoj gajni fizikajn duelo-batalojn.'
  },
  {
    id: 67,
    termEo: 'Spirtrejnado (aŭ Spir-ekzercado)',
    termEn: 'Respiratory training',
    category: 'Trejnado',
    definitionEo: 'Specifa trejnado de la spiraj muskoloj (kiel la diafragmo) por plibonigi pulman efikecon, kio rekte optimigas la eltenemon de la futbalisto dum la matĉo.',
    exampleEo: 'Modernaj sportistoj uzas spirtrejnadon por plibonigi pulman efikecon.'
  },
  {
    id: 68,
    termEo: 'Eltenemo',
    termEn: 'Endurance',
    category: 'Trejnado',
    definitionEo: 'La kapablo de la atleto rezisti al laceco dum longdaŭra fizika agado.',
    exampleEo: 'Alta eltenemo permesas al ludantoj kuregi senhalte dum 90 minutoj.'
  },
  {
    id: 69,
    termEo: 'Rapideco',
    termEn: 'Speed',
    category: 'Trejnado',
    definitionEo: 'La kapablo kovri distancon en la plej mallonga ebla tempo.',
    exampleEo: 'Lia rimarkinda rapideco kreas grandegan avantaĝon sur la flanko.'
  },
  {
    id: 70,
    termEo: 'Eksplodforto',
    termEn: 'Explosive power',
    category: 'Trejnado',
    definitionEo: 'La kapablo generi maksimuman forton en minimuma tempo (ekz. por subita sprinto aŭ salto).',
    exampleEo: 'Eksplodforto bezonatas por alta salto dum kapbato.'
  },
  {
    id: 71,
    termEo: 'Kunordigo',
    termEn: 'Coordination',
    category: 'Trejnado',
    definitionEo: 'La neŭromuskola kapablo precize sinkronigi la movojn de la korpopartoj.',
    exampleEo: 'Bona kunordigo permesas kontroli la pilkon eĉ en malfacilaj pozicioj.'
  },

  // 10. Sporta Scienco (Sports Science)
  {
    id: 72,
    termEo: 'Oksigena konsumo',
    termEn: 'Oxygen consumption',
    category: 'Sporta Scienco',
    definitionEo: 'La kvanto da oksigeno kiun la korpo absorbas kaj uzas por produkti energion dum la metabolo.',
    exampleEo: 'Sporta scienco mezuras oksigenan konsumon dum intensa kuro.'
  },
  {
    id: 73,
    termEo: 'Spirfrekvenco',
    termEn: 'Respiratory rate',
    category: 'Sporta Scienco',
    definitionEo: 'La nombro de spiroj (en- kaj elspiroj) kiujn homo faras en unu minuto.',
    exampleEo: 'Spirfrekvenco pliiĝas rapide kiam la ludanto sprintas.'
  },
  {
    id: 74,
    termEo: 'Korfrekvenco',
    termEn: 'Heart rate',
    category: 'Sporta Scienco',
    definitionEo: 'La nombro de korbatoj po minuto (bpm).',
    exampleEo: 'Lia korfrekvenco dum ripozo estas nur 52 batiĝoj po minuto.'
  },
  {
    id: 75,
    termEo: 'Laktato',
    termEn: 'Lactate',
    category: 'Sporta Scienco',
    definitionEo: 'Kemia kromprodukto de la anaeroba glikolizo; ĝia amasiĝo en la muskoloj kaŭzas la brursenton dum ekstrema sprinto.',
    exampleEo: 'Laktato amasiĝas en la skrapo-muskoloj dum ekstrema sprinto.'
  },
  {
    id: 76,
    termEo: 'Fiziologia rendimento',
    termEn: 'Physiological performance',
    category: 'Sporta Scienco',
    definitionEo: 'La objektiva mezuro de kiel la korpaj sistemoj (koro, pulmoj, muskoloj) funkcias dum maksimuma fizika laboro.',
    exampleEo: 'Laboratoriaj testoj kontrolas la fiziologian rendimenton de ludantoj.'
  },
  {
    id: 77,
    termEo: 'Maksimuma oksigenkonsumo (VO2max)',
    termEn: 'Maximal oxygen uptake (VO2max)',
    category: 'Sporta Scienco',
    definitionEo: 'La maksimuma indico je kiu la korpo de futbalisto povas konsumi oksigenon dum intensa ekzercado; la ĉefa indikilo de aeroba eltenemo.',
    exampleEo: 'Alta VO2max estas la ĉefa indikilo de supervalora aeroba eltenemo.'
  },
  {
    id: 78,
    termEo: 'Resaniĝo (Fiziologia)',
    termEn: 'Physiological recovery',
    category: 'Sporta Scienco',
    definitionEo: 'La rapido kaj efikeco de la metabolaj sistemoj por reveni al homeostazo (ekvilibro).',
    exampleEo: 'Fiziologia resaniĝo rapidiĝas per taŭga hidratajo kaj spirtrejnado.'
  },
  {
    id: 79,
    termEo: 'Muskola laceco',
    termEn: 'Muscle fatigue',
    category: 'Sporta Scienco',
    definitionEo: 'La provizora malkreziĝo de la muskola kapablo generi forton pro intensa laboro kaj energia malplenigo.',
    exampleEo: 'Muskola laceco aperas tipe post pli ol 75 minutoj da intensa ludo.'
  },
  {
    id: 80,
    termEo: 'HRV (Korfrekvenca variado)',
    termEn: 'Heart Rate Variability (HRV)',
    category: 'Sporta Scienco',
    definitionEo: 'La variaĵo en la tempintervaloj inter sinsekvaj korbatoj; decida indikilo por mezuri la staton de la aŭtonoma nerva sistemo kaj la pretecon de la ludanto por trejnado.',
    exampleEo: 'Analizo de HRV montras ĉu la ludanto estas sufiĉe ripozinta por la matĉo.'
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
  },
  {
    id: 5,
    titleEo: 'Alvoko al Kunlaborantoj: Platforma Evoluigo, Verki & Redakti',
    titleEn: 'Call for Collaborators: Platform Development & Content Writing',
    organization: 'IKEF Futbalo - Platforma & Enhava Teamo',
    location: 'Interrete / Remote Global',
    type: 'Collaborator',
    typeEo: 'Alvoko al Kunlaborantoj',
    descriptionEo: 'Ni invitas motivitajn membrojn, programistojn, verkistojn kaj futbal-entuziasmulojn aliĝi al la evoluigo de nia platformo! Kunlaboru por skribi artikolojn, plibonigi la ciferecan futbalan vortaron, kaj konstrui novajn funkciojn por la tutmonda Esperanta futbala komunumo.',
    descriptionEn: 'We invite passionate members, developers, writers, and football enthusiasts to join our platform development team! Collaborate to write articles, refine the digital football dictionary, and build new features for the global Esperanto football community.',
    requirementsEo: [
      'Intereso pri futbalo, lingvoj, verkado aŭ reteja evoluigo',
      'Desiro kontribui al la oficiala Esperanta futbala platformo',
      'Kapablo kunlabori en interreta teamo'
    ],
    requirementsEn: [
      'Interest in football, languages, writing, or web development',
      'Desire to contribute to the official Esperanto football platform',
      'Ability to collaborate in an online team'
    ],
    deadline: 'Malfermita / Open',
    featured: true,
    tags: ['Evoluigo', 'Verkado', 'Vortaro', 'Kunlaboro', 'Remote']
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
