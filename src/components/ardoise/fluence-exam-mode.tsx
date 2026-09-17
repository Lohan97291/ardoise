import {
  CheckCircle2,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
  Target,
  Timer as TimerIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DIAGNOSTIC_PERIOD,
  ORTHO_CHAPTERS,
  orthoTargetForPeriod,
} from "@/lib/fluence-periods";
import { fullName, initials, type FluenceRecord, type Student } from "@/lib/ardoise-eval";
import { saveFluenceMeasure } from "@/lib/storage";
import { cn } from "@/lib/utils";

const EXAM_DURATION = 60;

/** Petit signal sonore de fin de minuteur — pas de fichier externe nécessaire. */
function playTimerBeep() {
  try {
    const AudioCtxCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxCtor) return;
    const ctx = new AudioCtxCtor();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    osc.onended = () => ctx.close();
  } catch {
    // Le son n'est jamais bloquant : on continue sans lui si l'API est indisponible.
  }
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type SessionEntry = { wpm: number; erreurs?: number };

type FluenceExamDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: Student[];
  fluenceData: FluenceRecord[];
  initialPeriod: string;
  onSaved: () => void;
};

export function FluenceExamDialog({
  open,
  onOpenChange,
  students,
  fluenceData,
  initialPeriod,
  onSaved,
}: FluenceExamDialogProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [period, setPeriod] = useState(initialPeriod);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [mode, setMode] = useState<"count" | "direct">("count");
  const [motsLus, setMotsLus] = useState("");
  const [erreurs, setErreurs] = useState("");
  const [mclmDirect, setMclmDirect] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(EXAM_DURATION);
  const [timerRunning, setTimerRunning] = useState(false);
  const [sessionResults, setSessionResults] = useState<Record<string, SessionEntry>>({});
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Réinitialise l'état de la session à chaque ouverture du mode examen.
  useEffect(() => {
    if (!open) return;
    setCurrentIndex(0);
    setPeriod(initialPeriod);
    setDate(new Date().toISOString().slice(0, 10));
    setMode("count");
    setMotsLus("");
    setErreurs("");
    setMclmDirect("");
    setSecondsLeft(EXAM_DURATION);
    setTimerRunning(false);
    setSessionResults({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Minuteur : décompte chaque seconde tant que timerRunning est vrai.
  useEffect(() => {
    if (!timerRunning) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setTimerRunning(false);
          playTimerBeep();
          toast.info("Temps écoulé !");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timerRunning]);

  // Nettoyage de l'intervalle à la fermeture du dialogue.
  useEffect(() => {
    if (!open && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [open]);

  if (students.length === 0) return null;
  const currentStudent = students[Math.min(currentIndex, students.length - 1)]!;
  const priorRecord = fluenceData.find((f) => f.studentId === currentStudent.id);

  const motsLusNum = parseInt(motsLus, 10);
  const erreursNum = erreurs !== "" ? parseInt(erreurs, 10) : 0;
  const computedMclm =
    !isNaN(motsLusNum) && motsLusNum >= 0
      ? Math.max(0, motsLusNum - (isNaN(erreursNum) ? 0 : erreursNum))
      : null;
  const directMclm = mclmDirect !== "" ? parseInt(mclmDirect, 10) : null;
  const finalWpm = mode === "count" ? computedMclm : directMclm;
  const target = orthoTargetForPeriod(period);
  const testedCount = Object.keys(sessionResults).length;

  function resetInputsForStudent(studentId: string) {
    const existing = sessionResults[studentId];
    setMode("count");
    setMotsLus("");
    setErreurs(existing?.erreurs !== undefined ? String(existing.erreurs) : "");
    setMclmDirect(existing ? String(existing.wpm) : "");
    setSecondsLeft(EXAM_DURATION);
    setTimerRunning(false);
  }

  function selectStudent(index: number) {
    setCurrentIndex(index);
    resetInputsForStudent(students[index]!.id);
  }

  function handleSaveAndNext() {
    if (finalWpm === null || isNaN(finalWpm) || finalWpm < 1 || finalWpm > 300) {
      toast.error("Valeur invalide — le MCLM doit être compris entre 1 et 300 mots/min.");
      return;
    }
    const savedErreurs = mode === "count" && erreurs !== "" ? erreursNum : undefined;
    saveFluenceMeasure(currentStudent.id, finalWpm, period, savedErreurs, date);
    setSessionResults((prev) => ({
      ...prev,
      [currentStudent.id]: { wpm: finalWpm, erreurs: savedErreurs },
    }));
    onSaved();
    toast.success(`${currentStudent.firstName} — ${finalWpm} mots/min enregistré.`);

    // Avance vers le premier élève non encore testé cette session, sinon le suivant dans l'ordre.
    const nextUntested = students.findIndex(
      (s, i) => i !== currentIndex && !(s.id in sessionResults) && s.id !== currentStudent.id,
    );
    const fallbackNext = (currentIndex + 1) % students.length;
    const nextIndex = nextUntested >= 0 ? nextUntested : fallbackNext;
    setCurrentIndex(nextIndex);
    resetInputsForStudent(students[nextIndex]!.id);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b border-border px-5 pb-4 pt-5">
          <DialogTitle className="flex items-center gap-2">
            <TimerIcon className="h-5 w-5 text-primary" />
            Mode examen — Fluence de lecture
          </DialogTitle>
          <div className="flex flex-wrap items-end gap-3 pt-1 text-left">
            <div className="space-y-1">
              <Label className="text-xs">Moment de l'année</Label>
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="h-8 w-52 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DIAGNOSTIC_PERIOD.key}>{DIAGNOSTIC_PERIOD.label}</SelectItem>
                  {ORTHO_CHAPTERS.map((c) => (
                    <SelectItem key={c.key} value={c.key}>
                      {c.key} — cible {c.target} mots/min
                    </SelectItem>
                  ))}
                  {["Octobre", "Janvier", "Juin"].map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Date</Label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-8 w-36 text-xs"
              />
            </div>
            <p className="ml-auto shrink-0 text-xs font-semibold text-muted-foreground">
              {testedCount}/{students.length} élève{testedCount > 1 ? "s" : ""} testé
              {testedCount > 1 ? "s" : ""}
            </p>
          </div>
        </DialogHeader>

        <div className="grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)]">
          {/* Liste des élèves */}
          <div className="max-h-56 overflow-y-auto border-b border-border lg:max-h-none lg:border-b-0 lg:border-r">
            <ul className="divide-y divide-border">
              {students.map((student, index) => {
                const entry = sessionResults[student.id];
                const prior = fluenceData.find((f) => f.studentId === student.id);
                const isCurrent = index === currentIndex;
                return (
                  <li key={student.id}>
                    <button
                      type="button"
                      onClick={() => selectStudent(index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors",
                        isCurrent ? "bg-primary/10" : "hover:bg-secondary",
                      )}
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface text-[0.65rem] font-semibold text-muted-foreground">
                        {initials(student)}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">
                          {fullName(student)}
                        </span>
                        <span className="block text-[0.68rem] text-muted-foreground">
                          {entry
                            ? `${entry.wpm} mots/min (session)`
                            : prior && prior.wpm > 0
                              ? `dernier : ${prior.wpm} mots/min`
                              : "Non testé"}
                        </span>
                      </span>
                      {entry && <CheckCircle2 className="h-4 w-4 shrink-0 text-status-a-solid" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panneau d'examen */}
          <div className="flex flex-col overflow-y-auto p-5">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                {initials(currentStudent)}
              </span>
              <div className="min-w-0">
                <h3 className="truncate font-display text-xl font-bold">
                  {fullName(currentStudent)}
                </h3>
                {priorRecord && priorRecord.wpm > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Dernier relevé : {priorRecord.wpm} mots/min
                  </p>
                )}
              </div>
            </div>

            {/* Minuteur */}
            <div className="mt-5 rounded-2xl border border-border bg-secondary/40 p-4">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={cn(
                    "font-display text-5xl font-black tabular-nums",
                    secondsLeft === 0 ? "text-status-na-solid" : "text-foreground",
                  )}
                >
                  {formatTime(secondsLeft)}
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant={timerRunning ? "outline" : "default"}
                    onClick={() => {
                      if (secondsLeft === 0) setSecondsLeft(EXAM_DURATION);
                      setTimerRunning((r) => !r);
                    }}
                    title={timerRunning ? "Pause" : "Démarrer"}
                  >
                    {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => {
                      setTimerRunning(false);
                      setSecondsLeft(EXAM_DURATION);
                    }}
                    title="Réinitialiser (1 min)"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Progress value={((EXAM_DURATION - secondsLeft) / EXAM_DURATION) * 100} className="mt-3" />
            </div>

            {/* Saisie */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as "count" | "direct")} className="mt-5">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="count">Mots lus + erreurs</TabsTrigger>
                <TabsTrigger value="direct">MCLM direct</TabsTrigger>
              </TabsList>
            </Tabs>

            {mode === "count" ? (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Mots lus</Label>
                  <Input
                    type="number"
                    min={0}
                    max={400}
                    placeholder="ex. 64"
                    value={motsLus}
                    onChange={(e) => setMotsLus(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveAndNext()}
                    autoFocus
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Erreurs</Label>
                  <Input
                    type="number"
                    min={0}
                    max={400}
                    placeholder="ex. 2"
                    value={erreurs}
                    onChange={(e) => setErreurs(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveAndNext()}
                  />
                </div>
                <p className="col-span-2 flex items-baseline gap-2 rounded-xl bg-primary/5 px-3 py-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    MCLM
                  </span>
                  <span className="font-display text-2xl font-bold tabular-nums">
                    {computedMclm ?? "—"}
                  </span>
                  <span className="text-xs text-muted-foreground">mots/min</span>
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-1.5">
                <Label>MCLM (mots correctement lus par minute)</Label>
                <Input
                  type="number"
                  min={0}
                  max={400}
                  placeholder="ex. 62"
                  value={mclmDirect}
                  onChange={(e) => setMclmDirect(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveAndNext()}
                  autoFocus
                />
              </div>
            )}

            {/* Feedback cible */}
            {target !== null && finalWpm !== null && !isNaN(finalWpm) && finalWpm >= 1 && (
              <p
                className={cn(
                  "mt-3 flex items-center gap-1.5 text-xs font-semibold",
                  finalWpm >= target ? "text-status-a-solid" : "text-status-na-solid",
                )}
              >
                <Target className="h-3.5 w-3.5" />
                {finalWpm >= target
                  ? `Cible atteinte ! (+${finalWpm - target} mots/min)`
                  : `En dessous de la cible ${target} mots/min (−${target - finalWpm})`}
              </p>
            )}

            <div className="mt-auto flex gap-2 pt-5">
              <Button className="flex-1" onClick={handleSaveAndNext}>
                Enregistrer et élève suivant
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Terminer
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
