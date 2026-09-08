import { useMemo, useState } from "react";

import { AssistanceButtons } from "@/components/ardoise/correction/assistance-buttons";
import { CommentField } from "@/components/ardoise/correction/comment-field";
import { StatusButtons } from "@/components/ardoise/correction/status-buttons";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { fullName, initials, type StatusKey } from "@/lib/ardoise-eval";
import { orderedStudents } from "@/lib/correction-rapide-notebook";
import { getComment, setComment } from "@/lib/correction-rapide-store";
import { sheetPlanId, type CorrectionSheet } from "@/lib/correction-sheets-store";
import {
  getExerciseAssistance,
  getPlanResults,
  saveOneExerciseAssistance,
  saveOnePlanResult,
  type ExerciseAssistance,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

/** Correction d'une feuille libre (évaluation) : un statut + un commentaire par élève. */
export function SheetCorrectionView({ sheet }: { sheet: CorrectionSheet }) {
  const students = useMemo(() => orderedStudents(), []);
  const planId = sheetPlanId(sheet.id);
  const [tick, setTick] = useState(0);
  const results = useMemo(() => getPlanResults(planId), [planId, tick]);
  const assistance = useMemo(() => getExerciseAssistance(planId), [planId, tick]);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id ?? "");
  const selectedStudent = students.find((student) => student.id === selectedStudentId);
  const doneCount = Object.keys(results).length;

  function mark(studentId: string, status: StatusKey) {
    saveOnePlanResult(planId, studentId, status);
    setTick((value) => value + 1);
    const currentIndex = students.findIndex((student) => student.id === studentId);
    const next = students.find(
      (student, index) => index > currentIndex && !getPlanResults(planId)[student.id],
    );
    setSelectedStudentId(next?.id ?? studentId);
  }

  function markAssistance(studentId: string, next?: ExerciseAssistance) {
    saveOneExerciseAssistance(planId, studentId, next);
    setTick((value) => value + 1);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-3 shadow-card">
      <div className="flex items-center justify-between px-1">
        <p className="eyebrow">Élèves</p>
        <span className="text-xs font-semibold text-muted-foreground">
          {doneCount}/{students.length} faits
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {students.map((student) => {
          const status = results[student.id];
          const help = assistance[student.id];
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
              {student.firstName}
              {status ? (
                <span className={cn("rounded-full px-1.5 text-[0.6rem]", STATUS_CHIP[status])}>
                  {status}
                </span>
              ) : null}
              {help ? (
                <span className="rounded-full bg-ochre/15 px-1.5 text-[0.6rem] font-bold text-ochre-foreground">
                  {help === "aesh" ? "AESH" : "Aide"}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedStudent ? (
        <div className="mt-1 flex flex-col gap-3 border-t border-border pt-3">
          <p className="text-sm font-semibold">{fullName(selectedStudent)}</p>
          <StatusButtons
            value={results[selectedStudent.id]}
            onSelect={(status) => mark(selectedStudent.id, status)}
          />
          <AssistanceButtons
            student={selectedStudent}
            value={assistance[selectedStudent.id]}
            onChange={(next) => markAssistance(selectedStudent.id, next)}
          />
          <CommentField
            value={getComment(planId, selectedStudent.id)}
            onSave={(value) => setComment(planId, selectedStudent.id, value)}
          />
        </div>
      ) : null}
    </div>
  );
}
