import { Link } from "@tanstack/react-router";
import { ArrowRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SecondaryPageHeader({
  eyebrow = "Ma classe",
  title,
  description,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "grid gap-3 overflow-hidden rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_34%,transparent))] px-4 py-4 shadow-raised backdrop-blur-sm sm:px-5 sm:py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        <p className="mt-1.5 line-clamp-2 max-w-2xl text-[0.82rem] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? (
        <div className="flex flex-wrap items-center gap-2 lg:justify-end">{actions}</div>
      ) : null}
    </header>
  );
}

export function SecondaryPageLinks({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3", className)}>
      {children}
    </section>
  );
}

export function SecondaryPageLinkCard({
  to,
  icon: Icon,
  title,
  description,
  badge,
}: {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}) {
  return (
    <Link
      to={to as never}
      className="card-surface card-interactive group flex items-start gap-3 rounded-[24px] px-4 py-3.5 transition-all duration-200 hover:bg-secondary/50"
    >
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/50 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-secondary)_90%,transparent),color-mix(in_oklab,var(--color-card)_65%,transparent))] text-primary shadow-sm">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="panel-heading text-sm font-semibold">{title}</span>
          {badge ? (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
              {badge}
            </span>
          ) : null}
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
    </Link>
  );
}
