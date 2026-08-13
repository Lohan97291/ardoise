/**
 * Persistance localStorage pour l'emploi du temps hebdomadaire.
 * Fichier séparé de storage.ts (protégé) — mêmes conventions (load / save, try-catch).
 */
import type { Session, SubjectKey } from "@/lib/ardoise-data";
import { toISODate } from "@/lib/ardoise-data";
import { getExercisePlan } from "@/lib/exercise-plans";
import { readJournalDays, writeJournalDays } from "@/lib/journal-storage";

export type Weekday = "lundi" | "mardi" | "mercredi" | "jeudi" | "vendredi";
export const WEEKDAYS: Weekday[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];
export const WEEKDAY_LABELS: Record<Weekday, string> = {
  lundi: "Lundi",
  mardi: "Mardi",
  mercredi: "Mercredi",
  jeudi: "Jeudi",
  vendredi: "Vendredi",
};

export type TimetableSlot = Omit<Session, "id"> & { fixed?: boolean; builderTemplateId?: string };
export type WeeklyTimetable = Record<Weekday, TimetableSlot[]>;

/**
 * Trame horaire réelle CE1 Romain Rolland (fournie par l'utilisateur, PDF an dernier).
 * Accueil / Récréation / Pause méridienne sont marqués `fixed` (horaires fixes de l'école,
 * ne changent pas d'une année sur l'autre). Reconstruction depuis un tableau PDF —
 * les blocs fixes (accueil/récréation/pause) sont exacts, le contenu pédagogique est une
 * approximation raisonnable à ajuster dans l'éditeur si besoin.
 */
const francais = (
  start: string,
  end: string,
  title: string,
  builderTemplateId?: string,
): TimetableSlot => ({
  start,
  end,
  title,
  subject: "francais",
  builderTemplateId,
});
const maths = (
  start: string,
  end: string,
  title: string,
  builderTemplateId?: string,
): TimetableSlot => ({
  start,
  end,
  title,
  subject: "maths",
  builderTemplateId,
});

function normalizeMathsSlotTitle(slot: TimetableSlot): TimetableSlot {
  if (slot.subject !== "maths") return slot;

  const normalizedTitle = slot.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

  if (normalizedTitle.includes("flash maths")) {
    return { ...slot, title: "Flash maths" };
  }

  if (normalizedTitle.includes("calcul mental")) {
    return { ...slot, title: "Calcul mental" };
  }

  if (normalizedTitle.includes("atelier problemes")) {
    return { ...slot, title: "Résolution de problèmes" };
  }

  if (normalizedTitle.includes("maths en ce1") && normalizedTitle.includes("seance")) {
    return { ...slot, title: "Mathématiques" };
  }

  return slot;
}

function normalizeWeeklyTimetable(timetable: WeeklyTimetable): WeeklyTimetable {
  const next = cloneTimetable(timetable);
  for (const weekday of WEEKDAYS) {
    next[weekday] = (next[weekday] ?? []).map(normalizeMathsSlotTitle);
  }
  return next;
}

function cloneTimetable(timetable: WeeklyTimetable): WeeklyTimetable {
  return JSON.parse(JSON.stringify(timetable)) as WeeklyTimetable;
}

const LEGACY_BALANCED_SEED: WeeklyTimetable = {
  lundi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Langage oral"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:35", "Mathématiques", "sequence-maths-45"),
    francais("09:35", "09:50", "Cléo - activité 1"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:25", "Cléo - activité 2"),
    maths("10:25", "10:55", "Calcul mental", "calcul-mental"),
    francais("10:55", "11:15", "Cléo - activité 3"),
    francais("11:15", "11:30", "Lecture compréhension"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    francais("13:45", "14:20", "Littérature / album", "litterature-album"),
    { start: "14:20", end: "14:50", title: "Questionner le monde", subject: "qlm" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:30", title: "Enseignement moral et civique", subject: "emc" },
    { start: "15:30", end: "16:05", title: "Éducation physique et sportive", subject: "eps" },
    { start: "16:05", end: "16:30", title: "Éducation musicale", subject: "arts" },
  ],
  mardi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Cléo - activité 1"),
    { start: "08:45", end: "09:50", title: "Éducation physique et sportive", subject: "eps" },
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    maths("10:05", "10:10", "Flash maths", "flash-maths"),
    maths("10:10", "10:55", "Mathématiques", "sequence-maths-45"),
    maths("10:55", "11:05", "Calcul mental", "calcul-mental"),
    francais("11:05", "11:30", "Cléo - activité 2"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    francais("13:45", "14:15", "Production d'écrit", "production-ecrit"),
    francais("14:15", "14:30", "Cléo - lexique"),
    francais("14:30", "14:50", "Lecture", "lecture"),
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:30", title: "Anglais", subject: "lve" },
    { start: "15:30", end: "15:50", title: "Arts visuels", subject: "arts" },
    francais("15:50", "16:30", "Cléo - activité 3"),
  ],
  mercredi: [],
  jeudi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Cléo - activité 1"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:25", "Mathématiques", "sequence-maths-35"),
    maths("09:25", "09:35", "Calcul mental", "calcul-mental"),
    francais("09:35", "09:50", "Cléo - activité 2"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    maths("10:05", "10:35", "Résolution de problèmes", "atelier-problemes"),
    francais("10:35", "11:00", "Cléo - activité 3"),
    { start: "11:00", end: "11:30", title: "Questionner le monde", subject: "qlm" },
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    { start: "13:45", end: "14:15", title: "Enseignement moral et civique", subject: "emc" },
    { start: "14:15", end: "14:50", title: "Anglais", subject: "lve" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:50", title: "Arts visuels", subject: "arts" },
    francais("15:50", "16:30", "Cléo - activité 4"),
  ],
  vendredi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Orthographémic / étude graphémique"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:25", "Mathématiques", "sequence-maths-35"),
    maths("09:25", "09:35", "Calcul mental", "calcul-mental"),
    francais("09:35", "09:50", "Lecture compréhension"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    maths("10:05", "10:35", "Résolution de problèmes", "atelier-problemes"),
    francais("10:35", "10:55", "Dictée bilan / orthographe"),
    francais("10:55", "11:30", "Cléo - activité 1"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (calligraphie)", "ecriture-copie"),
    francais("13:45", "14:15", "Cléo - activité 2"),
    { start: "14:15", end: "14:30", title: "Anglais rituel / oral", subject: "lve" },
    { start: "14:30", end: "14:50", title: "EMC / débat", subject: "emc" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "16:10", title: "Éducation physique et sportive", subject: "eps" },
    francais("16:10", "16:30", "Lecture offerte / poésie"),
  ],
};

const SEED_TIMETABLE: WeeklyTimetable = {
  lundi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Langage oral"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:35", "Mathématiques", "sequence-maths-45"),
    francais("09:35", "09:50", "Lecture compréhension", "lecture"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:30", "Orthographémic / dictée", "orthographe-dictee"),
    maths("10:30", "11:00", "Calcul mental", "calcul-mental"),
    francais("11:00", "11:30", "Cléo - activité 1"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    francais("13:45", "14:20", "Littérature / album", "litterature-album"),
    { start: "14:20", end: "14:50", title: "Questionner le monde", subject: "qlm" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:20", title: "Éducation musicale", subject: "arts" },
    { start: "15:20", end: "16:20", title: "Éducation physique et sportive", subject: "eps" },
  ],
  mardi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Cléo - activité 2"),
    { start: "08:45", end: "09:50", title: "Éducation physique et sportive", subject: "eps" },
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    maths("10:05", "10:10", "Flash maths", "flash-maths"),
    maths("10:10", "10:55", "Mathématiques", "sequence-maths-45"),
    maths("10:55", "11:05", "Calcul mental", "calcul-mental"),
    francais("11:05", "11:30", "Cléo - lexique"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    francais("13:45", "14:15", "Production d'écrit", "production-ecrit"),
    francais("14:15", "14:30", "Lecture", "lecture"),
    francais("14:30", "14:50", "Cléo - activité 3"),
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:35", title: "Anglais", subject: "lve" },
    { start: "15:35", end: "16:20", title: "Arts visuels", subject: "arts" },
    francais("16:20", "16:30", "Lecture offerte / poésie", "lecture"),
  ],
  mercredi: [],
  jeudi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Cléo - activité 1"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:25", "Mathématiques", "sequence-maths-35"),
    maths("09:25", "09:35", "Calcul mental", "calcul-mental"),
    francais("09:35", "09:50", "Lecture compréhension", "lecture"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:30", "Orthographémic / dictée", "orthographe-dictee"),
    maths("10:30", "11:00", "Résolution de problèmes", "atelier-problemes"),
    francais("11:00", "11:30", "Cléo - activité 2"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (copie)", "ecriture-copie"),
    { start: "13:45", end: "14:15", title: "Enseignement moral et civique", subject: "emc" },
    francais("14:15", "14:30", "Lecture", "lecture"),
    { start: "14:30", end: "14:50", title: "Questionner le monde", subject: "qlm" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:20", title: "Éducation musicale", subject: "arts" },
    { start: "15:20", end: "15:50", title: "Anglais", subject: "lve" },
    { start: "15:50", end: "16:30", title: "Arts visuels", subject: "arts" },
  ],
  vendredi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:45", "Orthographémic / étude graphémique", "orthographe-dictee"),
    maths("08:45", "08:50", "Flash maths", "flash-maths"),
    maths("08:50", "09:25", "Mathématiques", "sequence-maths-35"),
    maths("09:25", "09:35", "Calcul mental", "calcul-mental"),
    francais("09:35", "09:50", "Lecture compréhension", "lecture"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    maths("10:05", "10:35", "Résolution de problèmes", "atelier-problemes"),
    francais("10:35", "10:55", "Dictée bilan / orthographe", "orthographe-dictee"),
    francais("10:55", "11:30", "Cléo - activité 1"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    { start: "13:20", end: "13:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("13:30", "13:45", "Écriture (calligraphie)", "ecriture-copie"),
    francais("13:45", "14:15", "Cléo - activité 2"),
    { start: "14:15", end: "14:30", title: "Anglais rituel / oral", subject: "lve" },
    { start: "14:30", end: "14:50", title: "EMC / débat", subject: "emc" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "16:10", title: "Éducation physique et sportive", subject: "eps" },
    francais("16:10", "16:30", "Lecture offerte / poésie", "lecture"),
  ],
};

export const TIMETABLE_KEY = "ardoise.timetable.v1";

export function getSeedTimetable(): WeeklyTimetable {
  return cloneTimetable(SEED_TIMETABLE);
}

function slotSignature(slot: TimetableSlot): string {
  return [
    slot.start,
    slot.end,
    slot.title,
    slot.subject,
    slot.fixed ? "fixed" : "free",
    slot.builderTemplateId ?? "",
  ].join("|");
}

function timetableMatches(a: WeeklyTimetable, b: WeeklyTimetable): boolean {
  return WEEKDAYS.every((weekday) => {
    const dayA = a[weekday] ?? [];
    const dayB = b[weekday] ?? [];
    if (dayA.length !== dayB.length) return false;
    return dayA.every((slot, index) => slotSignature(slot) === slotSignature(dayB[index]!));
  });
}

function migrateTimetable(timetable: WeeklyTimetable): WeeklyTimetable {
  const next = normalizeWeeklyTimetable(timetable);

  const mardi = next.mardi ?? [];
  const duplicateEnglishSlot = mardi.find(
    (slot) =>
      slot.start === "14:15" &&
      slot.end === "14:30" &&
      slot.subject === "lve" &&
      slot.title.toLowerCase().includes("anglais"),
  );

  if (duplicateEnglishSlot) {
    duplicateEnglishSlot.title = "Cléo - lexique";
    duplicateEnglishSlot.subject = "francais";
    duplicateEnglishSlot.builderTemplateId = undefined;
    duplicateEnglishSlot.resourceId = undefined;
    duplicateEnglishSlot.prepSheetId = undefined;
    duplicateEnglishSlot.programmingItemId = undefined;
    duplicateEnglishSlot.exercisePlan = undefined;
    duplicateEnglishSlot.correctionMode = undefined;
    duplicateEnglishSlot.correctionExerciseId = undefined;
    duplicateEnglishSlot.correctionPeriod = undefined;
  }

  if (timetableMatches(next, LEGACY_BALANCED_SEED)) {
    return cloneTimetable(SEED_TIMETABLE);
  }

  return next;
}

// ─────────────────────────────────────────────
// Gestion de plusieurs emplois du temps nommés + presets réutilisables.
// La clé historique TIMETABLE_KEY reste synchronisée avec l'emploi du temps
// actif pour ne rien casser côté consommateurs existants.
// ─────────────────────────────────────────────
export type TimetableEntry = { id: string; name: string; data: WeeklyTimetable };
type TimetablesStore = { entries: TimetableEntry[]; activeId: string };

export const TIMETABLES_KEY = "ardoise.timetables.v1";

export type TimetablePreset = { id: string; name: string; data: WeeklyTimetable };
export const TIMETABLE_PRESETS_KEY = "ardoise.timetablePresets.v1";

function genId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `tt-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}

function legacyTimetableFromStorage(): WeeklyTimetable {
  try {
    const raw = localStorage.getItem(TIMETABLE_KEY);
    if (raw) return migrateTimetable(JSON.parse(raw) as WeeklyTimetable);
  } catch {
    /* ignore */
  }
  return migrateTimetable(SEED_TIMETABLE);
}

function readTimetablesStore(): TimetablesStore {
  try {
    const raw = localStorage.getItem(TIMETABLES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as TimetablesStore;
      if (parsed && Array.isArray(parsed.entries) && parsed.entries.length > 0) {
        return parsed;
      }
    }
  } catch {
    /* ignore */
  }

  // Migration non destructive : l'emploi du temps existant devient l'entrée active par défaut.
  const migrated: TimetablesStore = {
    entries: [{ id: genId(), name: "Emploi du temps 1", data: legacyTimetableFromStorage() }],
    activeId: "",
  };
  migrated.activeId = migrated.entries[0]!.id;
  writeTimetablesStore(migrated);
  return migrated;
}

function writeTimetablesStore(store: TimetablesStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMETABLES_KEY, JSON.stringify(store));
}

function getActiveEntry(store: TimetablesStore): TimetableEntry {
  return store.entries.find((entry) => entry.id === store.activeId) ?? store.entries[0]!;
}

function syncLegacyKey(data: WeeklyTimetable): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TIMETABLE_KEY, JSON.stringify(data));
}

export function listTimetables(): Array<{ id: string; name: string }> {
  return readTimetablesStore().entries.map(({ id, name }) => ({ id, name }));
}

export function getActiveTimetableId(): string {
  return readTimetablesStore().activeId;
}

export function setActiveTimetable(id: string): void {
  const store = readTimetablesStore();
  if (!store.entries.some((entry) => entry.id === id)) return;
  store.activeId = id;
  writeTimetablesStore(store);
  syncLegacyKey(getActiveEntry(store).data);
}

export function createTimetable(name: string, data?: WeeklyTimetable): string {
  const store = readTimetablesStore();
  const id = genId();
  store.entries.push({
    id,
    name: name.trim() || `Emploi du temps ${store.entries.length + 1}`,
    data: normalizeWeeklyTimetable(data ?? getSeedTimetable()),
  });
  store.activeId = id;
  writeTimetablesStore(store);
  syncLegacyKey(getActiveEntry(store).data);
  return id;
}

export function renameTimetable(id: string, name: string): void {
  const store = readTimetablesStore();
  const entry = store.entries.find((item) => item.id === id);
  if (!entry) return;
  entry.name = name.trim() || entry.name;
  writeTimetablesStore(store);
}

export function duplicateTimetable(id: string, newName?: string): string | null {
  const store = readTimetablesStore();
  const source = store.entries.find((item) => item.id === id);
  if (!source) return null;
  const newId = genId();
  store.entries.push({
    id: newId,
    name: newName?.trim() || `${source.name} (copie)`,
    data: cloneTimetable(source.data),
  });
  store.activeId = newId;
  writeTimetablesStore(store);
  syncLegacyKey(getActiveEntry(store).data);
  return newId;
}

export function deleteTimetable(id: string): void {
  const store = readTimetablesStore();
  if (store.entries.length <= 1) return;
  const nextEntries = store.entries.filter((entry) => entry.id !== id);
  const nextActiveId = store.activeId === id ? nextEntries[0]!.id : store.activeId;
  const next: TimetablesStore = { entries: nextEntries, activeId: nextActiveId };
  writeTimetablesStore(next);
  syncLegacyKey(getActiveEntry(next).data);
}

export function getTimetable(): WeeklyTimetable {
  const store = readTimetablesStore();
  const active = getActiveEntry(store);
  const migrated = migrateTimetable(active.data);
  active.data = migrated;
  writeTimetablesStore(store);
  syncLegacyKey(migrated);
  return migrated;
}

export function replaceTimetable(next: WeeklyTimetable): void {
  const store = readTimetablesStore();
  const active = getActiveEntry(store);
  active.data = normalizeWeeklyTimetable(next);
  writeTimetablesStore(store);
  syncLegacyKey(active.data);
}

export function saveTimetableDay(weekday: Weekday, slots: TimetableSlot[]): void {
  const current = getTimetable();
  replaceTimetable({ ...current, [weekday]: slots });
}

function readPresets(): TimetablePreset[] {
  try {
    const raw = localStorage.getItem(TIMETABLE_PRESETS_KEY);
    if (raw) return JSON.parse(raw) as TimetablePreset[];
  } catch {
    /* ignore */
  }
  return [];
}

function writePresets(presets: TimetablePreset[]): void {
  localStorage.setItem(TIMETABLE_PRESETS_KEY, JSON.stringify(presets));
}

export function listPresets(): Array<{ id: string; name: string }> {
  return readPresets().map(({ id, name }) => ({ id, name }));
}

export function saveCurrentAsPreset(name: string): string {
  const presets = readPresets();
  const id = genId();
  presets.push({
    id,
    name: name.trim() || `Modèle ${presets.length + 1}`,
    data: cloneTimetable(getTimetable()),
  });
  writePresets(presets);
  return id;
}

export function applyPreset(id: string): void {
  const preset = readPresets().find((item) => item.id === id);
  if (!preset) return;
  replaceTimetable(cloneTimetable(preset.data));
}

export function deletePreset(id: string): void {
  writePresets(readPresets().filter((preset) => preset.id !== id));
}

// ─────────────────────────────────────────────
// Nombre de semaines par période (P1-P5) — pour la vue "sur la période" / "sur l'année"
// ─────────────────────────────────────────────
export const PERIOD_WEEKS_KEY = "ardoise.periodWeeks.v1";
export type PeriodWeeks = Record<1 | 2 | 3 | 4 | 5, number>;
const DEFAULT_PERIOD_WEEKS: PeriodWeeks = { 1: 7, 2: 7, 3: 7, 4: 7, 5: 8 };

export function getPeriodWeeks(): PeriodWeeks {
  try {
    const raw = localStorage.getItem(PERIOD_WEEKS_KEY);
    if (raw) return JSON.parse(raw) as PeriodWeeks;
  } catch {
    /* ignore */
  }
  return DEFAULT_PERIOD_WEEKS;
}

export function savePeriodWeeks(weeks: PeriodWeeks): void {
  localStorage.setItem(PERIOD_WEEKS_KEY, JSON.stringify(weeks));
}

// ─────────────────────────────────────────────
// Volumes horaires officiels CE1 2026-2027 (grille pré-réforme)
// Sources : teetsh.com/posts/volume-repartition-horaire-primaire,
// circ-ien-andolsheim.site.ac-strasbourg.fr
// ─────────────────────────────────────────────
export type OfficialThreshold = { label: string; minutes: number; subjects: SubjectKey[] };
export const OFFICIAL_THRESHOLDS: OfficialThreshold[] = [
  { label: "Français", minutes: 10 * 60, subjects: ["francais"] },
  { label: "Mathématiques", minutes: 5 * 60, subjects: ["maths"] },
  { label: "Langues vivantes", minutes: 90, subjects: ["lve"] },
  { label: "Éducation physique et sportive", minutes: 3 * 60, subjects: ["eps"] },
  { label: "Enseignements artistiques", minutes: 2 * 60, subjects: ["arts"] },
  { label: "Questionner le monde + EMC", minutes: 150, subjects: ["qlm", "emc"] },
];

// ─────────────────────────────────────────────
// Application au cahier journal (écrit dans la même clé/forme que journal.tsx,
// sans importer ni modifier journal.tsx)
// ─────────────────────────────────────────────
const WEEKDAY_OFFSET: Record<Weekday, number> = {
  lundi: 0,
  mardi: 1,
  mercredi: 2,
  jeudi: 3,
  vendredi: 4,
};

/** Écrit les 5 jours de la semaine (à partir du lundi `monday`) dans le cahier journal. */
export async function applyTimetableToWeek(monday: Date): Promise<void> {
  const { autofillJournalDay } = await import("@/lib/journal-autofill");
  const timetable = getTimetable();
  const store = readJournalDays();

  for (const weekday of WEEKDAYS) {
    const slots = timetable[weekday];
    if (!slots || slots.length === 0) continue;
    const date = new Date(monday);
    date.setDate(date.getDate() + WEEKDAY_OFFSET[weekday]);
    const key = toISODate(date);
    const baseSessions = slots.map((s, i) => ({
      id: `${key}-${i}`,
      start: s.start,
      end: s.end,
      title: s.title,
      subject: s.subject,
      pedagogicalDomain: s.pedagogicalDomain,
      pedagogicalSubDomain: s.pedagogicalSubDomain,
      builderTemplateId: s.builderTemplateId,
      free: s.free,
      prepSheetId: s.prepSheetId,
      resourceId: s.resourceId,
      programmingItemId: s.programmingItemId,
      exercisePlan: s.exercisePlan ?? getExercisePlan(s.programmingItemId),
      correctionMode: s.correctionMode,
      correctionExerciseId: s.correctionExerciseId,
      correctionPeriod: s.correctionPeriod,
      note: s.note,
    }));
    store[key] = (await autofillJournalDay(key, baseSessions, store)).sessions;
  }

  writeJournalDays(store);
}
