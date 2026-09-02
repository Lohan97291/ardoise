import {
  Coffee,
  ClipboardCheck,
  ExternalLink,
  FileText,
  Layers,
  Plus,
  Printer,
  Sparkles,
  Trash2,
  Unlink,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { PrepSheetView } from "@/components/ardoise/prep-sheet-view";
import {
  AssistantClarificationPanel,
  AssistantContextDetails,
  AssistantPromptBox,
  AssistantStepsCard,
  type AssistantQuestionAnswer,
} from "@/components/ardoise/ai-assistant-panels";
import { ChoiceCard, StepHeader } from "@/components/ardoise/step-choice";
import { ResourcePicker } from "@/components/ardoise/resource-picker";
import { SUBJECT_BAND } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CLEO_CATALOG, MATHS_CATALOG, ORTHO_CATALOG } from "@/lib/ardoise-eval";
import { buildQuestionAnswersPayload } from "@/lib/ai-client";
import {
  addCustomPhase,
  getCustomPhases,
  removeCustomPhase,
  saveCustomPhases,
  updateCustomPhase,
  type CustomPhase,
} from "@/lib/custom-phases-storage";
import {
  getCustomSessionPrep,
  saveCustomSessionPrep,
  updateCustomSessionPrep,
  type CustomSessionPrep,
} from "@/lib/custom-session-prep-storage";
import {
  addMaterial,
  addPhotocopy,
  getSessionExtras,
  removeMaterial,
  removePhotocopy,
  type SessionExtras,
} from "@/lib/session-extras-storage";
import {
  getSessionCorrectionLabel,
  getSessionResultTarget,
  inferFluencePeriodFromSession,
} from "@/lib/session-result-links";
import type { AiResourceContext } from "@/lib/ai-resource-context";
import { getAiJournalContext, type AiJournalContext } from "@/lib/ai-journal-context";
import { ARDOISE_AI_NAME, ardoiseAiTitle } from "@/lib/ardoise-ai-brand";
import { getExercisePlan } from "@/lib/exercise-plans";
import {
  emptyAiResourceContext,
  loadAiResourceContext,
  loadPatchedPrepSheet,
  loadPatchedResourceMatch,
} from "@/lib/resource-library";
import { cn } from "@/lib/utils";
import { useAiRequest } from "@/hooks/use-ai-request";
import {
  SUBJECTS,
  SUBJECT_LIST,
  durationLabel,
  type PrepSheet,
  type Session,
  type SessionCorrectionMode,
  type SubjectKey,
} from "@/lib/ardoise-data";
import type { PatchedResourceMatch } from "@/lib/resource-tree-patched";

type Props = {
  session: Session | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (session: Session) => void;
  onAttachCorrection?: (session: Session) => void;
};

/** Mode d'édition déduit de la séance : choix initial → interface adaptée. */
type Mode = "choice" | "free" | "resource";
type GeneratedSessionPlan = {
  recommendedFormat: "seance" | "sequence";
  pedagogicalRationale: string;
  competence: string;
  objective: string;
  sequenceSessions: string[];
  evaluation: string;
  materialSuggestions: string[];
  photocopySuggestions: string[];
  phases: CustomPhase[];
};

type ClarifyingQuestion = {
  id: string;
  question: string;
  rationale: string;
  suggestions: string[];
  freeTextPlaceholder: string;
};

type ClarificationResponse = {
  intro: string;
  readyToGenerate: boolean;
  questions: ClarifyingQuestion[];
};

const FLUENCE_PERIODS = [
  "Diagnostic S1",
  "Bilan A",
  "Bilan O",
  "Bilan E",
  "Bilan C",
  "Bilan G",
  "Bilan S",
  "Bilan I",
  "Octobre",
  "Janvier",
  "Juin",
] as const;
const UNSET_CORRECTION_EXERCISE = "__unset__";

function resourceToProgrammingItemId(resourceId?: string): string | undefined {
  if (!resourceId) return undefined;
  const cleoMatch = resourceId.match(/^cleo-p(\d+)-(\d+)$/i);
  if (cleoMatch) return `e_p${cleoMatch[1]}_${cleoMatch[2]}`;

  const accesMatch = resourceId.match(/^acces-m(\d+)$/i);
  if (accesMatch) return `m${accesMatch[1]}`;

  return undefined;
}

function resourceToCorrectionMode(
  resourceId?: string,
  subject?: SubjectKey,
): SessionCorrectionMode | undefined {
  if (!resourceId) return undefined;
  if (/^cleo-p\d+-\d+$/i.test(resourceId)) return "cleo";
  if (/^acces-m\d+$/i.test(resourceId)) return "maths";
  if (subject === "maths") return "maths";
  if (subject === "francais") return "auto";
  return undefined;
}

function associatedPages(session: Session): number[] {
  return (session.exercisePlan ?? [])
    .flatMap((item) =>
      item.studentPages?.length
        ? item.studentPages
        : typeof item.page === "number"
          ? [item.page]
          : [],
    )
    .filter((page, index, list) => page > 0 && list.indexOf(page) === index)
    .sort((left, right) => left - right);
}

function associatedPageLabel(session: Session): string {
  const pages = associatedPages(session);
  if (pages.length === 0) return "Aucune page détectée";
  if (pages.length === 1) return `p. ${pages[0]}`;
  return `p. ${pages.join(", ")}`;
}

function associatedPageHint(session: Session): string {
  const item = (session.exercisePlan ?? []).find(
    (entry) => entry.studentPages?.length || typeof entry.page === "number",
  );
  return item?.label ?? "La page de l'élève sera proposée ici dès qu'elle est identifiée.";
}

function associatedNotebookLabel(mode: SessionCorrectionMode, subject: SubjectKey): string {
  if (mode === "cleo") return "Cahier Cléo";
  if (mode === "maths") return "Cahier de mathématiques";
  if (mode === "dictation") return "Cahier de dictée";
  return subject === "maths" ? "Cahier de mathématiques" : "Cahier de l'élève";
}

function correctionOptions(mode: SessionCorrectionMode) {
  if (mode === "cleo") {
    return CLEO_CATALOG.map((entry) => ({
      value: entry.id,
      label: `P${entry.period} · ${entry.title}`,
    }));
  }
  if (mode === "maths") {
    return MATHS_CATALOG.map((entry) => ({
      value: entry.id,
      label: `P${entry.period} · ${entry.title}`,
    }));
  }
  if (mode === "dictation") {
    return ORTHO_CATALOG.filter((entry) => entry.weekNum >= 2 && entry.weekNum <= 35).map(
      (entry) => ({
        value: entry.id,
        label: `S${entry.weekNum} · ${entry.title}`,
      }),
    );
  }
  return [];
}

function defaultCorrectionExerciseId(
  session: Session,
  mode: SessionCorrectionMode,
): string | undefined {
  const options = correctionOptions(mode);
  if (options.some((option) => option.value === session.correctionExerciseId)) {
    return session.correctionExerciseId;
  }
  if (options.some((option) => option.value === session.programmingItemId)) {
    return session.programmingItemId;
  }
  return undefined;
}

function correctionSelectLabel(mode: SessionCorrectionMode): string {
  if (mode === "cleo") return "Page / exercice Cléo";
  if (mode === "maths") return "Module ou page de maths";
  return "Dictée bilan";
}

export function SessionModal({ session, open, onOpenChange, onSave, onAttachCorrection }: Props) {
  const [draft, setDraft] = useState<Session | null>(session);
  const [prep, setPrep] = useState<PrepSheet | undefined>();
  const [resourceMatch, setResourceMatch] = useState<PatchedResourceMatch | undefined>();
  const [mode, setMode] = useState<Mode>("choice");
  const [extras, setExtras] = useState<SessionExtras>({ material: [], photocopies: [] });
  const [customPhases, setCustomPhases] = useState<CustomPhase[]>([]);
  const [customPrep, setCustomPrep] = useState<CustomSessionPrep>({
    competence: "",
    objective: "",
    recommendedFormat: "seance",
    pedagogicalRationale: "",
    sequenceSessions: [],
    evaluation: "",
    materialSuggestions: [],
    photocopySuggestions: [],
  });
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [assistantPlan, setAssistantPlan] = useState<GeneratedSessionPlan | null>(null);
  const [assistantTurns, setAssistantTurns] = useState<
    Array<{ role: "user" | "assistant"; text: string }>
  >([]);
  const [assistantClarification, setAssistantClarification] =
    useState<ClarificationResponse | null>(null);
  const [assistantAnswers, setAssistantAnswers] = useState<Record<string, AssistantQuestionAnswer>>(
    {},
  );
  const [printingPrep, setPrintingPrep] = useState(false);
  const [assistantResourceContext, setAssistantResourceContext] = useState<AiResourceContext>(
    emptyAiResourceContext(session?.subject ?? "francais"),
  );
  const {
    busy: assistantBusy,
    error: assistantError,
    clearError: clearAssistantError,
    runJson: runAssistantJson,
  } = useAiRequest(`Impossible de lancer ${ARDOISE_AI_NAME} pour le moment.`);

  useEffect(() => {
    setDraft(
      session
        ? {
            ...session,
            exercisePlan: session.exercisePlan ?? getExercisePlan(session.programmingItemId),
          }
        : session,
    );
    if (!session) return;
    setMode(
      session.free ? "free" : session.prepSheetId || session.resourceId ? "resource" : "choice",
    );
    setExtras(getSessionExtras(session.id));
    setCustomPhases(getCustomPhases(session.id));
    setCustomPrep(getCustomSessionPrep(session.id));
    setAssistantPrompt("");
    clearAssistantError();
    setAssistantPlan(null);
    setAssistantTurns([]);
    setAssistantClarification(null);
    setAssistantAnswers({});
  }, [clearAssistantError, session]);

  useEffect(() => {
    if (!draft) {
      setPrep(undefined);
      setResourceMatch(undefined);
      return;
    }
    let active = true;
    void loadPatchedPrepSheet(draft.prepSheetId).then((nextPrep) => {
      if (active) setPrep(nextPrep);
    });
    void loadPatchedResourceMatch(draft.resourceId).then((nextMatch) => {
      if (active) setResourceMatch(nextMatch);
    });
    return () => {
      active = false;
    };
  }, [draft?.prepSheetId, draft?.resourceId]);

  useEffect(() => {
    if (!draft) {
      setAssistantResourceContext(emptyAiResourceContext("francais"));
      return;
    }
    let active = true;
    setAssistantResourceContext(emptyAiResourceContext(draft.subject));
    void loadAiResourceContext({
      subject: draft.subject,
      title: draft.title,
      resourceId: draft.resourceId,
      programmingItemId: draft.programmingItemId,
    }).then((context) => {
      if (active) setAssistantResourceContext(context);
    });
    return () => {
      active = false;
    };
  }, [draft?.programmingItemId, draft?.resourceId, draft?.subject, draft?.title]);

  useEffect(() => {
    if (!printingPrep || !prep) return;

    const timeout = window.setTimeout(() => {
      window.print();
      window.setTimeout(() => setPrintingPrep(false), 250);
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [prep, printingPrep]);

  if (!draft) return null;
  const resultTarget = getSessionResultTarget(draft);
  const correctionMode = draft.correctionMode ?? "auto";
  const correctionLabel = getSessionCorrectionLabel(draft);
  const pageLabel = associatedPageLabel(draft);
  const pageHint = associatedPageHint(draft);
  const patch = (values: Partial<Session>) => setDraft({ ...draft, ...values });
  const updateFreePrep = (values: Partial<CustomSessionPrep>) =>
    setCustomPrep(updateCustomSessionPrep(draft.id, values));
  const assistantJournalContext: AiJournalContext = getAiJournalContext(draft);
  const assistantAnsweredCount = Object.values(assistantAnswers).filter(
    (answer) => (answer.freeText ?? "").trim().length > 0 || Boolean(answer.selectedSuggestion),
  ).length;

  function buildAssistantAnswersPayload() {
    return buildQuestionAnswersPayload(assistantClarification?.questions, assistantAnswers);
  }

  async function runAssistantClarification() {
    const activeDraft = draft;
    if (!activeDraft) return;
    setAssistantPlan(null);
    const payload = await runAssistantJson<{
      clarification?: ClarificationResponse;
      error?: string;
    }>(
      "/api/ai/session-plan",
      {
        action: "clarify",
        title: activeDraft.title,
        subjectKey: activeDraft.subject,
        subject: SUBJECTS[activeDraft.subject].label,
        duration: durationLabel(activeDraft.start, activeDraft.end),
        resourceId: activeDraft.resourceId,
        programmingItemId: activeDraft.programmingItemId,
        note: activeDraft.note ?? "",
        prompt: assistantPrompt.trim(),
        answers: buildAssistantAnswersPayload(),
        currentFormat: customPrep.recommendedFormat,
        pedagogicalRationale: customPrep.pedagogicalRationale,
        objective: customPrep.objective,
        competence: customPrep.competence,
        sequenceSessions: customPrep.sequenceSessions,
        evaluation: customPrep.evaluation,
        materialSuggestions: customPrep.materialSuggestions,
        photocopySuggestions: customPrep.photocopySuggestions,
        phases: customPhases,
        journalContext: assistantJournalContext,
      },
      "La préparation des questions n'a pas abouti.",
    );
    if (!payload?.clarification) return;

    setAssistantClarification(payload.clarification);
    setAssistantAnswers((current) => {
      const next = { ...current };
      for (const question of payload.clarification?.questions ?? []) {
        if (!next[question.id]) next[question.id] = {};
      }
      return next;
    });
  }

  async function generateSessionPlan() {
    const activeDraft = draft;
    if (!activeDraft) return;
    const defaultPrompt =
      "Propose une séance claire, réaliste et directement exploitable pour ce créneau.";
    const userPrompt = assistantPrompt.trim() || defaultPrompt;

    setAssistantTurns((current) => [...current, { role: "user", text: userPrompt }]);
    const payload = await runAssistantJson<{
      plan?: GeneratedSessionPlan;
      error?: string;
    }>(
      "/api/ai/session-plan",
      {
        action: "generate",
        title: activeDraft.title,
        subjectKey: activeDraft.subject,
        subject: SUBJECTS[activeDraft.subject].label,
        duration: durationLabel(activeDraft.start, activeDraft.end),
        resourceId: activeDraft.resourceId,
        programmingItemId: activeDraft.programmingItemId,
        note: activeDraft.note ?? "",
        prompt: userPrompt,
        answers: buildAssistantAnswersPayload(),
        currentFormat: customPrep.recommendedFormat,
        pedagogicalRationale: customPrep.pedagogicalRationale,
        objective: customPrep.objective,
        competence: customPrep.competence,
        sequenceSessions: customPrep.sequenceSessions,
        evaluation: customPrep.evaluation,
        materialSuggestions: customPrep.materialSuggestions,
        photocopySuggestions: customPrep.photocopySuggestions,
        phases: customPhases,
        journalContext: assistantJournalContext,
      },
      "La génération n'a pas abouti.",
    );
    if (!payload?.plan) return;
    const plan = payload.plan;

    setAssistantPlan(plan);
    setAssistantTurns((current) => [
      ...current,
      {
        role: "assistant",
        text:
          plan.recommendedFormat === "sequence"
            ? `Je recommande de penser ce travail comme une mini-séquence, avec une séance détaillée pour le créneau courant et ${plan.sequenceSessions.length} repères de progression.`
            : `Je recommande une séance simple, avec une fiche de prep complète et ${plan.phases.length} phases prêtes à injecter.`,
      },
    ]);
  }

  function handleAssistantPrimaryAction() {
    const hasPrompt = assistantPrompt.trim().length > 0;
    const hasAnswers = buildAssistantAnswersPayload().length > 0;
    if (!assistantClarification && !hasPrompt && !hasAnswers) {
      void runAssistantClarification();
      return;
    }
    void generateSessionPlan();
  }

  function applyAssistantPlan() {
    const activeDraft = draft;
    if (!assistantPlan || !activeDraft) return;
    setCustomPrep(
      saveCustomSessionPrep(activeDraft.id, {
        recommendedFormat: assistantPlan.recommendedFormat,
        pedagogicalRationale: assistantPlan.pedagogicalRationale,
        competence: assistantPlan.competence,
        objective: assistantPlan.objective,
        sequenceSessions: assistantPlan.sequenceSessions,
        evaluation: assistantPlan.evaluation,
        materialSuggestions: assistantPlan.materialSuggestions,
        photocopySuggestions: assistantPlan.photocopySuggestions,
      }),
    );
    setCustomPhases(saveCustomPhases(activeDraft.id, assistantPlan.phases));
    let nextExtras = extras;
    for (const item of assistantPlan.materialSuggestions) {
      if (!item || nextExtras.material.includes(item)) continue;
      addMaterial(activeDraft.id, item);
      nextExtras = getSessionExtras(activeDraft.id);
    }
    for (const item of assistantPlan.photocopySuggestions) {
      if (!item || nextExtras.photocopies.includes(item)) continue;
      addPhotocopy(activeDraft.id, item);
      nextExtras = getSessionExtras(activeDraft.id);
    }
    setExtras(nextExtras);
    setAssistantOpen(false);
    toast.success("Proposition injectée dans la séance.");
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        <span className={cn("h-1.5 w-full shrink-0", SUBJECT_BAND[draft.subject])} />

        <DialogHeader className="border-b border-border px-5 py-4 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-xs font-semibold",
                SUBJECT_BAND[draft.subject],
              )}
            >
              {SUBJECTS[draft.subject].label}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {draft.start} — {draft.end} · {durationLabel(draft.start, draft.end)}
            </span>
          </div>
          <DialogTitle className="sr-only">Modifier la séance</DialogTitle>
          <Input
            value={draft.title}
            onChange={(e) => patch({ title: e.target.value })}
            aria-label="Titre de la séance"
            className="mt-2 h-11 border-transparent bg-secondary text-lg font-semibold shadow-none transition-colors focus-visible:border-input focus-visible:bg-card"
          />
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {/* Créneau + matière : toujours visibles, compacts */}
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label="Début">
              <Input
                type="time"
                value={draft.start}
                onChange={(e) => patch({ start: e.target.value })}
              />
            </Field>
            <Field label="Fin">
              <Input
                type="time"
                value={draft.end}
                onChange={(e) => patch({ end: e.target.value })}
              />
            </Field>
            <Field label="Matière">
              <Select
                value={draft.subject}
                onValueChange={(v) => patch({ subject: v as SubjectKey })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECT_LIST.map((s) => (
                    <SelectItem key={s.key} value={s.key}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          {draft.exercisePlan?.length ? (
            <section className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Exercices et consignes du déroulé
              </p>
              <ol className="mt-2 space-y-2">
                {draft.exercisePlan.map((item) => (
                  <li key={item.id} className="rounded-lg bg-card/80 px-3 py-2">
                    <p className="text-xs font-semibold">
                      {item.page ? `p. ${item.page} · ` : ""}
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.instruction}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {/* Étape 1 · choix du type de séance */}
          {mode === "choice" ? (
            <div className="mt-5 animate-fade-in">
              <p className="eyebrow">Comment préparez-vous cette séance ?</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <ChoiceCard
                  icon={<Coffee className="h-5 w-5" />}
                  title="Séance libre"
                  description="Rituels, récréation, autonomie : aucune fiche de prep."
                  onClick={() => {
                    patch({ free: true, prepSheetId: undefined, resourceId: undefined });
                    setMode("free");
                  }}
                />
                <ChoiceCard
                  icon={<Layers className="h-5 w-5" />}
                  title="Ressource existante"
                  description="Méthode → séquence → séance, la fiche se remplit seule."
                  onClick={() => {
                    patch({ free: false });
                    setMode("resource");
                  }}
                />
              </div>
            </div>
          ) : null}

          {/* Étape 2a · séance libre */}
          {mode === "free" ? (
            <div className="mt-5 animate-fade-in space-y-3">
              <StepHeader
                label="Séance libre"
                onBack={() => {
                  patch({ free: false });
                  setMode("choice");
                }}
              />
              <section className="rounded-xl border border-border bg-card p-3.5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="eyebrow flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" />
                      Fiche de prep CE1
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Prépare la séance libre ici, ou demande à {ARDOISE_AI_NAME} la meilleure forme
                      de prep pour ce créneau.
                    </p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setAssistantOpen(true)}>
                    <Sparkles className="mr-1.5 h-4 w-4" />
                    {ARDOISE_AI_NAME}
                  </Button>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Compétence visée
                    </Label>
                    <Textarea
                      value={customPrep.competence}
                      onChange={(e) => updateFreePrep({ competence: e.target.value })}
                      placeholder="Ex. Produire un énoncé clair ; justifier une réponse ; raconter en respectant l'ordre chronologique…"
                      className="min-h-24 rounded-xl bg-card"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      Objectif de la séance
                    </Label>
                    <Textarea
                      value={customPrep.objective}
                      onChange={(e) => updateFreePrep({ objective: e.target.value })}
                      placeholder="Ex. Identifier les personnages d'un album ; comparer deux procédures ; réinvestir une notion travaillée…"
                      className="min-h-24 rounded-xl bg-card"
                    />
                  </div>
                </div>

                {customPrep.pedagogicalRationale ||
                customPrep.sequenceSessions.length > 0 ||
                customPrep.evaluation ? (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                      <p className="eyebrow">Format conseillé</p>
                      <p className="mt-1 text-sm font-semibold">
                        {customPrep.recommendedFormat === "sequence"
                          ? "Mini-séquence"
                          : "Séance simple"}
                      </p>
                      {customPrep.pedagogicalRationale ? (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {customPrep.pedagogicalRationale}
                        </p>
                      ) : null}
                    </div>
                    <div className="rounded-xl border border-border bg-secondary/20 p-3">
                      <p className="eyebrow">Évaluation prévue</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {customPrep.evaluation || "Aucune précision pour l'instant."}
                      </p>
                    </div>
                  </div>
                ) : null}

                {customPrep.sequenceSessions.length > 0 ? (
                  <div className="mt-3 rounded-xl border border-border bg-secondary/20 p-3">
                    <p className="eyebrow">Repères de séquence</p>
                    <ol className="mt-2 space-y-1.5">
                      {customPrep.sequenceSessions.map((step, index) => (
                        <li key={`${step}-${index}`} className="flex gap-2 text-sm leading-relaxed">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-card text-[0.68rem] font-semibold text-muted-foreground">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
              </section>
              <PhaseEditor sessionId={draft.id} phases={customPhases} onChange={setCustomPhases} />
              <div className="grid gap-3 sm:grid-cols-2">
                <EditableList
                  icon={<Wrench className="h-4 w-4" />}
                  title="Matériel"
                  items={extras.material}
                  onAdd={(v) => setExtras(addMaterial(draft.id, v))}
                  onRemove={(i) => setExtras(removeMaterial(draft.id, i))}
                />
                <EditableList
                  icon={<Printer className="h-4 w-4" />}
                  title="Photocopies"
                  items={extras.photocopies}
                  onAdd={(v) => setExtras(addPhotocopy(draft.id, v))}
                  onRemove={(i) => setExtras(removePhotocopy(draft.id, i))}
                />
              </div>
              <NoteField value={draft.note} onChange={(note) => patch({ note })} />
            </div>
          ) : null}

          {/* Étape 2b · ressource */}
          {mode === "resource" ? (
            <div className="mt-5 animate-fade-in space-y-3">
              {prep || resourceMatch ? (
                <>
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-secondary px-3 py-2">
                    <p className="flex min-w-0 items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 shrink-0" />
                      <span className="truncate">Fiche de prep rattachée</span>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="shrink-0 text-muted-foreground"
                      onClick={() => patch({ prepSheetId: undefined, resourceId: undefined })}
                    >
                      <Unlink className="mr-1.5 h-4 w-4" />
                      Changer
                    </Button>
                  </div>
                  <section className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Page associée
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">
                          {associatedNotebookLabel(correctionMode, draft.subject)} · {pageLabel}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">{pageHint}</p>
                        <p className="mt-1 text-[0.72rem] text-muted-foreground">
                          {correctionLabel}
                        </p>
                      </div>
                      {resultTarget ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAttachCorrection?.(draft)}
                        >
                          <ExternalLink className="mr-1.5 h-4 w-4" />
                          Ouvrir la page associée
                        </Button>
                      ) : null}
                    </div>
                  </section>
                  {prep ? (
                    <div className="max-h-[52vh] overflow-y-auto rounded-[28px] border border-border/70 bg-white/70 p-2 shadow-inner">
                      <PrepSheetView sheet={prep} sessionId={draft.id} printable={false} />
                    </div>
                  ) : resourceMatch ? (
                    <section className="rounded-xl border border-border bg-card p-3">
                      <p className="eyebrow">Ressource rattachée</p>
                      <p className="mt-1 text-sm font-semibold">{resourceMatch.session.label}</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {resourceMatch.method.label} · {resourceMatch.sequence.label}
                      </p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        La ressource suivante a bien été retrouvée automatiquement, mais la fiche
                        détaillée n'est pas encore intégrée dans Ardoise.
                      </p>
                    </section>
                  ) : null}
                  <NoteField value={draft.note} onChange={(note) => patch({ note })} />
                </>
              ) : (
                <>
                  <StepHeader label="Choisir une ressource" onBack={() => setMode("choice")} />
                  <div className="h-[22rem] rounded-xl border border-border bg-surface p-3">
                    <ResourcePicker
                      selectedResourceId={draft.resourceId}
                      onSelect={(res) => {
                        void (async () => {
                          const sheet = await loadPatchedPrepSheet(res.prepSheetId);
                          const programmingItemId = resourceToProgrammingItemId(res.id);
                          const nextCorrectionMode =
                            resourceToCorrectionMode(res.id, sheet?.subject ?? draft.subject) ??
                            "auto";
                          const nextExercisePlan = getExercisePlan(programmingItemId);
                          patch({
                            prepSheetId: res.prepSheetId,
                            resourceId: res.id,
                            programmingItemId,
                            exercisePlan: nextExercisePlan,
                            correctionMode: nextCorrectionMode,
                            correctionExerciseId:
                              nextCorrectionMode === "cleo" ||
                              nextCorrectionMode === "maths" ||
                              nextCorrectionMode === "dictation"
                                ? programmingItemId
                                : undefined,
                            title: sheet?.title ?? res.label,
                            subject: sheet?.subject ?? draft.subject,
                          });
                        })();
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          ) : null}
        </div>

        <Dialog open={assistantOpen} onOpenChange={setAssistantOpen}>
          <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>{ardoiseAiTitle("Fiche de prep")}</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Décris ce que tu veux travailler. {ARDOISE_AI_NAME} cherche la meilleure manière de
                préparer ce créneau pour un CE1 : séance simple ou mini-séquence, puis génère la
                fiche de prep correspondante.
              </p>
            </DialogHeader>

            <AssistantStepsCard
              title={`Comment ${ARDOISE_AI_NAME} prépare cette séance`}
              description="L'assistant croise la progression repérée, le cahier journal déjà rempli et tes précisions pour proposer une séance cohérente."
            />

            <AssistantContextDetails
              summary="Le créneau, la matière et les repères déjà présents sont transmis automatiquement pour éviter de repartir de zéro."
              leadItems={[
                { label: "Titre", value: draft.title },
                { label: "Matière", value: SUBJECTS[draft.subject].label },
                { label: "Horaire", value: `${draft.start} - ${draft.end}` },
                { label: "Durée", value: durationLabel(draft.start, draft.end) },
                ...(assistantResourceContext.methodLabel
                  ? [{ label: "Méthode", value: assistantResourceContext.methodLabel }]
                  : []),
                ...(assistantResourceContext.sequenceLabel
                  ? [{ label: "Repère", value: assistantResourceContext.sequenceLabel }]
                  : []),
              ]}
              sections={[
                {
                  label: "Progression repérée",
                  items: [
                    assistantResourceContext.matchReason,
                    ...(assistantResourceContext.currentSessionLabel
                      ? [`Séance la plus proche : ${assistantResourceContext.currentSessionLabel}`]
                      : []),
                  ],
                },
                {
                  label: "Avant dans les ressources",
                  items: assistantResourceContext.previousSessions,
                },
                {
                  label: "Après dans les ressources",
                  items: assistantResourceContext.nextSessions,
                },
                {
                  label: "Autres pistes proches",
                  items: assistantResourceContext.alternativeSessions,
                },
              ]}
            />

            <AssistantContextDetails
              summary={assistantJournalContext.matchReason}
              title="Voir le cahier journal déjà pris en compte"
              leadItems={[
                ...(assistantJournalContext.currentDayLabel
                  ? [{ label: "Journée repérée", value: assistantJournalContext.currentDayLabel }]
                  : []),
              ]}
              sections={[
                {
                  label: "Avant sur la journée",
                  items: assistantJournalContext.previousDaySessions,
                },
                {
                  label: "Après sur la journée",
                  items: assistantJournalContext.nextDaySessions,
                },
                {
                  label: "Déjà fait dans la matière",
                  items: assistantJournalContext.previousSameSubjectSessions,
                },
                {
                  label: "Ensuite dans la matière",
                  items: assistantJournalContext.nextSameSubjectSessions,
                },
                {
                  label: "Même ressource déjà rencontrée",
                  items: assistantJournalContext.previousSameResourceSessions,
                },
              ]}
            />

            <AssistantPromptBox
              label="Ajoute une précision si tu veux"
              helper="Tu peux écrire ton besoin directement, ou laisser Plume d'Ardoise te poser quelques questions rapides avant de générer."
              value={assistantPrompt}
              onChange={setAssistantPrompt}
              placeholder="Ex. Je veux une séance CE1 de 25 minutes sur la compréhension d'un album, avec oral d'abord puis petite trace écrite."
            />

            {assistantClarification ? (
              <AssistantClarificationPanel
                assistantName={ARDOISE_AI_NAME}
                intro={assistantClarification.intro}
                questions={assistantClarification.questions}
                answers={assistantAnswers}
                answeredCount={assistantAnsweredCount}
                onAnswerChange={(questionId, answer) =>
                  setAssistantAnswers((current) => ({
                    ...current,
                    [questionId]: answer,
                  }))
                }
              />
            ) : null}

            {assistantTurns.length > 0 ? (
              <section className="rounded-xl border border-border bg-card p-3">
                <p className="eyebrow">Dialogue</p>
                <div className="mt-3 space-y-2">
                  {assistantTurns.map((turn, index) => (
                    <div
                      key={`${turn.role}-${index}`}
                      className={cn(
                        "rounded-xl px-3 py-2 text-sm leading-relaxed",
                        turn.role === "user"
                          ? "bg-secondary text-foreground"
                          : "bg-primary/5 text-foreground",
                      )}
                    >
                      <p className="mb-1 text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                        {turn.role === "user" ? "Toi" : ARDOISE_AI_NAME}
                      </p>
                      <p>{turn.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {assistantError ? (
              <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {assistantError}
              </section>
            ) : null}

            {assistantPlan ? (
              <section className="space-y-3 rounded-xl border border-primary/20 bg-primary/5 p-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-card p-3">
                    <p className="eyebrow">Compétence</p>
                    <p className="mt-1 text-sm leading-relaxed">{assistantPlan.competence}</p>
                  </div>
                  <div className="rounded-xl bg-card p-3">
                    <p className="eyebrow">Objectif</p>
                    <p className="mt-1 text-sm leading-relaxed">{assistantPlan.objective}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl bg-card p-3">
                    <p className="eyebrow">Format conseillé</p>
                    <p className="mt-1 text-sm font-semibold">
                      {assistantPlan.recommendedFormat === "sequence"
                        ? "Mini-séquence"
                        : "Séance simple"}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {assistantPlan.pedagogicalRationale}
                    </p>
                  </div>
                  <div className="rounded-xl bg-card p-3">
                    <p className="eyebrow">Évaluation</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {assistantPlan.evaluation}
                    </p>
                  </div>
                </div>

                {assistantPlan.materialSuggestions.length > 0 ||
                assistantPlan.photocopySuggestions.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-card p-3">
                      <p className="eyebrow">Matériel suggéré</p>
                      {assistantPlan.materialSuggestions.length > 0 ? (
                        <ul className="mt-2 space-y-1.5">
                          {assistantPlan.materialSuggestions.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Aucun matériel spécifique.
                        </p>
                      )}
                    </div>
                    <div className="rounded-xl bg-card p-3">
                      <p className="eyebrow">Photocopies suggérées</p>
                      {assistantPlan.photocopySuggestions.length > 0 ? (
                        <ul className="mt-2 space-y-1.5">
                          {assistantPlan.photocopySuggestions.map((item) => (
                            <li key={item} className="flex gap-2 text-sm leading-relaxed">
                              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Aucune photocopie nécessaire.
                        </p>
                      )}
                    </div>
                  </div>
                ) : null}

                {assistantPlan.sequenceSessions.length > 0 ? (
                  <div className="rounded-xl bg-card p-3">
                    <p className="eyebrow">Organisation en séquence</p>
                    <ol className="mt-2 space-y-1.5">
                      {assistantPlan.sequenceSessions.map((step, index) => (
                        <li key={`${step}-${index}`} className="flex gap-2 text-sm leading-relaxed">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-[0.68rem] font-semibold text-muted-foreground">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}

                <div className="rounded-xl bg-card p-3">
                  <p className="eyebrow">Séance détaillée pour ce créneau</p>
                  <ol className="mt-3 space-y-2">
                    {assistantPlan.phases.map((phase, index) => (
                      <li
                        key={`${phase.title}-${index}`}
                        className="rounded-xl border border-border bg-secondary/25 p-3"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-[0.68rem] font-semibold text-primary-foreground">
                            {index + 1}
                          </span>
                          <p className="text-sm font-semibold">{phase.title}</p>
                          {phase.duration ? (
                            <span className="rounded-md bg-card px-2 py-0.5 font-mono text-[0.68rem] text-muted-foreground">
                              {phase.duration}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {phase.detail}
                        </p>
                        {phase.differentiation ? (
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                            <span className="font-semibold">Différenciation :</span>{" "}
                            {phase.differentiation}
                          </p>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            ) : null}

            <DialogFooter>
              <Button variant="ghost" onClick={() => setAssistantOpen(false)}>
                Fermer
              </Button>
              <Button
                variant="outline"
                onClick={runAssistantClarification}
                disabled={assistantBusy}
              >
                <Sparkles className="mr-1.5 h-4 w-4" />
                {assistantBusy ? "Préparation..." : "Questions utiles"}
              </Button>
              <Button onClick={handleAssistantPrimaryAction} disabled={assistantBusy}>
                <Sparkles className="mr-1.5 h-4 w-4" />
                {assistantBusy
                  ? "Génération…"
                  : assistantClarification
                    ? `Générer avec ${ARDOISE_AI_NAME}`
                    : assistantPlan
                      ? "Affiner la proposition"
                      : "Générer"}
              </Button>
              <Button onClick={applyAssistantPlan} disabled={!assistantPlan || assistantBusy}>
                Utiliser dans la séance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DialogFooter className="border-t border-border bg-card px-5 py-3">
          {onAttachCorrection ? (
            <Button
              variant="outline"
              className="mr-auto"
              disabled={!resultTarget}
              onClick={() => onAttachCorrection(draft)}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              {resultTarget?.label ?? correctionLabel}
            </Button>
          ) : null}
          {prep ? (
            <Button
              variant="outline"
              className={onAttachCorrection ? "" : "mr-auto"}
              onClick={() => setPrintingPrep(true)}
            >
              <Printer className="mr-2 h-4 w-4" />
              Fiche PDF
            </Button>
          ) : null}
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={() => onSave(draft)}>Enregistrer</Button>
        </DialogFooter>
        {printingPrep && prep ? (
          <div className="fixed -left-[9999px] top-0 w-[794px] print:static print:w-auto">
            <PrepSheetView sheet={prep} sessionId={draft.id} stickyHeader={false} />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function NoteField({ value, onChange }: { value?: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">Notes du jour</Label>
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Adaptations, absents, remarques pour demain…"
        className="min-h-24 w-full rounded-xl border border-input bg-card p-3 text-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
      />
    </div>
  );
}

function EditableList({
  icon,
  title,
  items,
  onAdd,
  onRemove,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
}) {
  const [draft, setDraft] = useState("");
  return (
    <section className="rounded-xl border border-border bg-card p-3.5">
      <h4 className="eyebrow flex items-center gap-1.5">
        {icon}
        {title}
      </h4>
      {items.length > 0 ? (
        <ul className="mt-2 space-y-1.5">
          {items.map((item, i) => (
            <li key={`${item}-${i}`} className="flex items-start gap-2 text-sm">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              <span className="min-w-0 flex-1 leading-relaxed">{item}</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="shrink-0 text-muted-foreground transition-colors hover:text-danger-strong"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <form
        className="mt-2 flex gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          const v = draft.trim();
          if (!v) return;
          onAdd(v);
          setDraft("");
        }}
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ajouter…"
          className="h-8 text-sm"
        />
        <Button type="submit" size="icon" variant="outline" className="h-8 w-8 shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </section>
  );
}

function PhaseEditor({
  sessionId,
  phases,
  onChange,
}: {
  sessionId: string;
  phases: CustomPhase[];
  onChange: (phases: CustomPhase[]) => void;
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-3.5">
      <div className="flex items-center justify-between gap-2">
        <h4 className="eyebrow flex items-center gap-1.5">
          <FileText className="h-4 w-4" />
          Déroulé
        </h4>
        {phases.length > 0 ? (
          <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
            {phases.length} phase{phases.length > 1 ? "s" : ""}
          </span>
        ) : null}
      </div>

      {phases.length > 0 ? (
        <ol className="mt-3 space-y-2.5">
          {phases.map((phase, i) => (
            <li
              key={i}
              className="rounded-xl border border-border bg-secondary/30 p-3 transition-colors duration-150 focus-within:border-primary/40 focus-within:bg-card"
            >
              <div className="flex items-center gap-2">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-card font-mono text-[0.7rem] font-semibold text-muted-foreground">
                  {i + 1}
                </span>
                <Input
                  value={phase.title}
                  onChange={(e) =>
                    onChange(updateCustomPhase(sessionId, i, { ...phase, title: e.target.value }))
                  }
                  placeholder="Nom de la phase"
                  className="h-8 min-w-0 flex-1 bg-card text-sm font-medium"
                />
                <Input
                  value={phase.duration ?? ""}
                  onChange={(e) =>
                    onChange(
                      updateCustomPhase(sessionId, i, { ...phase, duration: e.target.value }),
                    )
                  }
                  placeholder="Durée"
                  className="h-8 w-20 shrink-0 bg-card text-center font-mono text-xs"
                />
                <button
                  type="button"
                  onClick={() => onChange(removeCustomPhase(sessionId, i))}
                  aria-label={`Supprimer la phase ${i + 1}`}
                  className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-card hover:text-danger-strong"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-2.5 grid gap-2.5 pl-8">
                <div className="space-y-1">
                  <Label className="eyebrow">Activité</Label>
                  <textarea
                    value={phase.detail}
                    onChange={(e) =>
                      onChange(
                        updateCustomPhase(sessionId, i, { ...phase, detail: e.target.value }),
                      )
                    }
                    placeholder="Ce que font les élèves, consignes, organisation…"
                    className="min-h-16 w-full rounded-lg border border-input bg-card p-2.5 text-sm leading-relaxed outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="eyebrow">Différenciation</Label>
                  <textarea
                    value={phase.differentiation ?? ""}
                    onChange={(e) =>
                      onChange(
                        updateCustomPhase(sessionId, i, {
                          ...phase,
                          differentiation: e.target.value,
                        }),
                      )
                    }
                    placeholder="Aide, adaptation, prolongement…"
                    className="min-h-12 w-full rounded-lg border border-dashed border-input bg-card p-2.5 text-sm leading-relaxed outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="mt-2 text-xs text-muted-foreground">
          Aucune phase pour l'instant — structurez la séance étape par étape.
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3 h-8 w-full text-sm"
        onClick={() =>
          onChange(
            addCustomPhase(sessionId, { title: "", detail: "", duration: "", differentiation: "" }),
          )
        }
      >
        <Plus className="mr-1.5 h-4 w-4" />
        Ajouter une phase
      </Button>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
