import { createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, ChevronUp, Mic2, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { SecondaryPageHeader } from "@/components/ardoise/secondary-page-chrome";
import { Input } from "@/components/ui/input";
import { EVALUABLE_STUDENTS, fullName, initials } from "@/lib/ardoise-eval";
import {
  deleteRecitationSession,
  getRecitationSessions,
  getRecitationTitles,
  saveRecitationEntry,
  type RecitationLevel,
  type RecitationSession,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/recitations")({
  head: () => ({
    meta: [
      { title: "Récitations — Ardoise" },
      {
        name: "description",
        content: "Suivi des récitations (poésies, textes mémorisés) élève par élève.",
      },
      { property: "og:title", content: "Récitations — Ardoise" },
    ],
  }),
  component: RecitationsPage,
});

const LEVELS: { key: RecitationLevel; label: string; short: string }[] = [
  { key: "tres_bien", label: "Très bien", short: "TB" },
  { key: "bien", label: "Bien", short: "B" },
  { key: "hesitations", label: "Hésitations", short: "H" },
  { key: "a_revoir", label: "À revoir", short: "AR" },
];

const LEVEL_TONE: Record<RecitationLevel, string> = {
  tres_bien: "bg-status-a text-status-a-foreground",
  bien: "bg-sage text-foreground",
  hesitations: "bg-status-pa text-status-pa-foreground",
  a_revoir: "bg-status-na text-status-na-foreground",
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDateLabel(value: string): string {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

const TODAY = toDateKey(new Date());

function RecitationsPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(TODAY);
  const [sessions, setSessions] = useState<RecitationSession[]>([]);
  const [expandedComment, setExpandedComment] = useState<string | null>(null);
  const [commentDraft, setCommentDraft] = useState("");
  const [savedFlash, setSavedFlash] = useState<string | null>(null);
  const savedFlashTimer = useRef<number>(0);

  useEffect(() => {
    setSessions(getRecitationSessions());
    return () => window.clearTimeout(savedFlashTimer.current);
  }, []);

  const titles = useMemo(() => getRecitationTitles(), [sessions]);

  const currentSession = sessions.find((s) => s.title === title.trim() && s.date === date);

  function flash(studentId: string) {
    setSavedFlash(studentId);
    window.clearTimeout(savedFlashTimer.current);
    savedFlashTimer.current = window.setTimeout(() => setSavedFlash(null), 1400);
  }

  function setLevel(studentId: string, level: RecitationLevel) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const existingComment = currentSession?.entries.find((e) => e.studentId === studentId)?.comment;
    saveRecitationEntry(trimmedTitle, date, studentId, level, existingComment);
    setSessions(getRecitationSessions());
    flash(studentId);
  }

  function saveComment(studentId: string) {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;
    const existingLevel = currentSession?.entries.find((e) => e.studentId === studentId)?.level;
    if (!existingLevel) return;
    saveRecitationEntry(trimmedTitle, date, studentId, existingLevel, commentDraft.trim() || undefined);
    setSessions(getRecitationSessions());
    setExpandedComment(null);
    flash(studentId);
  }

  function loadSession(session: RecitationSession) {
    setTitle(session.title);
    setDate(session.date);
  }

  function removeSession(id: string) {
    deleteRecitationSession(id);
    setSessions(getRecitationSessions());
  }

  const evaluatedCount = currentSession?.entries.length ?? 0;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Ma classe"
          title="Récitations"
          description="Poésies et textes mémorisés : une note rapide par élève (Très bien / Bien / Hésitations / À revoir) et un commentaire libre si besoin."
        />

        <div className="card-surface mt-4 p-4 shadow-card">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_200px]">
            <label className="text-sm">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Titre de la poésie / du texte
              </span>
              <Input
                list="recitation-titles"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex. : Vive la rentrée !"
              />
              <datalist id="recitation-titles">
                {titles.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </label>
            <label className="text-sm">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Date
              </span>
              <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
          </div>
          {title.trim() ? (
            <p className="mt-3 text-xs text-muted-foreground">
              {evaluatedCount} élève{evaluatedCount > 1 ? "s" : ""} évalué{evaluatedCount > 1 ? "s" : ""} sur{" "}
              {EVALUABLE_STUDENTS.length} pour « {title.trim()} » le {formatDateLabel(date)}.
            </p>
          ) : (
            <p className="mt-3 text-xs text-muted-foreground">
              Saisis un titre pour commencer à évaluer la classe.
            </p>
          )}
        </div>

        {title.trim() ? (
          <div className="card-surface mt-4 overflow-hidden shadow-card">
            <ul className="divide-y divide-border">
              {EVALUABLE_STUDENTS.map((student) => {
                const entry = currentSession?.entries.find((e) => e.studentId === student.id);
                const isExpanded = expandedComment === student.id;
                return (
                  <li key={student.id} className="px-4 py-3">
                    <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary font-display text-xs font-semibold text-muted-foreground">
                        {initials(student)}
                      </span>
                      <span className="min-w-0 text-sm font-medium text-foreground">
                        <span className="block truncate">{fullName(student)}</span>
                        {entry?.comment ? (
                          <span className="mt-0.5 block truncate text-[0.7rem] text-muted-foreground">
                            {entry.comment}
                          </span>
                        ) : null}
                      </span>
                      <div className="flex gap-1">
                        {LEVELS.map(({ key, label, short }) => (
                          <button
                            key={key}
                            type="button"
                            title={label}
                            onClick={() => setLevel(student.id, key)}
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors duration-150",
                              entry?.level === key
                                ? LEVEL_TONE[key]
                                : "bg-secondary text-muted-foreground hover:bg-muted",
                            )}
                          >
                            {short}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        disabled={!entry}
                        title="Ajouter un commentaire"
                        onClick={() => {
                          if (!entry) return;
                          setCommentDraft(entry.comment ?? "");
                          setExpandedComment(isExpanded ? null : student.id);
                        }}
                        className={cn(
                          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
                          !entry && "cursor-not-allowed opacity-40 hover:bg-transparent",
                        )}
                      >
                        {savedFlash === student.id ? (
                          <Check className="h-4 w-4 text-status-a-foreground" />
                        ) : isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {isExpanded ? (
                      <div className="mt-2 flex gap-2 pl-12">
                        <Input
                          autoFocus
                          value={commentDraft}
                          onChange={(event) => setCommentDraft(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") saveComment(student.id);
                          }}
                          placeholder="Commentaire (optionnel)"
                          className="text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => saveComment(student.id)}
                          className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                          OK
                        </button>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        <div className="mt-6">
          <p className="eyebrow">Séances précédentes</p>
          {sessions.length === 0 ? (
            <p className="mt-2 rounded-2xl border border-dashed border-border px-4 py-4 text-center text-sm text-muted-foreground">
              Aucune séance de récitation enregistrée pour le moment.
            </p>
          ) : (
            <ul className="mt-2 space-y-2">
              {sessions.map((session) => {
                const counts = LEVELS.map((l) => ({
                  ...l,
                  count: session.entries.filter((e) => e.level === l.key).length,
                }));
                return (
                  <li
                    key={session.id}
                    className="card-surface flex flex-wrap items-center justify-between gap-3 p-3 shadow-card"
                  >
                    <button
                      type="button"
                      onClick={() => loadSession(session)}
                      className="flex min-w-0 flex-1 items-center gap-3 text-left"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                        <Mic2 className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">
                          {session.title}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {formatDateLabel(session.date)} · {session.entries.length}/{EVALUABLE_STUDENTS.length}{" "}
                          élève{session.entries.length > 1 ? "s" : ""}
                        </span>
                      </span>
                    </button>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {counts
                        .filter((c) => c.count > 0)
                        .map((c) => (
                          <span
                            key={c.key}
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[0.65rem] font-semibold",
                              LEVEL_TONE[c.key],
                            )}
                          >
                            {c.count} {c.short}
                          </span>
                        ))}
                      <button
                        type="button"
                        title="Supprimer cette séance"
                        onClick={() => removeSession(session.id)}
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-danger-strong"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </AppShell>
  );
}
