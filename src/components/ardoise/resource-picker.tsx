import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  FolderOpen,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  SUBJECT_BAND,
  SUBJECT_EMOJI,
  SUBJECT_SHORT_LABEL,
} from "@/components/ardoise/subject-styles";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { type ResourceMethod, type ResourceSession, type ResourceSequence, type SubjectKey } from "@/lib/ardoise-data";
import { loadMergedResourceTree } from "@/lib/resource-library";
import { cn } from "@/lib/utils";

type Props = {
  selectedResourceId?: string;
  onSelect: (session: ResourceSession) => void;
};

const PERIOD_RE = /^Période (\d)$/;
function periodNumberOf(seq: ResourceSequence): number | null {
  const m = seq.label.match(PERIOD_RE);
  return m ? Number(m[1]) : null;
}

/** Séances non faites d'abord, faites repoussées en bas (ordre d'origine conservé). */
function orderSessions(sessions: ResourceSession[], hideDone: boolean): ResourceSession[] {
  if (hideDone) return sessions.filter((s) => !s.done);
  const undone = sessions.filter((s) => !s.done);
  const done = sessions.filter((s) => s.done);
  return [...undone, ...done];
}

type Reprendre =
  | { kind: "reprendre" | "suite"; session: ResourceSession; method: ResourceMethod; sequence: ResourceSequence }
  | null;

/**
 * Arborescence en fil d'Ariane : matière → méthode → séquence/période → séance.
 * Un seul palier visible à la fois, plus aéré et plus rapide à parcourir.
 *
 * Confort de navigation :
 *  - bloc « Suite logique » en accueil pour retomber sur la prochaine séance ;
 *  - masquage / repousse des séances déjà faites ;
 *  - navigation clavier (↑ ↓ Entrée, Retour arrière / Échap pour remonter) ;
 *  - filtre par période directement depuis la matière.
 */
export function ResourcePicker({ selectedResourceId, onSelect }: Props) {
  const [patchedTree, setPatchedTree] = useState<ResourceMethod[]>([]);
  const [query, setQuery] = useState("");
  const [openSubject, setOpenSubject] = useState<SubjectKey | null>(null);
  const [openMethod, setOpenMethod] = useState<string | null>(null);
  const [openSequence, setOpenSequence] = useState<string | null>(null);
  const [periodFilter, setPeriodFilter] = useState<string | null>(null);
  const [hideDone, setHideDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    void loadMergedResourceTree().then((tree) => {
      if (!active) return;
      setPatchedTree(tree);
      // Ouvre directement la branche de la séance déjà rattachée.
      if (!selectedResourceId) return;
      for (const m of tree) {
        for (const seq of m.sequences) {
          if (seq.sessions.some((s) => s.id === selectedResourceId)) {
            setOpenSubject(m.subject);
            setOpenMethod(m.id);
            setOpenSequence(seq.id);
            return;
          }
        }
      }
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  /** Palier 0 · matières, avec les méthodes regroupées dessous. */
  const subjects = useMemo(() => {
    const groups = new Map<SubjectKey, ResourceMethod[]>();
    for (const method of tree) {
      const list = groups.get(method.subject) ?? [];
      list.push(method);
      groups.set(method.subject, list);
    }
    return [...groups.entries()]
      .map(([key, methods]) => {
        const sessions = methods.flatMap((m) => m.sequences.flatMap((s) => s.sessions));
        return {
          key,
          label: SUBJECT_SHORT_LABEL[key] ?? key,
          methods,
          total: sessions.length,
          done: sessions.filter((s) => s.done).length,
        };
      })
      .sort((a, b) => a.label.localeCompare(b.label, "fr"));
  }, [tree]);

  /** Résultats plats (avec chemin) quand une recherche est en cours. */
  const results = useMemo(() => {
    if (!q) return [];
    const out: { session: ResourceSession; path: string }[] = [];
    for (const m of tree) {
      for (const seq of m.sequences) {
        for (const s of orderSessions(seq.sessions, hideDone))
          out.push({
            session: s,
            path: `${SUBJECT_EMOJI[m.subject]} ${SUBJECT_SHORT_LABEL[m.subject] ?? m.subject} · ${m.label} · ${seq.label}`,
          });
      }
    }
    return out.slice(0, 80);
  }, [q, tree, hideDone]);

  /** Prochaine séance logique à reprendre, déduite de la séance rattachée. */
  const reprendre = useMemo<Reprendre>(() => {
    if (!selectedResourceId || q) return null;
    for (const m of patchedTree) {
      for (const seq of m.sequences) {
        const idx = seq.sessions.findIndex((s) => s.id === selectedResourceId);
        if (idx === -1) continue;
        const selected = seq.sessions[idx]!;
        if (!selected.done) {
          return { kind: "reprendre", session: selected, method: m, sequence: seq };
        }
        const nextSame = seq.sessions.slice(idx + 1).find((s) => !s.done);
        if (nextSame) {
          return { kind: "suite", session: nextSame, method: m, sequence: seq };
        }
        for (const s2 of m.sequences) {
          if (s2.id === seq.id) continue;
          const found = s2.sessions.find((s) => !s.done);
          if (found) return { kind: "suite", session: found, method: m, sequence: s2 };
        }
        return null;
      }
    }
    return null;
  }, [selectedResourceId, patchedTree, q]);

  const subject = q ? null : (subjects.find((s) => s.key === openSubject) ?? null);
  const method = subject?.methods.find((m) => m.id === openMethod) ?? null;
  const sequence = method?.sequences.find((s) => s.id === openSequence) ?? null;

  /** Périodes disponibles pour la matière courante (séquences « Période N »). */
  const subjectPeriods = useMemo(() => {
    if (!subject) return [];
    const set = new Set<number>();
    for (const m of subject.methods)
      for (const seq of m.sequences) {
        const n = periodNumberOf(seq);
        if (n) set.add(n);
      }
    return [...set].sort((a, b) => a - b);
  }, [subject]);

  /** Liste aplatie des séances d'une période, tous méthodes confondues. */
  const periodSessions = useMemo(() => {
    if (!subject || !periodFilter) return [];
    const p = Number(periodFilter);
    const out: { session: ResourceSession; method: ResourceMethod }[] = [];
    for (const m of subject.methods) {
      for (const seq of m.sequences) {
        if (periodNumberOf(seq) !== p) continue;
        for (const s of orderSessions(seq.sessions, hideDone)) out.push({ session: s, method: m });
      }
    }
    return out;
  }, [subject, periodFilter, hideDone]);

  const inPeriodView = !!subject && !!periodFilter && !method;

  const levelBadge = q
    ? `${results.length} résultat${results.length > 1 ? "s" : ""}`
    : sequence
      ? `${sequence.sessions.length} séance${sequence.sessions.length > 1 ? "s" : ""}`
      : method
        ? `${method.sequences.length} séquence${method.sequences.length > 1 ? "s" : ""}`
        : inPeriodView
          ? `${periodSessions.length} séance${periodSessions.length > 1 ? "s" : ""}`
          : subject
            ? `${subject.methods.length} méthode${subject.methods.length > 1 ? "s" : ""}`
            : `${subjects.length} matière${subjects.length > 1 ? "s" : ""}`;

  const resetToRoot = () => {
    setOpenSubject(null);
    setOpenMethod(null);
    setOpenSequence(null);
    setPeriodFilter(null);
  };

  const goUp = () => {
    if (openSequence) {
      setOpenSequence(null);
      return;
    }
    if (openMethod) {
      setOpenMethod(null);
      return;
    }
    if (periodFilter) {
      setPeriodFilter(null);
      return;
    }
    if (openSubject) {
      setOpenSubject(null);
    }
  };

  /** Navigation clavier : ↑/↓ déplace le focus, Retour arrière / Échap remonte. */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const current = document.activeElement as HTMLElement | null;
    if (current?.tagName === "INPUT") {
      // Dans le champ de recherche : Échap efface.
      if (e.key === "Escape") setQuery("");
      return;
    }
    const items = Array.from(
      scrollRef.current?.querySelectorAll<HTMLButtonElement>("button[data-nav]") ?? [],
    );
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (items.length === 0) return;
      e.preventDefault();
      const idx = items.indexOf(current as HTMLButtonElement);
      const next =
        e.key === "ArrowDown"
          ? items[idx < 0 ? 0 : Math.min(idx + 1, items.length - 1)]
          : items[idx < 0 ? 0 : Math.max(idx - 1, 0)];
      next?.focus();
    } else if (e.key === "Backspace") {
      e.preventDefault();
      goUp();
    } else if (e.key === "Escape") {
      if (q) setQuery("");
      else goUp();
    }
  };

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

      {/* Fil d'Ariane + bascule « séances faites », toujours visibles. */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <nav
          className="flex min-w-0 flex-wrap items-center gap-1 text-xs text-muted-foreground"
          aria-label="Fil d'Ariane"
        >
          <button
            type="button"
            onClick={resetToRoot}
            className={cn(
              "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-1 font-medium transition-colors hover:bg-secondary hover:text-foreground",
              !subject && "font-semibold text-foreground",
            )}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Matières
          </button>
          {subject ? (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <button
                type="button"
                onClick={() => {
                  setOpenMethod(null);
                  setOpenSequence(null);
                  setPeriodFilter(null);
                }}
                className={cn(
                  "min-w-0 truncate rounded-md px-1.5 py-1 transition-colors hover:bg-secondary hover:text-foreground",
                  !method && !inPeriodView && "font-semibold text-foreground",
                )}
              >
                <span aria-hidden>{SUBJECT_EMOJI[subject.key]}</span> {subject.label}
              </button>
            </>
          ) : null}
          {inPeriodView ? (
            <>
              <ChevronRight className="h-3 w-3 shrink-0" />
              <span className="min-w-0 truncate px-1 font-semibold text-foreground">
                Période {periodFilter}
              </span>
            </>
          ) : null}
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
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            onClick={() => setHideDone((v) => !v)}
            aria-pressed={hideDone}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[0.68rem] font-medium transition-colors",
              hideDone
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
            )}
            title="Masquer ou repousser les séances déjà faites"
          >
            {hideDone ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {hideDone ? "Faites masquées" : "Faites en bas"}
          </button>
          <span className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[0.68rem] font-medium text-muted-foreground">
            {levelBadge}
          </span>
        </div>
      </div>

      <div
        ref={scrollRef}
        onKeyDown={onKeyDown}
        className="mt-3 min-h-0 flex-1 space-y-1.5 overflow-y-auto pr-1"
        tabIndex={-1}
      >
        {(q ? results.length === 0 : subjects.length === 0) ? (
          <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            Aucune ressource trouvée.
          </p>
        ) : null}

        {/* Accueil · reprise de la suite logique */}
        {!q && !subject && reprendre ? (
          <button
            type="button"
            data-nav
            onClick={() => onSelect(reprendre.session)}
            className="card-surface group flex w-full items-center gap-3 border border-primary/20 bg-primary/5 px-3 py-3 text-left transition-colors duration-150 hover:bg-primary/10"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"
            >
              {reprendre.kind === "reprendre" ? <Clock className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[0.68rem] font-semibold uppercase tracking-wide text-primary">
                {reprendre.kind === "reprendre" ? "Reprendre la séance" : "Suite logique"}
              </span>
              <span className="block truncate text-sm font-semibold">{reprendre.session.label}</span>
              <span className="block truncate text-xs text-muted-foreground">
                <span aria-hidden>{SUBJECT_EMOJI[reprendre.method.subject]}</span>{" "}
                {reprendre.method.label} · {reprendre.sequence.label}
              </span>
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-primary transition-transform duration-150 group-hover:translate-x-0.5" />
          </button>
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

        {/* Palier 1 · matières */}
        {!q && !subject
          ? subjects.map((s) => (
              <button
                key={s.key}
                type="button"
                data-nav
                onClick={() => {
                  setOpenSubject(s.key);
                  setOpenMethod(null);
                  setOpenSequence(null);
                  setPeriodFilter(null);
                }}
                className="card-surface group flex w-full items-center gap-3 px-3 py-3 text-left transition-colors duration-150 hover:bg-secondary"
              >
                <span
                  aria-hidden
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-base",
                    SUBJECT_BAND[s.key],
                  )}
                >
                  {SUBJECT_EMOJI[s.key]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{s.label}</span>
                  <span className="block text-xs text-muted-foreground">
                    {s.methods.length} méthode{s.methods.length > 1 ? "s" : ""} · {s.total} séances
                  </span>
                  {s.total > 0 ? (
                    <Progress
                      value={(s.done / s.total) * 100}
                      className="mt-1.5 h-1"
                      aria-label={`Progression : ${s.done} séances sur ${s.total}`}
                    />
                  ) : null}
                </span>
                <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 font-mono text-[0.7rem] text-muted-foreground">
                  {s.done}/{s.total}
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5" />
              </button>
            ))
          : null}

        {/* Palier 2 · matière : filtre par période + méthodes */}
        {!q && subject && !method && !inPeriodView ? (
          <>
            {subjectPeriods.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 pb-1">
                <span className="text-[0.68rem] font-medium text-muted-foreground">Période :</span>
                {subjectPeriods.map((p) => (
                  <button
                    key={p}
                    type="button"
                    data-nav
                    onClick={() => setPeriodFilter(String(p))}
                    className="rounded-full border border-border bg-card px-2.5 py-0.5 text-[0.7rem] font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    P{p}
                  </button>
                ))}
              </div>
            ) : null}
            {subject.methods.map((m) => {
              const all = m.sequences.flatMap((s) => s.sessions);
              const done = all.filter((s) => s.done).length;
              return (
                <button
                  key={m.id}
                  type="button"
                  data-nav
                  onClick={() => {
                    setOpenMethod(m.id);
                    setOpenSequence(null);
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-2.5 text-left transition-colors duration-150 hover:bg-secondary"
                >
                  <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{m.label}</span>
                    <span className="block text-xs text-muted-foreground">
                      {m.sequences.length} séquences · {all.length} séances
                    </span>
                  </span>
                  <span className="shrink-0 font-mono text-[0.7rem] text-muted-foreground">
                    {done}/{all.length}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              );
            })}
          </>
        ) : null}

        {/* Matière · vue période aplatie */}
        {!q && subject && inPeriodView
          ? periodSessions.map(({ session, method: m }) => (
              <SessionRow
                key={session.id}
                label={session.label}
                hint={m.label}
                done={session.done}
                selected={session.id === selectedResourceId}
                onClick={() => onSelect(session)}
              />
            ))
          : null}

        {/* Palier 3 · séquences / périodes */}
        {!q && method && !sequence
          ? method.sequences.map((seq) => {
              const seqDone = seq.sessions.filter((s) => s.done).length;
              return (
                <button
                  key={seq.id}
                  type="button"
                  data-nav
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

        {/* Palier 4 · séances */}
        {!q && sequence
          ? orderSessions(sequence.sessions, hideDone).map((s) => (
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

      <p className="mt-2 shrink-0 text-[0.68rem] text-muted-foreground">
        Astuce : naviguez avec les flèches ↑ ↓, Entrée pour ouvrir, Retour arrière pour remonter.
      </p>
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
      data-nav
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
