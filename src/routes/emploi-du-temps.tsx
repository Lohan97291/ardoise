import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Maximize2,
  Minimize2,
  CalendarCheck2,
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  FolderOpen,
  GripVertical,
  Hand,
  MoreVertical,
  MoveRight,
  Pencil,
  Plus,
  Printer,
  Rows3,
  Scale,
  Sparkles,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { AiActionStrip } from "@/components/ardoise/ai-action-strip";
import { AppShell } from "@/components/ardoise/app-shell";
import { PedagogicalAiDialog } from "@/components/ardoise/pedagogical-ai-dialog";
import { SUBJECT_BAND, SUBJECT_DOT, SUBJECT_STRIP } from "@/components/ardoise/subject-styles";
import { TimetableSlotDialog } from "@/components/ardoise/timetable-slot-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SUBJECTS, addDays, toISODate, type SubjectKey } from "@/lib/ardoise-data";
import { ARDOISE_AI_NAME, ardoiseAiTitle } from "@/lib/ardoise-ai-brand";
import { CLEO_CATALOG, MATHS_CATALOG, type CatalogEntry } from "@/lib/ardoise-eval";
import { getItemState, getProgression } from "@/lib/programmation-storage";
import {
  OFFICIAL_THRESHOLDS,
  WEEKDAYS,
  WEEKDAY_LABELS,
  applyTimetableToWeek,
  applyPreset,
  createTimetable,
  deletePreset,
  deleteTimetable,
  duplicateTimetable,
  getActiveTimetableId,
  getSeedTimetable,
  getPeriodWeeks,
  getTimetable,
  listPresets,
  listTimetables,
  renameTimetable,
  replaceTimetable,
  saveCurrentAsPreset,
  savePeriodWeeks,
  saveTimetableDay,
  setActiveTimetable,
  type PeriodWeeks,
  type TimetableSlot,
  type Weekday,
} from "@/lib/timetable-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/emploi-du-temps")({
  head: () => ({
    meta: [
      { title: "Emploi du temps — Ardoise" },
      {
        name: "description",
        content:
          "Le planning hebdomadaire CE1 d'Ardoise : quatre jours de classe en colonnes, créneaux colorés par matière et répartition horaire comparée au programme officiel.",
      },
      { property: "og:title", content: "Emploi du temps — Ardoise" },
      {
        property: "og:description",
        content:
          "Semaine type en colonnes, volumes horaires par matière et projection sur la période et l'année.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmploiDuTempsPage,
});

/** Jours de classe affichés (pas d’école le mercredi). */
const SCHOOL_DAYS: Weekday[] = WEEKDAYS.filter((day) => day !== "mercredi");

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h! * 60 + m!;
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function hoursLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}min`;
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${h}h`;
}

function slotMinutes(slot: TimetableSlot): number {
  return Math.max(0, toMinutes(slot.end) - toMinutes(slot.start));
}

function isMiddayBreak(slot: TimetableSlot): boolean {
  const title = slot.title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return slot.subject === "pause" && title.includes("meridienne");
}

function normalizeSlotTitle(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function upcomingMonday(from: Date): Date {
  const dow = from.getDay();
  const offset = dow === 0 ? 1 : dow === 1 ? 0 : 8 - dow;
  return addDays(from, offset);
}

function sortSlots(slots: TimetableSlot[]): TimetableSlot[] {
  return [...slots].sort((a, b) => a.start.localeCompare(b.start));
}

function moveSlot(slot: TimetableSlot, deltaMinutes: number): TimetableSlot {
  return {
    ...slot,
    start: toTimeString(toMinutes(slot.start) + deltaMinutes),
    end: toTimeString(toMinutes(slot.end) + deltaMinutes),
  };
}

function resizeSlotDuration(slot: TimetableSlot, deltaMinutes: number): TimetableSlot {
  return {
    ...slot,
    end: toTimeString(toMinutes(slot.end) + deltaMinutes),
  };
}

function visualSlotHeight(slot: TimetableSlot, nextSlot?: TimetableSlot): number {
  const top = minuteToVisualY(toMinutes(slot.start));
  const bottom = minuteToVisualY(toMinutes(slot.end));
  const naturalHeight = Math.max(12, bottom - top);

  if (!nextSlot) return naturalHeight;

  const nextTop = minuteToVisualY(toMinutes(nextSlot.start));
  const availableHeight = nextTop - top - 2;

  if (availableHeight <= 0) return 8;
  return Math.max(8, Math.min(naturalHeight, availableHeight));
}

function roundToStep(minutes: number, step = SLOT_STEP): number {
  return Math.round(minutes / step) * step;
}

type ProgrammingOption = CatalogEntry & { displayTitle: string };

function programmingOptions(subject: SubjectKey): ProgrammingOption[] {
  const catalog = subject === "francais" ? CLEO_CATALOG : subject === "maths" ? MATHS_CATALOG : [];
  const progression = getProgression();
  return catalog.map((entry) => ({
    ...entry,
    displayTitle: getItemState(progression, entry.id).titleOverride ?? entry.title,
  }));
}

function programmingLabel(id: string | undefined): string | null {
  if (!id) return null;
  const entry = [...CLEO_CATALOG, ...MATHS_CATALOG].find((item) => item.id === id);
  if (!entry) return null;
  return getItemState(getProgression(), id).titleOverride ?? entry.title;
}

const EDITABLE_SUBJECTS: SubjectKey[] = [
  "francais",
  "maths",
  "qlm",
  "emc",
  "eps",
  "arts",
  "lve",
  "rituels",
];

function buildSlotTitle(
  title: string,
  subject: SubjectKey,
  pedagogicalDomain?: string,
  pedagogicalSubDomain?: string,
): string {
  const trimmed = title.trim();
  if (trimmed) return trimmed;
  if (pedagogicalSubDomain) return pedagogicalSubDomain;
  if (pedagogicalDomain) return pedagogicalDomain;
  return SUBJECTS[subject].label;
}

function minuteToVisualY(minutes: number): number {
  if (minutes <= MIDDAY_START) {
    return (minutes - SCHOOL_START) * SCHEDULE_MINUTE_HEIGHT;
  }
  if (minutes >= MIDDAY_END) {
    return AFTERNOON_OFFSET + (minutes - MIDDAY_END) * SCHEDULE_MINUTE_HEIGHT;
  }

  const ratio = (minutes - MIDDAY_START) / (MIDDAY_END - MIDDAY_START);
  return MORNING_VISUAL_HEIGHT + ratio * MIDDAY_COMPRESSED_HEIGHT;
}

function visualYToMinute(y: number): number {
  const clamped = Math.max(0, Math.min(DAY_CANVAS_HEIGHT, y));
  if (clamped <= MORNING_VISUAL_HEIGHT) {
    return SCHOOL_START + clamped / SCHEDULE_MINUTE_HEIGHT;
  }
  if (clamped < AFTERNOON_OFFSET) {
    const ratio = (clamped - MORNING_VISUAL_HEIGHT) / MIDDAY_COMPRESSED_HEIGHT;
    return MIDDAY_START + ratio * (MIDDAY_END - MIDDAY_START);
  }
  return MIDDAY_END + (clamped - AFTERNOON_OFFSET) / SCHEDULE_MINUTE_HEIGHT;
}

function clampMovedSlot(slot: TimetableSlot): TimetableSlot {
  const duration = slotMinutes(slot);
  let start = toMinutes(slot.start);
  if (start < SCHOOL_START) start = SCHOOL_START;
  if (start + duration > SCHOOL_END) start = SCHOOL_END - duration;
  return {
    ...slot,
    start: toTimeString(start),
    end: toTimeString(start + duration),
  };
}

function clampResizedSlot(slot: TimetableSlot): TimetableSlot {
  const start = toMinutes(slot.start);
  let end = toMinutes(slot.end);
  end = Math.max(start + MIN_SLOT_DURATION, end);
  end = Math.min(SCHOOL_END, end);
  return {
    ...slot,
    end: toTimeString(end),
  };
}

const SCHOOL_START = toMinutes("08:20");
const SCHOOL_END = toMinutes("16:30");
const MIDDAY_START = toMinutes("11:30");
const MIDDAY_END = toMinutes("13:20");
const SLOT_STEP = 5;
const MIN_SLOT_DURATION = 5;
const SCHEDULE_MINUTE_HEIGHT = 1.85;
const MIDDAY_COMPRESSED_HEIGHT = 28;
const TIME_LABELS_STEP = 20;

const MORNING_VISUAL_HEIGHT = (MIDDAY_START - SCHOOL_START) * SCHEDULE_MINUTE_HEIGHT;
const AFTERNOON_VISUAL_HEIGHT = (SCHOOL_END - MIDDAY_END) * SCHEDULE_MINUTE_HEIGHT;
const DAY_CANVAS_HEIGHT =
  MORNING_VISUAL_HEIGHT + MIDDAY_COMPRESSED_HEIGHT + AFTERNOON_VISUAL_HEIGHT;
const AFTERNOON_OFFSET = MORNING_VISUAL_HEIGHT + MIDDAY_COMPRESSED_HEIGHT;
const TIME_MARKS: number[] = (() => {
  const marks: number[] = [];
  for (let minute = SCHOOL_START; minute <= MIDDAY_START; minute += TIME_LABELS_STEP) {
    marks.push(minute);
  }
  for (let minute = MIDDAY_END; minute <= SCHOOL_END; minute += TIME_LABELS_STEP) {
    marks.push(minute);
  }
  return marks;
})();

type BuilderMode = "construct" | "move";
type AssessmentLevel = "ok" | "warn" | "block";

type PlacementAssessment = {
  level: AssessmentLevel;
  title: string;
  description: string;
};

type TemplateWindow = {
  start: number;
  end: number;
  label: string;
};

type BuilderTemplate = {
  id: string;
  title: string;
  subject: SubjectKey;
  duration: number;
  hint: string;
  windows: TemplateWindow[];
};

type DragPayload =
  { kind: "template"; templateId: string } | { kind: "slot"; weekday: Weekday; index: number };

type PendingPlacement = {
  mode: "save" | "move";
  slot: TimetableSlot;
  targetWeekday: Weekday;
  targetIndex: number | null;
  source?: { weekday: Weekday; index: number };
  assessment: PlacementAssessment;
};

type DirectManipulation = {
  weekday: Weekday;
  index: number;
  mode: "move" | "resize-end";
  original: TimetableSlot;
  pointerOffsetY: number;
};

const w = (start: string, end: string, label: string): TemplateWindow => ({
  start: toMinutes(start),
  end: toMinutes(end),
  label,
});

const BLOCK_LIBRARY: BuilderTemplate[] = [
  {
    id: "lecture",
    title: "Lecture",
    subject: "francais",
    duration: 20,
    hint: "Lecture guidée ou autonome, courte et régulière.",
    windows: [
      w("09:35", "10:00", "souvent en fin de matinée"),
      w("13:45", "14:30", "ou juste après le retour"),
      w("16:00", "16:30", "ou pour une lecture offerte en fin de journée"),
    ],
  },
  {
    id: "fluence",
    title: "Fluence",
    subject: "francais",
    duration: 15,
    hint: "Entraînement court et ritualisé sur lecture répétée.",
    windows: [
      w("08:30", "09:15", "en début de matinée"),
      w("13:30", "14:15", "ou en reprise d'après-midi"),
    ],
  },
  {
    id: "orthographe-dictee",
    title: "Orthographe / dictée",
    subject: "francais",
    duration: 25,
    hint: "Bloc court et cadré avant la grande séance suivante.",
    windows: [
      w("10:05", "10:35", "souvent après récréation"),
      w("08:30", "09:15", "ou en début de matinée"),
    ],
  },
  {
    id: "grammaire",
    title: "Grammaire",
    subject: "francais",
    duration: 45,
    hint: "Séance structurée, plutôt sur un temps stable et calme.",
    windows: [
      w("08:30", "09:50", "en matinée"),
      w("10:45", "11:30", "ou avant la pause méridienne"),
      w("13:45", "14:45", "éventuellement sur un vrai temps d'après-midi"),
    ],
  },
  {
    id: "ecriture-copie",
    title: "Écriture / copie",
    subject: "francais",
    duration: 15,
    hint: "Petit créneau quotidien, facile à placer en reprise.",
    windows: [
      w("13:30", "14:00", "au retour de midi"),
      w("15:05", "15:35", "ou en fin de journée"),
    ],
  },
  {
    id: "litterature-album",
    title: "Littérature / album",
    subject: "francais",
    duration: 35,
    hint: "Place dédiée au projet album, lecture-compréhension et échanges.",
    windows: [
      w("13:45", "14:30", "plutôt en début d'après-midi"),
      w("09:10", "10:00", "ou sur un grand créneau du matin"),
    ],
  },
  {
    id: "production-ecrit",
    title: "Production d'écrit",
    subject: "francais",
    duration: 45,
    hint: "Temps de recherche, oralisation, rédaction et reprise.",
    windows: [w("13:45", "15:15", "sur un temps long d'après-midi")],
  },
  {
    id: "flash-maths",
    title: "Flash maths",
    subject: "maths",
    duration: 5,
    hint: "Rituel très court de réactivation, conforme au guide.",
    windows: [
      w("08:45", "08:55", "en lancement de matinée"),
      w("10:05", "10:15", "avant une grande séance"),
      w("14:20", "14:35", "en relance d'après-midi"),
    ],
  },
  {
    id: "probleme-jour",
    title: "Problème du jour",
    subject: "maths",
    duration: 15,
    hint: "Petit temps de recherche avant ou autour de la séance de maths.",
    windows: [
      w("10:25", "10:50", "souvent autour du coeur de séance"),
      w("13:40", "14:10", "ou en début d'après-midi"),
    ],
  },
  {
    id: "calcul-mental",
    title: "Calcul mental",
    subject: "maths",
    duration: 10,
    hint: "Séance quotidienne courte, comme dans le guide.",
    windows: [w("09:20", "11:05", "en matinée"), w("14:20", "15:00", "ou en après-midi")],
  },
  {
    id: "sequence-maths-45",
    title: "Mathématiques",
    subject: "maths",
    duration: 45,
    hint: "Grande séance structurée, format 45 min du guide.",
    windows: [
      w("08:45", "09:55", "sur une vraie plage du matin"),
      w("10:05", "11:00", "ou juste après récréation"),
      w("13:55", "14:45", "ou en début d'après-midi"),
    ],
  },
  {
    id: "sequence-maths-35",
    title: "Mathématiques",
    subject: "maths",
    duration: 35,
    hint: "Format 35 min du guide, plus léger mais structuré.",
    windows: [
      w("08:50", "09:35", "sur le début de matinée"),
      w("10:05", "10:55", "ou juste après récréation"),
      w("13:55", "14:35", "ou en début d'après-midi"),
    ],
  },
  {
    id: "atelier-problemes",
    title: "Atelier problèmes",
    subject: "maths",
    duration: 30,
    hint: "Temps dédié de résolution de problèmes, comme indiqué dans le guide.",
    windows: [w("10:05", "11:15", "autour du bloc maths"), w("14:00", "15:00", "ou l'après-midi")],
  },
  {
    id: "anglais-rituel",
    title: "Anglais",
    subject: "lve",
    duration: 10,
    hint: "Format très court autorisé pour un petit rituel oral.",
    windows: [w("08:30", "09:20", "en rituel"), w("14:15", "15:35", "ou en fin de journée")],
  },
  {
    id: "anglais-seance",
    title: "Anglais",
    subject: "lve",
    duration: 30,
    hint: "Séance plus complète avec oral, écoute et réemploi.",
    windows: [
      w("15:05", "15:50", "plutôt l'après-midi"),
      w("13:55", "14:45", "ou après la reprise"),
    ],
  },
  {
    id: "qlm",
    title: "Questionner le monde",
    subject: "qlm",
    duration: 45,
    hint: "Bloc de découverte, manipulation ou structuration.",
    windows: [
      w("08:45", "09:50", "en matinée"),
      w("14:20", "15:00", "ou en début d'après-midi"),
      w("15:05", "16:00", "ou en fin d'après-midi"),
    ],
  },
  {
    id: "emc",
    title: "EMC",
    subject: "emc",
    duration: 30,
    hint: "Temps d'échanges, débat, régulation ou séance dédiée.",
    windows: [
      w("08:30", "09:15", "en ouverture"),
      w("13:45", "14:35", "ou en reprise d'après-midi"),
    ],
  },
  {
    id: "arts-visuels",
    title: "Arts visuels",
    subject: "arts",
    duration: 45,
    hint: "Créneau assez long pour installer, produire et ranger.",
    windows: [w("15:20", "16:30", "plutôt en deuxième partie d'après-midi")],
  },
  {
    id: "education-musicale",
    title: "Éducation musicale",
    subject: "arts",
    duration: 15,
    hint: "Petit créneau de chant, écoute ou rituel musical.",
    windows: [
      w("15:05", "15:25", "en début d'après-midi tardive"),
      w("08:30", "08:50", "ou en lancement"),
    ],
  },
  {
    id: "eps",
    title: "EPS",
    subject: "eps",
    duration: 60,
    hint: "Grand bloc moteur, installation et retour au calme inclus.",
    windows: [
      w("08:45", "09:50", "sur une longue plage du matin"),
      w("15:15", "16:30", "ou en fin de journée"),
    ],
  },
];

function getTemplate(templateId?: string): BuilderTemplate | undefined {
  return BLOCK_LIBRARY.find((template) => template.id === templateId);
}

function resolveTemplate(slot: TimetableSlot): BuilderTemplate | undefined {
  const template = getTemplate(slot.builderTemplateId);
  return template && template.subject === slot.subject ? template : undefined;
}

function windowSummary(windows: TemplateWindow[]): string {
  return windows.map((window) => window.label).join(" · ");
}

function overlaps(a: TimetableSlot, b: TimetableSlot): boolean {
  return toMinutes(a.start) < toMinutes(b.end) && toMinutes(a.end) > toMinutes(b.start);
}

function createTemplateSlot(template: BuilderTemplate, startMinute: number): TimetableSlot {
  return {
    start: toTimeString(startMinute),
    end: toTimeString(startMinute + template.duration),
    title: template.title,
    subject: template.subject,
    builderTemplateId: template.id,
  };
}

function findGapStartInWindow(
  daySlots: TimetableSlot[],
  duration: number,
  window: TemplateWindow,
): number | null {
  let cursor = Math.max(SCHOOL_START, window.start);
  for (const slot of sortSlots(daySlots)) {
    const start = toMinutes(slot.start);
    const end = toMinutes(slot.end);
    if (end <= cursor) continue;
    if (start >= window.end) break;
    if (start - cursor >= duration) return cursor;
    cursor = Math.max(cursor, end);
    if (cursor >= window.end) return null;
  }
  return window.end - cursor >= duration ? cursor : null;
}

function suggestTemplatePlacement(
  daySlots: TimetableSlot[],
  template: BuilderTemplate,
): { slot: TimetableSlot; assessment: PlacementAssessment } {
  for (const window of template.windows) {
    const start = findGapStartInWindow(daySlots, template.duration, window);
    if (start !== null) {
      return {
        slot: createTemplateSlot(template, start),
        assessment: {
          level: "ok",
          title: "Placement cohérent",
          description: `${hoursLabel(template.duration)} trouvées ${window.label}.`,
        },
      };
    }
  }

  const free = findGapStartInWindow(daySlots, template.duration, {
    start: SCHOOL_START,
    end: SCHOOL_END,
    label: "sur la journée",
  });

  if (free !== null) {
    return {
      slot: createTemplateSlot(template, free),
      assessment: {
        level: "warn",
        title: "Placement possible mais atypique",
        description: `Il y a de la place, mais pas sur le créneau habituel (${windowSummary(template.windows)}).`,
      },
    };
  }

  return {
    slot: {
      start: "08:30",
      end: toTimeString(toMinutes("08:30") + template.duration),
      title: template.title,
      subject: template.subject,
      builderTemplateId: template.id,
    },
    assessment: {
      level: "warn",
      title: "Réglage manuel à prévoir",
      description:
        "Aucune place automatique n'a été trouvée sur cette journée. Ardoise ouvre le bloc pour ajuster l'horaire.",
    },
  };
}

function assessPlacement(
  daySlots: TimetableSlot[],
  slot: TimetableSlot,
  template?: BuilderTemplate,
): PlacementAssessment {
  const start = toMinutes(slot.start);
  const end = toMinutes(slot.end);
  const duration = end - start;

  if (!slot.title.trim()) {
    return {
      level: "block",
      title: "Titre manquant",
      description: "Le bloc doit avoir un titre avant d'être enregistré.",
    };
  }

  if (!slot.start || !slot.end || Number.isNaN(start) || Number.isNaN(end)) {
    return {
      level: "block",
      title: "Horaire incomplet",
      description: "Le créneau doit avoir un début et une fin valides.",
    };
  }

  if (duration <= 0) {
    return {
      level: "block",
      title: "Horaire incohérent",
      description: "L'heure de fin doit être après l'heure de début.",
    };
  }

  if (start < SCHOOL_START || end > SCHOOL_END) {
    return {
      level: "block",
      title: "Hors temps scolaire",
      description: "Ce créneau sort des bornes de la journée de classe.",
    };
  }

  const collision = sortSlots(daySlots).find((existing) => overlaps(slot, existing));
  if (collision) {
    return {
      level: "block",
      title: "Chevauchement impossible",
      description: `Conflit avec “${collision.title}” (${collision.start}–${collision.end}).`,
    };
  }

  if (template) {
    const inPreferredWindow = template.windows.some(
      (window) => start >= window.start && end <= window.end,
    );
    const ratio = duration / template.duration;

    if (ratio < 0.65 || ratio > 1.6) {
      return {
        level: "warn",
        title: "Durée atypique",
        description: `Ce bloc est plutôt prévu autour de ${hoursLabel(template.duration)}.`,
      };
    }

    if (!inPreferredWindow) {
      return {
        level: "warn",
        title: "Créneau atypique",
        description: `Ce bloc se place plutôt ${windowSummary(template.windows)}.`,
      };
    }
  } else {
    if (duration >= 60 && start >= toMinutes("15:00")) {
      return {
        level: "warn",
        title: "Séance longue en fin de journée",
        description: "Le placement reste possible, mais ce grand bloc est un peu tardif.",
      };
    }

    if (duration < 10) {
      return {
        level: "warn",
        title: "Créneau très court",
        description:
          "Le format est inhabituel. Vérifie si ce temps correspond bien à ton intention.",
      };
    }
  }

  return {
    level: "ok",
    title: "Placement cohérent",
    description: "Ce bloc s'insère sans conflit et dans un créneau cohérent.",
  };
}

function dropPreview(
  timetable: Record<Weekday, TimetableSlot[]>,
  weekday: Weekday,
  payload: DragPayload | null,
): PlacementAssessment | null {
  if (!payload) return null;

  if (payload.kind === "template") {
    const template = getTemplate(payload.templateId);
    if (!template) return null;
    return suggestTemplatePlacement(timetable[weekday], template).assessment;
  }

  const slot = timetable[payload.weekday][payload.index];
  if (!slot) return null;
  if (payload.weekday === weekday) {
    return {
      level: "warn",
      title: "Même journée",
      description: "Dépose sur un autre jour pour déplacer ce bloc.",
    };
  }

  return assessPlacement(timetable[weekday], slot, resolveTemplate(slot));
}

function assessmentClasses(level: AssessmentLevel): string {
  switch (level) {
    case "ok":
      return "border-status-a-solid/30 bg-status-a text-status-a-foreground";
    case "warn":
      return "border-status-pa-solid/30 bg-status-pa text-status-pa-foreground";
    case "block":
      return "border-danger-soft-border bg-danger-soft text-danger-strong";
  }
}

function helperTone(level: AssessmentLevel): string {
  switch (level) {
    case "ok":
      return "text-status-a-foreground";
    case "warn":
      return "text-status-pa-foreground";
    case "block":
      return "text-danger-strong";
  }
}

function QuickStatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-2xl border border-border/80 bg-card/88 px-4 py-3 shadow-card backdrop-blur-sm">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold text-foreground">{value}</p>
      <p className="mt-1 text-[0.72rem] leading-relaxed text-muted-foreground">{hint}</p>
    </div>
  );
}

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs">
      <span className="font-semibold text-foreground">{value}</span>
      <span className="text-muted-foreground">{label}</span>
    </span>
  );
}

type NamePromptAction =
  | { kind: "create" }
  | { kind: "rename"; id: string }
  | { kind: "duplicate"; id: string }
  | { kind: "save-preset" };

function EmploiDuTempsPage() {
  const [timetable, setTimetable] = useState(getTimetable);
  const [timetables, setTimetables] = useState(listTimetables);
  const [activeTimetableId, setActiveTimetableId] = useState(getActiveTimetableId);
  const [presets, setPresets] = useState(listPresets);
  const [namePrompt, setNamePrompt] = useState<NamePromptAction | null>(null);
  const [namePromptValue, setNamePromptValue] = useState("");
  const [periodWeeks, setPeriodWeeks] = useState<PeriodWeeks>(getPeriodWeeks);
  const [period, setPeriod] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [builderMode, setBuilderMode] = useState<BuilderMode>("construct");
  const [dragPayload, setDragPayload] = useState<DragPayload | null>(null);
  const [focusedDay, setFocusedDay] = useState<Weekday | null>(null);
  const [hoverWeekday, setHoverWeekday] = useState<Weekday | null>(null);
  const [editing, setEditing] = useState<{
    weekday: Weekday;
    index: number | null;
    draft?: TimetableSlot | null;
  } | null>(null);
  const [confirmPlacement, setConfirmPlacement] = useState<PendingPlacement | null>(null);
  const [confirmSeedReload, setConfirmSeedReload] = useState(false);
  const [applyDate, setApplyDate] = useState<Date>(() => upcomingMonday(new Date()));
  const [directManipulation, setDirectManipulation] = useState<DirectManipulation | null>(null);
  const [directPreview, setDirectPreview] = useState<TimetableSlot | null>(null);
  const daySurfaceRefs = useRef<Record<Weekday, HTMLDivElement | null>>({
    lundi: null,
    mardi: null,
    mercredi: null,
    jeudi: null,
    vendredi: null,
  });
  const toolbarButtonClass =
    "h-9 rounded-xl border-border/70 bg-background/95 px-3 shadow-sm hover:bg-secondary";
  const toolbarAccentButtonClass =
    "h-9 rounded-xl border-primary/15 bg-primary/5 px-3 text-primary shadow-sm hover:bg-primary/10";
  const dayButtonClass =
    "h-7 rounded-lg border-border/70 bg-background/90 px-2.5 text-[0.68rem] shadow-sm hover:bg-secondary";

  useEffect(() => {
    setTimetable(getTimetable());
  }, []);

  const updateDay = (weekday: Weekday, slots: TimetableSlot[]) => {
    const sorted = sortSlots(slots);
    saveTimetableDay(weekday, sorted);
    setTimetable((current) => ({ ...current, [weekday]: sorted }));
  };

  useEffect(() => {
    if (!directManipulation) return;
    const manipulation = directManipulation;

    function handlePointerMove(event: PointerEvent) {
      const surface = daySurfaceRefs.current[manipulation.weekday];
      if (!surface) return;
      const rect = surface.getBoundingClientRect();
      const localY = event.clientY - rect.top;

      if (manipulation.mode === "move") {
        const duration = slotMinutes(manipulation.original);
        const startY = localY - manipulation.pointerOffsetY;
        const startMinute = roundToStep(visualYToMinute(startY));
        const next = clampMovedSlot({
          ...manipulation.original,
          start: toTimeString(startMinute),
          end: toTimeString(startMinute + duration),
        });
        setDirectPreview(next);
        return;
      }

      const endMinute = roundToStep(visualYToMinute(localY));
      const next = clampResizedSlot({
        ...manipulation.original,
        end: toTimeString(endMinute),
      });
      setDirectPreview(next);
    }

    function handlePointerUp() {
      if (
        directPreview &&
        (directPreview.start !== manipulation.original.start ||
          directPreview.end !== manipulation.original.end)
      ) {
        requestSave(manipulation.weekday, manipulation.index, directPreview);
      }
      setDirectManipulation(null);
      setDirectPreview(null);
    }

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp, { once: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [directManipulation, directPreview]);

  const totals = useMemo(() => {
    const map = new Map<SubjectKey, number>();
    for (const weekday of SCHOOL_DAYS) {
      for (const slot of timetable[weekday]) {
        if (slot.fixed) continue;
        map.set(slot.subject, (map.get(slot.subject) ?? 0) + slotMinutes(slot));
      }
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [timetable]);

  const weeklyTeachingTotal = totals.reduce((acc, [, minutes]) => acc + minutes, 0);
  const weeks = periodWeeks[period];
  const yearWeeks = Object.values(periodWeeks).reduce((acc, count) => acc + count, 0);
  const flexibleSlotCount = SCHOOL_DAYS.reduce(
    (count, weekday) => count + timetable[weekday].filter((slot) => !slot.fixed).length,
    0,
  );
  const activeDays = SCHOOL_DAYS.filter((weekday) =>
    timetable[weekday].some((slot) => !slot.fixed),
  ).length;
  const officialTargetsReached = OFFICIAL_THRESHOLDS.filter((threshold) => {
    const actual = threshold.subjects.reduce(
      (sum, subject) => sum + (totals.find(([key]) => key === subject)?.[1] ?? 0),
      0,
    );
    return actual >= threshold.minutes * 0.9;
  }).length;
  const thresholdGaps = OFFICIAL_THRESHOLDS.map((threshold) => {
    const actual = threshold.subjects.reduce(
      (sum, subject) => sum + (totals.find(([key]) => key === subject)?.[1] ?? 0),
      0,
    );
    return {
      ...threshold,
      actual,
      gap: Math.max(0, threshold.minutes - actual),
    };
  });
  const repetitiveRuns = SCHOOL_DAYS.flatMap((weekday) => {
    const day = timetable[weekday].filter((slot) => !slot.fixed);
    const runs: Array<{
      weekday: Weekday;
      subject: SubjectKey;
      count: number;
      start: string;
      end: string;
    }> = [];
    let current: { subject: SubjectKey; count: number; start: string; end: string } | null = null;

    for (const slot of day) {
      if (current && current.subject === slot.subject) {
        const prev: { subject: SubjectKey; count: number; start: string; end: string } = current;
        current = { ...prev, count: prev.count + 1, end: slot.end };
        continue;
      }
      if (current && current.count >= 3) runs.push({ weekday, ...current });
      current = { subject: slot.subject, count: 1, start: slot.start, end: slot.end };
    }

    if (current && current.count >= 3) runs.push({ weekday, ...current });
    return runs;
  });
  const balancedDays = SCHOOL_DAYS.filter((weekday) => {
    const dayRuns = repetitiveRuns.filter((run) => run.weekday === weekday);
    return timetable[weekday].some((slot) => !slot.fixed) && dayRuns.length === 0;
  });
  const importDates = SCHOOL_DAYS.map((weekday) => {
    const weekdayIndex = WEEKDAYS.indexOf(weekday);
    const date = addDays(applyDate, weekdayIndex);
    return `${WEEKDAY_LABELS[weekday]} ${date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
    })}`;
  });
  const frenchTotal = totals.find(([subject]) => subject === "francais")?.[1] ?? 0;
  const mathsTotal = totals.find(([subject]) => subject === "maths")?.[1] ?? 0;
  const emploiAiActions = [
    {
      id: "volumes",
      label: "Vérifier les volumes",
      description: "Lire rapidement l'équilibre global de la semaine.",
      icon: Scale,
      build: () => ({
        title: "Lecture des volumes hebdomadaires",
        summary: `${officialTargetsReached}/${OFFICIAL_THRESHOLDS.length} repères officiels sont couverts ou presque sur la semaine type actuelle.`,
        highlights: [
          `Temps d'enseignement prévu : ${hoursLabel(weeklyTeachingTotal)} sur la semaine.`,
          `Français : ${hoursLabel(frenchTotal)} · Mathématiques : ${hoursLabel(mathsTotal)}.`,
          `Blocs modulables : ${flexibleSlotCount} sur ${activeDays} jours déjà structurés.`,
        ],
        alerts: thresholdGaps
          .filter((threshold) => threshold.gap > 0)
          .map(
            (threshold) =>
              `${threshold.label} : il manque encore ${hoursLabel(threshold.gap)} pour coller au repère hebdomadaire.`,
          ),
        nextSteps:
          thresholdGaps.filter((threshold) => threshold.gap > 0).length > 0
            ? [
                "Ajuster d'abord les petits créneaux courts plutôt que casser les gros blocs déjà cohérents.",
                "Si le français manque encore, les leviers les plus simples sont lecture, copie, littérature ou langage oral.",
                "Si QLM et EMC semblent justes, pense-les ensemble plutôt que séparément.",
              ]
            : [
                "La base est déjà bien calée : tu peux maintenant affiner le confort des journées sans retoucher fortement les volumes.",
              ],
      }),
    },
    {
      id: "rythme",
      label: "Lire le rythme",
      description: "Repérer les journées trop monotones ou trop chargées par domaine.",
      icon: Rows3,
      build: () => ({
        title: "Lecture du rythme de la semaine",
        summary:
          repetitiveRuns.length === 0
            ? "La semaine n'affiche pas d'enchaînement long de trois créneaux ou plus dans une même matière."
            : `${repetitiveRuns.length} enchaînement(s) long(s) ressort(ent) encore dans la semaine actuelle.`,
        highlights: [
          balancedDays.length > 0
            ? `Jours les plus fluides : ${balancedDays.map((day) => WEEKDAY_LABELS[day]).join(", ")}.`
            : "Chaque journée garde au moins un point à retravailler dans son enchaînement.",
          "Le guidage de l'app reste souple : un placement atypique peut être gardé s'il sert vraiment ta classe.",
        ],
        alerts: repetitiveRuns.map(
          (run) =>
            `${WEEKDAY_LABELS[run.weekday]} : ${run.count} créneaux de ${SUBJECTS[run.subject].label.toLowerCase()} à la suite entre ${run.start} et ${run.end}.`,
        ),
        nextSteps:
          repetitiveRuns.length > 0
            ? [
                "Couper les longues séries avec un petit bloc de français oral, copie ou lecture si tu veux aérer sans tout déplacer.",
                "Quand un enchaînement suit une méthode précise, garde l'ordre de la méthode mais joue plutôt sur ce qui vient avant ou après.",
              ]
            : [
                "Tu peux conserver cette structure et passer au travail fin dans le cahier journal.",
              ],
      }),
    },
    {
      id: "journal",
      label: "Préparer le journal",
      description: "Vérifier le passage de la semaine type vers le cahier journal.",
      icon: CalendarCheck2,
      build: () => ({
        title: "Projection dans le cahier journal",
        summary: `La semaine du ${applyDate.toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })} est prête à être injectée dans le cahier journal.`,
        highlights: [
          `Jours concernés : ${importDates.join(" · ")}.`,
          "Après import, tu peux ouvrir directement une journée pour rattacher les fiches de prep et les corrections.",
        ],
        nextSteps: [
          "Appliquer l'emploi du temps à la semaine choisie.",
          "Ouvrir le journal et commencer par le lundi pour vérifier les rattachements séance par séance.",
        ],
      }),
    },
  ];

  function refreshTimetableLists() {
    setTimetables(listTimetables());
    setPresets(listPresets());
  }

  function switchTimetable(id: string) {
    setActiveTimetable(id);
    setActiveTimetableId(id);
    setTimetable(getTimetable());
    toast.success("Emploi du temps sélectionné.");
  }

  function openNamePrompt(action: NamePromptAction, initialValue = "") {
    setNamePromptValue(initialValue);
    setNamePrompt(action);
  }

  function submitNamePrompt() {
    if (!namePrompt) return;
    const value = namePromptValue.trim();

    if (namePrompt.kind === "create") {
      const id = createTimetable(value || `Emploi du temps ${timetables.length + 1}`);
      refreshTimetableLists();
      switchTimetable(id);
      toast.success("Nouvel emploi du temps créé.");
    } else if (namePrompt.kind === "rename") {
      if (value) renameTimetable(namePrompt.id, value);
      refreshTimetableLists();
    } else if (namePrompt.kind === "duplicate") {
      const id = duplicateTimetable(namePrompt.id, value || undefined);
      refreshTimetableLists();
      if (id) switchTimetable(id);
      toast.success("Emploi du temps dupliqué.");
    } else if (namePrompt.kind === "save-preset") {
      saveCurrentAsPreset(value || `Modèle ${presets.length + 1}`);
      refreshTimetableLists();
      toast.success("Modèle enregistré.");
    }

    setNamePrompt(null);
    setNamePromptValue("");
  }

  function handleDeleteTimetable(id: string) {
    if (timetables.length <= 1) {
      toast.error("Impossible de supprimer le dernier emploi du temps.");
      return;
    }
    deleteTimetable(id);
    refreshTimetableLists();
    setActiveTimetableId(getActiveTimetableId());
    setTimetable(getTimetable());
    toast.success("Emploi du temps supprimé.");
  }

  function handleApplyPreset(id: string) {
    applyPreset(id);
    setTimetable(getTimetable());
    toast.success("Modèle appliqué à l'emploi du temps actif.");
  }

  function handleDeletePreset(id: string) {
    deletePreset(id);
    refreshTimetableLists();
  }

  function openNew(weekday: Weekday, draft?: TimetableSlot) {
    setEditing({ weekday, index: null, draft: draft ?? null });
  }

  function openEdit(weekday: Weekday, index: number) {
    setEditing({ weekday, index });
  }

  function handleApply() {
    void applyTimetableToWeek(applyDate);
    toast.success(
      `Emploi du temps appliqué à la semaine du ${applyDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
      })}.`,
    );
  }

  function openJournalDay(weekday: Weekday) {
    const weekdayIndex = WEEKDAYS.indexOf(weekday);
    const targetDate = addDays(applyDate, weekdayIndex);
    window.location.assign(`/journal?date=${encodeURIComponent(toISODate(targetDate))}`);
  }

  function handleLoadBalancedSeed() {
    const next = getSeedTimetable();
    replaceTimetable(next);
    setTimetable(next);
    setConfirmSeedReload(false);
    toast.success("L'emploi du temps CE1 validé a été chargé.", {
      description:
        "Il reprend la base retenue autour de Cléo, Mathématiques, Orthographémic et des autres domaines.",
    });
  }

  function commitSave(weekday: Weekday, index: number | null, slot: TimetableSlot) {
    const day = timetable[weekday];
    const next =
      index !== null
        ? day.map((current, currentIndex) => (currentIndex === index ? slot : current))
        : [...day, slot];
    updateDay(weekday, next);
    setEditing(null);
  }

  function requestSave(weekday: Weekday, index: number | null, slot: TimetableSlot) {
    const baseDay =
      index !== null
        ? timetable[weekday].filter((_, currentIndex) => currentIndex !== index)
        : timetable[weekday];
    const assessment = assessPlacement(baseDay, slot, resolveTemplate(slot));

    if (assessment.level === "block") {
      toast.error(assessment.title, { description: assessment.description });
      return;
    }

    if (assessment.level === "warn") {
      setConfirmPlacement({
        mode: "save",
        slot,
        targetWeekday: weekday,
        targetIndex: index,
        assessment,
      });
      return;
    }

    commitSave(weekday, index, slot);
  }

  function commitMove(
    source: { weekday: Weekday; index: number },
    targetWeekday: Weekday,
    slot: TimetableSlot,
  ) {
    const sourceDay = timetable[source.weekday].filter((_, index) => index !== source.index);
    const targetDay = [...timetable[targetWeekday], slot];
    updateDay(source.weekday, sourceDay);
    updateDay(targetWeekday, targetDay);
  }

  function commitSwap(
    source: { weekday: Weekday; index: number },
    target: { weekday: Weekday; index: number },
  ) {
    const sourceSlot = timetable[source.weekday][source.index];
    const targetSlot = timetable[target.weekday][target.index];
    if (!sourceSlot || !targetSlot || sourceSlot.fixed || targetSlot.fixed) return;

    const sourceReplacement: TimetableSlot = {
      ...sourceSlot,
      start: targetSlot.start,
      end: targetSlot.end,
    };
    const targetReplacement: TimetableSlot = {
      ...targetSlot,
      start: sourceSlot.start,
      end: sourceSlot.end,
    };

    if (source.weekday === target.weekday) {
      const nextDay = timetable[source.weekday].map((slot, index) => {
        if (index === source.index) return sourceReplacement;
        if (index === target.index) return targetReplacement;
        return slot;
      });
      updateDay(source.weekday, nextDay);
      return;
    }

    const sourceDay = timetable[source.weekday].map((slot, index) =>
      index === source.index ? sourceReplacement : slot,
    );
    const targetDay = timetable[target.weekday].map((slot, index) =>
      index === target.index ? targetReplacement : slot,
    );
    updateDay(source.weekday, sourceDay);
    updateDay(target.weekday, targetDay);
  }

  function requestMove(source: { weekday: Weekday; index: number }, targetWeekday: Weekday) {
    if (source.weekday === targetWeekday) {
      toast.message("Ce bloc est déjà sur cette journée.");
      return;
    }

    const slot = timetable[source.weekday][source.index];
    if (!slot) return;

    const assessment = assessPlacement(timetable[targetWeekday], slot, resolveTemplate(slot));

    if (assessment.level === "block") {
      toast.error(assessment.title, { description: assessment.description });
      return;
    }

    if (assessment.level === "warn") {
      setConfirmPlacement({
        mode: "move",
        slot,
        targetWeekday,
        targetIndex: null,
        source,
        assessment,
      });
      return;
    }

    commitMove(source, targetWeekday, slot);
  }

  function requestSwap(
    source: { weekday: Weekday; index: number },
    target: { weekday: Weekday; index: number },
  ) {
    if (source.weekday === target.weekday && source.index === target.index) {
      setDragPayload(null);
      return;
    }

    const sourceSlot = timetable[source.weekday][source.index];
    const targetSlot = timetable[target.weekday][target.index];
    if (!sourceSlot || !targetSlot || sourceSlot.fixed || targetSlot.fixed) return;

    commitSwap(source, target);
    toast.success("Blocs intervertis.");
  }

  function requestQuickAdjust(
    weekday: Weekday,
    index: number,
    adjust: (slot: TimetableSlot) => TimetableSlot,
  ) {
    const slot = timetable[weekday][index];
    if (!slot || slot.fixed) return;
    requestSave(weekday, index, adjust(slot));
  }

  function startDirectMove(
    weekday: Weekday,
    index: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    const slot = timetable[weekday][index];
    const surface = daySurfaceRefs.current[weekday];
    if (!slot || slot.fixed || !surface) return;
    const rect = surface.getBoundingClientRect();
    const offsetY = event.clientY - rect.top - minuteToVisualY(toMinutes(slot.start));
    setDirectManipulation({
      weekday,
      index,
      mode: "move",
      original: slot,
      pointerOffsetY: offsetY,
    });
    setDirectPreview(slot);
    event.preventDefault();
  }

  function startDirectResize(
    weekday: Weekday,
    index: number,
    event: React.PointerEvent<HTMLButtonElement>,
  ) {
    const slot = timetable[weekday][index];
    if (!slot || slot.fixed) return;
    setDirectManipulation({
      weekday,
      index,
      mode: "resize-end",
      original: slot,
      pointerOffsetY: 0,
    });
    setDirectPreview(slot);
    event.preventDefault();
    event.stopPropagation();
  }

  function applyPendingPlacement() {
    if (!confirmPlacement) return;

    if (confirmPlacement.mode === "save") {
      commitSave(
        confirmPlacement.targetWeekday,
        confirmPlacement.targetIndex,
        confirmPlacement.slot,
      );
    } else if (confirmPlacement.source) {
      commitMove(confirmPlacement.source, confirmPlacement.targetWeekday, confirmPlacement.slot);
    }

    setConfirmPlacement(null);
  }

  function handleDayDrop(weekday: Weekday) {
    if (!dragPayload) return;

    if (dragPayload.kind === "template") {
      const template = getTemplate(dragPayload.templateId);
      if (!template) return;
      const suggestion = suggestTemplatePlacement(timetable[weekday], template);
      openNew(weekday, suggestion.slot);
      if (suggestion.assessment.level === "warn") {
        toast.message(suggestion.assessment.title, {
          description: suggestion.assessment.description,
        });
      }
    } else {
      requestMove({ weekday: dragPayload.weekday, index: dragPayload.index }, weekday);
    }

    setDragPayload(null);
    setHoverWeekday(null);
  }

  return (
    <AppShell>
      <div className="print-sheet mx-auto max-w-[95rem] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-4 hidden items-end justify-between border-b border-border pb-3 print:flex">
          <div>
            <p className="eyebrow">Ardoise</p>
            <h1 className="mt-1 text-2xl font-bold">Emploi du temps CE1</h1>
          </div>
          <div className="text-right">
            <p className="font-semibold">{hoursLabel(weeklyTeachingTotal)} d'enseignement</p>
            <p className="text-sm text-muted-foreground">Version imprimable</p>
          </div>
        </div>

        <header className="grid gap-2">
          <div className="min-w-0">
            <p className="eyebrow">Emploi du temps</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Semaine type CE1</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Une vue simple pour ajuster la semaine, appliquer le bon modèle et vérifier
              rapidement l’équilibre global.
            </p>
          </div>
        </header>

        <section className="card-surface mt-4 space-y-3 p-4 shadow-card print:hidden">
          <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <div className="min-w-0">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Emploi actif
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Select value={activeTimetableId} onValueChange={switchTimetable}>
                    <SelectTrigger className="h-9 w-[16rem] rounded-xl border-border/70 bg-background/95 shadow-sm">
                      <SelectValue placeholder="Emploi du temps" />
                    </SelectTrigger>
                    <SelectContent>
                      {timetables.map((entry) => (
                        <SelectItem key={entry.id} value={entry.id}>
                          {entry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className={toolbarButtonClass}>
                        <MoreVertical className="mr-1.5 h-4 w-4" />
                        Gérer
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64">
                      <DropdownMenuItem onSelect={() => openNamePrompt({ kind: "create" })}>
                        <Plus className="mr-2 h-4 w-4" /> Nouvel emploi du temps
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() =>
                          openNamePrompt(
                            { kind: "rename", id: activeTimetableId },
                            timetables.find((entry) => entry.id === activeTimetableId)?.name ?? "",
                          )
                        }
                      >
                        <Pencil className="mr-2 h-4 w-4" /> Renommer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onSelect={() => openNamePrompt({ kind: "duplicate", id: activeTimetableId })}
                      >
                        <Copy className="mr-2 h-4 w-4" /> Dupliquer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={() => handleDeleteTimetable(activeTimetableId)}
                        disabled={timetables.length <= 1}
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => openNamePrompt({ kind: "save-preset" })}>
                        <FolderOpen className="mr-2 h-4 w-4" /> Enregistrer comme modèle
                      </DropdownMenuItem>
                      {presets.length > 0 ? <DropdownMenuSeparator /> : null}
                      {presets.map((preset) => (
                        <DropdownMenuItem
                          key={preset.id}
                          onSelect={() => handleApplyPreset(preset.id)}
                          className="justify-between gap-2"
                        >
                          <span className="truncate">{preset.name}</span>
                          <button
                            type="button"
                            className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-destructive"
                            onClick={(event) => {
                              event.stopPropagation();
                              handleDeletePreset(preset.id);
                            }}
                            aria-label={`Supprimer le modèle ${preset.name}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 xl:justify-end">
              <Button
                variant="outline"
                size="sm"
                className={toolbarButtonClass}
                onClick={() => window.print()}
              >
                <Printer className="mr-1.5 h-4 w-4" />
                Imprimer / PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={toolbarButtonClass}
                onClick={() => openJournalDay("lundi")}
              >
                Ouvrir le journal
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={toolbarAccentButtonClass}
                onClick={() => setConfirmSeedReload(true)}
              >
                <Sparkles className="mr-1.5 h-4 w-4" />
                EDT validé
              </Button>
              <PedagogicalAiDialog
                title={ardoiseAiTitle("Emploi du temps")}
                description={`${ARDOISE_AI_NAME} t'aide à arbitrer la semaine type à partir des contraintes déjà posées.`}
                triggerLabel="Aide IA"
                className={toolbarButtonClass}
                modes={["timetable"]}
                initialMode="timetable"
                buildRequest={() => ({
                  title: "Organisation hebdomadaire CE1",
                  subject: "Emploi du temps de classe",
                  contextSections: [
                    {
                      label: "Volumes globaux",
                      items: [
                        `Temps d'enseignement total : ${hoursLabel(weeklyTeachingTotal)}`,
                        `Français : ${hoursLabel(frenchTotal)}`,
                        `Mathématiques : ${hoursLabel(mathsTotal)}`,
                        `${officialTargetsReached}/${OFFICIAL_THRESHOLDS.length} repères officiels couverts ou presque`,
                      ],
                    },
                    {
                      label: "Écarts aux repères",
                      items: thresholdGaps.map(
                        (threshold) =>
                          `${threshold.label} : ${hoursLabel(threshold.actual)} prévus, repère ${hoursLabel(
                            threshold.minutes,
                          )}, écart ${hoursLabel(threshold.gap)}`,
                      ),
                    },
                    {
                      label: "Rythme des journées",
                      items: SCHOOL_DAYS.map((weekday) => {
                        const slots = timetable[weekday].filter((slot) => !slot.fixed);
                        const total = slots.reduce((sum, slot) => sum + slotMinutes(slot), 0);
                        return `${WEEKDAY_LABELS[weekday]} : ${hoursLabel(total)} · ${slots
                          .map((slot) => `${slot.start} ${slot.title}`)
                          .join(" | ")}`;
                      }),
                    },
                    {
                      label: "Enchaînements à surveiller",
                      items:
                        repetitiveRuns.length > 0
                          ? repetitiveRuns.map(
                              (run) =>
                                `${WEEKDAY_LABELS[run.weekday]} : ${run.count} créneaux de ${SUBJECTS[
                                  run.subject
                                ].label.toLowerCase()} à la suite entre ${run.start} et ${run.end}`,
                            )
                          : [
                              "Aucun enchaînement long de trois créneaux ou plus dans une même matière.",
                            ],
                    },
                  ],
                })}
              />
            </div>
          </div>

          <div className="grid gap-3 border-t border-border/70 pt-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div className="flex flex-wrap items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <CalendarDays className="mr-1.5 h-4 w-4" />
                    Semaine du{" "}
                    {applyDate.toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={applyDate}
                    onSelect={(date) => date && setApplyDate(upcomingMonday(date))}
                  />
                </PopoverContent>
              </Popover>
              <Button size="sm" onClick={handleApply}>
                Appliquer au journal
              </Button>

              <ToggleGroup
                type="single"
                value={builderMode}
                onValueChange={(value) => {
                  if (value === "construct" || value === "move") setBuilderMode(value);
                }}
                className="rounded-xl border border-border bg-card p-1 shadow-card"
              >
                <ToggleGroupItem
                  value="construct"
                  aria-label="Mode construction"
                  className="rounded-lg px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  Créer
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="move"
                  aria-label="Mode déplacement"
                  className="rounded-lg px-3 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  <Hand className="mr-1.5 h-4 w-4" />
                  Déplacer
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 xl:justify-end">
              <StatChip label="Enseignement" value={hoursLabel(weeklyTeachingTotal)} />
              <StatChip label="Blocs" value={`${flexibleSlotCount}`} />
              <StatChip label="Jours" value={`${activeDays}/${SCHOOL_DAYS.length}`} />
              <StatChip
                label="Repères"
                value={`${officialTargetsReached}/${OFFICIAL_THRESHOLDS.length}`}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Légende
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80 space-y-2.5">
                  <LegendCard
                    level="ok"
                    title="Placement cohérent"
                    description="Le bloc rentre dans la journée et respecte le rythme conseillé."
                  />
                  <LegendCard
                    level="warn"
                    title="Placement atypique"
                    description="Le bloc reste possible, mais une confirmation est demandée."
                  />
                  <LegendCard
                    level="block"
                    title="Placement impossible"
                    description="Chevauchement ou sortie du temps scolaire : il faut ajuster l'horaire."
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>

        <section className="mt-3">
          {focusedDay ? (
            <div className="mb-3 flex flex-wrap items-center gap-1.5 print:hidden">
              {SCHOOL_DAYS.map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => setFocusedDay(day)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    day === focusedDay
                      ? "border-transparent bg-primary text-primary-foreground shadow-card"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {WEEKDAY_LABELS[day]}
                </button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-full px-3 text-xs"
                onClick={() => setFocusedDay(null)}
              >
                <Minimize2 className="mr-1 h-3.5 w-3.5" />
                Voir la semaine
              </Button>
            </div>
          ) : null}
          <div className={cn("grid gap-3", focusedDay ? "" : "lg:grid-cols-4")}>
            {(focusedDay ? [focusedDay] : SCHOOL_DAYS).map((weekday) => {
              const slots = timetable[weekday];
              const renderedSlots =
                directManipulation?.weekday === weekday && directPreview
                  ? slots.map((slot, index) =>
                      index === directManipulation.index ? directPreview : slot,
                    )
                  : slots;
              const dayMinutes = renderedSlots
                .filter((slot) => !slot.fixed)
                .reduce((total, slot) => total + slotMinutes(slot), 0);
              const preview =
                hoverWeekday === weekday ? dropPreview(timetable, weekday, dragPayload) : null;
              const teachingSlots = renderedSlots.filter((slot) => !slot.fixed);
              const visibleSlots = renderedSlots.filter((slot) => !isMiddayBreak(slot));
              const showTimeLabels = Boolean(focusedDay) || weekday === SCHOOL_DAYS[0];


              return (
                <div
                  key={weekday}
                  onDragOver={(event) => {
                    if (!dragPayload) return;
                    event.preventDefault();
                    setHoverWeekday(weekday);
                    event.dataTransfer.dropEffect = dragPayload.kind === "slot" ? "move" : "copy";
                  }}
                  onDragLeave={() => {
                    if (hoverWeekday === weekday) setHoverWeekday(null);
                  }}
                  onDrop={(event) => {
                    event.preventDefault();
                    handleDayDrop(weekday);
                  }}
                  className={cn(
                    "card-surface flex min-w-0 flex-col overflow-hidden transition-all duration-200 animate-fade-in",
                    preview && "ring-1",
                    preview?.level === "ok" && "border-status-a-solid/40 ring-status-a-solid/30",
                    preview?.level === "warn" &&
                      "border-status-pa-solid/40 ring-status-pa-solid/30",
                    preview?.level === "block" &&
                      "border-danger-soft-border ring-danger-soft-border",
                  )}
                >
                  <div className="border-b border-border bg-[linear-gradient(180deg,oklch(0.965_0.011_84.6_/_0.88),transparent)] px-3 py-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h2 className="text-sm font-semibold">{WEEKDAY_LABELS[weekday]}</h2>
                        <p className="mt-0.5 text-[0.68rem] text-muted-foreground">
                          {addDays(applyDate, WEEKDAYS.indexOf(weekday)).toLocaleDateString(
                            "fr-FR",
                            {
                              day: "numeric",
                              month: "short",
                            },
                          )}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                        {renderedSlots.length > 0 ? hoursLabel(dayMinutes) : ""}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-[0.68rem] text-muted-foreground">
                        {teachingSlots.length > 0
                          ? `${teachingSlots.length} bloc${teachingSlots.length > 1 ? "s" : ""} pédagogique${teachingSlots.length > 1 ? "s" : ""}`
                          : "Journée à compléter"}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-lg border border-border/70 bg-background/90 text-muted-foreground shadow-sm hover:bg-secondary print:hidden"
                          aria-label={
                            focusedDay === weekday
                              ? "Revenir à la semaine"
                              : `Agrandir ${WEEKDAY_LABELS[weekday]}`
                          }
                          title={
                            focusedDay === weekday
                              ? "Revenir à la semaine"
                              : `Agrandir ${WEEKDAY_LABELS[weekday]}`
                          }
                          onClick={(event) => {
                            event.stopPropagation();
                            setFocusedDay(focusedDay === weekday ? null : weekday);
                          }}
                        >
                          {focusedDay === weekday ? (
                            <Minimize2 className="h-3.5 w-3.5" />
                          ) : (
                            <Maximize2 className="h-3.5 w-3.5" />
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className={cn(dayButtonClass, "print:hidden")}
                          onClick={(event) => {
                            event.stopPropagation();
                            openJournalDay(weekday);
                          }}
                        >
                          Journal
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className={cn(dayButtonClass, "border-dashed print:hidden")}
                          onClick={() => openNew(weekday)}
                        >
                          <Plus className="mr-1 h-3.5 w-3.5" />
                          Bloc
                        </Button>
                      </div>
                    </div>
                  </div>

                  {preview ? (
                    <div
                      className={cn(
                        "mx-2 mt-2 rounded-xl border px-3 py-2",
                        assessmentClasses(preview.level),
                      )}
                    >
                      <p className="text-xs font-semibold">{preview.title}</p>
                      <p className="mt-0.5 text-[0.72rem] leading-relaxed opacity-90">
                        {preview.description}
                      </p>
                    </div>
                  ) : null}

                  <div className="p-2">
                    <div
                      ref={(node) => {
                        daySurfaceRefs.current[weekday] = node;
                      }}
                      className="relative overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,oklch(1_0_0_/_0.96),oklch(0.985_0.006_84_/_0.96))]"
                      style={{ height: `${DAY_CANVAS_HEIGHT}px` }}
                    >
                      {TIME_MARKS.map((minute) => {
                        const top = minuteToVisualY(minute);
                        return (
                          <div key={`${weekday}-${minute}`}>
                            <div
                              className="absolute left-0 right-0 border-t border-border/60"
                              style={{ top: `${top}px` }}
                            />
                            {showTimeLabels ? (
                              <span
                                className="absolute left-2 -translate-y-1/2 font-mono text-[0.62rem] text-muted-foreground"
                                style={{ top: `${top}px` }}
                              >
                                {toTimeString(minute)}
                              </span>
                            ) : null}
                          </div>
                        );
                      })}

                      <div
                        className="absolute left-0 right-0 border-y border-dashed border-border/70 bg-surface/55"
                        style={{
                          top: `${MORNING_VISUAL_HEIGHT}px`,
                          height: `${MIDDAY_COMPRESSED_HEIGHT}px`,
                        }}
                      >
                        <div className="flex h-full items-center justify-center">
                          <span className="rounded-full bg-card/90 px-2 py-0.5 text-[0.62rem] font-medium text-muted-foreground shadow-card">
                            Pause méridienne
                          </span>
                        </div>
                      </div>

                      {renderedSlots.length === 0 ? (
                        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                          <p className="text-[0.72rem] text-muted-foreground">
                            Ajoute un bloc pour commencer la journée.
                          </p>
                        </div>
                      ) : null}

                      {visibleSlots.map((slot, index) => {
                          const top = minuteToVisualY(toMinutes(slot.start));
                          const nextSlot = visibleSlots[index + 1];
                          const height = visualSlotHeight(slot, nextSlot);
                          return (
                            <div
                              key={`${weekday}-${index}-${slot.start}-${slot.title}`}
                              className="absolute left-10 right-1.5"
                              style={{ top: `${top}px`, height: `${height}px` }}
                              onDragOver={(event) => {
                                if (!dragPayload || dragPayload.kind !== "slot") return;
                                if (
                                  dragPayload.weekday === weekday &&
                                  dragPayload.index === index
                                ) {
                                  return;
                                }
                                event.preventDefault();
                                event.stopPropagation();
                                event.dataTransfer.dropEffect = "move";
                              }}
                              onDrop={(event) => {
                                if (!dragPayload || dragPayload.kind !== "slot") return;
                                event.preventDefault();
                                event.stopPropagation();
                                requestSwap(
                                  {
                                    weekday: dragPayload.weekday,
                                    index: dragPayload.index,
                                  },
                                  { weekday, index },
                                );
                                setDragPayload(null);
                                setHoverWeekday(null);
                              }}
                            >
                              <SlotCard
                                slot={slot}
                                moveMode={builderMode === "move"}
                                directManipulationEnabled={
                                  builderMode === "construct" && !slot.fixed
                                }
                                compact={height < 44}
                                onClick={() => openEdit(weekday, index)}
                                onPointerMoveStart={(event) =>
                                  startDirectMove(weekday, index, event)
                                }
                                onPointerResizeStart={(event) =>
                                  startDirectResize(weekday, index, event)
                                }
                                onDragStart={(event) => {
                                  const payload: DragPayload = { kind: "slot", weekday, index };
                                  setDragPayload(payload);
                                  event.dataTransfer.effectAllowed = "move";
                                  event.dataTransfer.setData("text/plain", `${weekday}-${index}`);
                                }}
                                onDragEnd={() => {
                                  setDragPayload(null);
                                  setHoverWeekday(null);
                                }}
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card-surface mt-4 p-5 shadow-card">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
            <h2 className="min-w-0 truncate text-lg font-semibold">
              Répartition horaire hebdomadaire
            </h2>
            <p className="shrink-0 font-mono text-xs text-muted-foreground">
              repères officiels CE1
            </p>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
            {OFFICIAL_THRESHOLDS.map((threshold) => {
              const actual = threshold.subjects.reduce(
                (sum, subject) => sum + (totals.find(([key]) => key === subject)?.[1] ?? 0),
                0,
              );
              const ok = actual >= threshold.minutes * 0.9;
              const pct = Math.min(100, Math.round((actual / threshold.minutes) * 100));
              const dotSubject = threshold.subjects[0]!;

              return (
                <div key={threshold.label} className="rounded-xl border border-border bg-card p-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("h-2.5 w-2.5 shrink-0 rounded-full", SUBJECT_DOT[dotSubject])}
                    />
                    <p className="min-w-0 flex-1 truncate text-sm font-medium">{threshold.label}</p>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                        ok
                          ? "bg-status-a text-status-a-foreground"
                          : "bg-status-pa text-status-pa-foreground",
                      )}
                    >
                      {ok ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <TriangleAlert className="h-3 w-3" />
                      )}
                      {ok ? "Atteint" : "À compléter"}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-baseline justify-between gap-2">
                    <p className="font-display text-2xl font-bold tabular-nums">
                      {hoursLabel(actual)}
                    </p>
                    <p className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                      repère {hoursLabel(threshold.minutes)}
                    </p>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                    <span
                      className={cn(
                        "block h-full transition-all duration-300",
                        SUBJECT_DOT[dotSubject],
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="card-surface mt-4 p-5 shadow-card">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Sur la période et sur l'année</p>
              <h2 className="mt-1 text-lg font-semibold">Volume cumulé</h2>
            </div>
            <div className="flex flex-wrap items-end gap-4 print:hidden">
              <div>
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">Période</p>
                <div className="flex gap-1.5">
                  {([1, 2, 3, 4, 5] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setPeriod(value)}
                      className={cn(
                        "w-10 rounded-full border border-border py-1.5 text-xs font-semibold transition-colors duration-150 hover:bg-secondary",
                        value === period &&
                          "border-transparent bg-primary text-primary-foreground hover:bg-primary",
                      )}
                    >
                      P{value}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-36">
                <p className="mb-1.5 text-xs font-medium text-muted-foreground">
                  Semaines en P{period}
                </p>
                <Input
                  type="number"
                  min={1}
                  max={12}
                  value={weeks}
                  onChange={(event) => {
                    const value = parseInt(event.target.value, 10);
                    if (!value || value < 1) return;
                    const next = { ...periodWeeks, [period]: value };
                    setPeriodWeeks(next);
                    savePeriodWeeks(next);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2 font-semibold">Matière</th>
                  <th className="py-2 text-right font-semibold">Semaine</th>
                  <th className="py-2 text-right font-semibold">Période P{period}</th>
                  <th className="py-2 text-right font-semibold">Année ({yearWeeks} sem.)</th>
                </tr>
              </thead>
              <tbody>
                {totals.map(([subject, minutes]) => (
                  <tr key={subject} className="border-t border-border">
                    <td className="py-2">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn("h-2 w-2 shrink-0 rounded-full", SUBJECT_DOT[subject])}
                        />
                        <span className="truncate">{SUBJECTS[subject].label}</span>
                      </span>
                    </td>
                    <td className="py-2 text-right font-mono tabular-nums">
                      {hoursLabel(minutes)}
                    </td>
                    <td className="py-2 text-right font-mono tabular-nums">
                      {hoursLabel(minutes * weeks)}
                    </td>
                    <td className="py-2 text-right font-mono tabular-nums text-muted-foreground">
                      {hoursLabel(minutes * yearWeeks)}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-border font-semibold">
                  <td className="py-2">Total</td>
                  <td className="py-2 text-right font-mono tabular-nums">
                    {hoursLabel(weeklyTeachingTotal)}
                  </td>
                  <td className="py-2 text-right font-mono tabular-nums">
                    {hoursLabel(weeklyTeachingTotal * weeks)}
                  </td>
                  <td className="py-2 text-right font-mono tabular-nums text-muted-foreground">
                    {hoursLabel(weeklyTeachingTotal * yearWeeks)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {weeks} semaine{weeks > 1 ? "s" : ""} sur la période P{period}.
          </p>
        </section>
      </div>

      {editing && (
        <TimetableSlotDialog
          slot={
            editing.index !== null
              ? timetable[editing.weekday][editing.index]!
              : (editing.draft ?? null)
          }
          onClose={() => setEditing(null)}
          onSave={(slot) => requestSave(editing.weekday, editing.index, slot)}
          onDelete={
            editing.index !== null
              ? () => {
                  updateDay(
                    editing.weekday,
                    timetable[editing.weekday].filter((_, index) => index !== editing.index),
                  );
                  setEditing(null);
                }
              : undefined
          }
        />
      )}

      {confirmPlacement && (
        <AlertDialog open onOpenChange={(open) => !open && setConfirmPlacement(null)}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmPlacement.assessment.title}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmPlacement.assessment.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="rounded-xl border border-border bg-surface px-3 py-2.5 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{confirmPlacement.slot.title}</p>
              <p className="mt-1">
                {WEEKDAY_LABELS[confirmPlacement.targetWeekday]} · {confirmPlacement.slot.start}–
                {confirmPlacement.slot.end}
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Revenir</AlertDialogCancel>
              <AlertDialogAction onClick={applyPendingPlacement}>
                Confirmer quand même
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {namePrompt && (
        <Dialog open onOpenChange={(open) => !open && setNamePrompt(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>
                {namePrompt.kind === "create" && "Nouvel emploi du temps"}
                {namePrompt.kind === "rename" && "Renommer l'emploi du temps"}
                {namePrompt.kind === "duplicate" && "Dupliquer l'emploi du temps"}
                {namePrompt.kind === "save-preset" && "Enregistrer comme modèle"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-1.5">
              <Label htmlFor="tt-name-prompt" className="text-xs text-muted-foreground">
                Nom
              </Label>
              <Input
                id="tt-name-prompt"
                autoFocus
                value={namePromptValue}
                onChange={(event) => setNamePromptValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") submitNamePrompt();
                }}
                placeholder="Ex. Emploi du temps P3"
              />
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setNamePrompt(null)}>
                Annuler
              </Button>
              <Button onClick={submitNamePrompt}>Valider</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {confirmSeedReload && (
        <AlertDialog open onOpenChange={setConfirmSeedReload}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle>Charger l'emploi du temps CE1 validé ?</AlertDialogTitle>
              <AlertDialogDescription>
                Cette action remplace l'emploi du temps actif par la version validée pour la classe.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Garder mon EDT actuel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLoadBalancedSeed}>
                Charger cette version
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </AppShell>
  );
}

function LegendCard({
  level,
  title,
  description,
}: {
  level: AssessmentLevel;
  title: string;
  description: string;
}) {
  return (
    <div className={cn("rounded-2xl border px-3 py-3 shadow-card", assessmentClasses(level))}>
      <p className="text-sm font-semibold">{title}</p>
      <p className={cn("mt-1 text-xs leading-relaxed opacity-90", helperTone(level))}>
        {description}
      </p>
    </div>
  );
}

function compactSlotLabel(slot: TimetableSlot): string {
  const subjectLabel = SUBJECTS[slot.subject].label;
  const normalizedTitle = normalizeSlotTitle(slot.title);

  if (slot.subject === "maths") {
    if (normalizedTitle.includes("flash maths")) return "Flash maths";
    if (normalizedTitle.includes("calcul mental")) return "Calcul mental";
    if (normalizedTitle.includes("problemes")) return "Résolution de problèmes";
    return "Mathématiques";
  }

  if (slot.subject === "francais") {
    if (normalizedTitle.startsWith("cleo")) return "Cléo";
    if (normalizedTitle.includes("langage oral")) return "Langage oral";
    if (normalizedTitle.includes("orthographemic")) return "Orthographémic";
    if (normalizedTitle.includes("dictee bilan")) return "Dictée bilan";
    if (normalizedTitle.includes("lecture offerte") || normalizedTitle.includes("poesie")) {
      return "Poésie / lecture";
    }
    if (normalizedTitle.includes("litterature") || normalizedTitle.includes("album")) {
      return "Littérature";
    }
    if (
      normalizedTitle.includes("production d'ecrit") ||
      normalizedTitle.includes("production d ecrit")
    ) {
      return "Production d'écrit";
    }
    if (normalizedTitle.includes("calligraphie")) return "Calligraphie";
    if (normalizedTitle.includes("copie")) return "Copie";
    if (normalizedTitle.includes("lecture")) return "Lecture";
    return "Français";
  }

  return slot.title.trim() && slot.title !== subjectLabel ? slot.title : subjectLabel;
}

function SlotCard({
  slot,
  moveMode,
  directManipulationEnabled,
  compact,
  onClick,
  onPointerMoveStart,
  onPointerResizeStart,
  onDragStart,
  onDragEnd,
}: {
  slot: TimetableSlot;
  moveMode: boolean;
  directManipulationEnabled: boolean;
  compact: boolean;
  onClick: () => void;
  onPointerMoveStart: React.PointerEventHandler<HTMLButtonElement>;
  onPointerResizeStart: React.PointerEventHandler<HTMLButtonElement>;
  onDragStart: React.DragEventHandler<HTMLButtonElement>;
  onDragEnd: React.DragEventHandler<HTMLButtonElement>;
}) {
  const moveHandleLabel = compactSlotLabel(slot);
  const secondaryLine =
    slot.note?.trim() ||
    (slot.title.trim() && slot.title !== moveHandleLabel ? slot.title : "");
  const time = (
    <span className="font-mono text-[0.68rem] opacity-80">
      {slot.start}–{slot.end}
    </span>
  );

  if (slot.fixed) {
    const compactMidday = isMiddayBreak(slot);
    if (compactMidday) return null;

    return (
      <div
        className={cn(
          "flex h-full items-center gap-2 rounded-lg border border-dashed border-border bg-surface/70 text-muted-foreground shadow-sm",
          compact ? "px-2 py-1" : "px-2.5 py-1.5",
        )}
      >
        <Clock className="h-3 w-3 shrink-0 opacity-60" />
        <span className="min-w-0 flex-1 truncate text-xs">{slot.title}</span>
        <span className="font-mono text-[0.68rem] opacity-80">
          {slot.start}–{slot.end}
        </span>
      </div>
    );
  }

  const progLabel = programmingLabel(slot.programmingItemId);

  return (
    <div
      className={cn(
        "flex h-full overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-black/5 transition-shadow duration-150 hover:shadow-md",
        SUBJECT_BAND[slot.subject],
      )}
    >
      <span className={cn("w-1 shrink-0", SUBJECT_STRIP[slot.subject])} />
      <div className="flex min-w-0 flex-1 flex-col">
        <button
          type="button"
          draggable={moveMode}
          onDragStart={moveMode ? onDragStart : undefined}
          onDragEnd={moveMode ? onDragEnd : undefined}
          onPointerDown={directManipulationEnabled ? onPointerMoveStart : undefined}
          onClick={onClick}
          className={cn(
            "flex min-w-0 flex-1 flex-col items-start gap-0.5 px-2.5 py-1.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            (moveMode || directManipulationEnabled) && "cursor-grab active:cursor-grabbing",
          )}
        >
          <span className="flex w-full items-center justify-between gap-2">
            <span className="flex min-w-0 items-center gap-1">
              {moveMode || directManipulationEnabled ? (
                <GripVertical className="h-3 w-3 shrink-0 opacity-60" />
              ) : null}
              <span
                className={cn(
                  "truncate font-semibold leading-tight",
                  compact ? "text-xs" : "text-sm",
                )}
              >
                {moveHandleLabel}
              </span>
            </span>
            <span className="shrink-0 rounded-full bg-white/50 px-1.5 py-0.5 font-mono text-[0.62rem] opacity-80">
              {slot.start}–{slot.end}
            </span>
          </span>
          {!compact && secondaryLine ? (
            <span className="truncate text-[0.68rem] opacity-80">{secondaryLine}</span>
          ) : null}
          {!compact && progLabel ? (
            <span className="flex min-w-0 items-center gap-1 text-[0.65rem] opacity-90">
              <BookOpen className="h-3 w-3 shrink-0" />
              <span className="truncate">{progLabel}</span>
            </span>
          ) : null}
        </button>
        {directManipulationEnabled ? (
          <button
            type="button"
            onPointerDown={onPointerResizeStart}
            aria-label="Redimensionner"
            className="flex h-3 items-center justify-center opacity-0 transition-opacity hover:opacity-100"
          >
            <span className="h-1 w-10 rounded-full bg-current/40" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
