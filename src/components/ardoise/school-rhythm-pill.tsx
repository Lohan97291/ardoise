import { cn } from "@/lib/utils";

type SchoolRhythm = {
  status: "current" | "upcoming" | "ended";
  period: { label: string };
  schoolDaysLeft: number;
  schoolWeeksLeft: number;
};

export function SchoolRhythmPill({
  rhythm,
  className,
}: {
  rhythm: SchoolRhythm;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-200/80 bg-[linear-gradient(135deg,oklch(0.985_0.02_150),oklch(0.96_0.03_150))] px-3 py-1.5 text-xs text-emerald-900 shadow-sm",
        className,
      )}
    >
      <span className="font-semibold">Zone C</span>
      <span className="text-emerald-700">•</span>
      <span className="font-medium">
        {rhythm.status === "upcoming" ? "Prochaine période" : "Période"} {rhythm.period.label}
      </span>
      <span className="text-emerald-700">•</span>
      <span>
        {rhythm.schoolDaysLeft} jour{rhythm.schoolDaysLeft > 1 ? "s" : ""} de classe
      </span>
      <span className="text-emerald-700">•</span>
      <span>
        {rhythm.schoolWeeksLeft} semaine{rhythm.schoolWeeksLeft > 1 ? "s" : ""}
      </span>
    </div>
  );
}
