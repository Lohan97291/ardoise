import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Bouton "cahier" pour l'écran d'accueil de la correction rapide.
 * Couverture rectangulaire, dos coloré à gauche, étiquette, ombre, légère
 * rotation au survol. `coverUrl` permet une vraie image de couverture,
 * sinon on retombe sur une couverture dessinée en CSS (spineClassName).
 */
export function NotebookCover({
  title,
  subtitle,
  spineClassName,
  coverUrl,
  icon,
  onClick,
  opening,
}: {
  title: string;
  subtitle: string;
  spineClassName: string;
  coverUrl?: string;
  icon: ReactNode;
  onClick: () => void;
  opening?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ transformStyle: "preserve-3d" }}
      className={cn(
        "group relative flex h-64 w-44 shrink-0 items-stretch overflow-hidden rounded-[28px] border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_94%,transparent),color-mix(in_oklab,var(--color-secondary)_30%,transparent))] shadow-raised transition-all duration-300 ease-out sm:h-72 sm:w-52",
        "hover:-translate-y-1 hover:rotate-1 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)]",
        opening && "scale-105 opacity-0 [transform:rotateY(-25deg)]",
      )}
    >
      <span className={cn("w-3 shrink-0 sm:w-4", spineClassName)} aria-hidden />
      <span className="relative flex flex-1 flex-col items-center justify-between px-3 py-5">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        ) : (
          <span className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-border/60" />
        )}
        <span className="relative grid h-11 w-11 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-sm">
          {icon}
        </span>
        <span className="relative flex flex-col items-center gap-1 rounded-2xl bg-card/90 px-3 py-2.5 text-center shadow-sm backdrop-blur-sm">
          <span className="text-sm font-bold text-foreground">{title}</span>
          <span className="text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground">
            {subtitle}
          </span>
        </span>
      </span>
    </button>
  );
}
