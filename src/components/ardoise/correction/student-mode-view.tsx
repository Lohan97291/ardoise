import { useEffect, useMemo, useState } from "react";

import { CommentField } from "@/components/ardoise/correction/comment-field";
import { StatusButtons } from "@/components/ardoise/correction/status-buttons";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
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
import { getPlanResults, saveOnePlanResult } from "@/lib/storage";
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

  return (
    <div className="grid h-full grid-cols-1 gap-4 overflow-hidden md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
      <div className="flex flex-col gap-1.5 overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-card">
        <p className="eyebrow px-1">Élèves</p>
        {students.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setStudentId(s.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-colors",
              s.id === studentId ? "border-primary bg-primary/6" : "border-border hover:bg-secondary",
            )}
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-secondary text-[0.65rem]">
              {initials(s)}
            </span>
            {fullName(s)}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3 overflow-y-auto rounded-2xl border border-border bg-card p-3 shadow-card">
        <div className="flex items-center justify-between px-1">
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ← Page préc.
          </button>
          <span className="text-sm font-semibold">{pageLabel(page, source)}</span>
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setPage((p) => p + 1)}
          >
            Page suiv. →
          </button>
        </div>

        {items.length === 0 ? (
          <p className="px-1 py-6 text-sm text-muted-foreground">Aucun exercice sur cette page.</p>
        ) : (
          items.map((item) => {
            const planId = `${notebookPagePlanId(source, page)}::${item.id}`;
            const results = getPlanResults(planId);
            const status = student ? results[student.id] : undefined;
            return (
              <div key={item.id} className="rounded-xl border border-border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold">{item.label}</span>
                  {status ? (
                    <span className={cn("rounded-full px-2 py-0.5 text-[0.65rem] font-semibold", STATUS_CHIP[status])}>
                      {status}
                    </span>
                  ) : null}
                </div>
                <StatusButtons dense value={status} onSelect={(next) => mark(item.id, next)} />
                {student ? (
                  <CommentField
                    className="mt-2"
                    value={getComment(planId, student.id)}
                    onSave={(value) => setComment(planId, student.id, value)}
                  />
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
