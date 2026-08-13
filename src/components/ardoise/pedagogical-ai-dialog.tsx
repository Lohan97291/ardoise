import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AssistantClarificationPanel,
  AssistantContextDetails,
  AssistantPromptBox,
  AssistantStepsCard,
  type AssistantContextSection,
  type AssistantQuestionAnswer,
} from "@/components/ardoise/ai-assistant-panels";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ARDOISE_AI_NAME, ardoiseAiShortIntro } from "@/lib/ardoise-ai-brand";
import { buildQuestionAnswersPayload } from "@/lib/ai-client";
import { cn } from "@/lib/utils";
import { useAiRequest } from "@/hooks/use-ai-request";

export type PedagogicalAssistantMode = "remediation" | "sequence" | "timetable" | "homework";

type PedagogicalRequest = {
  title?: string;
  subject?: string;
  promptHint?: string;
  contextSections: AssistantContextSection[];
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

type PedagogicalResponse = {
  headline: string;
  summary: string;
  recommendations: string[];
  vigilancePoints: string[];
  nextSteps: string[];
  artifacts: Array<{
    title: string;
    items: string[];
  }>;
};

const MODE_META: Record<
  PedagogicalAssistantMode,
  { label: string; description: string; placeholder: string }
> = {
  remediation: {
    label: "Remédiations",
    description: "Trouver des pistes d'aide concrètes à partir des difficultés observées.",
    placeholder:
      "Ex. Propose-moi des idées de reprise très concrètes pour ces élèves, en petits groupes et en autonomie.",
  },
  sequence: {
    label: "Séquence",
    description: "Générer une séquence structurée à ajouter ensuite dans les ressources.",
    placeholder:
      "Ex. Génère une mini-séquence CE1 claire et réaliste, avec 4 ou 5 séances et une évaluation simple.",
  },
  timetable: {
    label: "Emploi du temps",
    description: "Aider à organiser la semaine selon les contraintes et les volumes.",
    placeholder:
      "Ex. Propose une organisation plus équilibrée sans casser les méthodes déjà imposées.",
  },
  homework: {
    label: "Devoirs",
    description: "Proposer des devoirs courts et cohérents avec ce qui est travaillé en classe.",
    placeholder:
      "Ex. Propose des devoirs utiles pour ce soir, très courts, et une variante plus facile si besoin.",
  },
};

function SectionList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </p>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-55" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PedagogicalAiDialog({
  title = ARDOISE_AI_NAME,
  description = ardoiseAiShortIntro(),
  triggerLabel = ARDOISE_AI_NAME,
  initialMode,
  modes,
  buildRequest,
  className,
}: {
  title?: string;
  description?: string;
  triggerLabel?: string;
  initialMode?: PedagogicalAssistantMode;
  modes: PedagogicalAssistantMode[];
  buildRequest: (mode: PedagogicalAssistantMode) => PedagogicalRequest;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<PedagogicalAssistantMode>(initialMode ?? modes[0]!);
  const [prompt, setPrompt] = useState("");
  const [clarification, setClarification] = useState<ClarificationResponse | null>(null);
  const [answers, setAnswers] = useState<Record<string, AssistantQuestionAnswer>>({});
  const [response, setResponse] = useState<PedagogicalResponse | null>(null);
  const { busy, error, clearError, runJson } = useAiRequest(
    `Impossible de lancer ${ARDOISE_AI_NAME} pour le moment.`,
  );

  const request = useMemo(() => buildRequest(mode), [buildRequest, mode]);
  const modeMeta = MODE_META[mode];
  const answeredCount = useMemo(
    () =>
      Object.values(answers).filter(
        (answer) => (answer.freeText ?? "").trim().length > 0 || Boolean(answer.selectedSuggestion),
      ).length,
    [answers],
  );

  function buildAnswersPayload() {
    return buildQuestionAnswersPayload(clarification?.questions, answers);
  }

  async function runClarification() {
    setResponse(null);
    const payload = await runJson<{
      clarification?: ClarificationResponse;
      error?: string;
    }>(
      "/api/ai/pedagogical-assistant",
      {
        action: "clarify",
        mode,
        title: request.title,
        subject: request.subject,
        prompt: prompt.trim(),
        answers: buildAnswersPayload(),
        contextSections: request.contextSections,
      },
      "La préparation des questions n'a pas abouti.",
    );
    if (!payload?.clarification) return;

    setClarification(payload.clarification);
    setAnswers((current) => {
      const next = { ...current };
      for (const question of payload.clarification?.questions ?? []) {
        if (!next[question.id]) next[question.id] = {};
      }
      return next;
    });
  }

  async function runAssistant() {
    const payload = await runJson<{
      advice?: PedagogicalResponse;
      error?: string;
    }>(
      "/api/ai/pedagogical-assistant",
      {
        action: "generate",
        mode,
        title: request.title,
        subject: request.subject,
        prompt: prompt.trim(),
        answers: buildAnswersPayload(),
        contextSections: request.contextSections,
      },
      "La génération n'a pas abouti.",
    );
    if (!payload?.advice) return;
    setResponse(payload.advice);
  }

  function resetAssistantState(nextMode?: PedagogicalAssistantMode) {
    if (nextMode) setMode(nextMode);
    clearError();
    setClarification(null);
    setAnswers({});
    setResponse(null);
  }

  function handlePrimaryAction() {
    const hasPrompt = prompt.trim().length > 0;
    const hasAnswers = buildAnswersPayload().length > 0;
    if (!clarification && !hasPrompt && !hasAnswers) {
      void runClarification();
      return;
    }
    void runAssistant();
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn("rounded-xl", className)}
        onClick={() => setOpen(true)}
      >
        <Sparkles className="mr-1.5 h-4 w-4" />
        {triggerLabel}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {title}
            </DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <AssistantStepsCard
            title={`Comment ${ARDOISE_AI_NAME} va t'aider`}
            description="Tu peux écrire une demande précise, ou laisser l'assistant t'aider à cadrer rapidement avec quelques bonnes questions."
          />

          <section className="rounded-2xl border border-border bg-secondary/25 p-4">
            <div className="grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:items-start">
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Type d'aide</Label>
                <Select
                  value={mode}
                  onValueChange={(value) => {
                    resetAssistantState(value as PedagogicalAssistantMode);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {modes.map((item) => (
                      <SelectItem key={item} value={item}>
                        {MODE_META[item].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-xl border border-border bg-card p-3">
                <p className="text-sm font-semibold">{modeMeta.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {modeMeta.description}
                </p>
              </div>
            </div>
          </section>

          <AssistantContextDetails
            summary="L'assistant utilise le point de départ, le domaine choisi et les éléments déjà présents dans Ardoise pour éviter de proposer quelque chose hors sujet."
            leadItems={[
              ...(request.title ? [{ label: "Point de départ", value: request.title }] : []),
              ...(request.subject ? [{ label: "Domaine", value: request.subject }] : []),
            ]}
            sections={request.contextSections}
          />

          <AssistantPromptBox
            label="Ajoute une précision si tu veux"
            helper="Tu peux écrire directement ton besoin, ou laisser Plume d'Ardoise te guider avec quelques questions utiles."
            value={prompt}
            onChange={setPrompt}
            placeholder={request.promptHint || modeMeta.placeholder}
          />

          {clarification ? (
            <AssistantClarificationPanel
              assistantName={ARDOISE_AI_NAME}
              intro={clarification.intro}
              questions={clarification.questions}
              answers={answers}
              answeredCount={answeredCount}
              onAnswerChange={(questionId, answer) =>
                setAnswers((current) => ({
                  ...current,
                  [questionId]: answer,
                }))
              }
            />
          ) : null}

          {error ? (
            <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </section>
          ) : null}

          {response ? (
            <section className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
              <div className="rounded-xl bg-card p-4">
                <p className="text-base font-semibold">{response.headline}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {response.summary}
                </p>
              </div>

              <SectionList title="Pistes proposées" items={response.recommendations} />
              <SectionList title="Points de vigilance" items={response.vigilancePoints} />

              {response.artifacts.length > 0 ? (
                <div className="grid gap-3">
                  {response.artifacts.map((artifact) => (
                    <SectionList
                      key={artifact.title}
                      title={artifact.title}
                      items={artifact.items}
                    />
                  ))}
                </div>
              ) : null}

              <SectionList title="Suite conseillée" items={response.nextSteps} />
            </section>
          ) : null}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Fermer
            </Button>
            <Button type="button" variant="outline" onClick={runClarification} disabled={busy}>
              <Sparkles className="mr-1.5 h-4 w-4" />
              {busy ? "Préparation..." : "Questions utiles"}
            </Button>
            <Button type="button" onClick={handlePrimaryAction} disabled={busy}>
              <Sparkles className="mr-1.5 h-4 w-4" />
              {busy
                ? "Génération..."
                : clarification
                  ? `Générer avec ${ARDOISE_AI_NAME}`
                  : `Lancer ${ARDOISE_AI_NAME}`}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
