import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Calculator,
  ClipboardCheck,
  Plus,
  Printer,
  Trash2,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { ChoiceCard, StepHeader } from "@/components/ardoise/step-choice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CLEO_CATALOG,
  DOMAIN_LABELS,
  MATHS_CATALOG,
  STUDENTS,
  fullName,
  initials,
  type CatalogEntry,
  type StatusKey,
} from "@/lib/ardoise-eval";
import { createLocalStore } from "@/lib/local-store";
import { getActiveExercises, getExerciseResults } from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ateliers-reprise")({
  head: () => ({
    meta: [
      { title: "Ateliers reprise — Ardoise" },
      {
        name: "description",
        content: "Ateliers de remédiation à préparer pour les élèves en difficulté.",
      },
      { property: "og:title", content: "Ateliers reprise — Ardoise" },
    ],
  }),
  component: AteliersReprisePage,
});

type WorkshopStatus = "a-preparer" | "pret" | "fait";

type Workshop = {
  id: string;
  exerciseId: string;
  status: WorkshopStatus;
};

/* ─────────────── Persistence ─────────────── */

const WORKSHOPS_KEY = "ardoise.workshops.v1";
const workshopsStore = createLocalStore<Workshop[] | null>(WORKSHOPS_KEY, null);

function getDefaultWorkshops(): Workshop[] {
  const exs = getActiveExercises();
  return exs.slice(0, Math.min(2, exs.length)).map((e, i) => ({
    id: `w-${i + 1}`,
    exerciseId: e.id,
    status: "a-preparer" as WorkshopStatus,
  }));
}

function getInitialWorkshops(): Workshop[] {
  const persisted = workshopsStore.get();
  if (!persisted) return getDefaultWorkshops();
  // Filtre les ateliers dont l'exercice n'existe plus dans la liste active
  const activeIds = new Set(getActiveExercises().map((e) => e.id));
  const valid = persisted.filter((w) => activeIds.has(w.exerciseId));
  return valid.length > 0 ? valid : getDefaultWorkshops();
}

const BADGE_CLASS: Record<WorkshopStatus, string> = {
  "a-preparer": "bg-ochre text-ochre-foreground",
  pret: "bg-status-a text-status-a-foreground",
  fait: "bg-secondary text-muted-foreground",
};

const BADGE_LABEL: Record<WorkshopStatus, string> = {
  "a-preparer": "À préparer",
  pret: "Prêt",
  fait: "Fait",
};

const NEXT_STATUS: Record<WorkshopStatus, WorkshopStatus> = {
  "a-preparer": "pret",
  pret: "fait",
  fait: "a-preparer",
};

type DialogSubject = "francais" | "maths";
const PERIODS = [1, 2, 3, 4, 5] as const;

function AteliersReprisePage() {
  const exercises = useMemo(() => getActiveExercises(), []);
  const [workshops, setWorkshops] = useState<Workshop[]>(getInitialWorkshops);

  // Dialog état
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogSubject, setDialogSubject] = useState<DialogSubject>("francais");
  /** guidage pas-à-pas : matière d'abord, puis période + exercice */
  const [dialogStep, setDialogStep] = useState<"choice" | "list">("choice");
  const [dialogPeriod, setDialogPeriod] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [dialogSelected, setDialogSelected] = useState<string | null>(null);

  const needStudents = useMemo(() => {
    // Agrège les élèves NA/PA sur tous les exercices
    const flagged = new Set<string>();
    const statusMap = new Map<string, StatusKey>();
    for (const exercise of exercises) {
      const results = getExerciseResults(exercise.id);
      for (const [studentId, status] of Object.entries(results)) {
        if (status === "NA" || status === "PA") {
          flagged.add(studentId);
          statusMap.set(studentId, status as StatusKey);
        }
      }
    }
    return STUDENTS.filter((s) => flagged.has(s.id)).map((s) => ({
      ...s,
      status: statusMap.get(s.id) ?? ("NA" as StatusKey),
    }));
  }, [exercises]);

  const cycleStatus = (id: string) => {
    setWorkshops((ws) => {
      const next = ws.map((w) => (w.id === id ? { ...w, status: NEXT_STATUS[w.status] } : w));
      workshopsStore.set(next);
      return next;
    });
  };

  const deleteWorkshop = (id: string) => {
    setWorkshops((ws) => {
      const next = ws.filter((w) => w.id !== id);
      workshopsStore.set(next);
      return next;
    });
  };

  const dialogCatalog: CatalogEntry[] = (
    dialogSubject === "francais" ? CLEO_CATALOG : MATHS_CATALOG
  ).filter((e) => e.period === dialogPeriod) as CatalogEntry[];

  const addWorkshop = () => {
    if (!dialogSelected) return;
    setWorkshops((ws) => {
      const next = [
        ...ws,
        {
          id: `w-${Date.now()}`,
          exerciseId: dialogSelected,
          status: "a-preparer" as WorkshopStatus,
        },
      ];
      workshopsStore.set(next);
      return next;
    });
    setDialogOpen(false);
    setDialogSelected(null);
  };

  const toPrepare = workshops.filter((w) => w.status === "a-preparer").length;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title="Remédiation & approfondissement"
          description={`${workshops.length} atelier${workshops.length > 1 ? "s" : ""} enregistrés, dont ${toPrepare} encore à préparer. Cette page sert de passerelle entre correction, groupes et reprise.`}
          actions={
            <Button
              size="sm"
              className="shrink-0"
              onClick={() => {
                setDialogSelected(null);
                setDialogStep("choice");
                setDialogOpen(true);
              }}
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Créer un atelier
            </Button>
          }
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to="/groupes-besoin"
            icon={UsersRound}
            title="Groupes de besoin"
            description="Voir les regroupements d’élèves avant de lancer une reprise ciblée."
          />
          <SecondaryPageLinkCard
            to="/correction-rapide"
            icon={ClipboardCheck}
            title="Corrections"
            description="Revenir aux pages corrigées qui ont déclenché ces ateliers."
          />
          <SecondaryPageLinkCard
            to="/eleves"
            icon={BookOpen}
            title="Élèves"
            description="Retrouver rapidement la classe et les autres outils de suivi."
          />
        </SecondaryPageLinks>

        <div className="mt-6 space-y-4">
          {workshops.map((workshop) => {
            const exercise = exercises.find((e) => e.id === workshop.exerciseId)!;

            return (
              <div key={workshop.id} className="card-surface p-5 shadow-card">
                {/* En-tête atelier */}
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
                  <h2 className="min-w-0 flex-1 truncate font-semibold">{exercise.title}</h2>
                  <button
                    type="button"
                    onClick={() => cycleStatus(workshop.id)}
                    title="Changer le statut"
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150",
                      BADGE_CLASS[workshop.status],
                    )}
                  >
                    {BADGE_LABEL[workshop.status]}
                  </button>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">{exercise.sessionTitle}</p>

                {/* Élèves */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {needStudents.map((s) => {
                    const status = s.status;
                    return (
                      <div
                        key={s.id}
                        className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[0.6rem] font-semibold text-muted-foreground">
                          {initials(s)}
                        </span>
                        <span className="text-sm font-medium">{s.firstName}</span>
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

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground">
                    {needStudents.length} élève{needStudents.length > 1 ? "s" : ""} · Petit groupe
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      title="Imprimer la fiche"
                      onClick={() => window.print()}
                    >
                      <Printer className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      title="Supprimer l'atelier"
                      onClick={() => deleteWorkshop(workshop.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Dialogue « Créer un atelier » : choix guidé en deux étapes ──────── */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(o) => {
          setDialogOpen(o);
          if (!o) setDialogStep("choice");
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Créer un atelier de reprise</DialogTitle>
          </DialogHeader>

          {dialogStep === "choice" ? (
            <div className="grid gap-3 animate-fade-in sm:grid-cols-2">
              <ChoiceCard
                icon={<BookOpen className="h-5 w-5" />}
                title="Français"
                description="Reprendre une notion Cléo : compréhension, vocabulaire, grammaire, orthographe."
                onClick={() => {
                  setDialogSubject("francais");
                  setDialogStep("list");
                }}
              />
              <ChoiceCard
                icon={<Calculator className="h-5 w-5" />}
                title="Mathématiques"
                description="Reprendre une notion ACCÈS : nombres, calcul, mesures, géométrie."
                onClick={() => {
                  setDialogSubject("maths");
                  setDialogStep("list");
                }}
              />
            </div>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <StepHeader
                label={
                  dialogSubject === "francais"
                    ? "Français · notion à reprendre"
                    : "Mathématiques · notion à reprendre"
                }
                onBack={() => {
                  setDialogSelected(null);
                  setDialogStep("choice");
                }}
              />

              <div className="flex gap-1.5">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setDialogPeriod(p)}
                    className={cn(
                      "flex-1 rounded-full py-1.5 text-xs font-semibold transition-colors",
                      dialogPeriod === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/70",
                    )}
                  >
                    P{p}
                  </button>
                ))}
              </div>

              <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
                {dialogCatalog.length === 0 ? (
                  <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                    Aucune notion pour cette période.
                  </p>
                ) : (
                  dialogCatalog.map((entry) => (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => setDialogSelected(entry.id)}
                      className={cn(
                        "flex w-full items-start gap-2.5 rounded-xl border border-transparent px-3 py-2.5 text-left transition-colors",
                        dialogSelected === entry.id
                          ? "border-primary/30 bg-primary text-primary-foreground"
                          : "hover:bg-secondary",
                      )}
                    >
                      <span className="min-w-0 flex-1 text-sm leading-snug">{entry.title}</span>
                      <span
                        className={cn(
                          "mt-0.5 shrink-0 text-[0.65rem] font-semibold uppercase",
                          dialogSelected === entry.id ? "opacity-80" : "text-muted-foreground",
                        )}
                      >
                        {DOMAIN_LABELS[entry.domain] ?? entry.domain}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button disabled={!dialogSelected} onClick={addWorkshop}>
              Créer l'atelier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
