import { X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import { STATUSES, initials, type StatusKey } from "@/lib/ardoise-eval";
import {
  notebookPageItems,
  notebookPagePlanId,
  orderedStudents,
  pageLabel,
  type NotebookSource,
} from "@/lib/correction-rapide-notebook";
import { getPlanResults, saveOnePlanResult } from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Mode plein écran "tableau de marque" : élèves en lignes, exercices en colonnes, cellules cliquables. */
export function FullscreenBoard({
  source,
  page,
  onClose,
}: {
  source: NotebookSource;
  page: number;
  onClose: () => void;
}) {
  const students = useMemo(() => orderedStudents(), []);
  const items = useMemo(() => notebookPageItems(source, page), [source, page]);
  const [tick, setTick] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function cycle(itemId: string, studentId: string) {
    const planId = `${notebookPagePlanId(source, page)}::${itemId}`;
    const current = getPlanResults(planId)[studentId];
    const currentIndex = STATUSES.findIndex((s) => s.key === current);
    const next: StatusKey = STATUSES[(currentIndex + 1) % STATUSES.length]!.key;
    saveOnePlanResult(planId, studentId, next);
    setTick((v) => v + 1);
    setCycleIndex((v) => v + 1);
  }

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
          Correction — {pageLabel(page, source)}
        </span>
        <Button variant="outline" size="sm" onClick={onClose}>
          <X className="mr-1.5 h-4 w-4" />
          Quitter (Échap)
        </Button>
      </div>
      <div className="flex-1 overflow-auto rounded-2xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-card">
            <tr>
              <th className="border-b border-r border-border px-2 py-2 text-left">Élève</th>
              {items.map((item) => (
                <th key={item.id} className="border-b border-border px-2 py-2 text-left font-semibold">
                  {item.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="odd:bg-secondary/40">
                <td className="border-r border-border px-2 py-1.5 font-semibold">
                  <span className="mr-1.5 inline-grid h-5 w-5 place-items-center rounded-full bg-secondary text-[0.6rem]">
                    {initials(student)}
                  </span>
                  {student.firstName} {student.lastName[0]}.
                </td>
                {items.map((item) => {
                  const planId = `${notebookPagePlanId(source, page)}::${item.id}`;
                  const status = getPlanResults(planId)[student.id];
                  return (
                    <td key={item.id} className="border-border px-1 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => cycle(item.id, student.id)}
                        className={cn(
                          "h-9 w-16 rounded-lg text-xs font-bold transition-colors",
                          status ? STATUS_CHIP[status] : "bg-muted text-muted-foreground hover:bg-secondary",
                        )}
                      >
                        {status ?? "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
