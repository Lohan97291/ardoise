import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  ClipboardCheck,
  FileText,
  Layers3,
  Printer,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { STATUS_CHIP, STATUS_SOLID } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import { STATUSES, STUDENTS, fullName, initials, type StatusKey } from "@/lib/ardoise-eval";
import { getActiveExercises, getExerciseResults, getExercisesForSession } from "@/lib/storage";
import { findJournalSessionById } from "@/lib/journal-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bilan-seance")({
  head: () => ({
    meta: [
      { title: "Bilan de séance — Ardoise" },
      {
        name: "description",
        content:
          "Le bilan post-correction d'Ardoise : répartition A/PA/NA/NF/AB, taux de maîtrise et groupe d'élèves à reprendre.",
      },
      { property: "og:title", content: "Bilan de séance — Ardoise" },
      {
        property: "og:description",
        content:
          "Chiffres clés par statut, barre de maîtrise globale et liste des élèves à reprendre en priorité.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BilanSeancePage,
});

function BilanSeancePage() {
  const [sourceSessionId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("sessionId");
  });

  const allExercises = useMemo(() => getActiveExercises(), []);
  const exercises = useMemo(
    () => (sourceSessionId ? getExercisesForSession(sourceSessionId) : allExercises),
    [allExercises, sourceSessionId],
  );
  const linkedSession = useMemo(
    () => (sourceSessionId ? findJournalSessionById(sourceSessionId) : undefined),
    [sourceSessionId],
  );

  const [exerciseId, setExerciseId] = useState(() => exercises[0]?.id ?? "");

  useEffect(() => {
    if (!exercises.length) {
      setExerciseId("");
      return;
    }
    if (!exercises.some((candidate) => candidate.id === exerciseId)) {
      setExerciseId(exercises[0]!.id);
    }
  }, [exerciseId, exercises]);

  const exercise = exercises.find((e) => e.id === exerciseId) ?? exercises[0];

  const exerciseResults = useMemo(() => getExerciseResults(exerciseId), [exerciseId]);

  const counts = useMemo(() => {
    const base = Object.fromEntries(STATUSES.map((s) => [s.key, 0])) as Record<StatusKey, number>;
    for (const s of STUDENTS) {
      const status = (exerciseResults[s.id] ?? "NF") as StatusKey;
      base[status] += 1;
    }
    return base;
  }, [exerciseResults]);

  if (!exercise) {
    return (
      <AppShell>
        <EmptyLinkedView
          title="Aucun bilan disponible"
          description={
            sourceSessionId
              ? "Cette séance n'a pas encore de correction rattachée. Lancez d'abord la correction pour obtenir un bilan."
              : "Aucune correction n'est encore disponible pour calculer un bilan de séance."
          }
          actions={
            [
              sourceSessionId
                ? {
                    label: "Ouvrir la correction",
                    icon: ClipboardCheck,
                    onClick: () =>
                      window.location.assign(
                        `/correction-rapide?sessionId=${encodeURIComponent(sourceSessionId)}`,
                      ),
                  }
                : null,
              sourceSessionId
                ? {
                    label: "Revenir au journal",
                    icon: FileText,
                    onClick: () =>
                      window.location.assign(
                        `/journal?sessionId=${encodeURIComponent(sourceSessionId)}`,
                      ),
                  }
                : null,
            ].filter(Boolean) as ActionButton[]
          }
        />
      </AppShell>
    );
  }

  const evaluated = STUDENTS.length - counts.AB - counts.NF;
  const mastery = Math.round(((counts.A + counts.PA * 0.5) / Math.max(1, evaluated)) * 100);
  const toReview = STUDENTS.filter((s) => {
    const st = exerciseResults[s.id];
    return st === "NA" || st === "PA";
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title={linkedSession ? linkedSession.title : exercise.sessionTitle}
          description="Le bilan reformule la correction en lecture pédagogique : maîtrise globale, élèves à reprendre et accès direct aux écrans associés."
          actions={
            <Button variant="outline" size="sm" className="shrink-0" onClick={() => window.print()}>
              <Printer className="mr-1.5 h-4 w-4" />
              Imprimer
            </Button>
          }
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/correction-rapide?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/correction-rapide"
            }
            icon={ClipboardCheck}
            title="Correction"
            description="Revenir à la saisie détaillée des résultats pour cette séance."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/resultats-exercices?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/resultats-exercices"
            }
            icon={Layers3}
            title="Résultats détaillés"
            description="Consulter le détail élève par élève derrière le bilan global."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/journal?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/journal"
            }
            icon={FileText}
            title="Cahier journal"
            description="Revenir à la séance du jour et à son contexte dans la journée."
          />
        </SecondaryPageLinks>

        {sourceSessionId ? (
          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
            <span className="font-semibold text-primary">Séance liée</span>
            <span className="text-muted-foreground">{linkedSession?.title ?? sourceSessionId}</span>
          </div>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {exercises.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setExerciseId(e.id)}
              className={cn(
                "rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors duration-150 hover:bg-secondary",
                e.id === exerciseId &&
                  "border-transparent bg-primary text-primary-foreground hover:bg-primary",
              )}
            >
              {e.title}
            </button>
          ))}
        </div>

        {/* Cartes chiffres */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STATUSES.map((s) => (
            <div
              key={s.key}
              className={cn("rounded-2xl border border-border p-4 shadow-card", STATUS_CHIP[s.key])}
            >
              <p className="font-display text-4xl font-bold tabular-nums">{counts[s.key]}</p>
              <p className="mt-1 text-xs font-semibold">{s.short}</p>
              <p className="text-[0.7rem] leading-tight opacity-80">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            {/* Maîtrise globale */}
            <section className="card-surface p-5 shadow-card">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-3">
                <h2 className="min-w-0 truncate text-lg font-semibold">Maîtrise globale</h2>
                <p className="shrink-0 font-display text-4xl font-bold tabular-nums">{mastery}%</p>
              </div>
              <div className="mt-3 flex h-4 overflow-hidden rounded-full bg-secondary">
                {STATUSES.map((s) =>
                  counts[s.key] ? (
                    <span
                      key={s.key}
                      className={cn("h-full transition-all duration-200", STATUS_SOLID[s.key])}
                      style={{ width: `${(counts[s.key] / STUDENTS.length) * 100}%` }}
                    />
                  ) : null,
                )}
              </div>
              <p className="mt-2.5 text-sm text-muted-foreground">
                {evaluated} élèves évalués sur {STUDENTS.length} · {counts.A} acquis, {counts.PA}{" "}
                partiellement.
              </p>
            </section>

            {/* À reprendre */}
            <section className="rounded-2xl border border-danger-soft-border bg-danger-soft p-5 shadow-card">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <AlertTriangle className="h-5 w-5 shrink-0 text-danger-strong" />À reprendre
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {toReview.length} élèves à revoir en groupe de besoin sur cette notion.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {toReview.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-surface text-[0.6rem] font-semibold text-muted-foreground">
                      {initials(s)}
                    </span>
                    <span className="text-sm font-medium">{fullName(s)}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 text-[0.65rem] font-bold",
                        STATUS_CHIP[exerciseResults[s.id]!],
                      )}
                    >
                      {exerciseResults[s.id]}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Liste complète */}
          <aside className="card-surface p-4 shadow-card">
            <h2 className="px-1 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Tous les élèves
            </h2>
            <ul className="mt-2 max-h-[34rem] space-y-1 overflow-y-auto pr-1">
              {STUDENTS.map((s) => {
                const status = (exerciseResults[s.id] ?? "NF") as StatusKey;
                return (
                  <li
                    key={s.id}
                    className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl px-2.5 py-2 transition-colors duration-150 hover:bg-secondary"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[0.65rem] font-semibold text-muted-foreground">
                      {initials(s)}
                    </span>
                    <span className="min-w-0 truncate text-sm font-medium">{fullName(s)}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                        STATUS_CHIP[status],
                      )}
                    >
                      {status}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}

type ActionButton = {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
};

function EmptyLinkedView({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions: ActionButton[];
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="card-surface rounded-3xl p-8 text-center shadow-card">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Layers3 className="h-6 w-6" />
        </span>
        <h1 className="mt-4 text-2xl font-bold">{title}</h1>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        {actions.length ? (
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {actions.map((action) => (
              <Button key={action.label} variant="outline" onClick={action.onClick}>
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
