import { Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type AiInsight = {
  title: string;
  summary: string;
  highlights?: string[];
  alerts?: string[];
  nextSteps?: string[];
};

export type AiAction = {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  build: () => AiInsight;
};

type AiActionStripProps = {
  title?: string;
  intro?: string;
  actions: AiAction[];
  className?: string;
};

function InsightList({
  title,
  items,
  tone,
}: {
  title: string;
  items?: string[];
  tone: "neutral" | "alert" | "action";
}) {
  if (!items || items.length === 0) return null;

  const toneClass =
    tone === "alert"
      ? "border-amber-200 bg-amber-50/80"
      : tone === "action"
        ? "border-primary/20 bg-primary/5"
        : "border-border bg-secondary/30";

  return (
    <section className={cn("rounded-2xl border p-4", toneClass)}>
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

export function AiActionStrip({
  title = "Coups de pouce IA",
  intro = "Des aides rapides basées sur les données visibles de cette page.",
  actions,
  className,
}: AiActionStripProps) {
  const [open, setOpen] = useState(false);
  const [insight, setInsight] = useState<AiInsight | null>(null);

  const runAction = (action: AiAction) => {
    setInsight(action.build());
    setOpen(true);
  };

  return (
    <>
      <section className={cn("card-surface mt-4 p-3 shadow-card", className)}>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          {(title || intro) && (
            <div className="min-w-0">
              {title && (
                <p className="eyebrow flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {title}
                </p>
              )}
              {intro && <p className="mt-1 text-sm text-muted-foreground">{intro}</p>}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  type="button"
                  variant="outline"
                  size="sm"
                  className="justify-start rounded-xl"
                  onClick={() => runAction(action)}
                  title={action.description}
                >
                  <Icon className="mr-1.5 h-4 w-4" />
                  {action.label}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              {insight?.title ?? "Assistant"}
            </DialogTitle>
            <DialogDescription>{insight?.summary}</DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <InsightList title="Ce que je vois" items={insight?.highlights} tone="neutral" />
            <InsightList title="Points d'attention" items={insight?.alerts} tone="alert" />
            <InsightList title="Suite conseillée" items={insight?.nextSteps} tone="action" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
