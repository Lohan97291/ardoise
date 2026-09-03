import { createFileRoute } from "@tanstack/react-router";
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

type Screen = "bibliotheque" | "rayon" | "sommaire" | "seance";
type LibraryScope = "guides" | "personal";

type ResourceShelf = {
  id: string;
  label: string;
  subtitle: string;
  spine: string;
  methods: ResourceMethod[];
  forceShelf?: boolean;
};

type ResourceGuideGroup = {
  id: string;
  label: string;
  subtitle: string;
  spine: string;
  methodIds: string[];
};

const METHOD_COVER_STYLES: Record<string, { spine: string; subtitle: string }> = {
  "m-cleo": { spine: "bg-sky-500", subtitle: "Cahier de français" },
  "m-maths-ce1-guide": { spine: "bg-violet-500", subtitle: "Guide enseignant" },
  "m-maths-ce1-p1-atelier-problemes": { spine: "bg-rose-500", subtitle: "Période 1" },
  "m-maths-ce1-p1-calcul-mental": { spine: "bg-amber-500", subtitle: "Période 1" },
  "m-maths-ce1-p1-flash-maths": { spine: "bg-emerald-500", subtitle: "Période 1" },
  "m-langage-oral-ce": { spine: "bg-indigo-500", subtitle: "Sommaire officiel" },
  "m-langage-oral-ce-domaines": { spine: "bg-blue-500", subtitle: "Domaines" },
  "m-orthographemic-guide": { spine: "bg-rose-500", subtitle: "Guide du maître" },
  "m-mdi-production-ecrit": { spine: "bg-fuchsia-500", subtitle: "Production d'écrit" },
  "m-mdi-ecriture-transition": { spine: "bg-cyan-500", subtitle: "Écriture / copie" },
  "m-qlm-mdi-guide": { spine: "bg-teal-500", subtitle: "Guide enseignant" },
  "m-well-done-ce1": { spine: "bg-lime-500", subtitle: "Anglais" },
  "m-vivre-la-musique-ce1": { spine: "bg-orange-500", subtitle: "Éducation musicale" },
  "m-emc-ce1": { spine: "bg-stone-600", subtitle: "Guide du maître" },
  "m-premiere-journee-ce1": { spine: "bg-slate-600", subtitle: "Rentrée" },
};

const MATHS_CE1_METHOD_ORDER = [
  "m-maths-ce1-guide",
  "m-maths-ce1-p1-atelier-problemes",
  "m-maths-ce1-p1-calcul-mental",
  "m-maths-ce1-p1-flash-maths",
];

const RESOURCE_GUIDE_GROUPS: ResourceGuideGroup[] = [
  {
    id: "shelf-francais-ce1",
    label: "Français CE1",
    subtitle: "Cléo · Oral · Écriture · Production d'écrit",
    spine: "bg-sky-500",
    methodIds: [
      "m-cleo",
      "m-langage-oral-ce",
      "m-orthographemic-guide",
      "m-mdi-production-ecrit",
      "m-mdi-ecriture-transition",
    ],
  },
  {
    id: "shelf-maths-ce1",
    label: "Maths en CE1 - ACCÈS",
    subtitle: "Guide + rituels",
    spine: "bg-violet-500",
    methodIds: MATHS_CE1_METHOD_ORDER,
  },
  {
    id: "shelf-qlm-ce1",
    label: "Questionner le monde",
    subtitle: "MDI · guide enseignant",
    spine: "bg-teal-500",
    methodIds: ["m-qlm-mdi-guide"],
  },
  {
    id: "shelf-lve-arts-ce1",
    label: "Langues et arts",
    subtitle: "Anglais · musique",
    spine: "bg-orange-500",
    methodIds: ["m-well-done-ce1", "m-vivre-la-musique-ce1"],
  },
  {
    id: "shelf-emc-ce1",
    label: "EMC CE1",
    subtitle: "Enseignement moral et civique",
    spine: "bg-stone-600",
    methodIds: ["m-emc-ce1"],
  },
  {
    id: "shelf-eps-ce1",
    label: "EPS",
    subtitle: "Vivre l'EPS (Accès)",
    spine: "bg-rose-500",
    methodIds: ["m-eps-courir", "m-eps-sauter", "m-eps-jeux-collectifs", "m-eps-jeux-opposition"],
  },
];

function isMathsCe1Method(method: ResourceMethod) {
  return method.id.startsWith("m-maths-ce1");
}

function isLangageOralMethod(method: ResourceMethod) {
  return method.id.startsWith("m-langage-oral-ce");
}

function methodCoverMeta(method: ResourceMethod) {
  return (
    METHOD_COVER_STYLES[method.id] ?? {
      spine: "bg-slate-500",
      subtitle: SUBJECTS[method.subject].label,
    }
  );
}

function methodCoverTitle(method: ResourceMethod) {
  if (isMathsCe1Method(method)) return method.label.replace(/^Maths en CE1\s*[—-]\s*/i, "");
  if (isLangageOralMethod(method)) return method.label.replace(/^Langage oral CE\s*[—-]\s*/i, "");
  return method.label;
}

function ResourcesPage() {
  const [resourceTree, setResourceTree] = useState<ResourceMethod[]>([]);
  const [query, setQuery] = useState("");
  const [libraryQuery, setLibraryQuery] = useState("");
  const [libraryScope, setLibraryScope] = useState<LibraryScope>("guides");
  const [selectedShelf, setSelectedShelf] = useState<ResourceShelf | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<ResourceMethod | null>(null);
  const [selectedSequence, setSelectedSequence] = useState<ResourceSequence | null>(null);
  const [selectedSession, setSelectedSession] = useState<ResourceSession | null>(null);
  const [screen, setScreen] = useState<Screen>("bibliotheque");
  const [openingMethodId, setOpeningMethodId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [sheet, setSheet] = useState<Awaited<ReturnType<typeof loadPatchedPrepSheet>>>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    void loadMergedResourceTree().then((merged) => {
      if (!active) return;
      setResourceTree(merged);
      setLoaded(true);
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
  const libraryQ = libraryQuery.trim().toLowerCase();
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

  const libraryShelves = useMemo<ResourceShelf[]>(() => {
    const methodById = new Map(resourceTree.map((method) => [method.id, method]));
    const groupedMethodIds = new Set(RESOURCE_GUIDE_GROUPS.flatMap((group) => group.methodIds));
    const shelves: ResourceShelf[] = RESOURCE_GUIDE_GROUPS.map((group) => ({
      id: group.id,
      label: group.label,
      subtitle: group.subtitle,
      spine: group.spine,
      methods: group.methodIds
        .map((methodId) => methodById.get(methodId))
        .filter((method): method is ResourceMethod => Boolean(method)),
    })).filter((shelf) => shelf.methods.length > 0);

    resourceTree
      .filter((method) => !groupedMethodIds.has(method.id))
      .forEach((method, index) => {
        if (index === 0) {
          shelves.push({
            id: "shelf-personal-resources",
            label: "Mes séquences",
            subtitle: "Créations personnelles",
            spine: "bg-slate-700",
            methods: [],
            forceShelf: true,
          });
        }

        const personalShelf = shelves.find((shelf) => shelf.id === "shelf-personal-resources");
        personalShelf?.methods.push(method);
      });

    return shelves;
  }, [resourceTree]);

  const scopedShelves = useMemo(() => {
    return libraryShelves.filter((shelf) =>
      libraryScope === "personal"
        ? shelf.id === "shelf-personal-resources"
        : shelf.id !== "shelf-personal-resources",
    );
  }, [libraryScope, libraryShelves]);

  const filteredShelves = useMemo(() => {
    if (!libraryQ) return scopedShelves;
    return scopedShelves.filter((shelf) => {
      const inShelf =
        shelf.label.toLowerCase().includes(libraryQ) ||
        shelf.subtitle.toLowerCase().includes(libraryQ);
      const inChild = shelf.methods.some((method) => {
        const cover = methodCoverMeta(method);
        const subjectLabel = SUBJECTS[method.subject].label.toLowerCase();
        return (
          method.label.toLowerCase().includes(libraryQ) ||
          cover.subtitle.toLowerCase().includes(libraryQ) ||
          subjectLabel.includes(libraryQ)
        );
      });
      return inShelf || inChild;
    });
  }, [libraryQ, scopedShelves]);

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

  function openMethod(method: ResourceMethod, shelf?: ResourceShelf | null) {
    setOpeningMethodId(method.id);
    window.setTimeout(() => {
      setSelectedShelf(shelf ?? null);
      setSelectedMethod(method);
      setSelectedSequence(null);
      setSelectedSession(null);
      setScreen("sommaire");
      setOpeningMethodId(null);
    }, 260);
  }

  function openShelf(shelf: ResourceShelf) {
    if (shelf.methods.length === 1 && !shelf.forceShelf) {
      openMethod(shelf.methods[0], shelf);
      return;
    }

    setSelectedShelf(shelf);
    setSelectedMethod(null);
    setSelectedSequence(null);
    setSelectedSession(null);
    setScreen("rayon");
  }

  function openSequence(sequence: ResourceSequence) {
    setSelectedSequence(sequence);
    setSelectedSession(sequence.sessions[0] ?? null);
    setScreen("seance");
  }

  function backToLibrary() {
    setScreen("bibliotheque");
    setSelectedShelf(null);
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

  function backFromSummary() {
    if (selectedShelf && selectedShelf.methods.length > 1) {
      setScreen("rayon");
      setSelectedMethod(null);
      setSelectedSequence(null);
      setSelectedSession(null);
      setQuery("");
      return;
    }

    backToLibrary();
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Préparer"
          title="Fiches de prep"
          description=""
        />

        <SecondaryPageLinks className="gap-2.5 md:grid-cols-2">
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
            <div className="mb-4 flex flex-col gap-3 rounded-[24px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-3.5 shadow-card sm:mb-5 sm:rounded-[28px] sm:p-4 md:flex-row md:items-center md:justify-between">
              <div className="flex w-fit rounded-2xl border border-border/70 bg-card/80 p-1 shadow-sm">
                {[
                  { id: "guides", label: "Guides du maître" },
                  { id: "personal", label: "Mes séquences" },
                ].map((scope) => (
                  <button
                    key={scope.id}
                    type="button"
                    onClick={() => setLibraryScope(scope.id as LibraryScope)}
                    className={cn(
                      "rounded-xl px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors sm:px-4 sm:text-sm",
                      libraryScope === scope.id &&
                        "bg-primary text-primary-foreground shadow-sm",
                    )}
                  >
                    {scope.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full sm:max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={libraryQuery}
                  onChange={(event) => setLibraryQuery(event.target.value)}
                  placeholder="Retrouver un support…"
                  className="rounded-2xl border-border/70 bg-card/85 pl-9 shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-center gap-3 sm:justify-start sm:gap-6">
              {!loaded
                ? Array.from({ length: 6 }, (_, index) => (
                    <div
                      key={`resource-skeleton-${index}`}
                      className="h-52 w-36 animate-pulse rounded-[24px] border border-border/60 bg-secondary/45 shadow-card min-[380px]:h-56 min-[380px]:w-40 sm:h-[244px] sm:w-[188px] sm:rounded-[28px]"
                    />
                  ))
                : filteredShelves.map((shelf) => {
                return (
                  <NotebookCover
                    key={shelf.id}
                    title={shelf.label}
                    subtitle={shelf.subtitle}
                    spineClassName={shelf.spine}
                    icon={<LibraryBig className="h-5 w-5" />}
                    opening={shelf.methods.some((method) => openingMethodId === method.id)}
                    onClick={() => openShelf(shelf)}
                  />
                );
              })}
            </div>
            {loaded && filteredShelves.length === 0 ? (
              <div className="mt-5 rounded-[24px] border border-dashed border-border bg-card/70 px-5 py-8 text-center text-sm text-muted-foreground">
                {libraryScope === "personal" && !libraryQ
                  ? "Aucune séquence pour l’instant."
                  : "Aucun support ne correspond à cette recherche."}
              </div>
            ) : null}
          </section>
        ) : null}

        {screen === "rayon" && selectedShelf ? (
          <section className="mt-6">
            <div className="space-y-4">
              <header className="rounded-[24px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-3.5 shadow-card sm:rounded-[30px] sm:p-5">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={backToLibrary}>
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    Bibliothèque
                  </Button>
                </div>
                <p className="eyebrow mt-3">
                  {selectedShelf.id === "shelf-personal-resources" ? "Mes séquences" : "Guides du maître"}
                </p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                  {selectedShelf.label}
                </h2>
              </header>

              <div className="flex flex-wrap items-start justify-center gap-3 sm:justify-start sm:gap-6">
                {selectedShelf.methods.map((method) => {
                  const cover = methodCoverMeta(method);
                  return (
                    <NotebookCover
                      key={method.id}
                      title={methodCoverTitle(method)}
                      subtitle={cover.subtitle}
                      spineClassName={cover.spine}
                      icon={<LibraryBig className="h-5 w-5" />}
                      opening={openingMethodId === method.id}
                      onClick={() => openMethod(method, selectedShelf)}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {screen === "sommaire" && selectedMethod ? (
          <section className="mt-6 max-w-3xl">
            <div className="space-y-4">
              <header className="rounded-[24px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-3.5 shadow-card sm:rounded-[30px] sm:p-5">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2.5" onClick={backFromSummary}>
                    <ArrowLeft className="mr-1.5 h-4 w-4" />
                    {selectedShelf?.id === "shelf-personal-resources"
                      ? "Mes séquences"
                      : selectedShelf && selectedShelf.methods.length > 1
                        ? "Guides"
                        : "Bibliothèque"}
                  </Button>
                </div>
                <p className="eyebrow mt-3">Sommaire du guide</p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-foreground">
                  {selectedMethod.label}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground">
                    {selectedMethod.sequences.length} partie{selectedMethod.sequences.length > 1 ? "s" : ""}
                  </span>
                  <span className="rounded-full border border-border bg-card px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground">
                    {selectedMethod.sequences.reduce((total, sequence) => total + sequence.sessions.length, 0)} séance{selectedMethod.sequences.reduce((total, sequence) => total + sequence.sessions.length, 0) > 1 ? "s" : ""}
                  </span>
                </div>
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
                        className="flex w-full items-center gap-3 rounded-[20px] border border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_18%,transparent))] px-3.5 py-3 text-left shadow-card transition-colors hover:bg-secondary sm:rounded-[24px] sm:px-4 sm:py-3.5"
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
          <section className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-5">
            <div className="space-y-4">
              <header className="rounded-[24px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_24%,transparent))] p-3.5 shadow-card sm:rounded-[30px] sm:p-5">
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

            <aside className="order-first lg:order-none lg:sticky lg:top-20 lg:z-10 lg:self-start">
              <div className="card-surface flex max-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-[28px] border-primary/8 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border bg-secondary/30 px-3.5 py-3 sm:px-4 sm:py-3.5">
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
                  <div className="flex shrink-0 flex-wrap items-center gap-1.5">
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
                  <div className="min-h-0 flex-1 overflow-y-auto px-3 py-3.5 sm:px-4 sm:py-4">
                    <PrepSheetView sheet={sheet} stickyHeader={false} />
                  </div>
                ) : (
                  <div className="m-4 rounded-[24px] border border-dashed border-border bg-secondary/20 p-4 text-sm text-muted-foreground">
                    Sélectionne une séance.
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
