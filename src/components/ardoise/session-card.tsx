import { ClipboardCheck, Copy, FileText, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { SUBJECT_BAND, SUBJECT_STRIP } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import { SUBJECTS, durationLabel, type Session } from "@/lib/ardoise-data";
import type { PrepSheet } from "@/lib/ardoise-data";
import type { PatchedResourceMatch } from "@/lib/resource-tree-patched";
import { loadPatchedPrepSheet, loadPatchedResourceMatch } from "@/lib/resource-library";
import { getSessionCorrectionLabel, getSessionResultTarget } from "@/lib/session-result-links";
import { cn } from "@/lib/utils";

type Props = {
  session: Session;
  onOpen: (session: Session) => void;
  onCorrect: (session: Session) => void;
  onDuplicate: (session: Session) => void;
  onDelete: (session: Session) => void;
  onAddAfter: (session: Session) => void;
};

export function SessionCard({
  session,
  onOpen,
  onCorrect,
  onDuplicate,
  onDelete,
  onAddAfter,
}: Props) {
  const [prep, setPrep] = useState<PrepSheet | undefined>();
  const [resourceMatch, setResourceMatch] = useState<PatchedResourceMatch | undefined>();

  useEffect(() => {
    let active = true;
    void loadPatchedPrepSheet(session.prepSheetId).then((nextPrep) => {
      if (active) setPrep(nextPrep);
    });
    void loadPatchedResourceMatch(session.resourceId).then((nextMatch) => {
      if (active) setResourceMatch(nextMatch);
    });
    return () => {
      active = false;
    };
  }, [session.prepSheetId, session.resourceId]);

  const subject = SUBJECTS[session.subject];
  const resultTarget = getSessionResultTarget(session);
  const correctionLabel = getSessionCorrectionLabel(session);
  const compactCorrectionLabel =
    resultTarget?.kind === "fluence" ? "Fluence" : resultTarget ? "Correction" : "Sans correction";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-float">
      {/* Left colour strip */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 w-1", SUBJECT_STRIP[session.subject])}
      />
      <button
        type="button"
        onClick={() => onOpen(session)}
        className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div
          className={cn("pl-5 pr-4 py-1.5 text-xs font-semibold", SUBJECT_BAND[session.subject])}
        >
          {subject.label}
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pl-5 pr-4 py-3">
          <div className="min-w-0">
            <p className="font-mono text-xs text-muted-foreground">
              {session.start} – {session.end}
            </p>
            <h3 className="mt-1 text-base font-semibold leading-snug text-foreground">
              {session.title}
            </h3>

            {prep ? (
              <p className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{prep.title}</span>
              </p>
            ) : resourceMatch ? (
              <p className="mt-2 inline-flex max-w-full items-center gap-1.5 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{resourceMatch.session.label}</span>
              </p>
            ) : session.free ? (
              <p className="mt-2 text-xs text-muted-foreground">Séance libre</p>
            ) : (
              <p className="mt-2 text-xs font-medium text-ochre-foreground">
                Aucune ressource rattachée
              </p>
            )}
            {session.exercisePlan?.length ? (
              <p className="mt-2 text-xs text-muted-foreground">
                {session.exercisePlan.length} consigne{session.exercisePlan.length > 1 ? "s" : ""}{" "}
                d'exercice
                {session.exercisePlan[0]?.page ? ` · p. ${session.exercisePlan[0].page}` : ""}
              </p>
            ) : null}
            <div className="mt-2">
              {resultTarget ? (
                <button
                  type="button"
                  title={resultTarget.label}
                  aria-label={resultTarget.label}
                  onClick={(event) => {
                    event.stopPropagation();
                    onCorrect(session);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.68rem] font-semibold text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  {compactCorrectionLabel}
                </button>
              ) : (
                <p
                  title={correctionLabel}
                  className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[0.68rem] font-semibold text-muted-foreground"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  {compactCorrectionLabel}
                </p>
              )}
            </div>
          </div>

          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {durationLabel(session.start, session.end)}
          </span>
        </div>
      </button>

      <div className="absolute right-2 top-8 flex items-center gap-0.5 rounded-lg border border-border bg-card p-0.5 opacity-0 shadow-card transition-opacity focus-within:opacity-100 group-hover:opacity-100">
        <IconAction label="Ajouter après" onClick={() => onAddAfter(session)}>
          <Plus className="h-4 w-4" />
        </IconAction>
        <IconAction label="Dupliquer" onClick={() => onDuplicate(session)}>
          <Copy className="h-4 w-4" />
        </IconAction>
        <IconAction label="Supprimer" onClick={() => onDelete(session)} destructive>
          <Trash2 className="h-4 w-4" />
        </IconAction>
      </div>
    </article>
  );
}

function IconAction({
  label,
  onClick,
  children,
  destructive,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
  destructive?: boolean;
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn("h-7 w-7 text-muted-foreground", destructive && "hover:text-destructive")}
    >
      {children}
    </Button>
  );
}
