import type { PrepPhase, PrepSheet, ResourceMethod } from "@/lib/ardoise-data";

import auxiliaryPeriod1Raw from "@/lib/data/maths-ce1-p1-auxiliary-excerpts.json";
import period1Raw from "@/lib/data/maths-ce1-periode1-verbatim.json";
import period1GuideExcerptsRaw from "@/lib/data/maths-ce1-p1-guide-excerpts.json";
import period2GuideExcerptsRaw from "@/lib/data/maths-ce1-p2-guide-excerpts.json";
import period3GuideExcerptsRaw from "@/lib/data/maths-ce1-p3-guide-excerpts.json";
import period2Raw from "@/lib/data/maths-ce1-periode2-verbatim.json";
import period3Raw from "@/lib/data/maths-ce1-periode3-verbatim.json";
import period4Raw from "@/lib/data/maths-ce1-periode4-verbatim.json";
import period5Raw from "@/lib/data/maths-ce1-periode5-verbatim.json";

type RawMaybeList = string | string[] | null | undefined;

type RawPhase = {
  n?: string | null;
  pe?: RawMaybeList;
  cons?: RawMaybeList;
  el?: RawMaybeList;
  note?: RawMaybeList;
};

type RawSession = {
  seance_number: number | string;
  title?: string | null;
  type?: string | null;
  duration?: number | string | null;
  guidePage?: number | null;
  materials?: string[];
  phases?: RawPhase[];
  note?: string | null;
};

type RawOtherPiste = {
  label?: string | null;
  verbatim_lines?: string[];
};

type RawModule = {
  number: number;
  title: string;
  domain?: string | null;
  guidePage?: number | null;
  objective?: string | null;
  note?: string | null;
  seances: RawSession[];
  autresPistes?: RawOtherPiste[];
};

type RawPeriod = {
  id: string;
  label: string;
  modules: RawModule[];
};

type RawMathsFile = {
  method?: string;
  subject?: string;
  level?: string;
  source?: string;
  periods: RawPeriod[];
};

type P1GuideEntry = {
  guidePage: number;
  sourceExcerpt: string;
};

type P1GuideExcerptsMap = Record<string, Record<string, P1GuideEntry>>;

type AuxiliarySessionEntry = {
  session: number | string;
  sourceExcerpt: string;
};

type AuxiliaryGroupEntry = {
  module: number;
  title: string;
  guidePage: number;
  sessions: AuxiliarySessionEntry[];
};

type AuxiliaryPeriod1Map = {
  atelierProblemes: AuxiliaryGroupEntry[];
  calculMental: AuxiliaryGroupEntry[];
  flashMaths: AuxiliaryGroupEntry[];
};

const VERBATIM_FILES = [
  period1Raw,
  period2Raw,
  period3Raw,
  period4Raw,
  period5Raw,
] as RawMathsFile[];

const GUIDE_EXCERPTS_BY_PERIOD: Partial<Record<string, P1GuideExcerptsMap>> = {
  P1: period1GuideExcerptsRaw as P1GuideExcerptsMap,
  P2: period2GuideExcerptsRaw as P1GuideExcerptsMap,
  P3: period3GuideExcerptsRaw as P1GuideExcerptsMap,
};
const AUXILIARY_PERIOD1 = auxiliaryPeriod1Raw as AuxiliaryPeriod1Map;

const AUXILIARY_PHASE_TITLES = [
  "ÉCHAUFFEMENT",
  "Réactivation",
  "Mise en situation",
  "Explicitation",
  "Pratique guidée",
  "Pratique autonome",
  "Évaluation",
  "Consolidation",
  "Clôture de la séquence",
  "Clôture de la séance",
] as const;

const GUIDE_PHASE_TITLES = [
  "ÉCHAUFFEMENT",
  "Réactivation",
  "Mise en situation",
  "Explicitation",
  "Pratique guidée",
  "Pratique autonome",
  "Évaluation",
  "Consolidation",
  "Clôture de la séquence",
  "Clôture de la séance",
] as const;

function normalizeLooseHeading(value: string): string {
  return normalizeText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()]/g, "")
    .toUpperCase();
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normalizeList(value: RawMaybeList): string[] {
  if (!value) return [];
  const items = Array.isArray(value) ? value : [value];
  return items.map((item) => normalizeText(item)).filter(Boolean);
}

function formatGuidePage(page?: number | null): string | null {
  return page ? `Guide enseignant : p. ${page}` : null;
}

function formatDuration(value?: number | string | null): string {
  if (!value) return "";
  return typeof value === "number" ? `${value} min` : normalizeText(String(value));
}

function splitStructuredSegments(text: string): string[] {
  const normalized = normalizeText(text)
    .replace(/\s+((?:\d+(?:RE|E)\s+ÉTAPE\b))/gi, "\n$1")
    .replace(/\s+((?:ACTIVITÉ\s+\d+\b))/gi, "\n$1")
    .replace(/\s+((?:Procédure visée\b|Procédures visées\b))/gi, "\n$1")
    .replace(/\s+((?:Obstacles possibles\b))/gi, "\n$1")
    .replace(/\s+((?:CE QUE L['’]ENSEIGNANT DOIT SAVOIR\b))/gi, "\n$1");

  return normalized
    .split("\n")
    .map((segment) => normalizeText(segment))
    .filter(Boolean)
    .map((segment) =>
      isGuideStructuralLine(segment) ? formatGuideStructuralLine(segment) : segment,
    );
}

function buildPhaseDetail(phase: RawPhase): string {
  const teacherLines = normalizeList(phase.pe).flatMap(splitStructuredSegments);
  const instructionLines = normalizeList(phase.cons).flatMap(splitStructuredSegments);
  const studentLines = normalizeList(phase.el).flatMap(splitStructuredSegments);
  const repereLines = normalizeList(phase.note).flatMap(splitStructuredSegments);

  const maxLength = Math.max(
    teacherLines.length,
    instructionLines.length,
    studentLines.length,
    repereLines.length,
  );

  const orderedBlocks: string[] = [];
  const pushBlock = (label: string, text?: string) => {
    if (!text) return;
    orderedBlocks.push(`${label}\n• ${normalizeGuideDisplayText(text)}`);
  };

  for (let index = 0; index < maxLength; index += 1) {
    pushBlock("Activité enseignant", teacherLines[index]);
    pushBlock("Consignes", instructionLines[index]);
    pushBlock("Activité élève", studentLines[index]);
    pushBlock("Repères", repereLines[index]);
  }

  return orderedBlocks.join("\n");
}

function isGuideDerivedDetailSuspicious(detail: string): boolean {
  return (
    /GUIDE DE L['’]ENSEIGNANT/i.test(detail) ||
    /OBJECTIFS D['’]APPRENTISSAGE DU PROGRAMME/i.test(detail) ||
    /NOMBRES ENTIERS/i.test(detail) ||
    /Écritures chiffrées des nombres/i.test(detail) ||
    /\bD\d+\b/.test(detail)
  );
}

function shouldPreferGuideDetail(rawDetail: string, guideDetail?: string): boolean {
  if (!guideDetail) return false;
  if (isGuideDerivedDetailSuspicious(guideDetail)) return false;

  const normalizedRaw = normalizeText(rawDetail);
  const normalizedGuide = normalizeText(guideDetail);

  if (!normalizedGuide) return false;
  if (!normalizedRaw) return true;

  if (/contenu non transcrit/i.test(normalizedRaw)) return true;
  if (normalizedGuide.includes("1re étape") || normalizedGuide.includes("2e étape")) return true;
  if (normalizedGuide.includes("Ce qu'on dit aux élèves")) return true;

  return normalizedGuide.length >= Math.round(normalizedRaw.length * 0.75);
}

type GuideStepKind = "teacher" | "instruction" | "student" | "repere";

type GuideOrderedStep = {
  kind: GuideStepKind;
  text: string;
};

function getGuideStepHeading(kind: GuideStepKind): string {
  switch (kind) {
    case "teacher":
      return "Activité enseignant";
    case "instruction":
      return "Consignes";
    case "student":
      return "Activité élève";
    case "repere":
      return "Repères";
  }
}

function isGuideNoiseLine(line: string): boolean {
  return (
    /^\d+$/.test(line) ||
    /^NOMBRES ENTIERS$/i.test(line) ||
    /^ESPACE ET GÉOMÉTRIE$/i.test(line) ||
    /^GUIDE DE L['’]ENSEIGNANT/i.test(line) ||
    /^Écritures chiffrées des nombres/i.test(line) ||
    /^D\d+\s*$/.test(line)
  );
}

function isGuideProgramBlockStart(line: string): boolean {
  return /^OBJECTIFS D['’]APPRENTISSAGE DU PROGRAMME/i.test(line);
}

function isGuideStructuralLine(line: string): boolean {
  return (
    /^\d+(?:RE|E)\s+ÉTAPE\b/i.test(line) ||
    /^ACTIVITÉ\s+\d+\b/i.test(line) ||
    /^CE QUE L['’]ENSEIGNANT DOIT SAVOIR/i.test(line) ||
    /^Procédure visée/i.test(line) ||
    /^Procédures visées/i.test(line) ||
    /^Obstacles possibles/i.test(line)
  );
}

function normalizeGuideDisplayText(text: string): string {
  return normalizeText(text)
    .replace(/\s+\./g, ".")
    .replace(/\s+,/g, ",")
    .replace(/\s+\)/g, ")")
    .replace(/\(\s+/g, "(")
    .replace(/\s+:/g, " :");
}

function formatGuideStructuralLine(line: string): string {
  const normalizedLine = normalizeGuideDisplayText(line);

  const stepMatch = normalizedLine.match(/^(\d+)(RE|E)\s+ÉTAPE\s*:?\s*(.*)$/i);
  if (stepMatch) {
    const [, number, suffix, remainder] = stepMatch;
    const ordinal = suffix.toUpperCase() === "RE" ? `${number}re étape` : `${number}e étape`;
    return remainder ? `${ordinal} : ${remainder}` : ordinal;
  }

  if (/^ACTIVITÉ\s+\d+\b/i.test(normalizedLine)) {
    return normalizedLine.charAt(0) + normalizedLine.slice(1).toLowerCase();
  }

  return normalizedLine;
}

function buildGuidePhaseDetailMap(
  session: RawSession,
  guideEntry?: P1GuideEntry,
): Map<string, string> {
  if (!guideEntry?.sourceExcerpt) return new Map();

  const phaseTitles = (session.phases ?? [])
    .map((phase) => normalizeText(phase.n || ""))
    .filter(Boolean);
  if (phaseTitles.length === 0) return new Map();

  const detailsByPhase = new Map<string, GuideOrderedStep[]>();
  let currentPhaseTitle: string | null = null;
  let currentSection: "teacher" | "student" | "repere" | null = null;
  let currentStudentLabel = "";
  let skipUntilNextPhaseTitle = false;

  const pushStep = (kind: GuideStepKind, text: string) => {
    if (!currentPhaseTitle) return;
    const normalizedText = normalizeGuideDisplayText(text);
    if (!normalizedText) return;

    const phaseSteps = detailsByPhase.get(currentPhaseTitle) ?? [];
    phaseSteps.push({ kind, text: normalizedText });
    detailsByPhase.set(currentPhaseTitle, phaseSteps);
  };

  const appendToLastStep = (text: string) => {
    if (!currentPhaseTitle) return;
    const phaseSteps = detailsByPhase.get(currentPhaseTitle);
    if (!phaseSteps?.length) return;

    const normalizedText = normalizeGuideDisplayText(text);
    if (!normalizedText) return;

    phaseSteps[phaseSteps.length - 1] = {
      ...phaseSteps[phaseSteps.length - 1],
      text: `${phaseSteps[phaseSteps.length - 1].text} ${normalizedText}`,
    };
  };

  for (const rawLine of guideEntry.sourceExcerpt.split("\n")) {
    const line = normalizeText(rawLine);
    if (!line || isGuideNoiseLine(line)) continue;
    const looseLine = normalizeLooseHeading(line);

    if (/^S[ÉE]ANCE\s+\d+/i.test(line) && currentPhaseTitle) {
      break;
    }

    if (phaseTitles.includes(line)) {
      currentPhaseTitle = line;
      currentSection = null;
      currentStudentLabel = "";
      skipUntilNextPhaseTitle = false;
      continue;
    }

    if (!currentPhaseTitle) continue;
    if (skipUntilNextPhaseTitle) continue;

    if (isGuideProgramBlockStart(line)) {
      skipUntilNextPhaseTitle = true;
      currentSection = null;
      currentStudentLabel = "";
      continue;
    }

    if (looseLine.startsWith("ACTIVITE ENSEIGNANT")) {
      currentSection = "teacher";
      currentStudentLabel = "";
      continue;
    }

    if (looseLine.startsWith("ACTIVITE ELEVE")) {
      currentSection = "student";
      currentStudentLabel = "";
      continue;
    }

    if (looseLine === "ELEVE A" || looseLine === "ELEVE B") {
      currentStudentLabel = line.replace("ÉLÈVE", "Élève");
      continue;
    }

    if (isGuideStructuralLine(line)) {
      currentSection =
        /^(Procédure visée|Procédures visées|Obstacles possibles|CE QUE L['’]ENSEIGNANT DOIT SAVOIR)/i.test(
          line,
        )
          ? "repere"
          : currentSection;
      pushStep(
        currentSection === "student"
          ? "student"
          : currentSection === "repere"
            ? "repere"
            : "teacher",
        formatGuideStructuralLine(line),
      );
      continue;
    }

    if (line.startsWith("Procédures visées")) {
      currentSection = "repere";
      const remainder = normalizeText(line.replace(/^Procédures visées/i, ""));
      if (remainder) {
        pushStep("repere", remainder);
      }
      continue;
    }

    if (line.startsWith("੉")) {
      const text = line.replace(/^੉\s*/, "");
      const kind =
        currentSection === "student"
          ? "student"
          : currentSection === "repere"
            ? "repere"
            : "teacher";
      pushStep(
        kind,
        kind === "student" && currentStudentLabel ? `${currentStudentLabel} : ${text}` : text,
      );
      continue;
    }

    if (line.startsWith("􀌤")) {
      pushStep("instruction", line.replace(/^􀌤\s*/, ""));
      continue;
    }

    if (line.startsWith("-")) {
      const text = line.replace(/^-+\s*/, "");
      const kind =
        currentSection === "student"
          ? "student"
          : currentSection === "repere"
            ? "repere"
            : "teacher";
      pushStep(
        kind,
        kind === "student" && currentStudentLabel ? `${currentStudentLabel} : ${text}` : text,
      );
      continue;
    }

    appendToLastStep(line);
  }

  return new Map(
    Array.from(detailsByPhase.entries()).map(([title, steps]) => [
      title,
      steps.map((step) => `${getGuideStepHeading(step.kind)}\n• ${step.text}`).join("\n"),
    ]),
  );
}

function buildPhaseFallback(note?: string | null): PrepPhase[] {
  const detail = normalizeText(
    note || "Le contenu détaillé de cette séance n'a pas été transcrit dans la source fournie.",
  );
  return [
    {
      title: "Source à compléter",
      detail,
    },
  ];
}

function buildGuideOnlyPhases(excerpt?: string): PrepPhase[] {
  if (!excerpt) return [];

  const phasePattern = new RegExp(GUIDE_PHASE_TITLES.join("|"), "g");

  const matches = [...excerpt.matchAll(phasePattern)];

  if (matches.length === 0) return [];

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end =
      index + 1 < matches.length ? (matches[index + 1].index ?? excerpt.length) : excerpt.length;
    const title = normalizeText(match[0]);
    const detail = excerpt.slice(start + match[0].length, end).trim();

    return {
      title,
      detail: detail || "Voir la transcription du guide pour le détail.",
    };
  });
}

function buildPhases(session: RawSession, guideEntry?: P1GuideEntry): PrepPhase[] {
  const phases = session.phases ?? [];
  if (phases.length === 0) {
    const guideOnlyPhases = buildGuideOnlyPhases(guideEntry?.sourceExcerpt);
    if (guideOnlyPhases.length > 0) {
      return guideOnlyPhases;
    }
    return buildPhaseFallback(session.note);
  }

  const guidePhaseDetailMap = buildGuidePhaseDetailMap(session, guideEntry);

  return phases.map((phase, index) => {
    const title = normalizeText(phase.n || `Phase ${index + 1}`);
    const rawDetail = buildPhaseDetail(phase);
    const guideDetail = guidePhaseDetailMap.get(title);

    return {
      title,
      detail: shouldPreferGuideDetail(rawDetail, guideDetail) ? guideDetail! : rawDetail,
    };
  });
}

function extractGuideSessionTitle(guideEntry?: P1GuideEntry): string | undefined {
  if (!guideEntry?.sourceExcerpt) return undefined;

  const lines = guideEntry.sourceExcerpt
    .split("\n")
    .map((line) => normalizeText(line))
    .filter(Boolean);

  const sessionHeadingIndex = lines.findIndex((line) => /^S[ÉE]ANCE\s+\d+/i.test(line));
  if (sessionHeadingIndex === -1) return undefined;

  return lines[sessionHeadingIndex + 1];
}

function isSessionTitleCorrupted(title: string): boolean {
  if (!title) return false;

  if (title.length > 120) return true;

  return /(ACTIVITÉ|Consolidation|Obstacles possibles|Procédures visées|DIFFÉRENCIATION)/i.test(
    title,
  );
}

function resolveSessionTitle(
  module: RawModule,
  session: RawSession,
  guideEntry?: P1GuideEntry,
): string {
  const rawTitle = normalizeText(session.title || "");
  if (rawTitle && !isSessionTitleCorrupted(rawTitle)) {
    return rawTitle;
  }

  const guideTitle = extractGuideSessionTitle(guideEntry);
  if (guideTitle) return guideTitle;

  if (rawTitle) return rawTitle;
  if (module.objective) return normalizeText(module.objective);
  return "";
}

function buildSessionTitle(
  module: RawModule,
  session: RawSession,
  guideEntry?: P1GuideEntry,
): string {
  const resolvedTitle = resolveSessionTitle(module, session, guideEntry);
  const sessionLabel = `Module ${module.number} · Séance ${session.seance_number}`;
  if (resolvedTitle) {
    return `${sessionLabel} — ${resolvedTitle}`;
  }
  return `${sessionLabel} — contenu non transcrit`;
}

function buildSessionLabel(
  module: RawModule,
  session: RawSession,
  guideEntry?: P1GuideEntry,
): string {
  const resolvedTitle = resolveSessionTitle(module, session, guideEntry);
  const guide = session.guidePage ? ` · p. ${session.guidePage}` : "";
  if (resolvedTitle) {
    return `S${session.seance_number} — ${resolvedTitle}${guide}`;
  }
  return `S${session.seance_number} — contenu non transcrit${guide}`;
}

function buildObjective(module: RawModule, session: RawSession, guideEntry?: P1GuideEntry): string {
  const sessionTitle = resolveSessionTitle(module, session, guideEntry);
  if (sessionTitle) return sessionTitle;
  if (module.objective) return normalizeText(module.objective);
  return module.title;
}

function buildCompetence(module: RawModule): string {
  if (module.objective) return normalizeText(module.objective);
  if (module.domain) return normalizeText(module.domain);
  return module.title;
}

function buildNotes(period: RawPeriod, module: RawModule, session: RawSession): string[] {
  const otherPistes = (module.autresPistes ?? [])
    .map((item) => normalizeText(item.label || item.verbatim_lines?.[0] || ""))
    .filter(Boolean)
    .slice(0, 3);

  return [
    `Période : ${period.label}`,
    `Séquence maths : module ${module.number} — ${module.title}`,
    ...(module.domain ? [`Domaine : ${normalizeText(module.domain)}`] : []),
    ...(module.guidePage ? [`Ouverture du module : p. ${module.guidePage}`] : []),
    ...(session.guidePage ? [`Séance détaillée : p. ${session.guidePage}`] : []),
    ...(module.note ? [`Note module : ${normalizeText(module.note)}`] : []),
    ...(session.note ? [`Note séance : ${normalizeText(session.note)}`] : []),
    ...(otherPistes.length
      ? [`Autres pistes repérées dans la source : ${otherPistes.join(" · ")}`]
      : []),
  ];
}

function buildCoverageNote(
  module: RawModule,
  session: RawSession,
  guideEntry?: P1GuideEntry,
): string | undefined {
  if (session.phases?.length) return undefined;
  if (guideEntry?.sourceExcerpt) return undefined;
  if (session.note) return normalizeText(session.note);
  if (module.note) return normalizeText(module.note);
  return "Séance présente dans la progression, mais non détaillée dans la transcription fournie.";
}

function getGuideEntry(
  period: RawPeriod,
  module: RawModule,
  session: RawSession,
): P1GuideEntry | undefined {
  const periodGuideExcerpts = GUIDE_EXCERPTS_BY_PERIOD[period.id];
  if (!periodGuideExcerpts) return undefined;

  return periodGuideExcerpts[`m${module.number}`]?.[`s${session.seance_number}`];
}

function buildPrepSheet(period: RawPeriod, module: RawModule, session: RawSession): PrepSheet {
  const prepSheetId = `maths-ce1-${period.id.toLowerCase()}-m${module.number}-s${session.seance_number}`;
  const guideEntry = getGuideEntry(period, module, session);
  const resolvedGuidePage = guideEntry?.guidePage ?? session.guidePage ?? module.guidePage;
  const guidePage = formatGuidePage(resolvedGuidePage);

  return {
    id: prepSheetId,
    title: buildSessionTitle(module, session, guideEntry),
    subject: "maths",
    objective: buildObjective(module, session, guideEntry),
    competence: buildCompetence(module),
    duration: formatDuration(session.duration),
    phases: buildPhases(session, guideEntry),
    material: (session.materials ?? []).map((item) => normalizeText(item)).filter(Boolean),
    photocopies: guidePage ? [guidePage] : [],
    notes: [
      ...buildNotes(period, module, session),
      ...(guideEntry ? [`Guide ${period.label.toLowerCase()} intégré dans la fiche`] : []),
    ],
    coverageNote: buildCoverageNote(module, session, guideEntry),
    sourceExcerpt: guideEntry?.sourceExcerpt,
  };
}

type FlattenedSession = {
  period: RawPeriod;
  module: RawModule;
  session: RawSession;
};

const FLATTENED_SESSIONS: FlattenedSession[] = VERBATIM_FILES.flatMap((file) =>
  file.periods.flatMap((period) =>
    period.modules.flatMap((module) =>
      module.seances.map((session) => ({ period, module, session })),
    ),
  ),
);

export const MATHS_CE1_SESSION_PREP_SHEETS: PrepSheet[] = FLATTENED_SESSIONS.map(
  ({ period, module, session }) => buildPrepSheet(period, module, session),
);

const prepSheetById = new Map(MATHS_CE1_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]));

export function getMathsCe1PrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return prepSheetById.get(id);
}

export const MATHS_CE1_RESOURCE_METHOD: ResourceMethod = {
  id: "m-maths-ce1-guide",
  label: "Maths en CE1 (Accès)",
  subject: "maths",
  sequences: VERBATIM_FILES.flatMap((file) =>
    file.periods.flatMap((period) =>
      period.modules.map((module) => ({
        id: `maths-ce1-${period.id.toLowerCase()}-m${module.number}`,
        label: `${period.label} · Module ${module.number} — ${module.title}`,
        sessions: module.seances.map((session) => {
          const guideEntry = getGuideEntry(period, module, session);
          const prepSheetId = `maths-ce1-${period.id.toLowerCase()}-m${module.number}-s${session.seance_number}`;
          return {
            id: prepSheetId,
            label: buildSessionLabel(module, session, guideEntry),
            prepSheetId,
          };
        }),
      })),
    ),
  ),
};

function extractMaterialFromExcerpt(excerpt: string): string[] {
  const materialIndex = excerpt.indexOf("MATÉRIEL");
  if (materialIndex === -1) return [];

  const phasePositions = AUXILIARY_PHASE_TITLES.map((title) =>
    excerpt.indexOf(title, materialIndex + 1),
  )
    .filter((position) => position !== -1)
    .sort((a, b) => a - b);

  const endIndex = phasePositions[0] ?? excerpt.length;
  const materialBlock = excerpt.slice(materialIndex + "MATÉRIEL".length, endIndex);

  return materialBlock
    .split("\n")
    .map((line) => line.replace(/^[\s\-•]+/, "").trim())
    .filter(Boolean);
}

function buildPhasesFromExcerpt(excerpt: string): PrepPhase[] {
  const matches = [
    ...excerpt.matchAll(
      /(ÉCHAUFFEMENT|Réactivation|Mise en situation|Explicitation|Pratique guidée|Pratique autonome|Évaluation|Consolidation|Clôture de la séquence|Clôture de la séance)/g,
    ),
  ];

  if (matches.length === 0) {
    return buildPhaseFallback(excerpt);
  }

  return matches.map((match, index) => {
    const start = match.index ?? 0;
    const end =
      index + 1 < matches.length ? (matches[index + 1].index ?? excerpt.length) : excerpt.length;
    const title = normalizeText(match[0]);
    const detail = excerpt.slice(start + match[0].length, end).trim();

    return {
      title,
      detail: detail || "Voir l'extrait du guide pour le détail.",
    };
  });
}

function buildFlashPhasesFromExcerpt(excerpt: string): PrepPhase[] {
  const activityIndex = excerpt.indexOf("ACTIVITÉ ÉLÈVE");
  const detail =
    activityIndex === -1 ? excerpt : excerpt.slice(activityIndex + "ACTIVITÉ ÉLÈVE".length).trim();

  return [
    {
      title: "Activité flash",
      detail: detail || "Voir l'extrait du guide pour le détail.",
    },
  ];
}

function buildAuxiliaryPrepSheet(
  family: "atelier-problemes" | "calcul-mental" | "flash-maths",
  group: AuxiliaryGroupEntry,
  session: AuxiliarySessionEntry,
): PrepSheet {
  const sessionLabel =
    typeof session.session === "number" ? `Séance ${session.session}` : `Flash ${session.session}`;
  const id = `maths-ce1-p1-${family}-m${group.module}-s${String(session.session).toLowerCase()}`;
  const durationMatch = session.sourceExcerpt.match(/SÉANCE\s+\d+\s+(\d+\s*min)/);
  const duration = durationMatch ? normalizeText(durationMatch[1]) : "";
  const material = extractMaterialFromExcerpt(session.sourceExcerpt);
  const phases =
    family === "flash-maths"
      ? buildFlashPhasesFromExcerpt(session.sourceExcerpt)
      : buildPhasesFromExcerpt(session.sourceExcerpt);

  return {
    id,
    title: `Module ${group.module} · ${sessionLabel} — ${group.title}`,
    subject: "maths",
    objective: group.title,
    competence: group.title,
    duration,
    phases,
    material,
    photocopies: [`Guide enseignant : p. ${group.guidePage}`],
    notes: [
      "Période : Période 1",
      `Bloc maths : ${
        family === "atelier-problemes"
          ? "Atelier problèmes"
          : family === "calcul-mental"
            ? "Calcul mental"
            : "Flash Maths"
      }`,
      `Module ${group.module}`,
    ],
    sourceExcerpt: session.sourceExcerpt,
  };
}

function buildAuxiliaryMethod(
  id: string,
  label: string,
  family: "atelier-problemes" | "calcul-mental" | "flash-maths",
  groups: AuxiliaryGroupEntry[],
): ResourceMethod {
  return {
    id,
    label,
    subject: "maths",
    sequences: groups.map((group) => ({
      id: `${id}-m${group.module}`,
      label: `Période 1 · Module ${group.module} — ${group.title}`,
      sessions: group.sessions.map((session) => {
        const prepSheetId = `maths-ce1-p1-${family}-m${group.module}-s${String(session.session).toLowerCase()}`;
        return {
          id: prepSheetId,
          label:
            typeof session.session === "number"
              ? `S${session.session} · guide p. ${group.guidePage}`
              : `Flash ${session.session} · guide p. ${group.guidePage}`,
          prepSheetId,
        };
      }),
    })),
  };
}

export const MATHS_CE1_AUXILIARY_SESSION_PREP_SHEETS: PrepSheet[] = [
  ...AUXILIARY_PERIOD1.atelierProblemes.flatMap((group) =>
    group.sessions.map((session) => buildAuxiliaryPrepSheet("atelier-problemes", group, session)),
  ),
  ...AUXILIARY_PERIOD1.calculMental.flatMap((group) =>
    group.sessions.map((session) => buildAuxiliaryPrepSheet("calcul-mental", group, session)),
  ),
  ...AUXILIARY_PERIOD1.flashMaths.flatMap((group) =>
    group.sessions.map((session) => buildAuxiliaryPrepSheet("flash-maths", group, session)),
  ),
];

const auxiliaryPrepSheetById = new Map(
  MATHS_CE1_AUXILIARY_SESSION_PREP_SHEETS.map((sheet) => [sheet.id, sheet]),
);

export function getMathsCe1AuxiliaryPrepSheet(id?: string): PrepSheet | undefined {
  if (!id) return undefined;
  return auxiliaryPrepSheetById.get(id);
}

export const MATHS_CE1_ATELIER_PROBLEMES_P1_RESOURCE_METHOD = buildAuxiliaryMethod(
  "m-maths-ce1-p1-atelier-problemes",
  "Maths en CE1 — Atelier problèmes",
  "atelier-problemes",
  AUXILIARY_PERIOD1.atelierProblemes,
);

export const MATHS_CE1_CALCUL_MENTAL_P1_RESOURCE_METHOD = buildAuxiliaryMethod(
  "m-maths-ce1-p1-calcul-mental",
  "Maths en CE1 — Calcul mental",
  "calcul-mental",
  AUXILIARY_PERIOD1.calculMental,
);

export const MATHS_CE1_FLASH_MATHS_P1_RESOURCE_METHOD = buildAuxiliaryMethod(
  "m-maths-ce1-p1-flash-maths",
  "Maths en CE1 — Flash Maths",
  "flash-maths",
  AUXILIARY_PERIOD1.flashMaths,
);
