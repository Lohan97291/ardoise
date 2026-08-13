import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, ChevronDown, ChevronRight, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { GradebookGrid } from "@/components/ardoise/gradebook-grid";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { SUBJECT_BAND } from "@/components/ardoise/subject-styles";
import {
  CLEO_CATALOG,
  DOMAIN_LABELS,
  FLUENCE_TARGET,
  MATHS_CATALOG,
  ORTHO_CATALOG,
  STUDENTS,
  STATUS_BY_KEY,
  fullName,
  initials,
  fluenceLevel,
  type Exercise,
  type StatusKey,
} from "@/lib/ardoise-eval";
import { getActiveExercises, getExerciseResults, getFluenceRecords } from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/carnet-notes")({
  head: () => ({
    meta: [
      { title: "Carnet de notes — Ardoise" },
      {
        name: "description",
        content:
          "Grille de résultats CE1 par exercice et par compétence, avec fiche individuelle par élève.",
      },
      { property: "og:title", content: "Carnet de notes — Ardoise" },
    ],
  }),
  component: CarnetNotesPage,
});

/* ═══════════════════════════════ Constantes ══════════════════════════════ */

type MainView = "notes" | "exercices" | "competences";
type SubjectFilter = "all" | "francais" | "maths";
type AssessmentFilter = "all" | "continu" | "evaluations";
type DetailView = "classe" | "eleve" | "matiere";

const SUBJECT_FILTER_LABELS: Record<SubjectFilter, string> = {
  all: "Tout",
  francais: "Français",
  maths: "Mathématiques",
};

const ASSESSMENT_FILTER_LABELS: Record<AssessmentFilter, string> = {
  all: "Tout",
  continu: "Contrôle continu",
  evaluations: "Évaluations",
};

const DETAIL_VIEW_LABELS: Record<DetailView, string> = {
  classe: "Vue classe",
  eleve: "Vue élève",
  matiere: "Vue matière",
};

const SUBJECT_SHORT: Record<string, string> = { francais: "FR", maths: "MA" };

const DOMAIN_ORDER_FRENCH = ["C", "V", "G", "O"] as const;
const DOMAIN_ORDER_MATHS = ["nb", "calc", "gm", "geo", "don"] as const;
const ALL_DOMAINS = [...DOMAIN_ORDER_FRENCH, ...DOMAIN_ORDER_MATHS];

const DOMAIN_SUBJECT: Record<string, "francais" | "maths"> = {
  C: "francais",
  V: "francais",
  G: "francais",
  O: "francais",
  nb: "maths",
  calc: "maths",
  gm: "maths",
  geo: "maths",
  don: "maths",
};

/** Abréviations pour les étiquettes du radar */
const DOMAIN_SHORT: Record<string, string> = {
  C: "Compré.",
  V: "Vocab.",
  G: "Gram.",
  O: "Ortho.",
  nb: "Nombres",
  calc: "Calcul",
  gm: "G&M",
  geo: "Géom.",
  don: "Données",
};

/* ═══════════════════════════════ Helpers ══════════════════════════════════ */

function getExerciseDomain(exerciseId: string): string | null {
  const cleo = CLEO_CATALOG.find((e) => e.id === exerciseId);
  if (cleo) return cleo.domain;
  const maths = MATHS_CATALOG.find((e) => e.id === exerciseId);
  if (maths) return maths.domain;
  if (exerciseId.startsWith("ortho-")) return "O";
  return null;
}

function getAssessmentKind(exercise: Exercise): "continu" | "evaluation" {
  const normalized = `${exercise.title} ${exercise.sessionTitle}`.toLowerCase();
  const ortho = ORTHO_CATALOG.find((entry) => entry.id === exercise.id);

  if (ortho?.type === "evaluation" || ortho?.type === "diagnostic") return "evaluation";
  if (
    normalized.includes("évaluation") ||
    normalized.includes("evaluation") ||
    normalized.includes("diagnostic") ||
    normalized.includes("dictée bilan") ||
    normalized.includes("dictée bilan")
  ) {
    return "evaluation";
  }

  return "continu";
}

function studentMastery(
  studentId: string,
  allResults: Record<string, Record<string, StatusKey>>,
  exerciseIds: string[],
): number {
  let acquis = 0,
    total = 0;
  for (const exId of exerciseIds) {
    const st = (allResults[exId]?.[studentId] ?? "NF") as StatusKey;
    if (st === "NF" || st === "AB") continue;
    total++;
    if (st === "A") acquis += 2;
    else if (st === "PA") acquis += 1;
  }
  return total === 0 ? -1 : Math.round((acquis / (total * 2)) * 100);
}

function exerciseMastery(results: Record<string, StatusKey>): number {
  let acquis = 0,
    total = 0;
  for (const s of STUDENTS) {
    const st = (results[s.id] ?? "NF") as StatusKey;
    if (st === "NF" || st === "AB") continue;
    total++;
    if (st === "A") acquis += 2;
    else if (st === "PA") acquis += 1;
  }
  return total === 0 ? -1 : Math.round((acquis / (total * 2)) * 100);
}

function masteryColor(pct: number): string {
  if (pct < 0) return "text-muted-foreground/50";
  if (pct >= 75) return "text-status-a-solid";
  if (pct >= 50) return "text-status-pa-solid";
  return "text-status-na-solid";
}

function masteryBarColor(pct: number): string {
  if (pct >= 75) return "bg-status-a-solid";
  if (pct >= 50) return "bg-status-pa-solid";
  return "bg-status-na-solid";
}

/* ═══════════════════════════ Composant radar SVG ══════════════════════════ */

type RadarDomain = { key: string; label: string; pct: number };

function RadarChart({
  domains,
  size = 180,
  color = "hsl(var(--primary))",
}: {
  domains: RadarDomain[];
  size?: number;
  color?: string;
}) {
  const n = domains.length;
  if (n < 3) return null;

  const cx = size / 2;
  const cy = size / 2;
  const labelPad = 22; // espace pour les étiquettes
  const r = size / 2 - labelPad;

  // Angle de départ : -π/2 = haut
  const angle = (i: number) => (i / n) * 2 * Math.PI - Math.PI / 2;

  const toXY = (i: number, factor: number) => ({
    x: cx + r * factor * Math.cos(angle(i)),
    y: cy + r * factor * Math.sin(angle(i)),
  });

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const axes = Array.from({ length: n }, (_, i) => i);

  const polyPoints = (factor: number) =>
    axes.map((i) => `${toXY(i, factor).x.toFixed(2)},${toXY(i, factor).y.toFixed(2)}`).join(" ");

  // Points de données (clampés à 0-100, convertis en 0-1)
  const dataPoints = domains.map((d, i) => toXY(i, Math.max(0, d.pct) / 100));
  const dataPath =
    dataPoints
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ") + " Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="Graphique araignée des compétences"
    >
      {/* Grille circulaire */}
      {gridLevels.map((f) => (
        <polygon
          key={f}
          points={polyPoints(f)}
          fill="none"
          stroke="currentColor"
          strokeOpacity={f === 1 ? 0.18 : 0.1}
          strokeWidth={f === 1 ? 1 : 0.75}
          strokeDasharray={f === 1 ? undefined : "2,2"}
        />
      ))}

      {/* Axes */}
      {axes.map((i) => {
        const outer = toXY(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={outer.x.toFixed(2)}
            y2={outer.y.toFixed(2)}
            stroke="currentColor"
            strokeOpacity={0.12}
            strokeWidth={0.75}
          />
        );
      })}

      {/* Remplissage données */}
      <path
        d={dataPath}
        fill={color}
        fillOpacity={0.18}
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {/* Points de données */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x.toFixed(2)}
          cy={p.y.toFixed(2)}
          r={3}
          fill={color}
          stroke="white"
          strokeWidth={1}
        />
      ))}

      {/* Étiquettes */}
      {domains.map((d, i) => {
        const labelR = r + labelPad * 0.72;
        const x = cx + labelR * Math.cos(angle(i));
        const y = cy + labelR * Math.sin(angle(i));
        // Alignement selon position angulaire
        const cos = Math.cos(angle(i));
        const anchor = Math.abs(cos) < 0.2 ? "middle" : cos > 0 ? "start" : "end";
        return (
          <text
            key={i}
            x={x.toFixed(2)}
            y={y.toFixed(2)}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize={7.5}
            fontWeight={600}
            fill="currentColor"
            fillOpacity={0.7}
          >
            {d.label}
          </text>
        );
      })}

      {/* Valeurs sur les points */}
      {dataPoints.map((p, i) => {
        const pct = domains[i]!.pct;
        if (pct < 0) return null;
        return (
          <text
            key={`v-${i}`}
            x={(p.x + Math.cos(angle(i)) * 9).toFixed(2)}
            y={(p.y + Math.sin(angle(i)) * 9).toFixed(2)}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={6.5}
            fontWeight={700}
            fill={color}
            fillOpacity={0.9}
          >
            {pct}%
          </text>
        );
      })}
    </svg>
  );
}

/* ══════════════════════ Sous-composants utilitaires ═══════════════════════ */

function MasteryBar({ pct, className }: { pct: number; className?: string }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-secondary", className)}>
      {pct >= 0 && (
        <div
          className={cn("h-full rounded-full transition-all duration-500", masteryBarColor(pct))}
          style={{ width: `${pct}%` }}
        />
      )}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <BookOpen className="h-10 w-10 text-muted-foreground/40" />
      <p className="mt-3 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function StudentCell({
  student,
  isSelected,
}: {
  student: { firstName: string; lastName: string };
  isSelected: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={cn(
          "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold",
          isSelected ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
        )}
      >
        {`${student.firstName[0]}${student.lastName[0]}`.toUpperCase()}
      </span>
      <span className={cn("text-sm font-medium leading-tight", isSelected && "text-primary")}>
        {student.firstName} {student.lastName}
      </span>
    </div>
  );
}

/* ═══════════════════════════════ Page principale ══════════════════════════ */

function CarnetNotesPage() {
  const initialParams = useMemo<{
    studentId: string | null;
    exerciseId: string | null;
    subject: SubjectFilter | null;
    assessment: AssessmentFilter | null;
    detail: DetailView | null;
  }>(() => {
    if (typeof window === "undefined") {
      return {
        studentId: null,
        exerciseId: null,
        subject: null,
        assessment: null,
        detail: null,
      };
    }

    const searchParams = new URLSearchParams(window.location.search);
    const subject = searchParams.get("subject");
    const assessment = searchParams.get("assessment");
    const detail = searchParams.get("detail");

    return {
      studentId: searchParams.get("studentId"),
      exerciseId: searchParams.get("exerciseId"),
      subject: subject === "all" || subject === "francais" || subject === "maths" ? subject : null,
      assessment:
        assessment === "all" || assessment === "continu" || assessment === "evaluations"
          ? assessment
          : null,
      detail: detail === "classe" || detail === "eleve" || detail === "matiere" ? detail : null,
    };
  }, []);

  const [view, setView] = useState<MainView>("exercices");
  const [detailView, setDetailView] = useState<DetailView>(initialParams.detail ?? "classe");
  const [filter, setFilter] = useState<SubjectFilter>(initialParams.subject ?? "all");
  const [assessmentFilter, setAssessmentFilter] = useState<AssessmentFilter>(
    initialParams.assessment ?? "all",
  );
  const [selectedId, setSelectedId] = useState<string | null>(
    initialParams.studentId ?? STUDENTS[0]?.id ?? null,
  );
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);

  /* ── Données ── */
  const allExercises = useMemo(() => getActiveExercises(), []);
  const exercises = useMemo(
    () =>
      allExercises.filter((exercise) => {
        const subjectMatch = filter === "all" || exercise.subject === filter;
        const assessmentKind = getAssessmentKind(exercise);
        const assessmentMatch =
          assessmentFilter === "all" ||
          (assessmentFilter === "continu" && assessmentKind === "continu") ||
          (assessmentFilter === "evaluations" && assessmentKind === "evaluation");
        return subjectMatch && assessmentMatch;
      }),
    [allExercises, assessmentFilter, filter],
  );

  const allResults = useMemo(
    () => Object.fromEntries(allExercises.map((e) => [e.id, getExerciseResults(e.id)])),
    [allExercises],
  );

  const fluenceRecords = useMemo(() => getFluenceRecords(), []);
  const activeStudentId = selectedId ?? STUDENTS[0]?.id ?? null;
  const selectedStudent = STUDENTS.find((s) => s.id === activeStudentId) ?? null;
  const selectedFluence = fluenceRecords.find((f) => f.studentId === activeStudentId) ?? null;
  const exerciseIds = useMemo(() => exercises.map((exercise) => exercise.id), [exercises]);
  const requestedExercise = useMemo(
    () => allExercises.find((exercise) => exercise.id === initialParams.exerciseId) ?? null,
    [allExercises, initialParams.exerciseId],
  );

  useEffect(() => {
    if (!requestedExercise) return;
    setView("exercices");
    setFilter(requestedExercise.subject);
    setAssessmentFilter(
      getAssessmentKind(requestedExercise) === "evaluation" ? "evaluations" : "continu",
    );
    if (initialParams.studentId) {
      setDetailView("eleve");
    }
  }, [initialParams.studentId, requestedExercise]);

  const classAverage = useMemo(() => {
    let total = 0;
    let count = 0;
    for (const student of STUDENTS) {
      const mastery = studentMastery(student.id, allResults, exerciseIds);
      if (mastery >= 0) {
        total += mastery;
        count++;
      }
    }
    return count === 0 ? -1 : Math.round(total / count);
  }, [allResults, exerciseIds]);

  const evaluatedStudentsCount = useMemo(
    () =>
      STUDENTS.filter((student) => studentMastery(student.id, allResults, exerciseIds) >= 0).length,
    [allResults, exerciseIds],
  );

  const studentSummaries = useMemo(
    () =>
      STUDENTS.map((student) => ({
        student,
        mastery: studentMastery(student.id, allResults, exerciseIds),
      })).sort((a, b) => a.student.lastName.localeCompare(b.student.lastName, "fr")),
    [allResults, exerciseIds],
  );

  const selectedStudentExercises = useMemo(() => {
    if (!selectedStudent) return [];

    return exercises.map((exercise) => {
      const domainKey = getExerciseDomain(exercise.id);
      const status = ((allResults[exercise.id] ?? {})[selectedStudent.id] ?? "NF") as StatusKey;
      return {
        exercise,
        status,
        domainKey,
        domainLabel: domainKey ? (DOMAIN_LABELS[domainKey] ?? domainKey) : "Autre",
      };
    });
  }, [allResults, exercises, selectedStudent]);

  const subjectSections = useMemo(() => {
    const subjects = filter === "all" ? (["francais", "maths"] as const) : ([filter] as const);

    return subjects
      .map((subject) => {
        const subjectExercises = exercises.filter((exercise) => exercise.subject === subject);
        const ids = subjectExercises.map((exercise) => exercise.id);

        let total = 0;
        let count = 0;
        for (const student of STUDENTS) {
          const mastery = studentMastery(student.id, allResults, ids);
          if (mastery >= 0) {
            total += mastery;
            count++;
          }
        }

        const domains = Object.entries(
          subjectExercises.reduce<Record<string, Exercise[]>>((acc, exercise) => {
            const domainKey = getExerciseDomain(exercise.id) ?? "autre";
            (acc[domainKey] ??= []).push(exercise);
            return acc;
          }, {}),
        ).map(([domainKey, domainExercises]) => {
          let domainTotal = 0;
          let domainCount = 0;
          const domainIds = domainExercises.map((exercise) => exercise.id);
          for (const student of STUDENTS) {
            const mastery = studentMastery(student.id, allResults, domainIds);
            if (mastery >= 0) {
              domainTotal += mastery;
              domainCount++;
            }
          }

          return {
            key: domainKey,
            label: DOMAIN_LABELS[domainKey] ?? domainKey,
            exercises: domainExercises,
            mastery: domainCount === 0 ? -1 : Math.round(domainTotal / domainCount),
          };
        });

        return {
          subject,
          label: subject === "francais" ? "Français" : "Mathématiques",
          exerciseCount: subjectExercises.length,
          average: count === 0 ? -1 : Math.round(total / count),
          evaluated: STUDENTS.filter((student) => studentMastery(student.id, allResults, ids) >= 0)
            .length,
          domains,
          exercises: subjectExercises,
        };
      })
      .filter((section) => section.exerciseCount > 0);
  }, [allResults, exercises, filter]);

  const assessmentCards = useMemo(
    () =>
      (["all", "continu", "evaluations"] as AssessmentFilter[]).map((value) => {
        const scopedExercises = allExercises.filter((exercise) => {
          const subjectMatch = filter === "all" || exercise.subject === filter;
          const kind = getAssessmentKind(exercise);
          const assessmentMatch =
            value === "all" ||
            (value === "continu" && kind === "continu") ||
            (value === "evaluations" && kind === "evaluation");
          return subjectMatch && assessmentMatch;
        });

        const ids = scopedExercises.map((exercise) => exercise.id);
        let total = 0;
        let count = 0;
        for (const student of STUDENTS) {
          const mastery = studentMastery(student.id, allResults, ids);
          if (mastery >= 0) {
            total += mastery;
            count++;
          }
        }

        return {
          key: value,
          label: ASSESSMENT_FILTER_LABELS[value],
          exerciseCount: scopedExercises.length,
          average: count === 0 ? -1 : Math.round(total / count),
        };
      }),
    [allExercises, allResults, filter],
  );

  /* ── Domaines actifs ── */
  const activeDomains = useMemo(() => {
    const domainExercises: Record<string, typeof allExercises> = {};
    for (const e of exercises) {
      const d = getExerciseDomain(e.id);
      if (!d) continue;
      (domainExercises[d] ??= []).push(e);
    }
    return ALL_DOMAINS.filter((d) => domainExercises[d] && domainExercises[d]!.length > 0).map(
      (d) => ({
        domain: d,
        label: DOMAIN_LABELS[d] ?? d,
        short: DOMAIN_SHORT[d] ?? d,
        subject: DOMAIN_SUBJECT[d] ?? "francais",
        exercises: domainExercises[d]!,
      }),
    );
  }, [exercises]);

  /* ── Radar données élève sélectionné ── */
  const studentRadarData = useMemo((): RadarDomain[] => {
    if (!selectedId) return [];
    return activeDomains.map(({ domain, short, exercises: exs }) => ({
      key: domain,
      label: short,
      pct: studentMastery(
        selectedId,
        allResults,
        exs.map((e) => e.id),
      ),
    }));
  }, [selectedId, activeDomains, allResults]);

  /* ── Radar données classe ── */
  const classRadarData = useMemo(
    (): RadarDomain[] =>
      activeDomains.map(({ domain, short, exercises: exs }) => {
        let total = 0,
          sum = 0;
        for (const s of STUDENTS) {
          const p = studentMastery(
            s.id,
            allResults,
            exs.map((e) => e.id),
          );
          if (p >= 0) {
            sum += p;
            total++;
          }
        }
        return {
          key: domain,
          label: short,
          pct: total === 0 ? -1 : Math.round(sum / total),
        };
      }),
    [activeDomains, allResults],
  );

  /* ════════════════════════════ Rendu ════════════════════════════════ */
  return (
    <AppShell>
      <div className="flex h-[calc(100vh-57px)] flex-col overflow-hidden">
        <div className="border-b border-border bg-background px-4 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Évaluation
          </p>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Carnets de notes</h1>
          <p className="mt-1 max-w-3xl text-sm text-muted-foreground">
            Les résultats saisis dans les cahiers remontent ici pour lire la classe, suivre un élève
            et préparer ensuite les bilans.
          </p>

          <div className="mt-5 grid gap-3 lg:grid-cols-3">
            {assessmentCards.map((card) => (
              <button
                key={card.key}
                type="button"
                onClick={() => setAssessmentFilter(card.key)}
                className={cn(
                  "rounded-2xl border p-4 text-left transition-all duration-150",
                  assessmentFilter === card.key
                    ? "border-primary/40 bg-primary/10 shadow-card"
                    : "border-border bg-card hover:bg-secondary/40",
                )}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {card.label}
                </p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-display text-3xl font-bold tabular-nums">
                      {card.exerciseCount}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      exercice{card.exerciseCount > 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-lg font-bold tabular-nums", masteryColor(card.average))}>
                      {card.average >= 0 ? `${card.average}%` : "—"}
                    </p>
                    <p className="text-xs text-muted-foreground">maîtrise moyenne</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="flex gap-1 rounded-full border border-border bg-secondary p-1">
              {(["classe", "eleve", "matiere"] as DetailView[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setDetailView(value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-150",
                    detailView === value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {DETAIL_VIEW_LABELS[value]}
                </button>
              ))}
            </div>

            <div className="flex gap-1 rounded-full border border-border bg-secondary p-1">
              {(["notes", "exercices", "competences"] as MainView[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setView(value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-150",
                    view === value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {value === "notes"
                    ? "Notes"
                    : value === "exercices"
                      ? "Exercices"
                      : "Compétences"}
                </button>
              ))}
            </div>

            <div className="flex gap-1 rounded-full border border-border bg-secondary p-1">
              {(["all", "francais", "maths"] as SubjectFilter[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150",
                    filter === value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {SUBJECT_FILTER_LABELS[value]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 py-5 sm:px-6">
          <div className="mb-5 grid gap-3 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Élèves
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">{STUDENTS.length}</p>
              <p className="text-xs text-muted-foreground">classe active</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Exercices
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                {exercises.length}
              </p>
              <p className="text-xs text-muted-foreground">dans ce carnet</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Élèves évalués
              </p>
              <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                {evaluatedStudentsCount}
              </p>
              <p className="text-xs text-muted-foreground">au moins un résultat</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Maîtrise moyenne
              </p>
              <p
                className={cn(
                  "mt-2 font-display text-3xl font-bold tabular-nums",
                  masteryColor(classAverage),
                )}
              >
                {classAverage >= 0 ? `${classAverage}%` : "—"}
              </p>
              <p className="text-xs text-muted-foreground">vue d’ensemble</p>
            </div>
          </div>

          {view === "notes" ? <GradebookGrid /> : null}

          {view !== "notes" && detailView === "classe" && (
            <>
              {view === "exercices" && (
                <>
                  {exercises.length === 0 ? (
                    <EmptyState text="Aucun exercice pour cette sélection." />
                  ) : (
                    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-border bg-surface/90">
                            <th className="sticky left-0 z-10 min-w-[180px] bg-surface/95 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                              Élève
                            </th>
                            {exercises.map((exercise) => {
                              const pct = exerciseMastery(allResults[exercise.id] ?? {});
                              return (
                                <th
                                  key={exercise.id}
                                  className="min-w-[116px] border-l border-border/50 px-3 py-3 text-center align-top"
                                >
                                  <div className="flex flex-col items-center gap-1">
                                    <span
                                      className={cn(
                                        "rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
                                        SUBJECT_BAND[exercise.subject as "francais" | "maths"],
                                      )}
                                    >
                                      {SUBJECT_SHORT[exercise.subject] ?? exercise.subject}
                                    </span>
                                    <span className="line-clamp-2 max-w-[104px] text-center text-[0.67rem] font-semibold leading-snug text-foreground">
                                      {exercise.title}
                                    </span>
                                    <span className="text-[0.6rem] text-muted-foreground">
                                      {exercise.date}
                                    </span>
                                    {pct >= 0 && (
                                      <span
                                        className={cn(
                                          "text-[0.7rem] font-bold tabular-nums",
                                          masteryColor(pct),
                                        )}
                                      >
                                        {pct}%
                                      </span>
                                    )}
                                  </div>
                                </th>
                              );
                            })}
                            <th className="sticky right-0 z-10 min-w-[80px] border-l border-border bg-surface/95 px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground backdrop-blur-sm">
                              Maîtrise
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {STUDENTS.map((student) => {
                            const pct = studentMastery(student.id, allResults, exerciseIds);
                            const isSelected = activeStudentId === student.id;
                            return (
                              <tr
                                key={student.id}
                                onClick={() => {
                                  setSelectedId(student.id);
                                  setDetailView("eleve");
                                }}
                                className={cn(
                                  "cursor-pointer transition-colors duration-150 hover:bg-secondary/50",
                                  isSelected && "bg-primary/5",
                                )}
                              >
                                <td
                                  className={cn(
                                    "sticky left-0 z-10 px-4 py-3 backdrop-blur-sm transition-colors duration-150",
                                    isSelected ? "bg-primary/10" : "bg-surface/95",
                                  )}
                                >
                                  <StudentCell student={student} isSelected={isSelected} />
                                </td>
                                {exercises.map((exercise) => {
                                  const status = ((allResults[exercise.id] ?? {})[student.id] ??
                                    "NF") as StatusKey;
                                  return (
                                    <td
                                      key={exercise.id}
                                      className="border-l border-border/50 px-3 py-3 text-center"
                                    >
                                      <span
                                        title={STATUS_BY_KEY[status].label}
                                        className={cn(
                                          "inline-flex h-7 w-10 items-center justify-center rounded-lg text-[0.68rem] font-bold",
                                          STATUS_CHIP[status],
                                          status === "NF" && "opacity-35",
                                        )}
                                      >
                                        {status}
                                      </span>
                                    </td>
                                  );
                                })}
                                <td
                                  className={cn(
                                    "sticky right-0 z-10 border-l border-border px-4 py-3 text-center backdrop-blur-sm transition-colors duration-150",
                                    isSelected ? "bg-primary/10" : "bg-surface/95",
                                  )}
                                >
                                  {pct >= 0 ? (
                                    <span
                                      className={cn(
                                        "text-sm font-bold tabular-nums",
                                        masteryColor(pct),
                                      )}
                                    >
                                      {pct}%
                                    </span>
                                  ) : (
                                    <span className="text-xs text-muted-foreground/40">—</span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </>
              )}

              {view === "competences" && (
                <>
                  {activeDomains.length === 0 ? (
                    <EmptyState text="Aucune compétence identifiée pour les exercices actifs." />
                  ) : (
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
                      <div className="card-surface shrink-0 p-5 shadow-card lg:w-72">
                        <p className="eyebrow mb-1">Vue classe</p>
                        <p className="mb-4 text-xs text-muted-foreground">
                          Maîtrise moyenne par compétence
                        </p>
                        {classRadarData.length >= 3 ? (
                          <div className="flex justify-center">
                            <RadarChart domains={classRadarData} size={220} />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            Moins de 3 compétences actives.
                          </p>
                        )}
                        <div className="mt-4 space-y-2">
                          {classRadarData.map((domain) => (
                            <div key={domain.key}>
                              <div className="mb-0.5 flex items-center justify-between gap-1">
                                <span className="truncate text-xs text-muted-foreground">
                                  {DOMAIN_LABELS[domain.key] ?? domain.key}
                                </span>
                                {domain.pct >= 0 ? (
                                  <span
                                    className={cn(
                                      "shrink-0 text-xs font-bold tabular-nums",
                                      masteryColor(domain.pct),
                                    )}
                                  >
                                    {domain.pct}%
                                  </span>
                                ) : (
                                  <span className="text-[0.65rem] text-muted-foreground/40">—</span>
                                )}
                              </div>
                              <MasteryBar pct={domain.pct} />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-3">
                        {activeDomains.map(
                          ({ domain, label, subject, exercises: domainExercises }) => {
                            const classIds = domainExercises.map((exercise) => exercise.id);
                            let totalAcquis = 0;
                            let totalEval = 0;
                            for (const student of STUDENTS) {
                              const mastery = studentMastery(student.id, allResults, classIds);
                              if (mastery >= 0) {
                                totalAcquis += mastery;
                                totalEval++;
                              }
                            }
                            const avgPct =
                              totalEval === 0 ? -1 : Math.round(totalAcquis / totalEval);
                            const isExpanded = expandedDomain === domain;

                            return (
                              <div
                                key={domain}
                                className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
                              >
                                <button
                                  type="button"
                                  onClick={() => setExpandedDomain(isExpanded ? null : domain)}
                                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40"
                                >
                                  <span
                                    className={cn(
                                      "rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide",
                                      SUBJECT_BAND[subject],
                                    )}
                                  >
                                    {subject === "francais" ? "FR" : "MA"}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="text-sm font-semibold">{label}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {domainExercises.length} exercice
                                      {domainExercises.length > 1 ? "s" : ""} · {totalEval} élève
                                      {totalEval !== 1 ? "s" : ""} évalué
                                      {totalEval !== 1 ? "s" : ""}
                                    </p>
                                  </div>
                                  <div className="w-28 min-w-0">
                                    {avgPct >= 0 ? (
                                      <>
                                        <div className="mb-1 flex items-center justify-between gap-1">
                                          <span
                                            className={cn(
                                              "text-xs font-bold tabular-nums",
                                              masteryColor(avgPct),
                                            )}
                                          >
                                            {avgPct}%
                                          </span>
                                          <span className="text-[0.6rem] text-muted-foreground">
                                            classe
                                          </span>
                                        </div>
                                        <MasteryBar pct={avgPct} />
                                      </>
                                    ) : (
                                      <span className="text-xs text-muted-foreground/40">
                                        Non évalué
                                      </span>
                                    )}
                                  </div>
                                  {isExpanded ? (
                                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                                  )}
                                </button>

                                {isExpanded && (
                                  <div className="border-t border-border bg-secondary/20 px-5 py-4 animate-fade-in">
                                    <p className="eyebrow mb-3">Par élève — {label}</p>
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                                      {STUDENTS.map((student) => {
                                        const pct = studentMastery(
                                          student.id,
                                          allResults,
                                          classIds,
                                        );
                                        const isSel = activeStudentId === student.id;
                                        return (
                                          <button
                                            key={student.id}
                                            type="button"
                                            onClick={() => {
                                              setSelectedId(student.id);
                                              setDetailView("eleve");
                                            }}
                                            className={cn(
                                              "rounded-xl border p-3 text-left transition-all duration-150",
                                              isSel
                                                ? "border-primary/40 bg-primary/10"
                                                : "border-border bg-card hover:bg-secondary/60",
                                            )}
                                          >
                                            <div className="mb-2 flex items-center gap-2">
                                              <span
                                                className={cn(
                                                  "grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.62rem] font-bold",
                                                  isSel
                                                    ? "bg-primary text-primary-foreground"
                                                    : "bg-secondary text-muted-foreground",
                                                )}
                                              >
                                                {initials(student)}
                                              </span>
                                              <span className="truncate text-xs font-medium">
                                                {student.firstName}
                                              </span>
                                            </div>
                                            {pct >= 0 ? (
                                              <>
                                                <MasteryBar pct={pct} className="mb-1" />
                                                <p
                                                  className={cn(
                                                    "text-right text-xs font-bold tabular-nums",
                                                    masteryColor(pct),
                                                  )}
                                                >
                                                  {pct}%
                                                </p>
                                              </>
                                            ) : (
                                              <p className="text-xs text-muted-foreground/50">
                                                Non évalué
                                              </p>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                      {domainExercises.map((exercise) => (
                                        <span
                                          key={exercise.id}
                                          className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[0.65rem] text-muted-foreground"
                                        >
                                          {exercise.title.length > 45
                                            ? `${exercise.title.slice(0, 45)}…`
                                            : exercise.title}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {view !== "notes" && detailView === "eleve" && selectedStudent && (
            <div className="grid gap-5 xl:grid-cols-[280px_minmax(0,1fr)]">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                <p className="eyebrow mb-3">Élèves</p>
                <div className="space-y-2">
                  {studentSummaries.map(({ student, mastery }) => {
                    const isSelected = activeStudentId === student.id;
                    return (
                      <button
                        key={student.id}
                        type="button"
                        onClick={() => setSelectedId(student.id)}
                        className={cn(
                          "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition-colors duration-150",
                          isSelected
                            ? "border-primary/40 bg-primary/10"
                            : "border-border hover:bg-secondary/40",
                        )}
                      >
                        <StudentCell student={student} isSelected={isSelected} />
                        <span
                          className={cn(
                            "shrink-0 text-xs font-bold tabular-nums",
                            mastery >= 0 ? masteryColor(mastery) : "text-muted-foreground/40",
                          )}
                        >
                          {mastery >= 0 ? `${mastery}%` : "—"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Fiche élève
                      </p>
                      <h2 className="mt-1 text-2xl font-bold">{fullName(selectedStudent)}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">CE1 · suivi individuel</p>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {assessmentFilter === "evaluations"
                        ? "Carnet évaluations"
                        : assessmentFilter === "continu"
                          ? "Carnet contrôle continu"
                          : "Carnet complet"}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        window.location.assign(
                          `/eleves?studentId=${encodeURIComponent(selectedStudent.id)}`,
                        )
                      }
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                    >
                      Ouvrir la fiche élève
                    </button>
                    {requestedExercise ? (
                      <button
                        type="button"
                        onClick={() =>
                          window.location.assign(
                            `/correction-rapide?exerciseId=${encodeURIComponent(
                              requestedExercise.id,
                            )}&studentId=${encodeURIComponent(selectedStudent.id)}`,
                          )
                        }
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        Revenir à la correction
                      </button>
                    ) : null}
                    {requestedExercise ? (
                      <button
                        type="button"
                        onClick={() =>
                          window.location.assign(
                            `/resultats-exercices?exerciseId=${encodeURIComponent(
                              requestedExercise.id,
                            )}&studentId=${encodeURIComponent(selectedStudent.id)}`,
                          )
                        }
                        className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium transition-colors hover:bg-secondary"
                      >
                        Voir les résultats détaillés
                      </button>
                    ) : null}
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Maîtrise globale
                      </p>
                      {(() => {
                        const pct = studentMastery(selectedStudent.id, allResults, exerciseIds);
                        return (
                          <>
                            <p
                              className={cn(
                                "mt-2 font-display text-3xl font-bold tabular-nums",
                                masteryColor(pct),
                              )}
                            >
                              {pct >= 0 ? `${pct}%` : "—"}
                            </p>
                            <MasteryBar pct={pct} className="mt-3" />
                          </>
                        );
                      })()}
                    </div>
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Exercices saisis
                      </p>
                      <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                        {
                          selectedStudentExercises.filter(
                            ({ status }) => status !== "NF" && status !== "AB",
                          ).length
                        }
                      </p>
                      <p className="text-xs text-muted-foreground">résultats enregistrés</p>
                    </div>
                    <div className="rounded-2xl border border-border bg-surface p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Fluence
                      </p>
                      <p className="mt-2 font-display text-3xl font-bold tabular-nums">
                        {selectedFluence?.wpm && selectedFluence.wpm > 0
                          ? selectedFluence.wpm
                          : "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">mots par minute</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-[320px_minmax(0,1fr)]">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <p className="eyebrow mb-3">Compétences</p>
                    {studentRadarData.length >= 3 ? (
                      <div className="flex justify-center">
                        <RadarChart domains={studentRadarData} size={220} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Pas assez de compétences actives pour afficher le graphique.
                      </p>
                    )}
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
                    <p className="eyebrow mb-3">Maîtrise par domaine</p>
                    <div className="space-y-3">
                      {activeDomains.map(
                        ({ domain, label, subject: domainSubject, exercises: domainExercises }) => {
                          const pct = studentMastery(
                            selectedStudent.id,
                            allResults,
                            domainExercises.map((exercise) => exercise.id),
                          );
                          return (
                            <div key={domain}>
                              <div className="mb-1 flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-1.5">
                                  <span
                                    className={cn(
                                      "shrink-0 rounded px-1.5 py-0.5 text-[0.55rem] font-bold uppercase tracking-wide",
                                      SUBJECT_BAND[domainSubject],
                                    )}
                                  >
                                    {domainSubject === "francais" ? "FR" : "MA"}
                                  </span>
                                  <span className="truncate text-xs font-medium">{label}</span>
                                </div>
                                {pct >= 0 ? (
                                  <span
                                    className={cn(
                                      "shrink-0 text-xs font-bold tabular-nums",
                                      masteryColor(pct),
                                    )}
                                  >
                                    {pct}%
                                  </span>
                                ) : (
                                  <span className="shrink-0 text-[0.65rem] text-muted-foreground/50">
                                    —
                                  </span>
                                )}
                              </div>
                              <MasteryBar pct={pct} />
                              <p className="mt-0.5 text-right text-[0.6rem] text-muted-foreground">
                                {domainExercises.length} exercice
                                {domainExercises.length > 1 ? "s" : ""}
                              </p>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                  <div className="border-b border-border px-5 py-4">
                    <p className="eyebrow">
                      {assessmentFilter === "evaluations"
                        ? "Évaluations de l’élève"
                        : assessmentFilter === "continu"
                          ? "Contrôle continu de l’élève"
                          : "Exercices de l’élève"}
                    </p>
                  </div>
                  {selectedStudentExercises.length === 0 ? (
                    <EmptyState text="Aucun résultat enregistré pour cet élève." />
                  ) : (
                    <div className="overflow-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="border-b border-border bg-surface/70">
                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Exercice
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Domaine
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Séance
                            </th>
                            <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Date
                            </th>
                            <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Résultat
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {selectedStudentExercises.map(({ exercise, status, domainLabel }) => (
                            <tr key={exercise.id}>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={cn(
                                      "rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
                                      SUBJECT_BAND[exercise.subject as "francais" | "maths"],
                                    )}
                                  >
                                    {SUBJECT_SHORT[exercise.subject]}
                                  </span>
                                  <span className="font-medium">{exercise.title}</span>
                                </div>
                              </td>
                              <td className="px-3 py-3 text-muted-foreground">{domainLabel}</td>
                              <td className="px-3 py-3 text-muted-foreground">
                                {exercise.sessionTitle}
                              </td>
                              <td className="px-3 py-3 text-muted-foreground">{exercise.date}</td>
                              <td className="px-5 py-3 text-right">
                                <span
                                  className={cn(
                                    "inline-flex rounded-lg px-2.5 py-1 text-[0.72rem] font-bold",
                                    STATUS_CHIP[status],
                                    status === "NF" && "opacity-40",
                                  )}
                                >
                                  {STATUS_BY_KEY[status].label}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {view !== "notes" && detailView === "matiere" && (
            <>
              {subjectSections.length === 0 ? (
                <EmptyState text="Aucune matière disponible pour cette sélection." />
              ) : (
                <div className="grid gap-5 xl:grid-cols-2">
                  {subjectSections.map((section) => (
                    <div
                      key={section.subject}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-card"
                    >
                      <div className="border-b border-border px-5 py-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                              Matière
                            </p>
                            <h2 className="mt-1 text-xl font-bold">{section.label}</h2>
                          </div>
                          <span
                            className={cn(
                              "rounded-full px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wide",
                              SUBJECT_BAND[section.subject],
                            )}
                          >
                            {section.subject === "francais" ? "FR" : "MA"}
                          </span>
                        </div>

                        <div className="mt-4 grid gap-3 md:grid-cols-3">
                          <div className="rounded-xl border border-border bg-surface p-3">
                            <p className="text-xs text-muted-foreground">Exercices</p>
                            <p className="mt-1 font-display text-2xl font-bold tabular-nums">
                              {section.exerciseCount}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-surface p-3">
                            <p className="text-xs text-muted-foreground">Élèves évalués</p>
                            <p className="mt-1 font-display text-2xl font-bold tabular-nums">
                              {section.evaluated}
                            </p>
                          </div>
                          <div className="rounded-xl border border-border bg-surface p-3">
                            <p className="text-xs text-muted-foreground">Maîtrise moyenne</p>
                            <p
                              className={cn(
                                "mt-1 font-display text-2xl font-bold tabular-nums",
                                masteryColor(section.average),
                              )}
                            >
                              {section.average >= 0 ? `${section.average}%` : "—"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        {view === "competences" ? (
                          <div className="space-y-3">
                            {section.domains.map((domain) => (
                              <div
                                key={domain.key}
                                className="rounded-xl border border-border bg-surface p-3"
                              >
                                <div className="mb-2 flex items-center justify-between gap-2">
                                  <span className="text-sm font-semibold">{domain.label}</span>
                                  <span
                                    className={cn(
                                      "text-xs font-bold tabular-nums",
                                      masteryColor(domain.mastery),
                                    )}
                                  >
                                    {domain.mastery >= 0 ? `${domain.mastery}%` : "—"}
                                  </span>
                                </div>
                                <MasteryBar pct={domain.mastery} />
                                <div className="mt-2 flex flex-wrap gap-1.5">
                                  {domain.exercises.map((exercise) => (
                                    <span
                                      key={exercise.id}
                                      className="rounded-full border border-border bg-card px-2 py-0.5 text-[0.65rem] text-muted-foreground"
                                    >
                                      {exercise.title}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {section.exercises.map((exercise) => (
                              <div
                                key={exercise.id}
                                className="rounded-xl border border-border bg-surface p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="font-medium">{exercise.title}</p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                      {exercise.sessionTitle}
                                    </p>
                                  </div>
                                  <span className="shrink-0 text-xs text-muted-foreground">
                                    {exercise.date}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </AppShell>
  );
}
