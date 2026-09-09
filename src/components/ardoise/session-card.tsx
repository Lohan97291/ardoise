import {
  ClipboardCheck,
  Copy,
  FileText,
  MoreHorizontal,
  PenLine,
  Plus,
  Printer,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";

import { SUBJECT_BAND, SUBJECT_STRIP } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUBJECTS, durationLabel, type Session } from "@/lib/ardoise-data";
import type { PrepSheet } from "@/lib/ardoise-data";
import type { PatchedResourceMatch } from "@/lib/resource-tree-patched";
import { loadPatchedPrepSheet, loadPatchedResourceMatch } from "@/lib/resource-library";
import { getSessionCorrectionLabel, getSessionResultTarget } from "@/lib/session-result-links";
import { getSessionPedagogicalLabels } from "@/lib/session-subdomains";
import { cn } from "@/lib/utils";

type Props = {
  session: Session;
  onOpen: (session: Session) => void;
  onCorrect: (session: Session) => void;
  onDuplicate: (session: Session) => void;
  onDelete: (session: Session) => void;
  onAddAfter: (session: Session) => void;
  onPrintPrep?: (session: Session) => void;
};

export function SessionCard({
  session,
  onOpen,
  onCorrect,
  onDuplicate,
  onDelete,
  onAddAfter,
  onPrintPrep,
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
  const pedagogicalLabels = getSessionPedagogicalLabels(session, prep);
  const resourceLabel = prep?.title ?? resourceMatch?.session.label;
  const compactCorrectionLabel =
    resultTarget?.kind === "fluence" ? "Fluence" : resultTarget ? "Correction" : "Sans correction";

  return (
    <article className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-float">
      <div
        aria-hidden="true"
        className={cn("absolute inset-y-0 left-0 w-1.5", SUBJECT_STRIP[session.subject])}
      />
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pl-5 pr-3 py-3">
        <button
          type="button"
          onClick={() => onOpen(session)}
          className="min-w-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-bold tabular-nums text-foreground">
              {session.start}
            </span>
            <span className="font-mono text-[0.7rem] tabular-nums text-muted-foreground">
              {"->"} {session.end} · {durationLabel(session.start, session.end)}
            </span>
            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[0.68rem] font-semibold",
                SUBJECT_BAND[session.subject],
              )}
            >
              {subject.label}
            </span>
          </div>

          <h3 className="mt-1.5 truncate text-base font-semibold leading-snug text-foreground">
            {session.title}
          </h3>

          {session.note ? (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{session.note}</p>
          ) : null}

          {session.subject !== "pause" ? (
            <p className="mt-1 flex flex-wrap items-center gap-1.5 text-[0.72rem] font-semibold text-muted-foreground">
              <span>{pedagogicalLabels.domain}</span>
              <span className="text-border">•</span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">
                {pedagogicalLabels.subDomain}
              </span>
            </p>
          ) : null}

          <p className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
            {resourceLabel ? (
              <>
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{resourceLabel}</span>
              </>
            ) : session.free ? (
              <span className="truncate">Séance libre</span>
            ) : (
              <span className="truncate font-medium text-ochre-foreground">
                Aucune ressource rattachée
              </span>
            )}
            {session.exercisePlan?.length ? (
              <span className="shrink-0">
                · {session.exercisePlan.length} consigne
                {session.exercisePlan.length > 1 ? "s" : ""}
                {session.exercisePlan[0]?.page ? ` · p. ${session.exercisePlan[0].page}` : ""}
              </span>
            ) : null}
          </p>
        </button>

        <div className="flex shrink-0 items-center gap-1">
          {prep && onPrintPrep ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title="Imprimer la fiche de prep en PDF"
              aria-label="Imprimer la fiche de prep en PDF"
              className="min-h-10 px-2.5 text-xs font-semibold text-primary hover:text-primary"
              onClick={() => onPrintPrep(session)}
            >
              <Printer className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">PDF</span>
            </Button>
          ) : null}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="min-h-10 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            onClick={() => onOpen(session)}
          >
            <PenLine className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Préparer</span>
          </Button>

          {resultTarget ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              title={resultTarget.label}
              aria-label={resultTarget.label}
              className="min-h-10 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
              onClick={() => onCorrect(session)}
            >
              <ClipboardCheck className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">{compactCorrectionLabel}</span>
            </Button>
          ) : (
            <span
              title={correctionLabel}
              className="hidden min-h-10 items-center gap-1.5 rounded-md px-2.5 text-xs font-semibold text-muted-foreground md:inline-flex"
            >
              <ClipboardCheck className="h-4 w-4" />
              {compactCorrectionLabel}
            </span>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Plus d'actions"
                className="h-10 w-10 text-muted-foreground opacity-70 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onAddAfter(session)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter après
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => onDuplicate(session)}>
                <Copy className="mr-2 h-4 w-4" />
                Dupliquer
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => onDelete(session)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  );
}
