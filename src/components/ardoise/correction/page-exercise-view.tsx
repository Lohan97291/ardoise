import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CommentField } from "@/components/ardoise/correction/comment-field";
import { StatusButtons } from "@/components/ardoise/correction/status-buttons";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import {
  fullName,
  initials,
  STUDENTS,
  type StatusKey,
} from "@/lib/ardoise-eval";
import {
  notebookPageItems,
  notebookPagePlanId,
  orderedStudents,
  pageLabel,
  type NotebookSource,
} from "@/lib/correction-rapide-notebook";
import { getComment, setComment } from "@/lib/correction-rapide-store";
import { getPlanResults, saveOnePlanResult } from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Vue "page" en mode exercice par exercice : un exercice sélectionné, on avance élève par élève. */
export function PageExerciseView({
  source,
  page,
  onChangePage,
  refreshKey,
  onProgress,
}: {
  source: NotebookSource;
  page: number;
  onChangePage: (page: number) => void;
  refreshKey: number;
  onProgress: (summary: string) => void;
}) {
  const students = useMemo(() => orderedStudents(), []);
  const items = useMemo(() => notebookPageItems(source, page), [source, page]);
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? "");
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id ?? "");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setSelectedItemId(items[0]?.id ?? "");
  }, [source, page]);

  const selectedItem = items.find((item) => item.id === selectedItemId) ?? items[0];
  const planId = selectedItem ? `${notebookPagePlanId(source, page)}::${selectedItem.id}` : "";
  const results = planId ? getPlanResults(planId) : {};
  const doneCount = Object.keys(results).length;

  useEffect(() => {
    onProgress(selectedItem?.label ?? pageLabel(page, source));
  }, [selectedItem?.label, page, source]);

  function mark(studentId: string, status: StatusKey) {
    if (!planId) return;
    saveOnePlanResult(planId, studentId, status);
    setTick((value) => value + 1);
    const currentIndex = students.findIndex((student) => student.id === studentId);
    const next = students.find(
      (student, index) => index > currentIndex && !getPlanResults(planId)[student.id],
    );
    setSelectedStudentId(next?.id ?? studentId);
  }

  const selectedStudent = STUDENTS.find((student) => student.id === selectedStudentId);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <Button variant="outline" size="sm" onClick={() => onChangePage(page - 1)} disabled={page <= 1}>
          <ArrowLeft className="mr-1 h-4 w-4" />
          Page précédente
        </Button>
        <span className="text-sm font-semibold text-foreground">{pageLabel(page, source)}</span>
        <Button variant="outline" size="sm" onClick={() => onChangePage(page + 1)}>
          Page suivante
          <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-col gap-2 overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-card">
          <p className="eyebrow px-1">Exercices de la page</p>
          {items.length === 0 ? (
            <p className="px-1 py-4 text-sm text-muted-foreground">Aucun exercice répertorié.</p>
          ) : (
            items.map((item) => {
              const itemPlanId = `${notebookPagePlanId(source, page)}::${item.id}`;
              const itemDone = Object.keys(getPlanResults(itemPlanId)).length;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedItemId(item.id)}
                  className={cn(
                    "flex flex-col items-start gap-0.5 rounded-xl border px-3 py-2.5 text-left transition-colors",
                    item.id === selectedItemId
                      ? "border-primary bg-primary/6"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {itemDone}/{STUDENTS.length} élèves corrigés
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-card">
          {selectedItem ? (
            <div className="rounded-[22px] border border-primary/12 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_8%,white),color-mix(in_oklab,var(--color-secondary)_26%,transparent))] p-3">
              <div className="flex flex-wrap items-center gap-2">
                {selectedItem.repere ? (
                  <span className="rounded-full border border-primary/15 bg-card px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-primary">
                    {selectedItem.repere}
                  </span>
                ) : null}
                {selectedItem.domain ? (
                  <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">
                    {selectedItem.domain}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-base font-bold text-foreground">{selectedItem.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {selectedItem.instruction}
              </p>
            </div>
          ) : null}

          <div className="flex items-center justify-between px-1">
            <p className="eyebrow">Élèves</p>
            <span className="text-xs font-semibold text-muted-foreground">
              {doneCount}/{students.length} faits
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-y-auto pb-1">
            {students.map((student) => {
              const status = results[student.id];
              return (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => setSelectedStudentId(student.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-semibold transition-colors",
                    student.id === selectedStudentId
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:bg-secondary",
                  )}
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-secondary text-[0.6rem]">
                    {initials(student)}
                  </span>
                  <span className="font-semibold text-foreground">{student.firstName}</span>
                  <span className="text-[0.68rem] uppercase tracking-wide text-muted-foreground">
                    {student.lastName}
                  </span>
                  {status ? (
                    <span className={cn("rounded-full px-1.5 text-[0.6rem]", STATUS_CHIP[status])}>
                      {status}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {selectedStudent && selectedItem ? (
            <div className="mt-1 flex flex-col gap-3 border-t border-border pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-[20px] border border-border/70 bg-secondary/25 px-3 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-foreground">{fullName(selectedStudent)}</p>
                  <p className="text-xs text-muted-foreground">Choisis le statut puis passe au cahier suivant.</p>
                </div>
                <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.68rem] font-medium text-muted-foreground">
                  Raccourcis affichés sur les boutons
                </span>
              </div>
              <StatusButtons value={results[selectedStudent.id]} onSelect={(status) => mark(selectedStudent.id, status)} />
              <CommentField
                value={getComment(planId, selectedStudent.id)}
                onSave={(value) => setComment(planId, selectedStudent.id, value)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
