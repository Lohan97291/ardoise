import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, FileText, Layers3, type LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { STATUS_CHIP, STATUS_SOLID } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import {
  STATUSES,
  STUDENTS,
  STATUS_BY_KEY,
  fullName,
  initials,
  type StatusKey,
} from "@/lib/ardoise-eval";
import { getActiveExercises, getExerciseResults, getExercisesForSession } from "@/lib/storage";
import { findJournalSessionById } from "@/lib/journal-storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resultats-exercices")({
  head: () => ({
    meta: [
      { title: "Résultats — Ardoise" },
      { name: "description", content: "Historique des résultats d'exercices par élève." },
      { property: "og:title", content: "Résultats — Ardoise" },
    ],
  }),
  component: ResultatsExercicesPage,
});

function ResultatsExercicesPage() {
  const [initialParams] = useState(() => {
    if (typeof window === "undefined") return null;
    const searchParams = new URLSearchParams(window.location.search);
    return {
      sourceSessionId: searchParams.get("sessionId"),
      requestedExerciseId: searchParams.get("exerciseId"),
      requestedStudentId: searchParams.get("studentId"),
    };
  });
  const sourceSessionId = initialParams?.sourceSessionId ?? null;

  const allExercises = useMemo(() => getActiveExercises(), []);
  const exercises = useMemo(
    () => (sourceSessionId ? getExercisesForSession(sourceSessionId) : allExercises),
    [allExercises, sourceSessionId],
  );
  const linkedSession = useMemo(
    () => (sourceSessionId ? findJournalSessionById(sourceSessionId) : undefined),
    [sourceSessionId],
  );

  const [exerciseId, setExerciseId] = useState(
    () => initialParams?.requestedExerciseId ?? exercises[0]?.id ?? "",
  );

  useEffect(() => {
    if (!exercises.length) {
      setExerciseId("");
      return;
    }
    if (!exercises.some((exercise) => exercise.id === exerciseId)) {
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
          title="Aucune correction trouvée"
          description={
            sourceSessionId
              ? "Cette séance n'a pas encore de correction rattachée. Ouvrez la correction depuis le journal pour la lancer."
              : "Aucun exercice corrigé n'est encore disponible dans Ardoise."
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

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title={linkedSession ? linkedSession.title : "Historique des exercices"}
          description="Ici on garde le détail des résultats pour chaque exercice, afin de relire une page corrigée sans repasser par toute la saisie."
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
            description="Retourner à la page de correction liée à cet exercice."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/bilan-seance?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/bilan-seance"
            }
            icon={Layers3}
            title="Bilan de séance"
            description="Basculer vers la lecture synthétique de la maîtrise et des besoins."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/journal?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/journal"
            }
            icon={FileText}
            title="Cahier journal"
            description="Revenir à la séance qui a produit ces résultats."
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

        {/* Cartes stats */}
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

        {/* Barre de maîtrise */}
        <section className="mt-4 card-surface p-5 shadow-card">
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
            {evaluated} élèves évalués sur {STUDENTS.length} · {exercise.date}
          </p>
        </section>

        {/* Tableau élèves */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Élève
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Statut
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Exercice
                </th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {STUDENTS.map((s) => {
                const status = (exerciseResults[s.id] ?? "NF") as StatusKey;
                const isAlert = status === "NA";
                return (
                  <tr
                    key={s.id}
                    className={cn(
                      "transition-colors duration-150 hover:bg-secondary/40",
                      isAlert && "bg-danger-soft/40",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-[0.65rem] font-semibold text-muted-foreground">
                          {initials(s)}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            window.location.assign(`/eleves?studentId=${encodeURIComponent(s.id)}`)
                          }
                          className="font-medium text-left transition-colors hover:text-primary"
                        >
                          {fullName(s)}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                          STATUS_CHIP[status],
                        )}
                      >
                        {STATUS_BY_KEY[status].label}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      <button
                        type="button"
                        onClick={() =>
                          window.location.assign(
                            `/carnet-notes?detail=eleve&studentId=${encodeURIComponent(
                              initialParams?.requestedStudentId ?? s.id,
                            )}&exerciseId=${encodeURIComponent(exercise.id)}`,
                          )
                        }
                        className="transition-colors hover:text-primary"
                      >
                        {exercise.title}
                      </button>
                    </td>
                    <td className="hidden px-4 py-3 font-mono text-xs text-muted-foreground sm:table-cell">
                      {exercise.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
