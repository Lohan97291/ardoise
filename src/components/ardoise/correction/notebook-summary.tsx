import { ArrowRight, History, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { LastPageEntry } from "@/lib/correction-rapide-store";
import {
  notebookPageSummary,
  pageLabel,
  searchNotebook,
  type NotebookSource,
} from "@/lib/correction-rapide-notebook";
import { cn } from "@/lib/utils";

/**
 * Sommaire d'un cahier : 3 actions seulement — aller à une page, reprendre la
 * dernière page corrigée, rechercher une notion/un exercice.
 */
export function NotebookSummary({
  source,
  lastPage,
  onOpenPage,
}: {
  source: NotebookSource;
  lastPage: LastPageEntry | null;
  onOpenPage: (page: number) => void;
}) {
  const [pageInput, setPageInput] = useState("");
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchNotebook(source, query), [source, query]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="rounded-[28px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_38%,transparent))] p-4 shadow-raised sm:p-5">
        <p className="eyebrow">Sommaire du cahier</p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
          Choisir rapidement la bonne page
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Trois entrées seulement : reprendre la dernière page, aller à une page précise ou
          retrouver une notion en quelques mots.
        </p>
      </div>

      <form
        className="flex items-center gap-2 rounded-[24px] border border-border bg-card p-3 shadow-card"
        onSubmit={(event) => {
          event.preventDefault();
          const page = Number.parseInt(pageInput, 10);
          if (Number.isFinite(page) && page > 0) onOpenPage(page);
        }}
      >
        <Input
          inputMode="numeric"
          placeholder="Aller à la page…"
          value={pageInput}
          onChange={(event) => setPageInput(event.target.value.replace(/[^0-9]/g, ""))}
          className="h-11 text-base"
        />
        <Button type="submit" size="lg" disabled={!pageInput}>
          Ouvrir
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </form>

      {lastPage ? (
        <button
          type="button"
          onClick={() => onOpenPage(lastPage.page)}
          className="flex items-center gap-3 rounded-[24px] border border-primary/25 bg-primary/5 p-4 text-left shadow-card transition-colors hover:bg-primary/10"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
            <History className="h-5 w-5" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-semibold text-primary">
              Reprendre {pageLabel(lastPage.page, source)}
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              {lastPage.summary}
            </span>
          </span>
          <ArrowRight className="h-4 w-4 shrink-0 text-primary" />
        </button>
      ) : null}

      <div className="rounded-[24px] border border-border bg-card p-3 shadow-card">
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Rechercher une notion, un exercice…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        {results.length > 0 ? (
          <ul className="mt-2 max-h-72 space-y-1 overflow-y-auto">
            {results.map((result) => (
              <li key={`${result.page}-${result.item.id}`}>
                <button
                  type="button"
                  onClick={() => onOpenPage(result.page)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-secondary",
                  )}
                >
                  <span className="min-w-0 truncate">{result.item.label}</span>
                  <span className="shrink-0 text-xs font-medium text-muted-foreground">
                    {pageLabel(result.page, source)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : query.trim() ? (
          <p className="mt-2 px-1 py-2 text-xs text-muted-foreground">Aucun résultat.</p>
        ) : null}
      </div>
      {!lastPage && !query.trim() ? (
        <p className="px-1 text-xs text-muted-foreground">
          {notebookPageSummary(source, 1) ? "Astuce : tapez un numéro de page ou une notion." : ""}
        </p>
      ) : null}
    </div>
  );
}
