import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ClipboardCheck,
  Plus,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/ardoise/app-shell";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FLUENCE_TARGET,
  STUDENTS,
  fluenceLevel,
  fullName,
  initials,
  type FluenceLevel,
} from "@/lib/ardoise-eval";
import { findJournalSessionById } from "@/lib/journal-storage";
import { getFluenceRecords, saveFluenceMeasure } from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fluence")({
  head: () => ({
    meta: [
      { title: "Fluence de lecture CE1 — Ardoise" },
      {
        name: "description",
        content:
          "Suivez la fluence de lecture de votre CE1 selon la progression Orthographémic : cibles par chapitre (55→100 mots/min).",
      },
      { property: "og:title", content: "Fluence de lecture CE1 — Ardoise" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FluencePage,
});

/* ═══════════════════════════ Données Orthographémic ══════════════════════ */

/** Chapitres lettre de la méthode Orthographémic CE1, avec leur cible de fluence. */
const ORTHO_CHAPTERS = [
  { key: "Bilan A", letter: "A", fullLabel: "Chapitre A", target: 55, period: 1 },
  { key: "Bilan O", letter: "O", fullLabel: "Chapitre O", target: 58, period: 2 },
  { key: "Bilan E", letter: "E", fullLabel: "Chapitre E", target: 60, period: 2 },
  { key: "Bilan C", letter: "C", fullLabel: "Chapitre C", target: 64, period: 3 },
  { key: "Bilan G", letter: "G", fullLabel: "Chapitre G", target: 67, period: 3 },
  { key: "Bilan S", letter: "S", fullLabel: "Chapitre S", target: 68, period: 4 },
  { key: "Bilan I", letter: "I", fullLabel: "Chapitre I", target: 70, period: 5 },
] as const;

type OrthoChapterKey = (typeof ORTHO_CHAPTERS)[number]["key"];

/** Point de départ diagnostique Orthographémic — semaine 1 de CE1. */
const DIAGNOSTIC_PERIOD = {
  key: "Diagnostic S1",
  label: "Diagnostic — début de CE1",
  target: 50,
} as const;

/** Cible Orthographémic pour une période donnée (null si période générale). */
function orthoTargetForPeriod(period: string): number | null {
  if (period === DIAGNOSTIC_PERIOD.key) return DIAGNOSTIC_PERIOD.target;
  return ORTHO_CHAPTERS.find((c) => c.key === period)?.target ?? null;
}

/** Toutes les périodes disponibles dans le modal de saisie. */
const ALL_PERIODS: string[] = [
  DIAGNOSTIC_PERIOD.key,
  ...ORTHO_CHAPTERS.map((c) => c.key),
  "Octobre",
  "Janvier",
  "Juin",
];

/* ════════════════════════ Couleurs et niveaux ════════════════════════════ */

const LEVEL_CHIP: Record<FluenceLevel, string> = {
  ok: "bg-status-a text-status-a-foreground",
  fragile: "bg-status-pa text-status-pa-foreground",
  alerte: "bg-status-na text-status-na-foreground",
};

const LEVEL_BAR: Record<FluenceLevel, string> = {
  ok: "bg-status-a-solid",
  fragile: "bg-status-pa-solid",
  alerte: "bg-status-na-solid",
};

const LEVEL_LABEL: Record<FluenceLevel, string> = {
  ok: "Objectif atteint",
  fragile: "En progrès",
  alerte: "À accompagner",
};

/** Couleur relative à une cible spécifique (pour les chapitres). */
function chapterLevel(wpm: number, target: number): FluenceLevel {
  if (wpm >= target) return "ok";
  if (wpm >= target * 0.8) return "fragile";
  return "alerte";
}

/* ════════════════════════ Composants internes ═════════════════════════════ */

/** Barre de progression avec marqueurs Orthographémic. */
function FlexBar({
  wpm,
  level,
  showMarkers = true,
  height = "h-4",
}: {
  wpm: number;
  level: FluenceLevel;
  showMarkers?: boolean;
  height?: string;
}) {
  const pct = Math.min(100, (wpm / FLUENCE_TARGET) * 100);
  return (
    <div className="relative">
      <div className={cn("overflow-hidden rounded-full bg-secondary", height)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", LEVEL_BAR[level])}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showMarkers &&
        ORTHO_CHAPTERS.map((c) => (
          <span
            key={c.key}
            className="pointer-events-none absolute top-0 h-full w-px bg-foreground/25"
            style={{ left: `${(c.target / FLUENCE_TARGET) * 100}%` }}
          />
        ))}
    </div>
  );
}

/** Légende des marqueurs chapitres sous la barre. */
function BarLegend() {
  return (
    <div className="relative mt-1.5 h-8">
      {ORTHO_CHAPTERS.map((c) => (
        <span
          key={c.key}
          className="absolute -translate-x-1/2 text-center text-[0.62rem] leading-tight text-muted-foreground"
          style={{ left: `${(c.target / FLUENCE_TARGET) * 100}%` }}
        >
          <span className="block font-bold text-foreground">{c.target}</span>
          {c.letter}
        </span>
      ))}
      {/* Cible finale */}
      <span className="absolute right-0 -translate-x-1/2 text-center text-[0.62rem] leading-tight text-muted-foreground">
        <span className="block font-bold text-foreground">{FLUENCE_TARGET}</span>
        Fin
      </span>
    </div>
  );
}

/* ═══════════════════════════ Page principale ══════════════════════════════ */

function FluencePage() {
  const [sourceSessionId] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("sessionId");
  });
  const [requestedPeriod] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("period");
  });
  const [selected, setSelected] = useState<string | null>(null);
  const [fluenceData, setFluenceData] = useState(() => getFluenceRecords());
  const linkedSession = useMemo(
    () => (sourceSessionId ? findJournalSessionById(sourceSessionId) : undefined),
    [sourceSessionId],
  );
  const initialPeriod =
    requestedPeriod && ALL_PERIODS.includes(requestedPeriod) ? requestedPeriod : ALL_PERIODS[0]!;

  // Modal saisie
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState<string | null>(null);
  const [inputWpm, setInputWpm] = useState("");
  const [inputErreurs, setInputErreurs] = useState("");
  const [inputPeriod, setInputPeriod] = useState(initialPeriod);

  useEffect(() => {
    if (requestedPeriod && ALL_PERIODS.includes(requestedPeriod)) {
      setInputPeriod(requestedPeriod);
    }
  }, [requestedPeriod]);

  /* ── Stats générales ── */
  const stats = useMemo(() => {
    const values = fluenceData.map((f) => f.wpm).filter((v) => v > 0);
    return {
      average: values.length ? Math.round(values.reduce((a, b) => a + b, 0) / values.length) : 0,
      evaluated: values.length,
      reached: values.filter((v) => v >= FLUENCE_TARGET).length,
    };
  }, [fluenceData]);

  /* ── Tableau classe trié par wpm décroissant ── */
  const rows = useMemo(
    () =>
      STUDENTS.map((student) => {
        const record = fluenceData.find((f) => f.studentId === student.id)!;
        return { student, record, level: fluenceLevel(record.wpm) };
      }).sort((a, b) => b.record.wpm - a.record.wpm),
    [fluenceData],
  );

  /* ── Données chapitres pour la vue classe ── */
  const chapterStats = useMemo(
    () =>
      ORTHO_CHAPTERS.map((c) => {
        const bilanValues = fluenceData
          .map((f) => f.history.find((h) => h.period === c.key)?.wpm ?? null)
          .filter((v): v is number => v !== null);
        const reached = bilanValues.filter((v) => v >= c.target).length;
        const avg = bilanValues.length
          ? Math.round(bilanValues.reduce((a, b) => a + b, 0) / bilanValues.length)
          : null;
        return { ...c, bilanCount: bilanValues.length, reached, avg };
      }),
    [fluenceData],
  );

  const current = selected ? rows.find((r) => r.student.id === selected) : null;

  function openModal(studentId: string) {
    setModalStudent(studentId);
    setInputWpm("");
    setInputErreurs("");
    setInputPeriod(initialPeriod);
    setModalOpen(true);
  }

  function handleSave() {
    const wpm = parseInt(inputWpm, 10);
    if (!modalStudent || isNaN(wpm) || wpm < 1 || wpm > 300) {
      toast.error("Valeur invalide — saisir un nombre entre 1 et 300.");
      return;
    }
    const errsRaw = inputErreurs !== "" ? parseInt(inputErreurs, 10) : undefined;
    const erreurs = errsRaw !== undefined && !isNaN(errsRaw) && errsRaw >= 0 ? errsRaw : undefined;
    saveFluenceMeasure(modalStudent, wpm, inputPeriod, erreurs);
    setFluenceData(getFluenceRecords());
    const student = STUDENTS.find((s) => s.id === modalStudent)!;
    const chapTarget = orthoTargetForPeriod(inputPeriod);
    const errSuffix = erreurs !== undefined ? ` · ${erreurs} erreur${erreurs > 1 ? "s" : ""}` : "";
    const msg = chapTarget
      ? wpm >= chapTarget
        ? `${student.firstName} — ${wpm} mots/min · ✓ cible ${chapTarget} atteinte${errSuffix}`
        : `${student.firstName} — ${wpm} mots/min · cible ${chapTarget} (écart : ${chapTarget - wpm})${errSuffix}`
      : `${student.firstName} — ${wpm} mots/min (${inputPeriod}) enregistré${errSuffix}.`;
    toast.success(msg);
    setModalOpen(false);
  }

  /* ════════════════════════ Rendu ══════════════════════════════════════════ */
  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title="Fluence de lecture"
          description="Bilan des lectures chronométrées selon Orthographémic, avec un suivi simple des seuils et des élèves à accompagner."
          actions={
            <Button size="sm" onClick={() => openModal(selected ?? STUDENTS[0]!.id)}>
              <Plus className="mr-1.5 h-4 w-4" />
              Nouvelle mesure
            </Button>
          }
        />

        <SecondaryPageLinks>
          <SecondaryPageLinkCard
            to="/eleves"
            icon={Users}
            title="Élèves"
            description="Retrouver la classe et les autres suivis individuels."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/journal?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/journal"
            }
            icon={BookOpen}
            title="Cahier journal"
            description="Revenir à la séance liée lorsqu’une évaluation de fluence a été prévue."
          />
          <SecondaryPageLinkCard
            to={
              sourceSessionId
                ? `/correction-rapide?sessionId=${encodeURIComponent(sourceSessionId)}`
                : "/correction-rapide"
            }
            icon={ClipboardCheck}
            title="Corrections"
            description="Basculer vers les autres pages de saisie de résultats de la journée."
          />
        </SecondaryPageLinks>

        {sourceSessionId ? (
          <section className="mb-4 mt-4 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Séance liée
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {linkedSession?.title ?? "Séance de fluence"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {requestedPeriod
                    ? `Période de saisie proposée : ${requestedPeriod}`
                    : "Tu peux saisir ici les bilans de fluence liés à cette séance."}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.location.assign(
                    `/journal?sessionId=${encodeURIComponent(sourceSessionId)}`,
                  )
                }
              >
                Retour à la séance
              </Button>
            </div>
          </section>
        ) : null}

        {/* ─── Protocole ─── */}
        <section className="mt-4 rounded-2xl border border-border bg-secondary/40 px-4 py-3.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Protocole de mesure
          </p>
          <ol className="mt-2 space-y-1 text-sm text-foreground/80">
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-primary">1.</span>L'élève lit un texte à voix
              haute pendant exactement <strong>1 minute</strong>.
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-primary">2.</span>Compter uniquement les{" "}
              <strong>mots lus correctement</strong> — ne pas compter les mots ratés, omis ou
              répétés.
            </li>
            <li className="flex gap-2">
              <span className="shrink-0 font-bold text-primary">3.</span>Reporter le score
              (mots/min) et le nombre d'erreurs dans le bilan RE6 puis saisir ci-dessous.
            </li>
          </ol>
          <p className="mt-2 text-[0.72rem] text-muted-foreground">
            Cibles Orthographémic CE1 — Diagnostic S1 : 50 · Bilan A : 55 · O : 58 · E : 60 · C : 64
            · G : 67 · S : 68 · I : 70 · Fin d'année : {FLUENCE_TARGET} mots/min.
          </p>
        </section>

        {/* ─── Stats générales ─── */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              label: "Moyenne de classe",
              value: `${stats.average}`,
              unit: "mots/min",
            },
            {
              icon: Users,
              label: "Élèves évalués",
              value: `${stats.evaluated}`,
              unit: `sur ${STUDENTS.length}`,
            },
            {
              icon: Target,
              label: `Objectif ${FLUENCE_TARGET} atteint`,
              value: `${stats.reached}`,
              unit: `élève${stats.reached > 1 ? "s" : ""}`,
            },
          ].map(({ icon: Icon, label, value, unit }) => (
            <div key={label} className="card-surface p-5 shadow-card">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Icon className="h-4 w-4 shrink-0 text-primary" />
                <span className="truncate">{label}</span>
              </p>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="font-display text-4xl font-bold tabular-nums">{value}</span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </p>
            </div>
          ))}
        </div>

        {/* ─── Bandeau chapitres Orthographémic ─── */}
        {!current && (
          <section className="mt-5 card-surface p-5 shadow-card">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Bilans de chapitre Orthographémic
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  7 bilans dans l'année — un par chapitre (lettre étudiée). Vert = cible atteinte
                  par toute la classe.
                </p>
              </div>
              <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground/40" />
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
              {chapterStats.map((c) => {
                const hasData = c.bilanCount > 0;
                const allReached = hasData && c.reached === STUDENTS.length;
                const someReached = hasData && c.reached > 0;
                return (
                  <div
                    key={c.key}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-2xl border p-3 text-center transition-colors",
                      allReached
                        ? "border-status-a-solid/30 bg-status-a/20"
                        : someReached
                          ? "border-status-pa-solid/30 bg-status-pa/10"
                          : hasData
                            ? "border-status-na-solid/30 bg-status-na/10"
                            : "border-border bg-secondary/40",
                    )}
                  >
                    <span
                      className={cn(
                        "grid h-9 w-9 place-items-center rounded-full font-display text-base font-black",
                        allReached
                          ? "bg-status-a-solid text-white"
                          : someReached
                            ? "bg-status-pa-solid text-white"
                            : hasData
                              ? "bg-status-na-solid text-white"
                              : "bg-secondary text-muted-foreground",
                      )}
                    >
                      {c.letter}
                    </span>
                    <p className="text-[0.62rem] font-bold text-muted-foreground">
                      → {c.target} mots/min
                    </p>
                    <p className="text-[0.58rem] text-muted-foreground/60">Période {c.period}</p>
                    {hasData ? (
                      <>
                        <p className="text-[0.65rem] leading-tight text-muted-foreground">
                          {c.reached}/{STUDENTS.length} élèves
                        </p>
                        {c.avg !== null && (
                          <p className="font-display text-sm font-bold tabular-nums">
                            {c.avg}{" "}
                            <span className="text-[0.6rem] font-normal text-muted-foreground">
                              moy.
                            </span>
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[0.62rem] text-muted-foreground/50">—</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ─── Fiche élève ─── */}
        {current ? (
          <section className="mt-4 card-surface p-5 shadow-card sm:p-6">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground">
                  {initials(current.student)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-2xl font-bold">
                    {fullName(current.student)}
                  </h2>
                  <p className="text-sm text-muted-foreground">{LEVEL_LABEL[current.level]}</p>
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="sm" onClick={() => openModal(current.student.id)}>
                  <Plus className="mr-1.5 h-4 w-4" />
                  Saisir bilan
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelected(null)}>
                  <ArrowLeft className="mr-1.5 h-4 w-4" />
                  Classe
                </Button>
              </div>
            </div>

            {/* WPM actuel + prochaine cible */}
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-6xl font-bold tabular-nums">
                {current.record.wpm || "—"}
              </span>
              {current.record.wpm > 0 && (
                <span className="text-muted-foreground">mots/min lus correctement</span>
              )}
            </p>
            {current.record.wpm > 0 &&
              (() => {
                const nextChapter = ORTHO_CHAPTERS.find((c) => current.record.wpm < c.target);
                if (!nextChapter)
                  return (
                    <p className="mt-1 text-sm font-semibold text-status-a-solid">
                      ✓ Toutes les cibles Orthographémic atteintes — objectif fin d'année :{" "}
                      {FLUENCE_TARGET} mots/min
                    </p>
                  );
                const gap = nextChapter.target - current.record.wpm;
                return (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Prochaine cible :{" "}
                    <strong>
                      {nextChapter.fullLabel} — {nextChapter.target} mots/min
                    </strong>{" "}
                    ({gap > 0 ? `encore ${gap} mots/min à gagner` : "cible atteinte"})
                  </p>
                );
              })()}

            {/* Barre avec marqueurs Orthographémic */}
            {current.record.wpm > 0 && (
              <>
                <div className="mt-5">
                  <FlexBar
                    wpm={current.record.wpm}
                    level={current.level}
                    showMarkers
                    height="h-5"
                  />
                  <BarLegend />
                </div>

                {/* Chapitres atteints */}
                <div className="mt-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Bilans par chapitre — cible atteinte au moment du bilan ?
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {ORTHO_CHAPTERS.map((c) => {
                      const bilanEntry = current.record.history.find((h) => h.period === c.key);
                      const wpmAtBilan = bilanEntry?.wpm;
                      const reached = wpmAtBilan !== undefined && wpmAtBilan >= c.target;
                      const measured = wpmAtBilan !== undefined;
                      return (
                        <div
                          key={c.key}
                          title={`${c.fullLabel} · cible ${c.target} mots/min${measured ? ` · relevé : ${wpmAtBilan} mots/min` : " · non mesuré"}`}
                          className={cn(
                            "flex items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors",
                            reached
                              ? "border-status-a-solid/30 bg-status-a/20"
                              : measured
                                ? "border-status-na-solid/30 bg-status-na/10"
                                : "border-border bg-secondary/40",
                          )}
                        >
                          <span
                            className={cn(
                              "grid h-7 w-7 shrink-0 place-items-center rounded-full font-display text-sm font-black",
                              reached
                                ? "bg-status-a-solid text-white"
                                : measured
                                  ? "bg-status-na-solid text-white"
                                  : "bg-secondary text-muted-foreground",
                            )}
                          >
                            {c.letter}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-xs font-semibold">
                              {measured ? `${wpmAtBilan} mots/min` : "Non mesuré"}
                            </span>
                            <span className="block text-[0.62rem] text-muted-foreground">
                              cible {c.target}
                              {measured && !reached && ` (−${c.target - wpmAtBilan!})`}
                            </span>
                          </span>
                          {reached && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-status-a-solid" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {/* Historique complet */}
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Historique des relevés
            </h3>
            <ul className="mt-3 space-y-2">
              {current.record.history.length === 0 ? (
                <li className="text-sm text-muted-foreground">Aucun relevé enregistré.</li>
              ) : (
                current.record.history.map((h) => {
                  const chapTarget = orthoTargetForPeriod(h.period);
                  const lvl = chapTarget ? chapterLevel(h.wpm, chapTarget) : fluenceLevel(h.wpm);
                  return (
                    <li
                      key={h.period}
                      className="grid grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3"
                    >
                      <span className="text-sm text-muted-foreground">{h.period}</span>
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={cn("block h-2.5 overflow-hidden rounded-full bg-secondary")}
                        >
                          <span
                            className={cn("block h-full rounded-full", LEVEL_BAR[lvl])}
                            style={{ width: `${Math.min(100, (h.wpm / FLUENCE_TARGET) * 100)}%` }}
                          />
                        </span>
                        {chapTarget && (
                          <span className="text-[0.6rem] text-muted-foreground">
                            cible {chapTarget} mots/min
                          </span>
                        )}
                      </div>
                      <span className="text-right font-display text-sm font-bold tabular-nums">
                        {h.wpm}
                        {h.erreurs !== undefined && (
                          <span className="ml-1 text-[0.65rem] font-normal text-muted-foreground">
                            ({h.erreurs} err.)
                          </span>
                        )}
                      </span>
                    </li>
                  );
                })
              )}
            </ul>
          </section>
        ) : (
          /* ─── Tableau de classe ─── */
          <section className="mt-4 card-surface p-4 shadow-card sm:p-5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <h2 className="min-w-0 truncate text-lg font-semibold">Tableau de la classe</h2>
              <span className="shrink-0 text-xs text-muted-foreground">Cliquez pour le détail</span>
            </div>

            {/* En-tête chapitres */}
            <div className="mt-3 hidden grid-cols-[auto_minmax(0,9rem)_minmax(0,1fr)_repeat(7,1.8rem)_auto] items-center gap-2 px-2 sm:grid">
              <span className="w-9" />
              <span className="text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
                Élève
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
                Progression
              </span>
              {ORTHO_CHAPTERS.map((c) => (
                <span
                  key={c.key}
                  title={`${c.fullLabel} · cible ${c.target} mots/min`}
                  className="text-center text-[0.62rem] font-bold text-muted-foreground"
                >
                  {c.letter}
                </span>
              ))}
              <span className="text-center text-[0.62rem] font-semibold uppercase tracking-wide text-muted-foreground">
                WPM
              </span>
            </div>

            <ul className="mt-1 divide-y divide-border">
              {rows.map(({ student, record, level }) => (
                <li key={student.id}>
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelected(student.id)}
                      className="grid w-full items-center gap-2 rounded-xl px-2 py-2.5 text-left transition-colors duration-150 hover:bg-secondary
                        grid-cols-[auto_minmax(0,1fr)_auto]
                        sm:grid-cols-[auto_minmax(0,9rem)_minmax(0,1fr)_repeat(7,1.8rem)_auto]"
                    >
                      {/* Avatar */}
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface text-xs font-semibold text-muted-foreground">
                        {initials(student)}
                      </span>

                      {/* Nom */}
                      <span className="min-w-0 truncate text-sm font-medium">
                        {fullName(student)}
                      </span>

                      {/* Barre */}
                      <span className="hidden sm:block">
                        <FlexBar wpm={record.wpm} level={level} showMarkers height="h-2.5" />
                      </span>

                      {/* Dots chapitres */}
                      {ORTHO_CHAPTERS.map((c) => {
                        const bilanEntry = record.history.find((h) => h.period === c.key);
                        const reached = bilanEntry !== undefined && bilanEntry.wpm >= c.target;
                        const measured = bilanEntry !== undefined;
                        return (
                          <span
                            key={c.key}
                            title={
                              measured
                                ? `${c.letter} — ${bilanEntry!.wpm} mots/min (cible ${c.target})`
                                : `${c.letter} — non mesuré`
                            }
                            className={cn(
                              "hidden sm:grid h-5 w-5 place-items-center rounded-full text-[0.55rem] font-black",
                              reached
                                ? "bg-status-a-solid text-white"
                                : measured
                                  ? "bg-status-na-solid/60 text-white"
                                  : "bg-secondary text-muted-foreground/40",
                            )}
                          >
                            {c.letter}
                          </span>
                        );
                      })}

                      {/* WPM badge */}
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-3 py-1 font-display text-sm font-bold tabular-nums",
                          LEVEL_CHIP[level],
                        )}
                      >
                        {record.wpm || "—"}
                      </span>
                    </button>

                    {/* Bouton saisie */}
                    <button
                      type="button"
                      title="Saisir un bilan"
                      onClick={() => openModal(student.id)}
                      className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* ─── Modal saisie fluence ─── */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>
              {modalStudent
                ? `${STUDENTS.find((s) => s.id === modalStudent)?.firstName} — nouveau relevé`
                : "Nouveau relevé"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            {/* Rappel protocole */}
            <div className="rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-xs text-muted-foreground space-y-0.5">
              <p className="font-semibold text-foreground">Rappel mesure</p>
              <p>
                Texte lu à voix haute · <strong>1 minute</strong> · Compter les mots lus{" "}
                <strong>sans erreur</strong> (ne pas compter répétitions, omissions, mots
                incorrects).
              </p>
            </div>
            {/* Choix de la période */}
            <div className="space-y-1.5">
              <Label>Moment de l'année</Label>
              <Select value={inputPeriod} onValueChange={setInputPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <div className="px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    Évaluation diagnostique
                  </div>
                  <SelectItem value={DIAGNOSTIC_PERIOD.key}>
                    {DIAGNOSTIC_PERIOD.label} — cible {DIAGNOSTIC_PERIOD.target} mots/min
                  </SelectItem>
                  <div className="mt-1 border-t px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    Bilans Orthographémic
                  </div>
                  {ORTHO_CHAPTERS.map((c) => (
                    <SelectItem key={c.key} value={c.key}>
                      {c.key} — cible {c.target} mots/min
                    </SelectItem>
                  ))}
                  <div className="mt-1 border-t px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-muted-foreground">
                    Repères généraux
                  </div>
                  {["Octobre", "Janvier", "Juin"].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Affichage de la cible pour le chapitre sélectionné */}
              {orthoTargetForPeriod(inputPeriod) !== null && (
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Target className="h-3.5 w-3.5 text-primary" />
                  Cible Orthographémic :{" "}
                  <strong>{orthoTargetForPeriod(inputPeriod)} mots/min</strong>
                </p>
              )}
            </div>

            {/* Saisie WPM */}
            <div className="space-y-1.5">
              <Label>Mots correctement lus en 1 minute</Label>
              <Input
                type="number"
                min={1}
                max={300}
                placeholder="ex. 62"
                value={inputWpm}
                onChange={(e) => setInputWpm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                autoFocus
              />
              {/* Feedback instantané si on a une cible */}
              {(() => {
                const wpm = parseInt(inputWpm, 10);
                const target = orthoTargetForPeriod(inputPeriod);
                if (!target || isNaN(wpm) || wpm < 1) return null;
                const ok = wpm >= target;
                return (
                  <p
                    className={cn(
                      "flex items-center gap-1.5 text-xs font-semibold",
                      ok ? "text-status-a-solid" : "text-status-na-solid",
                    )}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {ok
                      ? `Cible atteinte ! (+${wpm - target} mots/min)`
                      : `En dessous de la cible (−${target - wpm} mots/min)`}
                  </p>
                );
              })()}
            </div>

            {/* Saisie erreurs (optionnel) */}
            <div className="space-y-1.5">
              <Label>
                Erreurs <span className="font-normal text-muted-foreground">(optionnel)</span>
              </Label>
              <Input
                type="number"
                min={0}
                max={99}
                placeholder="ex. 2"
                value={inputErreurs}
                onChange={(e) => setInputErreurs(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
              <p className="text-[0.7rem] text-muted-foreground">
                Mots mal lus, omis ou répétés — reporté sur la fiche bilan RE6 "J'ai fait X
                erreur(s)".
              </p>
            </div>

            <div className="flex gap-2 pt-1">
              <Button className="flex-1" onClick={handleSave}>
                Enregistrer
              </Button>
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
