import { Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";

import {
  CHANGELOG_EVENT,
  dismissChangelogEntries,
  getVisibleChangelogEntries,
  type ChangelogEntry,
} from "@/lib/changelog";

export function ChangelogBanner() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);

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
    <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl border border-primary/15 bg-[linear-gradient(135deg,rgba(30,64,175,0.07),transparent_58%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] shadow-sm sm:mx-6">
      <button
        type="button"
        onClick={() => dismissChangelogEntries(entries.map((entry) => entry.id))}
        aria-label="Fermer les nouveautés"
        title="Fermer"
        className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start gap-3 px-4 py-3 pr-10">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1 space-y-2">
          <p className="text-sm font-semibold text-foreground">Nouveautés sur Ardoise</p>
          <ul className="space-y-1.5">
            {entries.map((entry) => (
              <li key={entry.id} className="text-xs leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">{entry.title}</span>
                {" — "}
                {entry.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
