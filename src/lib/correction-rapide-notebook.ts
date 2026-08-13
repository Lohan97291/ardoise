import { ACCES_WORKBOOK_EXERCISES, accesCahierCorrigeUrl } from "@/lib/acces-workbook-data";
import {
  CLEO_WORKBOOK_EXERCISE_BY_ID,
  CLEO_WORKBOOK_PAGES,
  CLEO_WORKBOOK_PAGE_MAP,
} from "@/lib/cleo-workbook-data";
import {
  CLEO_CATALOG,
  MATHS_CATALOG,
  ORTHO_CATALOG,
  STUDENTS,
  catalogToExercise,
  type CatalogEntry,
  type Exercise,
  type OrthoEntry,
  type Student,
} from "@/lib/ardoise-eval";
import type { Session } from "@/lib/ardoise-data";
import { getExercisePlan, getOrthographemicWeeklyGuide } from "@/lib/exercise-plans";
import { getPlanResults } from "@/lib/storage";

export type NotebookSource = "Cléo" | "ACCÈS" | "Orthographémic";

export type NotebookNode = {
  id: string;
  title: string;
  subtitle: string;
  source: NotebookSource;
  pages: number[];
};

export type CorrectionNotebookItem = {
  id: string;
  exerciseId?: string;
  page?: number;
  label: string;
  instruction: string;
  domain?: string;
  repere?: string;
  source: NotebookSource;
  studentPages?: number[];
  sequencePage?: number;
  cahierPageUrl?: string;
};


const CLEO_TRACKING_PAGES = CLEO_WORKBOOK_PAGES;
const ACCES_TRACKING_PAGES: number[] = Array.from({ length: 140 }, (_, i) => i + 6);

export function prefersNotebookFlow(exercise?: Exercise): boolean {
  return Boolean(exercise?.exercisePlan?.length);
}

export function pageLabel(page: number, source?: NotebookSource): string {
  if (!page && source === "Orthographémic") return "Dictée bilan";
  return page ? `p. ${page}` : "Déroulé";
}

function cleoCatalogEntry(exerciseId?: string) {
  return exerciseId ? CLEO_CATALOG.find((entry) => entry.id === exerciseId) : undefined;
}

function accesCatalogEntry(exerciseId?: string) {
  return exerciseId ? MATHS_CATALOG.find((entry) => entry.id === exerciseId) : undefined;
}

export function isCleoNotebookExercise(exercise?: Exercise): boolean {
  return Boolean(
    exercise &&
    exercise.subject === "francais" &&
    !exercise.id.startsWith("ortho-") &&
    cleoCatalogEntry(exercise.id),
  );
}

export function isAccesNotebookExercise(exercise?: Exercise): boolean {
  return Boolean(exercise && exercise.subject === "maths" && accesCatalogEntry(exercise.id));
}

function cleoPageExerciseIds(page: number): string[] {
  return CLEO_WORKBOOK_PAGE_MAP[page] ?? [];
}

function cleoExerciseRepere(exerciseId: string): string {
  const match = exerciseId.match(/^e_p(\d+)_(\d+)$/i);
  return match ? `P${match[1]}-${match[2]}` : exerciseId;
}

export function cleoPageItems(page: number): CorrectionNotebookItem[] {
  return cleoPageExerciseIds(page)
    .map((exerciseId, index) => {
      const exercise = CLEO_WORKBOOK_EXERCISE_BY_ID[exerciseId];
      if (!exercise) return null;
      return {
        id: `${exerciseId}-page-${page}-${index}`,
        exerciseId,
        page,
        label: exercise.title,
        instruction: exercise.instruction,
        domain: exercise.domain,
        repere: cleoExerciseRepere(exercise.id),
        sequencePage: exercise.fichierPage,
        source: "Cléo" as const,
        studentPages: [page],
      };
    })
    .filter(Boolean) as CorrectionNotebookItem[];
}

export function cleoPageSummary(page: number): string {
  const labels = cleoPageItems(page).map((item) => item.label);
  if (labels.length === 0) return "Page Cléo";
  if (labels.length === 1) return labels[0]!;
  if (labels.length === 2) return `${labels[0]} · ${labels[1]}`;
  return `${labels[0]} · ${labels.length - 1} autres notions`;
}

export function cleoPageDetail(page: number): string {
  return cleoPageItems(page)
    .map((item) => item.label)
    .join(" · ");
}

export function cleoPageReperes(page: number): string {
  return cleoPageItems(page)
    .map((item) => item.repere)
    .join(" · ");
}

export function cleoPageExerciseCount(page: number): number {
  return cleoPageItems(page).length;
}

export function accesPageItems(page: number): CorrectionNotebookItem[] {
  return ACCES_WORKBOOK_EXERCISES.filter((exercise) => exercise.cahierPage === page).map(
    (exercise, index) => ({
      id: `acces-${exercise.id}-${index}`,
      exerciseId: exercise.id,
      page,
      label: exercise.title,
      instruction: exercise.instruction,
      domain: exercise.domain,
      repere: exercise.title,
      source: "ACCÈS" as const,
      studentPages: [page],
      cahierPageUrl: accesCahierCorrigeUrl(page),
    }),
  );
}

export function accesPageSummary(page: number): string {
  const labels = accesPageItems(page).map((item) => item.label);
  if (labels.length === 0) return "Page de maths";
  if (labels.length === 1) return labels[0]!;
  if (labels.length === 2) return `${labels[0]} · ${labels[1]}`;
  return `${labels[0]} · ${labels.length - 1} autres exercices`;
}

export function accesPageDetail(page: number): string {
  return accesPageItems(page)
    .map((item) => item.label)
    .join(" · ");
}

export function accesPageReperes(page: number): string {
  return accesPageItems(page)
    .map((item) => item.repere)
    .join(" · ");
}

export function accesPageExerciseCount(page: number): number {
  return accesPageItems(page).length;
}

export function notebookTree(exercise?: Exercise): NotebookNode[] {
  const plan = exercise?.exercisePlan ?? [];
  const sources = [...new Set(plan.map((item) => item.source))] as NotebookSource[];

  if (sources.length === 0) {
    return [
      {
        id: "cahier-eleve",
        title: exercise?.id.startsWith("ortho-")
          ? "Cahier de dictée"
          : exercise?.subject === "maths"
            ? "Cahier de mathématiques"
            : "Cahier Cléo corrigés",
        subtitle: "Aucune page détectée pour cette correction",
        source: exercise?.id.startsWith("ortho-")
          ? "Orthographémic"
          : exercise?.subject === "maths"
            ? "ACCÈS"
            : "Cléo",
        pages: [],
      },
    ];
  }

  return sources.map((source) => {
    const sourcePages =
      source === "Cléo"
        ? CLEO_TRACKING_PAGES
        : source === "ACCÈS"
          ? ACCES_TRACKING_PAGES
          : [
              ...new Set(
                plan.filter((item) => item.source === source).map((item) => item.page ?? 0),
              ),
            ].sort((left, right) => left - right);

    return {
      id: `notebook-${source.toLowerCase()}`,
      title:
        source === "Cléo"
          ? "Cahier Cléo"
          : source === "ACCÈS"
            ? "Cahier de mathématiques"
            : "Cahier de dictée",
      subtitle:
        source === "Cléo"
          ? "Pages du cahier et correction par exercice"
          : source === "ACCÈS"
            ? "Fichier ou cahier de maths de l'élève"
            : "Dictée bilan hebdomadaire Orthographémic",
      source,
      pages: sourcePages,
    };
  });
}

export function notebookBadgeLabel(source: NotebookSource): string {
  if (source === "Cléo") return "Cléo";
  if (source === "ACCÈS") return "Maths";
  return "Dictée";
}

export function notebookDisplayTitle(exercise?: Exercise): string {
  if (!exercise) return "Correction par cahier";
  if (exercise.id.startsWith("ortho-")) return "Cahier de dictée";
  if (exercise.subject === "maths") return "Cahier de mathématiques";
  return "Cahier Cléo";
}

export function orderedStudents(): Student[] {
  return [...STUDENTS].sort((left, right) => {
    const byLastName = left.lastName.localeCompare(right.lastName, "fr", {
      sensitivity: "base",
    });
    if (byLastName !== 0) return byLastName;
    return left.firstName.localeCompare(right.firstName, "fr", { sensitivity: "base" });
  });
}

export function shortStudentLabel(student: Student): string {
  return `${student.firstName} ${student.lastName[0]}.`;
}

export function studentPagesLabel(pages?: number[]): string | null {
  if (!pages || pages.length === 0) return null;
  return pages.length === 1
    ? `Fichier élève : p. ${pages[0]}`
    : `Fichier élève : p. ${pages.join(", ")}`;
}

export function studentIndexById(studentId: string): number {
  return STUDENTS.findIndex((student) => student.id === studentId);
}

export function isStudentDoneForItems(
  exerciseId: string | undefined,
  itemIds: string[],
  studentId: string,
): boolean {
  if (!exerciseId || itemIds.length === 0) return false;
  return itemIds.every((itemId) => Boolean(getPlanResults(`${exerciseId}::${itemId}`)[studentId]));
}

export function nextPendingStudentId(
  students: Student[],
  currentStudentId: string,
  exerciseId: string | undefined,
  itemIds: string[],
): string | null {
  if (!exerciseId || itemIds.length === 0) return null;

  const startIndex = Math.max(
    0,
    students.findIndex((student) => student.id === currentStudentId),
  );

  for (let offset = 1; offset <= students.length; offset += 1) {
    const candidate = students[(startIndex + offset) % students.length];
    if (!candidate) continue;
    if (!isStudentDoneForItems(exerciseId, itemIds, candidate.id)) return candidate.id;
  }

  return null;
}

export function orthographemicBilanNumber(entry: OrthoEntry): number | null {
  return getOrthographemicWeeklyGuide(entry).bilanNumber;
}

function buildCatalogExercise(
  entry: CatalogEntry,
  date: string,
  sourceSessionId?: string,
): Exercise {
  return {
    ...catalogToExercise(entry, date),
    sourceSessionId,
    exercisePlan: getExercisePlan(entry.id),
  };
}

function buildOrthographemicExercise(
  entry: OrthoEntry,
  date: string,
  sourceSessionId?: string,
): Exercise {
  const guide = getOrthographemicWeeklyGuide(entry);
  return {
    id: entry.id,
    title: guide.bilanNumber
      ? `Dictée bilan n°${guide.bilanNumber} — ${guide.weeklyFocus}`
      : `Dictée bilan — ${guide.weeklyFocus}`,
    sessionTitle: "Français · Orthographémic",
    subject: "francais",
    date,
    sourceSessionId,
    exercisePlan: getExercisePlan(entry.id),
  };
}

export function preferredNotebookFromSession(session?: Session): NotebookSource | null {
  if (!session) return null;
  if (session.correctionMode === "cleo") return "Cléo";
  if (session.correctionMode === "maths") return "ACCÈS";
  if (session.correctionMode === "dictation") return "Orthographémic";

  const sources = [...new Set((session.exercisePlan ?? []).map((item) => item.source))];
  return sources.length === 1 ? (sources[0] as NotebookSource) : null;
}

export function resolveSessionExercise(
  session: Session,
  sourceSessionId: string,
  date: string,
): Exercise | undefined {
  const mode = session.correctionMode ?? "auto";
  const correctionId = session.correctionExerciseId ?? session.programmingItemId;

  if (mode === "none" || mode === "fluence") return undefined;

  if (mode === "cleo") {
    const entry = correctionId ? CLEO_CATALOG.find((item) => item.id === correctionId) : undefined;
    return entry ? buildCatalogExercise(entry, date, sourceSessionId) : undefined;
  }

  if (mode === "maths") {
    const entry = correctionId ? MATHS_CATALOG.find((item) => item.id === correctionId) : undefined;
    return entry ? buildCatalogExercise(entry, date, sourceSessionId) : undefined;
  }

  if (mode === "dictation") {
    const entry = correctionId ? ORTHO_CATALOG.find((item) => item.id === correctionId) : undefined;
    return entry ? buildOrthographemicExercise(entry, date, sourceSessionId) : undefined;
  }

  if (!correctionId) return undefined;

  const cleoEntry = CLEO_CATALOG.find((item) => item.id === correctionId);
  if (cleoEntry) return buildCatalogExercise(cleoEntry, date, sourceSessionId);

  const mathsEntry = MATHS_CATALOG.find((item) => item.id === correctionId);
  if (mathsEntry) return buildCatalogExercise(mathsEntry, date, sourceSessionId);

  const orthoEntry = ORTHO_CATALOG.find((item) => item.id === correctionId);
  if (orthoEntry) return buildOrthographemicExercise(orthoEntry, date, sourceSessionId);

  return undefined;
}

export function countCompletedStudentsForPlan(exercise?: Exercise): number {
  const plan = exercise?.exercisePlan ?? [];
  if (plan.length === 0) return 0;
  return STUDENTS.filter((student) =>
    plan.every((item) => Boolean(getPlanResults(`${exercise?.id}::${item.id}`)[student.id])),
  ).length;
}

// ─────────────────────────────────────────────
// Helpers unifiés pour l'écran /correction-rapide (cahiers + sommaire + recherche)
// ─────────────────────────────────────────────

export function notebookPages(source: NotebookSource): number[] {
  if (source === "Cléo") return CLEO_TRACKING_PAGES;
  if (source === "ACCÈS") return ACCES_TRACKING_PAGES;
  return ORTHO_CATALOG.map((entry) => entry.weekNum);
}

export function orthoPageItems(weekNum: number): CorrectionNotebookItem[] {
  const entry = ORTHO_CATALOG.find((item) => item.weekNum === weekNum);
  if (!entry) return [];
  const guide = getOrthographemicWeeklyGuide(entry);
  return [
    {
      id: `ortho-week-${weekNum}`,
      exerciseId: entry.id,
      page: weekNum,
      label: guide.bilanNumber
        ? `Dictée bilan n°${guide.bilanNumber}`
        : `Dictée bilan · semaine ${weekNum}`,
      instruction: guide.weeklyFocus,
      source: "Orthographémic" as const,
    },
  ];
}

/** Items d'une page, quel que soit le cahier. */
export function notebookPageItems(source: NotebookSource, page: number): CorrectionNotebookItem[] {
  if (source === "Cléo") return cleoPageItems(page);
  if (source === "ACCÈS") return accesPageItems(page);
  return orthoPageItems(page);
}

export function notebookPageSummary(source: NotebookSource, page: number): string {
  if (source === "Cléo") return cleoPageSummary(page);
  if (source === "ACCÈS") return accesPageSummary(page);
  return orthoPageItems(page)[0]?.label ?? "Dictée bilan";
}

/** Identifiant stable utilisé comme "exerciseId" pour la persistance des résultats de page. */
export function notebookPagePlanId(source: NotebookSource, page: number): string {
  return `notebook::${source}::page-${page}`;
}

export type NotebookSearchResult = { page: number; item: CorrectionNotebookItem };

/** Recherche simple sur les libellés/consignes/repères des exercices d'un cahier. */
export function searchNotebook(source: NotebookSource, query: string): NotebookSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: NotebookSearchResult[] = [];
  for (const page of notebookPages(source)) {
    for (const item of notebookPageItems(source, page)) {
      const haystack = `${item.label} ${item.instruction} ${item.repere ?? ""}`.toLowerCase();
      if (haystack.includes(q)) results.push({ page, item });
      if (results.length >= 40) return results;
    }
  }
  return results;
}

export function notebookCoverMeta(source: NotebookSource): { title: string; subtitle: string } {
  if (source === "Cléo") return { title: "Cléo", subtitle: "Français" };
  if (source === "ACCÈS") return { title: "ACCÈS", subtitle: "Mathématiques" };
  return { title: "Orthographémic", subtitle: "Dictée" };
}
