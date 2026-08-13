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
    <div className={cn("grid grid-cols-5 gap-2", dense && "gap-1.5")}>
      {STATUSES.map((status) => (
        <button
          key={status.key}
          type="button"
          onClick={() => onSelect(status.key)}
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 rounded-xl border-2 border-transparent font-bold transition-all duration-150",
            dense ? "py-2 text-xs" : "py-4 text-sm",
            STATUS_BUTTON_CLASS[status.key],
            value === status.key && "border-foreground/70 shadow-card",
          )}
          title={`Raccourci : ${status.hotkey}`}
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
