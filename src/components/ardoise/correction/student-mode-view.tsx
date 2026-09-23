import { Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AssistanceButtons } from "@/components/ardoise/correction/assistance-buttons";
import { CommentField } from "@/components/ardoise/correction/comment-field";
import { StatusButtons } from "@/components/ardoise/correction/status-buttons";
import { STATUS_CHIP, STATUS_SURFACE } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import { fullName, initials, type StatusKey } from "@/lib/ardoise-eval";
import {
  notebookPageItems,
  notebookPagePlanId,
  notebookPages,
  orderedStudents,
  pageLabel,
  type NotebookSource,
} from "@/lib/correction-rapide-notebook";
import { getComment, setComment } from "@/lib/correction-rapide-store";
import {
  getExerciseAssistance,
  getPlanResults,
  removeOnePlanResult,
  saveOneExerciseAssistance,
  saveOnePlanResult,
  type ExerciseAssistance,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Mode "élève par élève" : un élève sélectionné à gauche, ses pages/exercices à droite. */
export function StudentModeView({
  source,
  startPage,
}: {
  source: NotebookSource;
  startPage: number;
}) {
  const students = useMemo(() => orderedStudents(), []);
  const [studentId, setStudentId] = useState(students[0]?.id ?? "");
  const pages = useMemo(() => notebookPages(source), [source]);
  const [page, setPage] = useState(startPage || pages[0] || 1);
  const [tick, setTick] = useState(0);
  const student = students.find((s) => s.id === studentId);

  useEffect(() => {
    setPage(startPage || pages[0] || 1);
  }, [source]);

  const items = notebookPageItems(source, page);

  function mark(itemId: string, status: StatusKey) {
    if (!student) return;
    const planId = `${notebookPagePlanId(source, page)}::${itemId}`;
    saveOnePlanResult(planId, student.id, status);
    setTick((v) => v + 1);
  }

  function clearMark(itemId: string) {
    if (!student) return;
    const planId = `${notebookPagePlanId(source, page)}::${itemId}`;
    removeOnePlanResult(planId, student.id);
    setTick((v) => v + 1);
  }

  function markAssistance(itemId: string, next?: ExerciseAssistance) {
    if (!student) return;
    const planId = `${notebookPagePlanId(source, page)}::${itemId}`;
    saveOneExerciseAssistance(planId, student.id, next);
    setTick((v) => v + 1);
  }

  // Un élève est "terminé" sur la page courante si tous ses exercices de la page sont notés.
  const pagePlanIds = items.map((item) => `${notebookPagePlanId(source, page)}::${item.id}`);
  const correctionTotal = pagePlanIds.length;
  const correctionDone = student
    ? pagePlanIds.filter((pid) => Boolean(getPlanResults(pid)[student.id])).length
    : 0;
  const correctionRemaining = Math.max(0, correctionTotal - correctionDone);
  const correctionAriaText = correctionTotal > 0
    ? `${correctionDone} exercice${correctionDone > 1 ? "s" : ""} corrigé${correctionDone > 1 ? "s" : ""} sur ${correctionTotal}, ${correctionRemaining} restant${correctionRemaining > 1 ? "s" : ""}`
    : "Aucun exercice à corriger";

  function studentPageComplete(sId: string): boolean {
    if (pagePlanIds.length === 0) return false;
    return pagePlanIds.every((pid) => Boolean(getPlanResults(pid)[sId]));
  }

  function studentPageProgress(sId: string) {
    const done = pagePlanIds.filter((pid) => Boolean(getPlanResults(pid)[sId])).length;
    const percent = correctionTotal > 0 ? Math.round((done / correctionTotal) * 100) : 0;
    return { done, percent };
  }

  return (
    <div className="grid h-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
      <div className="flex flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-card">
        <p className="eyebrow px-1">Élèves</p>
        {students.map((s) => {
          const complete = studentPageComplete(s.id);
          const progress = studentPageProgress(s.id);
          const selected = s.id === studentId;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setStudentId(s.id)}
              aria-label={`${fullName(s)}, ${progress.done} exercice${progress.done > 1 ? "s" : ""} corrigé${progress.done > 1 ? "s" : ""} sur ${correctionTotal}`}
              className={cn(
                "group relative isolate flex min-h-14 items-center gap-2 overflow-hidden rounded-2xl border px-3 py-2 text-left text-sm font-semibold shadow-[0_8px_22px_-20px_color-mix(in_oklab,var(--color-primary)_35%,transparent)] motion-safe:transition-[border-color,box-shadow,transform] motion-safe:duration-200",
                selected
                  ? "border-primary/35 shadow-[0_14px_30px_-20px_color-mix(in_oklab,var(--color-primary)_48%,transparent)] ring-1 ring-primary/10"
                  : complete
                    ? "border-transparent bg-muted/40 text-muted-foreground hover:bg-secondary"
                    : "border-border/80 bg-card/75 hover:-translate-y-px hover:border-primary/20 hover:shadow-card",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none absolute inset-y-0 left-0 -z-10 overflow-hidden rounded-r-2xl motion-safe:transition-[width] motion-safe:duration-300",
                  complete
                    ? "bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-sage)_36%,transparent),color-mix(in_oklab,var(--color-sage)_16%,var(--color-ochre)_10%),color-mix(in_oklab,var(--color-card)_75%,transparent))]"
                    : "bg-[linear-gradient(100deg,color-mix(in_oklab,var(--color-primary)_17%,transparent),color-mix(in_oklab,var(--color-sage)_13%,transparent),color-mix(in_oklab,var(--color-ochre)_10%,transparent))]",
                )}
                style={{ width: `${progress.percent}%` }}
                aria-hidden="true"
              >
                {progress.percent > 0 && progress.percent < 100 ? (
                  <span className="absolute inset-y-1 right-0 w-px bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--color-primary)_48%,white),transparent)] shadow-[0_0_12px_2px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]" />
                ) : null}
              </span>
              <span
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,color-mix(in_oklab,white_52%,transparent),transparent_48%)]"
                aria-hidden="true"
              />
              <span
                className={cn(
                  "grid h-7 w-7 shrink-0 place-items-center rounded-xl border text-[0.62rem] shadow-[inset_0_1px_0_color-mix(in_oklab,white_65%,transparent)]",
                  complete
                    ? "border-status-a-solid/15 bg-status-a/55 text-status-a-foreground"
                    : selected
                      ? "border-primary/15 bg-card/80 text-primary"
                      : "border-border/60 bg-secondary/80",
                )}
              >
                {complete ? <Check className="h-3.5 w-3.5 text-status-a-solid" /> : initials(s)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col text-left">
                <span className="flex min-w-0 items-baseline gap-1.5">
                  <span className="truncate text-sm font-bold tracking-[-0.01em] text-foreground">
                    {s.firstName}
                  </span>
                  <span className="shrink-0 text-[0.64rem] font-bold tabular-nums text-primary/70">
                    {progress.percent}%
                  </span>
                </span>
                <span className="flex items-center gap-1.5 truncate text-[0.64rem] uppercase tracking-[0.09em] text-muted-foreground">
                  <span className="truncate">{s.lastName}</span>
                  <span aria-hidden="true">·</span>
                  <span className="shrink-0 normal-case tracking-normal">
                    {progress.done}/{correctionTotal}
                  </span>
                </span>
              </span>
              {complete ? (
                <span className="shrink-0 rounded-full border border-status-a-solid/15 bg-card/65 px-2 py-0.5 text-[0.58rem] font-bold text-status-a-foreground shadow-sm backdrop-blur-sm">
                  Terminée
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="relative flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
          {student ? (
            <div className="rounded-[22px] border border-primary/12 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_84%,transparent),color-mix(in_oklab,var(--color-secondary)_36%,transparent))] p-3 shadow-card">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="eyebrow">Correction élève</p>
                  <p className="mt-1 text-base font-bold text-foreground">{fullName(student)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Avance page par page pour ce cahier, sans quitter l’élève en cours.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-card/80 px-3 py-2 text-right shadow-sm">
                  <p className="text-sm font-bold text-foreground">
                    {correctionDone}/{correctionTotal} corrigés
                  </p>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    {correctionRemaining} restant{correctionRemaining > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <span className="sr-only" role="status">
                {correctionAriaText}
              </span>
            </div>
          ) : null}

          <div className="flex items-center justify-between gap-2 px-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-10"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← Page préc.
            </Button>
            <span className="text-sm font-semibold">{pageLabel(page, source)}</span>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="min-h-10"
              onClick={() => setPage((p) => p + 1)}
            >
              Page suiv. →
            </Button>
          </div>

          {items.length === 0 ? (
            <p className="px-1 py-6 text-sm text-muted-foreground">Aucun exercice sur cette page.</p>
          ) : (
            items.map((item) => {
              const planId = `${notebookPagePlanId(source, page)}::${item.id}`;
              const results = getPlanResults(planId);
              const assistance = getExerciseAssistance(planId);
              const status = student ? results[student.id] : undefined;
              const help = student ? assistance[student.id] : undefined;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "rounded-xl border border-border bg-card/70 p-3.5 motion-safe:transition-colors motion-safe:duration-150",
                    status && STATUS_SURFACE[status],
                  )}
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold">{item.label}</span>
                    <span className="flex items-center gap-1.5">
                      {help ? (
                        <span className="rounded-full bg-ochre/15 px-2 py-0.5 text-[0.65rem] font-bold text-ochre-foreground">
                          {help === "aesh" ? "AESH" : "Aide"}
                        </span>
                      ) : null}
                      {status ? (
                        <span className={cn("rounded-full px-2 py-0.5 text-[0.65rem] font-semibold", STATUS_CHIP[status])}>
                          {status}
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <StatusButtons dense value={status} onSelect={(next) => mark(item.id, next)} onClear={() => clearMark(item.id)} />
                    {student ? (
                      <>
                        <AssistanceButtons
                          dense
                          student={student}
                          value={help}
                          onChange={(next) => markAssistance(item.id, next)}
                        />
                        <CommentField
                          key={`${planId}::${student.id}`}
                          resetKey={`${planId}::${student.id}`}
                          className="mt-2"
                          value={getComment(planId, student.id)}
                          onSave={(value) => setComment(planId, student.id, value)}
                        />
                      </>
                    ) : null}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
