import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { ATTENDANCE_STUDENTS, fullName, initials } from "@/lib/ardoise-eval";
import {
  ATTENDANCE_OPTIONS,
  attendanceRosterForDate,
  countAttendance,
  formatDateLabel,
} from "@/lib/attendance-helpers";
import type { AttendanceJustifiedStore, AttendanceStatus } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function AttendanceStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function AttendancePanel({
  title,
  subtitle,
  icon,
  attendance,
  onChange,
  justified,
  onToggleJustified,
  saved,
  onSetAllPresent,
  selectedDate,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  attendance: Record<string, AttendanceStatus>;
  onChange: (studentId: string, status: AttendanceStatus) => void;
  justified: AttendanceJustifiedStore;
  onToggleJustified: (studentId: string, justified: boolean) => void;
  saved: boolean;
  onSetAllPresent: () => void;
  selectedDate: string;
}) {
  const activeRoster = attendanceRosterForDate(selectedDate);
  const counts = countAttendance(attendance, activeRoster);

  return (
    <section className="card-surface overflow-hidden p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
              {icon}
            </span>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSetAllPresent}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Tous présents
          </button>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors duration-300",
              saved
                ? "bg-status-a/15 text-status-a-foreground"
                : "bg-secondary text-muted-foreground",
            )}
            title="L'appel est enregistré automatiquement à chaque changement."
          >
            <Check className="h-3.5 w-3.5" />
            {saved ? "Enregistré" : "Enregistrement auto"}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <AttendanceStatCard label="Présents" value={counts.present} />
        <AttendanceStatCard label="Retards" value={counts.retard} />
        <AttendanceStatCard label="Absents" value={counts.absent} />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {ATTENDANCE_STUDENTS.map((student) => {
            const current = attendance[student.id] ?? "present";
            const isRadiated = Boolean(student.radiatedOn);
            const isRadiatedForSelectedDate = Boolean(
              student.radiatedOn && selectedDate >= student.radiatedOn,
            );
            const isJustified = justified[student.id];
            return (
              <li
                key={student.id}
                className={cn("px-4 py-3", isRadiated && "bg-muted/30 text-muted-foreground")}
              >
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary font-display text-xs font-semibold text-muted-foreground">
                    {initials(student)}
                  </span>
                  <span className="min-w-0 text-sm font-medium text-foreground">
                    <span className="block truncate">{fullName(student)}</span>
                    {student.radiatedOn ? (
                      <span className="mt-0.5 block truncate text-[0.68rem] font-semibold text-muted-foreground">
                        Radié le {formatDateLabel(student.radiatedOn)}
                        {student.radiatedReason ? ` · ${student.radiatedReason}` : ""}
                      </span>
                    ) : null}
                  </span>
                  <div className="flex gap-1">
                    {ATTENDANCE_OPTIONS.map(({ key, label, short }) => (
                      <button
                        key={key}
                        type="button"
                        title={label}
                        disabled={isRadiatedForSelectedDate}
                        onClick={() => onChange(student.id, key)}
                        className={cn(
                          "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors duration-150",
                          current === key &&
                            key === "present" &&
                            "bg-status-a text-status-a-foreground",
                          current === key &&
                            key === "retard" &&
                            "bg-status-pa text-status-pa-foreground",
                          current === key &&
                            key === "absent" &&
                            "bg-status-na text-status-na-foreground",
                          current !== key && "bg-secondary text-muted-foreground hover:bg-muted",
                          isRadiatedForSelectedDate && "cursor-not-allowed opacity-45 hover:bg-secondary",
                        )}
                      >
                        {short}
                      </button>
                    ))}
                  </div>
                </div>
                {current === "absent" && !isRadiatedForSelectedDate ? (
                  <div className="mt-2 flex items-center gap-1.5 pl-12">
                    <span className="text-[0.65rem] font-medium text-muted-foreground">Absence :</span>
                    <button
                      type="button"
                      onClick={() => onToggleJustified(student.id, true)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors duration-150",
                        isJustified === true
                          ? "bg-status-a text-status-a-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-muted",
                      )}
                    >
                      Justifiée
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleJustified(student.id, false)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors duration-150",
                        isJustified === false
                          ? "bg-status-na text-status-na-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-muted",
                      )}
                    >
                      Non justifiée
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
