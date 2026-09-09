import { toISODate } from "@/lib/ardoise-data";
import { createLocalStore } from "@/lib/local-store";
import { isSchoolDay } from "@/lib/school-rhythm";
import { hasAttendanceRecorded, type AttendanceMoment } from "@/lib/storage";

export type AttendanceReminderSettings = {
  enabled: boolean;
  morningTime: string;
  afternoonTime: string;
};

export const ATTENDANCE_REMINDER_SETTINGS_EVENT = "ardoise:attendance-reminder-settings-updated";

const DEFAULT_ATTENDANCE_REMINDER_SETTINGS: AttendanceReminderSettings = {
  enabled: true,
  morningTime: "10:00",
  afternoonTime: "15:00",
};

const settingsStore = createLocalStore<AttendanceReminderSettings>(
  "ardoise.attendanceReminder.settings.v1",
  DEFAULT_ATTENDANCE_REMINDER_SETTINGS,
);

function normalizeTime(value: string | undefined, fallback: string): string {
  if (!value || !/^\d{2}:\d{2}$/.test(value)) return fallback;
  return value;
}

function normalizeSettings(
  value: Partial<AttendanceReminderSettings> | AttendanceReminderSettings,
): AttendanceReminderSettings {
  return {
    enabled: value.enabled ?? DEFAULT_ATTENDANCE_REMINDER_SETTINGS.enabled,
    morningTime: normalizeTime(value.morningTime, DEFAULT_ATTENDANCE_REMINDER_SETTINGS.morningTime),
    afternoonTime: normalizeTime(
      value.afternoonTime,
      DEFAULT_ATTENDANCE_REMINDER_SETTINGS.afternoonTime,
    ),
  };
}

export function getAttendanceReminderSettings(): AttendanceReminderSettings {
  return normalizeSettings(settingsStore.get());
}

export function saveAttendanceReminderSettings(
  patch: Partial<AttendanceReminderSettings>,
): AttendanceReminderSettings {
  const next = normalizeSettings({ ...getAttendanceReminderSettings(), ...patch });
  settingsStore.set(next);
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(ATTENDANCE_REMINDER_SETTINGS_EVENT, { detail: next }),
    );
  }
  return next;
}

// Un rappel "reporté" reste masqué jusqu'à la fin de la journée en cours.
const snoozeStore = createLocalStore<Record<string, true>>(
  "ardoise.attendanceReminder.snoozed.v1",
  {},
);

function snoozeKey(date: string, moment: AttendanceMoment): string {
  return `${date}:${moment}`;
}

export function snoozeAttendanceReminder(date: string, moment: AttendanceMoment): void {
  snoozeStore.update((current) => ({ ...current, [snoozeKey(date, moment)]: true }));
}

function isSnoozed(date: string, moment: AttendanceMoment): boolean {
  return Boolean(snoozeStore.get()[snoozeKey(date, moment)]);
}

export type PendingAttendanceReminder = {
  moment: AttendanceMoment;
  label: string;
  since: string;
};

function parseTimeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map((part) => Number.parseInt(part, 10));
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;
  return hours * 60 + minutes;
}

/**
 * Rappels d'appel actifs à l'instant `now` : appel du matin et/ou de
 * l'après-midi pas encore enregistré alors que l'heure configurée est
 * dépassée, uniquement les jours d'école, et hors rappels reportés pour
 * aujourd'hui.
 */
export function getPendingAttendanceReminders(
  now: Date = new Date(),
): PendingAttendanceReminder[] {
  const settings = getAttendanceReminderSettings();
  if (!settings.enabled) return [];
  if (!isSchoolDay(now)) return [];

  const date = toISODate(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const checks: { moment: AttendanceMoment; time: string; label: string }[] = [
    { moment: "morning", time: settings.morningTime, label: "Appel du matin" },
    { moment: "afternoon", time: settings.afternoonTime, label: "Appel de l'après-midi" },
  ];

  const pending: PendingAttendanceReminder[] = [];
  for (const check of checks) {
    if (nowMinutes < parseTimeToMinutes(check.time)) continue;
    if (hasAttendanceRecorded(date, check.moment)) continue;
    if (isSnoozed(date, check.moment)) continue;
    pending.push({ moment: check.moment, label: check.label, since: check.time });
  }

  return pending;
}
