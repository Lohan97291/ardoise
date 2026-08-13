import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type AssistantContextSection = {
  label: string;
  items: string[];
};

export type AssistantClarifyingQuestion = {
  id: string;
  question: string;
  rationale: string;
  suggestions: string[];
  freeTextPlaceholder: string;
};

export type AssistantQuestionAnswer = {
  selectedSuggestion?: string;
  freeText?: string;
};

export function AssistantStepsCard({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <p className="text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        {[
          "Je regarde ce qui est déjà en place",
          "Je pose seulement les questions utiles",
          "Je génère une proposition prête à adapter",
        ].map((step, index) => (
          <div key={step} className="rounded-xl border border-primary/15 bg-card px-3 py-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-primary">
              Étape {index + 1}
            </p>
            <p className="mt-1 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AssistantContextDetails({
  summary,
  title = "Voir ce que prend déjà en compte Plume d'Ardoise",
  leadItems = [],
  sections,
}: {
  summary: string;
  title?: string;
  leadItems?: Array<{ label: string; value: string }>;
  sections: AssistantContextSection[];
}) {
  const visibleSections = sections.filter((section) => section.items.length > 0);
  if (!summary && leadItems.length === 0 && visibleSections.length === 0) return null;

  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Contexte déjà repéré
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summary}</p>

      {leadItems.length > 0 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {leadItems.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className="rounded-xl bg-secondary/25 px-3 py-2.5"
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {visibleSections.length > 0 ? (
        <details className="mt-3 rounded-xl border border-border bg-secondary/20 px-3 py-2.5">
          <summary className="cursor-pointer list-none text-sm font-semibold">{title}</summary>
          <div className="mt-3 grid gap-3">
            {visibleSections.map((section) => (
              <div key={section.label} className="rounded-xl bg-card px-3 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {section.label}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      ) : null}
    </section>
  );
}

export function AssistantPromptBox({
  label,
  helper,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  helper: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-4">
      <div className="space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">{label}</Label>
        <p className="text-sm text-muted-foreground">{helper}</p>
        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-h-28 rounded-xl"
        />
      </div>
    </section>
  );
}

export function AssistantClarificationPanel({
  assistantName,
  intro,
  questions,
  answers,
  answeredCount,
  onAnswerChange,
}: {
  assistantName: string;
  intro: string;
  questions: AssistantClarifyingQuestion[];
  answers: Record<string, AssistantQuestionAnswer>;
  answeredCount: number;
  onAnswerChange: (questionId: string, answer: AssistantQuestionAnswer) => void;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-primary/20 bg-primary/5 p-4">
      <div className="rounded-xl bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-base font-semibold">Questions utiles de {assistantName}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{intro}</p>
          </div>
          <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {answeredCount}/{questions.length} renseignée(s)
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        <div className="space-y-3">
          {questions.map((question, index) => {
            const answer = answers[question.id] ?? {};
            return (
              <section key={question.id} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-[0.72rem] font-semibold text-primary-foreground">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-relaxed">{question.question}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{question.rationale}</p>
                  </div>
                </div>

                {question.suggestions.length > 0 ? (
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Réponses rapides
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {question.suggestions.map((suggestion) => {
                        const selected = answer.selectedSuggestion === suggestion;
                        return (
                          <Button
                            key={suggestion}
                            type="button"
                            variant={selected ? "default" : "outline"}
                            size="sm"
                            className="rounded-full"
                            onClick={() =>
                              onAnswerChange(question.id, {
                                ...answer,
                                selectedSuggestion: selected ? undefined : suggestion,
                              })
                            }
                          >
                            {suggestion}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ) : null}

                <div className="mt-3 space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">
                    Ou écris ta réponse
                  </Label>
                  <Textarea
                    value={answer.freeText ?? ""}
                    onChange={(event) =>
                      onAnswerChange(question.id, {
                        ...answer,
                        freeText: event.target.value,
                      })
                    }
                    placeholder={question.freeTextPlaceholder}
                    className="min-h-20 rounded-xl"
                  />
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <section className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Le contexte est déjà assez précis pour générer directement.</span>
          </div>
        </section>
      )}
    </section>
  );
}
