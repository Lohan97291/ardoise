import { HandHeart, UserRoundCheck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Student } from "@/lib/ardoise-eval";
import type { ExerciseAssistance } from "@/lib/storage";
import { cn } from "@/lib/utils";

export function AssistanceButtons({
  student,
  value,
  onChange,
  dense,
}: {
  student: Student;
  value?: ExerciseAssistance;
  onChange: (next?: ExerciseAssistance) => void;
  dense?: boolean;
}) {
  const aeshExpected = student.id === "el-7";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", dense && "gap-1.5")}>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Aide
      </span>
      <Button
        type="button"
        variant="outline"
        size={dense ? "sm" : "default"}
        onClick={() => onChange(value === "help" ? undefined : "help")}
        className={cn(
          "rounded-full border-border bg-card/80 text-xs font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary",
          value === "help" && "border-ochre/40 bg-ochre/15 text-ochre-foreground shadow-card",
        )}
      >
        <HandHeart className="mr-1.5 h-4 w-4" />
        Avec aide
      </Button>
      <Button
        type="button"
        variant="outline"
        size={dense ? "sm" : "default"}
        onClick={() => onChange(value === "aesh" ? undefined : "aesh")}
        className={cn(
          "rounded-full border-border bg-card/80 text-xs font-semibold shadow-sm transition-all hover:-translate-y-0.5 hover:bg-secondary",
          aeshExpected && "border-primary/25",
          value === "aesh" && "border-primary/40 bg-primary/12 text-primary shadow-card",
        )}
      >
        <UserRoundCheck className="mr-1.5 h-4 w-4" />
        Avec AESH
      </Button>
      {value ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onChange(undefined)}
          className="rounded-full px-2 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="mr-1 h-3.5 w-3.5" />
          Retirer
        </Button>
      ) : null}
    </div>
  );
}
