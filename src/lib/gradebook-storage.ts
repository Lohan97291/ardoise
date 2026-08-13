import { createLocalStore } from "@/lib/local-store";

export type GradebookColumn = {
  id: string;
  title: string;
  date: string;
  max: number;
  coefficient: number;
  subject: "francais" | "maths" | "autre";
};

export type GradebookState = {
  columns: GradebookColumn[];
  /** scores[columnId][studentId] = note saisie (string libre pour permettre "abs") */
  scores: Record<string, Record<string, string>>;
};

const EMPTY: GradebookState = { columns: [], scores: {} };

const store = createLocalStore<GradebookState>("ardoise.gradebook.v1", () => EMPTY);

export function readGradebook(): GradebookState {
  const state = store.get();
  return {
    columns: Array.isArray(state?.columns) ? state.columns : [],
    scores: state?.scores && typeof state.scores === "object" ? state.scores : {},
  };
}

export function saveGradebook(state: GradebookState): GradebookState {
  return store.set(state);
}

export function makeColumnId(): string {
  return `col-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function parseScore(raw?: string): number | null {
  if (!raw) return null;
  const normalized = raw.replace(",", ".").trim();
  if (!normalized) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function studentAverage(
  state: GradebookState,
  studentId: string,
): { value: number | null; outOf: number } {
  let weighted = 0;
  let weights = 0;
  for (const column of state.columns) {
    const score = parseScore(state.scores[column.id]?.[studentId]);
    if (score === null || column.max <= 0) continue;
    const coefficient = column.coefficient > 0 ? column.coefficient : 1;
    weighted += (score / column.max) * coefficient;
    weights += coefficient;
  }
  if (weights === 0) return { value: null, outOf: 20 };
  return { value: Math.round((weighted / weights) * 200) / 10, outOf: 20 };
}

export function columnAverage(state: GradebookState, columnId: string): number | null {
  const column = state.columns.find((entry) => entry.id === columnId);
  if (!column) return null;
  const values = Object.values(state.scores[columnId] ?? {})
    .map((raw) => parseScore(raw))
    .filter((value): value is number => value !== null);
  if (values.length === 0) return null;
  const total = values.reduce((sum, value) => sum + value, 0);
  return Math.round((total / values.length) * 10) / 10;
}
