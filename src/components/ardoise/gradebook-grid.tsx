import { Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { STUDENTS, fullName } from "@/lib/ardoise-eval";
import {
  columnAverage,
  makeColumnId,
  parseScore,
  readGradebook,
  saveGradebook,
  studentAverage,
  type GradebookColumn,
  type GradebookState,
} from "@/lib/gradebook-storage";
import { cn } from "@/lib/utils";

const SUBJECT_TINT: Record<GradebookColumn["subject"], string> = {
  francais: "bg-[oklch(0.95_0.04_250)] text-[oklch(0.42_0.11_250)]",
  maths: "bg-[oklch(0.95_0.05_140)] text-[oklch(0.4_0.1_150)]",
  autre: "bg-secondary text-muted-foreground",
};

const SUBJECT_LABEL: Record<GradebookColumn["subject"], string> = {
  francais: "Français",
  maths: "Maths",
  autre: "Autre",
};

function scoreTone(ratio: number | null): string {
  if (ratio === null) return "text-muted-foreground";
  if (ratio >= 0.75) return "text-[oklch(0.5_0.12_150)]";
  if (ratio >= 0.5) return "text-[oklch(0.58_0.13_75)]";
  return "text-[oklch(0.55_0.16_25)]";
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export function GradebookGrid() {
  const [state, setState] = useState<GradebookState>({ columns: [], scores: {} });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(readGradebook());
    setReady(true);
  }, []);

  const students = useMemo(
    () =>
      [...STUDENTS].sort((left, right) =>
        `${left.lastName} ${left.firstName}`.localeCompare(
          `${right.lastName} ${right.firstName}`,
          "fr",
          { sensitivity: "base" },
        ),
      ),
    [],
  );

  function commit(next: GradebookState) {
    setState(next);
    saveGradebook(next);
  }

  function addColumn() {
    const column: GradebookColumn = {
      id: makeColumnId(),
      title: "Nouvelle évaluation",
      date: todayIso(),
      max: 20,
      coefficient: 1,
      subject: "autre",
    };
    commit({ ...state, columns: [...state.columns, column] });
  }

  function updateColumn(columnId: string, patch: Partial<GradebookColumn>) {
    commit({
      ...state,
      columns: state.columns.map((column) =>
        column.id === columnId ? { ...column, ...patch } : column,
      ),
    });
  }

  function removeColumn(columnId: string) {
    const nextScores = { ...state.scores };
    delete nextScores[columnId];
    commit({
      columns: state.columns.filter((column) => column.id !== columnId),
      scores: nextScores,
    });
  }

  function setScore(columnId: string, studentId: string, value: string) {
    commit({
      ...state,
      scores: {
        ...state.scores,
        [columnId]: { ...(state.scores[columnId] ?? {}), [studentId]: value },
      },
    });
  }

  if (!ready) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/60 p-8 text-center text-sm text-muted-foreground">
        Chargement du carnet…
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Carnet de notes
          </p>
          <h2 className="mt-1 font-display text-xl font-bold">Notes saisies à la main</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Ajoute une colonne d’évaluation, puis remplis les notes élève par élève. Tout est
            enregistré automatiquement.
          </p>
        </div>
        <Button size="sm" onClick={addColumn}>
          <Plus className="mr-1.5 h-4 w-4" />
          Nouvelle évaluation
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/90">
              <th className="sticky left-0 z-20 min-w-[190px] bg-surface px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Élève
              </th>
              {state.columns.map((column) => (
                <th
                  key={column.id}
                  className="min-w-[150px] border-l border-border/60 px-3 py-3 align-top"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-1">
                      <input
                        value={column.title}
                        onChange={(event) =>
                          updateColumn(column.id, { title: event.target.value })
                        }
                        className="w-full rounded-md bg-transparent px-1 py-0.5 text-sm font-semibold text-foreground outline-none transition-colors hover:bg-secondary/70 focus:bg-background focus:ring-2 focus:ring-primary/40"
                      />
                      <button
                        type="button"
                        aria-label={`Supprimer ${column.title}`}
                        onClick={() => removeColumn(column.id)}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-1">
                      <select
                        value={column.subject}
                        onChange={(event) =>
                          updateColumn(column.id, {
                            subject: event.target.value as GradebookColumn["subject"],
                          })
                        }
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide outline-none",
                          SUBJECT_TINT[column.subject],
                        )}
                      >
                        {(["francais", "maths", "autre"] as GradebookColumn["subject"][]).map(
                          (value) => (
                            <option key={value} value={value}>
                              {SUBJECT_LABEL[value]}
                            </option>
                          ),
                        )}
                      </select>
                      <span className="text-[0.62rem] font-medium text-muted-foreground">/</span>
                      <input
                        type="number"
                        min={1}
                        value={column.max}
                        onChange={(event) =>
                          updateColumn(column.id, { max: Number(event.target.value) || 1 })
                        }
                        className="w-12 rounded-md border border-border bg-background px-1 py-0.5 text-center text-[0.7rem] tabular-nums outline-none focus:ring-2 focus:ring-primary/40"
                      />
                      <span className="text-[0.62rem] font-medium text-muted-foreground">
                        coef.
                      </span>
                      <input
                        type="number"
                        min={1}
                        value={column.coefficient}
                        onChange={(event) =>
                          updateColumn(column.id, {
                            coefficient: Number(event.target.value) || 1,
                          })
                        }
                        className="w-10 rounded-md border border-border bg-background px-1 py-0.5 text-center text-[0.7rem] tabular-nums outline-none focus:ring-2 focus:ring-primary/40"
                      />
                    </div>
                    <input
                      type="date"
                      value={column.date}
                      onChange={(event) => updateColumn(column.id, { date: event.target.value })}
                      className="w-full rounded-md bg-transparent px-1 py-0.5 text-[0.7rem] font-normal text-muted-foreground outline-none hover:bg-secondary/70 focus:bg-background focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </th>
              ))}
              <th className="min-w-[110px] border-l border-border/60 px-3 py-3 align-top">
                <button
                  type="button"
                  onClick={addColumn}
                  className="flex w-full flex-col items-center gap-1 rounded-xl border border-dashed border-border px-2 py-2 text-[0.7rem] font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter
                </button>
              </th>
              <th className="sticky right-0 z-20 min-w-[96px] border-l border-border bg-surface px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Moyenne
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const average = studentAverage(state, student.id);
              return (
                <tr
                  key={student.id}
                  className={cn(
                    "border-b border-border/60 transition-colors last:border-b-0 hover:bg-secondary/40",
                    index % 2 === 1 && "bg-surface/40",
                  )}
                >
                  <th className="sticky left-0 z-10 bg-card px-4 py-2 text-left text-sm font-medium">
                    {fullName(student)}
                  </th>
                  {state.columns.map((column) => {
                    const raw = state.scores[column.id]?.[student.id] ?? "";
                    const parsed = parseScore(raw);
                    const ratio =
                      parsed !== null && column.max > 0 ? parsed / column.max : null;
                    return (
                      <td key={column.id} className="border-l border-border/40 px-2 py-1.5">
                        <input
                          value={raw}
                          inputMode="decimal"
                          placeholder="—"
                          onChange={(event) => setScore(column.id, student.id, event.target.value)}
                          className={cn(
                            "w-full rounded-lg border border-transparent bg-transparent px-2 py-1.5 text-center text-sm font-semibold tabular-nums outline-none transition-colors placeholder:font-normal placeholder:text-muted-foreground/60 hover:border-border hover:bg-background focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/30",
                            scoreTone(ratio),
                          )}
                        />
                      </td>
                    );
                  })}
                  <td className="border-l border-border/40" />
                  <td className="sticky right-0 z-10 border-l border-border bg-card px-3 py-2 text-center">
                    <span
                      className={cn(
                        "text-sm font-bold tabular-nums",
                        scoreTone(average.value === null ? null : average.value / 20),
                      )}
                    >
                      {average.value === null ? "—" : `${average.value}/20`}
                    </span>
                  </td>
                </tr>
              );
            })}
            <tr className="border-t border-border bg-surface/70">
              <th className="sticky left-0 z-10 bg-surface px-4 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Moyenne classe
              </th>
              {state.columns.map((column) => {
                const value = columnAverage(state, column.id);
                return (
                  <td
                    key={column.id}
                    className="border-l border-border/40 px-2 py-2 text-center text-sm font-semibold tabular-nums"
                  >
                    <span
                      className={scoreTone(
                        value === null || column.max <= 0 ? null : value / column.max,
                      )}
                    >
                      {value === null ? "—" : `${value}/${column.max}`}
                    </span>
                  </td>
                );
              })}
              <td className="border-l border-border/40" />
              <td className="sticky right-0 z-10 border-l border-border bg-surface" />
            </tr>
          </tbody>
        </table>
      </div>

      {state.columns.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-card/60 p-6 text-center text-sm text-muted-foreground">
          Aucune évaluation pour le moment — clique sur « Nouvelle évaluation » pour créer ta
          première colonne, comme dans un carnet papier.
        </p>
      ) : null}
    </section>
  );
}
