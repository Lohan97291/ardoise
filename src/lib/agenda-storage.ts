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

// ─────────────────────────────────────────────
// Import ponctuel des « dates à retenir » du panneau d'affichage de l'école
// (septembre-octobre 2026), une seule fois par navigateur.
// ─────────────────────────────────────────────
const WHITEBOARD_SEED_KEY = "ardoise.agenda.seed.whiteboard-sept-oct-2026";

const WHITEBOARD_SEPT_OCT_2026_ITEMS: Omit<AgendaItem, "source">[] = [
  { id: "whiteboard-2026-09-10-conseil-maitres", date: "2026-09-10", time: "11:45", title: "Conseil des maîtres", type: "rdv" },
  { id: "whiteboard-2026-09-14-reunion-parents", date: "2026-09-14", time: "18:15", title: "Réunion parents", type: "rdv", note: "CP + CE1 + CM1a + CM2" },
  { id: "whiteboard-2026-09-15-reunion-parents", date: "2026-09-15", time: "18:15", title: "Réunion parents", type: "rdv", note: "CE2a + CM1b + CM1c" },
  { id: "whiteboard-2026-09-17-conseil-maitres", date: "2026-09-17", time: "11:45", title: "Conseil des maîtres", type: "rdv" },
  { id: "whiteboard-2026-09-18-absence-aurore", date: "2026-09-18", time: "14:50", title: "Absence Aurore", type: "autre", note: "CE2 B" },
  { id: "whiteboard-2026-09-18-conseil-cycle", date: "2026-09-18", title: "Conseil de cycle GS/CP", type: "rdv", note: "Horaire à confirmer" },
  { id: "whiteboard-2026-09-22-handisport-cm1a", date: "2026-09-22", time: "08:45", title: "Handisport — CM1a", type: "ponctuel", note: "8h45 – 10h15" },
  { id: "whiteboard-2026-09-22-handisport-cm1b", date: "2026-09-22", time: "10:15", title: "Handisport — CM1b", type: "ponctuel", note: "10h15 – 11h45" },
  { id: "whiteboard-2026-09-22-handisport-cm1c", date: "2026-09-22", time: "13:30", title: "Handisport — CM1c", type: "ponctuel", note: "13h30 – 15h" },
  { id: "whiteboard-2026-09-22-handisport-ce2b", date: "2026-09-22", time: "15:00", title: "Handisport — CE2b", type: "ponctuel", note: "15h – 16h30" },
  { id: "whiteboard-2026-09-23-conseil-cycle-projet", date: "2026-09-23", time: "09:00", title: "Conseil de cycle — Projet d'école", type: "rdv", note: "Feuille de route" },
  { id: "whiteboard-2026-09-24-rased-ce2", date: "2026-09-24", time: "13:00", title: "Concertation RASED", type: "rdv", note: "CE2 A + B + C" },
  { id: "whiteboard-2026-09-28-rased-ce1", date: "2026-09-28", time: "13:00", title: "Concertation RASED", type: "rdv", note: "CE1 A + B + C" },
  { id: "whiteboard-2026-09-29-rased-ce1-suite", date: "2026-09-29", time: "13:00", title: "Concertation RASED (suite)", type: "rdv", note: "CE1" },
  { id: "whiteboard-2026-09-29-usep-cp", date: "2026-09-29", title: "Journée USEP — Jeux d'orientation", type: "ponctuel", note: "CP" },
  { id: "whiteboard-2026-10-02-usep-ce1", date: "2026-10-02", title: "Journée USEP", type: "ponctuel", note: "CE1a + CE1c" },
  { id: "whiteboard-2026-10-02-fin-rased", date: "2026-10-02", time: "13:30", title: "Fin des concertations RASED (si besoin)", type: "rdv" },
  { id: "whiteboard-2026-10-08-ess-kamil", date: "2026-10-08", time: "13:45", title: "ESS — Mohamed Kamil", type: "rdv", note: "CE1 D" },
  { id: "whiteboard-2026-10-08-ess-nyapi-gath", date: "2026-10-08", time: "14:45", title: "ESS — Nyapi Gath Emmanuella", type: "rdv", note: "CE1 D" },
  { id: "whiteboard-2026-10-08-ess-ly", date: "2026-10-08", time: "15:45", title: "ESS — Ly Tidiane", type: "rdv", note: "CE2 A" },
  { id: "whiteboard-2026-10-09-elections-parents", date: "2026-10-09", title: "Élections des parents d'élèves", type: "autre" },
  { id: "whiteboard-2026-10-12-ess-sacko", date: "2026-10-12", time: "13:45", title: "ESS — Sacko Ali", type: "rdv", note: "CE2 C" },
  { id: "whiteboard-2026-10-12-ess-batalena", date: "2026-10-12", time: "14:45", title: "ESS — Batalena Raphaël", type: "rdv", note: "CM2 b" },
  { id: "whiteboard-2026-10-15-conseil-ecole", date: "2026-10-15", time: "18:15", title: "1er Conseil d'école", type: "rdv" },
  { id: "whiteboard-2026-10-16-vacances", date: "2026-10-16", time: "16:30", title: "🙂 Vacances", type: "autre" },
];

function ensureWhiteboardDatesSeeded(): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(WHITEBOARD_SEED_KEY) === "1") return;
  window.localStorage.setItem(WHITEBOARD_SEED_KEY, "1");

  const items = agendaStore.get();
  const existingIds = new Set(items.map((i) => i.id));
  const additions = WHITEBOARD_SEPT_OCT_2026_ITEMS.filter((i) => !existingIds.has(i.id)).map(
    (i) => ({ ...i, source: "manual" as const }),
  );
  if (additions.length === 0) return;
  agendaStore.set([...items, ...additions]);
}

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
  ensureWhiteboardDatesSeeded();
  return sortAgendaItems([
    ...agendaStore.get().filter((i) => i.date === date),
    ...getBirthdayItemsForDate(date),
  ]);
}

/** items dont la date est comprise entre `from` et `to` (inclus, "YYYY-MM-DD"). */
export function getAgendaItemsInRange(from: string, to: string): AgendaItem[] {
  ensureWhiteboardDatesSeeded();
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
