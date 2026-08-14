/**
 * Agenda personnel de l'enseignant — RDV, animations pédagogiques, points
 * relevés dans les mails, activités ponctuelles… Volontairement dissocié du
 * cahier journal (qui reste le déroulé des séances de classe) : l'agenda
 * couvre tout ce qui n'est pas une séance mais rythme quand même la journée.
 * Fichier séparé, mêmes conventions que storage.ts / timetable-storage.ts.
 */

import { createLocalStore } from "@/lib/local-store";
import { fullName, STUDENTS } from "@/lib/ardoise-eval";
import { getStudentProfile } from "@/lib/student-profiles";

export type AgendaItemType = "rdv" | "animation" | "mail" | "ponctuel" | "autre";

export type AgendaItem = {
  id: string;
  date: string; // "YYYY-MM-DD"
  time?: string; // "HH:MM"
  title: string;
  type: AgendaItemType;
  note?: string;
  source?: "manual" | "birthday";
};

export const AGENDA_TYPE_LABEL: Record<AgendaItemType, string> = {
  rdv: "RDV",
  animation: "Animation péda",
  mail: "À traiter (mail)",
  ponctuel: "Ponctuel",
  autre: "Autre",
};

const AGENDA_KEY = "ardoise.agenda.v1";
const agendaStore = createLocalStore<AgendaItem[]>(AGENDA_KEY, []);

function sortAgendaItems(items: AgendaItem[]): AgendaItem[] {
  return [...items].sort((a, b) => (a.time ?? "99:99").localeCompare(b.time ?? "99:99"));
}

function buildBirthdayItem(studentId: string, year: number): AgendaItem | null {
  const student = STUDENTS.find((entry) => entry.id === studentId);
  const birthDate = getStudentProfile(studentId).birthDate;
  if (!student || !birthDate) return null;

  const [birthYear, month, day] = birthDate.split("-");
  if (!birthYear || !month || !day) return null;

  const age = year - Number.parseInt(birthYear, 10);
  if (!Number.isFinite(age) || age <= 0) return null;

  return {
    id: `birthday-${studentId}-${year}`,
    date: `${year}-${month}-${day}`,
    title: `🎂 Anniversaire · ${fullName(student)}`,
    type: "autre",
    note: `${age} ans`,
    source: "birthday",
  };
}

function getBirthdayItemsForDate(date: string): AgendaItem[] {
  const year = Number.parseInt(date.slice(0, 4), 10);
  return STUDENTS.map((student) => buildBirthdayItem(student.id, year))
    .filter((item): item is AgendaItem => Boolean(item))
    .filter((item) => item.date === date);
}

function getBirthdayItemsInRange(from: string, to: string): AgendaItem[] {
  const fromYear = Number.parseInt(from.slice(0, 4), 10);
  const toYear = Number.parseInt(to.slice(0, 4), 10);
  const items: AgendaItem[] = [];

  for (let year = fromYear; year <= toYear; year += 1) {
    for (const student of STUDENTS) {
      const item = buildBirthdayItem(student.id, year);
      if (item && item.date >= from && item.date <= to) items.push(item);
    }
  }

  return items;
}

export function getAgendaItemsForDate(date: string): AgendaItem[] {
  return sortAgendaItems([
    ...agendaStore.get().filter((i) => i.date === date),
    ...getBirthdayItemsForDate(date),
  ]);
}

/** items dont la date est comprise entre `from` et `to` (inclus, "YYYY-MM-DD"). */
export function getAgendaItemsInRange(from: string, to: string): AgendaItem[] {
  return [...agendaStore.get().filter((i) => i.date >= from && i.date <= to), ...getBirthdayItemsInRange(from, to)].sort(
    (a, b) => (a.date + (a.time ?? "99:99")).localeCompare(b.date + (b.time ?? "99:99")),
  );
}

export function addAgendaItem(item: Omit<AgendaItem, "id">): AgendaItem[] {
  const items = agendaStore.get();
  items.push({ ...item, id: `agenda-${Date.now()}`, source: item.source ?? "manual" });
  agendaStore.set(items);
  return getAgendaItemsForDate(item.date);
}

export function removeAgendaItem(id: string, date: string): AgendaItem[] {
  agendaStore.set(agendaStore.get().filter((i) => i.id !== id));
  return getAgendaItemsForDate(date);
}
