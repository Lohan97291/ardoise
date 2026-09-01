import {
  BookMarked,
  BookOpenCheck,
  Check,
  ChevronDown,
  Clock,
  GraduationCap,
  Languages,
  Printer,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { useState, type ReactNode } from "react";

import { SUBJECT_BAND } from "@/components/ardoise/subject-styles";
import { SUBJECTS, type PrepSheet } from "@/lib/ardoise-data";
import { getPrepSheetCurricularLinks } from "@/lib/curricular-domains";
import {
  getPhaseStatuses,
  nextPhaseStatus,
  resetPhaseStatuses,
  setPhaseStatus,
  type PhaseStatus,
} from "@/lib/session-phases-storage";
import { cn } from "@/lib/utils";

const PHASE_STATUS_LABEL: Record<PhaseStatus, string> = {
  not_started: "À faire",
  in_progress: "En cours",
  completed: "Fait",
};

const PHASE_RING: Record<PhaseStatus, string> = {
  not_started: "border-border text-transparent hover:border-muted-foreground",
  in_progress: "border-ochre bg-ochre/25 text-ochre-foreground",
  completed: "border-sage bg-sage text-foreground",
};

const GUIDE_HEADINGS = [
  "SÉANCE",
  "MATÉRIEL",
  "OBJECTIFS D’APPRENTISSAGE DU PROGRAMME 2025",
  "CE QUE DOIT SAVOIR L’ENSEIGNANT",
  "ACTIVITÉ ENSEIGNANT",
  "ACTIVITÉ ÉLÈVE",
  "Consignes",
  "Repères",
  "Mise en situation",
  "Explicitation",
  "Pratique guidée",
  "Pratique autonome",
  "Évaluation",
  "Consolidation",
  "Clôture de la séance",
  "Clôture de la séquence",
  "Procédures visées",
  "Obstacles possibles",
  "DIFFÉRENCIATION",
  "Trace écrite",
] as const;

function normalizeGuideHeadingValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[()]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

type GuideTone =
  | "neutral"
  | "teacher"
  | "student"
  | "instruction"
  | "material"
  | "evaluation"
  | "differentiation"
  | "trace"
  | "repere"
  | "reference"
  | "procedure";

type PhaseTone =
  | "neutral"
  | "setup"
  | "teacher"
  | "guided"
  | "autonomous"
  | "evaluation"
  | "consolidation"
  | "closing";

const GUIDE_TONE_STYLES: Record<
  GuideTone,
  {
    badge: string;
    block: string;
    dot: string;
    text: string;
  }
> = {
  neutral: {
    badge: "border-slate-200 bg-slate-100 text-slate-700",
    block: "border-border/70 bg-background/80",
    dot: "bg-muted-foreground/70",
    text: "text-foreground/85",
  },
  teacher: {
    badge: "border-sky-200 bg-sky-100 text-sky-900",
    block: "border-sky-200/80 bg-sky-50/90",
    dot: "bg-sky-500",
    text: "text-sky-950",
  },
  student: {
    badge: "border-emerald-200 bg-emerald-100 text-emerald-900",
    block: "border-emerald-200/80 bg-emerald-50/90",
    dot: "bg-emerald-500",
    text: "text-emerald-950",
  },
  instruction: {
    badge: "border-violet-300 bg-violet-600 text-white",
    block: "border-violet-300 bg-violet-50/95 shadow-sm",
    dot: "bg-violet-600",
    text: "font-semibold italic text-violet-950",
  },
  material: {
    badge: "border-stone-200 bg-stone-100 text-stone-800",
    block: "border-stone-200/80 bg-stone-50/90",
    dot: "bg-stone-500",
    text: "text-stone-900",
  },
  evaluation: {
    badge: "border-rose-200 bg-rose-100 text-rose-900",
    block: "border-rose-200/80 bg-rose-50/90",
    dot: "bg-rose-500",
    text: "text-rose-950",
  },
  differentiation: {
    badge: "border-fuchsia-200 bg-fuchsia-100 text-fuchsia-900",
    block: "border-fuchsia-200/80 bg-fuchsia-50/90",
    dot: "bg-fuchsia-500",
    text: "text-fuchsia-950",
  },
  trace: {
    badge: "border-stone-200 bg-stone-100 text-stone-800",
    block: "border-stone-200/80 bg-stone-50/90",
    dot: "bg-stone-500",
    text: "text-stone-900",
  },
  repere: {
    badge: "border-teal-200 bg-teal-100 text-teal-900",
    block: "border-teal-200/80 bg-teal-50/90",
    dot: "bg-teal-500",
    text: "text-teal-950",
  },
  reference: {
    badge: "border-amber-200 bg-amber-100 text-amber-900",
    block: "border-amber-200/80 bg-amber-50/95",
    dot: "bg-amber-500",
    text: "text-amber-950",
  },
  procedure: {
    badge: "border-orange-200 bg-orange-100 text-orange-900",
    block: "border-orange-200/80 bg-orange-50/95",
    dot: "bg-orange-500",
    text: "text-orange-950",
  },
};

const PHASE_TONE_STYLES: Record<
  PhaseTone,
  {
    shell: string;
    rail: string;
    badge: string;
    ring: string;
  }
> = {
  neutral: {
    shell: "border-border bg-white",
    rail: "bg-secondary",
    badge: "border-slate-200 bg-slate-100 text-slate-700",
    ring: "bg-white",
  },
  setup: {
    shell: "border-cyan-200 bg-cyan-50/55",
    rail: "bg-cyan-500",
    badge: "border-cyan-200 bg-cyan-100 text-cyan-900",
    ring: "bg-cyan-50",
  },
  teacher: {
    shell: "border-sky-200 bg-sky-50/55",
    rail: "bg-sky-500",
    badge: "border-sky-200 bg-sky-100 text-sky-900",
    ring: "bg-sky-50",
  },
  guided: {
    shell: "border-indigo-200 bg-indigo-50/55",
    rail: "bg-indigo-500",
    badge: "border-indigo-200 bg-indigo-100 text-indigo-900",
    ring: "bg-indigo-50",
  },
  autonomous: {
    shell: "border-emerald-200 bg-emerald-50/55",
    rail: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-100 text-emerald-900",
    ring: "bg-emerald-50",
  },
  evaluation: {
    shell: "border-rose-200 bg-rose-50/55",
    rail: "bg-rose-500",
    badge: "border-rose-200 bg-rose-100 text-rose-900",
    ring: "bg-rose-50",
  },
  consolidation: {
    shell: "border-amber-200 bg-amber-50/55",
    rail: "bg-amber-500",
    badge: "border-amber-200 bg-amber-100 text-amber-900",
    ring: "bg-amber-50",
  },
  closing: {
    shell: "border-violet-200 bg-violet-50/55",
    rail: "bg-violet-500",
    badge: "border-violet-200 bg-violet-100 text-violet-900",
    ring: "bg-violet-50",
  },
};

/**
 * Fiche de prep hiérarchisée : compétence → objectif → déroulé → matériel → différenciation.
 * Un bloc = une information, jamais de pavé de texte compact.
 * `sessionId` identifie l'occurrence de la séance (cahier journal) pour persister
 * l'avancement du déroulé indépendamment des autres jours où cette fiche est utilisée.
 * Sans sessionId (ex. aperçu depuis Ressources), le suivi reste local, non persisté.
 */
export function PrepSheetView({
  sheet,
  sessionId,
  stickyHeader = true,
}: {
  sheet: PrepSheet;
  sessionId?: string;
  stickyHeader?: boolean;
}) {
  const differentiations = sheet.phases
    .map((p, i) => ({ index: i + 1, title: p.title, text: p.differentiation }))
    .filter((p) => !!p.text);
  const exerciseCount = sheet.exercises?.length ?? 0;
  const studentPagesLabel = formatPageList(sheet.studentPages);
  const teacherPagesLabel = formatPageList(sheet.teacherPages);
  const curricularLinks = getPrepSheetCurricularLinks(sheet);

  const [statuses, setStatuses] = useState<Record<number, PhaseStatus>>(() =>
    sessionId ? getPhaseStatuses(sessionId) : {},
  );
  const [exercisesOpen, setExercisesOpen] = useState(true);
  const total = sheet.phases.length;
  const doneCount = Object.values(statuses).filter((s) => s === "completed").length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  const sommaireItems: { id: string; label: string }[] = [
    { id: "sheet-objectif", label: "Objectif" },
    { id: "sheet-domaines", label: "Domaines" },
    ...(total > 0 ? [{ id: "sheet-deroule", label: "Déroulé" }] : []),
    { id: "sheet-materiel", label: "Matériel" },
    ...((sheet.exercises?.length ?? 0) > 0 ? [{ id: "sheet-exercices", label: "Exercices" }] : []),
    ...(differentiations.length > 0
      ? [{ id: "sheet-differenciation", label: "Différenciation" }]
      : []),
    ...(sheet.audioVideo?.length || sheet.notes?.length ? [{ id: "sheet-notes", label: "Notes" }] : []),
  ];

  function cyclePhase(index: number) {
    const current = statuses[index] ?? "not_started";
    const next = nextPhaseStatus(current);
    if (sessionId) {
      setStatuses(setPhaseStatus(sessionId, index, next));
    } else {
      setStatuses((prev) => ({ ...prev, [index]: next }));
    }
  }

  function reset() {
    if (sessionId) resetPhaseStatuses(sessionId);
    setStatuses({});
  }

  return (
    <div className="print-sheet space-y-4 rounded-[28px] border border-border/80 bg-white p-3 shadow-[0_22px_56px_-34px_rgba(31,41,55,0.22)] print:border-0 print:bg-white print:p-0 print:shadow-none sm:p-5">
      {/* Identité de la fiche */}
      <header
        className={cn(
          "overflow-hidden rounded-[24px] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,1),rgba(247,249,252,1))] p-5 shadow-sm print:static print:bg-white print:shadow-none",
          stickyHeader ? "sticky top-0 z-10" : "relative",
        )}
      >
        <span className={cn("absolute inset-x-0 top-0 h-1", SUBJECT_BAND[sheet.subject])} />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-[0.72rem] font-semibold shadow-sm",
                  SUBJECT_BAND[sheet.subject],
                )}
              >
                {SUBJECTS[sheet.subject].label}
              </span>
              <span className="rounded-full border border-border/70 bg-white px-3 py-1 text-[0.7rem] font-semibold text-muted-foreground shadow-sm">
                Fiche de prep
              </span>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                Préparation chronologique
              </p>
              <h3 className="mt-1 text-xl font-semibold leading-snug text-foreground sm:text-[1.65rem]">
                {sheet.title}
              </h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Une fiche claire, structurée pour être lue rapidement pendant la classe.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="print:hidden inline-flex items-center gap-1.5 rounded-xl border border-border/70 bg-white px-3 py-2 text-xs font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
          >
            <Printer className="h-3.5 w-3.5" />
            Imprimer
          </button>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
          <PrepMetricPill
            label="Durée"
            value={sheet.duration || "—"}
            icon={<Clock className="h-3.5 w-3.5" />}
          />
          <PrepMetricPill label="Phases" value={String(total)} />
          <PrepMetricPill label="Exercices" value={String(exerciseCount)} />
          <PrepMetricPill label="Matériel" value={String(sheet.material.length)} />
          {studentPagesLabel || teacherPagesLabel ? (
            <PageReferencePill
              label={studentPagesLabel ? "Cahier élève" : "Guide du maître"}
              value={studentPagesLabel ?? teacherPagesLabel ?? "—"}
            />
          ) : null}
        </div>
        {studentPagesLabel && teacherPagesLabel ? (
          <div className="mt-2 flex flex-wrap gap-2">
            <PageReferencePill label="Cahier élève" value={studentPagesLabel} compact />
            <PageReferencePill label="Guide du maître" value={teacherPagesLabel} compact />
          </div>
        ) : null}
      </header>

      {/* Sommaire cliquable : navigue directement vers une section de la fiche */}
      <nav className="flex flex-wrap gap-1.5 rounded-2xl border border-border/70 bg-secondary/40 p-1.5 print:hidden">
        {sommaireItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() =>
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Compétence + objectif : les deux repères clés, côte à côte */}
      <div id="sheet-objectif" className="scroll-mt-24 grid gap-3 sm:grid-cols-2">
        <KeyBlock label="Compétence visée" text={sheet.competence} />
        <KeyBlock
          label="Objectif de la séance"
          text={sheet.objective}
          accent
          icon={<Target className="h-4 w-4" />}
        />
      </div>

      <section
        id="sheet-domaines"
        className="scroll-mt-24 rounded-[22px] border border-border/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,247,255,0.92))] p-4 shadow-sm print:border print:bg-white print:shadow-none"
      >
        <SectionTitle
          eyebrow="Rattachement institutionnel"
          title="Domaines de la séance"
          description="Socle commun et domaines disciplinaires à reporter dans la préparation."
          icon={<GraduationCap className="h-4 w-4" />}
        />
        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <DomainCard
            icon={<GraduationCap className="h-4 w-4" />}
            title="Domaines du socle"
            items={curricularLinks.socleDomains}
            tone="socle"
          />
          <DomainCard
            icon={<BookOpenCheck className="h-4 w-4" />}
            title={`Domaines ${SUBJECTS[sheet.subject].label.toLowerCase()}`}
            items={curricularLinks.disciplinaryDomains}
            tone="discipline"
          />
        </div>
      </section>

      {sheet.vocabulary?.length || sheet.languageStructures?.length ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {sheet.vocabulary?.length ? (
            <ListBlock
              icon={<Languages className="h-4 w-4" />}
              title="Vocabulaire"
              items={sheet.vocabulary}
              dotClass="bg-subject-lve-foreground"
            />
          ) : null}
          {sheet.languageStructures?.length ? (
            <ListBlock
              icon={<BookMarked className="h-4 w-4" />}
              title="Structures langagières"
              items={sheet.languageStructures}
              dotClass="bg-subject-lve-foreground"
            />
          ) : null}
        </div>
      ) : null}

      {/* Déroulé */}
      <section id="sheet-deroule" className="scroll-mt-24 rounded-[22px] border border-border/80 bg-card p-4 shadow-sm print:border print:bg-white print:shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="min-w-0">
            <SectionTitle
              eyebrow={`Déroulé · ${total} phase${total > 1 ? "s" : ""}`}
              title="Déroulé de la séance"
              description="Lecture continue de la séance, dans l’ordre du guide."
            />
          </div>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[0.72rem] font-semibold tabular-nums",
                doneCount === total && total > 0
                  ? "bg-sage/25 text-foreground"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              {doneCount}/{total} phases faites
            </span>
            {Object.keys(statuses).length > 0 ? (
              <button
                type="button"
                onClick={reset}
                className="rounded-md px-1.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Réinitialiser
              </button>
            ) : null}
          </div>
        </div>
        {total > 0 ? (
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-sage transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        ) : (
          <p className="mt-2 rounded-xl border border-dashed border-border bg-secondary/40 p-3 text-sm text-muted-foreground">
            Le déroulé détaillé de cette séance sera ajouté après transcription fidèle de la double
            page du guide.
          </p>
        )}
        <ol className="relative mt-4 space-y-3 pl-1 before:absolute before:bottom-2 before:left-[0.98rem] before:top-2 before:w-px before:bg-[linear-gradient(180deg,rgba(195,204,228,0.1),rgba(195,204,228,0.9),rgba(195,204,228,0.1))] before:content-['']">
          {sheet.phases.map((phase, i) => {
            const status = statuses[i] ?? "not_started";
            const done = status === "completed";
            const phaseTone = getPhaseTone(phase.title);
            return (
              <li
                key={phase.title}
                className={cn(
                  "relative rounded-[22px] border p-4 shadow-sm transition-all duration-200",
                  PHASE_TONE_STYLES[phaseTone].shell,
                  status === "completed" && "border-sage/50",
                  status === "in_progress" && "border-ochre/50",
                  status === "not_started" && "border-border",
                )}
              >
                <span
                  className={cn(
                    "absolute bottom-4 left-0 top-4 w-1 rounded-r-full",
                    status === "completed" && "bg-sage",
                    status === "in_progress" && "bg-ochre",
                    status === "not_started" && PHASE_TONE_STYLES[phaseTone].rail,
                  )}
                />
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-3 pl-2">
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-xs font-semibold shadow-sm transition-colors",
                      done
                        ? "border-sage/40 bg-sage text-foreground"
                        : cn(
                            "border-border/70 text-foreground",
                            PHASE_TONE_STYLES[phaseTone].ring,
                          ),
                    )}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground/80">
                        Phase {i + 1}
                      </p>
                      <span
                        className={cn(
                          "rounded-lg border px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.1em] shadow-sm",
                          PHASE_TONE_STYLES[phaseTone].badge,
                        )}
                      >
                        {getPhaseCategoryLabel(phase.title)}
                      </span>
                    </div>
                    <p
                      className={cn(
                        "min-w-0 text-sm font-semibold leading-snug transition-colors sm:text-[0.96rem]",
                        done && "text-muted-foreground line-through",
                      )}
                    >
                      {phase.title}
                    </p>
                  </div>
                  {phase.duration ? (
                    <span className="shrink-0 rounded-full border border-border/70 bg-secondary px-2 py-1 font-mono text-[0.7rem] text-muted-foreground">
                      {phase.duration}
                    </span>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => cyclePhase(i)}
                    aria-label={`Phase ${i + 1} : ${PHASE_STATUS_LABEL[status]}`}
                    title={`Statut : ${PHASE_STATUS_LABEL[status]} (cliquer pour changer)`}
                    className={cn(
                      "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-all duration-200",
                      PHASE_RING[status],
                    )}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                </div>
                {phase.detail ? (
                  <div
                    className={cn(
                      "mt-3 rounded-2xl border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,250,252,0.92))] px-3 py-3 text-sm leading-relaxed transition-colors sm:ml-[2.85rem]",
                      done ? "text-muted-foreground/70" : "text-foreground/85",
                    )}
                  >
                    <PhaseDetailContent text={phase.detail} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      {/* Matériel / photocopies */}
      <div id="sheet-materiel" className="scroll-mt-24 grid gap-3 sm:grid-cols-2">
        <ListBlock
          collapsible
          icon={<Wrench className="h-4 w-4" />}
          title="Matériel"
          items={sheet.material}
        />
        <ListBlock
          collapsible
          icon={<Printer className="h-4 w-4" />}
          title="Photocopies"
          items={sheet.photocopies}
          dotClass="bg-ochre"
        />
      </div>

      {sheet.audioVideo?.length || sheet.notes?.length ? (
        <div id="sheet-notes" className="scroll-mt-24 grid gap-3 sm:grid-cols-2">
          {sheet.audioVideo?.length ? (
            <ListBlock
              collapsible
              icon={<Sparkles className="h-4 w-4" />}
              title="Audio / vidéo"
              items={sheet.audioVideo}
              dotClass="bg-sky-500"
            />
          ) : null}
          {sheet.notes?.length ? (
            <ListBlock
              collapsible
              icon={<BookMarked className="h-4 w-4" />}
              title="Repères"
              items={sheet.notes}
              dotClass="bg-muted-foreground"
            />
          ) : null}
        </div>
      ) : null}

      {sheet.exercises?.length ? (
        <section id="sheet-exercices" className="scroll-mt-24 rounded-[22px] border border-border/80 bg-card p-4 shadow-sm print:border print:bg-white print:shadow-none">
          <button
            type="button"
            onClick={() => setExercisesOpen((o) => !o)}
            className="flex w-full flex-wrap items-center justify-between gap-2 text-left"
          >
            <SectionTitle
              eyebrow="Exercices et correction"
              title="Supports élèves"
              description="Consigne, page du cahier et correction prête à l’emploi."
            />
            <span className="flex items-center gap-2">
              <span className="rounded-full border border-border/70 bg-secondary/70 px-2.5 py-1 text-[0.72rem] font-semibold text-muted-foreground">
                {exerciseCount} exercice{exerciseCount > 1 ? "s" : ""}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform print:hidden",
                  exercisesOpen && "rotate-180",
                )}
              />
            </span>
          </button>
          <div className={cn("mt-3 space-y-3 print:block", !exercisesOpen && "hidden")}>
            {sheet.exercises.map((exercise) => (
              <article
                key={exercise.id}
                className="rounded-2xl border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,255,0.94))] p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[0.7rem] font-semibold text-primary">
                    {exercise.number ?? "Exercice"}
                  </span>
                  {exercise.page ? (
                    <span className="rounded-full border border-border/70 bg-white/80 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground">
                      p. {exercise.page}
                    </span>
                  ) : null}
                </div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-border/70 bg-white/80 px-3 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Exercice
                    </p>
                    <p className="panel-heading mt-1 text-sm font-semibold leading-snug">
                      {exercise.title ?? exercise.instruction}
                    </p>
                  </div>
                  {exercise.title ? (
                    <div className="rounded-xl border border-violet-200/80 bg-violet-50/80 px-3 py-3">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-violet-700">
                        Consigne
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-violet-950">
                        {exercise.instruction}
                      </p>
                    </div>
                  ) : null}
                </div>
                {exercise.correction ? (
                  <div className="mt-3 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/75 px-3 py-3">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-emerald-700">
                      Correction
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-emerald-950">
                      {exercise.correction}
                    </p>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {sheet.coverageNote ? (
        <section className="rounded-2xl border border-dashed border-border bg-secondary/40 p-4">
          <h4 className="eyebrow">Note de couverture</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {sheet.coverageNote}
          </p>
        </section>
      ) : null}

      {/* Différenciation regroupée en fin de fiche */}
      {differentiations.length ? (
        <section id="sheet-differenciation" className="scroll-mt-24 rounded-[22px] border border-border/80 bg-card p-4 shadow-sm print:border print:bg-white print:shadow-none">
          <SectionTitle
            eyebrow="Différenciation"
            title="Ajustements et étayage"
            description="Repères utiles pour adapter la séance à certains élèves."
            icon={<Sparkles className="h-4 w-4" />}
          />
          <ul className="mt-2 space-y-2">
            {differentiations.map((d) => (
              <li
                key={d.title}
                className="rounded-xl border border-border/70 bg-secondary/25 px-3 py-3"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Phase {d.index} · {d.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{d.text}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

type ParsedGuideBlock = {
  heading: string;
  entries: string[];
};

type PhaseDisplayStep = {
  heading: string;
  entries: string[];
  instructions: string[];
};

function PhaseDetailContent({ text }: { text: string }) {
  const blocks = parseGuideBlocks(text);
  const displaySteps = buildPhaseDisplaySteps(blocks);

  if (displaySteps.length === 0) {
    return (
      <div className="rounded-xl border border-border/70 bg-white/80 px-3.5 py-3">
        <p className="text-[0.82rem] leading-relaxed text-foreground/85">{text}</p>
      </div>
    );
  }

  return (
    <ol className="space-y-3.5">
      {displaySteps.map((step, index) => {
        const tone = getGuideHeadingTone(step.heading);
        const label = getPhaseBlockLabel(step.heading);

        return (
          <li
            key={`${step.heading}-${index}-${step.entries[0]?.slice(0, 24) ?? "step"}`}
            className="rounded-[18px] border border-border/70 bg-white/75 p-3 shadow-sm"
          >
            <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
              <div className="flex items-start gap-3 sm:block">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border/70 bg-white text-[0.68rem] font-semibold text-muted-foreground shadow-sm">
                  {index + 1}
                </span>
              </div>
              <div className="space-y-2">
                <span
                  className={cn(
                    "inline-flex rounded-lg border px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.1em] shadow-sm",
                    GUIDE_TONE_STYLES[tone].badge,
                  )}
                >
                  {label}
                </span>
                <div
                  className={cn(
                    "rounded-xl border px-3.5 py-3.5",
                    tone === "instruction" && "border-l-4 border-l-violet-500 bg-violet-50/95",
                    tone !== "instruction" && GUIDE_TONE_STYLES[tone].block,
                  )}
                >
                  <div className="space-y-3">
                    <GuideEntryGroup entries={step.entries} tone={tone} label={label} />
                    {step.instructions.length ? (
                      <div className="space-y-2 rounded-lg border border-violet-200/90 bg-violet-100/45 p-3">
                        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-violet-700">
                          Formulation ou consigne
                        </p>
                        {step.instructions.map((instruction, instructionIndex) => (
                          <div
                            key={`${label}-instruction-${instructionIndex}`}
                            className="rounded-lg border border-violet-200 bg-white/90 px-3 py-2.5 shadow-sm"
                          >
                            <p className="text-[0.82rem] font-semibold italic leading-relaxed text-violet-950">
                              {instruction}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function isGuideHeading(line: string): boolean {
  const normalizedLine = normalizeGuideHeadingValue(line);
  return GUIDE_HEADINGS.some((heading) => {
    const normalizedHeading = normalizeGuideHeadingValue(heading);
    return (
      normalizedLine === normalizedHeading || normalizedLine.startsWith(`${normalizedHeading} `)
    );
  });
}

function getGuideHeadingTone(line: string): GuideTone {
  const normalizedLine = normalizeGuideHeadingValue(line);

  if (normalizedLine.startsWith("activite enseignant")) return "teacher";
  if (normalizedLine.startsWith("activite eleve")) return "student";
  if (normalizedLine.startsWith("consignes")) return "instruction";
  if (normalizedLine.startsWith("materiel")) return "material";
  if (normalizedLine.startsWith("evaluation")) return "evaluation";
  if (normalizedLine.startsWith("differenciation")) return "differentiation";
  if (normalizedLine.startsWith("trace ecrite")) return "trace";
  if (normalizedLine.startsWith("reperes")) return "repere";
  if (normalizedLine.startsWith("ce que doit savoir lenseignant")) return "reference";
  if (normalizedLine.startsWith("procedures visees")) return "procedure";

  return "neutral";
}

function getPhaseTone(title: string): PhaseTone {
  const normalizedTitle = normalizeGuideHeadingValue(title);

  if (
    normalizedTitle.includes("mise en situation") ||
    normalizedTitle.includes("recherche") ||
    normalizedTitle.includes("decouverte")
  ) {
    return "setup";
  }
  if (normalizedTitle.includes("explicitation") || normalizedTitle.includes("modelisation")) {
    return "teacher";
  }
  if (normalizedTitle.includes("pratique guidee")) return "guided";
  if (normalizedTitle.includes("pratique autonome")) return "autonomous";
  if (normalizedTitle.includes("evaluation")) return "evaluation";
  if (normalizedTitle.includes("consolidation")) return "consolidation";
  if (normalizedTitle.includes("cloture")) return "closing";

  return "neutral";
}

function getPhaseCategoryLabel(title: string): string {
  const tone = getPhaseTone(title);

  switch (tone) {
    case "setup":
      return "Lancement";
    case "teacher":
      return "Explication";
    case "guided":
      return "Accompagnement";
    case "autonomous":
      return "Entraînement";
    case "evaluation":
      return "Vérification";
    case "consolidation":
      return "Réinvestissement";
    case "closing":
      return "Bilan";
    default:
      return "Étape";
  }
}

function parseGuideBlocks(text: string): ParsedGuideBlock[] {
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ParsedGuideBlock[] = [];
  let currentBlock: ParsedGuideBlock | null = null;

  for (const line of lines) {
    if (isGuideHeading(line)) {
      if (currentBlock) {
        blocks.push(currentBlock);
      }
      currentBlock = {
        heading: line,
        entries: [],
      };
      continue;
    }

    const cleanedLine = line.replace(/^[•\-‣▪◦*]+\s*/, "").replace(/^[੉􀌤]+\s*/, "");

    if (!currentBlock) {
      currentBlock = {
        heading: "Déroulé",
        entries: [],
      };
    }

    currentBlock.entries.push(cleanedLine);
  }

  if (currentBlock) {
    blocks.push(currentBlock);
  }

  return blocks.filter((block) => block.entries.length > 0);
}

function buildPhaseDisplaySteps(blocks: ParsedGuideBlock[]): PhaseDisplayStep[] {
  const steps: PhaseDisplayStep[] = [];

  for (const block of blocks) {
    const tone = getGuideHeadingTone(block.heading);
    const lastStep = steps[steps.length - 1];

    if (tone === "instruction" && lastStep) {
      lastStep.instructions.push(...block.entries);
      continue;
    }

    if (lastStep && lastStep.heading === block.heading && lastStep.instructions.length === 0) {
      lastStep.entries.push(...block.entries);
      continue;
    }

    steps.push({
      heading: block.heading,
      entries: [...block.entries],
      instructions: [],
    });
  }

  return steps;
}

function getPhaseBlockLabel(heading: string): string {
  const normalizedHeading = normalizeGuideHeadingValue(heading);

  if (normalizedHeading.startsWith("activite enseignant")) return "Ce que fait l'enseignant";
  if (normalizedHeading.startsWith("consignes")) return "Ce qu'on dit aux élèves";
  if (normalizedHeading.startsWith("activite eleve")) return "Ce que font les élèves";
  if (normalizedHeading.startsWith("reperes")) return "Observations et repères";
  if (normalizedHeading.startsWith("ce que doit savoir lenseignant"))
    return "Point d'appui enseignant";
  if (normalizedHeading.startsWith("procedures visees")) return "Procédures attendues";

  return heading;
}

function isGuideSubstep(entry: string): boolean {
  return /^(activite\s+\d+|figure\s+[a-z]|\d+(re|e)\s+explicitation)\b/i.test(entry);
}

function GuideEntryGroup({
  entries,
  tone,
  label,
}: {
  entries: string[];
  tone: GuideTone;
  label: string;
}) {
  return (
    <div className="space-y-2.5">
      <div className="space-y-2">
        {entries.map((entry, entryIndex) =>
          isGuideSubstep(entry) ? (
            <div
              key={`${label}-entry-${entryIndex}`}
              className="rounded-lg border border-border/70 bg-white/85 px-3 py-2.5 shadow-sm"
            >
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-foreground/70">
                {entry}
              </p>
            </div>
          ) : (
            <div
              key={`${label}-entry-${entryIndex}`}
              className="rounded-lg border border-border/60 bg-white/80 px-3 py-2.5 shadow-sm"
            >
              <div className="flex gap-2.5">
                <span
                  className={cn(
                    "mt-2 h-1.5 w-1.5 shrink-0 rounded-full",
                    GUIDE_TONE_STYLES[tone].dot,
                  )}
                />
                <p
                  className={cn(
                    "text-[0.84rem] leading-relaxed",
                    tone === "instruction"
                      ? "font-semibold italic text-violet-950"
                      : GUIDE_TONE_STYLES[tone].text,
                  )}
                >
                  {entry}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function PrepMetricPill({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-white px-3 py-2 shadow-sm">
      {icon ? <span className="text-muted-foreground">{icon}</span> : null}
      <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </span>
  );
}

function PageReferencePill({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border border-border/70 bg-white text-[0.76rem] text-foreground shadow-sm",
        compact ? "rounded-full px-3 py-1.5" : "rounded-2xl px-3 py-2",
      )}
    >
      <span className="font-semibold text-muted-foreground">{label}</span>
      <span className="font-mono">{value}</span>
    </span>
  );
}

function KeyBlock({
  label,
  text,
  icon,
  accent,
}: {
  label: string;
  text: string;
  icon?: ReactNode;
  accent?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-[20px] border p-4 shadow-sm",
        accent
          ? "border-primary/25 bg-[linear-gradient(180deg,rgba(244,247,255,1),rgba(255,255,255,1))]"
          : "border-border/80 bg-card",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border shadow-sm",
            accent
              ? "border-primary/15 bg-primary/10 text-primary"
              : "border-border/70 bg-secondary/65 text-muted-foreground",
          )}
        >
          {icon ?? <BookMarked className="h-4 w-4" />}
        </span>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{text}</p>
        </div>
      </div>
    </section>
  );
}

function ListBlock({
  title,
  icon,
  items,
  dotClass = "bg-muted-foreground",
  collapsible = false,
}: {
  title: string;
  icon?: React.ReactNode;
  items: string[];
  dotClass?: string;
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(true);
  const expanded = collapsible ? open : true;

  return (
    <section className="rounded-[20px] border border-border/80 bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-border/70 bg-secondary/65 text-muted-foreground shadow-sm">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          {collapsible ? (
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {title}
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>
          ) : (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {title}
            </p>
          )}
          {!expanded ? null : items.length ? (

            <ul className="mt-2.5 space-y-2 text-sm">
              {items.map((m) => (
                <li key={m} className="flex gap-2.5">
                  <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", dotClass)} />
                  <span className="leading-relaxed text-foreground/90">{m}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              Non précisé dans la source transcrite.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function DomainCard({
  title,
  icon,
  items,
  tone,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
  tone: "socle" | "discipline";
}) {
  return (
    <div
      className={cn(
        "rounded-[18px] border p-3.5",
        tone === "socle"
          ? "border-sky-200/80 bg-sky-50/80"
          : "border-amber-200/80 bg-amber-50/80",
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-xl border bg-white/85 shadow-sm",
            tone === "socle" ? "border-sky-200 text-sky-700" : "border-amber-200 text-amber-700",
          )}
        >
          {icon}
        </span>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-foreground/70">
          {title}
        </p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[0.78rem] font-semibold leading-snug text-foreground shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
  icon,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {icon ? <span className="text-foreground">{icon}</span> : null}
        {eyebrow}
      </p>
      <h4 className="mt-1 text-base font-semibold text-foreground">{title}</h4>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}

function formatPageList(pages?: number[]): string | null {
  if (!pages?.length) return null;
  const uniquePages = [...new Set(pages)].sort((a, b) => a - b);
  if (uniquePages.length === 1) return `p. ${uniquePages[0]}`;

  const ranges: string[] = [];
  let start = uniquePages[0];
  let end = uniquePages[0];

  for (let i = 1; i < uniquePages.length; i += 1) {
    const current = uniquePages[i];
    if (current === end + 1) {
      end = current;
      continue;
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    start = current;
    end = current;
  }

  ranges.push(start === end ? `${start}` : `${start}-${end}`);
  return `p. ${ranges.join(", ")}`;
}
