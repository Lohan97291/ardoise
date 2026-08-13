import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Calculator, ChevronLeft, FileText, LayoutGrid, Maximize2, PenLine, Rows3, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { FullscreenBoard } from "@/components/ardoise/correction/fullscreen-board";
import { NotebookCover } from "@/components/ardoise/correction/notebook-cover";
import { NotebookSummary } from "@/components/ardoise/correction/notebook-summary";
import { PageExerciseView } from "@/components/ardoise/correction/page-exercise-view";
import { SheetCorrectionView } from "@/components/ardoise/correction/sheet-correction-view";
import { SheetCover } from "@/components/ardoise/correction/sheet-cover";
import { StudentModeView } from "@/components/ardoise/correction/student-mode-view";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  notebookCoverMeta,
  notebookPageSummary,
  notebookPages,
  pageLabel,
  type NotebookSource,
} from "@/lib/correction-rapide-notebook";
import {
  getCorrectionMode,
  getLastPage,
  setCorrectionMode,
  setLastPage,
  type CorrectionMode,
} from "@/lib/correction-rapide-store";
import {
  addSheet,
  getSheets,
  removeSheet,
  type CorrectionSheet,
} from "@/lib/correction-sheets-store";
import { cn } from "@/lib/utils";


export const Route = createFileRoute("/correction-rapide")({
  head: () => ({
    meta: [
      { title: "Correction rapide — Ardoise" },
      {
        name: "description",
        content:
          "Corrigez un exercice élève par élève au clavier : flashcard, statuts A/PA/NA/NF/AB et vue classe en un coup d'œil.",
      },
      { property: "og:title", content: "Correction rapide — Ardoise" },
      {
        property: "og:description",
        content:
          "Une flashcard par élève, cinq statuts, des raccourcis clavier : la correction en quelques minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CorrectionRapidePage,
});

const NOTEBOOKS: {
  source: NotebookSource;
  spineClassName: string;
  icon: React.ReactNode;
}[] = [
  { source: "Cléo", spineClassName: "bg-sky-500", icon: <BookOpen className="h-5 w-5" /> },
  { source: "ACCÈS", spineClassName: "bg-violet-500", icon: <Calculator className="h-5 w-5" /> },
  { source: "Orthographémic", spineClassName: "bg-rose-500", icon: <PenLine className="h-5 w-5" /> },
];

type Screen = "accueil" | "sommaire" | "page" | "feuille";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/** "2026-08-13" → "13 août 2026" (fallback : la valeur brute). */
function formatSheetDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function CorrectionRapidePage() {
  const [screen, setScreen] = useState<Screen>("accueil");
  const [source, setSource] = useState<NotebookSource | null>(null);
  const [openingSource, setOpeningSource] = useState<NotebookSource | null>(null);
  const [page, setPage] = useState<number>(1);
  const [mode, setMode] = useState<CorrectionMode>("exercice");
  const [fullscreen, setFullscreen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [sheets, setSheets] = useState<CorrectionSheet[]>([]);
  const [sheet, setSheet] = useState<CorrectionSheet | null>(null);
  const [sheetDialogOpen, setSheetDialogOpen] = useState(false);
  const [sheetName, setSheetName] = useState("");
  const [sheetDate, setSheetDate] = useState(todayISO());

  useEffect(() => {
    setHasMounted(true);
    setMode(getCorrectionMode());
    setSheets(getSheets());
  }, []);

  const lastPage = hasMounted && source ? getLastPage(source) : null;
  const availablePages = useMemo(() => (source ? notebookPages(source) : []), [source]);

  function createSheet() {
    const name = sheetName.trim();
    if (!name) return;
    const created = addSheet(name, sheetDate || todayISO());
    setSheets(getSheets());
    setSheetName("");
    setSheetDialogOpen(false);
    setSheet(created);
    setScreen("feuille");
  }

  function deleteSheet(id: string) {
    removeSheet(id);
    setSheets(getSheets());
    if (sheet?.id === id) {
      setSheet(null);
      setScreen("accueil");
    }
  }


  function openNotebook(next: NotebookSource) {
    setOpeningSource(next);
    window.setTimeout(() => {
      setSource(next);
      setScreen("sommaire");
      setOpeningSource(null);
    }, 260);
  }

  function openPage(nextPage: number) {
    if (!source) return;
    const clamped = Math.max(1, nextPage);
    setPage(clamped);
    setScreen("page");
    setLastPage(source, clamped, notebookPageSummary(source, clamped));
    setRefreshKey((k) => k + 1);
  }

  function changePage(nextPage: number) {
    if (!source) return;
    const clamped = Math.max(1, nextPage);
    setPage(clamped);
    setLastPage(source, clamped, notebookPageSummary(source, clamped));
  }

  function changeMode(next: CorrectionMode) {
    setMode(next);
    setCorrectionMode(next);
  }

  function backToSummary() {
    setScreen("sommaire");
  }

  function backToAccueil() {
    setScreen("accueil");
    setSource(null);
  }

  // ── raccourcis clavier globaux : sortie plein écran gérée dans FullscreenBoard lui-même
  useEffect(() => {
    if (screen !== "page") return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && fullscreen) return; // géré par FullscreenBoard
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA"].includes(target.tagName)) return;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, fullscreen]);

  if (fullscreen && source) {
    return <FullscreenBoard source={source} page={page} onClose={() => setFullscreen(false)} />;
  }

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6">
        {screen === "accueil" ? (
          <>
            <header className="overflow-hidden rounded-[32px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_97%,transparent),color-mix(in_oklab,var(--color-secondary)_34%,transparent))] px-5 py-5 shadow-raised sm:px-6">
              <p className="eyebrow">Corriger & suivre</p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Correction rapide
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Commencez par choisir le bon cahier. Ensuite, on ouvre directement un sommaire
                simple pour retrouver la bonne page sans vous perdre.
              </p>
            </header>
            <div className="stagger-children flex flex-wrap items-start justify-center gap-6 py-2 sm:justify-start">
              {NOTEBOOKS.map(({ source: notebookSource, spineClassName, icon }) => {
                const meta = notebookCoverMeta(notebookSource);
                return (
                  <NotebookCover
                    key={notebookSource}
                    title={meta.title}
                    subtitle={meta.subtitle}
                    spineClassName={spineClassName}
                    icon={icon}
                    opening={openingSource === notebookSource}
                    onClick={() => openNotebook(notebookSource)}
                  />
                );
              })}
              <SheetCover
                onClick={() => {
                  setSheetDate(todayISO());
                  setSheetDialogOpen(true);
                }}
              />
            </div>

            {sheets.length > 0 ? (
              <section className="rounded-[26px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_95%,transparent),color-mix(in_oklab,var(--color-secondary)_22%,transparent))] p-3 shadow-card">
                <div className="px-1">
                  <p className="eyebrow">Évaluations et feuilles</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Reprenez une correction déjà créée sans repartir de zéro.
                  </p>
                </div>
                <ul className="mt-2 space-y-1">
                  {sheets.map((entry) => (
                    <li key={entry.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSheet(entry);
                          setScreen("feuille");
                        }}
                        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2 text-left transition-colors hover:bg-secondary"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold">
                          {entry.name}
                        </span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {formatSheetDate(entry.date)}
                        </span>
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Supprimer ${entry.name}`}
                        onClick={() => deleteSheet(entry.id)}
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </>
        ) : null}

        {screen === "feuille" && sheet ? (
          <>
            <header className="flex items-center gap-3 rounded-[24px] border border-border/70 bg-card/80 px-3 py-2.5 shadow-sm">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setScreen("accueil");
                  setSheet(null);
                }}
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                Cahiers
              </Button>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold text-foreground">{sheet.name}</h1>
                <p className="text-xs text-muted-foreground">
                  Évaluation du {formatSheetDate(sheet.date)}
                </p>
              </div>
            </header>
            <SheetCorrectionView sheet={sheet} />
          </>
        ) : null}

        <Dialog open={sheetDialogOpen} onOpenChange={setSheetDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nouvelle évaluation à corriger</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="sheet-name">Nom de l'évaluation</Label>
                <Input
                  id="sheet-name"
                  autoFocus
                  value={sheetName}
                  placeholder="Ex. Évaluation addition posée"
                  onChange={(event) => setSheetName(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") createSheet();
                  }}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sheet-date">Date</Label>
                <Input
                  id="sheet-date"
                  type="date"
                  value={sheetDate}
                  onChange={(event) => setSheetDate(event.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSheetDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={createSheet} disabled={!sheetName.trim()}>
                Créer et corriger
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>


        {screen === "sommaire" && source ? (
          <>
            <header className="flex items-center justify-between gap-2 rounded-[24px] border border-border/70 bg-card/80 px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={backToAccueil}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Cahiers
                </Button>
                <h1 className="text-xl font-bold text-foreground">
                  {notebookCoverMeta(source).title}
                </h1>
              </div>
            </header>
            <NotebookSummary source={source} lastPage={lastPage} onOpenPage={openPage} />
          </>
        ) : null}

        {screen === "page" && source ? (
          <div className="flex flex-1 flex-col gap-4">
            <header className="rounded-[26px] border border-border/70 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_20%,transparent))] px-4 py-3 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={backToSummary}>
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Sommaire
                  </Button>
                  <h1 className="text-lg font-bold text-foreground">
                    {notebookCoverMeta(source).title} — {pageLabel(page, source)}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-full border border-border bg-card p-1 shadow-card">
                    <button
                      type="button"
                      onClick={() => changeMode("exercice")}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                        mode === "exercice"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Rows3 className="h-3.5 w-3.5" />
                      Page à page
                    </button>
                    <button
                      type="button"
                      onClick={() => changeMode("eleve")}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                        mode === "eleve"
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                      Élève par élève
                    </button>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setFullscreen(true)}>
                    <Maximize2 className="mr-1.5 h-4 w-4" />
                    Plein écran
                  </Button>
                </div>
              </div>
            </header>

            <div className="min-h-0 flex-1">
              {mode === "exercice" ? (
                <PageExerciseView
                  source={source}
                  page={page}
                  onChangePage={changePage}
                  refreshKey={refreshKey}
                  onProgress={(summary) => setLastPage(source, page, summary)}
                />
              ) : (
                <StudentModeView source={source} startPage={page} />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
