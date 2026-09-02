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
        "group relative flex h-52 w-36 shrink-0 items-stretch overflow-hidden rounded-[24px] border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_94%,transparent),color-mix(in_oklab,var(--color-secondary)_30%,transparent))] shadow-raised transition-all duration-300 ease-out min-[380px]:h-56 min-[380px]:w-40 sm:h-72 sm:w-52 sm:rounded-[28px]",
        "hover:-translate-y-1 hover:rotate-1 hover:shadow-[0_24px_50px_-24px_rgba(15,23,42,0.45)]",
        opening && "scale-105 opacity-0 [transform:rotateY(-25deg)]",
      )}
    >
      <span className={cn("w-3 shrink-0 sm:w-4", spineClassName)} aria-hidden />
      <span className="relative flex flex-1 flex-col items-center justify-between px-2.5 py-4 sm:px-3 sm:py-5">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-90"
          />
        ) : (
          <span className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed border-border/60" />
        )}
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-secondary text-secondary-foreground shadow-sm sm:h-11 sm:w-11">
          {icon}
        </span>
        <span className="relative flex flex-col items-center gap-1 rounded-2xl bg-card/90 px-2.5 py-2 text-center shadow-sm backdrop-blur-sm sm:px-3 sm:py-2.5">
          <span className="line-clamp-2 text-xs font-bold text-foreground sm:text-sm">{title}</span>
          <span className="text-[0.64rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.7rem]">
            {subtitle}
          </span>
        </span>
      </span>
    </button>
  );
}
