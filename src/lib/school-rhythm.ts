import { toISODate } from "@/lib/ardoise-data";
import { getTimetable, WEEKDAYS, type Weekday } from "@/lib/timetable-storage";

export const ZONE_C_PERIODS_2026_2027 = [
  { id: 1 as const, label: "P1", start: "2026-09-01", end: "2026-10-16" },
  { id: 2 as const, label: "P2", start: "2026-11-02", end: "2026-12-18" },
  { id: 3 as const, label: "P3", start: "2027-01-04", end: "2027-02-05" },
  { id: 4 as const, label: "P4", start: "2027-02-22", end: "2027-04-02" },
  { id: 5 as const, label: "P5", start: "2027-04-19", end: "2027-07-02" },
] as const;

const JS_DAY_TO_WEEKDAY: Partial<Record<number, Weekday>> = {
  1: "lundi",
  2: "mardi",
  3: "mercredi",
  4: "jeudi",
  5: "vendredi",
};

function atMidday(dateLike: Date | string): Date {
  const date =
    typeof dateLike === "string" ? new Date(`${dateLike}T12:00:00`) : new Date(dateLike);
  date.setHours(12, 0, 0, 0);
  return date;
}

function addCalendarDays(date: Date, amount: number): Date {
  const next = atMidday(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return atMidday(new Date(year, month - 1, day));
}

function getMetropolitanNoSchoolDatesForYear(year: number): Set<string> {
  const easter = easterSunday(year);
  const easterMonday = addCalendarDays(easter, 1);
  const ascension = addCalendarDays(easter, 39);
  const whitMonday = addCalendarDays(easter, 50);

  return new Set([
    `${year}-01-01`,
    `${year}-05-01`,
    `${year}-05-08`,
    toISODate(ascension),
    toISODate(easterMonday),
    toISODate(whitMonday),
    `${year}-07-14`,
    `${year}-08-15`,
    `${year}-11-01`,
    `${year}-11-11`,
    `${year}-12-25`,
  ]);
}

export function getZoneCSchoolRhythm(date: Date) {
  const timetable = getTimetable();
  const current = atMidday(date);
  const currentPeriod = ZONE_C_PERIODS_2026_2027.find((period) => {
    const start = atMidday(period.start);
    const end = atMidday(period.end);
    return current >= start && current <= end;
  });
  const nextPeriod = ZONE_C_PERIODS_2026_2027.find((period) => current < atMidday(period.start));
  const selectedPeriod =
    currentPeriod ?? nextPeriod ?? ZONE_C_PERIODS_2026_2027[ZONE_C_PERIODS_2026_2027.length - 1];
  const status: "current" | "upcoming" | "ended" = currentPeriod
    ? "current"
    : nextPeriod
      ? "upcoming"
      : "ended";

  const teachingWeekdays = new Set<Weekday>(
    WEEKDAYS.filter((weekday) =>
      (timetable[weekday] ?? []).some((slot) => slot.subject !== "pause"),
    ),
  );

  const noSchoolDates = new Set<string>([
    ...Array.from(getMetropolitanNoSchoolDatesForYear(2026)),
    ...Array.from(getMetropolitanNoSchoolDatesForYear(2027)),
    "2027-05-07",
  ]);

  if (status === "ended") {
    return { status, period: selectedPeriod, schoolDaysLeft: 0, schoolWeeksLeft: 0 };
  }

  const startCursor = status === "upcoming" ? atMidday(selectedPeriod.start) : atMidday(current);
  const endCursor = atMidday(selectedPeriod.end);
  let schoolDaysLeft = 0;
  const activeWeeks = new Set<string>();

  for (let cursor = startCursor; cursor <= endCursor; cursor = addCalendarDays(cursor, 1)) {
    const weekday = JS_DAY_TO_WEEKDAY[cursor.getDay()];
    if (!weekday || !teachingWeekdays.has(weekday)) continue;

    const iso = toISODate(cursor);
    if (noSchoolDates.has(iso)) continue;

    schoolDaysLeft += 1;
    const monday = addCalendarDays(cursor, cursor.getDay() === 0 ? -6 : 1 - cursor.getDay());
    activeWeeks.add(toISODate(monday));
  }

  return {
    status,
    period: selectedPeriod,
    schoolDaysLeft,
    schoolWeeksLeft: activeWeeks.size,
  };
}
