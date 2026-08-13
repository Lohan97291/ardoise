import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BellRing,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Clock3,
  ListTodo,
  Maximize,
  Minimize,
  MoonStar,
  SunMedium,
  Target,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { SUBJECT_BAND } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import {
  SUBJECTS,
  formatLongDate,
  getPrepSheet,
  toISODate,
  type PrepPhase,
  type Session,
} from "@/lib/ardoise-data";
import { getCustomPhases } from "@/lib/custom-phases-storage";
import { getCustomSessionPrep } from "@/lib/custom-session-prep-storage";
import {
  getSessionStatus,
  nextSessionStatus,
  setSessionStatus,
} from "@/lib/dashboard-storage";
import { readJournalDays } from "@/lib/journal-storage";
import {
  getPhaseStatuses,
  nextPhaseStatus,
  setPhaseStatus,
  type PhaseStatus,
} from "@/lib/session-phases-storage";
import { getSessionExtras } from "@/lib/custom-session-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compagnon-classe")({
  head: () => ({
    meta: [
      { title: "Mode classe — Ardoise" },
      {
        name: "description",
        content:
          "Vue mobile compagnon pour la classe : séance en cours, temps restant, fiche de prep et priorités du jour.",
      },
    ],
  }),
  component: CompanionClassPage,
});

const today = new Date();

const PHASE_STYLE: Record<PhaseStatus, string> = {
  not_started: "border-border bg-background text-muted-foreground",
  in_progress: "border-amber-200 bg-amber-50 text-amber-900",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-900",
};

const PHASE_LABEL: Record<PhaseStatus, string> = {
  not_started: "À faire",
  in_progress: "En cours",
  completed: "Fait",
};

function currentPhaseIndexFromStatuses(phases: PrepPhase[], statuses: Record<number, PhaseStatus>) {
  if (phases.length === 0) return -1;
  const activeIndex = phases.findIndex((_, index) => statuses[index] === "in_progress");
  if (activeIndex !== -1) return activeIndex;
  const nextIndex = phases.findIndex((_, index) => (statuses[index] ?? "not_started") === "not_started");
  if (nextIndex !== -1) return nextIndex;
  return phases.length - 1;
}

function toMinutes(value?: string | null): number | null {
  if (!value) return null;
  const [hours, minutes] = value.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function formatTime(value: Date): string {
  return value.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
}

function formatDuration(value: number): string {
  const rounded = Math.max(0, Math.round(value));
  if (rounded >= 60) {
    const hours = Math.floor(rounded / 60);
    const minutes = rounded % 60;
    return minutes ? `${hours}h${String(minutes).padStart(2, "0")}` : `${hours}h`;
  }
  return `${rounded} min`;
}

function currentSessionIndex(sessions: Session[], nowMinutes: number): number {
  const activeIndex = sessions.findIndex((session) => {
    const start = toMinutes(session.start);
    const end = toMinutes(session.end);
    return start !== null && end !== null && nowMinutes >= start && nowMinutes < end;
  });
  if (activeIndex !== -1) return activeIndex;

  const upcomingIndex = sessions.findIndex((session) => {
    const start = toMinutes(session.start);
    return start !== null && start > nowMinutes;
  });
  if (upcomingIndex !== -1) return upcomingIndex;

  return Math.max(0, sessions.length - 1);
}

function mergeUnique(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function resolveSessionPrep(session: Session) {
  const sheet = getPrepSheet(session.prepSheetId);
  const customPrep = getCustomSessionPrep(session.id);
  const customPhases = getCustomPhases(session.id);
  const extras = getSessionExtras(session.id);

  const phases: PrepPhase[] =
    sheet?.phases?.length ? sheet.phases : customPhases.length ? customPhases : [];

  const material = mergeUnique([
    ...(sheet?.material ?? []),
    ...customPrep.materialSuggestions,
    ...extras.material,
  ]);
  const photocopies = mergeUnique([
    ...(sheet?.photocopies ?? []),
    ...customPrep.photocopySuggestions,
    ...extras.photocopies,
  ]);

  return {
    objective: customPrep.objective || sheet?.objective || "",
    competence: customPrep.competence || sheet?.competence || "",
    evaluation: customPrep.evaluation || "",
    phases,
    material,
    photocopies,
  };
}

function CompanionClassPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLabel, setTimeLabel] = useState("");
  const [nowMinutes, setNowMinutes] = useState<number | null>(null);
  const [followNow, setFollowNow] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [phaseStatusVersion, setPhaseStatusVersion] = useState(0);
  const [sessionStatusVersion, setSessionStatusVersion] = useState(0);
  const [focusMode, setFocusMode] = useState(false);
  const [keepScreenAwake, setKeepScreenAwake] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);
  const wakeLockRef = useRef<{ release?: () => Promise<void> } | null>(null);
  const alertKeysRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const now = new Date();
      setTimeLabel(formatTime(now));
      setNowMinutes(now.getHours() * 60 + now.getMinutes() + now.getSeconds() / 60);
    };
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);

  const todayKey = toISODate(today);
  const sessions = useMemo(() => {
    if (!mounted) return [] as Session[];
    return (readJournalDays()[todayKey] ?? []).filter((session) => session.subject !== "pause");
  }, [mounted, todayKey, phaseStatusVersion, sessionStatusVersion]);

  useEffect(() => {
    if (nowMinutes === null || sessions.length === 0 || !followNow) return;
    setSelectedIndex(currentSessionIndex(sessions, nowMinutes));
  }, [followNow, nowMinutes, sessions]);

  useEffect(() => {
    async function syncWakeLock() {
      if (!keepScreenAwake || typeof navigator === "undefined") {
        if (wakeLockRef.current?.release) {
          await wakeLockRef.current.release().catch(() => undefined);
          wakeLockRef.current = null;
        }
        return;
      }

      const wakeLockApi = (navigator as Navigator & {
        wakeLock?: { request: (type: "screen") => Promise<{ release: () => Promise<void> }> };
      }).wakeLock;

      if (!wakeLockApi?.request) return;

      try {
        wakeLockRef.current = await wakeLockApi.request("screen");
      } catch {
        wakeLockRef.current = null;
      }
    }

    void syncWakeLock();

    return () => {
      if (wakeLockRef.current?.release) {
        void wakeLockRef.current.release().catch(() => undefined);
        wakeLockRef.current = null;
      }
    };
  }, [keepScreenAwake]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (typeof document === "undefined") return;
      setFullscreenEnabled(Boolean(document.fullscreenElement));
    };

    onFullscreenChange();
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const currentSession = sessions[selectedIndex] ?? null;
  const nextSession = sessions[selectedIndex + 1] ?? null;
  const previousSession = sessions[selectedIndex - 1] ?? null;
  const prep = currentSession ? resolveSessionPrep(currentSession) : null;
  const phaseStatuses = currentSession ? getPhaseStatuses(currentSession.id) : {};
  const sessionStatus = currentSession ? getSessionStatus(currentSession.id) : "not_started";
  const activePhaseIndex = prep ? currentPhaseIndexFromStatuses(prep.phases, phaseStatuses) : -1;
  const activePhase =
    prep && activePhaseIndex >= 0 && activePhaseIndex < prep.phases.length
      ? prep.phases[activePhaseIndex]
      : null;

  const timer =
    currentSession && nowMinutes !== null
      ? (() => {
          const start = toMinutes(currentSession.start);
          const end = toMinutes(currentSession.end);
          if (start === null || end === null || end <= start) return null;
          return {
            before: nowMinutes < start,
            after: nowMinutes >= end,
            startsIn: Math.max(0, start - nowMinutes),
            remaining: Math.max(0, end - nowMinutes),
            elapsed: Math.min(end - start, Math.max(0, nowMinutes - start)),
            total: end - start,
          };
        })()
      : null;

  useEffect(() => {
    if (!currentSession || !timer || timer.before || timer.after) return;

    const thresholds = [5, 2] as const;

    thresholds.forEach((threshold) => {
      const alertKey = `${currentSession.id}:${threshold}`;
      if (timer.remaining <= threshold && !alertKeysRef.current.has(alertKey)) {
        alertKeysRef.current.add(alertKey);
        toast(`Il reste ${threshold} min`, {
          description: `${currentSession.title} · ${currentSession.end}`,
        });

        if (focusMode && typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(threshold === 5 ? [50] : [60, 60, 60]);
        }
      }
    });
  }, [currentSession, timer, focusMode]);

  const dayPriorities = useMemo(() => {
    if (!currentSession) return [];
    const prioritySessions = [currentSession, nextSession].filter(Boolean) as Session[];
    const items = prioritySessions.flatMap((session) => {
      const resolved = resolveSessionPrep(session);
      return [
        ...resolved.photocopies.map((item) => ({
          label: item,
          sessionTitle: session.title,
          tone: "photocopy" as const,
        })),
        ...resolved.material.map((item) => ({
          label: item,
          sessionTitle: session.title,
          tone: "material" as const,
        })),
      ];
    });
    return items.slice(0, focusMode ? 3 : 6);
  }, [currentSession, nextSession, focusMode]);

  function goToSession(index: number) {
    setFollowNow(false);
    setSelectedIndex(Math.max(0, Math.min(sessions.length - 1, index)));
  }

  function togglePhase(index: number) {
    if (!currentSession) return;
    const current = phaseStatuses[index] ?? "not_started";
    setPhaseStatus(currentSession.id, index, nextPhaseStatus(current));
    setPhaseStatusVersion((value) => value + 1);
  }

  function setExactPhaseStatus(index: number, status: PhaseStatus) {
    if (!currentSession) return;
    setPhaseStatus(currentSession.id, index, status);
    setPhaseStatusVersion((value) => value + 1);
  }

  function advancePhase() {
    if (!prep || activePhaseIndex < 0) return;
    setExactPhaseStatus(activePhaseIndex, "completed");
    const nextIndex = activePhaseIndex + 1;
    if (nextIndex < prep.phases.length) {
      setExactPhaseStatus(nextIndex, "in_progress");
    }
  }

  function goToPreviousPhase() {
    if (!prep || activePhaseIndex <= 0) return;
    setExactPhaseStatus(activePhaseIndex, "not_started");
    setExactPhaseStatus(activePhaseIndex - 1, "in_progress");
  }

  function toggleSessionStatus() {
    if (!currentSession) return;
    setSessionStatus(currentSession.id, nextSessionStatus(sessionStatus));
    setSessionStatusVersion((value) => value + 1);
  }

  function goToNextSession() {
    if (!currentSession || selectedIndex >= sessions.length - 1) return;
    if (sessionStatus !== "completed") {
      setSessionStatus(currentSession.id, "completed");
      setSessionStatusVersion((value) => value + 1);
    }
    goToSession(selectedIndex + 1);
  }

  async function toggleFullscreen() {
    if (typeof document === "undefined") return;
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      return;
    }
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,oklch(0.97_0.02_245),transparent_35%),linear-gradient(180deg,oklch(0.995_0.005_250),oklch(0.975_0.01_250))] px-4 py-5 pb-32 text-foreground sm:px-6">
      <div className={cn("mx-auto flex max-w-md flex-col gap-4", focusMode && "max-w-lg")}>
        <header className="rounded-[28px] border border-border/70 bg-background/90 p-4 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.4)] backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Mode classe
              </p>
              <h1 className="mt-1 text-xl font-bold tracking-tight">
                {focusMode ? "Télécommande de classe" : "Compagnon mobile"}
              </h1>
              <p className="mt-1 text-sm capitalize text-muted-foreground">
                {formatLongDate(today)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-2xl font-bold tracking-tight">{timeLabel || "—"}</p>
              <Button asChild variant="ghost" size="sm" className="mt-1 h-8 rounded-full px-3">
                <Link to="/">
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Accueil
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {sessions.length === 0 ? (
          <section className="rounded-[28px] border border-dashed border-border bg-background/85 p-6 text-center shadow-sm">
            <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-3 text-base font-semibold">Aucune séance aujourd’hui</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ouvre d’abord le cahier journal pour préparer ta journée.
            </p>
            <Button asChild className="mt-4 rounded-full">
              <Link to="/journal">Ouvrir le cahier journal</Link>
            </Button>
          </section>
        ) : (
          <>
            <section className="rounded-[30px] border border-primary/15 bg-background/95 p-5 shadow-[0_26px_60px_-34px_rgba(15,23,42,0.45)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    {focusMode ? "En cours" : "Priorité du moment"}
                  </p>
                  <p className={cn("mt-1 font-bold tracking-tight", focusMode ? "text-2xl" : "text-lg")}>
                    {currentSession?.title ?? "Aucune séance"}
                  </p>
                </div>
                {currentSession ? (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold",
                      SUBJECT_BAND[currentSession.subject],
                    )}
                  >
                    {SUBJECTS[currentSession.subject].label}
                  </span>
                ) : null}
              </div>

              <div className={cn("mt-4 grid gap-3", focusMode ? "grid-cols-1" : "grid-cols-2")}>
                <div className="rounded-2xl border border-border bg-secondary/25 p-3">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    Créneau
                  </p>
                  <p className={cn("mt-1 font-mono font-bold", focusMode ? "text-2xl" : "text-lg")}>
                    {currentSession?.start} → {currentSession?.end}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/25 p-3">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    Temps restant
                  </p>
                  <p className={cn("mt-1 font-mono font-bold", focusMode ? "text-5xl leading-none" : "text-lg")}>
                    {!timer
                      ? "—"
                      : timer.before
                        ? `dans ${formatDuration(timer.startsIn)}`
                        : timer.after
                          ? "terminée"
                          : formatDuration(timer.remaining)}
                  </p>
                </div>
              </div>

              {timer && !timer.before ? (
                <div className="mt-4">
                  <div className="h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.round((timer.elapsed / timer.total) * 100)}%` }}
                    />
                  </div>
                  <p className={cn("mt-2 text-muted-foreground", focusMode ? "text-sm" : "text-xs")}>
                    {formatDuration(timer.elapsed)} écoulées sur {formatDuration(timer.total)}
                  </p>
                  {timer.remaining <= 5 && !timer.after ? (
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900">
                      <BellRing className="h-3.5 w-3.5" />
                      {timer.remaining <= 2 ? "Plus que 2 min" : "Moins de 5 min"}
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  disabled={selectedIndex <= 0}
                  onClick={() => goToSession(selectedIndex - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground disabled:opacity-35"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 flex-1 rounded-full"
                  onClick={() => {
                    if (nowMinutes === null) return;
                    setFollowNow(true);
                    setSelectedIndex(currentSessionIndex(sessions, nowMinutes));
                  }}
                >
                  Recentrer sur maintenant
                </Button>
                <button
                  type="button"
                  disabled={selectedIndex >= sessions.length - 1}
                  onClick={() => goToSession(selectedIndex + 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground disabled:opacity-35"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </section>

            <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">Séance suivante</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {nextSession
                      ? `${nextSession.start} · ${nextSession.title}`
                      : "Pas d’autre séance après celle-ci."}
                  </p>
                </div>
                {nextSession ? (
                  <button
                    type="button"
                    onClick={() => goToSession(selectedIndex + 1)}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                  >
                    Ouvrir
                  </button>
                ) : null}
              </div>
            </section>

            {!focusMode ? (
              <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Statut de la séance</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fais avancer la séance sans ouvrir tout le journal.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleSessionStatus}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold",
                      PHASE_STYLE[sessionStatus],
                    )}
                  >
                    {PHASE_LABEL[sessionStatus]}
                  </button>
                </div>
              </section>
            ) : null}

            {prep ? (
              <>
                {focusMode && activePhase ? (
                  <section className="rounded-[28px] border border-primary/15 bg-background/92 p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                          Phase du moment
                        </p>
                        <p className="mt-1 text-lg font-bold text-foreground">
                          {activePhase.title}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Étape {activePhaseIndex + 1} sur {prep.phases.length}
                          {activePhase.duration ? ` · ${activePhase.duration}` : ""}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-semibold",
                          PHASE_STYLE[phaseStatuses[activePhaseIndex] ?? "not_started"],
                        )}
                      >
                        {PHASE_LABEL[phaseStatuses[activePhaseIndex] ?? "not_started"]}
                      </span>
                    </div>
                    <p className="mt-3 text-base leading-7 text-foreground">{activePhase.detail}</p>
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-2xl"
                        disabled={activePhaseIndex <= 0}
                        onClick={goToPreviousPhase}
                      >
                        Précédente
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-11 rounded-2xl"
                        onClick={() => togglePhase(activePhaseIndex)}
                      >
                        Statut
                      </Button>
                      <Button
                        type="button"
                        className="h-11 rounded-2xl"
                        onClick={advancePhase}
                      >
                        Suivante
                      </Button>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {prep.phases.map((phase, index) => (
                        <button
                          key={`${phase.title}-focus-${index}`}
                          type="button"
                          onClick={() => setExactPhaseStatus(index, "in_progress")}
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                            index === activePhaseIndex
                              ? "border-primary bg-primary/10 text-primary"
                              : PHASE_STYLE[phaseStatuses[index] ?? "not_started"],
                          )}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
                      <Target className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">Repères pédagogiques</p>
                      {prep.objective ? (
                        <p className="mt-2 text-sm leading-6 text-foreground">{prep.objective}</p>
                      ) : null}
                      {prep.competence ? (
                        <p className="mt-2 text-sm text-muted-foreground">{prep.competence}</p>
                      ) : null}
                      {prep.evaluation && !focusMode ? (
                        <p className="mt-2 text-sm text-muted-foreground">
                          Évaluation : {prep.evaluation}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </section>

                <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">Déroulé utile</p>
                  </div>
                  {prep.phases.length > 0 ? (
                    <ol className="mt-3 space-y-2">
                      {prep.phases.map((phase, index) => {
                        const status = phaseStatuses[index] ?? "not_started";
                        return (
                          <li
                            key={`${phase.title}-${index}`}
                            className="rounded-2xl border border-border bg-secondary/20 p-3"
                          >
                            <div className="flex items-start gap-3">
                              <button
                                type="button"
                                onClick={() => togglePhase(index)}
                                className={cn(
                                  "mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold",
                                  PHASE_STYLE[status],
                                )}
                              >
                                <Check className="h-3.5 w-3.5" />
                              </button>
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-semibold text-foreground">
                                    {phase.title}
                                  </p>
                                  {phase.duration ? (
                                    <span className="rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground">
                                      {phase.duration}
                                    </span>
                                  ) : null}
                                </div>
                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                  {phase.detail}
                                </p>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Pas de déroulé détaillé enregistré pour cette séance.
                    </p>
                  )}
                </section>

                <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <ListTodo className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      {focusMode ? "À préparer" : "À préparer maintenant"}
                    </p>
                  </div>
                  {dayPriorities.length > 0 ? (
                    <ul className="mt-3 space-y-2">
                      {dayPriorities.map((item, index) => (
                        <li
                          key={`${item.sessionTitle}-${item.label}-${index}`}
                          className="rounded-2xl border border-border bg-secondary/20 px-3 py-2.5"
                        >
                          <div className="flex items-start gap-2">
                            <span
                              className={cn(
                                "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                                item.tone === "photocopy" ? "bg-primary" : "bg-amber-500",
                              )}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-foreground">{item.label}</p>
                              {!focusMode ? (
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {item.sessionTitle}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">
                      Rien d’urgent à préparer pour la séance en cours et la suivante.
                    </p>
                  )}
                </section>
              </>
            ) : null}

            {!focusMode ? (
              <section className="rounded-[28px] border border-border/70 bg-background/92 p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Accès rapides</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Ouvre seulement ce dont tu as besoin pendant la classe.
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="justify-start rounded-2xl">
                    <Link to="/journal">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Journal
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start rounded-2xl">
                    <Link to="/ressources">
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Fiche de prep
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start rounded-2xl">
                    <Link to="/correction-rapide">
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Corriger
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="justify-start rounded-2xl">
                    <Link to="/agenda">
                      <Clock3 className="mr-2 h-4 w-4" />
                      Agenda
                    </Link>
                  </Button>
                </div>
              </section>
            ) : null}

            {!focusMode ? (
              <section className="rounded-[24px] border border-border/60 bg-background/75 p-3 shadow-sm">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span>
                    {previousSession
                      ? `Avant : ${previousSession.start} · ${previousSession.title}`
                      : "Début de journée"}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" />
                    {selectedIndex + 1}/{sessions.length}
                  </span>
                </div>
              </section>
            ) : null}
          </>
        )}
      </div>

      {sessions.length > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-20 px-4 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3 sm:px-6">
          <div className="mx-auto flex max-w-md flex-col gap-2 rounded-[28px] border border-border/80 bg-background/95 p-3 shadow-[0_-10px_35px_-18px_rgba(15,23,42,0.35)] backdrop-blur">
            <Button
              type="button"
              size="lg"
              disabled={selectedIndex >= sessions.length - 1}
              onClick={goToNextSession}
              className="h-14 rounded-2xl text-base font-semibold shadow-sm"
            >
              <ArrowRight className="mr-2 h-5 w-5" />
              Séance suivante
            </Button>

            <div className="grid grid-cols-4 gap-2">
              <Button
                type="button"
                variant={focusMode ? "default" : "outline"}
                className="rounded-2xl px-2 text-xs"
                onClick={() => setFocusMode((value) => !value)}
              >
                {focusMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                <span className="ml-1">Focus</span>
              </Button>
              <Button
                type="button"
                variant={keepScreenAwake ? "default" : "outline"}
                className="rounded-2xl px-2 text-xs"
                onClick={() => setKeepScreenAwake((value) => !value)}
              >
                Écran
              </Button>
              <Button
                type="button"
                variant={fullscreenEnabled ? "default" : "outline"}
                className="rounded-2xl px-2 text-xs"
                onClick={() => void toggleFullscreen()}
              >
                {fullscreenEnabled ? (
                  <Minimize className="mr-1 h-4 w-4" />
                ) : (
                  <Maximize className="mr-1 h-4 w-4" />
                )}
                Plein
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl px-2 text-xs"
                onClick={() => {
                  if (nowMinutes === null) return;
                  setFollowNow(true);
                  setSelectedIndex(currentSessionIndex(sessions, nowMinutes));
                }}
              >
                Maintenant
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
