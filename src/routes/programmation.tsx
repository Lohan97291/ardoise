import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpenCheck,
  Check,
  ClipboardList,
  LayoutPanelTop,
  ListChecks,
  Target,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import {
  CLEO_CATALOG,
  DOMAIN_LABELS,
  FRENCH_DOMAINS,
  MATHS_CATALOG,
  ORAL_CATALOG,
  ORAL_DOMAIN_LABELS,
  ORAL_SUBDOMAIN_LABELS,
  ORTHO_CATALOG,
  ORTHO_LETTER_LABELS,
  ORTHO_TYPE_LABELS,
  type CatalogEntry,
  type OralEntry,
  type OrthoEntry,
} from "@/lib/ardoise-eval";
import { createLocalStore } from "@/lib/local-store";
import { emcCe1Programming } from "@/lib/emc-ce1-programming";
import { wellDoneCe1Programming } from "@/lib/well-done-ce1-programming";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/programmation")({
  head: () => ({
    meta: [
      { title: "Programmations — Ardoise" },
      {
        name: "description",
        content:
          "Suivi des programmations pédagogiques CE1 par méthode, période et progression, distinctement des fiches de prep.",
      },
      { property: "og:title", content: "Programmations — Ardoise" },
    ],
  }),
  component: ProgrammationPage,
});

/* ─────────────── Storage ─────────────── */

const PROG_KEY = "ardoise.programmation.v1";
const completedStore = createLocalStore<string[]>(PROG_KEY, []);

function getCompleted(): Set<string> {
  return new Set(completedStore.get());
}

function saveCompleted(set: Set<string>): void {
  completedStore.set([...set]);
}

/* ─────────────── Domain badge colours (Cléo + ACCÈS) ─────────────── */

const DOMAIN_BADGE: Record<string, string> = {
  C: "bg-sky-100 text-sky-700",
  V: "bg-purple-100 text-purple-700",
  G: "bg-amber-100 text-amber-700",
  O: "bg-rose-100 text-rose-700",
  nb: "bg-blue-100 text-blue-700",
  calc: "bg-violet-100 text-violet-700",
  gm: "bg-teal-100 text-teal-700",
  geo: "bg-orange-100 text-orange-700",
  don: "bg-pink-100 text-pink-700",
};

/* ─────────────── Letter badge colours (Orthographémic) ─────────────── */

const LETTER_BADGE: Record<string, string> = {
  "": "bg-slate-100 text-slate-600",
  a: "bg-rose-100 text-rose-700",
  o: "bg-orange-100 text-orange-700",
  e: "bg-amber-100 text-amber-700",
  c: "bg-emerald-100 text-emerald-700",
  g: "bg-teal-100 text-teal-700",
  s: "bg-cyan-100 text-cyan-700",
  i: "bg-indigo-100 text-indigo-700",
};

const TYPE_BADGE: Record<string, string> = {
  diagnostic: "bg-slate-100 text-slate-500",
  decouverte: "bg-green-100 text-green-700",
  standard: "bg-blue-100 text-blue-700",
  evaluation: "bg-red-100 text-red-700",
  revision: "bg-amber-100 text-amber-700",
  jeux_final: "bg-purple-100 text-purple-700",
};

/* ─────────────── Oral domain badge colours ─────────────── */

const ORAL_DOMAIN_BADGE: Record<string, string> = {
  francais: "bg-sky-100 text-sky-700",
  arts: "bg-purple-100 text-purple-700",
  eps: "bg-green-100 text-green-700",
  emc: "bg-orange-100 text-orange-700",
  questionner_monde: "bg-teal-100 text-teal-700",
  maths: "bg-blue-100 text-blue-700",
};

/* ─────────────── Component ─────────────── */

type Subject = "francais" | "maths" | "ortho" | "oral" | "anglais" | "emc";
type Period = 1 | 2 | 3 | 4 | 5;
type EnglishProgrammingSequence = (typeof wellDoneCe1Programming.sequences)[number];
type EmcProgrammingFiche = (typeof emcCe1Programming.fiches)[number];

const PERIODS: Period[] = [1, 2, 3, 4, 5];

const SUBJECT_LABELS: Record<Subject, string> = {
  francais: "Français · Cléo",
  maths: "Maths · ACCÈS",
  ortho: "Orthographémic",
  oral: "Langage Oral · Nathan",
  anglais: "Anglais · Well done!",
  emc: "EMC",
};

function ProgrammationPage() {
  const [subject, setSubject] = useState<Subject>("francais");
  const [period, setPeriod] = useState<Period>(1);
  const [completed, setCompleted] = useState<Set<string>>(getCompleted);

  const cleItems =
    subject === "francais"
      ? (CLEO_CATALOG as CatalogEntry[]).filter((e) => e.period === period)
      : [];
  const mathItems =
    subject === "maths" ? (MATHS_CATALOG as CatalogEntry[]).filter((e) => e.period === period) : [];
  const orthoItems =
    subject === "ortho" ? (ORTHO_CATALOG as OrthoEntry[]).filter((e) => e.period === period) : [];
  const oralItems =
    subject === "oral" ? (ORAL_CATALOG as OralEntry[]).filter((e) => e.period === period) : [];
  const englishItems = subject === "anglais" ? wellDoneCe1Programming.sequences : [];
  const emcItems = subject === "emc" ? emcCe1Programming.fiches : [];

  const catalogItems =
    subject === "emc"
      ? emcItems
      : subject === "anglais"
        ? englishItems
        : subject === "ortho"
        ? orthoItems
        : subject === "maths"
          ? mathItems
          : subject === "oral"
            ? oralItems
            : cleItems;

  const doneCount = catalogItems.filter((e) => completed.has(e.id)).length;
  const remainingCount = Math.max(0, catalogItems.length - doneCount);
  const pct = catalogItems.length > 0 ? Math.round((doneCount / catalogItems.length) * 100) : 0;
  const activeMethodLabel = useMemo(() => SUBJECT_LABELS[subject], [subject]);
  const scopeLabel =
    subject === "anglais" || subject === "emc"
      ? "Vue globale de la méthode"
      : `Période ${period} · progression en cours`;
  const nextItems = useMemo(() => {
    const pending = catalogItems.filter((item) => !completed.has(item.id));
    return pending.slice(0, 3).map((item, index) => ({
      id: item.id,
      order: index + 1,
      title:
        "title" in item
          ? item.title
          : "sequenceTitle" in item
            ? item.sequenceTitle
            : (item as { id: string }).id,
      meta:
        subject === "francais" || subject === "maths"
          ? `${DOMAIN_LABELS[(item as CatalogEntry).domain]}`
          : subject === "ortho"
            ? `${ORTHO_TYPE_LABELS[(item as OrthoEntry).type]}`
            : subject === "oral"
              ? `${ORAL_DOMAIN_LABELS[(item as OralEntry).domain]}`
              : subject === "emc"
                ? `Thème ${(item as EmcProgrammingFiche).theme} — ${(item as EmcProgrammingFiche).themeTitle}`
                : `${(item as EnglishProgrammingSequence).sessionCount} séances`,
    }));
  }, [catalogItems, completed, subject]);
  const breakdown = useMemo(() => {
    const counts = new Map<string, { label: string; done: number; total: number; tone: string }>();
    const upsert = (key: string, label: string, done: boolean, tone: string) => {
      const current = counts.get(key) ?? { label, done: 0, total: 0, tone };
      current.total += 1;
      if (done) current.done += 1;
      counts.set(key, current);
    };

    for (const item of catalogItems) {
      const isDone = completed.has(item.id);
      if (subject === "francais" || subject === "maths") {
        const entry = item as CatalogEntry;
        upsert(
          entry.domain,
          DOMAIN_LABELS[entry.domain],
          isDone,
          DOMAIN_BADGE[entry.domain] ?? "bg-secondary text-muted-foreground",
        );
      } else if (subject === "ortho") {
        const entry = item as OrthoEntry;
        upsert(entry.type, ORTHO_TYPE_LABELS[entry.type], isDone, TYPE_BADGE[entry.type]);
      } else if (subject === "oral") {
        const entry = item as OralEntry;
        upsert(
          entry.domain,
          ORAL_DOMAIN_LABELS[entry.domain],
          isDone,
          ORAL_DOMAIN_BADGE[entry.domain] ?? "bg-secondary text-muted-foreground",
        );
      } else if (subject === "emc") {
        const entry = item as EmcProgrammingFiche;
        upsert(
          `theme-${entry.theme}`,
          `Thème ${entry.theme} — ${entry.themeTitle}`,
          isDone,
          entry.theme === 1
            ? "bg-orange-100 text-orange-700"
            : entry.theme === 2
              ? "bg-teal-100 text-teal-700"
              : "bg-blue-100 text-blue-700",
        );
      } else {
        const entry = item as EnglishProgrammingSequence;
        upsert(
          "anglais",
          "Séquences d’anglais",
          isDone,
          "bg-subject-lve/15 text-subject-lve-foreground",
        );
        if (entry.sessionCount >= 4) {
          upsert("anglais-long", "Séquences longues", isDone, "bg-secondary text-foreground");
        }
      }
    }

    return Array.from(counts.values())
      .sort((left, right) => right.total - left.total)
      .slice(0, 4);
  }, [catalogItems, completed, subject]);

  const groupedByDomain = useMemo(() => {
    if (subject !== "francais" && subject !== "maths") return [] as [string, CatalogEntry[]][];
    const map = new Map<string, CatalogEntry[]>();
    for (const item of catalogItems as CatalogEntry[]) {
      const list = map.get(item.domain) ?? [];
      list.push(item);
      map.set(item.domain, list);
    }
    return Array.from(map.entries());
  }, [catalogItems, subject]);

  function toggle(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      saveCompleted(next);
      return next;
    });
  }

  const progressColor =
    subject === "francais"
      ? "bg-subject-francais"
      : subject === "maths"
        ? "bg-subject-maths"
        : subject === "anglais"
          ? "bg-subject-lve"
          : subject === "oral"
            ? "bg-teal-500"
            : subject === "emc"
              ? "bg-orange-500"
              : "bg-emerald-500";

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Préparer"
          title="Programmations"
          description="Ici, tu suis la progression par méthode, période, module ou séquence. Le détail séance par séance et les fiches prêtes à l’emploi restent dans Fiches de prep."
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to="/ressources"
            icon={ClipboardList}
            title="Fiches de prep"
            description="Ouvrir les séances détaillées et leurs fiches de préparation."
          />
          <SecondaryPageLinkCard
            to="/programmation-annuelle"
            icon={LayoutPanelTop}
            title="Programmation annuelle"
            description="Prendre du recul sur la répartition des domaines sur toute l’année."
          />
          <SecondaryPageLinkCard
            to="/emploi-du-temps"
            icon={BookOpenCheck}
            title="Emploi du temps"
            description="Vérifier ensuite comment ces séquences prennent place dans la semaine."
          />
        </SecondaryPageLinks>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Programmations
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">Vue progression</p>
            <p className="mt-1 text-sm text-muted-foreground">
              On pilote ce qui doit être fait au fil de l’année : périodes, modules, séquences et
              avancement.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/35 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Fiches de prep
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">Vue séance</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Quand tu veux le déroulé précis, le matériel, les photocopies et la mise en œuvre, tu
              bascules dans Fiches de prep.
            </p>
          </div>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mt-6 space-y-2 bg-background/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6">
          <div className="flex w-fit flex-wrap gap-1 rounded-xl border border-border bg-secondary p-1">
            {(["francais", "maths", "ortho", "oral", "anglais", "emc"] as Subject[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSubject(s)}
                className={cn(
                  "rounded-lg px-4 py-1.5 text-xs font-semibold transition-colors duration-150",
                  subject === s
                    ? s === "francais"
                      ? "bg-subject-francais text-subject-francais-foreground shadow-sm"
                      : s === "maths"
                        ? "bg-subject-maths text-subject-maths-foreground shadow-sm"
                        : s === "anglais"
                          ? "bg-subject-lve text-subject-lve-foreground shadow-sm"
                          : s === "oral"
                            ? "bg-teal-600 text-white shadow-sm"
                            : s === "emc"
                              ? "bg-orange-600 text-white shadow-sm"
                              : "bg-emerald-600 text-white shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {SUBJECT_LABELS[s]}
              </button>
            ))}
          </div>

          {subject === "anglais" ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              Le scan CE1 de <span className="font-medium text-foreground">Well done!</span> liste 18
              séquences, mais ne les rattache pas explicitement aux périodes 1 à 5.
            </div>
          ) : subject === "emc" ? (
            <div className="rounded-xl border border-dashed border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
              L'<span className="font-medium text-foreground">EMC CE1</span> est organisé en 3 thèmes
              annuels, non découpés en périodes 1 à 5.
            </div>
          ) : (
            <div className="flex w-fit gap-1 rounded-xl border border-border bg-secondary p-1">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all duration-150",
                    period === p
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Période {p}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Méthode active
            </p>
            <p className="mt-2 text-sm font-semibold text-foreground">{activeMethodLabel}</p>
            <p className="mt-1 text-sm text-muted-foreground">{scopeLabel}</p>
          </div>
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">
              Progression validée
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{doneCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              élément{doneCount > 1 ? "s" : ""} déjà traité{doneCount > 1 ? "s" : ""}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/35 p-4 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              À suivre
            </p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{remainingCount}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              repère{remainingCount > 1 ? "s" : ""} encore à mener
            </p>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {doneCount} / {catalogItems.length} fait{doneCount > 1 ? "s" : ""}
            </span>
            <span>{pct} %</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all duration-300", progressColor)}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-secondary/30 px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
            <Target className="h-4 w-4 text-primary" />
            Vue programmation
          </span>
          <span className="text-sm text-muted-foreground">
            Ici, tu coches ce qui est traité dans la progression. La séance détaillée reste dans
            Fiches de prep.
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground">
            <ListChecks className="h-3.5 w-3.5" />
            Suivi simple par avancement
          </span>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Prochains repères</p>
                <p className="text-sm text-muted-foreground">
                  Les prochains éléments non cochés dans cette vue.
                </p>
              </div>
              <span className="rounded-full border border-border bg-secondary px-2.5 py-1 text-[0.72rem] font-medium text-muted-foreground">
                {remainingCount} restant{remainingCount > 1 ? "s" : ""}
              </span>
            </div>
            {nextItems.length === 0 ? (
              <p className="mt-4 rounded-xl border border-dashed border-border bg-secondary/30 px-4 py-5 text-sm text-muted-foreground">
                Tout est coché dans cette vue.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {nextItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-border bg-secondary/30 px-3 py-3"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-card text-[0.72rem] font-semibold text-muted-foreground">
                      {item.order}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium leading-snug text-foreground">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">{item.meta}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <div>
              <p className="text-sm font-semibold text-foreground">Répartition de la progression</p>
              <p className="text-sm text-muted-foreground">
                Les zones déjà bien avancées et celles à relancer.
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {breakdown.map((item) => {
                const percent = item.total > 0 ? Math.round((item.done / item.total) * 100) : 0;
                return (
                  <div key={item.label} className="space-y-1.5">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={cn(
                          "rounded-md px-2 py-1 text-[0.68rem] font-semibold",
                          item.tone,
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="text-[0.72rem] text-muted-foreground">
                        {item.done}/{item.total}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden card-surface">
          {catalogItems.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {subject === "anglais"
                ? "Aucune séquence d'anglais disponible."
                : subject === "emc"
                  ? "Aucune fiche EMC disponible."
                  : "Aucun module pour cette période."}
            </p>
          )}
          <ul className="divide-y divide-border">
            {subject === "francais" || subject === "maths"
              ? groupedByDomain.flatMap(([domain, items]) => [
                  <li
                    key={`head-${domain}`}
                    className="bg-secondary/60 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-wide text-muted-foreground"
                  >
                    {DOMAIN_LABELS[domain]}
                  </li>,
                  ...items.map((entry, idx) => {
                    const done = completed.has(entry.id);
                    return (
                      <li
                        key={entry.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggle(entry.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") toggle(entry.id);
                        }}
                        className={cn(
                          "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary/40",
                          done && "opacity-60",
                        )}
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-muted-foreground">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p
                            className={cn(
                              "text-sm font-medium leading-snug",
                              done && "line-through",
                            )}
                          >
                            {entry.title}
                          </p>
                          <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                            {FRENCH_DOMAINS.has(entry.domain) ? "Cléo" : "ACCÈS"} CE1 · P{entry.period}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(entry.id);
                          }}
                          title={done ? "Marquer comme à faire" : "Marquer comme fait"}
                          className={cn(
                            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
                            done
                              ? subject === "francais"
                                ? "border-subject-francais bg-subject-francais text-subject-francais-foreground"
                                : "border-subject-maths bg-subject-maths text-subject-maths-foreground"
                              : "border-border text-transparent hover:border-muted-foreground",
                          )}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    );
                  }),
                ])
              : subject === "anglais"
                ? (catalogItems as EnglishProgrammingSequence[]).map((entry, idx) => {
                    const done = completed.has(entry.id);
                    return (
                      <li
                        key={entry.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => toggle(entry.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") toggle(entry.id);
                        }}
                        className={cn(
                          "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary/40",
                          done && "opacity-60",
                        )}
                      >
                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-muted-foreground">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="rounded-md bg-subject-lve px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-subject-lve-foreground">
                              Anglais
                            </span>
                            <span className="text-[0.7rem] text-muted-foreground">
                              {entry.sessionCount} séance{entry.sessionCount > 1 ? "s" : ""}
                            </span>
                          </div>
                          <p
                            className={cn(
                              "mt-0.5 text-sm font-medium leading-snug",
                              done && "line-through",
                            )}
                          >
                            {entry.sequenceTitle}
                          </p>
                          <p className="mt-0.5 text-[0.72rem] text-foreground/80">
                            {entry.activityTitle}
                          </p>
                          <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                            Well done! CE1 · guide p. {entry.teacherPages.join("-")} · période : [À
                            VÉRIFIER]
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggle(entry.id);
                          }}
                          title={done ? "Marquer comme à faire" : "Marquer comme fait"}
                          className={cn(
                            "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
                            done
                              ? "border-subject-lve bg-subject-lve text-subject-lve-foreground"
                              : "border-border text-transparent hover:border-muted-foreground",
                          )}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                      </li>
                    );
                  })
                : subject === "emc"
                  ? (catalogItems as EmcProgrammingFiche[]).map((entry, idx) => {
                      const done = completed.has(entry.id);
                      const themeColor =
                        entry.theme === 1
                          ? "bg-orange-100 text-orange-700"
                          : entry.theme === 2
                            ? "bg-teal-100 text-teal-700"
                            : "bg-blue-100 text-blue-700";
                      const checkColor =
                        entry.theme === 1
                          ? "border-orange-500 bg-orange-500 text-white"
                          : entry.theme === 2
                            ? "border-teal-500 bg-teal-500 text-white"
                            : "border-blue-500 bg-blue-500 text-white";
                      return (
                        <li
                          key={entry.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => toggle(entry.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") toggle(entry.id);
                          }}
                          className={cn(
                            "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary/40",
                            done && "opacity-60",
                          )}
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-muted-foreground">
                            F{entry.ficheNumber}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={cn(
                                  "rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
                                  themeColor,
                                )}
                              >
                                T{entry.theme}
                              </span>
                              <span className="text-[0.7rem] text-muted-foreground">
                                {entry.themeTitle}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "mt-0.5 text-sm font-medium leading-snug",
                                done && "line-through",
                              )}
                            >
                              {entry.title}
                            </p>
                            <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                              EMC CE1 · guide p. {entry.guidePages[0]}–{entry.guidePages[entry.guidePages.length - 1]}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(entry.id);
                            }}
                            title={done ? "Marquer comme à faire" : "Marquer comme fait"}
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
                              done
                                ? checkColor
                                : "border-border text-transparent hover:border-muted-foreground",
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      );
                    })
                : subject === "ortho"
                  ? (catalogItems as OrthoEntry[]).map((entry) => {
                      const done = completed.has(entry.id);
                      return (
                        <li
                          key={entry.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => toggle(entry.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") toggle(entry.id);
                          }}
                          className={cn(
                            "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary/40",
                            done && "opacity-60",
                          )}
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-muted-foreground">
                            S{entry.weekNum}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {entry.letter && (
                                <span
                                  className={cn(
                                    "rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
                                    LETTER_BADGE[entry.letter],
                                  )}
                                >
                                  {entry.letter.toUpperCase()}
                                </span>
                              )}
                              <span
                                className={cn(
                                  "rounded-md px-1.5 py-0.5 text-[0.6rem] font-semibold",
                                  TYPE_BADGE[entry.type],
                                )}
                              >
                                {ORTHO_TYPE_LABELS[entry.type]}
                              </span>
                            </div>
                            <p
                              className={cn(
                                "mt-0.5 text-sm font-medium leading-snug",
                                done && "line-through",
                              )}
                            >
                              {entry.title}
                            </p>
                            <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                              Orthographémic CE1 · {ORTHO_LETTER_LABELS[entry.letter]} · Période{" "}
                              {entry.period}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(entry.id);
                            }}
                            title={done ? "Marquer comme à faire" : "Marquer comme fait"}
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
                              done
                                ? "border-emerald-600 bg-emerald-600 text-white"
                                : "border-border text-transparent hover:border-muted-foreground",
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      );
                    })
                  : (catalogItems as OralEntry[]).map((entry) => {
                      const done = completed.has(entry.id);
                      return (
                        <li
                          key={entry.id}
                          role="button"
                          tabIndex={0}
                          onClick={() => toggle(entry.id)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") toggle(entry.id);
                          }}
                          className={cn(
                            "grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-secondary/40",
                            done && "opacity-60",
                          )}
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-secondary text-[0.65rem] font-semibold text-muted-foreground">
                            S{entry.seanceNum}
                          </span>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span
                                className={cn(
                                  "rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide",
                                  ORAL_DOMAIN_BADGE[entry.domain] ??
                                    "bg-secondary text-muted-foreground",
                                )}
                              >
                                {ORAL_DOMAIN_LABELS[entry.domain]}
                              </span>
                              {entry.subDomain && (
                                <span className="text-[0.7rem] text-muted-foreground">
                                  {ORAL_SUBDOMAIN_LABELS[entry.subDomain]}
                                </span>
                              )}
                            </div>
                            <p
                              className={cn(
                                "mt-0.5 text-sm font-medium leading-snug",
                                done && "line-through",
                              )}
                            >
                              {entry.title}
                            </p>
                            <p className="mt-0.5 text-[0.65rem] text-muted-foreground">
                              Langage oral CE · Nathan &amp; Delaporte · Période {entry.period}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggle(entry.id);
                            }}
                            title={done ? "Marquer comme à faire" : "Marquer comme fait"}
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 transition-colors duration-150",
                              done
                                ? "border-teal-600 bg-teal-600 text-white"
                                : "border-border text-transparent hover:border-muted-foreground",
                            )}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      );
                    })}
          </ul>
        </div>

        {subject === "francais" || subject === "maths" ? (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {Object.entries(DOMAIN_LABELS)
              .filter(([d]) =>
                subject === "francais" ? FRENCH_DOMAINS.has(d) : !FRENCH_DOMAINS.has(d),
              )
              .map(([d, label]) => (
                <span key={d} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase",
                      DOMAIN_BADGE[d],
                    )}
                  >
                    {d.toUpperCase()}
                  </span>
                  {label}
                </span>
              ))}
          </div>
        ) : subject === "ortho" ? (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {Object.entries(ORTHO_TYPE_LABELS).map(([type, label]) => (
              <span key={type} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[0.6rem] font-semibold",
                    TYPE_BADGE[type],
                  )}
                >
                  {label}
                </span>
              </span>
            ))}
          </div>
        ) : subject === "anglais" ? (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="rounded bg-subject-lve px-1.5 py-0.5 text-[0.6rem] font-bold uppercase text-subject-lve-foreground">
                Anglais
              </span>
              18 séquences CE1 issues du scan
            </span>
            <span>Programmation annuelle non découpée en périodes dans la source</span>
          </div>
        ) : subject === "emc" ? (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            {[
              { theme: 1, label: "Altérité et sociabilité", color: "bg-orange-100 text-orange-700" },
              { theme: 2, label: "Règles collectives et prises d'initiative", color: "bg-teal-100 text-teal-700" },
              { theme: 3, label: "Principes et symboles de la République", color: "bg-blue-100 text-blue-700" },
            ].map(({ theme, label, color }) => (
              <span key={theme} className="flex items-center gap-1.5">
                <span className={cn("rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase", color)}>
                  T{theme}
                </span>
                {label}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {Object.entries(ORAL_DOMAIN_LABELS).map(([domain, label]) => (
              <span
                key={domain}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[0.6rem] font-bold uppercase",
                    ORAL_DOMAIN_BADGE[domain],
                  )}
                >
                  {domain === "questionner_monde" ? "QDM" : domain.toUpperCase()}
                </span>
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
