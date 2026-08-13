import { getPrepSheet, SUBJECTS, type Session } from "@/lib/ardoise-data";
import { getSessionExtras } from "@/lib/custom-session-storage";

export type PreparationItemKind = "photocopy" | "material" | "manual";

export type PreparationItem = {
  id: string;
  label: string;
  kind: PreparationItemKind;
  sessionId?: string;
  sessionTitle?: string;
  sessionTime?: string;
  subjectLabel?: string;
  checkedKey: string;
  removable?: boolean;
};

type PreparationExtra = {
  id: string;
  label: string;
  sessionId?: string | null;
  category?: PreparationItemKind;
};

const ROUTINE_MATERIAL_HINTS = [
  "cahier",
  "ardoise",
  "crayon",
  "stylo",
  "gomme",
  "tableau",
  "manuel",
  "fichier",
  "trousse",
];

function normalizeLabel(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

export function isRoutineMaterial(value: string): boolean {
  const normalized = normalizeLabel(value);
  return ROUTINE_MATERIAL_HINTS.some((hint) => normalized.includes(hint));
}

export function shouldSurfacePreparationMaterial(value: string): boolean {
  if (!value.trim()) return false;
  return !isRoutineMaterial(value);
}

function uniqueByKey(items: PreparationItem[]): PreparationItem[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.checkedKey)) return false;
    seen.add(item.checkedKey);
    return true;
  });
}

export function getSessionPreparationItems(session: Session): PreparationItem[] {
  const prepSheet = getPrepSheet(session.prepSheetId);
  const extras = getSessionExtras(session.id);
  const sessionPrefix = `${session.start} · ${session.title}`;
  const base = {
    sessionId: session.id,
    sessionTitle: session.title,
    sessionTime: `${session.start} - ${session.end}`,
    subjectLabel: SUBJECTS[session.subject].label,
  };

  const photocopies = [
    ...(prepSheet?.photocopies ?? []),
    ...extras.photocopies,
  ].map<PreparationItem>((label, index) => ({
    ...base,
    id: `${session.id}-photocopy-${index}`,
    label,
    kind: "photocopy",
    checkedKey: `${sessionPrefix}::photocopy::${normalizeLabel(label)}`,
  }));

  const materials = [...(prepSheet?.material ?? []), ...extras.material]
    .filter(shouldSurfacePreparationMaterial)
    .map<PreparationItem>((label, index) => ({
      ...base,
      id: `${session.id}-material-${index}`,
      label,
      kind: "material",
      checkedKey: `${sessionPrefix}::material::${normalizeLabel(label)}`,
    }));

  return uniqueByKey([...photocopies, ...materials]);
}

export function getPreparationItems(
  sessions: Session[],
  extraPrepared: PreparationExtra[],
): PreparationItem[] {
  const items = sessions.flatMap(getSessionPreparationItems);

  for (const extra of extraPrepared) {
    const linkedSession = extra.sessionId
      ? sessions.find((session) => session.id === extra.sessionId)
      : undefined;
    items.push({
      id: extra.id,
      label: extra.label,
      kind: extra.category ?? "manual",
      sessionId: linkedSession?.id,
      sessionTitle: linkedSession?.title,
      sessionTime: linkedSession ? `${linkedSession.start} - ${linkedSession.end}` : undefined,
      subjectLabel: linkedSession ? SUBJECTS[linkedSession.subject].label : undefined,
      checkedKey: extra.id,
      removable: true,
    });
  }

  return items.sort((left, right) => {
    if (!left.sessionTime && right.sessionTime) return 1;
    if (left.sessionTime && !right.sessionTime) return -1;
    return `${left.sessionTime ?? "zz"}${left.label}`.localeCompare(
      `${right.sessionTime ?? "zz"}${right.label}`,
      "fr",
    );
  });
}
