import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarRange,
  CheckCircle2,
  ChevronRight,
  Circle,
  FolderOpen,
  LibraryBig,
  Maximize2,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { NotebookCover } from "@/components/ardoise/correction/notebook-cover";
import { AppShell } from "@/components/ardoise/app-shell";
import { PrepSheetView } from "@/components/ardoise/prep-sheet-view";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { SUBJECT_DOT } from "@/components/ardoise/subject-styles";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { SUBJECTS, type ResourceMethod, type ResourceSequence, type ResourceSession } from "@/lib/ardoise-data";
import { loadMergedResourceTree, loadPatchedPrepSheet } from "@/lib/resource-library";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ressources")({
  head: () => ({
    meta: [
      { title: "Fiches de prep — Ardoise" },
      {
        name: "description",
        content:
          "Retrouvez les séances prêtes à l'emploi avec leur fiche de préparation détaillée, distinctement des programmations.",
      },
      { property: "og:title", content: "Fiches de prep — Ardoise" },
      {
        property: "og:description",
        content: "Toutes les séances et leurs fiches de prep CE1, séparées des programmations.",
      },
    ],
  }),
  component: ResourcesPage,
});

type Screen = "bibliotheque" | "sommaire" | "seance";

const METHOD_COVER_STYLES: Record<string, { spine: string; subtitle: string }> = {
  "m-cleo": { spine: "bg-sky-500", subtitle: "Cahier de français" },
  "m-maths-ce1": { spine: "bg-violet-500", subtitle: "Guide du maître" },
  "m-maths-ce1-ateliers-problemes-p1": { spine: "bg-rose-500", subtitle: "Ateliers problèmes" },
  "m-maths-ce1-calcul-mental-p1": { spine: "bg-amber-500", subtitle: "Calcul mental" },
  "m-maths-ce1-flash-maths-p1": { spine: "bg-emerald-500", subtitle: "Flash maths" },
  "m-langage-oral-ce": { spine: "bg-indigo-500", subtitle: "Langage oral" },
};

function methodCoverMeta(method: ResourceMethod) {
  return (
    METHOD_COVER_STYLES[method.id] ?? {
      spine: "bg-slate-500",
      subtitle: SUBJECTS[method.subject].label,
    }
  );
}

function ResourcesPage() {
  const [resourceTree, setResourceTree] = useState<ResourceMethod[]>([]);
  const [query, setQuery] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<ResourceMethod | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<ResourceSequence | null>(null);
  const [selectedSession, setSelectedSession] = useState<ResourceSession | null>(null);
  const [screen, setScreen] = useState<Screen>("bibliotheque");
  const [openingMethodId, setOpeningMethodId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [sheet, setSheet] = useState<Awaited<ReturnType<typeof loadPatchedPrepSheet>>>();

  useEffect(() => {
    let active = true;
    void loadMergedResourceTree().then((merged) => {
      if (!active) return;
      setResourceTree(merged);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    void loadPatchedPrepSheet(selectedSession?.prepSheetId).then((nextSheet) => {
      if (active) setSheet(nextSheet);
    });
    return () => {
      active = false;
    };
  }, [selectedSession?.prepSheetId]);

  const q = query.trim().toLowerCase();
  const searchResults = useMemo(() => {
    if (!q) return [];
    const out: Array<{
      method: ResourceMethod;
      sequence: ResourceSequence;
      session: ResourceSession;
    }> = [];
    for (const method of resourceTree) {
      for (const sequence of method.sequences) {
        for (const session of sequence.sessions) {
          if (
            session.label.toLowerCase().includes(q) ||
            sequence.label.toLowerCase().includes(q) ||
            method.label.toLowerCase().includes(q)
          ) {
            out.push({ method, sequence, session });
          }
        }
      }
    }
    return out.slice(0, 120);
  }, [q, resourceTree]);

  const previousSession =
    selectedSequence && selectedSession
      ? (() => {
          const index = selectedSequence.sessions.findIndex((item) => item.id === selectedSession.id);
          return index > 0 ? selectedSequence.sessions[index - 1] : null;
        })()
      : null;

  const nextSession =
    selectedSequence && selectedSession
      ? (() => {
          const index = selectedSequence.sessions.findIndex((item) => item.id === selectedSession.id);
          return index >= 0 && index < selectedSequence.sessions.length - 1
            ? selectedSequence.sessions[index + 1]
            : null;
        })()
      : null;

  function openMethod(method: ResourceMethod) {
    setOpeningMethodId(method.id);
    window.setTimeout(() => {
      setSelectedMethod(method);
      setSelectedSequence(null);
      setSelectedSession(null);
      setScreen("sommaire");
      setOpeningMethodId(null);
    }, 260);
  }

  function openSequence(sequence: ResourceSequence) {
    setSelectedSequence(sequence);
    setSelectedSession(sequence.sessions[0] ?? null);
    setScreen("seance");
  }

  function backToLibrary() {
    setScreen("bibliotheque");
    setSelectedMethod(null);
    setSelectedSequence(null);
    setSelectedSession(null);
    setQuery("");
  }

  function backToSummary() {
    setScreen("sommaire");
    setSelectedSequence(null);
    setSelectedSession(null);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Préparer"
          title="Fiches de prep"
          description=""
        />

        <SecondaryPageLinks className="md:grid-cols-2">
          <SecondaryPageLinkCard
            to="/programmation"
            icon={BookOpen}
            title="Programmations"
            description="Retrouver les modules, périodes et séquences pour suivre la progression."
          />
          <SecondaryPageLinkCard
            to="/programmation-annuelle"
            icon={CalendarRange}
            title="Programmation annuelle"
            description="Revoir la trame d'année, les répartitions et les projections hebdomadaires."
          />
        </SecondaryPageLinks>

        {screen === "bibliotheque" ? (
          <section className="mt-6">
            <div className="flex flex-wrap items-start justify-center gap-6 sm:justify-start">
              {resourceTree.map((method) => {
                const cover = methodCoverMeta(method);
                return (
                  <NotebookCover
                    key={method.id}
                    title={method.label}
                    subtitle={cover.subtitle}
                    spineClassName={cover.spine}
                    icon={<LibraryBig className="h-5 w-5" />}
                    opening={openingMethodId === method.id}
                    onClick={() => openMethod(method)}
                  />
                );
              })}
            </div>
          </section>
        ) : null}

        {screen === "sommaire" && selectedMethod ? (
          <section className="mt-6 max-w-3xl">
            <div className="space-y-4">
              <header className="rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-4 shadow-card sm:p-5">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={backToLibrary}>
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Bibliothèque
                  </Button>
                </div>
                <p className="eyebrow mt-3">Sommaire du guide</p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                  {selectedMethod.label}
                </h2>
              </header>

              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Rechercher dans ce support…"
                  className="rounded-2xl border-border/70 bg-card/85 pl-9 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                {(q
                  ? searchResults.filter((item) => item.method.id === selectedMethod.id).map((item) => item.sequence)
                  : selectedMethod.sequences
                )
                  .filter((sequence, index, array) => array.findIndex((item) => item.id === sequence.id) === index)
                  .map((sequence) => {
                    const done = sequence.sessions.filter((item) => item.done).length;
                    return (
                      <button
                        key={sequence.id}
                        type="button"
                        onClick={() => openSequence(sequence)}
                        className="flex w-full items-center gap-3 rounded-[24px] border border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_18%,transparent))] px-4 py-3.5 text-left shadow-card transition-colors hover:bg-secondary"
                      >
                        <FolderOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold text-foreground">
                            {sequence.label}
                          </span>
                          <Progress
                            value={sequence.sessions.length > 0 ? (done / sequence.sessions.length) * 100 : 0}
                            className="mt-2 h-1"
                          />
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {sequence.sessions.length} séance{sequence.sessions.length > 1 ? "s" : ""}
                          </span>
                        </span>
                        <span className="shrink-0 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground">
                          {done}/{sequence.sessions.length}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </button>
                    );
                  })}
              </div>
            </div>
          </section>
        ) : null}

        {screen === "seance" && selectedMethod && selectedSequence ? (
          <section className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="space-y-4">
              <header className="rounded-[30px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-4 shadow-card sm:p-5">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={backToSummary}>
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Sommaire
                  </Button>
                </div>
                <p className="eyebrow mt-3">Séances dans l’ordre du guide</p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                  {selectedSequence.label}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{selectedMethod.label}</p>
              </header>

              <div className="space-y-2">
                {selectedSequence.sessions.map((session) => (
                  <SessionRow
                    key={session.id}
                    label={session.label}
                    done={session.done}
                    selected={selectedSession?.id === session.id}
                    onClick={() => setSelectedSession(session)}
                  />
                ))}
              </div>
            </div>

            <aside className="lg:sticky lg:top-20 lg:self-start">
              <div className="card-surface flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[28px] border-primary/8 shadow-card">
                <div className="flex items-start justify-between gap-3 border-b border-border bg-secondary/30 px-4 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="eyebrow">Aperçu de la fiche</p>
                    {selectedSession ? (
                      <>
                        <p className="mt-1 flex items-center gap-2 truncate text-sm font-semibold text-foreground">
                          {sheet ? (
                            <span
                              className={cn(
                                "h-2 w-2 shrink-0 rounded-full",
                                SUBJECT_DOT[sheet.subject],
                              )}
                            />
                          ) : null}
                          <span className="truncate">{selectedSession.label}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {sheet ? SUBJECTS[sheet.subject].label : ""}
                        </p>
                      </>
                    ) : (
                      <p className="mt-1 text-sm font-semibold text-foreground">
                        Aucune séance sélectionnée
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 px-0"
                      aria-label="Séance précédente"
                      disabled={!previousSession}
                      onClick={() => previousSession && setSelectedSession(previousSession)}
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 px-0"
                      aria-label="Séance suivante"
                      disabled={!nextSession}
                      onClick={() => nextSession && setSelectedSession(nextSession)}
                    >
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                    {sheet ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5"
                        onClick={() => setExpanded(true)}
                      >
                        <Maximize2 className="mr-1.5 h-3.5 w-3.5" />
                        Agrandir
                      </Button>
                    ) : null}
                  </div>
                </div>

                {sheet ? (
                  <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                    <PrepSheetView sheet={sheet} stickyHeader={false} />
                  </div>
                ) : (
                  <div className="m-4 rounded-[24px] border border-dashed border-border bg-secondary/20 p-4 text-sm text-muted-foreground">
                    Sélectionne une séance pour lire sa fiche de préparation.
                  </div>
                )}
              </div>
            </aside>
          </section>
        ) : null}

        {q && screen === "sommaire" && selectedMethod ? (
          <section className="mt-5 rounded-[24px] border border-border bg-card p-4 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold text-foreground">Recherche rapide</p>
            </div>
            {searchResults.filter((item) => item.method.id === selectedMethod.id).length > 0 ? (
              <ul className="mt-3 space-y-2">
                {searchResults
                  .filter((item) => item.method.id === selectedMethod.id)
                  .map((item) => (
                    <li key={`${item.sequence.id}-${item.session.id}`}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSequence(item.sequence);
                          setSelectedSession(item.session);
                          setScreen("seance");
                        }}
                        className="flex w-full items-start gap-2 rounded-2xl border border-border bg-secondary/20 px-3 py-2.5 text-left transition-colors hover:bg-secondary"
                      >
                        <Search className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">
                            {item.session.label}
                          </span>
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {item.sequence.label}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                Aucun résultat dans ce support.
              </p>
            )}
          </section>
        ) : null}

        <Dialog open={expanded && !!sheet} onOpenChange={setExpanded}>
          <DialogContent className="flex max-h-[88vh] w-[min(56rem,94vw)] max-w-none flex-col gap-0 overflow-hidden p-0 sm:max-w-none">
            <DialogHeader className="border-b border-border bg-secondary/40 px-6 py-4 text-left">
              <DialogTitle className="pr-8 text-lg">Fiche de préparation</DialogTitle>
              <DialogDescription className="flex items-center gap-2">
                {sheet ? (
                  <>
                    <span
                      className={cn("h-2 w-2 shrink-0 rounded-full", SUBJECT_DOT[sheet.subject])}
                    />
                    {SUBJECTS[sheet.subject].label}
                    {selectedSession ? <span className="truncate">· {selectedSession.label}</span> : null}
                  </>
                ) : null}
              </DialogDescription>
            </DialogHeader>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              {sheet ? <PrepSheetView sheet={sheet} stickyHeader={false} /> : null}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  );
}

function SessionRow({
  label,
  done,
  selected,
  onClick,
}: {
  label: string;
  done?: boolean;
  selected?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-start gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 text-left transition-colors duration-150 hover:bg-secondary",
        selected &&
          "border-primary/40 bg-primary text-primary-foreground shadow-card hover:bg-primary",
      )}
    >
      {done ? (
        <CheckCircle2 className={cn("mt-0.5 h-4 w-4 shrink-0", selected ? "" : "text-sage")} />
      ) : (
        <Circle className="mt-0.5 h-4 w-4 shrink-0 opacity-40" />
      )}
      <span className="min-w-0 flex-1">
        <span className="block text-sm leading-snug">{label}</span>
      </span>
    </button>
  );
}
