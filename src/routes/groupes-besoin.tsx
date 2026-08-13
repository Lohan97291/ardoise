import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardCheck, Sparkles, UsersRound } from "lucide-react";
import { useMemo } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import { STUDENTS, fullName, initials, type StatusKey } from "@/lib/ardoise-eval";
import { getActiveExercises, getExerciseResults } from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/groupes-besoin")({
  head: () => ({
    meta: [
      { title: "Groupes de besoin — Ardoise" },
      {
        name: "description",
        content: "Élèves en difficulté regroupés par notion pour une reprise ciblée.",
      },
      { property: "og:title", content: "Groupes de besoin — Ardoise" },
    ],
  }),
  component: GroupesBesoinPage,
});

function GroupesBesoinPage() {
  const groups = useMemo(
    () =>
      getActiveExercises()
        .map((exercise) => {
          const results = getExerciseResults(exercise.id);
          return {
            exercise,
            students: STUDENTS.filter((s) => {
              const status = results[s.id] as StatusKey | undefined;
              return status === "NA" || status === "PA" || status === "NF";
            }),
            results,
          };
        })
        .filter((g) => g.students.length > 0),
    [],
  );

  const total = new Set(groups.flatMap((g) => g.students.map((s) => s.id))).size;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title="Élèves à accompagner"
          description={`${total} élève${total > 1 ? "s" : ""} ont été repéré${total > 1 ? "s" : ""} sur les exercices récents. Cette page aide à transformer les résultats en petits groupes de reprise.`}
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to="/correction-rapide"
            icon={ClipboardCheck}
            title="Corrections"
            description="Revenir aux pages corrigées pour affiner les besoins repérés."
          />
          <SecondaryPageLinkCard
            to="/ateliers-reprise"
            icon={Sparkles}
            title="Ateliers de reprise"
            description="Passer directement à la préparation des remédiations."
          />
          <SecondaryPageLinkCard
            to="/eleves"
            icon={UsersRound}
            title="Élèves"
            description="Retrouver la classe, l’appel et les autres outils de suivi."
          />
        </SecondaryPageLinks>

        <div className="mt-6 space-y-4">
          {groups.map(({ exercise, students, results }) => (
            <section key={exercise.id} className="card-surface p-5 shadow-card">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className={cn(
                    "rounded-md px-2.5 py-1 text-xs font-semibold",
                    exercise.subject === "francais"
                      ? "bg-subject-francais text-subject-francais-foreground"
                      : "bg-subject-maths text-subject-maths-foreground",
                  )}
                >
                  {exercise.subject === "francais" ? "Français" : "Mathématiques"}
                </span>
                <h2 className="min-w-0 flex-1 truncate text-lg font-semibold">{exercise.title}</h2>
                <span className="shrink-0 rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                  {students.length} élève{students.length > 1 ? "s" : ""}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">{exercise.sessionTitle}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {students.map((s) => {
                  const status = (results[s.id] ?? "NA") as StatusKey;
                  return (
                    <div
                      key={s.id}
                      className="flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-surface text-[0.6rem] font-semibold text-muted-foreground">
                        {initials(s)}
                      </span>
                      <span className="text-sm font-medium">{fullName(s)}</span>
                      <span
                        className={cn(
                          "rounded-full px-1.5 text-[0.65rem] font-bold",
                          STATUS_CHIP[status],
                        )}
                      >
                        {status}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-border pt-3">
                <Button asChild variant="outline" size="sm">
                  <Link to="/ateliers-reprise">Créer un atelier reprise →</Link>
                </Button>
              </div>
            </section>
          ))}

          {groups.length === 0 && (
            <div className="card-surface p-10 text-center shadow-card">
              <p className="text-sm font-medium text-muted-foreground">
                Aucun élève en difficulté identifié pour le moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
