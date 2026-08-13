import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

/**
 * Guidage pas-à-pas partagé : un choix clair au départ (ChoiceCard),
 * puis un écran dédié avec retour explicite (StepHeader).
 */
export function StepHeader({ label, onBack }: { label: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onBack}>
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        Retour
      </Button>
      <span className="eyebrow">{label}</span>
    </div>
  );
}

export function ChoiceCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-border bg-card p-4 text-left transition-colors duration-150 hover:border-primary/40 hover:bg-secondary"
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-primary">
        {icon}
      </span>
      <p className="mt-2.5 text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </button>
  );
}
