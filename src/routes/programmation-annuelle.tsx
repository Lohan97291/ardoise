import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeftRight,
  BookMarked,
  CalendarPlus,
  Check,
  ClipboardList,
  Pencil,
  Plus,
  Table2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CLEO_CATALOG, DOMAIN_LABELS, MATHS_CATALOG, type CatalogEntry } from "@/lib/ardoise-eval";
import { MDI_PE_CATALOG } from "@/lib/mdi-pe-data";
import {
  BO_REFERENTIEL,
  FRENCH_DOMAIN_ORDER,
  MATHS_DOMAIN_ORDER,
  getItemState,
  getProgression,
  nextStatus,
  setItemStatus,
  setItemTitleOverride,
  addBoCompetency,
  removeBoCompetency,
  type ItemStatus,
  type ProgressionState,
} from "@/lib/programmation-storage";
import {
  WEEKDAY_LABELS,
  WEEKDAYS,
  getTimetable,
  saveTimetableDay,
  type Weekday,
} from "@/lib/timetable-storage";
import { cn } from "@/lib/utils";
import { getExercisePlan } from "@/lib/exercise-plans";
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

export const Route = createFileRoute("/programmation-annuelle")({
  head: () => ({
    meta: [
      { title: "Programmation annuelle CE1 — Ardoise" },
      {
        name: "description",
        content:
          "Grille annuelle CE1 par domaine et période : statut d'avancement, titres éditables et compétences du Bulletin officiel.",
      },
      { property: "og:title", content: "Programmation annuelle CE1 — Ardoise" },
      {
        property: "og:description",
        content:
          "Pilotez votre programmation annuelle CE1 domaine par domaine, période par période.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgrammationAnnuellePage,
});

type Subject = "francais" | "maths";
type Axis = "domain-rows" | "domain-cols";

const PERIODS = [1, 2, 3, 4, 5] as const;

const STATUS_RING: Record<ItemStatus, string> = {
  not_started: "border-border bg-secondary text-transparent",
  in_progress: "border-ochre bg-ochre/25 text-ochre-foreground",
  completed: "border-sage bg-sage text-foreground",
};

const STATUS_LABEL: Record<ItemStatus, string> = {
  not_started: "À faire",
  in_progress: "En cours",
  completed: "Fait",
};

function ProgrammationAnnuellePage() {
  const [subject, setSubject] = useState<Subject>("francais");
  const [axis, setAxis] = useState<Axis>("domain-rows");
  const [progression, setProgression] = useState<ProgressionState>(getProgression);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [boTarget, setBoTarget] = useState<string | null>(null);
  const [scheduleTarget, setScheduleTarget] = useState<CatalogEntry | null>(null);

  const catalog: CatalogEntry[] = subject === "francais" ? [...CLEO_CATALOG, ...MDI_PE_CATALOG] : MATHS_CATALOG;
  const domains = subject === "francais" ? FRENCH_DOMAIN_ORDER : MATHS_DOMAIN_ORDER;

  const cell = (domain: string, period: number) =>
    catalog.filter((e) => e.domain === domain && e.period === period);

  const doneCount = catalog.filter(
    (e) => getItemState(progression, e.id).status === "completed",
  ).length;
  const pct = catalog.length ? Math.round((doneCount / catalog.length) * 100) : 0;

  function cycleStatus(id: string) {
    const current = getItemState(progression, id).status;
    setProgression(setItemStatus(id, nextStatus(current)));
  }

  function saveTitle(id: string, value: string) {
    const v = value.trim();
    if (v) setProgression(setItemTitleOverride(id, v));
    setEditingId(null);
  }

  function injectCompetency(id: string, competency: string) {
    setProgression(addBoCompetency(id, competency));
  }

  function removeCompetency(id: string, competency: string) {
    setProgression(removeBoCompetency(id, competency));
  }

  const rows = axis === "domain-rows" ? domains : PERIODS.map(String);
  const cols = axis === "domain-rows" ? PERIODS.map(String) : domains;

  const subjectAccent =
    subject === "francais"
      ? "bg-subject-francais text-subject-francais-foreground"
      : "bg-subject-maths text-subject-maths-foreground";

  const boTargetDomain = boTarget ? catalog.find((e) => e.id === boTarget)?.domain : undefined;

  return (
    <AppShell>
      <div className="mx-auto max-w-[92rem] px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Préparer"
          title="Programmation annuelle"
          description="Pilotez l’année domaine par domaine, période par période, avec les compétences du BO et l’avancement réel de la classe."
          actions={
            <>
              <div className="flex gap-1 rounded-xl border border-border bg-secondary p-1">
                {(["francais", "maths"] as Subject[]).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    className={cn(
                      "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-200",
                      subject === s
                        ? s === "francais"
                          ? "bg-subject-francais text-subject-francais-foreground shadow-card"
                          : "bg-subject-maths text-subject-maths-foreground shadow-card"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {s === "francais" ? "Français" : "Mathématiques"}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setAxis(axis === "domain-rows" ? "domain-cols" : "domain-rows")}
                title="Inverser les axes du tableau"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:text-foreground hover:shadow-card"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
                {axis === "domain-rows" ? "Domaines en lignes" : "Domaines en colonnes"}
              </button>

              <Sheet>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-card transition-all duration-200 hover:opacity-90"
                  >
                    <BookMarked className="h-3.5 w-3.5" />
                    Référentiel BO
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full overflow-y-auto sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Référentiel BO · CE1</SheetTitle>
                    <SheetDescription>
                      {boTarget
                        ? "Cliquez sur une compétence pour l'ajouter à l'item ciblé."
                        : "Ciblez d'abord un item dans la grille (icône +) pour injecter une compétence."}
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-5 space-y-4">
                    {domains.map((domain) => (
                      <section
                        key={domain}
                        className={cn(
                          "card-surface p-3.5",
                          boTargetDomain === domain && "border-primary/40",
                        )}
                      >
                        <h3 className="eyebrow">{DOMAIN_LABELS[domain]}</h3>
                        <ul className="mt-2 space-y-1.5">
                          {(BO_REFERENTIEL[domain] ?? []).map((c) => (
                            <li key={c}>
                              <button
                                type="button"
                                disabled={!boTarget}
                                onClick={() => boTarget && injectCompetency(boTarget, c)}
                                className={cn(
                                  "flex w-full items-center gap-2 rounded-lg border border-border px-2.5 py-1.5 text-left text-sm transition-all duration-200",
                                  boTarget
                                    ? "hover:border-primary/40 hover:bg-secondary"
                                    : "cursor-not-allowed opacity-60",
                                )}
                              >
                                <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <span className="leading-snug">{c}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </>
          }
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to="/ressources"
            icon={ClipboardList}
            title="Ressources"
            description="Revenir aux méthodes, séquences et séances qui alimentent la progression."
          />
          <SecondaryPageLinkCard
            to="/programmation"
            icon={Table2}
            title="Séquences pédagogiques"
            description="Voir le détail des séquences déjà prévues dans les méthodes."
          />
          <SecondaryPageLinkCard
            to="/emploi-du-temps"
            icon={CalendarPlus}
            title="Emploi du temps"
            description="Comparer la projection annuelle avec l’organisation concrète de la semaine."
          />
        </SecondaryPageLinks>

        {/* Progression globale */}
        <section className="card-surface mt-6 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <p className="font-semibold">
              Avancement · {subject === "francais" ? "Français" : "Mathématiques"}
            </p>
            <p className="tabular-nums text-muted-foreground">
              {doneCount} / {catalog.length} items faits · {pct} %
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all duration-300", subjectAccent)}
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
            {(["not_started", "in_progress", "completed"] as ItemStatus[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={cn("h-3.5 w-3.5 rounded-full border-2", STATUS_RING[s])} />
                {STATUS_LABEL[s]}
              </span>
            ))}
          </div>
        </section>

        {/* Grille */}
        <div className="mt-5 overflow-x-auto pb-2">
          <div
            className="grid min-w-[64rem] gap-3"
            style={{ gridTemplateColumns: `10rem repeat(${cols.length}, minmax(12rem, 1fr))` }}
          >
            <div className="sticky top-16 z-10 bg-background" />
            {cols.map((c) => (
              <div key={`h-${c}`} className="sticky top-16 z-10 bg-background px-1 pb-2">
                <p className="eyebrow truncate">
                  {axis === "domain-rows" ? `Période ${c}` : DOMAIN_LABELS[c]}
                </p>
              </div>
            ))}

            {rows.map((r) => (
              <div key={`row-${r}`} className="contents">
                <div className="flex items-start pt-2">
                  <span
                    className={cn(
                      "rounded-lg px-2 py-1 text-xs font-semibold leading-snug",
                      axis === "domain-rows" ? subjectAccent : "bg-secondary text-muted-foreground",
                    )}
                  >
                    {axis === "domain-rows" ? DOMAIN_LABELS[r] : `Période ${r}`}
                  </span>
                </div>

                {cols.map((c) => {
                  const domain = axis === "domain-rows" ? r : c;
                  const period = Number(axis === "domain-rows" ? c : r);
                  const items = cell(domain, period);
                  return (
                    <div
                      key={`${r}-${c}`}
                      className="stagger-children min-h-[6rem] space-y-2 rounded-2xl border border-dashed border-border/70 bg-surface/40 p-2"
                    >
                      {items.length === 0 ? (
                        <p className="px-1 py-3 text-center text-xs text-muted-foreground/70">—</p>
                      ) : (
                        items.map((entry) => {
                          const st = getItemState(progression, entry.id);
                          const status = st.status;
                          const title = st.titleOverride ?? entry.title;
                          const tags = st.boCompetencies;
                          const editing = editingId === entry.id;
                          return (
                            <article
                              key={entry.id}
                              onClick={() => cycleStatus(entry.id)}
                              className={cn(
                                "group card-surface animate-rise-in cursor-pointer p-2.5 transition-all duration-200 hover:shadow-raised",
                                status === "completed" && "opacity-75",
                              )}
                            >
                              <div className="flex items-start gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    cycleStatus(entry.id);
                                  }}
                                  title={`Statut : ${STATUS_LABEL[status]}`}
                                  aria-label={`Statut de « ${title} » : ${STATUS_LABEL[status]}`}
                                  className={cn(
                                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition-all duration-200",
                                    STATUS_RING[status],
                                  )}
                                >
                                  <Check className="h-3 w-3" />
                                </button>

                                <div className="min-w-0 flex-1">
                                  {editing ? (
                                    <input
                                      autoFocus
                                      value={draft}
                                      onClick={(e) => e.stopPropagation()}
                                      onChange={(e) => setDraft(e.target.value)}
                                      onBlur={() => saveTitle(entry.id, draft)}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") saveTitle(entry.id, draft);
                                        if (e.key === "Escape") setEditingId(null);
                                      }}
                                      className="w-full rounded-md border border-primary/40 bg-background px-1.5 py-0.5 text-xs font-medium outline-none"
                                    />
                                  ) : (
                                    <p
                                      className={cn(
                                        "text-xs font-medium leading-snug",
                                        status === "completed" && "line-through",
                                      )}
                                    >
                                      {title}
                                    </p>
                                  )}
                                </div>

                                <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
                                  <button
                                    type="button"
                                    title="Modifier le titre"
                                    aria-label="Modifier le titre"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setDraft(title);
                                      setEditingId(entry.id);
                                    }}
                                    className="grid h-5 w-5 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                                  >
                                    <Pencil className="h-3 w-3" />
                                  </button>
                                  <button
                                    type="button"
                                    title="Cibler pour le référentiel BO"
                                    aria-label="Cibler pour le référentiel BO"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setBoTarget(entry.id);
                                    }}
                                    className={cn(
                                      "grid h-5 w-5 place-items-center rounded-md transition-colors hover:bg-secondary hover:text-foreground",
                                      boTarget === entry.id
                                        ? "text-ochre-foreground"
                                        : "text-muted-foreground",
                                    )}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              {tags.length ? (
                                <ul className="mt-2 flex flex-wrap gap-1">
                                  {tags.map((t) => (
                                    <li
                                      key={t}
                                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-1.5 py-0.5 text-[0.6rem] font-medium text-muted-foreground"
                                    >
                                      <span className="max-w-[9rem] truncate">{t}</span>
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          removeCompetency(entry.id, t);
                                        }}
                                        aria-label={`Retirer la compétence ${t}`}
                                        className="transition-colors hover:text-foreground"
                                      >
                                        <X className="h-2.5 w-2.5" />
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setScheduleTarget(entry);
                                }}
                                className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary px-2 py-1 text-[0.65rem] font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                              >
                                <CalendarPlus className="h-3 w-3" />
                                Ajouter à l’emploi du temps
                              </button>
                            </article>
                          );
                        })
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        {scheduleTarget ? (
          <ScheduleProgrammingDialog
            entry={scheduleTarget}
            subject={subject}
            onClose={() => setScheduleTarget(null)}
            onSaved={() => setScheduleTarget(null)}
          />
        ) : null}
      </div>
    </AppShell>
  );
}

function ScheduleProgrammingDialog({
  entry,
  subject,
  onClose,
  onSaved,
}: {
  entry: CatalogEntry;
  subject: Subject;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [weekday, setWeekday] = useState<Weekday>("lundi");
  const [start, setStart] = useState("08:30");
  const [end, setEnd] = useState("09:15");
  const title = getItemState(getProgression(), entry.id).titleOverride ?? entry.title;

  function save() {
    const timetable = getTimetable();
    const slot = {
      start,
      end,
      title,
      subject: subject === "francais" ? ("francais" as const) : ("maths" as const),
      programmingItemId: entry.id,
      exercisePlan: getExercisePlan(entry.id),
    };
    saveTimetableDay(
      weekday,
      [...timetable[weekday], slot].sort((a, b) => a.start.localeCompare(b.start)),
    );
    toast.success(`${title} ajouté à ${WEEKDAY_LABELS[weekday]}.`);
    onSaved();
  }

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Ajouter à l’emploi du temps</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-sm font-medium">
            {title}
          </div>
          <div className="space-y-1.5">
            <Label>Jour</Label>
            <select
              value={weekday}
              onChange={(event) => setWeekday(event.target.value as Weekday)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {WEEKDAYS.map((day) => (
                <option key={day} value={day}>
                  {WEEKDAY_LABELS[day]}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Début</Label>
              <Input type="time" value={start} onChange={(event) => setStart(event.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Fin</Label>
              <Input type="time" value={end} onChange={(event) => setEnd(event.target.value)} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={save}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
