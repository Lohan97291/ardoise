import { ATTENDANCE_STUDENTS, STUDENTS, type Student } from "@/lib/ardoise-eval";
import type { AttendanceStatus } from "@/lib/storage";

export const ATTENDANCE_OPTIONS: { key: AttendanceStatus; label: string; short: string }[] = [
  { key: "present", label: "Présent", short: "P" },
  { key: "retard", label: "Retard", short: "R" },
  { key: "absent", label: "Absent", short: "A" },
];

export function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function dateFromKey(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

export function shiftDateKey(value: string, days: number): string {
  const date = dateFromKey(value);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export function formatMonthLabel(value: string): string {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1, 12);
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(date);
}

export function formatDateLabel(value: string): string {
  const date = dateFromKey(value);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}

/**
 * Élèves à faire figurer sur le registre d'appel pour une date donnée :
 * tous les élèves de la classe, y compris ceux radiés après cette date
 * (ils apparaissent grisés, avec les boutons désactivés côté UI).
 */
export function attendanceRosterForDate(date: string): Student[] {
  return ATTENDANCE_STUDENTS.filter((student) => !student.radiatedOn || date < student.radiatedOn);
}

export function countAttendance(
  attendance: Record<string, AttendanceStatus>,
  roster: Student[] = STUDENTS,
): { present: number; retard: number; absent: number } {
  return {
    present: roster.filter((student) => (attendance[student.id] ?? "present") === "present").length,
    retard: roster.filter((student) => attendance[student.id] === "retard").length,
    absent: roster.filter((student) => attendance[student.id] === "absent").length,
  };
}
