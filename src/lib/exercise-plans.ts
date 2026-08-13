import {
  CLEO_CATALOG,
  MATHS_CATALOG,
  ORTHO_CATALOG,
  type CatalogEntry,
  type OrthoEntry,
} from "@/lib/ardoise-eval";
import { CLEO_PREP_SHEETS } from "@/lib/cleo-prep-sheets";
import { CLEO_SEANCES } from "@/lib/cleo-seances";
import { CLEO_WORKBOOK_EXERCISES, CLEO_WORKBOOK_PAGE_MAP } from "@/lib/cleo-workbook-data";
import { ACCES_WORKBOOK_EXERCISES, accesCahierCorrigeUrl } from "@/lib/acces-workbook-data";
import { MATHS_PREP_SHEETS_P1 } from "@/lib/maths-prep-sheets-p1";

export type ExercisePlanItem = {
  id: string;
  page?: number;
  label: string;
  instruction: string;
  source: "Cléo" | "ACCÈS" | "Orthographémic";
  studentPages?: number[];
  /** Identifiant de l'exercice du catalogue lié à cet item (quand il existe). */
  exerciseId?: string;
  /** Repère court de l'exercice (ex. « P2-9 »). */
  repere?: string;
  /** Domaine pédagogique de l'item (quand il est connu). */
  domain?: string;
  /** Page du fichier/séquence d'origine. */
  sequencePage?: number;
  /** URL publique de la page du cahier élève (ACCÈS uniquement). */
  cahierPageUrl?: string;
};


export type OrthographemicWeeklyGuide = {
  bilanNumber: number | null;
  weeklyFocus: string;
  chapterExpectations: string[];
  fluenceTargetWpm?: number;
};

const ORTHO_CHAPTER_GUIDE: Record<
  Exclude<OrthoEntry["letter"], "">,
  { expectations: string[]; fluenceTargetWpm: number }
> = {
  a: {
    expectations: [
      "Ecrire des mots avec la lettre a",
      "Appliquer les graphies an/am",
      "Appliquer les graphies ail/aill/aille",
      "Distinguer ai et ain",
    ],
    fluenceTargetWpm: 55,
  },
  o: {
    expectations: [
      "Ecrire des mots avec la lettre o",
      "Appliquer les graphies on/om",
      "Appliquer les graphies ouil/ouill/ouille",
      "Distinguer oi et oin",
    ],
    fluenceTargetWpm: 58,
  },
  e: {
    expectations: [
      "Ecrire des mots avec la lettre e",
      "Distinguer les accents aigu, grave et circonflexe",
      "Appliquer en/em, eil/eill/eille et euil/euill/euille",
      "Distinguer e, e grave, ei et et",
    ],
    fluenceTargetWpm: 60,
  },
  c: {
    expectations: [
      "Ecrire des mots avec la lettre c",
      "Connaitre les valeurs sonores de la lettre c",
      "Distinguer sc et cc",
    ],
    fluenceTargetWpm: 64,
  },
  g: {
    expectations: [
      "Ecrire des mots avec la lettre g",
      "Connaitre les valeurs sonores de la lettre g",
      "Distinguer ge, gu et gn",
    ],
    fluenceTargetWpm: 67,
  },
  s: {
    expectations: [
      "Ecrire des mots avec la lettre s",
      "Connaitre les valeurs sonores de la lettre s",
      "Distinguer s, ss et sc",
    ],
    fluenceTargetWpm: 68,
  },
  i: {
    expectations: [
      "Ecrire des mots avec la lettre i",
      "Appliquer in/im",
      "Connaitre les valeurs sonores de la lettre i",
      "Ecrire des noms de métier avec i au masculin et au féminin",
    ],
    fluenceTargetWpm: 70,
  },
};

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

function pageFrom(text: string): number | undefined {
  const match = text.match(/\bp\.?\s*(\d{1,3})\b/i);
  return match ? Number(match[1]) : undefined;
}

function catalogEntry(id: string): CatalogEntry | OrthoEntry | undefined {
  return [...CLEO_CATALOG, ...MATHS_CATALOG, ...ORTHO_CATALOG].find((entry) => entry.id === id);
}

function isOrthoEntry(entry: CatalogEntry | OrthoEntry): entry is OrthoEntry {
  return "weekNum" in entry;
}

function orthoWeeklyBilanNumber(entry: OrthoEntry): number | null {
  if (entry.weekNum < 2 || entry.weekNum > 35) return null;
  return entry.weekNum - 1;
}

export function getOrthographemicWeeklyGuide(entry: OrthoEntry): OrthographemicWeeklyGuide {
  const chapterGuide = entry.letter ? ORTHO_CHAPTER_GUIDE[entry.letter] : undefined;
  return {
    bilanNumber: orthoWeeklyBilanNumber(entry),
    weeklyFocus: entry.title,
    chapterExpectations: chapterGuide?.expectations ?? ["Repere diagnostique de debut de parcours"],
    fluenceTargetWpm: chapterGuide?.fluenceTargetWpm,
  };
}

function orthoPlanFor(entry: OrthoEntry): ExercisePlanItem[] {
  const guide = getOrthographemicWeeklyGuide(entry);
  const expectationLine = guide.chapterExpectations.join(" ; ");
  const fluenceLine = guide.fluenceTargetWpm
    ? ` Fluence reperee dans le bilan de chapitre : ${guide.fluenceTargetWpm} mots/minute.`
    : "";
  return [
    {
      id: `${entry.id}-dictee-bilan`,
      label: guide.bilanNumber
        ? `Dictée bilan n°${guide.bilanNumber} · semaine ${entry.weekNum}`
        : `Dictée bilan · semaine ${entry.weekNum}`,
      instruction: guide.bilanNumber
        ? `${guide.weeklyFocus}. Évaluation hebdomadaire de la dictée bilan n°${guide.bilanNumber}, sans les dictées d'entraînement quotidiennes. Repères de bilan du chapitre : ${expectationLine}.${fluenceLine}`
        : `${guide.weeklyFocus}. Correction de la dictée bilan hebdomadaire uniquement.`,
      source: "Orthographémic",
    },
  ];
}

function cleoPrepFor(entry: CatalogEntry) {
  const seance = CLEO_SEANCES.find(
    (item) => item.period === entry.period && normalize(item.title) === normalize(entry.title),
  );
  return seance ? CLEO_PREP_SHEETS.find((sheet) => sheet.id === seance.id) : undefined;
}

function cleoSeanceFor(entry: CatalogEntry) {
  return CLEO_SEANCES.find(
    (item) => item.period === entry.period && normalize(item.title) === normalize(entry.title),
  );
}

function mathsPrepFor(entry: CatalogEntry) {
  const moduleNumber = entry.id.replace(/^m/, "");
  return MATHS_PREP_SHEETS_P1.find((sheet) => sheet.id === `acces-m${moduleNumber}`);
}

/** Plan ACCÈS : un ExercisePlanItem par exercice du cahier élève. */
function exactAccesPlan(entry: CatalogEntry): ExercisePlanItem[] {
  const exs = ACCES_WORKBOOK_EXERCISES.filter((e) => e.moduleId === entry.id);
  if (!exs.length) return [];

  // Consigne : objectif de la fiche de prep si dispo, sinon titre du module
  const prep = mathsPrepFor(entry);
  const baseInstruction = prep?.objective ?? exs[0]?.moduleTitle ?? entry.title;

  return exs.map((ex, idx) => ({
    id: `${entry.id}-acces-${ex.id}-${idx}`,
    page: ex.cahierPage,
    label: ex.title,
    instruction: baseInstruction,
    source: "ACCÈS" as const,
    studentPages: [ex.cahierPage],
    cahierPageUrl: accesCahierCorrigeUrl(ex.cahierPage),
  }));
}

function exactCleoPlan(entry: CatalogEntry): ExercisePlanItem[] {
  const exercise = CLEO_WORKBOOK_EXERCISES.find(
    (item) => normalize(item.title) === normalize(entry.title),
  );
  if (!exercise) return [];
  const studentPages = Object.entries(CLEO_WORKBOOK_PAGE_MAP)
    .filter(([, ids]) => ids.includes(exercise.id))
    .map(([page]) => Number(page))
    .sort((left, right) => left - right);
  const corrigePage = exercise.fichierPage;
  if (corrigePage) {
    return [
      {
        id: `${entry.id}-corrige-page-${corrigePage}`,
        page: corrigePage,
        label: entry.title,
        instruction: exercise.instruction,
        source: "Cléo" as const,
        studentPages: studentPages.length > 0 ? studentPages : [corrigePage],
      },
    ];
  }
  return Object.entries(CLEO_WORKBOOK_PAGE_MAP)
    .filter(([, ids]) => ids.includes(exercise.id))
    .map(([page], index) => ({
      id: `${entry.id}-cleo-page-${page}-${index}`,
      page: Number(page),
      label: entry.title,
      instruction: exercise.instruction,
      source: "Cléo" as const,
      studentPages: [Number(page)],
    }));
}

/** Construit les exercices/pages/consignes à partir du déroulé de la fiche. */
export function getExercisePlan(programmingItemId?: string): ExercisePlanItem[] {
  if (!programmingItemId) return [];
  const entry = catalogEntry(programmingItemId);
  if (!entry) return [];
  if (isOrthoEntry(entry)) return orthoPlanFor(entry);

  const isFrench = ["C", "V", "G", "O"].includes(entry.domain);
  if (isFrench) {
    const exactPlan = exactCleoPlan(entry);
    if (exactPlan.length > 0) return exactPlan;
  }
  if (!isFrench) {
    const exactPlan = exactAccesPlan(entry);
    if (exactPlan.length > 0) return exactPlan;
  }
  const prep = isFrench ? cleoPrepFor(entry) : mathsPrepFor(entry);
  if (!prep) return [];

  const source: "Cléo" | "ACCÈS" = isFrench ? "Cléo" : "ACCÈS";
  const items = prep.phases
    .map((phase, index) => ({
      id: `${programmingItemId}-phase-${index + 1}`,
      page: pageFrom(`${phase.title} ${phase.detail}`) ?? pageFrom(prep.material.join(" ")),
      label: phase.title,
      instruction: phase.detail,
      source,
    }))
    .filter((item) => item.instruction.trim().length > 0);

  return items.length
    ? items
    : [
        {
          id: `${programmingItemId}-overview`,
          page: pageFrom(prep.material.join(" ")),
          label: prep.title,
          instruction: prep.objective,
          source,
        },
      ];
}
