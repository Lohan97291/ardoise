/**
 * Journal horodaté des résultats de correction rapide, pour calculer des
 * signaux "à surveiller" basés sur les difficultés RÉCENTES (pas tout
 * l'historique). Fichier séparé, mêmes conventions que storage.ts —
 * alimenté depuis correction-rapide.tsx en plus de saveOneResult (storage.ts,
 * protégé, non modifié).
 */
import { fluenceLevel, STUDENTS, type Student, type StatusKey } from "@/lib/ardoise-eval";
import { getFluenceRecords } from "@/lib/storage";

export type ResultLogEntry = {
  studentId: string;
  status: StatusKey;
  label: string; // ex. "Français · Compréhension"
  loggedAt: number; // Date.now()
};

const LOG_KEY = "ardoise.resultLog.v1";
const MAX_ENTRIES = 500;
const RECENT_DAYS = 7;

function loadLog(): ResultLogEntry[] {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? (JSON.parse(raw) as ResultLogEntry[]) : [];
  } catch {
    return [];
  }
}

export function logResult(entry: Omit<ResultLogEntry, "loggedAt">): void {
  const log = loadLog();
  log.push({ ...entry, loggedAt: Date.now() });
  localStorage.setItem(LOG_KEY, JSON.stringify(log.slice(-MAX_ENTRIES)));
}

export type StudentSignal = { student: Student; reason: string; weight: number };

/**
 * Combine deux sources réelles : les résultats NA/PA des derniers jours
 * (correction rapide) et les alertes de fluence — pas de source "groupes de
 * besoin" distincte, groupes-besoin.tsx dérive déjà des mêmes résultats.
 */
export function getRecentSignals(days = RECENT_DAYS): StudentSignal[] {
  const since = Date.now() - days * 24 * 60 * 60 * 1000;
  const recentLog = loadLog().filter((e) => e.loggedAt >= since);

  const scores = new Map<string, { weight: number; reasons: string[] }>();
  const bump = (studentId: string, weight: number, reason: string) => {
    const cur = scores.get(studentId) ?? { weight: 0, reasons: [] };
    cur.weight += weight;
    cur.reasons.push(reason);
    scores.set(studentId, cur);
  };

  // NA/PA récents en premier : raison prioritaire (plus actionnable que la fluence).
  for (const entry of recentLog) {
    if (entry.status !== "NA" && entry.status !== "PA") continue;
    bump(
      entry.studentId,
      1,
      entry.status === "NA"
        ? `Non acquis récemment : ${entry.label}`
        : `Partiellement acquis récemment : ${entry.label}`,
    );
  }

  for (const record of getFluenceRecords()) {
    if (fluenceLevel(record.wpm) === "alerte") {
      bump(record.studentId, 2, `Fluence ${record.wpm} mots/min`);
    }
  }

  return Array.from(scores.entries())
    .map(([studentId, { weight, reasons }]) => ({
      student: STUDENTS.find((s) => s.id === studentId),
      reason: reasons[0]!,
      weight,
    }))
    .filter((x): x is StudentSignal => x.student !== undefined)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 5);
}
