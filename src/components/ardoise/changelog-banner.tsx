import { ChevronDown, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CHANGELOG_EVENT,
  dismissChangelogEntries,
  getVisibleChangelogEntries,
  type ChangelogEntry,
} from "@/lib/changelog";
import { cn } from "@/lib/utils";

export function ChangelogBanner() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    function refresh() {
      setEntries(getVisibleChangelogEntries());
    }

    refresh();
    window.addEventListener(CHANGELOG_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CHANGELOG_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  if (entries.length === 0) return null;

  return (
    <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-card via-card to-primary/5 shadow-sm sm:mx-6">
      <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="shrink-0 text-sm font-semibold text-foreground">Nouveautés</span>
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[0.68rem] font-bold text-primary">
            {entries.length}
          </span>
          {!expanded ? (
            <span className="hidden truncate text-xs text-muted-foreground sm:inline">
              {entries[0]?.title}
            </span>
          ) : null}
          <ChevronDown
            className={cn(
              "ml-auto h-4 w-4 shrink-0 text-muted-foreground motion-safe:transition-transform motion-safe:duration-200",
              expanded && "rotate-180",
            )}
          />
        </button>
        <button
          type="button"
          onClick={() => dismissChangelogEntries(entries.map((entry) => entry.id))}
          aria-label="Fermer les nouveautés"
          title="Fermer"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {expanded ? (
        <ul className="animate-fade-in space-y-2 border-t border-border/50 px-4 pb-3 pt-2.5 sm:pl-14">
          {entries.map((entry) => (
            <li key={entry.id} className="text-xs leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">{entry.title}</span>
              {" — "}
              {entry.description}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
