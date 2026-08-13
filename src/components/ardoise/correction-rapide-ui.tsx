import { useState, type ReactNode } from "react";

import type { Student } from "@/lib/ardoise-eval";
import { cn } from "@/lib/utils";

export function CahierImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        onClick={() => setOpen(true)}
        className={cn("cursor-zoom-in", className)}
        loading="lazy"
      />
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-h-[92vh] max-w-[92vw] rounded-2xl shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}

export function StudentName({ student, className }: { student: Student; className?: string }) {
  return (
    <span className={cn("min-w-0", className)}>
      <span className="truncate font-semibold text-primary">{student.firstName}</span>{" "}
      <span className="truncate font-semibold uppercase tracking-wide text-sky-700">
        {student.lastName}
      </span>
    </span>
  );
}

export function ModeButton({
  icon,
  title,
  description,
  active,
  onClick,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-2xl border px-3 py-3 text-left transition-all duration-150",
        active
          ? "border-primary bg-primary/6 shadow-card"
          : "border-border bg-card hover:-translate-y-0.5 hover:shadow-card",
      )}
    >
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
        {icon}
      </span>
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
    </button>
  );
}

export function FlowSummaryCard({
  label,
  value,
  hint,
  emphasized,
}: {
  label: string;
  value: string;
  hint: string;
  emphasized?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-card px-4 py-3 shadow-card",
        emphasized ? "border-primary/25 bg-primary/5" : "border-border",
      )}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={cn("mt-1 text-sm font-semibold", emphasized && "text-primary")}>{value}</p>
      <p className="mt-1 text-[0.72rem] text-muted-foreground">{hint}</p>
    </div>
  );
}
