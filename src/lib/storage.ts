/**
 * Couche de persistance localStorage pour Ardoise.
 * Design : Lovable (Tailwind + Shadcn). Logique : j-ai-patch.
 */
import {
  CLEO_CATALOG,
  DEMO_EXERCISES,
  MATHS_CATALOG,
  ORTHO_CATALOG,
  SEEDED_RESULTS,
  STUDENTS,
  STATUS_BY_KEY,
  catalogToExercise,
  fluenceLevel,
  type Exercise,
  type FluenceRecord,
  type StatusKey,
  type Student,
} from "@/lib/ardoise-eval";
import { getExercisePlan, getOrthographemicWeeklyGuide } from "@/lib/exercise-plans";

// ─────────────────────────────────────────────
// Clés localStorage
// ─────────────────────────────────────────────
export const EXERCISE_RESULTS_KEY = "ardoise.exerciseResults.v1";
export const EXERCISE_TRAJECTORY_KEY = "ardoise.exerciseTrajectory.v1";
export const FLUENCE_KEY = "ardoise.fluence.v1";
export const ACTIVE_EXERCISES_KEY = "ardoise.activeExercises.v1";

function formatSeedDate(): string {
  const d = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  return d.charAt(0).toUpperCase() + d.slice(1);
}

function defaultActiveExercises(): Exercise[] {
  const date = formatSeedDate();
  const cleoEntry = CLEO_CATALOG.find((entry) => entry.id === "e_p1_4") ?? CLEO_CATALOG[0];
  const mathsEntry = MATHS_CATALOG.find((entry) => entry.id === "m1") ?? MATHS_CATALOG[0];
  const orthoEntry = ORTHO_CATALOG.find((entry) => entry.id === "ortho-s3") ?? ORTHO_CATALOG[1];
  const orthoGuide = getOrthographemicWeeklyGuide(orthoEntry);

  return [
    {
      ...catalogToExercise(cleoEntry, date),
      exercisePlan: getExercisePlan(cleoEntry.id),
    },
    {
      ...catalogToExercise(mathsEntry, date),
      exercisePlan: getExercisePlan(mathsEntry.id),
    },
    {
      id: orthoEntry.id,
      title: orthoGuide.bilanNumber
        ? `Dictée bilan n°${orthoGuide.bilanNumber} — ${orthoGuide.weeklyFocus}`
        : `Dictée bilan — ${orthoGuide.weeklyFocus}`,
      sessionTitle: "Français · Orthographémic",
      subject: "francais",
      date,
      exercisePlan: getExercisePlan(orthoEntry.id),
    },
  ];
}

function isDemoExercise(exercise: Exercise): boolean {
  return DEMO_EXERCISES.some((demo) => demo.id === exercise.id);
}

function normalizeActiveExercises(exercises: Exercise[]): Exercise[] {
  const realExercises = exercises.filter((exercise) => !isDemoExercise(exercise));
  return realExercises.length > 0 ? realExercises : defaultActiveExercises();
}

// ─────────────────────────────────────────────
// Résultats d'exercices
// Format : { [exerciseId]: { [studentId]: StatusKey } }
// ─────────────────────────────────────────────
export type ExerciseResultsStore = Record<string, Record<string, StatusKey>>;
export type ExerciseTrajectoryEntry = {
  page: number | "m";
  status: StatusKey;
  updatedAt: string;
};
export type ExerciseTrajectoryStore = Record<string, ExerciseTrajectoryEntry[]>;

export function loadExerciseResults(): ExerciseResultsStore {
  try {
    const raw = localStorage.getItem(EXERCISE_RESULTS_KEY);
    return raw ? (JSON.parse(raw) as ExerciseResultsStore) : {};
  } catch {
    return {};
  }
}

export function saveExerciseResults(store: ExerciseResultsStore): void {
  localStorage.setItem(EXERCISE_RESULTS_KEY, JSON.stringify(store));
}

export function loadExerciseTrajectory(): ExerciseTrajectoryStore {
  try {
    const raw = localStorage.getItem(EXERCISE_TRAJECTORY_KEY);
    return raw ? (JSON.parse(raw) as ExerciseTrajectoryStore) : {};
  } catch {
    return {};
  }
}

export function saveExerciseTrajectory(store: ExerciseTrajectoryStore): void {
  localStorage.setItem(EXERCISE_TRAJECTORY_KEY, JSON.stringify(store));
}

function trajectoryKey(studentId: string, exerciseId: string): string {
  return `${studentId}::${exerciseId}`;
}

/**
 * Résultats pour un exercice donné.
 * Pour les exercices démo (ex-1/ex-2), fallback SEEDED_RESULTS.
 * Pour tous les vrais exercices du catalogue, retourne {} si aucune donnée.
 */
export function getExerciseResults(exerciseId: string): Record<string, StatusKey> {
  const store = loadExerciseResults();
  const real = store[exerciseId];
  if (real && Object.keys(real).length > 0) return real;
  if (DEMO_EXERCISES.some((exercise) => exercise.id === exerciseId)) {
    return { ...SEEDED_RESULTS };
  }
  return {};
}

// ─────────────────────────────────────────────
// Exercices actifs
// Format : Exercise[] — exercices choisis par l'enseignant depuis le catalogue
// ─────────────────────────────────────────────

/**
 * Retourne les exercices actifs depuis le localStorage.
 * Si des exercices de démonstration sont encore présents, ils sont remplacés
 * par un petit panier d'exercices réels directement exploitables.
 */
export function getActiveExercises(): Exercise[] {
  try {
    const raw = localStorage.getItem(ACTIVE_EXERCISES_KEY);
    const stored = raw ? (JSON.parse(raw) as Exercise[]) : [];
    if (stored.length > 0) {
      const normalized = normalizeActiveExercises(stored);
      if (
        normalized.length !== stored.length ||
        normalized.some((exercise, index) => exercise.id !== stored[index]?.id)
      ) {
        localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify(normalized));
      }
      return normalized;
    }
  } catch {
    /* ignore */
  }
  const seeded = defaultActiveExercises();
  try {
    localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify(seeded));
  } catch {
    /* ignore */
  }
  return seeded;
}

/** Ajoute un exercice à la liste active (sans doublon). */
export function addActiveExercise(exercise: Exercise): void {
  try {
    const raw = localStorage.getItem(ACTIVE_EXERCISES_KEY);
    const current: Exercise[] = raw ? (JSON.parse(raw) as Exercise[]) : [];
    if (current.some((e) => e.id === exercise.id)) return;
    localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify([...current, exercise]));
  } catch {
    /* ignore */
  }
}

export function getExercisesForSession(sessionId: string): Exercise[] {
  return getActiveExercises().filter((exercise) => exercise.sourceSessionId === sessionId);
}

export function getFirstExerciseForSession(sessionId: string): Exercise | undefined {
  return getExercisesForSession(sessionId)[0];
}

/** Retire un exercice de la liste active par id. */
export function removeActiveExercise(id: string): void {
  try {
    const raw = localStorage.getItem(ACTIVE_EXERCISES_KEY);
    const current: Exercise[] = raw ? (JSON.parse(raw) as Exercise[]) : [];
    localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify(current.filter((e) => e.id !== id)));
  } catch {
    /* ignore */
  }
}

/** Rattache un exercice existant à une séance du cahier journal. */
export function attachExerciseToSession(
  exerciseId: string,
  sessionId: string,
): Exercise | undefined {
  try {
    const current = getActiveExercises();
    const exercise = current.find((e) => e.id === exerciseId);
    if (!exercise) return undefined;
    const updated = current.map((e) =>
      e.id === exerciseId ? { ...e, sourceSessionId: sessionId } : e,
    );
    localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify(updated));
    return updated.find((e) => e.id === exerciseId);
  } catch {
    return undefined;
  }
}

export function updateActiveExercise(
  exerciseId: string,
  patch: Partial<Exercise>,
): Exercise | undefined {
  try {
    const current = getActiveExercises();
    const updated = current.map((exercise) =>
      exercise.id === exerciseId ? { ...exercise, ...patch } : exercise,
    );
    localStorage.setItem(ACTIVE_EXERCISES_KEY, JSON.stringify(updated));
    return updated.find((exercise) => exercise.id === exerciseId);
  } catch {
    return undefined;
  }
}

/** Enregistre un résultat unique immédiatement. */
export function saveOneResult(exerciseId: string, studentId: string, status: StatusKey): void {
  const store = loadExerciseResults();
  if (!store[exerciseId]) store[exerciseId] = {};
  store[exerciseId]![studentId] = status;
  saveExerciseResults(store);
}

/** Résultats des sous-exercices d'une même page, sans fallback de démonstration. */
export function getPlanResults(planId: string): Record<string, StatusKey> {
  return loadExerciseResults()[planId] ?? {};
}

export function saveOnePlanResult(planId: string, studentId: string, status: StatusKey): void {
  const store = loadExerciseResults();
  if (!store[planId]) store[planId] = {};
  store[planId]![studentId] = status;
  saveExerciseResults(store);
}

export function getExerciseTrajectory(
  studentId: string,
  exerciseId: string,
): ExerciseTrajectoryEntry[] {
  return loadExerciseTrajectory()[trajectoryKey(studentId, exerciseId)] ?? [];
}

export function saveExerciseTrajectoryResult(
  studentId: string,
  exerciseId: string,
  page: number | "m",
  status: StatusKey,
): void {
  const store = loadExerciseTrajectory();
  const key = trajectoryKey(studentId, exerciseId);
  const history = [...(store[key] ?? [])];
  const updatedAt = new Date().toISOString();
  const foundIndex = history.findIndex((entry) => entry.page === page);

  if (foundIndex >= 0) {
    history[foundIndex] = { page, status, updatedAt };
  } else {
    history.push({ page, status, updatedAt });
  }

  history.sort((left, right) => {
    if (left.page === "m" && right.page === "m") return 0;
    if (left.page === "m") return 1;
    if (right.page === "m") return -1;
    return left.page - right.page;
  });

  store[key] = history;
  saveExerciseTrajectory(store);

  const latest = history[history.length - 1];
  if (latest) saveOneResult(exerciseId, studentId, latest.status);
}

// ─────────────────────────────────────────────
// Fluence
// Format : { [studentId]: { wpm, history } }
// ─────────────────────────────────────────────
export type FluenceStore = Record<
  string,
  { wpm: number; history: { period: string; wpm: number; erreurs?: number }[] }
>;

export function loadFluenceData(): FluenceStore {
  try {
    const raw = localStorage.getItem(FLUENCE_KEY);
    return raw ? (JSON.parse(raw) as FluenceStore) : {};
  } catch {
    return {};
  }
}

export function saveFluenceData(store: FluenceStore): void {
  localStorage.setItem(FLUENCE_KEY, JSON.stringify(store));
}

/**
 * Données fluence complètes (localStorage uniquement).
 * Retourne wpm: 0 / history: [] pour les élèves sans mesure.
 */
export function getFluenceRecords(): FluenceRecord[] {
  const store = loadFluenceData();
  return STUDENTS.map((s) => {
    const stored = store[s.id];
    if (stored) return { studentId: s.id, wpm: stored.wpm, history: stored.history };
    return { studentId: s.id, wpm: 0, history: [] };
  });
}

/** Enregistre une nouvelle mesure de fluence pour un élève. */
export function saveFluenceMeasure(
  studentId: string,
  wpm: number,
  period: string,
  erreurs?: number,
): void {
  const store = loadFluenceData();
  const existing = store[studentId];
  const history = existing?.history ?? [];
  const newEntry: { period: string; wpm: number; erreurs?: number } =
    erreurs !== undefined ? { period, wpm, erreurs } : { period, wpm };
  // Remplace si la période existe déjà, sinon ajoute
  const updatedHistory = history.some((h) => h.period === period)
    ? history.map((h) => (h.period === period ? newEntry : h))
    : [...history, newEntry];
  store[studentId] = { wpm, history: updatedHistory };
  saveFluenceData(store);
}

// ─────────────────────────────────────────────
// Cahier d'appel
// Clé = "ardoise.attendance.YYYY-MM-DD"
// Format : { [studentId]: "present" | "retard" | "absent" }
// ─────────────────────────────────────────────
export type AttendanceStatus = "present" | "retard" | "absent";
export type AttendanceStore = Record<string, AttendanceStatus>;
export type AttendanceMoment = "morning" | "afternoon";
export type AttendanceDayRecord = {
  morning?: AttendanceStore;
  afternoon?: AttendanceStore;
};
export type AttendanceMonthStats = {
  studentCount: number;
  recordedDays: number;
  recordedHalfDays: number;
  absences: number;
  retards: number;
  possibleAttendances: number;
  realAttendances: number;
  absentRate: number;
  presentRate: number;
};

function defaultAttendanceStore(): AttendanceStore {
  return Object.fromEntries(STUDENTS.map((s) => [s.id, "present" as AttendanceStatus]));
}

function isAttendanceStatus(value: unknown): value is AttendanceStatus {
  return value === "present" || value === "retard" || value === "absent";
}

function isLegacyAttendanceStore(value: unknown): value is AttendanceStore {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value as Record<string, unknown>).every(isAttendanceStatus);
}

function normalizeAttendanceStore(store?: AttendanceStore): AttendanceStore {
  return {
    ...defaultAttendanceStore(),
    ...(store ?? {}),
  };
}

function readAttendanceDayRecord(date: string): AttendanceDayRecord | null {
  try {
    const raw = localStorage.getItem(attendanceKey(date));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (isLegacyAttendanceStore(parsed)) {
      return { morning: normalizeAttendanceStore(parsed) };
    }
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const record = parsed as AttendanceDayRecord;
      return {
        morning: record.morning ? normalizeAttendanceStore(record.morning) : undefined,
        afternoon: record.afternoon ? normalizeAttendanceStore(record.afternoon) : undefined,
      };
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function attendanceKey(date: string): string {
  return `ardoise.attendance.${date}`;
}

export function getAttendance(date: string, moment: AttendanceMoment = "morning"): AttendanceStore {
  const record = readAttendanceDayRecord(date);
  return normalizeAttendanceStore(record?.[moment]);
}

export function saveAttendance(
  date: string,
  data: AttendanceStore,
  moment: AttendanceMoment = "morning",
): void {
  const record = readAttendanceDayRecord(date) ?? {};
  const next: AttendanceDayRecord = {
    ...record,
    [moment]: normalizeAttendanceStore(data),
  };
  localStorage.setItem(attendanceKey(date), JSON.stringify(next));
}

export function listAttendanceDates(): string[] {
  try {
    return Object.keys(localStorage)
      .filter((key) => key.startsWith("ardoise.attendance."))
      .map((key) => key.replace("ardoise.attendance.", ""))
      .sort();
  } catch {
    return [];
  }
}

export function getAttendanceMonthStats(month: string): AttendanceMonthStats {
  const matchingDates = listAttendanceDates().filter((date) => date.startsWith(`${month}-`));
  let recordedHalfDays = 0;
  let absences = 0;
  let retards = 0;

  for (const date of matchingDates) {
    const record = readAttendanceDayRecord(date);
    if (!record) continue;

    for (const moment of ["morning", "afternoon"] as AttendanceMoment[]) {
      const slot = record[moment];
      if (!slot) continue;
      recordedHalfDays += 1;
      for (const status of Object.values(slot)) {
        if (status === "absent") absences += 1;
        if (status === "retard") retards += 1;
      }
    }
  }

  const studentCount = STUDENTS.length;
  const possibleAttendances = recordedHalfDays * studentCount;
  const realAttendances = Math.max(0, possibleAttendances - absences);
  const absentRate = possibleAttendances > 0 ? (absences / possibleAttendances) * 100 : 0;
  const presentRate = possibleAttendances > 0 ? (realAttendances / possibleAttendances) * 100 : 0;

  return {
    studentCount,
    recordedDays: matchingDates.length,
    recordedHalfDays,
    absences,
    retards,
    possibleAttendances,
    realAttendances,
    absentRate,
    presentRate,
  };
}

// ─────────────────────────────────────────────
// Signaux à surveiller (Centre de pilotage)
// ─────────────────────────────────────────────
export function getStudentSignals(): { student: Student; reason: string }[] {
  const store = loadExerciseResults();
  const fluenceRecords = getFluenceRecords();

  // Cumul des NA/PA par élève + alertes fluence (données réelles uniquement)
  const scores = new Map<string, { count: number; reason: string }>();

  for (const exerciseResults of Object.values(store)) {
    for (const [studentId, status] of Object.entries(exerciseResults)) {
      if (status === "NA" || status === "PA") {
        const cur = scores.get(studentId);
        scores.set(studentId, {
          count: (cur?.count ?? 0) + 1,
          reason: status === "NA" ? "Non acquis en exercice récent" : "Partiellement acquis",
        });
      }
    }
  }

  for (const record of fluenceRecords) {
    if (fluenceLevel(record.wpm) === "alerte") {
      const cur = scores.get(record.studentId);
      scores.set(record.studentId, {
        count: (cur?.count ?? 0) + 2,
        reason: `Fluence ${record.wpm} mots/min`,
      });
    }
  }

  return Array.from(scores.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 5)
    .map(([studentId, { reason }]) => ({
      student: STUDENTS.find((s) => s.id === studentId)!,
      reason,
    }))
    .filter((x) => x.student !== undefined);
}
