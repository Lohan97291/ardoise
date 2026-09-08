import { STATUSES, type StatusKey } from "@/lib/ardoise-eval";
import { cn } from "@/lib/utils";

const STATUS_BUTTON_CLASS: Record<StatusKey, string> = {
  A: "bg-status-a text-status-a-foreground hover:bg-status-a-solid hover:text-background",
  PA: "bg-status-pa text-status-pa-foreground hover:bg-status-pa-solid hover:text-background",
  NA: "bg-status-na text-status-na-foreground hover:bg-status-na-solid hover:text-background",
  NF: "bg-status-nf text-status-nf-foreground hover:bg-status-nf-solid hover:text-background",
  AB: "bg-status-ab text-status-ab-foreground hover:bg-status-ab-solid hover:text-background",
};

/** Gros boutons de statut A / PA / NA / NF / AB avec raccourcis clavier affichés. */
export function StatusButtons({
  value,
  onSelect,
  dense,
}: {
  value?: StatusKey;
  onSelect: (status: StatusKey) => void;
  dense?: boolean;
}) {
  return (
    <div className={cn("grid grid-cols-5 gap-2 rounded-[22px] border border-border/70 bg-background/70 p-1.5 shadow-inner", dense && "gap-1.5 rounded-2xl p-1")}>
      {STATUSES.map((status) => (
        <button
          key={status.key}
          type="button"
          onClick={() => onSelect(status.key)}
          className={cn(
            "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-[18px] border border-transparent font-bold shadow-sm transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0",
            dense ? "min-h-11 py-2 text-xs" : "py-3.5 text-sm",
            STATUS_BUTTON_CLASS[status.key],
            value === status.key && "border-foreground/70 shadow-raised ring-2 ring-foreground/10",
          )}
          title={`${status.label} · raccourci : ${status.hotkey}`}
        >
          <span>{status.short}</span>
          <span className="text-[0.6rem] font-medium uppercase opacity-70">
            {status.hotkey}
          </span>
        </button>
      ))}
    </div>
  );
}
