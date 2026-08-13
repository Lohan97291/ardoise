import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CalendarClock,
  Smartphone,
  Check,
  ChevronLeft,
  ChevronRight,
  Mail,
  Plus,
  Printer,
  StickyNote,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AgendaMessagingSwitch } from "@/components/ardoise/agenda-messaging-switch";
import { AppShell } from "@/components/ardoise/app-shell";
import { SUBJECT_BAND } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  SUBJECTS,
  formatLongDate,
  getPrepSheet,
  toISODate,
  type Session,
} from "@/lib/ardoise-data";
import { STUDENTS, fullName, initials, type Student } from "@/lib/ardoise-eval";
import {
  addExtraPrepared,
  addManualSignal,
  addMemo,
  getCheckedPrepared,
  getExtraPrepared,
  getManualSignals,
  getMemos,
  getSessionStatus,
  nextSessionStatus,
  removeExtraPrepared,
  removeManualSignal,
  removeMemo,
  setSessionStatus,
  togglePreparedChecked,
  type Memo,
  type ManualSignal,
  type PreparedExtraItem,
} from "@/lib/dashboard-storage";
import {
  getPhaseStatuses,
  nextPhaseStatus,
  setPhaseStatus,
  type PhaseStatus,
} from "@/lib/session-phases-storage";
import {
  addAgendaItem,
  removeAgendaItem,
  getAgendaItemsForDate,
  AGENDA_TYPE_LABEL,
  type AgendaItem,
  type AgendaItemType,
} from "@/lib/agenda-storage";
import { getCustomPhases, type CustomPhase } from "@/lib/custom-phases-storage";
import { useMailAnalyses } from "@/hooks/use-mail-analyses";
import { getHandledMailIds } from "@/lib/mail-status-storage";
import {
  getPreparationItems,
  type PreparationItem,
  type PreparationItemKind,
} from "@/lib/preparation-items";
import { getRecentSignals } from "@/lib/signal-storage";
import { cn } from "@/lib/utils";
import { readJournalDays } from "@/lib/journal-storage";

const PHASE_RING: Record<PhaseStatus, string> = {
  not_started: "border-border text-transparent hover:border-muted-foreground",
  in_progress: "border-ochre bg-ochre/25 text-ochre-foreground",
  completed: "border-sage bg-sage text-foreground",
};

const SESSION_STATUS_LABEL: Record<PhaseStatus, string> = {
  not_started: "À faire",
  in_progress: "En cours",
  completed: "Fait",
};

/* ── Système visuel partagé par les widgets du centre de pilotage ─────────── */
const WIDGET = "card-surface p-5 shadow-card transition-shadow duration-300 hover:shadow-raised";
const WIDGET_TITLE = "panel-heading flex min-w-0 items-center gap-2.5 text-[0.95rem]";
const WIDGET_ICON =
  "h-7 w-7 shrink-0 rounded-lg border border-border/70 bg-secondary/70 p-1.5 text-primary";
const WIDGET_ADD =
  "grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-card text-primary shadow-card transition-all duration-200 hover:-translate-y-px hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const WIDGET_BADGE =
  "shrink-0 rounded-full border border-border/70 bg-secondary px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground";
const WIDGET_ROW =
  "group flex items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 transition-colors duration-150 hover:border-border/70 hover:bg-secondary/70";
const WIDGET_EMPTY =
  "mt-3 rounded-xl border border-dashed border-border bg-secondary/30 px-3 py-4 text-center text-sm text-muted-foreground";
const WIDGET_FORM =
  "mt-3 space-y-2 rounded-xl border border-border bg-secondary/40 p-3 animate-fade-in";
const WIDGET_ICON_BTN =
  "shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-card hover:text-danger-strong";
const WIDGET_COMPACT =
  "card-surface p-4 shadow-card transition-shadow duration-300 hover:shadow-raised";
const WIDGET_TITLE_COMPACT =
  "flex min-w-0 items-center gap-2 text-[0.82rem] font-semibold text-foreground";

const PREPARATION_BADGE: Record<PreparationItemKind, string> = {
  photocopy: "border-primary/25 bg-primary/10 text-primary",
  material: "border-ochre/35 bg-ochre/15 text-foreground",
  manual: "border-sage/35 bg-sage/20 text-foreground",
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Centre de pilotage — Ardoise" },
      {
        name: "description",
        content:
          "Ardoise, l'assistant du quotidien des enseignants : cahier journal du jour, photocopies à préparer, appel, messagerie et agenda.",
      },
      { property: "og:title", content: "Centre de pilotage — Ardoise" },
      {
        property: "og:description",
        content: "Tout ce qu'il faut pour démarrer la journée de classe, en un seul écran.",
      },
    ],
  }),
  component: Dashboard,
});

const today = new Date();

function currentSessionIndex(sessions: Session[]): number {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h! * 60 + m!;
  };
  const activeIndex = sessions.findIndex(
    (s) => nowMinutes >= toMinutes(s.start) && nowMinutes < toMinutes(s.end),
  );
  if (activeIndex !== -1) return activeIndex;
  const upcomingIndex = sessions.findIndex((s) => toMinutes(s.start) > nowMinutes);
  if (upcomingIndex !== -1) return upcomingIndex;
  return Math.max(0, sessions.length - 1);
}

function formatTime(d: Date): string {
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

type DashboardSyncedEvent = {
  id: string;
  source: "google" | "icloud";
  summary?: string;
  start: { date?: string; dateTime?: string };
};

function dashboardEventTime(event: DashboardSyncedEvent): string {
  if (event.start.date) return "Toute la journée";
  return event.start.dateTime
    ? new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(
        new Date(event.start.dateTime),
      )
    : "—";
}

function Dashboard() {
  const [dateLabel, setDateLabel] = useState(() => formatLongDate(today));
  const [timeLabel, setTimeLabel] = useState("");
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setDateLabel(formatLongDate(d));
      setTimeLabel(formatTime(d));

      setNowMinutes(d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60);
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  const [timerOpen, setTimerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const todayKey = toISODate(today);
  const todaySessions = mounted ? readJournalDays()[todayKey] ?? [] : [];

  const daySessions = useMemo(
    () => todaySessions.filter((s) => s.subject !== "pause"),
    [todaySessions],
  );

  const [centerIndex, setCenterIndex] = useState(() => currentSessionIndex(daySessions));
  useEffect(() => {
    if (mounted) setCenterIndex(currentSessionIndex(daySessions));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, daySessions.length]);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);
  const currentFocusSession = daySessions[centerIndex] ?? null;
  const nextFocusSession = daySessions[centerIndex + 1] ?? null;



  const toMinutes = (hhmm?: string) => {
    if (!hhmm) return null;
    const [h, m] = hhmm.split(":").map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return null;
    return h * 60 + m;
  };
  const focusStart = toMinutes(currentFocusSession?.start);
  const focusEnd = toMinutes(currentFocusSession?.end);
  const focusTimer =
    nowMinutes !== null && focusStart !== null && focusEnd !== null && focusEnd > focusStart
      ? {
          total: focusEnd - focusStart,
          elapsed: Math.min(focusEnd - focusStart, Math.max(0, nowMinutes - focusStart)),
          remaining: Math.max(0, focusEnd - nowMinutes),
          before: nowMinutes < focusStart,
          after: nowMinutes >= focusEnd,
          startsIn: Math.max(0, focusStart - nowMinutes),
        }
      : null;
  const fmtDur = (mins: number) => {
    const m = Math.round(mins);
    return m >= 60 ? `${Math.floor(m / 60)}h${String(m % 60).padStart(2, "0")}` : `${m} min`;
  };


  const openSession = (s: Session, index: number) => {
    setCenterIndex(index);
    if (expandedId === s.id) {
      setExpandedId(null);
    } else {
      setExpandedId(s.id);
      setExpandedPhase(null);
    }
  };

  const expandedSession = daySessions.find((s) => s.id === expandedId) ?? null;
  const expandedPrep = expandedSession ? getPrepSheet(expandedSession.prepSheetId) : undefined;

  const [phaseStatuses, setPhaseStatuses] = useState<Record<number, PhaseStatus>>({});
  const [expandedCustomPhases, setExpandedCustomPhases] = useState<CustomPhase[]>([]);
  useEffect(() => {
    setPhaseStatuses(expandedSession ? getPhaseStatuses(expandedSession.id) : {});
    setExpandedCustomPhases(expandedSession ? getCustomPhases(expandedSession.id) : []);
  }, [expandedSession?.id]);
  const expandedPhases =
    expandedPrep?.phases ?? (expandedCustomPhases.length > 0 ? expandedCustomPhases : null);

  const [, forceSessionStatusRefresh] = useState(0);
  function cyclePhaseStatus(index: number) {
    if (!expandedSession) return;
    const current = phaseStatuses[index] ?? "not_started";
    setPhaseStatuses(setPhaseStatus(expandedSession.id, index, nextPhaseStatus(current)));
  }
  function cycleSessionStatus(sessionId: string) {
    setSessionStatus(sessionId, nextSessionStatus(getSessionStatus(sessionId)));
    forceSessionStatusRefresh((n) => n + 1);
  }

  const signals = getRecentSignals();
  const [manualSignals, setManualSignals] = useState<ManualSignal[]>(getManualSignals);
  const [addingSignal, setAddingSignal] = useState(false);
  const [signalStudentId, setSignalStudentId] = useState(STUDENTS[0]?.id ?? "");
  const [signalReason, setSignalReason] = useState("");

  const [checkedPrepared, setCheckedPrepared] = useState<string[]>(getCheckedPrepared);
  const [extraPrepared, setExtraPrepared] = useState<PreparedExtraItem[]>(getExtraPrepared);
  const [prepDialogOpen, setPrepDialogOpen] = useState(false);
  const [newPreparedItems, setNewPreparedItems] = useState("");
  const [newPreparedSessionId, setNewPreparedSessionId] = useState<string>("none");
  const [newPreparedCategory, setNewPreparedCategory] = useState<PreparationItemKind>("manual");
  const preparationItems = useMemo(
    () => getPreparationItems(daySessions, extraPrepared),
    [daySessions, extraPrepared],
  );
  const pendingPreparationItems = useMemo(
    () => preparationItems.filter((item) => !checkedPrepared.includes(item.checkedKey)),
    [preparationItems, checkedPrepared],
  );
  const preparationPreview = pendingPreparationItems.slice(0, 4);
  const preparationGroups = useMemo(() => {
    const groups = new Map<
      string,
      { key: string; title: string; subtitle: string; items: PreparationItem[] }
    >();

    for (const item of preparationItems) {
      const key = item.sessionId ?? "manual";
      const current = groups.get(key) ?? {
        key,
        title: item.sessionTitle ? `${item.sessionTime} · ${item.sessionTitle}` : "Ajouts libres",
        subtitle: item.subjectLabel ?? "Préparation générale",
        items: [],
      };
      current.items.push(item);
      groups.set(key, current);
    }

    return Array.from(groups.values());
  }, [preparationItems]);

  const [memos, setMemos] = useState<Memo[]>(getMemos);
  const [newMemo, setNewMemo] = useState("");

  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(() =>
    getAgendaItemsForDate(todayKey),
  );
  const [addingAgendaItem, setAddingAgendaItem] = useState(false);
  const [newAgendaTitle, setNewAgendaTitle] = useState("");
  const [newAgendaTime, setNewAgendaTime] = useState("");
  const [newAgendaType, setNewAgendaType] = useState<AgendaItemType>("rdv");
  const [syncedAgendaEvents, setSyncedAgendaEvents] = useState<DashboardSyncedEvent[]>([]);

  useEffect(() => {
    let cancelled = false;
    const start = new Date(today);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);
    const query = `timeMin=${encodeURIComponent(start.toISOString())}&timeMax=${encodeURIComponent(end.toISOString())}`;

    void (async () => {
      const events: DashboardSyncedEvent[] = [];
      try {
        const status = (await fetch("/api/calendar/google/status").then((r) => r.json())) as {
          connected?: boolean;
        };
        if (status.connected) {
          const value = (await fetch(`/api/calendar/events?${query}`).then((r) => r.json())) as {
            events?: DashboardSyncedEvent[];
          };
          events.push(
            ...(value.events ?? []).map((event) => ({ ...event, source: "google" as const })),
          );
        }
      } catch {
        // Le centre reste utilisable si Google Calendar est indisponible.
      }
      try {
        const value = (await fetch(`/api/calendar/icloud/events?${query}`).then((r) =>
          r.json(),
        )) as {
          events?: DashboardSyncedEvent[];
        };
        events.push(
          ...(value.events ?? []).map((event) => ({ ...event, source: "icloud" as const })),
        );
      } catch {
        // Le centre reste utilisable si le flux iCloud est indisponible.
      }
      if (!cancelled) setSyncedAgendaEvents(events);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const { data: mailAnalyses = [] } = useMailAnalyses();
  const handledMailIds = getHandledMailIds();
  const unhandledMailCount = mailAnalyses.filter(
    (m) => !handledMailIds.includes(m.externalId),
  ).length;
  const recentMails = mailAnalyses
    .filter((m) => !handledMailIds.includes(m.externalId))
    .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
    .slice(0, 4);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Centre de pilotage
            </p>
            <h1 className="mt-1 flex flex-wrap items-baseline gap-x-3 text-3xl font-bold capitalize sm:text-4xl">
              {dateLabel}
              <span className="font-mono text-lg font-normal capitalize-none text-muted-foreground">
                {timeLabel}
              </span>
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 sm:justify-end">
            <Button asChild size="sm">
              <Link to="/journal">
                <BookOpen className="mr-1.5 h-4 w-4" />
                Ouvrir le journal
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/compagnon-classe">
                <Smartphone className="mr-1.5 h-4 w-4" />
                Mode classe
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/correction-rapide">Corriger</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/programmation">Programmation</Link>
            </Button>
          </div>
        </header>

        {/* Cahier journal du jour — information principale de l'écran */}
          <section className="card-surface overflow-hidden border-2 border-primary/20 bg-[linear-gradient(135deg,oklch(0.336_0.081_252_/_0.1),transparent_58%),linear-gradient(180deg,oklch(1_0_0_/_0.99),oklch(0.985_0.01_250_/_0.96))] p-5 shadow-raised sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <span className="eyebrow text-primary">Priorité du jour</span>
                <h2 className="mt-1 flex min-w-0 items-center gap-3 text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  <BookOpen className="h-8 w-8 shrink-0 rounded-xl border border-primary/25 bg-primary/10 p-1.5 text-primary" />
                  <span className="truncate">Cahier journal du jour</span>
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <Button asChild variant="outline" size="sm" className="shrink-0 border-primary/25 bg-card text-primary hover:bg-primary/10">
                  <Link to="/journal">
                    Tout voir
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {daySessions.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-secondary/30 px-5 py-7 text-center">
                <BookOpen className="mx-auto h-6 w-6 text-muted-foreground/70" />
                <p className="mt-2.5 text-sm font-medium">Aucune séance planifiée</p>
                <Button asChild size="sm" className="mt-4">
                  <Link to="/journal">Ouvrir le journal</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
                  <div className="rounded-2xl border border-primary/20 bg-white/95 px-5 py-5 shadow-card sm:px-6 sm:py-6">
                    <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-primary">
                      Séance en cours
                    </p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-2">
                      {currentFocusSession ? (
                        <>
                          <span className="rounded-full bg-primary px-3 py-1 font-mono text-sm font-bold text-primary-foreground">
                            {currentFocusSession.start} → {currentFocusSession.end}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[0.72rem] font-semibold",
                              SUBJECT_BAND[currentFocusSession.subject],
                            )}
                          >
                            {SUBJECTS[currentFocusSession.subject].label}
                          </span>
                        </>
                      ) : null}
                    </div>
                    <p className="mt-3 text-2xl font-bold leading-snug tracking-tight text-foreground">
                      {currentFocusSession?.title ?? "Aucune séance sélectionnée"}
                    </p>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                      {nextFocusSession
                        ? `Ensuite : ${nextFocusSession.start} · ${nextFocusSession.title}`
                        : "Fin de journée après cette séance."}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setTimerOpen((o) => !o)}
                    aria-expanded={timerOpen}
                    className="group flex flex-col justify-center rounded-2xl border border-border/70 bg-card/85 px-4 py-4 text-left shadow-card transition-colors hover:border-primary/30"
                  >
                    <span className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                      Temps restant
                    </span>
                    <span className="mt-1 font-mono text-3xl font-bold tabular-nums text-foreground">
                      {!focusTimer
                        ? "—"
                        : focusTimer.before
                          ? `dans ${fmtDur(focusTimer.startsIn)}`
                          : focusTimer.after
                            ? "terminée"
                            : fmtDur(focusTimer.remaining)}
                    </span>
                    {focusTimer && !focusTimer.before ? (
                      <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <span
                          className="block h-full rounded-full bg-primary transition-all duration-500"
                          style={{
                            width: `${Math.round((focusTimer.elapsed / focusTimer.total) * 100)}%`,
                          }}
                        />
                      </span>
                    ) : null}
                    {timerOpen && focusTimer ? (
                      <span className="mt-3 grid gap-1 text-xs text-muted-foreground">
                        <span>Écoulé : {fmtDur(focusTimer.elapsed)}</span>
                        <span>Durée prévue : {fmtDur(focusTimer.total)}</span>
                        <span>Fin prévue : {currentFocusSession?.end}</span>
                      </span>
                    ) : (
                      <span className="mt-2 text-[0.65rem] text-muted-foreground/70 opacity-0 transition-opacity group-hover:opacity-100">
                        Cliquer pour le détail
                      </span>
                    )}
                  </button>

                </div>

                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    disabled={centerIndex <= 0}
                    onClick={() => setCenterIndex((i) => Math.max(0, i - 1))}
                    aria-label="Séance précédente"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <div className="grid min-w-0 flex-1 grid-cols-3 gap-2">
                    {[-1, 0, 1].map((offset) => {
                      const idx = centerIndex + offset;
                      const s = daySessions[idx];
                      if (!s) return <div key={offset} />;
                      const isCurrent = offset === 0;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => openSession(s, idx)}
                          className={cn(
                            "min-w-0 rounded-xl border px-2.5 py-2 text-left transition-all duration-150",
                            isCurrent
                              ? "border-primary/30 bg-secondary/70 shadow-card"
                              : "border-transparent opacity-60 hover:opacity-100",
                            expandedId === s.id && "border-primary/50",
                          )}
                        >
                          <span className="block font-mono text-[0.65rem] text-muted-foreground">
                            {s.start}
                          </span>
                          <span className="mt-0.5 block truncate text-xs font-semibold leading-snug">
                            {s.title}
                          </span>
                          <span
                            className={cn(
                              "mt-1 inline-block rounded-md px-1.5 py-0.5 text-[0.62rem] font-semibold",
                              SUBJECT_BAND[s.subject],
                            )}
                          >
                            {SUBJECTS[s.subject].label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    disabled={centerIndex >= daySessions.length - 1}
                    onClick={() => setCenterIndex((i) => Math.min(daySessions.length - 1, i + 1))}
                    aria-label="Séance suivante"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {expandedSession ? (
                  <div className="mt-3 rounded-xl border border-border bg-secondary/40 p-3">
                    {expandedPhases ? (
                      <>
                        <p className="eyebrow">Déroulé · {expandedPhases.length} phases</p>
                        <ol className="mt-2 space-y-1.5">
                          {expandedPhases.map((phase, i) => {
                            const status = phaseStatuses[i] ?? "not_started";
                            return (
                              <li key={phase.title} className="rounded-lg bg-card">
                                <div className="flex items-center gap-2 px-2.5 py-1.5">
                                  <button
                                    type="button"
                                    onClick={() => cyclePhaseStatus(i)}
                                    aria-label={`Phase ${i + 1} : ${SESSION_STATUS_LABEL[status]}`}
                                    title={`Statut : ${SESSION_STATUS_LABEL[status]} (cliquer pour changer)`}
                                    className={cn(
                                      "grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all duration-200",
                                      PHASE_RING[status],
                                    )}
                                  >
                                    <Check className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setExpandedPhase((p) => (p === i ? null : i))}
                                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                                  >
                                    <span
                                      className={cn(
                                        "min-w-0 flex-1 truncate text-xs font-medium",
                                        status === "completed" &&
                                          "text-muted-foreground line-through",
                                      )}
                                    >
                                      {phase.title}
                                    </span>
                                    {phase.duration ? (
                                      <span className="shrink-0 font-mono text-[0.65rem] text-muted-foreground">
                                        {phase.duration}
                                      </span>
                                    ) : null}
                                  </button>
                                </div>
                                {expandedPhase === i ? (
                                  <p className="px-2.5 pb-2 pl-9 text-xs leading-relaxed text-muted-foreground">
                                    {phase.detail}
                                  </p>
                                ) : null}
                              </li>
                            );
                          })}
                        </ol>
                      </>
                    ) : (
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">
                          Aucun déroulé pour cette séance.
                        </p>
                        <button
                          type="button"
                          onClick={() => cycleSessionStatus(expandedSession.id)}
                          className={cn(
                            "shrink-0 rounded-full border-2 px-2.5 py-1 text-[0.65rem] font-semibold transition-all duration-200",
                            PHASE_RING[getSessionStatus(expandedSession.id)],
                          )}
                        >
                          {SESSION_STATUS_LABEL[getSessionStatus(expandedSession.id)]}
                        </button>
                      </div>
                    )}
                  </div>
                ) : null}
              </>
            )}
          </section>

        {/* Satellites du quotidien : compacts et secondaires */}
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow">Le reste de la journée</p>
          <p className="text-xs text-muted-foreground">
            Les outils du quotidien restent accessibles juste en dessous.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Cahier d'appel */}
          <section className={cn(WIDGET_COMPACT, "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_28%,transparent))]")}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className={WIDGET_TITLE_COMPACT}>
                <Users className="h-4 w-4 shrink-0 text-primary" />
                Cahier d'appel
              </h2>
              <Button variant="outline" size="sm" className="shrink-0">
                Faire l'appel
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              {STUDENTS.length} élèves inscrits · Appel du matin non enregistré.
            </p>
          </section>

          {/* À préparer */}
          <section className={cn(WIDGET_COMPACT, "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_28%,transparent))]")}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className={WIDGET_TITLE_COMPACT}>
                <Printer className="h-4 w-4 shrink-0 text-primary" />À préparer
              </h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="shrink-0 text-primary"
                onClick={() => setPrepDialogOpen(true)}
              >
                Ouvrir
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>

            <p className="mt-3 text-sm text-muted-foreground">
              {pendingPreparationItems.length > 0
                ? `${pendingPreparationItems.length} élément${pendingPreparationItems.length > 1 ? "s" : ""} à anticiper aujourd'hui, relié${pendingPreparationItems.length > 1 ? "s" : ""} aux séances du cahier journal.`
                : "Rien d'urgent à préparer pour l'instant. Le matériel habituel de classe reste masqué."}
            </p>

            {preparationPreview.length > 0 ? (
              <ul className="mt-3 space-y-1.5">
                {preparationPreview.map((item) => (
                  <li key={item.id} className={cn(WIDGET_ROW, "items-start")}>
                    <Checkbox
                      id={`preview-${item.id}`}
                      className="mt-0.5"
                      checked={checkedPrepared.includes(item.checkedKey)}
                      onCheckedChange={() =>
                        setCheckedPrepared(togglePreparedChecked(item.checkedKey))
                      }
                    />
                    <label htmlFor={`preview-${item.id}`} className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block text-sm leading-snug",
                          checkedPrepared.includes(item.checkedKey) &&
                            "text-muted-foreground line-through",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-1 block text-[0.72rem] text-muted-foreground">
                        {item.sessionTime ? `${item.sessionTime} · ` : ""}
                        {item.sessionTitle ?? "Préparation libre"}
                      </span>
                    </label>
                    <span className={cn(WIDGET_BADGE, PREPARATION_BADGE[item.kind])}>
                      {item.kind === "photocopy"
                        ? "Photocopie"
                        : item.kind === "material"
                          ? "Matériel"
                          : "Ajout"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={WIDGET_EMPTY}>Aucune photocopie ni matériel spécifique à prévoir.</p>
            )}

            {pendingPreparationItems.length > preparationPreview.length ? (
              <button
                type="button"
                onClick={() => setPrepDialogOpen(true)}
                className="mt-3 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                Voir les {pendingPreparationItems.length - preparationPreview.length} autres
                éléments
              </button>
            ) : null}

            <Dialog open={prepDialogOpen} onOpenChange={setPrepDialogOpen}>
              <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="border-b border-border px-6 py-5">
                  <DialogTitle>Préparation de la journée</DialogTitle>
                  <DialogDescription>
                    Retrouve ici les photocopies, manipulations et ajouts personnels liés aux
                    séances du jour. Le matériel habituel de classe n'apparaît pas.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-0 md:grid-cols-[minmax(0,1.15fr)_320px]">
                  <ScrollArea className="max-h-[70vh] border-b border-border md:border-b-0 md:border-r">
                    <div className="space-y-4 p-6">
                      {preparationGroups.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-border bg-secondary/30 px-5 py-8 text-center text-sm text-muted-foreground">
                          Rien à préparer pour le moment.
                        </div>
                      ) : (
                        preparationGroups.map((group) => (
                          <section
                            key={group.key}
                            className="rounded-2xl border border-border bg-secondary/30 p-4"
                          >
                            <div className="mb-3">
                              <h3 className="text-sm font-semibold text-foreground">
                                {group.title}
                              </h3>
                              <p className="text-xs text-muted-foreground">{group.subtitle}</p>
                            </div>
                            <ul className="space-y-2">
                              {group.items.map((item) => (
                                <li
                                  key={item.id}
                                  className="flex items-start gap-2 rounded-xl bg-card px-3 py-2.5"
                                >
                                  <Checkbox
                                    id={`dialog-${item.id}`}
                                    className="mt-0.5"
                                    checked={checkedPrepared.includes(item.checkedKey)}
                                    onCheckedChange={() =>
                                      setCheckedPrepared(togglePreparedChecked(item.checkedKey))
                                    }
                                  />
                                  <label htmlFor={`dialog-${item.id}`} className="min-w-0 flex-1">
                                    <span
                                      className={cn(
                                        "block text-sm leading-snug",
                                        checkedPrepared.includes(item.checkedKey) &&
                                          "text-muted-foreground line-through",
                                      )}
                                    >
                                      {item.label}
                                    </span>
                                    {item.sessionTime ? (
                                      <span className="mt-1 block text-[0.72rem] text-muted-foreground">
                                        {item.sessionTime}
                                      </span>
                                    ) : null}
                                  </label>
                                  <div className="flex items-center gap-2">
                                    <span
                                      className={cn(WIDGET_BADGE, PREPARATION_BADGE[item.kind])}
                                    >
                                      {item.kind === "photocopy"
                                        ? "Photocopie"
                                        : item.kind === "material"
                                          ? "Matériel"
                                          : "Ajout"}
                                    </span>
                                    {item.removable ? (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setExtraPrepared(removeExtraPrepared(item.id))
                                        }
                                        className={WIDGET_ICON_BTN}
                                        aria-label="Supprimer cet ajout"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    ) : null}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))
                      )}
                    </div>
                  </ScrollArea>

                  <div className="space-y-4 px-6 py-5">
                    <div>
                      <h3 className="text-sm font-semibold">Ajouter quelque chose à préparer</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Une ligne = un élément. Pratique pour les photocopies, les jeux de cartes,
                        le matériel de manipulation ou un support à découper.
                      </p>
                    </div>

                    <form
                      className="space-y-3"
                      onSubmit={(e) => {
                        e.preventDefault();
                        const entries = newPreparedItems
                          .split("\n")
                          .map((item) => item.trim())
                          .filter(Boolean);
                        if (entries.length === 0) return;
                        let next = extraPrepared;
                        for (const entry of entries) {
                          next = addExtraPrepared(entry, {
                            sessionId:
                              newPreparedSessionId === "none" ? null : newPreparedSessionId,
                            category: newPreparedCategory,
                          });
                        }
                        setExtraPrepared(next);
                        setNewPreparedItems("");
                        setNewPreparedSessionId("none");
                        setNewPreparedCategory("manual");
                      }}
                    >
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Lier à une séance
                        </label>
                        <select
                          value={newPreparedSessionId}
                          onChange={(e) => setNewPreparedSessionId(e.target.value)}
                          className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                        >
                          <option value="none">Préparation générale</option>
                          {daySessions.map((session) => (
                            <option key={session.id} value={session.id}>
                              {session.start} · {session.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Type
                        </label>
                        <select
                          value={newPreparedCategory}
                          onChange={(e) =>
                            setNewPreparedCategory(e.target.value as PreparationItemKind)
                          }
                          className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm"
                        >
                          <option value="manual">À préparer</option>
                          <option value="photocopy">Photocopies</option>
                          <option value="material">Matériel</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          Éléments
                        </label>
                        <Textarea
                          value={newPreparedItems}
                          onChange={(e) => setNewPreparedItems(e.target.value)}
                          placeholder={
                            "Ex. :\nPhotocopier la page 16 du Cléo\nPréparer les cubes de numération\nDécouper les étiquettes"
                          }
                          className="min-h-[140px] resize-none bg-card text-sm"
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Ajouter à la préparation
                      </Button>
                    </form>

                    <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
                      Les éléments issus du cahier journal remontent automatiquement. Ici, tu
                      ajoutes seulement ce qui demande un vrai travail en amont.
                    </div>
                  </div>
                </div>

                <DialogFooter className="border-t border-border px-6 py-4">
                  <Button variant="outline" onClick={() => setPrepDialogOpen(false)}>
                    Fermer
                  </Button>
                  <Button asChild>
                    <Link to="/journal">Voir le cahier journal</Link>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          {/* Mémo */}
          <section className={cn(WIDGET_COMPACT, "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_28%,transparent))]")}>
            <h2 className={WIDGET_TITLE_COMPACT}>
              <StickyNote className="h-4 w-4 shrink-0 text-primary" />
              Mémo
            </h2>
            {memos.length === 0 ? (
              <p className={WIDGET_EMPTY}>Notez vos idées pour ne rien oublier.</p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {memos.map((m) => (
                  <li
                    key={m.id}
                    className="group flex items-start gap-2 rounded-xl border border-transparent bg-secondary/50 px-2.5 py-2 text-sm leading-snug transition-colors duration-150 hover:border-border hover:bg-secondary"
                  >
                    <span className="min-w-0 flex-1">{m.text}</span>
                    <button
                      type="button"
                      onClick={() => setMemos(removeMemo(m.id))}
                      className={WIDGET_ICON_BTN}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <form
              className="mt-3 flex gap-1.5 border-t border-border/60 pt-3"
              onSubmit={(e) => {
                e.preventDefault();
                const text = newMemo.trim();
                if (!text) return;
                setMemos(addMemo(text));
                setNewMemo("");
              }}
            >
              <Input
                value={newMemo}
                onChange={(e) => setNewMemo(e.target.value)}
                placeholder="Ajouter un mémo…"
                className="h-8 text-sm"
              />
              <Button type="submit" size="icon" variant="outline" className="h-8 w-8 shrink-0">
                <Plus className="h-4 w-4" />
              </Button>
            </form>
          </section>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          {/* Agenda & messagerie */}
          <section className={WIDGET}>
            <div className="grid gap-3 border-b border-border pb-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className={WIDGET_TITLE}>
                  <CalendarClock className={WIDGET_ICON} />
                  Agenda & messages
                </h2>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={WIDGET_BADGE}>
                    {agendaItems.length + syncedAgendaEvents.length} événement
                    {agendaItems.length + syncedAgendaEvents.length > 1 ? "s" : ""}
                  </span>
                  <span
                    className={cn(
                      WIDGET_BADGE,
                      unhandledMailCount > 0 &&
                        "border-danger-soft-border bg-danger-soft text-danger-strong",
                    )}
                  >
                    {unhandledMailCount} mail{unhandledMailCount > 1 ? "s" : ""} à traiter
                  </span>
                </div>
              </div>
              <AgendaMessagingSwitch
                active="agenda"
                agendaCount={agendaItems.length + syncedAgendaEvents.length}
                mailCount={unhandledMailCount}
              />
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div>
                <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2">
                  <h3 className={WIDGET_TITLE}>
                    <CalendarClock className={WIDGET_ICON} />
                    Agenda de la journée
                  </h3>
                  <Button asChild variant="ghost" size="sm" className="shrink-0 text-primary">
                    <Link to="/agenda">
                      Tout voir
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                  <button
                    type="button"
                    onClick={() => setAddingAgendaItem((v) => !v)}
                    className={WIDGET_ADD}
                    aria-label="Ajouter un élément à l'agenda"
                    title="Ajouter un élément à l'agenda"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {addingAgendaItem ? (
                  <form
                    className={WIDGET_FORM}
                    onSubmit={(e) => {
                      e.preventDefault();
                      const title = newAgendaTitle.trim();
                      if (!title) return;
                      setAgendaItems(
                        addAgendaItem({
                          date: todayKey,
                          time: newAgendaTime || undefined,
                          title,
                          type: newAgendaType,
                        }),
                      );
                      setNewAgendaTitle("");
                      setNewAgendaTime("");
                      setAddingAgendaItem(false);
                    }}
                  >
                    <div className="flex gap-1.5">
                      <Input
                        type="time"
                        value={newAgendaTime}
                        onChange={(e) => setNewAgendaTime(e.target.value)}
                        className="h-8 w-28 shrink-0 bg-card text-sm"
                      />
                      <select
                        value={newAgendaType}
                        onChange={(e) => setNewAgendaType(e.target.value as AgendaItemType)}
                        className="w-full rounded-md border border-input bg-card px-2 py-1.5 text-sm"
                      >
                        {Object.entries(AGENDA_TYPE_LABEL).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Input
                      value={newAgendaTitle}
                      onChange={(e) => setNewAgendaTitle(e.target.value)}
                      placeholder="Ex. : RDV parents Lucas, animation pédagogique circo…"
                      className="h-8 bg-card text-sm"
                    />
                    <div className="flex justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAddingAgendaItem(false)}
                      >
                        Annuler
                      </Button>
                      <Button type="submit" size="sm">
                        Ajouter
                      </Button>
                    </div>
                  </form>
                ) : null}

                {agendaItems.length === 0 && syncedAgendaEvents.length === 0 ? (
                  <p className={WIDGET_EMPTY}>Rien de prévu pour l'instant.</p>
                ) : (
                  <ol className="mt-3 space-y-0.5">
                    {agendaItems.map((item) => (
                      <li key={item.id} className={WIDGET_ROW}>
                        <span className="w-11 shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                          {item.time ?? "—"}
                        </span>
                        <span className={WIDGET_BADGE}>{AGENDA_TYPE_LABEL[item.type]}</span>
                        <span className="min-w-0 flex-1 truncate text-sm">{item.title}</span>
                        <button
                          type="button"
                          onClick={() => setAgendaItems(removeAgendaItem(item.id, todayKey))}
                          className={cn(
                            WIDGET_ICON_BTN,
                            "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
                          )}
                          aria-label="Supprimer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    ))}
                    {syncedAgendaEvents.map((event) => (
                      <li key={`${event.source}-${event.id}`} className={WIDGET_ROW}>
                        <span className="w-11 shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                          {dashboardEventTime(event)}
                        </span>
                        <span
                          className={cn(
                            WIDGET_BADGE,
                            event.source === "google"
                              ? "border-sage/35 bg-sage/15 text-foreground"
                              : "border-primary/25 bg-primary/10 text-primary",
                          )}
                        >
                          {event.source === "google" ? "Google" : "iCloud"}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm">
                          {event.summary || "Sans titre"}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>

              <div className="border-t border-border/70 pt-4 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                  <h3 className={WIDGET_TITLE}>
                    <Mail className={WIDGET_ICON} />
                    Messagerie
                  </h3>
                  <Button asChild variant="ghost" size="sm" className="shrink-0 text-primary">
                    <Link to="/messagerie">
                      Tout voir
                      <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                {recentMails.length === 0 ? (
                  <p className={WIDGET_EMPTY}>Aucun mail analysé pour l'instant.</p>
                ) : (
                  <ul className="mt-3 space-y-1.5">
                    {recentMails.map((mail) => (
                      <li key={mail.externalId}>
                        <Link to="/messagerie" className={cn(WIDGET_ROW, "text-sm")}>
                          <span
                            className={cn(
                              "h-2 w-2 shrink-0 rounded-full",
                              mail.priority === "urgent"
                                ? "bg-danger-strong"
                                : mail.priority === "important"
                                  ? "bg-ochre"
                                  : "bg-muted-foreground/40",
                            )}
                          />
                          <span className="min-w-0 flex-1 truncate font-medium">
                            {mail.subject || "Sans objet"}
                          </span>
                          {mail.priority === "urgent" || mail.priority === "important" ? (
                            <span className={WIDGET_BADGE}>
                              {mail.priority === "urgent" ? "Urgent" : "Important"}
                            </span>
                          ) : null}
                          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>

          {/* Signaux à surveiller — automatiques + ajoutés à la main */}
          <section className={cn(WIDGET_COMPACT, "border-danger-soft-border bg-danger-soft")}>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className={WIDGET_TITLE_COMPACT}>
                <AlertTriangle className="h-4 w-4 shrink-0 text-danger-strong" />
                Signaux à surveiller
              </h2>
              <button
                type="button"
                onClick={() => setAddingSignal((v) => !v)}
                className={cn(
                  WIDGET_ADD,
                  "border-danger-soft-border text-danger-strong hover:bg-card",
                )}
                aria-label="Ajouter un signal"
                title="Ajouter un signal"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {addingSignal ? (
              <form
                className={cn(WIDGET_FORM, "border-danger-soft-border bg-card/70")}
                onSubmit={(e) => {
                  e.preventDefault();
                  const reason = signalReason.trim();
                  if (!reason || !signalStudentId) return;
                  setManualSignals(addManualSignal(signalStudentId, reason));
                  setSignalReason("");
                  setAddingSignal(false);
                }}
              >
                <select
                  value={signalStudentId}
                  onChange={(e) => setSignalStudentId(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-2 py-1.5 text-sm"
                >
                  {STUDENTS.map((s: Student) => (
                    <option key={s.id} value={s.id}>
                      {fullName(s)}
                    </option>
                  ))}
                </select>
                <Input
                  value={signalReason}
                  onChange={(e) => setSignalReason(e.target.value)}
                  placeholder="Motif du signal…"
                  className="h-8 bg-background text-sm"
                />
                <div className="flex justify-end gap-1.5">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAddingSignal(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" size="sm">
                    Ajouter
                  </Button>
                </div>
              </form>
            ) : null}

            {signals.length === 0 && manualSignals.length === 0 ? (
              <p className={WIDGET_EMPTY}>Aucun signal pour l'instant.</p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {signals.map(({ student, reason }) => (
                  <li
                    key={student.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl border border-border/60 bg-card/70 px-3 py-2 transition-colors duration-150 hover:bg-card"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[0.65rem] font-semibold text-muted-foreground">
                      {initials(student)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {fullName(student)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {reason}
                      </span>
                    </span>
                    <span className="h-2 w-2 shrink-0 rounded-full bg-danger-strong" />
                  </li>
                ))}
                {manualSignals.map((sig) => {
                  const student = STUDENTS.find((s) => s.id === sig.studentId);
                  if (!student) return null;
                  return (
                    <li
                      key={sig.id}
                      className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl border border-border/60 bg-card/70 px-3 py-2 transition-colors duration-150 hover:bg-card"
                    >
                      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[0.65rem] font-semibold text-muted-foreground">
                        {initials(student)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">
                          {fullName(student)}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {sig.reason}
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setManualSignals(removeManualSignal(sig.id))}
                        className={WIDGET_ICON_BTN}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            <Button asChild variant="outline" size="sm" className="mt-3 w-full bg-card">
              <Link to="/fluence">Voir le suivi de la classe</Link>
            </Button>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
