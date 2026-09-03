/**
 * Données de démonstration Ardoise (CE1).
 * La logique métier réelle (API, DB) reste inchangée : ce module ne sert
 * qu'à alimenter la refonte UI avec des structures identiques à l'existant.
 */

import {
  CLEO_CATALOG,
  MATHS_CATALOG,
  ORAL_CATALOG,
  ORAL_DOMAIN_LABELS,
  ORTHO_CATALOG,
} from "./ardoise-eval";
import type { ExercisePlanItem } from "./exercise-plans";

export type SubjectKey =
  "francais" | "maths" | "qlm" | "emc" | "eps" | "arts" | "lve" | "rituels" | "pause";

export type Subject = {
  key: SubjectKey;
  label: string;
  /** token css : bg-subject-<key> / text-subject-<key>-foreground */
  token: string;
};

export const SUBJECTS: Record<SubjectKey, Subject> = {
  francais: { key: "francais", label: "Français", token: "francais" },
  maths: { key: "maths", label: "Mathématiques", token: "maths" },
  qlm: { key: "qlm", label: "Questionner le monde", token: "qlm" },
  emc: { key: "emc", label: "Enseignement moral et civique", token: "emc" },
  eps: { key: "eps", label: "Éducation physique et sportive", token: "eps" },
  arts: { key: "arts", label: "Arts plastiques", token: "arts" },
  lve: { key: "lve", label: "Langues vivantes", token: "lve" },
  rituels: { key: "rituels", label: "Rituels", token: "rituels" },
  pause: { key: "pause", label: "Pause", token: "pause" },
};

export const SUBJECT_LIST = Object.values(SUBJECTS);

export type PrepPhase = {
  title: string;
  duration?: string;
  detail: string;
  differentiation?: string;
};

export type PrepExercise = {
  id: string;
  page?: number;
  number?: string;
  title?: string;
  instruction: string;
  correction?: string;
};

export type PrepSheet = {
  id: string;
  title: string;
  subject: SubjectKey;
  socleDomains?: string[];
  disciplinaryDomains?: string[];
  objective: string;
  competence: string;
  duration: string;
  phases: PrepPhase[];
  material: string[];
  photocopies: string[];
  vocabulary?: string[];
  languageStructures?: string[];
  studentPages?: number[];
  teacherPages?: number[];
  audioVideo?: string[];
  exercises?: PrepExercise[];
  notes?: string[];
  coverageNote?: string;
  sourceExcerpt?: string;
  illustrations?: PrepIllustration[];
};

export type PrepIllustration = {
  src: string;
  alt?: string;
  caption?: string;
};

export type SessionCorrectionMode = "auto" | "none" | "cleo" | "maths" | "dictation" | "fluence";

export type Session = {
  id: string;
  start: string;
  end: string;
  title: string;
  subject: SubjectKey;
  /** classement pédagogique fin du bloc */
  pedagogicalDomain?: string;
  /** sous-domaine pédagogique fin du bloc */
  pedagogicalSubDomain?: string;
  /** type de bloc issu du constructeur de l'emploi du temps */
  builderTemplateId?: string;
  /** élément de programmation annuelle rattaché à cette séance */
  programmingItemId?: string;
  /** exercices/pages/consignes issus du déroulé de programmation */
  exercisePlan?: ExercisePlanItem[];
  /** séance libre = pas de ressource rattachable */
  free?: boolean;
  prepSheetId?: string;
  /** id de la séance de ressource rattachée (arborescence) */
  resourceId?: string;
  /** type de saisie attendu après la séance */
  correctionMode?: SessionCorrectionMode;
  /** exercice/module explicite à ouvrir dans la correction */
  correctionExerciseId?: string;
  /** période/bilan de fluence visé */
  correctionPeriod?: string;
  note?: string;
};

/* --------------------------------- Fiches -------------------------------- */

export const PREP_SHEETS: PrepSheet[] = [
  {
    id: "fp-emc-1",
    title: "Les métiers ont-ils un genre ?",
    subject: "emc",
    objective:
      "Identifier des représentations stéréotypées liées aux métiers et commencer à questionner ses propres représentations.",
    competence:
      "Appréhender et comprendre l'égalité entre les filles et les garçons et la liberté d'être soi-même.",
    duration: "45 min",
    phases: [
      {
        title: "Mise en situation : le jeu des devinettes",
        duration: "15 min",
        detail:
          "L'enseignant lit à voix haute de courtes devinettes décrivant une personne dans son métier sans mentionner son prénom ni son genre. Les élèves lèvent la main pour répondre, l'enseignant note les réponses spontanées au tableau.",
        differentiation:
          "Les élèves en difficulté de langage peuvent pointer une image plutôt que répondre à l'oral.",
      },
      {
        title: "Découverte et discussion collective",
        duration: "20 min",
        detail:
          "Révéler les illustrations : certaines correspondent aux représentations attendues, d'autres les surprennent (une femme pompier, un homme infirmier). Introduire le mot clé « stéréotype ».",
        differentiation:
          "Les élèves plus avancés expliquent avec leurs mots ce qu'est un stéréotype à un camarade.",
      },
      {
        title: "Trace écrite et illustration",
        duration: "10 min",
        detail:
          "Construire collectivement la phrase bilan : « Les filles et les garçons peuvent faire les mêmes métiers. » Chaque élève la recopie et l'illustre.",
        differentiation:
          "Les élèves en difficulté d'écriture dictent la phrase et se concentrent sur l'illustration.",
      },
    ],
    material: [
      "Illustrations de personnes exerçant différents métiers",
      "Étiquettes avec les noms des métiers",
      "Tableau blanc ou paperboard",
      "Crayons de couleur",
    ],
    photocopies: [
      "Planche d'illustrations métiers (1 par binôme)",
      "Étiquettes métiers (1 jeu par groupe)",
    ],
  },
  {
    id: "fp-fr-1",
    title: "Dictée guidée : les mots invariables",
    subject: "francais",
    objective: "Mémoriser l'orthographe des mots invariables les plus fréquents.",
    competence:
      "Écrire sous la dictée un texte court en respectant les correspondances graphophonologiques.",
    duration: "30 min",
    phases: [
      {
        title: "Rappel de la liste",
        duration: "5 min",
        detail:
          "Lecture collective des 10 mots invariables travaillés dans la semaine, épellation en chaîne.",
      },
      {
        title: "Dictée de phrases",
        duration: "15 min",
        detail:
          "Dictée de trois phrases contenant les mots de la liste, relecture guidée avec code de correction.",
        differentiation: "Dictée à trous pour les élèves du groupe jaune.",
      },
      {
        title: "Correction et auto-évaluation",
        duration: "10 min",
        detail:
          "Correction au tableau, chaque élève colorie sa réussite dans le cahier de progrès.",
      },
    ],
    material: ["Cahier du jour", "Affiche des mots invariables"],
    photocopies: ["Dictée à trous (6 exemplaires)"],
  },
  {
    id: "fp-ma-1",
    title: "Ateliers : la soustraction posée",
    subject: "maths",
    objective: "Poser et calculer une soustraction avec retenue sur des nombres < 100.",
    competence: "Calculer avec des nombres entiers : mettre en œuvre un algorithme de calcul posé.",
    duration: "30 min",
    phases: [
      {
        title: "Atelier dirigé",
        duration: "15 min",
        detail:
          "Manipulation du matériel de numération pour comprendre l'échange dizaine / unités.",
      },
      {
        title: "Ateliers autonomes",
        duration: "15 min",
        detail: "Rotation sur trois ateliers : fichier, jeu de cartes, ardoise.",
        differentiation: "Cartes nombres < 50 pour le groupe bleu.",
      },
    ],
    material: ["Matériel de numération", "Cartes soustraction", "Ardoises"],
    photocopies: ["Fiche d'entraînement soustraction (25 exemplaires)"],
  },
  {
    id: "fp-qlm-1",
    title: "Le cycle de l'eau",
    subject: "qlm",
    objective: "Décrire les grandes étapes du cycle de l'eau.",
    competence: "Situer et décrire des phénomènes naturels observables au quotidien.",
    duration: "40 min",
    phases: [
      {
        title: "Recueil de représentations",
        duration: "10 min",
        detail: "Dessin initial individuel : d'où vient la pluie ?",
      },
      {
        title: "Expérience",
        duration: "20 min",
        detail: "Observation de la condensation sur un couvercle froid.",
      },
      {
        title: "Institutionnalisation",
        duration: "10 min",
        detail: "Schéma collectif légendé du cycle de l'eau.",
      },
    ],
    material: ["Bouilloire", "Couvercle en verre", "Affiche schéma"],
    photocopies: ["Schéma à légender (25 exemplaires)"],
  },
];

export const getPrepSheet = (id?: string) => PREP_SHEETS.find((p) => p.id === id);

/* ------------------------- Arborescence ressources ------------------------ */

export type ResourceSession = {
  id: string;
  label: string;
  prepSheetId: string;
  done?: boolean;
};

export type ResourceSequence = {
  id: string;
  label: string;
  sessions: ResourceSession[];
};

export type ResourceMethod = {
  id: string;
  label: string;
  subject: SubjectKey;
  sequences: ResourceSequence[];
};

/* ─────────────── Méthodes réelles CE1 générées depuis les catalogues ─────── */

const PERIODS_LIST = [1, 2, 3, 4, 5] as const;

const CLEO_RESOURCE: ResourceMethod = {
  id: "m-cleo",
  label: "Cléo CE1 — Français",
  subject: "francais",
  sequences: PERIODS_LIST.map((p) => ({
    id: `s-cleo-p${p}`,
    label: `Période ${p}`,
    sessions: CLEO_CATALOG.filter((e) => e.period === p).map((e) => ({
      id: `rs-${e.id}`,
      label: e.title,
      prepSheetId: "",
    })),
  })).filter((seq) => seq.sessions.length > 0),
};

const ACCES_RESOURCE: ResourceMethod = {
  id: "m-acces",
  label: "ACCÈS CE1 — Mathématiques",
  subject: "maths",
  sequences: PERIODS_LIST.map((p) => ({
    id: `s-acces-p${p}`,
    label: `Période ${p}`,
    sessions: MATHS_CATALOG.filter((e) => e.period === p).map((e) => ({
      id: `rs-${e.id}`,
      label: e.title,
      prepSheetId: "",
    })),
  })).filter((seq) => seq.sessions.length > 0),
};

const ORTHO_CHAPTERS = [
  { chapNum: 0, label: "Évaluations diagnostiques" },
  { chapNum: 1, label: "Chapitre 1 — Lettre A" },
  { chapNum: 2, label: "Chapitre 2 — Lettre O" },
  { chapNum: 3, label: "Chapitre 3 — Lettre E" },
  { chapNum: 4, label: "Chapitre 4 — Lettre C" },
  { chapNum: 5, label: "Chapitre 5 — Lettre G" },
  { chapNum: 6, label: "Chapitre 6 — Lettre S" },
  { chapNum: 7, label: "Chapitre 7 — Lettre I" },
];

const ORTHO_RESOURCE: ResourceMethod = {
  id: "m-ortho",
  label: "Orthographémic CE1",
  subject: "francais",
  sequences: ORTHO_CHAPTERS.map((ch) => ({
    id: `s-ortho-ch${ch.chapNum}`,
    label: ch.label,
    sessions: ORTHO_CATALOG.filter((e) => e.chapNum === ch.chapNum).map((e) => ({
      id: `rs-${e.id}`,
      label: `S${e.weekNum} — ${e.title}`,
      prepSheetId: "",
    })),
  })).filter((seq) => seq.sessions.length > 0),
};

const ORAL_DOMAINS_ORDER = [
  "francais",
  "arts",
  "eps",
  "emc",
  "questionner_monde",
  "maths",
] as const;

const ORAL_RESOURCE: ResourceMethod = {
  id: "m-oral",
  label: "Langage oral CE",
  subject: "francais",
  sequences: ORAL_DOMAINS_ORDER.map((domain) => ({
    id: `s-oral-${domain}`,
    label: ORAL_DOMAIN_LABELS[domain]!,
    sessions: ORAL_CATALOG.filter((e) => e.domain === domain).map((e) => ({
      id: `rs-${e.id}`,
      label: `S${e.seanceNum} — ${e.title}`,
      prepSheetId: "",
    })),
  })).filter((seq) => seq.sessions.length > 0),
};

export const RESOURCE_TREE: ResourceMethod[] = [
  CLEO_RESOURCE,
  ACCES_RESOURCE,
  ORTHO_RESOURCE,
  ORAL_RESOURCE,
  {
    id: "m-emc",
    label: "EMC — Vivre ensemble",
    subject: "emc",
    sequences: [
      {
        id: "s-emc-1",
        label: "Séquence 3 · Égalité filles-garçons",
        sessions: [
          {
            id: "rs-1",
            label: "Séance 1 · Les métiers ont-ils un genre ?",
            prepSheetId: "fp-emc-1",
          },
          {
            id: "rs-2",
            label: "Séance 2 · Choisir un métier : une question de goût",
            prepSheetId: "fp-emc-1",
          },
          {
            id: "rs-3",
            label: "Séance 3 · Filles et garçons, libres de choisir",
            prepSheetId: "fp-emc-1",
          },
        ],
      },
    ],
  },
  {
    id: "m-fr",
    label: "Français — Mots en herbe",
    subject: "francais",
    sequences: [
      {
        id: "s-fr-1",
        label: "Séquence 2 · Orthographe : mots invariables",
        sessions: [
          {
            id: "rs-4",
            label: "Séance 1 · Découverte de la liste",
            prepSheetId: "fp-fr-1",
            done: true,
          },
          { id: "rs-5", label: "Séance 2 · Dictée guidée", prepSheetId: "fp-fr-1" },
          { id: "rs-6", label: "Séance 3 · Dictée bilan", prepSheetId: "fp-fr-1" },
        ],
      },
      {
        id: "s-fr-2",
        label: "Séquence 3 · Lecture : le conte détourné",
        sessions: [
          { id: "rs-7", label: "Séance 1 · Découverte du texte", prepSheetId: "fp-fr-1" },
          { id: "rs-8", label: "Séance 2 · Compréhension fine", prepSheetId: "fp-fr-1" },
        ],
      },
    ],
  },
  {
    id: "m-ma",
    label: "Mathématiques — Cap Maths",
    subject: "maths",
    sequences: [
      {
        id: "s-ma-1",
        label: "Séquence 5 · Calcul posé",
        sessions: [
          { id: "rs-9", label: "Séance 1 · L'addition posée", prepSheetId: "fp-ma-1", done: true },
          { id: "rs-10", label: "Séance 2 · La soustraction posée", prepSheetId: "fp-ma-1" },
          { id: "rs-11", label: "Séance 3 · Problèmes du jour", prepSheetId: "fp-ma-1" },
        ],
      },
    ],
  },
  {
    id: "m-qlm",
    label: "Questionner le monde — Explorer",
    subject: "qlm",
    sequences: [
      {
        id: "s-qlm-1",
        label: "Séquence 1 · L'eau dans tous ses états",
        sessions: [
          { id: "rs-12", label: "Séance 1 · Le cycle de l'eau", prepSheetId: "fp-qlm-1" },
          { id: "rs-13", label: "Séance 2 · Solide, liquide, gaz", prepSheetId: "fp-qlm-1" },
        ],
      },
    ],
  },
];

/* ----------------------------- Emploi du temps ---------------------------- */

/** Trame importable : squelette de la journée (créneaux vides). */
export const TIMETABLE_TEMPLATE: Omit<Session, "id">[] = [
  { start: "08:30", end: "08:45", title: "Rituels", subject: "rituels", free: true },
  { start: "08:45", end: "09:00", title: "Calcul mental", subject: "maths", free: true },
  { start: "09:00", end: "09:30", title: "Ateliers français", subject: "francais" },
  { start: "09:30", end: "10:00", title: "Ateliers mathématiques", subject: "maths" },
  { start: "10:00", end: "10:15", title: "Récréation", subject: "pause", free: true },
  { start: "10:15", end: "10:45", title: "Français", subject: "francais" },
  { start: "10:45", end: "11:15", title: "Mathématiques", subject: "maths" },
  { start: "11:15", end: "11:30", title: "Enseignement moral et civique", subject: "emc" },
  { start: "11:30", end: "13:30", title: "Pause méridienne", subject: "pause", free: true },
  { start: "13:30", end: "14:15", title: "Questionner le monde", subject: "qlm" },
  {
    start: "14:15",
    end: "15:00",
    title: "Éducation physique et sportive",
    subject: "eps",
    free: true,
  },
  { start: "15:15", end: "16:00", title: "Arts plastiques", subject: "arts" },
];

/** Journée déjà renseignée (jour courant de la démo). */
export const SEEDED_DAY: Session[] = [
  { id: "sess-1", start: "08:30", end: "08:45", title: "Rituels", subject: "rituels", free: true },
  {
    id: "sess-2",
    start: "08:45",
    end: "09:00",
    title: "Calcul mental",
    subject: "maths",
    free: true,
  },
  {
    id: "sess-3",
    start: "09:00",
    end: "09:30",
    title: "Ateliers français : écriture, vocabulaire",
    subject: "francais",
    prepSheetId: "fp-fr-1",
  },
  {
    id: "sess-4",
    start: "09:30",
    end: "10:00",
    title: "Ateliers mathématiques",
    subject: "maths",
    prepSheetId: "fp-ma-1",
  },
  { id: "sess-5", start: "10:00", end: "10:15", title: "Récréation", subject: "pause", free: true },
  {
    id: "sess-6",
    start: "10:15",
    end: "10:45",
    title: "Dictée guidée",
    subject: "francais",
    prepSheetId: "fp-fr-1",
  },
  { id: "sess-7", start: "10:45", end: "11:15", title: "Ateliers mathématiques", subject: "maths" },
  {
    id: "sess-8",
    start: "11:15",
    end: "11:30",
    title: "Égalité filles-garçons : libres de choisir nos métiers",
    subject: "emc",
    prepSheetId: "fp-emc-1",
  },
  {
    id: "sess-9",
    start: "11:30",
    end: "13:30",
    title: "Pause méridienne",
    subject: "pause",
    free: true,
  },
  {
    id: "sess-10",
    start: "13:30",
    end: "14:15",
    title: "Le cycle de l'eau",
    subject: "qlm",
    prepSheetId: "fp-qlm-1",
  },
  {
    id: "sess-11",
    start: "14:15",
    end: "15:00",
    title: "Jeux collectifs",
    subject: "eps",
    free: true,
  },
];

/* --------------------------------- Utils --------------------------------- */

export const toISODate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const formatLongDate = (d: Date) =>
  new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(d);

export const durationLabel = (start: string, end: string) => {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const mins = eh * 60 + em - (sh * 60 + sm);
  if (mins >= 60) {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
  }
  return `${mins} min`;
};

export const addDays = (d: Date, n: number) => {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
};
