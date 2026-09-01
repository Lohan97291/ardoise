import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarCheck2,
  CalendarDays,
  CheckSquare2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  Link2,
  MoreHorizontal,
  Plus,
  Printer,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AiActionStrip } from "@/components/ardoise/ai-action-strip";
import { AppShell } from "@/components/ardoise/app-shell";
import { JournalPlumeDialog } from "@/components/ardoise/journal-plume-dialog";
import { SessionCard } from "@/components/ardoise/session-card";
import { SessionModal } from "@/components/ardoise/session-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { addDays, formatLongDate, toISODate, type Session } from "@/lib/ardoise-data";
import { ARDOISE_AI_NAME } from "@/lib/ardoise-ai-brand";
import { saveCustomPhases } from "@/lib/custom-phases-storage";
import { saveCustomSessionPrep } from "@/lib/custom-session-prep-storage";
import {
  saveGeneratedSequence,
  saveGeneratedStandaloneSession,
} from "@/lib/generated-resources-storage";
import { readJournalDays, writeJournalDays } from "@/lib/journal-storage";
import { resolveCurrentClassroomKey } from "@/lib/ardoise-eval";
import {
  removeExtraPreparedForSessions,
  resetSessionStatusesForSessions,
} from "@/lib/dashboard-storage";
import { resetPhaseStatusesForSessions } from "@/lib/session-phases-storage";
import type {
  PlumeJournalDayPlan,
  PlumeSequencePlan,
  PlumeSessionPlan,
} from "@/lib/plume-journal-types";
import { getSessionResultTarget } from "@/lib/session-result-links";
import { getZoneCSchoolRhythm } from "@/lib/school-rhythm";
import { cn } from "@/lib/utils";
import { getTimetable, WEEKDAYS, type Weekday } from "@/lib/timetable-storage";
import { toast } from "sonner";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Cahier journal — Ardoise" },
      {
        name: "description",
        content:
          "Le cahier journal d'Ardoise : vue jour claire, cartes de séances lisibles et fiches de prep rattachées en deux clics.",
      },
      { property: "og:title", content: "Cahier journal — Ardoise" },
      {
        property: "og:description",
        content: "Vue jour, séances colorées par matière et rattachement de ressources simplifié.",
      },
    ],
  }),
  component: JournalPage,
});

const today = new Date();

/* ─────────────── Week navigation ─────────────── */

const DAY_LABELS = ["Lu", "Ma", "Me", "Je", "Ve"] as const;
const BOULARD_RESET_FROM_KEY = "2026-09-03";
const BOULARD_RESET_MARKER_KEY = "ardoise.journal.boulard.reset-from-2026-09-03.v1";

type JournalViewMode = "day" | "week";

type JournalDisplayOptions = {
  times: boolean;
  subjects: boolean;
  notes: boolean;
  prep: boolean;
  pauses: boolean;
};

const DEFAULT_DISPLAY_OPTIONS: JournalDisplayOptions = {
  times: true,
  subjects: true,
  notes: true,
  prep: true,
  pauses: true,
};

function getWeekDays(date: Date): Date[] {
  const dow = date.getDay(); // 0 = dimanche
  const offset = dow === 0 ? -6 : 1 - dow; // ramener au lundi
  const monday = new Date(date);
  monday.setDate(date.getDate() + offset);
  return Array.from({ length: 5 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

/* ─────────────── Persistence ─────────────── */

function parseRequestedDate(): Date | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("date");
  if (!raw) return null;
  const parsed = new Date(`${raw}T12:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getInitialDays(): Record<string, Session[]> {
  let days = readJournalDays();
  const isBoulard = resolveCurrentClassroomKey() === "boulard";

  if (!isBoulard || typeof window === "undefined") return days;
  if (window.localStorage.getItem(BOULARD_RESET_MARKER_KEY)) return days;

  const entriesToReset = Object.entries(days).filter(([dateKey]) => dateKey >= BOULARD_RESET_FROM_KEY);
  if (entriesToReset.length === 0) {
    window.localStorage.setItem(BOULARD_RESET_MARKER_KEY, "done");
    return days;
  }

  const sessionIds = entriesToReset.flatMap(([, sessions]) => sessions.map((session) => session.id));
  resetPhaseStatusesForSessions(sessionIds);
  resetSessionStatusesForSessions(sessionIds);
  removeExtraPreparedForSessions(sessionIds);

  const next = Object.fromEntries(
    Object.entries(days).filter(([dateKey]) => dateKey < BOULARD_RESET_FROM_KEY),
  );
  window.localStorage.setItem(BOULARD_RESET_MARKER_KEY, "done");
  return writeJournalDays(next);
}

function toMinutes(value: string): number {
  const [hours = "0", minutes = "0"] = value.split(":");
  return Number(hours) * 60 + Number(minutes);
}

function toTimeLabel(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function durationMinutes(label: string): number {
  const match = label.match(/(\d+)/);
  return match ? Number(match[1]) : 30;
}

function getVisibleSessions(sessions: Session[], options: JournalDisplayOptions): Session[] {
  return options.pauses ? sessions : sessions.filter((session) => session.subject !== "pause");
}

function getSubjectLabel(subject: Session["subject"]): string {
  const labels: Partial<Record<Session["subject"], string>> = {
    francais: "Français",
    maths: "Maths",
    qlm: "QLM",
    arts: "Arts",
    eps: "EPS",
    anglais: "Anglais",
    emc: "EMC",
    pause: "Pause",
  };
  return labels[subject] ?? subject;
}

function withoutResourceAttachments(session: Session): Session {
  return {
    id: session.id,
    start: session.start,
    end: session.end,
    title: session.title,
    subject: session.subject,
    pedagogicalDomain: session.pedagogicalDomain,
    pedagogicalSubDomain: session.pedagogicalSubDomain,
    builderTemplateId: session.builderTemplateId,
    free: session.free,
    note: session.note,
  };
}

function saveGeneratedPrepIntoSession(sessionId: string, plan: PlumeSessionPlan["session"]): void {
  saveCustomSessionPrep(sessionId, {
    competence: plan.competence,
    objective: plan.objective,
    recommendedFormat: "seance",
    pedagogicalRationale: "",
    sequenceSessions: [],
    evaluation: plan.evaluation,
    materialSuggestions: plan.materialSuggestions,
    photocopySuggestions: plan.photocopySuggestions,
  });
  saveCustomPhases(sessionId, plan.phases);
}

function findSessionLocation(
  days: Record<string, Session[]>,
  sessionId: string,
): { dateKey: string; session: Session } | null {
  for (const [dateKey, sessions] of Object.entries(days)) {
    const found = sessions.find((session) => session.id === sessionId);
    if (found) return { dateKey, session: found };
  }
  return null;
}

function JournalPage() {
  const [requestedSessionId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("sessionId");
  });
  const [date, setDate] = useState<Date>(() => parseRequestedDate() ?? today);
  const [days, setDays] = useState<Record<string, Session[]>>(getInitialDays);
  const [editing, setEditing] = useState<Session | null>(null);
  const [open, setOpen] = useState(false);
  const [deepLinkHandled, setDeepLinkHandled] = useState(false);
  const [viewMode, setViewMode] = useState<JournalViewMode>("day");
  const [displayOptions, setDisplayOptions] =
    useState<JournalDisplayOptions>(DEFAULT_DISPLAY_OPTIONS);

  const key = toISODate(date);
  const sessions = days[key] ?? [];
  const visibleSessions = getVisibleSessions(sessions, displayOptions);
  const weekDays = useMemo(() => getWeekDays(date), [date]);
  const weekEntries = useMemo(
    () =>
      weekDays.map((day) => {
        const dateKey = toISODate(day);
        const daySessions = days[dateKey] ?? [];
        return {
          date: day,
          dateKey,
          sessions: getVisibleSessions(daySessions, displayOptions),
        };
      }),
    [days, displayOptions, weekDays],
  );
  const isToday = key === toISODate(today);

  const stats = useMemo(
    () => ({
      total: sessions.filter((s) => s.subject !== "pause").length,
      linked: sessions.filter((s) => s.prepSheetId).length,
    }),
    [sessions],
  );
  const teachingSessions = useMemo(
    () => sessions.filter((session) => session.subject !== "pause"),
    [sessions],
  );
  const sessionsWithoutPrep = teachingSessions.filter(
    (session) => !session.prepSheetId && !session.free,
  );
  const schoolRhythm = useMemo(() => getZoneCSchoolRhythm(date), [date]);
  const correctionTargets = teachingSessions
    .map((session) => ({ session, target: getSessionResultTarget(session) }))
    .filter(
      (
        entry,
      ): entry is {
        session: Session;
        target: NonNullable<ReturnType<typeof getSessionResultTarget>>;
      } => Boolean(entry.target),
    );
  const journalAiActions = [
    {
      id: "journee",
      label: "Relire la journée",
      description: "Faire une lecture rapide de l'équilibre du jour.",
      icon: CalendarCheck2,
      build: () => ({
        title: "Lecture du cahier journal",
        summary:
          teachingSessions.length === 0
            ? "Cette journée n'a pas encore été alimentée."
            : `${teachingSessions.length} séance(s) d'enseignement sont prévues sur cette journée.`,
        highlights: teachingSessions.length
          ? [
              `Première séance : ${teachingSessions[0]!.start} · ${teachingSessions[0]!.title}.`,
              `Dernière séance : ${teachingSessions[teachingSessions.length - 1]!.end} · ${teachingSessions[teachingSessions.length - 1]!.title}.`,
              `${stats.linked} séance(s) ont déjà une fiche de prep rattachée.`,
            ]
          : ["Importe d'abord une journée depuis l'emploi du temps pour commencer."],
        alerts: sessionsWithoutPrep.map(
          (session) =>
            `${session.start} · ${session.title} n'a pas encore de fiche de prep rattachée.`,
        ),
        nextSteps:
          teachingSessions.length === 0
            ? ["Appliquer une semaine depuis l'emploi du temps puis revenir ici."]
            : [
                "Commencer par rattacher les fiches de prep des séances structurées.",
                "Vérifier ensuite les séances qui devront mener à une correction ou à une saisie de résultats.",
              ],
      }),
    },
    {
      id: "corrections",
      label: "Voir les corrections",
      description: "Repérer les séances du jour qui débouchent sur une correction.",
      icon: ClipboardCheck,
      build: () => ({
        title: "Corrections et saisies prévues",
        summary:
          correctionTargets.length === 0
            ? "Aucune correction liée n'est détectée sur cette journée."
            : `${correctionTargets.length} séance(s) ouvrent sur une correction ou une saisie de résultats.`,
        highlights: correctionTargets.map(
          ({ session, target }) => `${session.start} · ${session.title} → ${target.label}`,
        ),
        nextSteps:
          correctionTargets.length > 0
            ? [
                "Vérifier que la bonne page du cahier est bien associée à chaque séance.",
                "Corriger d'abord les séances les plus structurées pour alimenter ensuite le suivi élève.",
              ]
            : [
                "Tu peux garder cette journée comme simple préparation si aucune correction n'est attendue.",
              ],
      }),
    },
    {
      id: "liens",
      label: "Voir les rattachements",
      description: "Contrôler les liens entre séances, ressources et suivi.",
      icon: Link2,
      build: () => ({
        title: "Rattachements du jour",
        summary:
          stats.linked === teachingSessions.length && teachingSessions.length > 0
            ? "Toutes les séances du jour sont déjà bien rattachées à une ressource ou une fiche."
            : "Quelques rattachements restent à préciser pour fluidifier la journée.",
        highlights: [
          `${stats.linked}/${teachingSessions.length} séance(s) avec fiche de prep.`,
          `${correctionTargets.length} lien(s) vers correction ou fluence détecté(s).`,
        ],
        alerts: sessionsWithoutPrep.length
          ? sessionsWithoutPrep.map(
              (session) =>
                `${session.title} : ajoute une fiche de prep ou assume-la comme séance libre.`,
            )
          : [],
        nextSteps: [
          "Quand une séance doit mener à une correction, rattache d'abord la méthode puis la bonne page.",
          "Garde les séances libres seulement pour les moments vraiment souples de la journée.",
        ],
      }),
    },
  ];

  const update = (next: Session[]) =>
    setDays((d) => {
      const updated = { ...d, [key]: next };
      writeJournalDays(updated);
      return updated;
    });

  const importTimetable = () => {
    const dayIndex = date.getDay() - 1;
    const weekday = WEEKDAYS[dayIndex] as Weekday | undefined;
    const slots = weekday ? getTimetable()[weekday] : [];
    const baseSessions = slots.map((slot, i) =>
      withoutResourceAttachments({ ...slot, id: `${key}-${i}` }),
    );
    const current = readJournalDays();
    const updated = { ...current, [key]: baseSessions };
    writeJournalDays(updated);
    setDays(updated);
    toast.success("Journée importée vierge.", {
      description: "Les ressources restent à rattacher manuellement depuis le cahier journal.",
    });
  };

  const handleSave = (session: Session) => {
    update(sessions.map((s) => (s.id === session.id ? session : s)));
    setOpen(false);
  };

  const saveSequenceFromPlume = (plan: PlumeSequencePlan) => {
    saveGeneratedSequence(plan.subjectKey, plan.sequenceTitle, plan.sessions, plan.summary);
    toast.success("Séquence rangée dans Ressources.", {
      description: `${plan.sessions.length} séance(s) ont été ajoutées dans la méthode ${ARDOISE_AI_NAME}.`,
    });
  };

  const saveSessionFromPlume = (plan: PlumeSessionPlan) => {
    saveGeneratedStandaloneSession(plan.subjectKey, plan.session, plan.summary);
    toast.success("Séance rangée dans Ressources.", {
      description: "Tu la retrouveras dans Ressources → Plume d'Ardoise.",
    });
  };

  const insertSessionFromPlume = (plan: PlumeSessionPlan) => {
    const lastEnd = sessions[sessions.length - 1]?.end ?? "08:30";
    const start = lastEnd;
    const end = toTimeLabel(toMinutes(start) + durationMinutes(plan.session.duration));
    const createdId = `${key}-plume-session-${Date.now()}`;
    saveGeneratedPrepIntoSession(createdId, plan.session);
    update(
      [
        ...sessions,
        {
          id: createdId,
          start,
          end,
          title: plan.session.title,
          subject: plan.subjectKey,
          free: true,
          note: plan.summary,
        },
      ].sort((left, right) => left.start.localeCompare(right.start)),
    );
    toast.success("Séance ajoutée au journal.", {
      description: `${plan.session.title} a été placée à ${start}.`,
    });
  };

  const applyGeneratedJournalDay = (plan: PlumeJournalDayPlan) => {
    const nextSessions = plan.sessions.map((item, index) => {
      const sessionId = `${key}-plume-day-${Date.now()}-${index}`;
      saveGeneratedPrepIntoSession(sessionId, item.prep);
      return {
        id: sessionId,
        start: item.start,
        end: item.end,
        title: item.title,
        subject: item.subjectKey,
        free: true,
        note: item.note || plan.summary,
      } satisfies Session;
    });
    update(nextSessions);
    toast.success("Journée détaillée injectée dans le cahier journal.", {
      description: `${nextSessions.length} séance(s) ont été préparées pour ${formatLongDate(date)}.`,
    });
  };

  useEffect(() => {
    if (!requestedSessionId || deepLinkHandled) return;
    const located = findSessionLocation(days, requestedSessionId);
    if (!located) return;
    if (key !== located.dateKey) {
      setDate(new Date(`${located.dateKey}T12:00:00`));
      return;
    }
    if (!open || editing?.id !== located.session.id) {
      setEditing(located.session);
      setOpen(true);
      setDeepLinkHandled(true);
    }
  }, [days, deepLinkHandled, editing?.id, key, open, requestedSessionId]);

  const openCorrection = (session: Session) => {
    const target = getSessionResultTarget(session);
    if (!target) return;
    window.location.assign(target.href);
  };

  const addAfter = (session: Session) => {
    const index = sessions.findIndex((s) => s.id === session.id);
    const created: Session = {
      id: `${key}-new-${Date.now()}`,
      start: session.end,
      end: session.end,
      title: "Nouvelle séance",
      subject: "francais",
    };
    update([...sessions.slice(0, index + 1), created, ...sessions.slice(index + 1)]);
  };

  return (
    <AppShell>
      <div className="print-sheet mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {/* En-tête jour : navigation de date, l'action la plus fréquente */}
        <header className="card-surface overflow-hidden border-primary/10 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_97%,transparent),color-mix(in_oklab,var(--color-secondary)_36%,transparent))] p-4 shadow-raised sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="eyebrow">Cahier journal</p>
              <h1 className="panel-heading mt-1 truncate text-3xl capitalize sm:text-4xl">
                {formatLongDate(date)}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[0.7rem] font-semibold">
                <span className="rounded-full border border-border/60 bg-card/80 px-2.5 py-1 text-muted-foreground shadow-sm">
                  CE1
                </span>
                <span className="rounded-full border border-border/60 bg-card/80 px-2.5 py-1 text-muted-foreground shadow-sm">
                  {stats.total} séance{stats.total > 1 ? "s" : ""}
                </span>
                <span className="rounded-full border border-primary/15 bg-primary/10 px-2.5 py-1 text-primary shadow-sm">
                  {stats.linked}/{Math.max(stats.total, 1)} fiches
                </span>
                {correctionTargets.length > 0 && (
                  <span className="rounded-full border border-accent/20 bg-accent/15 px-2.5 py-1 text-accent-foreground shadow-sm">
                    {correctionTargets.length} correction{correctionTargets.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-200/80 bg-[linear-gradient(135deg,oklch(0.985_0.02_150),oklch(0.96_0.03_150))] px-3 py-1.5 text-xs text-emerald-900 shadow-sm">
                <span className="font-semibold">Zone C</span>
                <span className="text-emerald-700">•</span>
                <span className="font-medium">
                  {schoolRhythm.status === "upcoming" ? "Prochaine période" : "Période"}{" "}
                  {schoolRhythm.period.label}
                </span>
                <span className="text-emerald-700">•</span>
                <span>
                  {schoolRhythm.schoolDaysLeft} jour{schoolRhythm.schoolDaysLeft > 1 ? "s" : ""}{" "}
                  de classe
                </span>
                <span className="text-emerald-700">•</span>
                <span>
                  {schoolRhythm.schoolWeeksLeft} semaine
                  {schoolRhythm.schoolWeeksLeft > 1 ? "s" : ""}
                </span>
              </div>
            </div>

            {/* Sélecteur / navigation de date : usage quotidien */}
            <div className="journal-print-hidden flex shrink-0 flex-wrap items-center justify-end gap-1">
              <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/75 p-1 shadow-sm">
                <Button
                  variant={viewMode === "day" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("day")}
                >
                  Jour
                </Button>
                <Button
                  variant={viewMode === "week" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("week")}
                >
                  Semaine
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Affichage
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Faire apparaître</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {[
                    ["times", "Horaires"],
                    ["subjects", "Domaines"],
                    ["notes", "Notes"],
                    ["prep", "Fiches liées"],
                    ["pauses", "Pauses"],
                  ].map(([optionKey, label]) => (
                    <DropdownMenuCheckboxItem
                      key={optionKey}
                      checked={displayOptions[optionKey as keyof JournalDisplayOptions]}
                      onCheckedChange={(checked) =>
                        setDisplayOptions((current) => ({
                          ...current,
                          [optionKey]: Boolean(checked),
                        }))
                      }
                    >
                      {label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => window.print()}
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <div className="flex items-center gap-1 rounded-full border border-border/60 bg-card/75 p-1 shadow-sm">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDate(today)}
                disabled={isToday}
              >
                Aujourd'hui
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Jour précédent"
                onClick={() => setDate(addDays(date, -1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Jour suivant"
                onClick={() => setDate(addDays(date, 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Choisir une date">
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                </PopoverContent>
              </Popover>
              </div>
            </div>
          </div>

          {/* Navigation semaine */}
          <div className="journal-print-hidden mt-4 flex gap-1">
            {weekDays.map((d, i) => {
              const dKey = toISODate(d);
              const active = dKey === key;
              const isTodayDay = dKey === toISODate(today);
              return (
                <button
                  key={dKey}
                  type="button"
                  onClick={() => setDate(d)}
                  className={cn(
                    "flex h-10 w-10 flex-col items-center justify-center rounded-lg text-[0.65rem] font-semibold transition-colors duration-150",
                    active
                      ? "bg-primary text-primary-foreground"
                      : isTodayDay
                        ? "bg-primary/10 text-primary ring-1 ring-primary/40 hover:bg-primary/20"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span>{DAY_LABELS[i]}</span>
                  <span
                    className={cn(
                      "text-[0.55rem] leading-none",
                      active ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {d.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </header>

        {/* Journée : le cœur de la page, en priorité visuelle */}
        {viewMode === "week" ? (
          <section className="mt-6 grid gap-3">
            {weekEntries.map((entry) => {
              const active = entry.dateKey === key;
              return (
                <article
                  key={entry.dateKey}
                  className={cn(
                    "rounded-[24px] border bg-card/85 p-4 shadow-card",
                    active ? "border-primary/30 ring-2 ring-primary/10" : "border-border/70",
                  )}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="eyebrow">{formatLongDate(entry.date)}</p>
                      <h2 className="text-lg font-semibold">
                        {entry.sessions.filter((session) => session.subject !== "pause").length}{" "}
                        séance
                        {entry.sessions.filter((session) => session.subject !== "pause").length > 1
                          ? "s"
                          : ""}
                      </h2>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setDate(entry.date)}>
                      Ouvrir
                    </Button>
                  </div>

                  {entry.sessions.length === 0 ? (
                    <p className="mt-3 rounded-2xl border border-dashed border-border/70 bg-secondary/35 px-3 py-4 text-sm text-muted-foreground">
                      Journée vide.
                    </p>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {entry.sessions.map((session) => (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => {
                            setDate(entry.date);
                            setEditing(session);
                            setOpen(true);
                          }}
                          className="w-full rounded-2xl border border-border/70 bg-background/70 px-3 py-2 text-left shadow-sm transition hover:border-primary/30 hover:bg-primary/5"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            {displayOptions.times && (
                              <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                                {session.start} - {session.end}
                              </span>
                            )}
                            {displayOptions.subjects && (
                              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.68rem] font-semibold text-primary">
                                {getSubjectLabel(session.subject)}
                              </span>
                            )}
                            {displayOptions.prep && session.prepSheetId && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.68rem] font-semibold text-emerald-800">
                                Fiche liée
                              </span>
                            )}
                          </div>
                          <p className="mt-1 font-semibold text-foreground">{session.title}</p>
                          {displayOptions.notes && session.note && (
                            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                              {session.note}
                            </p>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </section>
        ) : visibleSessions.length === 0 ? (
          <div className="mt-6 animate-rise-in rounded-3xl border border-dashed border-border bg-card/70 px-6 py-14 text-center shadow-card">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-border bg-secondary/70 text-primary">
              <Download className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-semibold">Journée vide</h2>
            <Button className="mt-5" onClick={importTimetable}>
              <Download className="mr-2 h-4 w-4" />
              Importer l'emploi du temps
            </Button>
          </div>
        ) : (
          <div className="mt-6 space-y-2.5">
            {visibleSessions.map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onOpen={(s) => {
                  setEditing(s);
                  setOpen(true);
                }}
                onCorrect={openCorrection}
                onDuplicate={(s) =>
                  update(
                    [...sessions, { ...s, id: `${s.id}-copie-${Date.now()}` }].sort((a, b) =>
                      a.start.localeCompare(b.start),
                    ),
                  )
                }
                onDelete={(s) => update(sessions.filter((x) => x.id !== s.id))}
                onAddAfter={addAfter}
              />
            ))}

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button
                variant="outline"
                className="w-full border-dashed sm:flex-1"
                onClick={() =>
                  update([
                    ...sessions,
                    {
                      id: `${key}-new-${Date.now()}`,
                      start: sessions[sessions.length - 1]?.end ?? "08:30",
                      end: sessions[sessions.length - 1]?.end ?? "09:00",
                      title: "Nouvelle séance",
                      subject: "francais",
                    },
                  ])
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une séance
              </Button>
            </div>
          </div>
        )}

        {/* Actions secondaires + aide IA : barre compacte */}
        <section className="journal-print-hidden mt-6 rounded-[24px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_92%,transparent),color-mix(in_oklab,var(--color-secondary)_34%,transparent))] px-3 py-2.5 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </span>
              <p className="truncate text-sm font-semibold text-foreground">{ARDOISE_AI_NAME}</p>
            </div>
            <div className="flex items-center gap-2">
              <JournalPlumeDialog
                dateLabel={formatLongDate(date)}
                sessions={sessions}
                onSaveSequence={saveSequenceFromPlume}
                onSaveSession={saveSessionFromPlume}
                onInsertSession={insertSessionFromPlume}
                onApplyJournalDay={applyGeneratedJournalDay}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Plus d'actions">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/bilan-seance">
                      <CheckSquare2 className="mr-2 h-4 w-4" />
                      Bilan de séance
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/correction-rapide">
                      <ClipboardCheck className="mr-2 h-4 w-4" />
                      Corrections
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ressources">
                      <Link2 className="mr-2 h-4 w-4" />
                      Rattacher des ressources
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <details className="group mt-2">
            <summary className="cursor-pointer list-none text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground">
              Aide IA du cahier journal
            </summary>
            <div className="mt-3">
              <AiActionStrip title="" intro="" actions={journalAiActions} className="mt-0" />
            </div>
          </details>
        </section>
      </div>

      <SessionModal
        session={editing}
        open={open}
        onOpenChange={setOpen}
        onSave={handleSave}
        onAttachCorrection={openCorrection}
      />
    </AppShell>
  );
}
