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
  description?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative isolate grid gap-4 overflow-hidden rounded-2xl border border-border/80 bg-card px-4 py-4 shadow-card sm:px-6 sm:py-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.85),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.32),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92),transparent)]" />
      <div className="min-w-0">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-1 truncate text-[1.45rem] font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1.5 line-clamp-2 max-w-2xl text-[0.8rem] leading-relaxed text-muted-foreground sm:text-[0.82rem]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="relative z-[1] flex flex-wrap items-center gap-2 max-sm:w-full max-sm:justify-start lg:justify-end">
          {actions}
        </div>
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
      className="card-surface card-interactive group relative isolate flex items-start gap-3 overflow-hidden rounded-[24px] border-white/45 px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/35 hover:shadow-[0_24px_48px_-34px_rgba(15,23,42,0.42)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.42),transparent_28%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="relative z-[1] grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/60 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_88%,white_12%),color-mix(in_oklab,var(--color-secondary)_52%,transparent))] text-primary shadow-[0_14px_26px_-20px_rgba(37,99,235,0.55)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="relative z-[1] min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="panel-heading text-sm font-semibold">{title}</span>
          {badge ? (
            <span className="rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground">
              {badge}
            </span>
          ) : null}
          <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary/70 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
        </span>
        <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
    </Link>
  );
}
