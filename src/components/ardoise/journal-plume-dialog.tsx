import { CalendarRange, FileText, LibraryBig, Plus, Sparkles, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import {
  AssistantClarificationPanel,
  AssistantContextDetails,
  AssistantPromptBox,
  AssistantStepsCard,
  type AssistantQuestionAnswer,
} from "@/components/ardoise/ai-assistant-panels";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ARDOISE_AI_NAME, ardoiseAiTitle } from "@/lib/ardoise-ai-brand";
import { buildQuestionAnswersPayload } from "@/lib/ai-client";
import { SUBJECTS, type Session, type SubjectKey } from "@/lib/ardoise-data";
import { getPedagogicalOptions } from "@/lib/pedagogical-options";
import type {
  PlumeClarification,
  PlumeEditableJournalSlot,
  PlumeJournalDayPlan,
  PlumePlanResponse,
  PlumeSequencePlan,
  PlumeSessionPlan,
  PlumeTarget,
} from "@/lib/plume-journal-types";
import { cn } from "@/lib/utils";
import { useAiRequest } from "@/hooks/use-ai-request";

const TARGET_META: Record<
  PlumeTarget,
  {
    label: string;
    description: string;
    icon: typeof FileText;
  }
> = {
  session: {
    label: "Une séance",
    description: "Préparer une seule séance claire, prête à ranger dans Ressources.",
    icon: FileText,
  },
  sequence: {
    label: "Une séquence",
    description: "Construire toute une progression, avec plusieurs séances prêtes à classer.",
    icon: LibraryBig,
  },
  journal_day: {
    label: "Une journée détaillée",
    description: "Transformer la journée affichée en vrai cahier journal détaillé.",
    icon: CalendarRange,
  },
};

const SUBJECT_CHOICES: SubjectKey[] = [
  "francais",
  "maths",
  "qlm",
  "emc",
  "eps",
  "arts",
  "lve",
  "rituels",
];

const DURATION_CHOICES = ["20 min", "30 min", "35 min", "45 min", "60 min"] as const;
const SEQUENCE_COUNT_CHOICES = ["3", "4", "5", "6"] as const;

function cloneSessionsForDialog(sessions: Session[]): PlumeEditableJournalSlot[] {
  if (sessions.length === 0) {
    return [
      {
        start: "08:30",
        end: "09:00",
        title: "",
        subjectKey: "francais",
        note: "",
      },
    ];
  }

  return sessions.map((session) => ({
    start: session.start,
    end: session.end,
    title: session.title,
    subjectKey: session.subject,
    note: session.note ?? "",
  }));
}

function createEmptySlot(): PlumeEditableJournalSlot {
  return {
    start: "08:30",
    end: "09:00",
    title: "",
    subjectKey: "francais",
    note: "",
  };
}

export function JournalPlumeDialog({
  dateLabel,
  sessions,
  onSaveSequence,
  onSaveSession,
  onInsertSession,
  onApplyJournalDay,
}: {
  dateLabel: string;
  sessions: Session[];
  onSaveSequence: (plan: PlumeSequencePlan) => void;
  onSaveSession: (plan: PlumeSessionPlan) => void;
  onInsertSession: (plan: PlumeSessionPlan) => void;
  onApplyJournalDay: (plan: PlumeJournalDayPlan) => void;
}) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<PlumeTarget | null>(null);
  const [subjectKey, setSubjectKey] = useState<SubjectKey>("francais");
  const [dayFocusSubjectKey, setDayFocusSubjectKey] = useState<SubjectKey | "">("");
  const [frameTitle, setFrameTitle] = useState("");
  const [domainLabel, setDomainLabel] = useState("");
  const [subDomainLabel, setSubDomainLabel] = useState("");
  const [learningObjective, setLearningObjective] = useState("");
  const [sessionCount, setSessionCount] = useState<string>("4");
  const [durationChoice, setDurationChoice] = useState<string>("45 min");
  const [preserveSchedule, setPreserveSchedule] = useState(true);
  const [draftSessions, setDraftSessions] = useState<PlumeEditableJournalSlot[]>(
    cloneSessionsForDialog(sessions),
  );
  const [prompt, setPrompt] = useState("");
  const [clarification, setClarification] = useState<PlumeClarification | null>(null);
  const [answers, setAnswers] = useState<Record<string, AssistantQuestionAnswer>>({});
  const [plan, setPlan] = useState<PlumePlanResponse | null>(null);
  const { busy, error, clearError, runJson } = useAiRequest(
    `Impossible de lancer ${ARDOISE_AI_NAME} pour le moment.`,
  );

  const answeredCount = useMemo(
    () =>
      Object.values(answers).filter(
        (answer) => (answer.freeText ?? "").trim().length > 0 || Boolean(answer.selectedSuggestion),
      ).length,
    [answers],
  );

  const activeSubjectKey: SubjectKey | "" =
    target === "journal_day" ? dayFocusSubjectKey : subjectKey;

  const domainOptions = useMemo(() => getPedagogicalOptions(activeSubjectKey), [activeSubjectKey]);

  const selectedDomain = useMemo(
    () => domainOptions.find((option) => option.label === domainLabel) ?? null,
    [domainLabel, domainOptions],
  );

  const contextSessions =
    target === "journal_day" ? draftSessions : cloneSessionsForDialog(sessions);

  function resetDialog() {
    setTarget(null);
    setSubjectKey("francais");
    setDayFocusSubjectKey("");
    setFrameTitle("");
    setDomainLabel("");
    setSubDomainLabel("");
    setLearningObjective("");
    setSessionCount("4");
    setDurationChoice("45 min");
    setPreserveSchedule(true);
    setDraftSessions(cloneSessionsForDialog(sessions));
    setPrompt("");
    clearError();
    setClarification(null);
    setAnswers({});
    setPlan(null);
  }

  function resetForTarget(nextTarget: PlumeTarget) {
    setTarget(nextTarget);
    clearError();
    setClarification(null);
    setAnswers({});
    setPlan(null);
    setFrameTitle("");
    setDomainLabel("");
    setSubDomainLabel("");
    setLearningObjective("");
    setPrompt("");
    setSessionCount(nextTarget === "sequence" ? "4" : "1");
    setDurationChoice(nextTarget === "session" ? "30 min" : "45 min");
    setPreserveSchedule(true);
    setDraftSessions(cloneSessionsForDialog(sessions));
    setDayFocusSubjectKey("");
  }

  function buildAnswersPayload() {
    return buildQuestionAnswersPayload(clarification?.questions, answers);
  }

  function buildFramePayload() {
    return {
      title: frameTitle.trim() || undefined,
      level: "CE1",
      discipline: activeSubjectKey ? SUBJECTS[activeSubjectKey].label : undefined,
      domain: domainLabel || undefined,
      subDomain: subDomainLabel || undefined,
      learningObjective: learningObjective.trim() || undefined,
      sessionCount: target === "sequence" ? sessionCount : undefined,
      duration: target === "journal_day" ? undefined : durationChoice,
      preserveSchedule: target === "journal_day" ? preserveSchedule : undefined,
    };
  }

  async function runClarification() {
    if (!target) return;
    setPlan(null);
    const payload = await runJson<{
      clarification?: PlumeClarification;
      error?: string;
    }>(
      "/api/ai/plume-journal",
      {
        action: "clarify",
        target,
        dateLabel,
        subjectKey: target === "journal_day" ? undefined : subjectKey,
        frame: buildFramePayload(),
        prompt: prompt.trim(),
        answers: buildAnswersPayload(),
        existingSessions: sessions.map((session) => ({
          start: session.start,
          end: session.end,
          title: session.title,
          subject: SUBJECTS[session.subject].label,
          note: session.note ?? "",
        })),
        editableSessions:
          target === "journal_day"
            ? draftSessions.map((session) => ({
                start: session.start,
                end: session.end,
                title: session.title,
                subjectKey: session.subjectKey,
                note: session.note,
              }))
            : undefined,
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

  async function runGeneration() {
    if (!target) return;
    const payload = await runJson<{
      plan?: PlumePlanResponse;
      error?: string;
    }>(
      "/api/ai/plume-journal",
      {
        action: "generate",
        target,
        dateLabel,
        subjectKey: target === "journal_day" ? undefined : subjectKey,
        frame: buildFramePayload(),
        prompt: prompt.trim(),
        answers: buildAnswersPayload(),
        existingSessions: sessions.map((session) => ({
          start: session.start,
          end: session.end,
          title: session.title,
          subject: SUBJECTS[session.subject].label,
          note: session.note ?? "",
        })),
        editableSessions:
          target === "journal_day"
            ? draftSessions.map((session) => ({
                start: session.start,
                end: session.end,
                title: session.title,
                subjectKey: session.subjectKey,
                note: session.note,
              }))
            : undefined,
      },
      "La génération n'a pas abouti.",
    );
    if (!payload?.plan) return;
    setPlan(payload.plan);
  }

  function handlePrimaryAction() {
    if (!target) return;
    void runGeneration();
  }

  function updateDraftSession(index: number, patch: Partial<PlumeEditableJournalSlot>) {
    setDraftSessions((current) =>
      current.map((session, sessionIndex) =>
        sessionIndex === index ? { ...session, ...patch } : session,
      ),
    );
  }

  function removeDraftSession(index: number) {
    setDraftSessions((current) => {
      if (current.length <= 1) return current;
      return current.filter((_, sessionIndex) => sessionIndex !== index);
    });
  }

  const targetMeta = target ? TARGET_META[target] : null;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-9 rounded-full border-primary/20 bg-card/80 px-3 text-sm font-medium text-primary shadow-sm transition-all hover:border-primary/35 hover:bg-primary/5 hover:text-primary"
        onClick={() => {
          resetDialog();
          setOpen(true);
        }}
      >
        <Sparkles className="mr-1.5 h-3.5 w-3.5" />
        Plume
      </Button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
          if (!nextOpen) resetDialog();
        }}
      >
        <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {ardoiseAiTitle("Cahier journal")}
            </DialogTitle>
            <DialogDescription>
              Tu peux partir d'une demande simple, ou cadrer précisément ta génération comme dans un
              vrai formulaire pédagogique.
            </DialogDescription>
          </DialogHeader>

          {!target ? (
            <>
              <AssistantStepsCard
                title={`Choisis ce que ${ARDOISE_AI_NAME} doit préparer`}
                description="Tu choisis d'abord le bon type de production. Ensuite, tu peux cadrer précisément la demande avant de lancer la génération."
              />

              <section className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Que veux-tu fabriquer ?
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {(Object.keys(TARGET_META) as PlumeTarget[]).map((item) => {
                    const meta = TARGET_META[item];
                    const Icon = meta.icon;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => resetForTarget(item)}
                        className="rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-secondary/30"
                      >
                        <Icon className="h-4 w-4 text-primary" />
                        <p className="mt-3 text-sm font-semibold">{meta.label}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {meta.description}
                        </p>
                        <p className="mt-3 text-xs text-primary">
                          {item === "journal_day"
                            ? "Je retravaille ma journée"
                            : item === "sequence"
                              ? "Je cadre une progression"
                              : "Je prépare une séance libre"}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              <div className="flex justify-end">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Fermer
                </Button>
              </div>
            </>
          ) : (
            <>
              <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                      Demande en cours
                    </p>
                    <p className="mt-1 text-base font-semibold">{targetMeta?.label}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {target === "journal_day"
                        ? `Tu peux retoucher la trame du ${dateLabel} avant de demander à Plume une vraie journée détaillée.`
                        : target === "sequence"
                          ? "Tu peux préciser la discipline, le domaine, le sous-domaine et l'objectif avant de lancer la séquence."
                          : "Tu peux cadrer finement la séance avant de la transformer en séance libre préremplie ou en ressource."}
                    </p>
                  </div>
                  <Button type="button" variant="outline" onClick={resetDialog}>
                    Changer de demande
                  </Button>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-card p-4">
                <p className="text-lg font-semibold">Décris ton besoin pédagogique</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tu peux rester simple, ou aller plus loin pour orienter précisément la génération.
                </p>

                <div className="mt-4 space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-muted-foreground">
                      {target === "sequence"
                        ? "Titre de la séquence"
                        : target === "session"
                          ? "Titre de la séance"
                          : "Intention de la journée"}
                    </Label>
                    <Input
                      value={frameTitle}
                      onChange={(event) => setFrameTitle(event.target.value)}
                      placeholder={
                        target === "sequence"
                          ? "Ex. Décrire un personnage à partir d'un album"
                          : target === "session"
                            ? "Ex. Synonymes et nuances de sens"
                            : "Ex. Journée plus équilibrée avec priorité au français"
                      }
                    />
                  </div>

                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <div className="space-y-4 rounded-2xl border border-border bg-secondary/15 p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Niveau
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                          CE1
                        </span>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            {target === "journal_day" ? "Dominante de la journée" : "Discipline"}
                          </Label>
                          {target === "journal_day" ? (
                            <Select
                              value={dayFocusSubjectKey || "__none"}
                              onValueChange={(value) => {
                                const nextValue = value === "__none" ? "" : (value as SubjectKey);
                                setDayFocusSubjectKey(nextValue);
                                setDomainLabel("");
                                setSubDomainLabel("");
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Aucune dominante imposée" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="__none">Aucune dominante imposée</SelectItem>
                                {SUBJECT_CHOICES.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {SUBJECTS[item].label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Select
                              value={subjectKey}
                              onValueChange={(value) => {
                                setSubjectKey(value as SubjectKey);
                                setDomainLabel("");
                                setSubDomainLabel("");
                              }}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SUBJECT_CHOICES.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {SUBJECTS[item].label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Domaine
                          </Label>
                          <Select
                            value={domainLabel || "__none"}
                            onValueChange={(value) => {
                              setDomainLabel(value === "__none" ? "" : value);
                              setSubDomainLabel("");
                            }}
                            disabled={domainOptions.length === 0}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un domaine" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none">Non précisé</SelectItem>
                              {domainOptions.map((option) => (
                                <SelectItem key={option.label} value={option.label}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Sous-domaine
                          </Label>
                          <Select
                            value={subDomainLabel || "__none"}
                            onValueChange={(value) =>
                              setSubDomainLabel(value === "__none" ? "" : value)
                            }
                            disabled={!selectedDomain}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir un sous-domaine" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="__none">Non précisé</SelectItem>
                              {(selectedDomain?.subDomains ?? []).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {target === "sequence" ? (
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Nombre de séances
                            </Label>
                            <Select value={sessionCount} onValueChange={setSessionCount}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SEQUENCE_COUNT_CHOICES.map((choice) => (
                                  <SelectItem key={choice} value={choice}>
                                    {choice} séances
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Durée repère
                            </Label>
                            <Select value={durationChoice} onValueChange={setDurationChoice}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {DURATION_CHOICES.map((choice) => (
                                  <SelectItem key={choice} value={choice}>
                                    {choice}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>

                      {target === "sequence" ? (
                        <div className="space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Durée moyenne des séances
                          </Label>
                          <Select value={durationChoice} onValueChange={setDurationChoice}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DURATION_CHOICES.map((choice) => (
                                <SelectItem key={choice} value={choice}>
                                  {choice}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      ) : null}
                    </div>

                    <div className="space-y-3 rounded-2xl border border-border bg-secondary/15 p-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">
                          Objectif d'apprentissage
                        </Label>
                        <Input
                          value={learningObjective}
                          onChange={(event) => setLearningObjective(event.target.value)}
                          placeholder="Ex. Produire un court texte descriptif avec aide"
                        />
                      </div>

                      {selectedDomain?.objectives?.length ? (
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Idées rapides
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {selectedDomain.objectives.map((objective) => (
                              <button
                                key={objective}
                                type="button"
                                onClick={() => setLearningObjective(objective)}
                                className={cn(
                                  "rounded-full border px-3 py-1.5 text-left text-xs transition-colors",
                                  learningObjective === objective
                                    ? "border-primary/30 bg-primary/10 text-primary"
                                    : "border-border bg-card text-foreground hover:bg-secondary/40",
                                )}
                              >
                                {objective}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="rounded-xl border border-dashed border-border bg-card px-3 py-3 text-sm text-muted-foreground">
                          Choisis d'abord une discipline puis un domaine si tu veux des repères plus
                          fins.
                        </div>
                      )}

                      {target === "journal_day" ? (
                        <label className="flex items-start gap-3 rounded-xl border border-border bg-card px-3 py-3">
                          <Checkbox
                            checked={preserveSchedule}
                            onCheckedChange={(checked) => setPreserveSchedule(Boolean(checked))}
                          />
                          <div>
                            <p className="text-sm font-medium">Conserver les horaires déjà posés</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              Décoche si tu veux laisser plus de liberté à Plume pour réorganiser la
                              journée.
                            </p>
                          </div>
                        </label>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>

              {target === "journal_day" ? (
                <section className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold">Trame du jour à retravailler</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Tu peux modifier les créneaux pris en compte avant de lancer la journée
                        détaillée.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDraftSessions((current) => [...current, createEmptySlot()])}
                    >
                      <Plus className="mr-1.5 h-4 w-4" />
                      Ajouter un créneau
                    </Button>
                  </div>

                  <div className="mt-4 space-y-3">
                    {draftSessions.map((session, index) => (
                      <section
                        key={`${index}-${session.start}-${session.title}`}
                        className="rounded-2xl border border-border bg-secondary/15 p-4"
                      >
                        <div className="grid gap-3 lg:grid-cols-[120px_120px_minmax(0,1.3fr)_minmax(0,1fr)_44px]">
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Début
                            </Label>
                            <Input
                              type="time"
                              value={session.start}
                              onChange={(event) =>
                                updateDraftSession(index, { start: event.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">Fin</Label>
                            <Input
                              type="time"
                              value={session.end}
                              onChange={(event) =>
                                updateDraftSession(index, { end: event.target.value })
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Séance / créneau
                            </Label>
                            <Input
                              value={session.title}
                              onChange={(event) =>
                                updateDraftSession(index, { title: event.target.value })
                              }
                              placeholder="Ex. Lecture compréhension"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-muted-foreground">
                              Domaine
                            </Label>
                            <Select
                              value={session.subjectKey}
                              onValueChange={(value) =>
                                updateDraftSession(index, { subjectKey: value as SubjectKey })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {SUBJECT_CHOICES.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {SUBJECTS[item].label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-end">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeDraftSession(index)}
                              disabled={draftSessions.length <= 1}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="mt-3 space-y-1.5">
                          <Label className="text-xs font-medium text-muted-foreground">
                            Note ou contrainte
                          </Label>
                          <Input
                            value={session.note}
                            onChange={(event) =>
                              updateDraftSession(index, { note: event.target.value })
                            }
                            placeholder="Ex. séance courte, matériel prêt, prolongement album, évaluation…"
                          />
                        </div>
                      </section>
                    ))}
                  </div>
                </section>
              ) : null}

              <AssistantContextDetails
                summary={
                  contextSessions.length === 0
                    ? "Aucun créneau n'est encore pris en compte."
                    : `${contextSessions.length} créneau(x) serviront de base à ${ARDOISE_AI_NAME}.`
                }
                title="Voir ce que Plume prend déjà en compte"
                leadItems={[
                  { label: "Journée", value: dateLabel },
                  { label: "Sortie demandée", value: targetMeta?.label ?? "" },
                  ...(activeSubjectKey
                    ? [{ label: "Discipline", value: SUBJECTS[activeSubjectKey].label }]
                    : []),
                  ...(domainLabel ? [{ label: "Domaine fin", value: domainLabel }] : []),
                ]}
                sections={[
                  {
                    label:
                      target === "journal_day" ? "Créneaux à retravailler" : "Séances déjà placées",
                    items: contextSessions.map(
                      (session) =>
                        `${session.start} · ${session.title || "Créneau à nommer"} · ${
                          SUBJECTS[session.subjectKey].label
                        }${session.note ? ` · ${session.note}` : ""}`,
                    ),
                  },
                ]}
              />

              <AssistantPromptBox
                label="Instructions, projet ou contraintes"
                helper={
                  target === "journal_day"
                    ? "Tu peux préciser ici un projet d'album, un équilibre souhaité, un besoin de respiration dans la journée ou une contrainte particulière."
                    : target === "sequence"
                      ? "Tu peux préciser le support, la méthode, la progression voulue, le matériel, ou le lien avec ce qui a déjà été fait."
                      : "Tu peux préciser la manière de mener la séance, le type d'étayage, la place de l'oral, la trace écrite ou le matériel."
                }
                value={prompt}
                onChange={setPrompt}
                placeholder={
                  target === "sequence"
                    ? "Ex. À partir d'un album, avec 4 séances, une place importante pour l'oral et une production finale courte."
                    : target === "session"
                      ? "Ex. Je veux une séance très guidée, avec manipulation puis mise en commun et trace écrite courte."
                      : "Ex. Je veux une journée plus équilibrée, sans trop de blocs lourds à la suite, en gardant l'album de l'après-midi."
                }
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

              {plan ? (
                <section className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
                  <div className="rounded-xl bg-card p-4">
                    <p className="text-base font-semibold">{plan.headline}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {plan.summary}
                    </p>
                  </div>

                  {plan.target === "sequence" ? (
                    <>
                      <section className="rounded-xl bg-card p-4">
                        <p className="eyebrow">Séquence générée</p>
                        <p className="mt-1 text-sm font-semibold">{plan.sequenceTitle}</p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {plan.pedagogicalFocus}
                        </p>
                      </section>
                      <section className="rounded-xl bg-card p-4">
                        <p className="eyebrow">Séances prévues</p>
                        <ol className="mt-2 space-y-2">
                          {plan.sessions.map((session, index) => (
                            <li
                              key={`${session.title}-${index}`}
                              className="rounded-xl border border-border bg-secondary/25 p-3"
                            >
                              <p className="text-sm font-semibold">
                                {index + 1}. {session.title}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {session.duration}
                              </p>
                              <p className="mt-2 text-sm text-muted-foreground">
                                {session.objective}
                              </p>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-4 flex justify-end">
                          <Button
                            onClick={() => {
                              onSaveSequence(plan);
                              setOpen(false);
                            }}
                          >
                            Ranger dans Ressources
                          </Button>
                        </div>
                      </section>
                    </>
                  ) : null}

                  {plan.target === "session" ? (
                    <>
                      <section className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-card p-4">
                          <p className="eyebrow">Séance générée</p>
                          <p className="mt-1 text-sm font-semibold">{plan.session.title}</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {plan.session.duration}
                          </p>
                        </div>
                        <div className="rounded-xl bg-card p-4">
                          <p className="eyebrow">Objectif</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {plan.session.objective}
                          </p>
                        </div>
                      </section>
                      <section className="rounded-xl bg-card p-4">
                        <p className="eyebrow">Déroulé</p>
                        <ol className="mt-2 space-y-2">
                          {plan.session.phases.map((phase, index) => (
                            <li
                              key={`${phase.title}-${index}`}
                              className="rounded-xl border border-border bg-secondary/25 p-3"
                            >
                              <p className="text-sm font-semibold">
                                {index + 1}. {phase.title}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">{phase.duration}</p>
                              <p className="mt-2 text-sm text-muted-foreground">{phase.detail}</p>
                            </li>
                          ))}
                        </ol>
                        <div className="mt-4 flex flex-wrap justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              onInsertSession(plan);
                              setOpen(false);
                            }}
                          >
                            Créer une séance libre préremplie
                          </Button>
                          <Button
                            onClick={() => {
                              onSaveSession(plan);
                              setOpen(false);
                            }}
                          >
                            Ranger dans Ressources
                          </Button>
                        </div>
                      </section>
                    </>
                  ) : null}

                  {plan.target === "journal_day" ? (
                    <section className="rounded-xl bg-card p-4">
                      <p className="eyebrow">Journée proposée</p>
                      <p className="mt-1 text-sm font-semibold">{plan.dayTitle}</p>
                      <ol className="mt-3 space-y-2">
                        {plan.sessions.map((session, index) => (
                          <li
                            key={`${session.start}-${session.title}-${index}`}
                            className="rounded-xl border border-border bg-secondary/25 p-3"
                          >
                            <p className="text-sm font-semibold">
                              {session.start} - {session.end} · {session.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {SUBJECTS[session.subjectKey].label}
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              {session.prep.objective}
                            </p>
                          </li>
                        ))}
                      </ol>
                      <div className="mt-4 flex justify-end">
                        <Button
                          onClick={() => {
                            onApplyJournalDay(plan);
                            setOpen(false);
                          }}
                        >
                          Remplir ce jour du cahier journal
                        </Button>
                      </div>
                    </section>
                  ) : null}
                </section>
              ) : null}

              <div className="flex flex-wrap justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                  Fermer
                </Button>
                <Button type="button" variant="outline" onClick={runClarification} disabled={busy}>
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  {busy ? "Préparation..." : "Questions utiles"}
                </Button>
                <Button type="button" onClick={handlePrimaryAction} disabled={busy}>
                  <Sparkles className="mr-1.5 h-4 w-4" />
                  {busy ? "Génération..." : `Générer avec ${ARDOISE_AI_NAME}`}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
