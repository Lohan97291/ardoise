import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  CalendarClock,
  CalendarPlus,
  Check,
  ChevronDown,
  ChevronUp,
  CornerUpLeft,
  Inbox,
  Mail,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AgendaMessagingSwitch } from "@/components/ardoise/agenda-messaging-switch";
import { AppShell } from "@/components/ardoise/app-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMailAnalyses } from "@/hooks/use-mail-analyses";
import { addAgendaItem, getAgendaItemsForDate } from "@/lib/agenda-storage";
import { toISODate } from "@/lib/ardoise-data";
import { getHandledMailIds, toggleMailHandled } from "@/lib/mail-status-storage";
import { cn } from "@/lib/utils";
import type { MailAnalysis, MailDeadline, MailPriority } from "@/lib/server/mail-types";

type AgendaSuggestion = {
  title: string;
  date: string;
  time?: string;
  type: "rdv" | "mail" | "ponctuel";
  reason: string;
  tone: "rdv" | "rappel";
};

export const Route = createFileRoute("/messagerie")({
  component: MessagingPage,
  head: () => ({
    meta: [
      { title: "Messagerie — mails analysés | Ardoise" },
      {
        name: "description",
        content:
          "Consultez les mails académiques analysés : priorité, résumé, actions et échéances à ajouter à l'agenda de la classe.",
      },
      { property: "og:title", content: "Messagerie — mails analysés | Ardoise" },
      {
        property: "og:description",
        content:
          "Priorité, résumé, actions et échéances de vos mails académiques, en un coup d'œil.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const MAILBOX_LABEL: Record<MailAnalysis["mailboxLabel"], string> = {
  hotmail: "Hotmail",
  "ac-versailles": "Académique (ac-versailles)",
  inconnue: "Source inconnue",
};

const PRIORITY_STYLE: Record<MailPriority, string> = {
  low: "border-border/70 bg-secondary text-muted-foreground",
  normal: "border-border/70 bg-secondary text-muted-foreground",
  important: "border-ochre/40 bg-ochre/20 text-ochre-foreground",
  urgent: "border-danger-soft-border bg-danger-soft text-danger-strong",
};

const PRIORITY_BAR: Record<MailPriority, string> = {
  low: "bg-border",
  normal: "bg-border",
  important: "bg-ochre",
  urgent: "bg-danger-strong",
};

const PRIORITY_LABEL: Record<MailPriority, string> = {
  low: "Faible",
  normal: "Normal",
  important: "Important",
  urgent: "Urgent",
};

function cleanMailText(value?: string | null): string {
  return (value ?? "")
    .replace(/\*\*/g, "")
    .replace(/__+/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function splitMailActions(values: string[]): string[] {
  return values
    .flatMap((value) =>
      cleanMailText(value)
        .split(/\n+|•\s+|·\s+/)
        .map((part) => part.trim()),
    )
    .filter((value, index, array) => value.length > 0 && array.indexOf(value) === index);
}

function formatMailReceivedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function agendaItemAlreadyExists(title: string, date: string, time?: string): boolean {
  return getAgendaItemsForDate(date).some(
    (item) => item.title === title && (item.time ?? "") === (time ?? ""),
  );
}

function deadlineToSortKey(deadline: MailDeadline): string {
  return `${deadline.date}T${deadline.time ?? "23:59"}`;
}

function normalizeForComparison(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function buildDeadlineAgendaTitle(label: string, subject?: string | null): string {
  const cleanLabel = cleanMailText(label);
  const cleanSubject = cleanMailText(subject);

  if (!cleanLabel) return cleanSubject || "Sans objet";
  if (!cleanSubject) return cleanLabel;

  const normalizedLabel = normalizeForComparison(cleanLabel);
  const normalizedSubject = normalizeForComparison(cleanSubject);

  if (normalizedLabel === normalizedSubject) return cleanLabel;
  if (normalizedSubject.includes(normalizedLabel)) return cleanLabel;

  if (!/^(date limite|echeance|échéance|répondre|reponse|réponse|retour|rappel|mail|a traiter|à traiter)/i.test(cleanLabel)) {
    return cleanLabel;
  }

  return `${cleanLabel} — ${cleanSubject}`;
}

function buildAgendaSuggestion(mail: MailAnalysis): AgendaSuggestion | null {
  const todayKey = toISODate(new Date());
  const actions = splitMailActions(mail.actions);
  const sourceText = [
    mail.subject,
    cleanMailText(mail.summary),
    cleanMailText(mail.excerpt),
    ...actions,
    ...mail.deadlines.map((deadline) => deadline.label),
  ]
    .filter(Boolean)
    .join(" ");
  const hasMeetingIntent =
    /rendez-vous|rdv|réunion|visio|entretien|rencontre|appel|conseil|formation/i.test(sourceText);

  const upcomingDeadline = [...mail.deadlines]
    .filter((deadline) => deadline.date >= todayKey)
    .sort((left, right) => deadlineToSortKey(left).localeCompare(deadlineToSortKey(right)))[0];

  if (upcomingDeadline) {
    return {
      title: buildDeadlineAgendaTitle(upcomingDeadline.label, mail.subject),
      date: upcomingDeadline.date,
      time: upcomingDeadline.time ?? undefined,
      type: hasMeetingIntent ? "rdv" : mail.replyRequired ? "mail" : "ponctuel",
      tone: hasMeetingIntent ? "rdv" : "rappel",
      reason: hasMeetingIntent
        ? "Ardoise a repéré un rendez-vous ou un temps à prévoir dans ce mail."
        : "Ardoise a repéré une date utile à remettre dans ton agenda.",
    };
  }

  if (mail.replyRequired || actions.length > 0) {
    return {
      title: `${mail.subject || "Mail"} — à traiter`,
      date: todayKey,
      type: "mail",
      tone: "rappel",
      reason: "Ardoise a repéré une action à ne pas oublier, même sans date explicite.",
    };
  }

  return null;
}

async function saveSuggestedAgendaItem({
  mail,
  suggestion,
  googleConnected,
}: {
  mail: MailAnalysis;
  suggestion: AgendaSuggestion;
  googleConnected: boolean;
}) {
  if (googleConnected) {
    const response = await fetch("/api/calendar/events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        sourceMailId: `${mail.externalId}:${suggestion.date}:${suggestion.time ?? "all-day"}:${suggestion.title}`,
        summary: suggestion.title,
        description: `Suggestion proposée depuis le mail de ${mail.fromName || mail.fromEmail}.\n\n${cleanMailText(mail.summary)}`,
        date: suggestion.date,
        time: suggestion.time ?? null,
        timeZone: "Europe/Paris",
      }),
    });
    if (!response.ok) throw new Error("Agenda distant indisponible");
  }

  addAgendaItem({
    date: suggestion.date,
    time: suggestion.time,
    title: suggestion.title,
    type: suggestion.type,
  });
}

function deadlineAlreadyInAgenda(mail: MailAnalysis, deadline: MailDeadline): boolean {
  const title = buildDeadlineAgendaTitle(deadline.label, mail.subject);
  return getAgendaItemsForDate(deadline.date).some((item) => item.title === title);
}

function DeadlineChip({
  mail,
  deadline,
  googleConnected,
}: {
  mail: MailAnalysis;
  deadline: MailDeadline;
  googleConnected: boolean;
}) {
  const [added, setAdded] = useState(() => deadlineAlreadyInAgenda(mail, deadline));
  const [busy, setBusy] = useState(false);

  return (
    <li
      className={cn(
        "flex items-center gap-2 rounded-full border py-1 pl-3 pr-1 text-xs font-medium transition-colors",
        added
          ? "border-sage/50 bg-sage/15 text-foreground"
          : "border-border/70 bg-secondary/70 text-muted-foreground",
      )}
    >
      <span className="truncate">
        <span className="font-semibold text-foreground">{deadline.label}</span>
        {" · "}
        {deadline.date}
        {deadline.time ? ` ${deadline.time}` : ""}
      </span>
      {added ? (
        <Link
          to="/agenda"
          className="flex shrink-0 items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[0.65rem] font-semibold text-sage shadow-card transition-colors hover:bg-sage/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title="Voir dans l'agenda"
          aria-label={`${deadline.label} déjà ajouté à l'agenda, voir dans l'agenda`}
        >
          <Check className="h-3 w-3" />
          Ajouté · voir
        </Link>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              if (googleConnected) {
                const response = await fetch("/api/calendar/events", {
                  method: "POST",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    sourceMailId: `${mail.externalId}:${deadline.label}:${deadline.date}:${deadline.time ?? "all-day"}`,
                    summary: buildDeadlineAgendaTitle(deadline.label, mail.subject),
                    description: `Proposé depuis le mail de ${mail.fromName || mail.fromEmail}.\n\n${mail.summary}`,
                    date: deadline.date,
                    time: deadline.time,
                    timeZone: "Europe/Paris",
                  }),
                });
                if (!response.ok) throw new Error("Google Calendar indisponible");
              }
              addAgendaItem({
                date: deadline.date,
                time: deadline.time ?? undefined,
                title: buildDeadlineAgendaTitle(deadline.label, mail.subject),
                type: "rdv",
              });
              setAdded(true);
              toast.success("Ajouté à l'agenda.");
            } catch {
              toast.error("L'événement n'a pas pu être ajouté à Google Calendar.");
            } finally {
              setBusy(false);
            }
          }}
          className="flex shrink-0 items-center gap-1 rounded-full bg-card px-2 py-0.5 text-[0.65rem] font-semibold text-primary shadow-card transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-70"
          title={`Ajouter « ${deadline.label} » à l'agenda`}
          aria-label={`Ajouter « ${deadline.label} » à l'agenda${googleConnected ? " et Google Calendar" : ""}`}
        >
          <CalendarPlus className="h-3 w-3" />
          {busy ? "Ajout…" : googleConnected ? "+ Google" : "+ Agenda"}
        </button>
      )}
    </li>
  );
}

function AgendaSuggestionCard({
  mail,
  suggestion,
  googleConnected,
  onAdded,
}: {
  mail: MailAnalysis;
  suggestion: AgendaSuggestion;
  googleConnected: boolean;
  onAdded: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(() =>
    agendaItemAlreadyExists(suggestion.title, suggestion.date, suggestion.time),
  );

  return (
    <section className="mt-3 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-primary">
            Suggestion Ardoise
          </p>
          <p className="mt-1 text-sm font-semibold text-foreground">
            {suggestion.tone === "rdv" ? "Rendez-vous proposé" : "Rappel proposé"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{suggestion.reason}</p>
        </div>
        <button
          type="button"
          disabled={busy || added}
          onClick={async () => {
            setBusy(true);
            try {
              await saveSuggestedAgendaItem({ mail, suggestion, googleConnected });
              setAdded(true);
              onAdded();
              toast.success(
                suggestion.tone === "rdv"
                  ? "Le rendez-vous proposé a été ajouté à l'agenda."
                  : "Le rappel proposé a été ajouté à l'agenda.",
              );
            } catch {
              toast.error("La suggestion n'a pas pu être ajoutée à l'agenda.");
            } finally {
              setBusy(false);
            }
          }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
            added
              ? "border-sage/40 bg-sage/15 text-sage"
              : "border-border bg-background text-foreground hover:bg-secondary",
          )}
        >
          {added ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <CalendarClock className="h-3.5 w-3.5 text-primary" />
          )}
          {added ? "Déjà ajouté" : busy ? "Ajout…" : "Ajouter la suggestion"}
        </button>
      </div>

      <div className="mt-3 rounded-xl border border-border/70 bg-background/80 px-3 py-2.5 text-sm">
        <p className="font-medium text-foreground">{suggestion.title}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {suggestion.date}
          {suggestion.time ? ` · ${suggestion.time}` : ""}
        </p>
      </div>
    </section>
  );
}

function MessagingPage() {
  const { data: analyses = [], isFetching: loading, isError, refetch } = useMailAnalyses();
  const error = isError ? "Impossible de charger les analyses." : null;
  const [handledIds, setHandledIds] = useState<string[]>(() => getHandledMailIds());
  const [showHandled, setShowHandled] = useState(false);
  const [agendaCount, setAgendaCount] = useState(
    () => getAgendaItemsForDate(toISODate(new Date())).length,
  );
  const [googleConnected, setGoogleConnected] = useState(false);
  const [agendaMail, setAgendaMail] = useState<MailAnalysis | null>(null);
  const [agendaTitle, setAgendaTitle] = useState("");
  const [agendaDate, setAgendaDate] = useState(toISODate(new Date()));
  const [agendaTime, setAgendaTime] = useState("");
  const [agendaBusy, setAgendaBusy] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    void fetch("/api/calendar/google/status")
      .then((response) => response.json() as Promise<{ connected?: boolean }>)
      .then((value) => setGoogleConnected(Boolean(value.connected)))
      .catch(() => setGoogleConnected(false));
  }, []);

  useEffect(() => {
    setAgendaCount(getAgendaItemsForDate(toISODate(new Date())).length);
  }, [analyses.length, handledIds.length, showHandled]);

  function openAgendaDialog(mail: MailAnalysis) {
    const firstDeadline = mail.deadlines[0];
    setAgendaMail(mail);
    setAgendaTitle(
      firstDeadline
        ? buildDeadlineAgendaTitle(firstDeadline.label, mail.subject)
        : mail.subject || "Mail à planifier",
    );
    setAgendaDate(firstDeadline?.date ?? toISODate(new Date()));
    setAgendaTime(firstDeadline?.time ?? "");
  }

  async function saveAgendaFromMail() {
    if (!agendaMail || !agendaTitle.trim() || !agendaDate) return;
    setAgendaBusy(true);
    try {
      if (googleConnected) {
        const response = await fetch("/api/calendar/events", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            sourceMailId: `${agendaMail.externalId}:${agendaDate}:${agendaTime || "all-day"}:${agendaTitle.trim()}`,
            summary: agendaTitle.trim(),
            description: `Proposé depuis le mail de ${agendaMail.fromName || agendaMail.fromEmail}.\n\n${cleanMailText(agendaMail.summary)}`,
            date: agendaDate,
            time: agendaTime || null,
            timeZone: "Europe/Paris",
          }),
        });
        if (!response.ok) throw new Error("Agenda distant indisponible");
      }

      addAgendaItem({
        date: agendaDate,
        time: agendaTime || undefined,
        title: agendaTitle.trim(),
        type: "rdv",
      });
      setAgendaCount(getAgendaItemsForDate(toISODate(new Date())).length);
      setAgendaMail(null);
      toast.success("Le rendez-vous a bien été ajouté à l'agenda.");
    } catch {
      toast.error("Le rendez-vous n'a pas pu être ajouté.");
    } finally {
      setAgendaBusy(false);
    }
  }

  function refreshAgendaCount() {
    setAgendaCount(getAgendaItemsForDate(toISODate(new Date())).length);
  }

  async function deleteMail(mail: MailAnalysis) {
    const confirmed = window.confirm(
      `Supprimer définitivement ce message de la messagerie Ardoise ?\n\n${mail.subject || "Sans objet"}`,
    );

    if (!confirmed) return;

    setDeletingId(mail.externalId);
    try {
      const response = await fetch(
        `/api/mail/n8n?externalId=${encodeURIComponent(mail.externalId)}`,
        { method: "DELETE" },
      );
      if (!response.ok) throw new Error("Suppression impossible");
      setHandledIds((current) => current.filter((id) => id !== mail.externalId));
      await refetch();
      toast.success("Le message a bien été supprimé.");
    } catch {
      toast.error("Le message n'a pas pu être supprimé.");
    } finally {
      setDeletingId(null);
    }
  }

  const unhandled = analyses.filter((m) => !handledIds.includes(m.externalId));
  const handled = analyses.filter((m) => handledIds.includes(m.externalId));
  const visible = showHandled ? handled : unhandled;

  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
          <div className="min-w-0">
            <p className="eyebrow">Ma classe</p>
            <h1 className="mt-1 flex items-center gap-2.5 text-3xl font-bold sm:text-4xl">
              <Mail className="h-7 w-7 shrink-0 text-primary" />
              Messagerie
            </h1>
            <AgendaMessagingSwitch
              active="messagerie"
              agendaCount={agendaCount}
              mailCount={unhandled.length}
              className="mt-3"
            />
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/50 px-2.5 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-sage" />
                Flux n8n local
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-secondary/50 px-2.5 py-1">
                <RefreshCw className="h-3.5 w-3.5" />
                Résumé envoyé à Ardoise
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void refetch()}
            disabled={loading}
            className="shrink-0 shadow-card"
          >
            <RefreshCw className={cn("mr-1.5 h-4 w-4", loading && "animate-spin")} />
            Actualiser
          </Button>
        </header>

        {error ? (
          <p className="mt-4 flex items-center gap-2 rounded-xl border border-danger-soft-border bg-danger-soft px-3 py-2 text-sm font-medium text-danger-strong">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            {error}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3 border-b border-border pb-3">
          <span className="rounded-full border border-border/70 bg-card px-3 py-1 text-xs font-semibold text-foreground shadow-card">
            {showHandled
              ? `${handled.length} traité${handled.length > 1 ? "s" : ""}`
              : `${unhandled.length} à traiter`}
          </span>
          {handled.length > 0 ? (
            <button
              type="button"
              onClick={() => setShowHandled((v) => !v)}
              className="flex items-center gap-1.5 rounded-full px-2 py-1 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {showHandled ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {showHandled
                ? "Masquer les mails traités"
                : `Afficher les mails traités (${handled.length})`}
            </button>
          ) : null}
        </div>

        <section className="mt-4 space-y-3">
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-secondary/30 px-6 py-10 text-center">
              <Inbox className="mx-auto h-7 w-7 text-muted-foreground/70" />
              <p className="mt-3 text-sm text-muted-foreground">
                {showHandled
                  ? "Aucun mail traité."
                  : "Aucun mail reçu pour l'instant."}
              </p>
            </div>
          ) : (
            visible.map((mail) => (
              <article
                key={mail.externalId}
                className={cn(
                  "card-surface animate-fade-in relative overflow-hidden pl-5 pr-4 py-4 shadow-card transition-shadow duration-300 hover:shadow-raised",
                  showHandled && "opacity-70",
                )}
              >
                {(() => {
                  const suggestion = buildAgendaSuggestion(mail);
                  return (
                    <>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-y-0 left-0 w-1.5",
                          PRIORITY_BAR[mail.priority],
                        )}
                      />

                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={cn(
                                "rounded-full border px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide",
                                PRIORITY_STYLE[mail.priority],
                              )}
                            >
                              {PRIORITY_LABEL[mail.priority] ?? mail.priority}
                            </span>
                            <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                              {MAILBOX_LABEL[mail.mailboxLabel] ?? mail.mailboxLabel}
                            </span>
                            <span className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                              {formatMailReceivedAt(mail.receivedAt)}
                            </span>
                            {googleConnected ? (
                              <span className="rounded-full border border-sage/35 bg-sage/15 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wide text-sage">
                                Agenda Google lié
                              </span>
                            ) : null}
                          </div>
                          <h2 className="mt-1.5 truncate text-base font-semibold leading-snug text-foreground">
                            {mail.subject || "Sans objet"}
                          </h2>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {mail.fromName ? `${mail.fromName} · ` : ""}
                            {mail.fromEmail}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => void deleteMail(mail)}
                            disabled={deletingId === mail.externalId}
                            className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-semibold text-muted-foreground shadow-card transition-all duration-200 hover:-translate-y-px hover:border-danger-soft-border hover:text-danger-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {deletingId === mail.externalId ? "Suppression…" : "Supprimer"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setHandledIds(toggleMailHandled(mail.externalId))}
                            className={cn(
                              "flex items-center gap-1.5 rounded-full border bg-card px-2.5 py-1 text-xs font-semibold shadow-card transition-all duration-200 hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              showHandled
                                ? "border-border text-muted-foreground hover:bg-secondary"
                                : "border-border text-muted-foreground hover:border-sage hover:text-sage",
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                            {showHandled ? "Remettre à traiter" : "Traité"}
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 space-y-3">
                        <section className="rounded-2xl border border-border/70 bg-secondary/35 px-4 py-3">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                            Lecture rapide
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                            {cleanMailText(mail.summary)}
                          </p>
                        </section>

                        {cleanMailText(mail.excerpt) ? (
                          <section className="rounded-2xl border border-border/70 bg-background/80 px-4 py-3">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                              Extrait du message
                            </p>
                            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                              {cleanMailText(mail.excerpt)}
                            </p>
                          </section>
                        ) : null}
                      </div>

                      {splitMailActions(mail.actions).length > 0 ? (
                        <section className="mt-3 rounded-2xl border border-border/70 bg-card px-4 py-3">
                          <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                            Actions à prévoir
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {splitMailActions(mail.actions).map((action) => (
                              <li key={action} className="flex gap-2 text-sm text-foreground/90">
                                <span className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </section>
                      ) : null}

                      {suggestion && mail.deadlines.length === 0 ? (
                        <AgendaSuggestionCard
                          mail={mail}
                          suggestion={suggestion}
                          googleConnected={googleConnected}
                          onAdded={refreshAgendaCount}
                        />
                      ) : null}

                      {mail.deadlines.length > 0 ? (
                        <section className="mt-3 rounded-2xl border border-border/70 bg-card px-4 py-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-muted-foreground">
                              Dates repérées
                            </p>
                            <button
                              type="button"
                              onClick={() => openAgendaDialog(mail)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                            >
                              <CalendarClock className="h-3.5 w-3.5 text-primary" />
                              {suggestion ? "Choisir une autre date" : "Créer un rendez-vous"}
                            </button>
                          </div>
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {mail.deadlines.map((d, i) => (
                              <DeadlineChip
                                key={i}
                                mail={mail}
                                deadline={d}
                                googleConnected={googleConnected}
                              />
                            ))}
                          </ul>
                        </section>
                      ) : (
                        <div className="mt-3 flex justify-end">
                          <button
                            type="button"
                            onClick={() => openAgendaDialog(mail)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
                          >
                            <CalendarClock className="h-3.5 w-3.5 text-primary" />
                            Ajouter un rappel à l'agenda
                          </button>
                        </div>
                      )}

                      {mail.replyRequired ? (
                        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-primary">
                          <CornerUpLeft className="h-3.5 w-3.5" />
                          Réponse attendue
                        </p>
                      ) : null}
                    </>
                  );
                })()}
              </article>
            ))
          )}
        </section>
      </main>

      <Dialog open={agendaMail !== null} onOpenChange={(open) => !open && setAgendaMail(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Ajouter à l’agenda</DialogTitle>
            <DialogDescription>
              À partir de ce mail, tu peux créer un rendez-vous ou un rappel proprement, sans
              repasser par l’agenda.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-border/70 bg-secondary/35 px-4 py-3">
              <p className="text-xs font-semibold text-foreground">
                {agendaMail?.subject || "Sans objet"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {agendaMail?.fromName ? `${agendaMail.fromName} · ` : ""}
                {agendaMail?.fromEmail}
              </p>
            </div>

            <label className="grid gap-1.5 text-sm">
              <span className="font-medium text-foreground">Titre</span>
              <Input value={agendaTitle} onChange={(event) => setAgendaTitle(event.target.value)} />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">Date</span>
                <Input
                  type="date"
                  value={agendaDate}
                  onChange={(event) => setAgendaDate(event.target.value)}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">Heure</span>
                <Input
                  type="time"
                  value={agendaTime}
                  onChange={(event) => setAgendaTime(event.target.value)}
                />
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAgendaMail(null)}>
              Annuler
            </Button>
            <Button
              onClick={() => void saveAgendaFromMail()}
              disabled={agendaBusy || !agendaTitle.trim() || !agendaDate}
            >
              {agendaBusy
                ? "Ajout en cours…"
                : googleConnected
                  ? "Ajouter à l’agenda"
                  : "Enregistrer le rappel"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
