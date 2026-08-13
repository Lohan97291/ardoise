import { ArrowLeft, Check, ChevronRight, FolderOpen, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { SUBJECT_DOT } from "@/components/ardoise/subject-styles";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { type ResourceMethod, type ResourceSession } from "@/lib/ardoise-data";
import { loadMergedResourceTree } from "@/lib/resource-library";
import { cn } from "@/lib/utils";

type Props = {
  selectedResourceId?: string;
  onSelect: (session: ResourceSession) => void;
};

/**
 * Navigation en fil d'Ariane : méthode → séquence/période → séance.
 * Un seul palier visible à la fois, plus aéré et plus rapide à parcourir.
 */
export function ResourcePicker({ selectedResourceId, onSelect }: Props) {
  const [patchedTree, setPatchedTree] = useState<ResourceMethod[]>([]);
  const [query, setQuery] = useState("");
  const [openMethod, setOpenMethod] = useState<string | null>(null);
  const [openSequence, setOpenSequence] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void loadMergedResourceTree().then((tree) => {
      if (active) setPatchedTree(tree);
    });
    return () => {
      active = false;
    };
  }, []);

  const q = query.trim().toLowerCase();

  const tree = useMemo(() => {
    if (!q) return patchedTree;
    return patchedTree
      .map((method) => ({
        ...method,
        sequences: method.sequences
          .map((seq) => ({
            ...seq,
            sessions: seq.sessions.filter(
              (s) =>
                s.label.toLowerCase().includes(q) ||
                seq.label.toLowerCase().includes(q) ||
                method.label.toLowerCase().includes(q),
            ),
          }))
          .filter((seq) => seq.sessions.length > 0),
      }))
      .filter((m) => m.sequences.length > 0);
  }, [patchedTree, q]);

  /** Résultats plats (avec chemin) quand une recherche est en cours. */
  const results = useMemo(() => {
    if (!q) return [];
    const out: { session: ResourceSession; path: string }[] = [];
    for (const m of tree) {
      for (const seq of m.sequences) {
        for (const s of seq.sessions) out.push({ session: s, path: `${m.label} · ${seq.label}` });
      }
    }
    return out.slice(0, 80);
  }, [q, tree]);

  const method = q ? null : (tree.find((m) => m.id === openMethod) ?? null);
  const sequence = method?.sequences.find((s) => s.id === openSequence) ?? null;

  const levelBadge = q
    ? `${results.length} résultat${results.length > 1 ? "s" : ""}`
    : sequence
      ? `${sequence.sessions.length} séance${sequence.sessions.length > 1 ? "s" : ""}`
      : method
        ? `${method.sequences.length} séquence${method.sequences.length > 1 ? "s" : ""}`
        : `${tree.length} méthode${tree.length > 1 ? "s" : ""}`;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une séance…"
          className="bg-card pl-9"
        />
      </div>

      {/* Fil d'Ariane, toujours visible et cliquable, avec le niveau courant */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <nav className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground" aria-label="Fil d'Ariane">
          <button
            type="button"
            onClick={() => {
              setOpenMethod(null);
              setOpenSequence(null);
            }}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground",
              !method && "font-semibold text-foreground",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Méthodes
          </button>
          {method ? (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <button
                type="button"
                onClick={() => setOpenSequence(null)}
                className={cn(
                  "min-w-0 truncate rounded-md px-1.5 py-1 transition-colors hover:bg-secondary hover:text-foreground",
                  !sequence && "font-semibold text-foreground",
                )}
              >
                {method.label}
              </button>
            </>
          ) : null}
          {sequence ? (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="min-w-0 truncate px-1 font-semibold text-foreground">
                {sequence.label}
              </span>
            </>
          ) : null}
        </nav>
        <span className="shrink-0 rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[0.68rem] font-medium text-muted-foreground">
          {levelBadge}
        </span>
      </div>

      <div className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1">
        {(q ? results.length === 0 : tree.length === 0) ? (
          <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            Aucune ressource trouvée.
          </p>
        ) : null}

        {/* Recherche · résultats plats */}
        {q
          ? results.map(({ session, path }) => (
              <SessionRow
                key={session.id}
                label={session.label}
                hint={path}
                done={session.done}
                selected={session.id === selectedResourceId}
                onClick={() => onSelect(session)}
              />
            ))
          : null}

        {/* Palier 1 · méthodes */}
        {!q && !method
          ? tree.map((m) => {
              const all = m.sequences.flatMap((s) => s.sessions);
              const done = all.filter((s) => s.done).length;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setOpenMethod(m.id);
                    setOpenSequence(null);
                  }}
                  className="card-surface flex w-full items-center gap-2.5 px-3 py-3 text-left transition-colors duration-150 hover:bg-secondary"
                >
                  <span
                    className={cn("h-2.5 w-2.5 shrink-0 rounded-full", SUBJECT_DOT[m.subject])}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {m.sequences.length} séquences · {all.length} séances
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                    {done}/{all.length}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              );
            })
          : null}

        {/* Palier 2 · séquences / périodes */}
        {!q && method && !sequence
          ? method.sequences.map((seq) => {
              const seqDone = seq.sessions.filter((s) => s.done).length;
              return (
                <button
                  key={seq.id}
                  type="button"
                  onClick={() => setOpenSequence(seq.id)}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors duration-150 hover:bg-secondary"
                >
                  <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{seq.label}</span>
                    <Progress
                      value={(seqDone / seq.sessions.length) * 100}
                      className="mt-1.5 h-1"
                      aria-label={`Progression : ${seqDone} séances sur ${seq.sessions.length}`}
                    />
                  </span>
                  <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                    {seqDone}/{seq.sessions.length}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              );
            })
          : null}

        {/* Palier 3 · séances */}
        {!q && sequence
          ? sequence.sessions.map((s) => (
              <SessionRow
                key={s.id}
                label={s.label}
                done={s.done}
                selected={s.id === selectedResourceId}
                onClick={() => onSelect(s)}
              />
            ))
          : null}
      </div>
    </div>
  );
}

function SessionRow({
  label,
  hint,
  done,
  selected,
  onClick,
}: {
  label: string;
  hint?: string;
  done?: boolean;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl border border-transparent bg-card px-3 py-2.5 text-left transition-colors duration-150 hover:border-border hover:bg-secondary",
        selected &&
          "border-primary/30 bg-primary text-primary-foreground shadow-card hover:bg-primary",
      )}
    >
      <span className="min-w-0 flex-1">
        <span className="block text-sm leading-snug">{label}</span>
        {hint ? (
          <span
            className={cn(
              "block truncate text-xs",
              selected ? "opacity-80" : "text-muted-foreground",
            )}
          >
            {hint}
          </span>
        ) : null}
      </span>
      {done ? <Check className={cn("h-4 w-4 shrink-0", selected ? "" : "text-sage")} /> : null}
    </button>
  );
}
