import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Bouton "cahier" pour l'écran d'accueil de la correction rapide.
 * Couverture rectangulaire, dos coloré à gauche, étiquette, ombre, légère
 * léger soulèvement au survol. `coverUrl` permet une vraie image de couverture,
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
      className={cn(
        "group relative flex h-52 w-36 shrink-0 items-stretch overflow-hidden rounded-[18px] border border-border/75 bg-card shadow-[var(--shadow-card)] transition-[transform,box-shadow,border-color,opacity] duration-200 ease-out min-[380px]:h-56 min-[380px]:w-40 sm:h-72 sm:w-52 sm:rounded-[20px]",
        "hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[var(--shadow-raised)]",
        opening && "translate-y-1 scale-[0.98] opacity-0",
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
          <span className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-border/55" />
        )}
        <span className="relative grid h-10 w-10 place-items-center rounded-xl border border-border/60 bg-secondary/75 text-primary shadow-[inset_0_1px_0_color-mix(in_oklab,white_62%,transparent)] sm:h-11 sm:w-11">
          {icon}
        </span>
        <span className="relative mx-0.5 flex w-[calc(100%-0.25rem)] flex-col items-center gap-1 rounded-xl border border-border/65 bg-card/94 px-2.5 py-2 text-center shadow-[var(--shadow-card)] backdrop-blur-sm sm:px-3 sm:py-2.5">
          <span className="line-clamp-2 text-xs font-bold text-foreground sm:text-sm">{title}</span>
          <span className="text-[0.64rem] font-medium uppercase tracking-wide text-muted-foreground sm:text-[0.7rem]">
            {subtitle}
          </span>
        </span>
      </span>
    </button>
  );
}
