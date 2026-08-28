/**
 * Données de démonstration pour l'évaluation (correction rapide, fluence, bilan).
 * Structures identiques à celles de l'application réelle : seule l'UI est refondue.
 */

export type StatusKey = "A" | "PA" | "NA" | "NF" | "AB";

export type Status = {
  key: StatusKey;
  label: string;
  short: string;
  /** touche clavier associée */
  hotkey: string;
  /** token css : bg-status-<token> / text-status-<token>-foreground */
  token: "a" | "pa" | "na" | "nf" | "ab";
};

export const STATUSES: Status[] = [
  { key: "A", label: "Acquis", short: "A", hotkey: "a", token: "a" },
  { key: "PA", label: "Partiellement acquis", short: "PA", hotkey: "p", token: "pa" },
  { key: "NA", label: "Non acquis", short: "NA", hotkey: "n", token: "na" },
  { key: "NF", label: "Non fait", short: "NF", hotkey: "f", token: "nf" },
  { key: "AB", label: "Absent", short: "AB", hotkey: "b", token: "ab" },
];

export const STATUS_BY_KEY: Record<StatusKey, Status> = Object.fromEntries(
  STATUSES.map((s) => [s.key, s]),
) as Record<StatusKey, Status>;

export type Student = {
  id: string;
  firstName: string;
  lastName: string;
};

export type ClassroomKey = "boulard" | "durand" | "grimal";

export type ClassroomDefinition = {
  key: ClassroomKey;
  displayName: string;
  initials: string;
  classLabel: string;
  schoolLabel: string;
  students: Student[];
};

const ROMAIN_ROLLAND_COLLEAGUE_STUDENTS: Student[] = [
  { id: "grimal-1", firstName: "Ashley", lastName: "Banzouzi-Ndala" },
  { id: "grimal-2", firstName: "Oceane", lastName: "Da Silva Bridanne" },
  { id: "grimal-3", firstName: "Maïa", lastName: "Da Veiga Cotillard" },
  { id: "grimal-4", firstName: "Mauro", lastName: "Dos Santos Mendes Vaz" },
  { id: "grimal-5", firstName: "Mylhan", lastName: "Dunyach" },
  { id: "grimal-6", firstName: "Ayaz", lastName: "Dursun" },
  { id: "grimal-7", firstName: "Lyna", lastName: "Ettabia" },
  { id: "grimal-8", firstName: "DANIEL", lastName: "Ferreira Castro" },
  { id: "grimal-9", firstName: "FODIE", lastName: "Gassama" },
  { id: "grimal-10", firstName: "Mah-Bintou", lastName: "Keita" },
  { id: "durand-1", firstName: "Thania", lastName: "Agad" },
  { id: "durand-2", firstName: "Nousseyba", lastName: "Kherbach" },
  { id: "durand-3", firstName: "Aurelio", lastName: "Lutumba Mateus Sebastiao" },
  { id: "durand-4", firstName: "Nolann", lastName: "Martial" },
  { id: "durand-5", firstName: "Melek", lastName: "Megherbi" },
  { id: "durand-6", firstName: "Victoria", lastName: "Oba" },
  { id: "durand-7", firstName: "Hawa", lastName: "Sangare" },
  { id: "durand-8", firstName: "Souleyman", lastName: "Sano" },
  { id: "durand-9", firstName: "Teo", lastName: "Spac" },
  { id: "durand-10", firstName: "Kimia", lastName: "Tchatat" },
];

const APP_EDITION_STORAGE_KEY = "ardoise-app-edition";
const COLLEAGUE_CLASSROOM_STORAGE_KEY = "ardoise-colleague-classroom";

function normalizeEdition(raw: string | null | undefined): "full" | "collegue" {
  return raw === "collegue" || raw === "colleague" ? "collegue" : "full";
}

function normalizeClassroomKey(raw: string | null | undefined): ClassroomKey | null {
  if (!raw) return null;
  const cleaned = raw.trim().toLowerCase();
  if (cleaned === "boulard") return "boulard";
  if (cleaned === "durand") return "durand";
  if (cleaned === "grimal") return "grimal";
  return null;
}

function readCurrentEdition(): "full" | "collegue" {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const queryEdition = normalizeEdition(url.searchParams.get("edition"));
    if (queryEdition === "collegue") return "collegue";

    const storedEdition = normalizeEdition(window.localStorage.getItem(APP_EDITION_STORAGE_KEY));
    if (storedEdition === "collegue") return "collegue";
  }

  return normalizeEdition(import.meta.env.VITE_ARDOISE_EDITION);
}

function readColleagueClassroom(): ClassroomKey {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    const queryClassroom =
      normalizeClassroomKey(url.searchParams.get("classroom")) ??
      normalizeClassroomKey(url.searchParams.get("teacher"));
    if (queryClassroom && queryClassroom !== "boulard") return queryClassroom;

    const storedClassroom = normalizeClassroomKey(
      window.localStorage.getItem(COLLEAGUE_CLASSROOM_STORAGE_KEY),
    );
    if (storedClassroom && storedClassroom !== "boulard") return storedClassroom;
  }

  const envClassroom = normalizeClassroomKey(import.meta.env.VITE_ARDOISE_COLLEAGUE_CLASSROOM);
  return envClassroom === "grimal" || envClassroom === "durand" ? envClassroom : "durand";
}

export const CLASSROOMS: Record<ClassroomKey, ClassroomDefinition> = {
  // CE1 D — M. BOULARD — École Romain Rolland — Vigneux-sur-Seine — 2026-2027
  boulard: {
    key: "boulard",
    displayName: "M. Boulard",
    initials: "MB",
    classLabel: "CE1 · 2026-2027",
    schoolLabel: "11 élèves · École Romain Rolland",
    students: [
      { id: "el-1", firstName: "Ysmaël", lastName: "Abdallah" },
      { id: "el-2", firstName: "Fanta", lastName: "Berthe" },
      { id: "el-3", firstName: "Lucas", lastName: "Deproge Ngom" },
      { id: "el-4", firstName: "Ylan", lastName: "Ferjule" },
      { id: "el-5", firstName: "Kamil", lastName: "Mohamed" },
      { id: "el-6", firstName: "Elena", lastName: "Nefous" },
      { id: "el-7", firstName: "Emmanuella", lastName: "Nyapi-Gath" },
      { id: "el-8", firstName: "Fatoumata", lastName: "Sakho" },
      { id: "el-9", firstName: "Nadia Zainab", lastName: "Stolarska Muhammad" },
      { id: "el-10", firstName: "Sayden", lastName: "Tessia" },
      { id: "el-11", firstName: "Lea", lastName: "Yefsah" },
    ],
  },
  durand: {
    key: "durand",
    displayName: "Mme Durand · Mme Grimal",
    initials: "DG",
    classLabel: "CE1 A · 2026-2027",
    schoolLabel: "20 élèves · École Romain Rolland",
    students: ROMAIN_ROLLAND_COLLEAGUE_STUDENTS,
  },
  grimal: {
    key: "grimal",
    displayName: "Mme Durand · Mme Grimal",
    initials: "DG",
    classLabel: "CE1 A · 2026-2027",
    schoolLabel: "20 élèves · École Romain Rolland",
    students: ROMAIN_ROLLAND_COLLEAGUE_STUDENTS,
  },
};

export function resolveCurrentClassroomKey(): ClassroomKey {
  return readCurrentEdition() === "collegue" ? readColleagueClassroom() : "boulard";
}

export function getCurrentClassroom(): ClassroomDefinition {
  return CLASSROOMS[resolveCurrentClassroomKey()];
}

export const CURRENT_CLASSROOM: ClassroomDefinition = new Proxy({} as ClassroomDefinition, {
  get(_target, prop) {
    const classroom = getCurrentClassroom();
    const value = Reflect.get(classroom, prop, classroom);
    return typeof value === "function" ? value.bind(classroom) : value;
  },
  has(_target, prop) {
    return prop in getCurrentClassroom();
  },
  ownKeys() {
    return Reflect.ownKeys(getCurrentClassroom());
  },
  getOwnPropertyDescriptor(_target, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(getCurrentClassroom(), prop);
    return descriptor
      ? { ...descriptor, configurable: true }
      : {
          configurable: true,
          enumerable: true,
          writable: false,
          value: Reflect.get(getCurrentClassroom(), prop),
        };
  },
});

export const STUDENTS: Student[] = new Proxy([] as Student[], {
  get(_target, prop) {
    const students = getCurrentClassroom().students;
    const value = Reflect.get(students, prop, students);
    return typeof value === "function" ? value.bind(students) : value;
  },
  has(_target, prop) {
    return prop in getCurrentClassroom().students;
  },
  ownKeys() {
    return Reflect.ownKeys(getCurrentClassroom().students);
  },
  getOwnPropertyDescriptor(_target, prop) {
    const descriptor = Object.getOwnPropertyDescriptor(getCurrentClassroom().students, prop);
    return descriptor
      ? { ...descriptor, configurable: true }
      : {
          configurable: true,
          enumerable: true,
          writable: false,
          value: Reflect.get(getCurrentClassroom().students, prop),
        };
  },
});

export function initials(student: Student) {
  return `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
}

export function fullName(student: Student) {
  return `${student.firstName} ${student.lastName}`;
}

/* -------------------------------- Exercices ------------------------------- */

export type Exercise = {
  id: string;
  title: string;
  sessionTitle: string;
  subject: "francais" | "maths";
  date: string;
  /** séance du cahier journal à laquelle cet exercice est rattaché */
  sourceSessionId?: string;
  exercisePlan?: import("@/lib/exercise-plans").ExercisePlanItem[];
};

/** Exercices de démonstration (fallback quand aucun exercice réel n'est enregistré). */
export const DEMO_EXERCISES: Exercise[] = [
  {
    id: "ex-1",
    title: "Exercice 3 — Le pluriel des noms",
    sessionTitle: "Français · Orthographe",
    subject: "francais",
    date: "Vendredi 31 juillet",
  },
  {
    id: "ex-2",
    title: "Exercice 5 — Additions posées avec retenue",
    sessionTitle: "Mathématiques · Calcul",
    subject: "maths",
    date: "Jeudi 30 juillet",
  },
];

/* ----------------------------- Catalogue Cléo ----------------------------- */

export type CatalogEntry = {
  id: string;
  title: string;
  /**
   * Français : C=Compréhension V=Vocabulaire G=Grammaire O=Orthographe
   * Maths    : nb=Nombres calc=Calcul gm=Grandeurs geo=Géométrie don=Données
   */
  domain: "C" | "V" | "G" | "O" | "nb" | "calc" | "gm" | "geo" | "don" | "pe";
  period: 1 | 2 | 3 | 4 | 5;
};

export const FRENCH_DOMAINS = new Set(["C", "V", "G", "O", "pe"]);

export const DOMAIN_LABELS: Record<string, string> = {
  // Français (Cléo CE1)
  C: "Compréhension",
  V: "Vocabulaire",
  G: "Grammaire",
  O: "Orthographe",
  // Maths (ACCÈS CE1)
  nb: "Nombres",
  calc: "Calcul",
  gm: "Grandeurs et mesures",
  geo: "Géométrie",
  don: "Organisation de données",
  // MDI Production d'écrit
  pe: "Production d'écrit",
};

export function catalogToExercise(entry: CatalogEntry, date: string): Exercise {
  const isFrench = FRENCH_DOMAINS.has(entry.domain);
  return {
    id: entry.id,
    title: entry.title,
    sessionTitle: isFrench
      ? `Français · ${DOMAIN_LABELS[entry.domain]}`
      : `Mathématiques · ${DOMAIN_LABELS[entry.domain]}`,
    subject: isFrench ? "francais" : "maths",
    date,
  };
}

/** Catalogue complet Le Monde de Cléo CE1 — 71 pages/séances Français. */
export const CLEO_CATALOG: CatalogEntry[] = [
  // ── Période 1 ──────────────────────────────────────────────────────────────
  { id: "e_p1_1", title: "Je comprends ce qui est caché dans un texte", domain: "C", period: 1 },
  { id: "e_p1_2", title: "Je classe les mots dans l'ordre alphabétique", domain: "V", period: 1 },
  {
    id: "e_p1_3",
    title: "Je découvre le singulier et le pluriel des noms",
    domain: "G",
    period: 1,
  },
  { id: "e_p1_4", title: "J'écris les mots avec oi, ou, on", domain: "O", period: 1 },
  { id: "e_p1_5", title: "Je comprends des phrases complexes", domain: "C", period: 1 },
  { id: "e_p1_6", title: "Je découvre les familles de mots (1)", domain: "V", period: 1 },
  { id: "e_p1_7", title: "J'écris les mots avec i/in, ai/ain", domain: "O", period: 1 },
  { id: "e_p1_8", title: "J'accorde le verbe avec le sujet (1)", domain: "G", period: 1 },
  { id: "e_p1_9", title: "J'écris les mots avec ar/ra, ir/ri, or/ro…", domain: "O", period: 1 },
  { id: "e_p1_10", title: "J'associe des phrases et des images", domain: "C", period: 1 },
  { id: "e_p1_11", title: "Je classe les noms en catégories", domain: "V", period: 1 },
  { id: "e_p1_12", title: "Je découvre le passé, le présent et le futur", domain: "G", period: 1 },
  { id: "e_p1_13", title: "J'écris les mots avec ai, an, au, eau", domain: "O", period: 1 },
  // ── Période 2 ──────────────────────────────────────────────────────────────
  { id: "e_p2_1", title: "Je choisis les bons déterminants", domain: "G", period: 2 },
  { id: "e_p2_2", title: "J'écris les mots avec g ou gu", domain: "O", period: 2 },
  {
    id: "e_p2_3",
    title: "Je fais attention à tous les détails de la phrase",
    domain: "V",
    period: 2,
  },
  { id: "e_p2_4", title: "Je comprends des mots qui ont plusieurs sens", domain: "C", period: 2 },
  { id: "e_p2_5", title: "J'accorde le verbe avec le sujet (2)", domain: "G", period: 2 },
  {
    id: "e_p2_6",
    title: "J'écris les mots avec elle, ette, esse, enne, erre",
    domain: "O",
    period: 2,
  },
  {
    id: "e_p2_7",
    title: "Je comprends où commence et où finit une phrase",
    domain: "C",
    period: 2,
  },
  { id: "e_p2_8", title: "Je découvre les diminutifs", domain: "V", period: 2 },
  { id: "e_p2_9", title: "Je reconnais le verbe et le nom (1)", domain: "G", period: 2 },
  { id: "e_p2_10", title: "J'écris les mots avec s ou ss", domain: "O", period: 2 },
  { id: "e_p2_11", title: "J'adapte ma lecture au fil du texte", domain: "C", period: 2 },
  { id: "e_p2_12", title: "J'écris les mots avec rt, rp, rs, st, str…", domain: "O", period: 2 },
  {
    id: "e_p2_13",
    title: "Je conjugue les verbes au présent avec il, elle ou ils, elles",
    domain: "G",
    period: 2,
  },
  { id: "e_p2_14", title: "Je maîtrise l'apostrophe et les liaisons", domain: "V", period: 2 },
  // ── Période 3 ──────────────────────────────────────────────────────────────
  {
    id: "e_p3_1",
    title: "Je trouve le sujet et le verbe de la phrase (1)",
    domain: "G",
    period: 3,
  },
  { id: "e_p3_2", title: "Je forme des mots nouveaux", domain: "V", period: 3 },
  { id: "e_p3_3", title: "Je découpe les mots en syllabes", domain: "V", period: 3 },
  {
    id: "e_p3_4",
    title: "Je conjugue les verbes au présent avec nous et vous",
    domain: "G",
    period: 3,
  },
  { id: "e_p3_5", title: "Je lis différents types de documents", domain: "C", period: 3 },
  { id: "e_p3_6", title: "J'écris les mots avec c ou qu", domain: "O", period: 3 },
  { id: "e_p3_7", title: "Je maîtrise l'accent aigu (é)", domain: "O", period: 3 },
  { id: "e_p3_8", title: "J'accorde l'adjectif avec le nom", domain: "G", period: 3 },
  { id: "e_p3_9", title: "Je trouve le sens d'adjectifs inconnus", domain: "V", period: 3 },
  { id: "e_p3_10", title: "J'écris les mots avec c ou ç", domain: "O", period: 3 },
  {
    id: "e_p3_11",
    title: "Je conjugue les verbes être et avoir au présent",
    domain: "G",
    period: 3,
  },
  {
    id: "e_p3_12",
    title: "Je conjugue les verbes au présent avec je et tu",
    domain: "G",
    period: 3,
  },
  { id: "e_p3_13", title: "Je comprends de qui ou de quoi on parle", domain: "C", period: 3 },
  { id: "e_p3_14", title: "J'écris des verbes au pluriel", domain: "G", period: 3 },
  { id: "e_p3_15", title: "Je comprends le sens propre et le sens figuré", domain: "C", period: 3 },
  // ── Période 4 ──────────────────────────────────────────────────────────────
  { id: "e_p4_1", title: "Je connais les pronoms sujets", domain: "G", period: 4 },
  { id: "e_p4_2", title: "Je conjugue les verbes au futur", domain: "G", period: 4 },
  { id: "e_p4_3", title: "J'écris les mots avec g ou ge", domain: "O", period: 4 },
  {
    id: "e_p4_4",
    title: "J'écris les mots avec in/ine, ain/aine, ein/eine, un/une",
    domain: "O",
    period: 4,
  },
  { id: "e_p4_5", title: "Je reconnais le verbe et le nom (2)", domain: "G", period: 4 },
  {
    id: "e_p4_6",
    title: "Je comprends dans quel ordre se passent les choses",
    domain: "C",
    period: 4,
  },
  { id: "e_p4_7", title: "J'écris les mots avec h, ch, ph", domain: "O", period: 4 },
  { id: "e_p4_8", title: "Je maîtrise l'accent grave (è)", domain: "O", period: 4 },
  { id: "e_p4_9", title: "J'écris les mots avec am, em, im, om", domain: "O", period: 4 },
  {
    id: "e_p4_10",
    title: "Je manipule les groupes nominaux et les pronoms",
    domain: "G",
    period: 4,
  },
  { id: "e_p4_11", title: "Je découvre les adverbes en -ment", domain: "V", period: 4 },
  { id: "e_p4_12", title: "Je conjugue les verbes à l'imparfait", domain: "G", period: 4 },
  { id: "e_p4_13", title: "Je coupe des phrases en groupes de sens", domain: "C", period: 4 },
  // ── Période 5 ──────────────────────────────────────────────────────────────
  { id: "e_p5_1", title: "J'écris les mots avec ail, eil, euil, ouil", domain: "O", period: 5 },
  { id: "e_p5_2", title: "Je découvre les familles de mots (2)", domain: "V", period: 5 },
  {
    id: "e_p5_3",
    title: "Je reconnais les noms propres et les noms communs",
    domain: "G",
    period: 5,
  },
  { id: "e_p5_4", title: "Je découvre le passé composé", domain: "G", period: 5 },
  { id: "e_p5_5", title: "Je transforme des phrases", domain: "G", period: 5 },
  {
    id: "e_p5_6",
    title: "J'écris les mots avec ille, aille, eille, euille, ouille",
    domain: "O",
    period: 5,
  },
  {
    id: "e_p5_7",
    title: "Je fais un dessin pour montrer que j'ai compris",
    domain: "C",
    period: 5,
  },
  {
    id: "e_p5_8",
    title: "Je reconnais les familles de mots et les classes grammaticales",
    domain: "V",
    period: 5,
  },
  { id: "e_p5_9", title: "Je manipule des adjectifs", domain: "G", period: 5 },
  {
    id: "e_p5_10",
    title: "Je trouve le sujet et le verbe de la phrase (2)",
    domain: "G",
    period: 5,
  },
  { id: "e_p5_11", title: "J'écris les mots avec gn ou gu", domain: "O", period: 5 },
  { id: "e_p5_12", title: "Je découvre les préfixes", domain: "V", period: 5 },
  { id: "e_p5_13", title: "Je découvre les niveaux de langue", domain: "V", period: 5 },
  {
    id: "e_p5_14",
    title: "J'écris le masculin et le féminin des adjectifs",
    domain: "O",
    period: 5,
  },
  { id: "e_p5_15", title: "J'organise les mots du général au particulier", domain: "V", period: 5 },
  { id: "e_p5_16", title: "J'écris les mots avec oi, oin, ion", domain: "O", period: 5 },
];

/** Catalogue ACCÈS CE1 — Mathématiques — 35 modules. */
export const MATHS_CATALOG: CatalogEntry[] = [
  // ── Période 1 ──────────────────────────────────────────────────────────────
  {
    id: "m1",
    title: "Module 1 — Écritures chiffrées des nombres jusqu'à 100",
    domain: "nb",
    period: 1,
  },
  { id: "m2", title: "Module 2 — Nombres entiers jusqu'à 100", domain: "nb", period: 1 },
  {
    id: "m3",
    title: "Module 3 — Lecture et écriture des nombres jusqu'à 100",
    domain: "nb",
    period: 1,
  },
  { id: "m4", title: "Module 4 — Comparaison des nombres jusqu'à 100", domain: "nb", period: 1 },
  { id: "m5", title: "Module 5 — Groupements par 10 et par 100", domain: "nb", period: 1 },
  { id: "m6", title: "Module 6 — Calcul posé : addition", domain: "calc", period: 1 },
  { id: "m7", title: "Module 7 — Alignement et milieu", domain: "geo", period: 1 },
  // ── Période 2 ──────────────────────────────────────────────────────────────
  { id: "m8", title: "Module 8 — Nombres entiers jusqu'à 1000", domain: "nb", period: 2 },
  {
    id: "m9",
    title: "Module 9 — Lecture et écriture des nombres jusqu'à 1000",
    domain: "nb",
    period: 2,
  },
  {
    id: "m10",
    title: "Module 10 — Longueurs : le mètre et le centimètre",
    domain: "gm",
    period: 2,
  },
  { id: "m11", title: "Module 11 — Comparaison des nombres jusqu'à 1000", domain: "nb", period: 2 },
  { id: "m12", title: "Module 12 — Fractions : moitié, quart et tiers", domain: "nb", period: 2 },
  { id: "m13", title: "Module 13 — Fractions", domain: "nb", period: 2 },
  { id: "m14", title: "Module 14 — Monnaie", domain: "gm", period: 2 },
  // ── Période 3 ──────────────────────────────────────────────────────────────
  {
    id: "m15",
    title: "Module 15 — Multiplication (sens, commutativité)",
    domain: "calc",
    period: 3,
  },
  {
    id: "m16",
    title: "Module 16 — Multiplication (structure rectangulaire)",
    domain: "calc",
    period: 3,
  },
  { id: "m17", title: "Module 17 — Calcul posé : soustraction", domain: "calc", period: 3 },
  {
    id: "m18",
    title: "Module 18 — Fractions (interpréter, écrire, lire ≤ 1)",
    domain: "nb",
    period: 3,
  },
  { id: "m19", title: "Module 19 — Monnaie", domain: "gm", period: 3 },
  { id: "m20", title: "Module 20 — Carrés", domain: "geo", period: 3 },
  // ── Période 4 ──────────────────────────────────────────────────────────────
  {
    id: "m21",
    title: "Module 21 — Calcul posé : soustraction à 3 chiffres",
    domain: "calc",
    period: 4,
  },
  { id: "m22", title: "Module 22 — Fractions (comparer, additionner)", domain: "nb", period: 4 },
  { id: "m23", title: "Module 23 — Rectangles", domain: "geo", period: 4 },
  { id: "m24", title: "Module 24 — Demi-droite graduée", domain: "nb", period: 4 },
  { id: "m25", title: "Module 25 — Lecture de l'heure", domain: "gm", period: 4 },
  { id: "m26", title: "Module 26 — Durées", domain: "gm", period: 4 },
  { id: "m27", title: "Module 27 — Longueurs : le kilomètre", domain: "gm", period: 4 },
  // ── Période 5 ──────────────────────────────────────────────────────────────
  { id: "m28", title: "Module 28 — Tableaux et diagrammes en barres", domain: "don", period: 5 },
  {
    id: "m29",
    title: "Module 29 — Construction de carrés et de rectangles",
    domain: "geo",
    period: 5,
  },
  { id: "m30", title: "Module 30 — Triangles rectangles", domain: "geo", period: 5 },
  { id: "m31", title: "Module 31 — Masses", domain: "gm", period: 5 },
  { id: "m32", title: "Module 32 — Cercles et disques", domain: "geo", period: 5 },
  { id: "m33", title: "Module 33 — Nombres ordinaux", domain: "nb", period: 5 },
  { id: "m34", title: "Module 34 — Solides", domain: "geo", period: 5 },
  { id: "m35", title: "Module 35 — Codage du déplacement d'un robot", domain: "geo", period: 5 },
];

/* ─────────────── Catalogue Orthographémic CE1 ─────────────── */

export type OrthoEntry = {
  id: string;
  title: string;
  weekNum: number;
  letter: "a" | "o" | "e" | "c" | "g" | "s" | "i" | "";
  chapNum: number;
  type: "diagnostic" | "decouverte" | "standard" | "evaluation" | "revision" | "jeux_final";
  period: 1 | 2 | 3 | 4 | 5;
};

export const ORTHO_LETTER_LABELS: Record<string, string> = {
  "": "Diagnostique",
  a: "Lettre A",
  o: "Lettre O",
  e: "Lettre E",
  c: "Lettre C",
  g: "Lettre G",
  s: "Lettre S",
  i: "Lettre I",
};

export const ORTHO_TYPE_LABELS: Record<string, string> = {
  diagnostic: "Diagnostic",
  decouverte: "Découverte",
  standard: "Renforcement",
  evaluation: "Évaluation",
  revision: "Révision",
  jeux_final: "Révision / Jeux",
};

/** Catalogue Orthographémic CE1 — 36 semaines réparties sur 5 périodes. */
export const ORTHO_CATALOG: OrthoEntry[] = [
  // ── Période 1 (S1–7) ──────────────────────────────────────────────────────
  {
    id: "ortho-s1",
    weekNum: 1,
    letter: "",
    chapNum: 0,
    type: "diagnostic",
    period: 1,
    title: "Évaluations diagnostiques",
  },
  {
    id: "ortho-s2",
    weekNum: 2,
    letter: "a",
    chapNum: 1,
    type: "decouverte",
    period: 1,
    title: "Les valeurs sonores de la lettre a",
  },
  {
    id: "ortho-s3",
    weekNum: 3,
    letter: "a",
    chapNum: 1,
    type: "standard",
    period: 1,
    title: "a, à, â / eau, au",
  },
  {
    id: "ortho-s4",
    weekNum: 4,
    letter: "a",
    chapNum: 1,
    type: "standard",
    period: 1,
    title: "an, am / ain, aim",
  },
  {
    id: "ortho-s5",
    weekNum: 5,
    letter: "a",
    chapNum: 1,
    type: "standard",
    period: 1,
    title: "ai, ay / aill, aille",
  },
  {
    id: "ortho-s6",
    weekNum: 6,
    letter: "a",
    chapNum: 1,
    type: "evaluation",
    period: 1,
    title: "Révision et évaluation — lettre a",
  },
  {
    id: "ortho-s7",
    weekNum: 7,
    letter: "o",
    chapNum: 2,
    type: "decouverte",
    period: 1,
    title: "Les valeurs sonores de la lettre o",
  },
  // ── Période 2 (S8–14) ─────────────────────────────────────────────────────
  {
    id: "ortho-s8",
    weekNum: 8,
    letter: "o",
    chapNum: 2,
    type: "standard",
    period: 2,
    title: "o, ô / ou, où",
  },
  {
    id: "ortho-s9",
    weekNum: 9,
    letter: "o",
    chapNum: 2,
    type: "standard",
    period: 2,
    title: "am, om / oi, oy",
  },
  {
    id: "ortho-s10",
    weekNum: 10,
    letter: "o",
    chapNum: 2,
    type: "standard",
    period: 2,
    title: "oin, ouin / oe, oeu",
  },
  {
    id: "ortho-s11",
    weekNum: 11,
    letter: "o",
    chapNum: 2,
    type: "standard",
    period: 2,
    title: "ouil, ouill, ouille",
  },
  {
    id: "ortho-s12",
    weekNum: 12,
    letter: "o",
    chapNum: 2,
    type: "evaluation",
    period: 2,
    title: "Révision et évaluation — lettre o",
  },
  {
    id: "ortho-s13",
    weekNum: 13,
    letter: "e",
    chapNum: 3,
    type: "decouverte",
    period: 2,
    title: "Les valeurs sonores de la lettre e",
  },
  {
    id: "ortho-s14",
    weekNum: 14,
    letter: "e",
    chapNum: 3,
    type: "standard",
    period: 2,
    title: "e, eu, œu / è, er, ez, et",
  },
  // ── Période 3 (S15–21) ────────────────────────────────────────────────────
  {
    id: "ortho-s15",
    weekNum: 15,
    letter: "e",
    chapNum: 3,
    type: "standard",
    period: 3,
    title: "et, ei, è, ê / en, em",
  },
  {
    id: "ortho-s16",
    weekNum: 16,
    letter: "e",
    chapNum: 3,
    type: "standard",
    period: 3,
    title: "ein / eil, eill, eille",
  },
  {
    id: "ortho-s17",
    weekNum: 17,
    letter: "e",
    chapNum: 3,
    type: "standard",
    period: 3,
    title: "e = é / euil, euill, euille, ueil, ueill",
  },
  {
    id: "ortho-s18",
    weekNum: 18,
    letter: "e",
    chapNum: 3,
    type: "evaluation",
    period: 3,
    title: "Révision et évaluation — lettre e",
  },
  {
    id: "ortho-s19",
    weekNum: 19,
    letter: "c",
    chapNum: 4,
    type: "decouverte",
    period: 3,
    title: "Les valeurs sonores de la lettre c",
  },
  {
    id: "ortho-s20",
    weekNum: 20,
    letter: "c",
    chapNum: 4,
    type: "standard",
    period: 3,
    title: "c = /k/ / c, ç = /s/",
  },
  {
    id: "ortho-s21",
    weekNum: 21,
    letter: "c",
    chapNum: 4,
    type: "standard",
    period: 3,
    title: "cc / sc",
  },
  // ── Période 4 (S22–28) ────────────────────────────────────────────────────
  {
    id: "ortho-s22",
    weekNum: 22,
    letter: "c",
    chapNum: 4,
    type: "standard",
    period: 4,
    title: "ch / Consolidation c, ç = /s/ et c = /k/",
  },
  {
    id: "ortho-s23",
    weekNum: 23,
    letter: "c",
    chapNum: 4,
    type: "evaluation",
    period: 4,
    title: "Révision et évaluation — lettre c",
  },
  {
    id: "ortho-s24",
    weekNum: 24,
    letter: "g",
    chapNum: 5,
    type: "decouverte",
    period: 4,
    title: "Les valeurs sonores de la lettre g",
  },
  {
    id: "ortho-s25",
    weekNum: 25,
    letter: "g",
    chapNum: 5,
    type: "standard",
    period: 4,
    title: "g, gg, gu = /g/",
  },
  {
    id: "ortho-s26",
    weekNum: 26,
    letter: "g",
    chapNum: 5,
    type: "standard",
    period: 4,
    title: "g, ge = /j/ / gn",
  },
  {
    id: "ortho-s27",
    weekNum: 27,
    letter: "g",
    chapNum: 5,
    type: "evaluation",
    period: 4,
    title: "Révision et évaluation — lettre g",
  },
  {
    id: "ortho-s28",
    weekNum: 28,
    letter: "s",
    chapNum: 6,
    type: "decouverte",
    period: 4,
    title: "Les valeurs sonores de la lettre s",
  },
  // ── Période 5 (S29–36) ────────────────────────────────────────────────────
  {
    id: "ortho-s29",
    weekNum: 29,
    letter: "s",
    chapNum: 6,
    type: "standard",
    period: 5,
    title: "s muet / s, ss = /s/",
  },
  {
    id: "ortho-s30",
    weekNum: 30,
    letter: "s",
    chapNum: 6,
    type: "standard",
    period: 5,
    title: "s = /z/ / consolidation de la lettre s",
  },
  {
    id: "ortho-s31",
    weekNum: 31,
    letter: "s",
    chapNum: 6,
    type: "evaluation",
    period: 5,
    title: "Révision et évaluation — lettre s",
  },
  {
    id: "ortho-s32",
    weekNum: 32,
    letter: "i",
    chapNum: 7,
    type: "decouverte",
    period: 5,
    title: "Les valeurs sonores de la lettre i",
  },
  {
    id: "ortho-s33",
    weekNum: 33,
    letter: "i",
    chapNum: 7,
    type: "standard",
    period: 5,
    title: "i, î, ï, ill, ille",
  },
  {
    id: "ortho-s34",
    weekNum: 34,
    letter: "i",
    chapNum: 7,
    type: "revision",
    period: 5,
    title: "Révision des graphèmes (ail, ouil, eil, euil, ueil)",
  },
  {
    id: "ortho-s35",
    weekNum: 35,
    letter: "i",
    chapNum: 7,
    type: "standard",
    period: 5,
    title: "ier, ière / in, im",
  },
  {
    id: "ortho-s36",
    weekNum: 36,
    letter: "i",
    chapNum: 7,
    type: "jeux_final",
    period: 5,
    title: "Révision et jeux (fin de méthode)",
  },
];

/* ─────────────── Catalogue Langage oral CE — Nathan & Delaporte ─────────── */

export type OralEntry = {
  id: string;
  seanceNum: number;
  title: string;
  domain: "francais" | "arts" | "eps" | "emc" | "questionner_monde" | "maths";
  subDomain?: "etude_langue" | "articulation" | "expression" | "mise_en_voix" | "comprehension";
  period: 1 | 2 | 3 | 4 | 5;
};

export const ORAL_DOMAIN_LABELS: Record<string, string> = {
  francais: "Français",
  arts: "Arts",
  eps: "EPS",
  emc: "EMC",
  questionner_monde: "Questionner le monde",
  maths: "Mathématiques",
};

export const ORAL_SUBDOMAIN_LABELS: Record<string, string> = {
  etude_langue: "Étude de la langue",
  articulation: "Articulation",
  expression: "Expression / Communication",
  mise_en_voix: "Mise en voix",
  comprehension: "Compréhension",
};

/** Catalogue Langage oral CE — Nathan & Delaporte — 30 séances réparties sur 5 périodes. */
export const ORAL_CATALOG: OralEntry[] = [
  // ── Période 1 (S1–6) — Étude de la langue + Articulation ─────────────────
  {
    id: "oral-s1",
    seanceNum: 1,
    domain: "francais",
    subDomain: "etude_langue",
    period: 1,
    title: "Faire deviner des expressions idiomatiques",
  },
  {
    id: "oral-s2",
    seanceNum: 2,
    domain: "francais",
    subDomain: "etude_langue",
    period: 1,
    title: "Construire des phrases avec des mots précis",
  },
  {
    id: "oral-s3",
    seanceNum: 3,
    domain: "francais",
    subDomain: "etude_langue",
    period: 1,
    title: "Utiliser des adjectifs qualificatifs",
  },
  {
    id: "oral-s4",
    seanceNum: 4,
    domain: "francais",
    subDomain: "etude_langue",
    period: 1,
    title: "Jouer (jeux de grammaire)",
  },
  {
    id: "oral-s5",
    seanceNum: 5,
    domain: "francais",
    subDomain: "etude_langue",
    period: 1,
    title: "Ajouter des mots pour construire une phrase",
  },
  {
    id: "oral-s6",
    seanceNum: 6,
    domain: "francais",
    subDomain: "articulation",
    period: 1,
    title: "Articuler / Les onomatopées",
  },
  // ── Période 2 (S7–12) — Articulation + Expression + Mise en voix ──────────
  {
    id: "oral-s7",
    seanceNum: 7,
    domain: "francais",
    subDomain: "articulation",
    period: 2,
    title: "Articuler / Les graphèmes complexes",
  },
  {
    id: "oral-s8",
    seanceNum: 8,
    domain: "francais",
    subDomain: "expression",
    period: 2,
    title: "Participer à un jogging oral",
  },
  {
    id: "oral-s9",
    seanceNum: 9,
    domain: "francais",
    subDomain: "expression",
    period: 2,
    title: "Dialoguer",
  },
  {
    id: "oral-s10",
    seanceNum: 10,
    domain: "francais",
    subDomain: "mise_en_voix",
    period: 2,
    title: "S'adresser à un auditoire (techniques)",
  },
  {
    id: "oral-s11",
    seanceNum: 11,
    domain: "francais",
    subDomain: "mise_en_voix",
    period: 2,
    title: "Mettre en voix",
  },
  {
    id: "oral-s12",
    seanceNum: 12,
    domain: "francais",
    subDomain: "mise_en_voix",
    period: 2,
    title: "Lire à haute voix un texte documentaire",
  },
  // ── Période 3 (S13–18) — Compréhension + Arts + EPS ─────────────────────
  {
    id: "oral-s13",
    seanceNum: 13,
    domain: "francais",
    subDomain: "comprehension",
    period: 3,
    title: "Débattre autour d'un texte",
  },
  {
    id: "oral-s14",
    seanceNum: 14,
    domain: "francais",
    subDomain: "comprehension",
    period: 3,
    title: "Reformuler une histoire",
  },
  {
    id: "oral-s15",
    seanceNum: 15,
    domain: "francais",
    subDomain: "comprehension",
    period: 3,
    title: "Poursuivre un récit",
  },
  {
    id: "oral-s16",
    seanceNum: 16,
    domain: "arts",
    period: 3,
    title: "Raconter une histoire à partir d'un tableau",
  },
  {
    id: "oral-s17",
    seanceNum: 17,
    domain: "arts",
    period: 3,
    title: "Exprimer et justifier ses préférences",
  },
  { id: "oral-s18", seanceNum: 18, domain: "eps", period: 3, title: "Arbitrer un jeu" },
  // ── Période 4 (S19–24) — EPS + EMC + Questionner le monde ────────────────
  {
    id: "oral-s19",
    seanceNum: 19,
    domain: "eps",
    period: 4,
    title: "Installer un jeu d'orientation",
  },
  {
    id: "oral-s20",
    seanceNum: 20,
    domain: "eps",
    period: 4,
    title: "Comprendre et exécuter une danse collective",
  },
  { id: "oral-s21", seanceNum: 21, domain: "emc", period: 4, title: "Qu'est-ce que débattre ?" },
  { id: "oral-s22", seanceNum: 22, domain: "emc", period: 4, title: "Participer à des débats" },
  {
    id: "oral-s23",
    seanceNum: 23,
    domain: "questionner_monde",
    period: 4,
    title: "Décrire des plans",
  },
  {
    id: "oral-s24",
    seanceNum: 24,
    domain: "questionner_monde",
    period: 4,
    title: "Restituer des informations",
  },
  // ── Période 5 (S25–30) — Questionner le monde + Mathématiques ───────────
  {
    id: "oral-s25",
    seanceNum: 25,
    domain: "questionner_monde",
    period: 5,
    title: "Rendre compte d'une expérience",
  },
  {
    id: "oral-s26",
    seanceNum: 26,
    domain: "questionner_monde",
    period: 5,
    title: "Réaliser un court exposé",
  },
  {
    id: "oral-s27",
    seanceNum: 27,
    domain: "maths",
    period: 5,
    title: "Jouer avec le tableau des nombres",
  },
  {
    id: "oral-s28",
    seanceNum: 28,
    domain: "maths",
    period: 5,
    title: "Inventer des énoncés de problèmes",
  },
  { id: "oral-s29", seanceNum: 29, domain: "maths", period: 5, title: "Comparer des longueurs" },
  {
    id: "oral-s30",
    seanceNum: 30,
    domain: "maths",
    period: 5,
    title: "Décrire et faire réaliser une figure géométrique",
  },
];

/** Résultats pré-saisis pour la démonstration du bilan de séance. */
export const SEEDED_RESULTS: Record<string, StatusKey> = (() => {
  const pattern: StatusKey[] = ["A", "PA", "A", "A", "NA", "A", "PA", "A", "NF", "A", "PA"];
  return Object.fromEntries(STUDENTS.map((s, i) => [s.id, pattern[i]!]));
})();

/* --------------------------------- Fluence -------------------------------- */

export const FLUENCE_TARGET = 100;

export const FLUENCE_BENCHMARKS = [
  { label: "Début oct.", value: 50 },
  { label: "Milieu janv.", value: 75 },
  { label: "Fin juin", value: 100 },
];

export type FluenceRecord = {
  studentId: string;
  /** mots correctement lus par minute */
  wpm: number;
  /** historique des relevés de l'année */
  history: { period: string; wpm: number; erreurs?: number }[];
};

const WPMS = [96, 84, 71, 58, 103, 90, 46, 79, 66, 88, 74];

export const FLUENCE: FluenceRecord[] = STUDENTS.map((s, i) => {
  const wpm = WPMS[i]!;
  return {
    studentId: s.id,
    wpm,
    history: [
      { period: "Octobre", wpm: Math.max(12, wpm - 34) },
      { period: "Janvier", wpm: Math.max(18, wpm - 17) },
      { period: "Juin", wpm },
    ],
  };
});

export type FluenceLevel = "ok" | "fragile" | "alerte";

export function fluenceLevel(wpm: number): FluenceLevel {
  if (wpm >= 90) return "ok";
  if (wpm >= 60) return "fragile";
  return "alerte";
}

/** Élèves en difficulté récurrente : fluence faible et statut NA/PA récent. */
export function recurrentStudentNeeds(): { student: Student; reason: string }[] {
  return STUDENTS.filter((s) => {
    const f = FLUENCE.find((x) => x.studentId === s.id);
    const status = SEEDED_RESULTS[s.id];
    return (f ? fluenceLevel(f.wpm) === "alerte" : false) || status === "NA";
  })
    .slice(0, 5)
    .map((student) => {
      const f = FLUENCE.find((x) => x.studentId === student.id);
      const status = SEEDED_RESULTS[student.id];
      return {
        student,
        reason:
          f && fluenceLevel(f.wpm) === "alerte"
            ? `Fluence ${f.wpm} mots/min`
            : `${STATUS_BY_KEY[status!].label} en calcul`,
      };
    });
}
