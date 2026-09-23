import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { STATUSES, type StatusKey } from "@/lib/ardoise-eval";
import { cn } from "@/lib/utils";

const STATUS_IDLE_CLASS: Record<StatusKey, string> = {
  A: "bg-status-a/70 text-status-a-foreground hover:bg-status-a",
  PA: "bg-status-pa/70 text-status-pa-foreground hover:bg-status-pa",
  NA: "bg-status-na/70 text-status-na-foreground hover:bg-status-na",
  NF: "bg-status-nf/70 text-status-nf-foreground hover:bg-status-nf",
  AB: "bg-status-ab/70 text-status-ab-foreground hover:bg-status-ab",
};

const STATUS_ACTIVE_CLASS: Record<StatusKey, string> = {
  A: "bg-status-a-solid hover:bg-status-a-solid text-background ring-status-a-solid/45",
  PA: "bg-status-pa-solid hover:bg-status-pa-solid text-background ring-status-pa-solid/45",
  NA: "bg-status-na-solid hover:bg-status-na-solid text-background ring-status-na-solid/45",
  NF: "bg-status-nf-solid hover:bg-status-nf-solid text-background ring-status-nf-solid/45",
  AB: "bg-status-ab-solid hover:bg-status-ab-solid text-background ring-status-ab-solid/45",
};

/** Gros boutons de statut A / PA / NA / NF / AB avec raccourcis clavier affichés. */
export function StatusButtons({
  value,
  onSelect,
  onClear,
  dense,
}: {
  value?: StatusKey;
  onSelect: (status: StatusKey) => void;
  onClear?: () => void;
  dense?: boolean;
}) {
  return (
    <div className={cn("flex flex-col gap-2", dense && "gap-1.5")}>
      <div
        role="radiogroup"
        aria-label="Notation de l'exercice"
        className={cn(
          "grid grid-cols-5 gap-2 rounded-[22px] border border-border/70 bg-background/70 p-1.5 shadow-inner",
          dense && "gap-1.5 rounded-2xl p-1",
        )}
      >
        {STATUSES.map((status) => {
          const active = value === status.key;
          return (
            <Button
              key={status.key}
              type="button"
              variant="ghost"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(status.key)}
              className={cn(
                "relative h-auto min-h-14 flex-col items-center justify-center gap-0.5 rounded-[18px] border border-transparent px-2 font-bold shadow-sm outline-none motion-safe:transition-all motion-safe:duration-150 focus-visible:ring-2 focus-visible:ring-foreground/40",
                dense ? "min-h-11 py-2 text-xs" : "py-3.5 text-sm",
                active
                  ? cn(STATUS_ACTIVE_CLASS[status.key], "motion-safe:-translate-y-0.5 motion-safe:scale-[1.02] border-background/60 shadow-raised ring-2 ring-offset-2 ring-offset-card hover:text-background")
                  : cn(STATUS_IDLE_CLASS[status.key], "motion-safe:hover:-translate-y-0.5", value && "opacity-55"),
              )}
              title={`${status.label} · raccourci : ${status.hotkey}`}
            >
              {active ? (
                <span className={cn("absolute grid place-items-center rounded-full bg-background text-foreground shadow-card", dense ? "-right-1 -top-1 h-4 w-4" : "-right-1.5 -top-1.5 h-5 w-5")}>
                  <Check className={dense ? "h-2.5 w-2.5" : "h-3 w-3"} strokeWidth={3.5} />
                </span>
              ) : null}
              <span>{status.short}</span>
              <span className="text-[0.6rem] font-medium uppercase opacity-70">
                {status.hotkey}
              </span>
            </Button>
          );
        })}
      </div>
      {value && onClear ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          className={cn(
            "self-start rounded-full text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground",
            dense && "h-8 px-2",
          )}
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Retirer la note
        </Button>
      ) : null}
    </div>
  );
}
