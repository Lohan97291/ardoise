import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, Sunrise, SunMedium } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { AttendancePanel } from "@/components/ardoise/attendance-panel";
import { SecondaryPageHeader } from "@/components/ardoise/secondary-page-chrome";
import { Input } from "@/components/ui/input";
import { attendanceRosterForDate, formatDateLabel, shiftDateKey, toDateKey } from "@/lib/attendance-helpers";
import {
  getAttendance,
  getAttendanceJustified,
  saveAttendance,
  setAttendanceJustified,
  type AttendanceJustifiedStore,
  type AttendanceMoment,
  type AttendanceStatus,
} from "@/lib/storage";

export const Route = createFileRoute("/appel")({
  head: () => ({
    meta: [
      { title: "Cahier d'appel — Ardoise" },
      {
        name: "description",
        content: "Enregistrer rapidement l'appel du matin et de l'après-midi.",
      },
      { property: "og:title", content: "Cahier d'appel — Ardoise" },
    ],
  }),
  component: AppelPage,
});

const TODAY = toDateKey(new Date());

function AppelPage() {
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [morningAttendance, setMorningAttendance] = useState<Record<string, AttendanceStatus>>(() =>
    getAttendance(TODAY, "morning"),
  );
  const [afternoonAttendance, setAfternoonAttendance] = useState<Record<string, AttendanceStatus>>(
    () => getAttendance(TODAY, "afternoon"),
  );
  const [morningJustified, setMorningJustified] = useState<AttendanceJustifiedStore>(() =>
    getAttendanceJustified(TODAY, "morning"),
  );
  const [afternoonJustified, setAfternoonJustified] = useState<AttendanceJustifiedStore>(() =>
    getAttendanceJustified(TODAY, "afternoon"),
  );
  const [savedFlash, setSavedFlash] = useState<AttendanceMoment | null>(null);
  const savedFlashTimer = useRef<number>(0);

  useEffect(() => {
    setMorningAttendance(getAttendance(selectedDate, "morning"));
    setAfternoonAttendance(getAttendance(selectedDate, "afternoon"));
    setMorningJustified(getAttendanceJustified(selectedDate, "morning"));
    setAfternoonJustified(getAttendanceJustified(selectedDate, "afternoon"));
  }, [selectedDate]);

  useEffect(() => {
    return () => window.clearTimeout(savedFlashTimer.current);
  }, []);

  // Enregistrement automatique : à chaque changement de statut, l'appel est
  // sauvegardé immédiatement (plus besoin de cliquer sur « Enregistrer »).
  function persistMoment(moment: AttendanceMoment, data: Record<string, AttendanceStatus>) {
    saveAttendance(selectedDate, data, moment);
    setSavedFlash(moment);
    window.clearTimeout(savedFlashTimer.current);
    savedFlashTimer.current = window.setTimeout(() => setSavedFlash(null), 1800);
  }

  function changeMoment(moment: AttendanceMoment, studentId: string, status: AttendanceStatus) {
    if (moment === "morning") {
      setMorningAttendance((current) => {
        const next = { ...current, [studentId]: status };
        persistMoment("morning", next);
        return next;
      });
    } else {
      setAfternoonAttendance((current) => {
        const next = { ...current, [studentId]: status };
        persistMoment("afternoon", next);
        return next;
      });
    }
  }

  function toggleJustified(moment: AttendanceMoment, studentId: string, justifiedValue: boolean) {
    setAttendanceJustified(selectedDate, studentId, justifiedValue, moment);
    if (moment === "morning") {
      setMorningJustified((current) => ({ ...current, [studentId]: justifiedValue }));
    } else {
      setAfternoonJustified((current) => ({ ...current, [studentId]: justifiedValue }));
    }
  }

  function setAllPresent(moment: AttendanceMoment) {
    const next = Object.fromEntries(
      attendanceRosterForDate(selectedDate).map((student) => [
        student.id,
        "present" as AttendanceStatus,
      ]),
    );
    if (moment === "morning") setMorningAttendance(next);
    else setAfternoonAttendance(next);
    persistMoment(moment, next);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Ma classe"
          title="Cahier d'appel"
          description="Enregistrement rapide de l'appel, matin et après-midi. Les statistiques mensuelles restent disponibles dans Élèves → Cahier d'appel."
        />

        <div className="card-surface mt-4 p-4 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedDate(shiftDateKey(selectedDate, -1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(shiftDateKey(selectedDate, 1))}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
              {selectedDate !== TODAY ? (
                <button
                  type="button"
                  onClick={() => setSelectedDate(TODAY)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Aujourd'hui
                </button>
              ) : null}
            </div>

            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Journée sélectionnée
              </p>
              <h2 className="mt-1 text-3xl font-semibold capitalize tracking-tight text-foreground sm:text-4xl">
                {formatDateLabel(selectedDate)}
              </h2>
            </div>

            <label className="min-w-[170px] text-sm">
              <span className="mb-1.5 flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <CalendarDays className="h-3.5 w-3.5" />
                Date
              </span>
              <Input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="mt-4 grid gap-4 2xl:grid-cols-2">
          <AttendancePanel
            title="Matin"
            subtitle="Appel de début de journée"
            icon={<Sunrise className="h-5 w-5" />}
            attendance={morningAttendance}
            onChange={(studentId, status) => changeMoment("morning", studentId, status)}
            justified={morningJustified}
            onToggleJustified={(studentId, value) => toggleJustified("morning", studentId, value)}
            saved={savedFlash === "morning"}
            onSetAllPresent={() => setAllPresent("morning")}
            selectedDate={selectedDate}
          />

          <AttendancePanel
            title="Après-midi"
            subtitle="Retour de pause méridienne"
            icon={<SunMedium className="h-5 w-5" />}
            attendance={afternoonAttendance}
            onChange={(studentId, status) => changeMoment("afternoon", studentId, status)}
            justified={afternoonJustified}
            onToggleJustified={(studentId, value) => toggleJustified("afternoon", studentId, value)}
            saved={savedFlash === "afternoon"}
            onSetAllPresent={() => setAllPresent("afternoon")}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </AppShell>
  );
}
