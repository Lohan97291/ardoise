import { createFileRoute } from "@tanstack/react-router";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { fr } from "date-fns/locale";
import {
  CalendarCheck,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Plus,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AgendaMessagingSwitch } from "@/components/ardoise/agenda-messaging-switch";
import { AppShell } from "@/components/ardoise/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMailAnalyses } from "@/hooks/use-mail-analyses";
import { addDays, formatLongDate, toISODate } from "@/lib/ardoise-data";
import {
  AGENDA_TYPE_LABEL,
  addAgendaItem,
  getAgendaItemsForDate,
  getAgendaItemsInRange,
  removeAgendaItem,
  type AgendaItem,
  type AgendaItemType,
} from "@/lib/agenda-storage";
import { getHandledMailIds } from "@/lib/mail-status-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — Ardoise" },
      {
        name: "description",
        content:
          "RDV, animations pédagogiques, mails à traiter, ponctuels : votre agenda, en vue mois ou jour par jour.",
      },
      { property: "og:title", content: "Agenda — Ardoise" },
      {
        property: "og:description",
        content: "Votre agenda enseignant : rendez-vous, animations et Google Calendar réunis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AgendaPage,
});

const today = new Date();

type GoogleEvent = {
  id: string;
  summary?: string;
  location?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  htmlLink?: string;
};

type ICloudEvent = {
  id: string;
  summary?: string;
  location?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
};

/** Codes couleur purement visuels, par type d'événement. */
const TYPE_STYLE: Record<AgendaItemType | "google", { dot: string; chip: string; rail: string }> = {
  rdv: {
    dot: "bg-primary",
    chip: "bg-primary/10 text-primary border-primary/25",
    rail: "bg-primary",
  },
  animation: {
    dot: "bg-ochre",
    chip: "bg-ochre/15 text-ochre-foreground border-ochre/35",
    rail: "bg-ochre",
  },
  mail: {
    dot: "bg-danger-strong",
    chip: "bg-danger-soft text-danger-strong border-danger-soft-border",
    rail: "bg-danger-strong",
  },
  ponctuel: {
    dot: "bg-sage",
    chip: "bg-sage/20 text-foreground border-sage/40",
    rail: "bg-sage",
  },
  autre: {
    dot: "bg-muted-foreground",
    chip: "bg-secondary text-muted-foreground border-border",
    rail: "bg-muted-foreground",
  },
  google: {
    dot: "bg-sage",
    chip: "bg-sage/15 text-foreground border-sage/35",
    rail: "bg-sage",
  },
};

function isoAtMidnight(date: Date, addOneDay = false): string {
  const value = new Date(date);
  if (addOneDay) value.setDate(value.getDate() + 1);
  value.setHours(0, 0, 0, 0);
  return value.toISOString();
}

function googleEventDateKey(event: GoogleEvent): string {
  return (event.start.date ?? event.start.dateTime ?? "").slice(0, 10);
}

function googleEventTime(event: GoogleEvent): string {
  if (event.start.date) return "Toute la journée";
  return event.start.dateTime
    ? new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(
        new Date(event.start.dateTime),
      )
    : "—";
}

function iCloudEventDateKey(event: ICloudEvent): string {
  return (event.start.date ?? event.start.dateTime ?? "").slice(0, 10);
}

function iCloudEventTime(event: ICloudEvent): string {
  if (event.start.date) return "Toute la journée";
  return event.start.dateTime
    ? new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(
        new Date(event.start.dateTime),
      )
    : "—";
}

function AgendaPage() {
  const [view, setView] = useState<"month" | "day">("month");
  const [monthAnchor, setMonthAnchor] = useState(today);
  const [date, setDate] = useState(today);
  const key = toISODate(date);
  const isToday = key === toISODate(today);

  const [items, setItems] = useState<AgendaItem[]>(() => getAgendaItemsForDate(key));
  const [adding, setAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState<AgendaItemType>("rdv");
  const [googleConnected, setGoogleConnected] = useState(false);
  const [googleConfigured, setGoogleConfigured] = useState(false);
  const [googleEvents, setGoogleEvents] = useState<GoogleEvent[]>([]);
  const [icloudEvents, setIcloudEvents] = useState<ICloudEvent[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [savingAgendaItem, setSavingAgendaItem] = useState(false);

  // ── Vue mois ────────────────────────────────────────────────────────────
  const gridStart = startOfWeek(startOfMonth(monthAnchor), { weekStartsOn: 1 });
  const gridEnd = endOfWeek(endOfMonth(monthAnchor), { weekStartsOn: 1 });
  const gridDays = useMemo(
    () => eachDayOfInterval({ start: gridStart, end: gridEnd }),
    [gridStart.getTime(), gridEnd.getTime()],
  );
  const [monthItems, setMonthItems] = useState<AgendaItem[]>([]);
  const [monthGoogleEvents, setMonthGoogleEvents] = useState<GoogleEvent[]>([]);
  const [monthIcloudEvents, setMonthIcloudEvents] = useState<ICloudEvent[]>([]);
  const [monthSyncing, setMonthSyncing] = useState(false);

  const loadMonth = useCallback(async () => {
    setMonthItems(getAgendaItemsInRange(toISODate(gridStart), toISODate(gridEnd)));
    setMonthSyncing(true);
    try {
      const status = await fetch("/api/calendar/google/status").then(
        (r) => r.json() as Promise<{ configured: boolean; connected: boolean }>,
      );
      setGoogleConfigured(status.configured);
      setGoogleConnected(status.connected);
      if (!status.connected) {
        setMonthGoogleEvents([]);
      } else {
        const response = await fetch(
          `/api/calendar/events?timeMin=${encodeURIComponent(isoAtMidnight(gridStart))}&timeMax=${encodeURIComponent(isoAtMidnight(gridEnd, true))}`,
        );
        const value = (await response.json()) as { events?: GoogleEvent[] };
        setMonthGoogleEvents(value.events ?? []);
      }
      const icloudResponse = await fetch(
        `/api/calendar/icloud/events?timeMin=${encodeURIComponent(isoAtMidnight(gridStart))}&timeMax=${encodeURIComponent(isoAtMidnight(gridEnd, true))}`,
      );
      const icloudValue = (await icloudResponse.json()) as { events?: ICloudEvent[] };
      setMonthIcloudEvents(icloudValue.events ?? []);
    } catch {
      setMonthGoogleEvents([]);
      setMonthIcloudEvents([]);
    } finally {
      setMonthSyncing(false);
    }
  }, [gridStart.getTime(), gridEnd.getTime()]);

  useEffect(() => {
    if (view === "month") void loadMonth();
  }, [view, loadMonth]);

  const itemsByDay = useMemo(() => {
    const map = new Map<
      string,
      { label: string; time?: string; kind: AgendaItemType | "google" }[]
    >();
    for (const item of monthItems) {
      const list = map.get(item.date) ?? [];
      list.push({ label: item.title, time: item.time, kind: item.type });
      map.set(item.date, list);
    }
    for (const event of monthGoogleEvents) {
      const dateKey = googleEventDateKey(event);
      if (!dateKey) continue;
      const list = map.get(dateKey) ?? [];
      list.push({
        label: event.summary || "Sans titre",
        time: event.start.dateTime ? googleEventTime(event) : undefined,
        kind: "google",
      });
      map.set(dateKey, list);
    }
    for (const event of monthIcloudEvents) {
      const dateKey = iCloudEventDateKey(event);
      if (!dateKey) continue;
      const list = map.get(dateKey) ?? [];
      list.push({
        label: event.summary || "Sans titre",
        time: event.start.dateTime ? iCloudEventTime(event) : undefined,
        kind: "google",
      });
      map.set(dateKey, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => (a.time ?? "").localeCompare(b.time ?? ""));
    }
    return map;
  }, [monthItems, monthGoogleEvents, monthIcloudEvents]);

  // ── Vue jour ────────────────────────────────────────────────────────────
  const loadGoogleEvents = useCallback(async (targetDate: Date) => {
    setSyncing(true);
    try {
      const status = await fetch("/api/calendar/google/status").then(
        (r) => r.json() as Promise<{ configured: boolean; connected: boolean }>,
      );
      setGoogleConfigured(status.configured);
      setGoogleConnected(status.connected);
      if (!status.connected) {
        setGoogleEvents([]);
      } else {
        const response = await fetch(
          `/api/calendar/events?timeMin=${encodeURIComponent(isoAtMidnight(targetDate))}&timeMax=${encodeURIComponent(isoAtMidnight(targetDate, true))}`,
        );
        const value = (await response.json()) as { events?: GoogleEvent[] };
        setGoogleEvents(value.events ?? []);
      }
      const icloudResponse = await fetch(
        `/api/calendar/icloud/events?timeMin=${encodeURIComponent(isoAtMidnight(targetDate))}&timeMax=${encodeURIComponent(isoAtMidnight(targetDate, true))}`,
      );
      const icloudValue = (await icloudResponse.json()) as { events?: ICloudEvent[] };
      setIcloudEvents(icloudValue.events ?? []);
    } catch {
      setGoogleEvents([]);
      setIcloudEvents([]);
    } finally {
      setSyncing(false);
    }
  }, []);

  const refreshAgenda = useCallback(async () => {
    if (view === "month") {
      await loadMonth();
      return;
    }

    setItems(getAgendaItemsForDate(key));
    await loadGoogleEvents(date);
  }, [date, key, loadGoogleEvents, loadMonth, view]);

  useEffect(() => {
    if (view === "day") void loadGoogleEvents(date);
  }, [view, key, loadGoogleEvents]);

  useEffect(() => {
    function handleRefresh() {
      void refreshAgenda();
    }

    window.addEventListener("focus", handleRefresh);
    window.addEventListener("storage", handleRefresh);
    return () => {
      window.removeEventListener("focus", handleRefresh);
      window.removeEventListener("storage", handleRefresh);
    };
  }, [refreshAgenda]);

  const { data: mailAnalyses = [] } = useMailAnalyses();
  const mailCount = mailAnalyses.filter(
    (mail) => !new Set(getHandledMailIds()).has(mail.externalId),
  ).length;

  const openDay = (d: Date) => {
    setDate(d);
    setItems(getAgendaItemsForDate(toISODate(d)));
    setAdding(false);
    setView("day");
  };

  const goToDay = (d: Date) => {
    setDate(d);
    setItems(getAgendaItemsForDate(toISODate(d)));
    setAdding(false);
  };

  const dayCount = items.length + googleEvents.length + icloudEvents.length;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {/* ── En-tête : titre + navigation ──────────────────────────────── */}
        <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="eyebrow">Ma journée · Agenda</p>
            <h1 className="mt-1 flex items-center gap-2.5 text-2xl font-bold capitalize sm:text-3xl">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                <CalendarClock className="h-5 w-5" />
              </span>
              <span className="truncate">
                {view === "month"
                  ? format(monthAnchor, "MMMM yyyy", { locale: fr })
                  : formatLongDate(date)}
              </span>
            </h1>
            <AgendaMessagingSwitch active="agenda" mailCount={mailCount} className="mt-3" />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Button
              size="lg"
              className="rounded-full px-5 font-semibold shadow-card"
              aria-label="Ajouter rapidement un rendez-vous ou une tâche à l'agenda"
              onClick={() => {
                setView("day");
                setDate(today);
                setItems(getAgendaItemsForDate(toISODate(today)));
                setAdding(true);
              }}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter vite
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-5 font-semibold shadow-card"
              onClick={() => void refreshAgenda()}
              disabled={syncing || monthSyncing}
            >
              <RefreshCw
                className={cn("mr-1.5 h-4 w-4", (syncing || monthSyncing) && "animate-spin")}
              />
              Actualiser
            </Button>
            <div className="flex items-center rounded-full border border-border bg-card p-0.5 shadow-card">
              <button
                type="button"
                onClick={() => setView("month")}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200",
                  view === "month"
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Mois
              </button>
              <button
                type="button"
                onClick={() => {
                  setDate(today);
                  setItems(getAgendaItemsForDate(toISODate(today)));
                  setView("day");
                }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200",
                  view === "day"
                    ? "bg-primary text-primary-foreground shadow-card"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                Jour
              </button>
            </div>

            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-0.5 shadow-card">
              {view === "month" ? (
                <>
                  <button
                    type="button"
                    aria-label="Mois précédent"
                    onClick={() => setMonthAnchor((m) => addMonths(m, -1))}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMonthAnchor(today)}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    type="button"
                    aria-label="Mois suivant"
                    onClick={() => setMonthAnchor((m) => addMonths(m, 1))}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    aria-label="Jour précédent"
                    onClick={() => goToDay(addDays(date, -1))}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToDay(today)}
                    disabled={isToday}
                    className="rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-40 disabled:hover:bg-transparent"
                  >
                    Aujourd'hui
                  </button>
                  <button
                    type="button"
                    aria-label="Jour suivant"
                    onClick={() => goToDay(addDays(date, 1))}
                    className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {googleConfigured && !googleConnected ? (
              <Button variant="outline" size="sm" className="rounded-full" asChild>
                <a href="/api/calendar/google/connect">
                  <CalendarCheck className="mr-1.5 h-4 w-4 text-sage" />
                  Connecter Google
                </a>
              </Button>
            ) : googleConnected ? (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => void (view === "month" ? loadMonth() : loadGoogleEvents(date))}
                disabled={syncing || monthSyncing}
              >
                <RefreshCw
                  className={cn("mr-1.5 h-4 w-4", (syncing || monthSyncing) && "animate-spin")}
                />
                Synchroniser
              </Button>
            ) : null}
          </div>
        </header>

        {/* ── Légende des types ─────────────────────────────────────────── */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Ajouté dans Ardoise
          </span>
          {(Object.keys(AGENDA_TYPE_LABEL) as AgendaItemType[]).map((type) => (
            <span
              key={type}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className={cn("h-2 w-2 rounded-full", TYPE_STYLE[type].dot)} />
              {AGENDA_TYPE_LABEL[type]}
            </span>
          ))}
          {googleConnected ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span className={cn("h-2 w-2 rounded-full", TYPE_STYLE.google.dot)} />
              Synchronisé depuis Google Calendar
            </span>
          ) : null}
        </div>

        {!googleConfigured ? (
          <p className="mt-3 rounded-xl border border-dashed border-border bg-secondary/40 px-3 py-2 text-xs text-muted-foreground">
            Google Calendar sera disponible après l'ajout des identifiants OAuth dans le serveur
            Ardoise.
          </p>
        ) : null}

        {view === "month" ? (
          /* ── Vue mois ──────────────────────────────────────────────── */
          <section className="card-surface mt-5 overflow-hidden shadow-card">
            <div className="grid grid-cols-7 border-b border-border bg-secondary/50 text-center text-[0.68rem] font-semibold uppercase tracking-widest text-muted-foreground">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((d) => (
                <div key={d} className="py-2.5">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {gridDays.map((d) => {
                const dKey = toISODate(d);
                const inMonth = isSameMonth(d, monthAnchor);
                const isTodayCell = isSameDay(d, today);
                const weekend = d.getDay() === 0 || d.getDay() === 6;
                const dayItems = itemsByDay.get(dKey) ?? [];
                const preview = dayItems.slice(0, 3);
                const overflow = dayItems.length - preview.length;
                return (
                  <button
                    key={dKey}
                    type="button"
                    onClick={() => openDay(d)}
                    className={cn(
                      "group relative flex min-h-28 flex-col items-stretch gap-1 border-b border-r border-border/60 p-1.5 text-left transition-colors duration-150 hover:bg-secondary/60",
                      weekend && inMonth && "bg-secondary/25",
                      !inMonth && "bg-secondary/15",
                      isTodayCell && "bg-primary/[0.04]",
                    )}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={cn(
                          "grid h-6 min-w-6 place-items-center rounded-full px-1 text-xs font-semibold tabular-nums",
                          isTodayCell
                            ? "bg-primary text-primary-foreground shadow-card"
                            : inMonth
                              ? "text-foreground"
                              : "text-muted-foreground/45",
                        )}
                      >
                        {format(d, "d")}
                      </span>
                      {dayItems.length > 0 ? (
                        <span className="rounded-full bg-card px-1.5 text-[0.6rem] font-semibold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                          {dayItems.length}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      {preview.map((it, i) => (
                        <span
                          key={i}
                          className={cn(
                            "flex min-w-0 items-center gap-1 rounded-md border px-1 py-0.5 text-[0.65rem] font-medium",
                            TYPE_STYLE[it.kind].chip,
                            !inMonth && "opacity-60",
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 shrink-0 rounded-full",
                              TYPE_STYLE[it.kind].dot,
                            )}
                          />
                          {it.time ? (
                            <span className="shrink-0 tabular-nums opacity-80">{it.time}</span>
                          ) : null}
                          <span className="truncate">{it.label}</span>
                        </span>
                      ))}
                      {overflow > 0 ? (
                        <span className="px-1 text-[0.65rem] font-semibold text-muted-foreground">
                          +{overflow} autre{overflow > 1 ? "s" : ""}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ) : (
          /* ── Vue jour ──────────────────────────────────────────────── */
          <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <section className="card-surface p-4 shadow-card sm:p-5">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <div className="min-w-0">
                  <p className="panel-heading text-sm">Déroulé de la journée</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {dayCount === 0
                      ? "Rien de prévu ce jour-là."
                      : `${dayCount} événement${dayCount > 1 ? "s" : ""}${
                          googleEvents.length > 0
                            ? ` · dont ${googleEvents.length} synchronisé${googleEvents.length > 1 ? "s" : ""} Google`
                            : ""
                        }`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAdding((v) => !v)}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-card transition-all duration-200 hover:-translate-y-px"
                  aria-label="Ajouter un élément"
                  title="Ajouter un élément"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter
                </button>
              </div>

              {items.length > 0 ? (
                <ol className="mt-3 space-y-1.5">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="group relative flex items-center gap-3 overflow-hidden rounded-xl border border-border/70 bg-card px-3 py-2.5 transition-all duration-150 hover:-translate-y-px hover:shadow-card"
                    >
                      <span
                        className={cn(
                          "absolute inset-y-0 left-0 w-1 rounded-r-full",
                          TYPE_STYLE[item.type].rail,
                        )}
                      />
                      <span className="ml-1 w-12 shrink-0 text-sm font-semibold tabular-nums text-foreground">
                        {item.time ?? "—"}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{item.title}</span>
                        {item.note ? (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.note}
                          </span>
                        ) : null}
                        <span
                          className={cn(
                            "mt-0.5 inline-flex rounded-full border px-1.5 text-[0.6rem] font-semibold uppercase tracking-wide",
                            TYPE_STYLE[item.type].chip,
                          )}
                        >
                          {AGENDA_TYPE_LABEL[item.type]}
                        </span>
                      </span>
                      {item.source !== "birthday" ? (
                        <button
                          type="button"
                          onClick={() => setItems(removeAgendaItem(item.id, key))}
                          className="shrink-0 rounded-md p-1.5 text-muted-foreground opacity-0 transition-colors group-hover:opacity-100 hover:bg-danger-soft hover:text-danger-strong"
                          aria-label="Supprimer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-4 grid place-items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-8 text-center">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-card text-muted-foreground shadow-card">
                    <CalendarClock className="h-5 w-5" />
                  </span>
                  <p className="text-sm font-medium text-muted-foreground">
                    Aucun élément personnel
                  </p>
                  <p className="max-w-xs text-xs text-muted-foreground/80">
                    RDV parents, animation pédagogique, point relevé dans un mail… ajoutez-le ici.
                  </p>
                </div>
              )}
            </section>

            <div className="grid gap-4">
              {adding ? (
                <form
                  className="card-surface space-y-2.5 p-4 shadow-card"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const title = newTitle.trim();
                    if (!title) return;

                    setSavingAgendaItem(true);

                    setItems(
                      addAgendaItem({
                        date: key,
                        time: newTime || undefined,
                        title,
                        type: newType,
                      }),
                    );

                    try {
                      if (googleConnected) {
                        const response = await fetch("/api/calendar/events", {
                          method: "POST",
                          headers: { "content-type": "application/json" },
                          body: JSON.stringify({
                            summary: title,
                            description: `Créé depuis l'agenda Ardoise.\nType : ${AGENDA_TYPE_LABEL[newType]}.`,
                            date: key,
                            time: newTime || null,
                            timeZone: "Europe/Paris",
                          }),
                        });

                        if (!response.ok) {
                          throw new Error("Google Calendar indisponible");
                        }

                        await loadGoogleEvents(date);
                        toast.success("Ajouté dans Ardoise et Google Calendar.");
                      } else {
                        toast.success("Ajouté dans l'agenda Ardoise.");
                      }
                    } catch {
                      toast.error(
                        "L'élément a bien été enregistré dans Ardoise, mais pas dans Google Calendar.",
                      );
                    } finally {
                      setSavingAgendaItem(false);
                      setNewTitle("");
                      setNewTime("");
                      setAdding(false);
                    }
                  }}
                >
                  <p className="panel-heading text-sm">Nouvel élément</p>
                  <div className="flex gap-1.5">
                    <Input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="h-9 w-28 shrink-0 bg-card text-sm"
                    />
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as AgendaItemType)}
                      className="w-full rounded-md border border-input bg-card px-2 py-1.5 text-sm"
                    >
                      {Object.entries(AGENDA_TYPE_LABEL).map(([k, label]) => (
                        <option key={k} value={k}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Ex. : RDV parents Lucas, animation pédagogique circo…"
                    className="h-9 bg-card text-sm"
                  />
                  <div className="flex justify-end gap-1.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={savingAgendaItem}
                      onClick={() => setAdding(false)}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" size="sm" disabled={savingAgendaItem}>
                      {savingAgendaItem ? "Ajout…" : "Ajouter"}
                    </Button>
                  </div>
                </form>
              ) : null}

              {googleConfigured ? (
                <section className="card-surface p-4 shadow-card">
                  <p className="flex items-center gap-1.5 border-b border-border pb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-sage/20 text-foreground">
                      <CalendarCheck className="h-3.5 w-3.5" />
                    </span>
                    Google Calendar
                  </p>
                  {googleEvents.length > 0 ? (
                    <ol className="mt-2.5 space-y-1.5">
                      {googleEvents.map((event) => (
                        <li
                          key={event.id}
                          className="flex items-center gap-2.5 rounded-xl border border-sage/30 bg-sage/10 px-2.5 py-2"
                        >
                          <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                            {googleEventTime(event)}
                          </span>
                          <span className="min-w-0 flex-1 truncate text-sm font-medium">
                            {event.summary || "Sans titre"}
                          </span>
                          {event.htmlLink ? (
                            <a
                              href={event.htmlLink}
                              target="_blank"
                              rel="noreferrer"
                              className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-card hover:text-primary"
                              aria-label="Ouvrir dans Google Calendar"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ) : null}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="mt-2.5 text-xs text-muted-foreground">
                      {googleConnected
                        ? "Aucun événement Google ce jour-là."
                        : "Connectez votre agenda Google pour voir vos événements ici."}
                    </p>
                  )}
                </section>
              ) : null}
              {icloudEvents.length > 0 ? (
                <section className="card-surface p-4 shadow-card">
                  <p className="flex items-center gap-1.5 border-b border-border pb-2.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-primary/10 text-primary">
                      <CalendarCheck className="h-3.5 w-3.5" />
                    </span>
                    Calendrier iCloud
                  </p>
                  <ol className="mt-2.5 space-y-1.5">
                    {icloudEvents.map((event) => (
                      <li
                        key={event.id}
                        className="flex items-center gap-2.5 rounded-xl border border-primary/20 bg-primary/5 px-2.5 py-2"
                      >
                        <span className="shrink-0 text-xs font-semibold tabular-nums text-muted-foreground">
                          {iCloudEventTime(event)}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">
                          {event.summary || "Sans titre"}
                        </span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
