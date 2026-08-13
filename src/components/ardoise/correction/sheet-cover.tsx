import { FilePlus2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Carte "feuille" posée à côté des cahiers : ouvre la création d'une évaluation
 * ou d'une feuille à corriger dont l'enseignant saisit le nom.
 */
export function SheetCover({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex h-64 w-44 shrink-0 flex-col items-center justify-center gap-3 overflow-hidden rounded-[28px] border-2 border-dashed border-border bg-[repeating-linear-gradient(180deg,transparent,transparent_22px,oklch(0.9_0.02_250_/_0.5)_23px)] shadow-raised transition-all duration-300 ease-out sm:h-72 sm:w-52",
        "hover:-translate-y-1 hover:-rotate-1 hover:border-primary/40 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)]",
      )}
    >
      <span
        aria-hidden
        className="absolute left-6 top-0 h-full w-px bg-rose-300/70"
      />
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-sm">
        <FilePlus2 className="h-5 w-5" />
      </span>
      <span className="relative flex flex-col items-center gap-1 px-4 text-center">
        <span className="text-sm font-bold text-foreground">Autre</span>
        <span className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
          Évaluation · feuille
        </span>
      </span>
    </button>
  );
}
