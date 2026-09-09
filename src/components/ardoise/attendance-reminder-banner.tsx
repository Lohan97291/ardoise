import { Link } from "@tanstack/react-router";
import { BellRing, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  ATTENDANCE_REMINDER_SETTINGS_EVENT,
  getPendingAttendanceReminders,
  snoozeAttendanceReminder,
  type PendingAttendanceReminder,
} from "@/lib/attendance-reminder";
import { toISODate } from "@/lib/ardoise-data";

const CHECK_INTERVAL_MS = 60_000;

export function AttendanceReminderBanner() {
  const [pending, setPending] = useState<PendingAttendanceReminder[]>([]);

  useEffect(() => {
    function refresh() {
      setPending(getPendingAttendanceReminders());
    }

    refresh();
    const intervalId = window.setInterval(refresh, CHECK_INTERVAL_MS);
    window.addEventListener(ATTENDANCE_REMINDER_SETTINGS_EVENT, refresh);
    window.addEventListener("focus", refresh);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(ATTENDANCE_REMINDER_SETTINGS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (pending.length === 0) return null;

  const today = toISODate(new Date());

  return (
    <div className="mx-3 mt-3 overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 shadow-sm sm:mx-6">
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-700">
          <BellRing className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-amber-950">
            {pending.length > 1
              ? "Deux appels ne sont pas encore enregistrés aujourd'hui"
              : `${pending[0].label} pas encore enregistré`}
          </p>
          <p className="mt-0.5 text-xs text-amber-900/80">
            {pending
              .map((reminder) => `${reminder.label} (prévu à ${reminder.since})`)
              .join(" · ")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              to="/eleves?tab=appel"
              className="inline-flex items-center rounded-full bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Faire l'appel
            </Link>
            {pending.map((reminder) => (
              <button
                key={reminder.moment}
                type="button"
                onClick={() => {
                  snoozeAttendanceReminder(today, reminder.moment);
                  setPending(getPendingAttendanceReminders());
                }}
                className="inline-flex items-center rounded-full border border-amber-300 bg-white/60 px-3 py-1.5 text-xs font-medium text-amber-900 transition-colors hover:bg-white"
              >
                Reporter « {reminder.label} »
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            for (const reminder of pending) {
              snoozeAttendanceReminder(today, reminder.moment);
            }
            setPending([]);
          }}
          aria-label="Fermer le rappel d'appel"
          title="Fermer (reporter à aujourd'hui)"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-amber-700/70 transition-colors hover:bg-amber-100 hover:text-amber-900"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
