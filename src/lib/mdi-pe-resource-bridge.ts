import type { PrepSheet, ResourceMethod } from "@/lib/ardoise-data";
import { MDI_PE_CATALOG, MDI_PE_PREP_SHEETS, mdiPePrepFor } from "@/lib/mdi-pe-data";

const PERIODS = [1, 2, 3, 4, 5] as const;

function chapterNumber(entryId: string) {
  const match = entryId.match(/^pe-ch(\d+)$/i);
  return match ? Number(match[1]) : null;
}

function chapterLabel(prep: PrepSheet) {
  const number = chapterNumber(prep.id);
  return number ? `Chapitre ${number} — ${prep.title}` : prep.title;
}

export const MDI_PE_SESSION_PREP_SHEETS: PrepSheet[] = MDI_PE_PREP_SHEETS;

export function getMdiPePrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return mdiPePrepFor(id);
}

export const MDI_PE_RESOURCE_METHOD: ResourceMethod = {
  id: "m-mdi-production-ecrit",
  label: "Production d'écrit (MDI)",
  subject: "francais",
  sequences: PERIODS.map((period) => ({
    id: `mdi-production-ecrit-p${period}`,
    label: `Période ${period}`,
    sessions: MDI_PE_CATALOG.filter((entry) => entry.period === period).map((entry) => {
      const prep = mdiPePrepFor(entry.id);
      return {
        id: entry.id,
        label: prep ? chapterLabel(prep) : entry.title,
        prepSheetId: entry.id,
      };
    }),
  })).filter((sequence) => sequence.sessions.length > 0),
};
