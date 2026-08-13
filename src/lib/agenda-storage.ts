/**
 * Agenda personnel de l'enseignant — RDV, animations pédagogiques, points
 * relevés dans les mails, activités ponctuelles… Volontairement dissocié du
 * cahier journal (qui reste le déroulé des séances de classe) : l'agenda
 * couvre tout ce qui n'est pas une séance mais rythme quand même la journée.
 * Fichier séparé, mêmes conventions que storage.ts / timetable-storage.ts.
 */

import { createLocalStore } from "@/lib/local-store";

export type AgendaItemType = "rdv" | "animation" | "mail" | "ponctuel" | "autre";

export type AgendaItem = {
  id: string;
  date: string; // "YYYY-MM-DD"
  time?: string; // "HH:MM"
  title: string;
  type: AgendaItemType;
  note?: string;
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

export function getAgendaItemsForDate(date: string): AgendaItem[] {
  return agendaStore
    .get()
    .filter((i) => i.date === date)
    .sort((a, b) => (a.time ?? "99:99").localeCompare(b.time ?? "99:99"));
}

/** items dont la date est comprise entre `from` et `to` (inclus, "YYYY-MM-DD"). */
export function getAgendaItemsInRange(from: string, to: string): AgendaItem[] {
  return agendaStore
    .get()
    .filter((i) => i.date >= from && i.date <= to)
    .sort((a, b) => (a.date + (a.time ?? "99:99")).localeCompare(b.date + (b.time ?? "99:99")));
}

export function addAgendaItem(item: Omit<AgendaItem, "id">): AgendaItem[] {
  const items = agendaStore.get();
  items.push({ ...item, id: `agenda-${Date.now()}` });
  agendaStore.set(items);
  return getAgendaItemsForDate(item.date);
}

export function removeAgendaItem(id: string, date: string): AgendaItem[] {
  agendaStore.set(agendaStore.get().filter((i) => i.id !== id));
  return getAgendaItemsForDate(date);
}
