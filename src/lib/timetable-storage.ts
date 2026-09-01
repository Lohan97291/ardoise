/**
 * Persistance localStorage pour l'emploi du temps hebdomadaire.
 * Fichier séparé de storage.ts (protégé) — mêmes conventions (load / save, try-catch).
 */
import type { Session, SubjectKey } from "@/lib/ardoise-data";
import { toISODate } from "@/lib/ardoise-data";
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
const rituels = (start: string, end: string, title: string): TimetableSlot => ({
  start,
  end,
  title,
  subject: "rituels",
});

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours! * 60 + minutes!;
}

function toTimeString(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

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

function clampSlotDuration(slot: TimetableSlot): TimetableSlot {
  const start = toMinutes(slot.start);
  const end = toMinutes(slot.end);
  if (end > start) return slot;
  return {
    ...slot,
    end: toTimeString(start + 5),
  };
}

function sanitizeDaySlots(slots: TimetableSlot[]): TimetableSlot[] {
  const sorted = [...slots]
    .map((slot) => clampSlotDuration(normalizeMathsSlotTitle(slot)))
    .sort((a, b) => a.start.localeCompare(b.start));

  return sorted.reduce<TimetableSlot[]>((acc, slot) => {
    if (acc.length === 0) {
      acc.push(slot);
      return acc;
    }

    const previous = acc[acc.length - 1]!;
    const previousEnd = toMinutes(previous.end);
    const currentStart = toMinutes(slot.start);
    const currentEnd = toMinutes(slot.end);

    if (currentStart >= previousEnd) {
      acc.push(slot);
      return acc;
    }

    const duration = Math.max(5, currentEnd - currentStart);
    const shifted: TimetableSlot = {
      ...slot,
      start: toTimeString(previousEnd),
      end: toTimeString(previousEnd + duration),
    };

    acc.push(shifted);
    return acc;
  }, []);
}

function normalizeWeeklyTimetable(timetable: WeeklyTimetable): WeeklyTimetable {
  const next = cloneTimetable(timetable);
  for (const weekday of WEEKDAYS) {
    next[weekday] = sanitizeDaySlots(next[weekday] ?? []);
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
    rituels("13:30", "13:45", "Devoirs / agenda"),
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
    rituels("13:30", "13:45", "Devoirs / agenda"),
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
    rituels("13:30", "13:45", "Devoirs / agenda"),
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
    rituels("13:30", "13:45", "Devoirs / agenda"),
    francais("13:45", "14:15", "Écriture", "ecriture-copie"),
    { start: "14:15", end: "14:30", title: "Anglais rituel / oral", subject: "lve" },
    { start: "14:30", end: "14:50", title: "EMC / débat", subject: "emc" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "16:10", title: "Éducation physique et sportive", subject: "eps" },
    francais("16:10", "16:30", "Lecture offerte / poésie"),
  ],
};

const PREVIOUS_SEED_TIMETABLE: WeeklyTimetable = {
  lundi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:50", "Langage oral"),
    maths("08:50", "09:20", "Mathématiques"),
    { start: "09:20", end: "09:50", title: "Éducation physique et sportive", subject: "eps" },
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:35", "Orthographémic", "orthographe-dictee"),
    maths("10:35", "11:00", "Calcul mental / problème du jour", "calcul-mental"),
    francais("11:00", "11:30", "Cléo - grammaire"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    francais("13:20", "13:30", "Lecture plaisir", "lecture"),
    rituels("13:30", "13:50", "Devoirs / agenda"),
    { start: "13:50", end: "14:20", title: "Questionner le monde", subject: "qlm" },
    francais("14:20", "14:50", "Lecture compréhension", "lecture"),
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:35", title: "Éducation musicale", subject: "arts" },
    { start: "15:35", end: "16:30", title: "Éducation physique et sportive", subject: "eps" },
  ],
  mardi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:50", "Cléo - lexique"),
    maths("08:50", "09:20", "Mathématiques"),
    maths("09:20", "09:50", "Mathématiques"),
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:35", "Orthographémic", "orthographe-dictee"),
    francais("10:35", "11:00", "Fluence / ateliers", "lecture"),
    maths("11:00", "11:30", "Calcul mental", "calcul-mental"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    francais("13:20", "13:30", "Lecture plaisir", "lecture"),
    rituels("13:30", "13:50", "Devoirs / agenda"),
    francais("13:50", "14:20", "Production d'écrit", "production-ecrit"),
    { start: "14:20", end: "14:50", title: "Anglais", subject: "lve" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "16:05", title: "Arts plastiques", subject: "arts" },
    francais("16:05", "16:30", "Poésie / lecture offerte", "lecture"),
  ],
  mercredi: [],
  jeudi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:50", "Cléo - conjugaison"),
    maths("08:50", "09:20", "Mathématiques"),
    { start: "09:20", end: "09:50", title: "Éducation physique et sportive", subject: "eps" },
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:35", "Orthographémic", "orthographe-dictee"),
    maths("10:35", "11:00", "Résolution de problèmes", "atelier-problemes"),
    francais("11:00", "11:30", "Cléo - grammaire"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    francais("13:20", "13:30", "Lecture plaisir", "lecture"),
    rituels("13:30", "13:50", "Devoirs / agenda"),
    { start: "13:50", end: "14:20", title: "Enseignement moral et civique", subject: "emc" },
    francais("14:20", "14:50", "Lecture fluence", "lecture"),
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:35", title: "Questionner le monde", subject: "qlm" },
    { start: "15:35", end: "16:05", title: "Anglais", subject: "lve" },
    francais("16:05", "16:30", "Écriture", "ecriture-copie"),
  ],
  vendredi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    francais("08:30", "08:50", "Cléo - orthographe"),
    maths("08:50", "09:20", "Mathématiques"),
    { start: "09:20", end: "09:50", title: "Questionner le monde", subject: "qlm" },
    { start: "09:50", end: "10:05", title: "Récréation", subject: "pause", fixed: true },
    francais("10:05", "10:35", "Orthographémic", "orthographe-dictee"),
    maths("10:35", "11:00", "Résolution de problèmes", "atelier-problemes"),
    francais("11:00", "11:30", "Lecture à voix haute / fluence", "lecture"),
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    francais("13:20", "13:30", "Lecture plaisir", "lecture"),
    rituels("13:30", "13:50", "Devoirs / agenda"),
    maths("13:50", "14:20", "Résolution de problèmes", "atelier-problemes"),
    { start: "14:20", end: "14:50", title: "Anglais", subject: "lve" },
    { start: "14:50", end: "15:05", title: "Récréation", subject: "pause", fixed: true },
    { start: "15:05", end: "15:35", title: "Éducation musicale", subject: "arts" },
    { start: "15:35", end: "16:30", title: "Éducation physique et sportive", subject: "eps" },
  ],
};

const SEED_TIMETABLE: WeeklyTimetable = {
  lundi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    {
      start: "08:30",
      end: "08:50",
      title: "Langage oral",
      subject: "francais",
      note: "Quoi de neuf / rituel oral",
    },
    {
      start: "08:50",
      end: "09:20",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "sequence-maths-35",
      note: "Flash maths + Séquence séance 1",
    },
    {
      start: "09:20",
      end: "09:50",
      title: "EPS",
      subject: "eps",
      note: "Séance 1 (cour, matin)",
    },
    {
      start: "09:50",
      end: "10:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "10:05",
      end: "10:35",
      title: "Orthographémic",
      subject: "francais",
      builderTemplateId: "orthographe-dictee",
      note: "Découverte / classement graphèmes",
    },
    {
      start: "10:35",
      end: "11:00",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "calcul-mental",
      note: "Calcul mental + problème du jour",
    },
    {
      start: "11:00",
      end: "11:30",
      title: "Cléo",
      subject: "francais",
      builderTemplateId: "grammaire",
      note: "EDL grammaire",
    },
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    {
      start: "13:20",
      end: "13:30",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Quart d'heure lecture (plaisir)",
    },
    {
      start: "13:30",
      end: "13:50",
      title: "Devoirs / agenda",
      subject: "rituels",
      note: "Écriture des devoirs",
    },
    {
      start: "13:50",
      end: "14:20",
      title: "Questionner le monde",
      subject: "qlm",
      builderTemplateId: "qlm",
      note: "Le vivant, la matière, les objets",
    },
    {
      start: "14:20",
      end: "14:50",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Compréhension guidée",
    },
    {
      start: "14:50",
      end: "15:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "15:05",
      end: "15:35",
      title: "Éducation musicale",
      subject: "arts",
      note: "Chant, écoute",
    },
    {
      start: "15:35",
      end: "16:05",
      title: "EPS",
      subject: "eps",
      note: "Séance 1 (cour/gymnase)",
    },
    {
      start: "16:05",
      end: "16:30",
      title: "EPS",
      subject: "eps",
      note: "Séance 1 (suite)",
    },
  ],
  mardi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    {
      start: "08:30",
      end: "08:50",
      title: "Cléo",
      subject: "francais",
      builderTemplateId: "grammaire",
      note: "EDL lexique",
    },
    {
      start: "08:50",
      end: "09:20",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "sequence-maths-35",
      note: "Flash maths + Séquence séance 2",
    },
    {
      start: "09:20",
      end: "09:50",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "sequence-maths-35",
      note: "Séquence séance 2 (suite)",
    },
    {
      start: "09:50",
      end: "10:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "10:05",
      end: "10:35",
      title: "Orthographémic",
      subject: "francais",
      builderTemplateId: "orthographe-dictee",
      note: "Lecture-compréhension du texte",
    },
    {
      start: "10:35",
      end: "11:00",
      title: "Orthographémic",
      subject: "francais",
      builderTemplateId: "orthographe-dictee",
      note: "Ateliers Fluence/Mallette/Tapette",
    },
    {
      start: "11:00",
      end: "11:30",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "calcul-mental",
      note: "Calcul mental",
    },
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    {
      start: "13:20",
      end: "13:30",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Quart d'heure lecture (plaisir)",
    },
    {
      start: "13:30",
      end: "13:50",
      title: "Devoirs / agenda",
      subject: "rituels",
      note: "Écriture des devoirs",
    },
    {
      start: "13:50",
      end: "14:20",
      title: "Production d'écrit",
      subject: "francais",
      builderTemplateId: "production-ecrit",
      note: "Rédaction guidée",
    },
    {
      start: "14:20",
      end: "14:50",
      title: "Anglais",
      subject: "lve",
      builderTemplateId: "anglais-seance",
      note: "LV séance 1",
    },
    {
      start: "14:50",
      end: "15:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "15:05",
      end: "15:35",
      title: "Arts plastiques",
      subject: "arts",
      builderTemplateId: "arts-visuels",
      note: "Projet arts visuels (album)",
    },
    {
      start: "15:35",
      end: "16:05",
      title: "Arts plastiques",
      subject: "arts",
      builderTemplateId: "arts-visuels",
      note: "Projet arts visuels (suite)",
    },
    {
      start: "16:05",
      end: "16:30",
      title: "Poésie",
      subject: "francais",
      note: "Poésie / lecture offerte",
    },
  ],
  mercredi: [],
  jeudi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    {
      start: "08:30",
      end: "08:50",
      title: "Cléo",
      subject: "francais",
      builderTemplateId: "grammaire",
      note: "EDL conjugaison",
    },
    {
      start: "08:50",
      end: "09:20",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "sequence-maths-35",
      note: "Flash maths + Séquence séance 3",
    },
    {
      start: "09:20",
      end: "09:50",
      title: "EPS",
      subject: "eps",
      note: "Séance 2 + course aux mots (cour)",
    },
    {
      start: "09:50",
      end: "10:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "10:05",
      end: "10:35",
      title: "Orthographémic",
      subject: "francais",
      builderTemplateId: "orthographe-dictee",
      note: "Dictée flash + grilles",
    },
    {
      start: "10:35",
      end: "11:00",
      title: "Maths ateliers",
      subject: "maths",
      builderTemplateId: "atelier-problemes",
      note: "Atelier problèmes séance 1",
    },
    {
      start: "11:00",
      end: "11:30",
      title: "Cléo",
      subject: "francais",
      builderTemplateId: "grammaire",
      note: "EDL grammaire (entraînement)",
    },
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    {
      start: "13:20",
      end: "13:30",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Quart d'heure lecture (plaisir)",
    },
    {
      start: "13:30",
      end: "13:50",
      title: "Devoirs / agenda",
      subject: "rituels",
      note: "Écriture des devoirs",
    },
    {
      start: "13:50",
      end: "14:20",
      title: "EMC",
      subject: "emc",
      builderTemplateId: "emc",
      note: "Débat réglé / vivre ensemble",
    },
    {
      start: "14:20",
      end: "14:50",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Lecture textes longs / fluence",
    },
    {
      start: "14:50",
      end: "15:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "15:05",
      end: "15:35",
      title: "Questionner le monde",
      subject: "qlm",
      builderTemplateId: "qlm",
      note: "Espace et temps",
    },
    {
      start: "15:35",
      end: "16:05",
      title: "Anglais",
      subject: "lve",
      builderTemplateId: "anglais-seance",
      note: "LV séance 2",
    },
    {
      start: "16:05",
      end: "16:30",
      title: "Écriture",
      subject: "francais",
      builderTemplateId: "ecriture-copie",
      note: "Calligraphie",
    },
  ],
  vendredi: [
    { start: "08:20", end: "08:30", title: "Accueil", subject: "rituels", fixed: true },
    {
      start: "08:30",
      end: "08:50",
      title: "Cléo",
      subject: "francais",
      builderTemplateId: "grammaire",
      note: "EDL orthographe (mots invariables)",
    },
    {
      start: "08:50",
      end: "09:20",
      title: "Mathématiques",
      subject: "maths",
      builderTemplateId: "sequence-maths-35",
      note: "Flash maths + Séquence séance 4",
    },
    {
      start: "09:20",
      end: "09:50",
      title: "Questionner le monde",
      subject: "qlm",
      builderTemplateId: "qlm",
      note: "Le vivant / expériences",
    },
    {
      start: "09:50",
      end: "10:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "10:05",
      end: "10:35",
      title: "Orthographémic",
      subject: "francais",
      builderTemplateId: "orthographe-dictee",
      note: "Systématisation + dictée bilan",
    },
    {
      start: "10:35",
      end: "11:00",
      title: "Maths ateliers",
      subject: "maths",
      builderTemplateId: "atelier-problemes",
      note: "Atelier problèmes séance 2",
    },
    {
      start: "11:00",
      end: "11:30",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Lecture à voix haute / fluence",
    },
    { start: "11:30", end: "13:20", title: "Pause méridienne", subject: "pause", fixed: true },
    {
      start: "13:20",
      end: "13:30",
      title: "Lecture",
      subject: "francais",
      builderTemplateId: "lecture",
      note: "Quart d'heure lecture (plaisir)",
    },
    {
      start: "13:30",
      end: "13:50",
      title: "Devoirs / agenda",
      subject: "rituels",
      note: "Écriture des devoirs",
    },
    {
      start: "13:50",
      end: "14:20",
      title: "Mathématiques",
      subject: "maths",
      note: "Résolution de problèmes / jeux maths",
    },
    {
      start: "14:20",
      end: "14:50",
      title: "Anglais",
      subject: "lve",
      builderTemplateId: "anglais-rituel",
      note: "LV rituel / oral",
    },
    {
      start: "14:50",
      end: "15:05",
      title: "Récréation (1er service)",
      subject: "pause",
      fixed: true,
    },
    {
      start: "15:05",
      end: "15:35",
      title: "Éducation musicale",
      subject: "arts",
      note: "Chant / pratique",
    },
    {
      start: "15:35",
      end: "16:05",
      title: "EPS",
      subject: "eps",
      note: "Séance 3 (cour/gymnase)",
    },
    {
      start: "16:05",
      end: "16:30",
      title: "EPS",
      subject: "eps",
      note: "Séance 3 (suite)",
    },
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

  for (const weekday of WEEKDAYS) {
    for (const slot of next[weekday] ?? []) {
      const normalizedTitle = normalizeSlotTitle(slot.title);
      if (
        slot.builderTemplateId === "ecriture-copie" ||
        normalizedTitle === "ecriture / copie" ||
        normalizedTitle === "ecriture (copie)" ||
        normalizedTitle === "ecriture (calligraphie)"
      ) {
        slot.title = "Écriture";
      }
    }
  }

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

  for (const weekday of SCHOOL_DAYS_FOR_MIGRATION) {
    const daySlots = next[weekday] ?? [];
    const afterLunchSlot = daySlots.find(
      (slot) =>
        slot.start === "13:30" &&
        slot.end === "13:45" &&
        ["ecriture (copie)", "ecriture (calligraphie)"].includes(normalizeSlotTitle(slot.title)),
    );

    if (afterLunchSlot) {
      afterLunchSlot.title = "Devoirs / agenda";
      afterLunchSlot.subject = "rituels";
      afterLunchSlot.builderTemplateId = undefined;
      afterLunchSlot.resourceId = undefined;
      afterLunchSlot.prepSheetId = undefined;
      afterLunchSlot.programmingItemId = undefined;
      afterLunchSlot.exercisePlan = undefined;
      afterLunchSlot.correctionMode = undefined;
      afterLunchSlot.correctionExerciseId = undefined;
      afterLunchSlot.correctionPeriod = undefined;
      afterLunchSlot.pedagogicalDomain = undefined;
      afterLunchSlot.pedagogicalSubDomain = undefined;
    }
  }

  const fridayWritingSlot = (next.vendredi ?? []).find(
    (slot) => slot.start === "13:45" && slot.end === "14:15" && normalizeSlotTitle(slot.title) === "cleo - activite 2",
  );

  if (fridayWritingSlot) {
    fridayWritingSlot.title = "Écriture";
    fridayWritingSlot.subject = "francais";
    fridayWritingSlot.builderTemplateId = "ecriture-copie";
    fridayWritingSlot.resourceId = undefined;
    fridayWritingSlot.prepSheetId = undefined;
    fridayWritingSlot.programmingItemId = undefined;
    fridayWritingSlot.exercisePlan = undefined;
    fridayWritingSlot.correctionMode = undefined;
    fridayWritingSlot.correctionExerciseId = undefined;
    fridayWritingSlot.correctionPeriod = undefined;
  }

  if (
    timetableMatches(next, LEGACY_BALANCED_SEED) ||
    timetableMatches(next, PREVIOUS_SEED_TIMETABLE)
  ) {
    return cloneTimetable(SEED_TIMETABLE);
  }

  return next;
}

const SCHOOL_DAYS_FOR_MIGRATION: Weekday[] = ["lundi", "mardi", "jeudi", "vendredi"];

function normalizeSlotTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
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
      note: s.note,
    }));
    store[key] = baseSessions;
  }

  writeJournalDays(store);
}
