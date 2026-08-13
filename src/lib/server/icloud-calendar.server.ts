import { createHash } from "node:crypto";

export type ICloudCalendarEvent = {
  id: string;
  summary: string;
  location?: string;
  description?: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
};

function calendarUrl(): string | null {
  const value = process.env.ICLOUD_CALENDAR_URL?.trim();
  return value ? value.replace(/^webcal:/i, "https:") : null;
}

export function icloudCalendarConfigured(): boolean {
  return Boolean(calendarUrl());
}

function unfoldIcs(value: string): string[] {
  return value.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
}

function unescapeIcs(value: string): string {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

function parseIcsDate(value: string): { date?: string; dateTime?: string } {
  if (/^\d{8}$/.test(value)) {
    return { date: `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}` };
  }
  const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})(Z)?$/);
  if (!match) return {};
  const [, year, month, day, hour, minute, second, utc] = match;
  return {
    dateTime: utc
      ? `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
      : `${year}-${month}-${day}T${hour}:${minute}:${second}`,
  };
}

function parseCalendar(text: string): ICloudCalendarEvent[] {
  const events: ICloudCalendarEvent[] = [];
  let current: Record<string, string> | null = null;
  for (const line of unfoldIcs(text)) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current?.SUMMARY && current.DTSTART) {
        const start = parseIcsDate(current.DTSTART);
        const end = parseIcsDate(current.DTEND ?? current.DTSTART);
        const id =
          current.UID ?? createHash("sha256").update(JSON.stringify(current)).digest("hex");
        events.push({
          id,
          summary: unescapeIcs(current.SUMMARY),
          location: current.LOCATION ? unescapeIcs(current.LOCATION) : undefined,
          description: current.DESCRIPTION ? unescapeIcs(current.DESCRIPTION) : undefined,
          start,
          end,
        });
      }
      current = null;
      continue;
    }
    if (!current) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const rawName = line.slice(0, separator).split(";")[0];
    current[rawName] = line.slice(separator + 1);
  }
  return events;
}

export async function listICloudEvents(
  timeMin: string,
  timeMax: string,
): Promise<ICloudCalendarEvent[]> {
  const url = calendarUrl();
  if (!url) return [];
  const response = await fetch(url, { headers: { accept: "text/calendar,text/plain" } });
  if (!response.ok) throw new Error("Lecture du calendrier iCloud impossible.");
  const events = parseCalendar(await response.text());
  const min = Date.parse(timeMin);
  const max = Date.parse(timeMax);
  return events.filter((event) => {
    const value = event.start.dateTime
      ? Date.parse(event.start.dateTime)
      : Date.parse(`${event.start.date ?? ""}T00:00:00`);
    return Number.isNaN(value) || (value >= min && value < max);
  });
}
