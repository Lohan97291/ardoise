import { useMemo, useState } from "react";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SUBJECTS, type SubjectKey } from "@/lib/ardoise-data";
import { CLEO_CATALOG, MATHS_CATALOG, type CatalogEntry } from "@/lib/ardoise-eval";
import { getExercisePlan } from "@/lib/exercise-plans";
import { getPedagogicalOptions } from "@/lib/pedagogical-options";
import { getItemState, getProgression } from "@/lib/programmation-storage";
import type { TimetableSlot } from "@/lib/timetable-storage";

type ProgrammingOption = CatalogEntry & { displayTitle: string };

type TemplateWindow = {
  start: number;
  end: number;
  label: string;
};

type BuilderTemplate = {
  id: string;
  title: string;
  subject: SubjectKey;
  duration: number;
  hint: string;
  windows: TemplateWindow[];
};

const EDITABLE_SUBJECTS: SubjectKey[] = [
  "francais",
  "maths",
  "qlm",
  "emc",
  "eps",
  "arts",
  "lve",
  "rituels",
];

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours! * 60 + minutes!;
}

function hoursLabel(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (hours === 0) return `${remaining}min`;
  return remaining ? `${hours}h${String(remaining).padStart(2, "0")}` : `${hours}h`;
}

function programmingOptions(subject: SubjectKey): ProgrammingOption[] {
  const catalog = subject === "francais" ? CLEO_CATALOG : subject === "maths" ? MATHS_CATALOG : [];
  const progression = getProgression();
  return catalog.map((entry) => ({
    ...entry,
    displayTitle: getItemState(progression, entry.id).titleOverride ?? entry.title,
  }));
}

function buildSlotTitle(
  title: string,
  subject: SubjectKey,
  pedagogicalDomain?: string,
  pedagogicalSubDomain?: string,
): string {
  const trimmed = title.trim();
  if (trimmed) return trimmed;
  if (pedagogicalSubDomain) return pedagogicalSubDomain;
  if (pedagogicalDomain) return pedagogicalDomain;
  return SUBJECTS[subject].label;
}

const w = (start: string, end: string, label: string): TemplateWindow => ({
  start: toMinutes(start),
  end: toMinutes(end),
  label,
});

const BLOCK_LIBRARY: BuilderTemplate[] = [
  {
    id: "lecture",
    title: "Lecture",
    subject: "francais",
    duration: 20,
    hint: "Lecture guidée ou autonome, courte et régulière.",
    windows: [
      w("09:35", "10:00", "souvent en fin de matinée"),
      w("13:45", "14:30", "ou juste après le retour"),
      w("16:00", "16:30", "ou pour une lecture offerte en fin de journée"),
    ],
  },
  {
    id: "fluence",
    title: "Fluence",
    subject: "francais",
    duration: 15,
    hint: "Entraînement court et ritualisé sur lecture répétée.",
    windows: [
      w("08:30", "09:15", "en début de matinée"),
      w("13:30", "14:15", "ou en reprise d'après-midi"),
    ],
  },
  {
    id: "orthographe-dictee",
    title: "Orthographe / dictée",
    subject: "francais",
    duration: 25,
    hint: "Bloc court et cadré avant la grande séance suivante.",
    windows: [
      w("10:05", "10:35", "souvent après récréation"),
      w("08:30", "09:15", "ou en début de matinée"),
    ],
  },
  {
    id: "grammaire",
    title: "Grammaire",
    subject: "francais",
    duration: 45,
    hint: "Séance structurée, plutôt sur un temps stable et calme.",
    windows: [
      w("08:30", "09:50", "en matinée"),
      w("10:45", "11:30", "ou avant la pause méridienne"),
      w("13:45", "14:45", "éventuellement sur un vrai temps d'après-midi"),
    ],
  },
  {
    id: "ecriture-copie",
    title: "Écriture / copie",
    subject: "francais",
    duration: 15,
    hint: "Petit créneau quotidien, facile à placer en reprise.",
    windows: [
      w("13:30", "14:00", "au retour de midi"),
      w("15:05", "15:35", "ou en fin de journée"),
    ],
  },
  {
    id: "litterature-album",
    title: "Littérature / album",
    subject: "francais",
    duration: 35,
    hint: "Place dédiée au projet album, lecture-compréhension et échanges.",
    windows: [
      w("13:45", "14:30", "plutôt en début d'après-midi"),
      w("09:10", "10:00", "ou sur un grand créneau du matin"),
    ],
  },
  {
    id: "production-ecrit",
    title: "Production d'écrit",
    subject: "francais",
    duration: 45,
    hint: "Temps de recherche, oralisation, rédaction et reprise.",
    windows: [w("13:45", "15:15", "sur un temps long d'après-midi")],
  },
  {
    id: "flash-maths",
    title: "Flash maths",
    subject: "maths",
    duration: 5,
    hint: "Rituel très court de réactivation, conforme au guide.",
    windows: [
      w("08:45", "08:55", "en lancement de matinée"),
      w("10:05", "10:15", "avant une grande séance"),
      w("14:20", "14:35", "en relance d'après-midi"),
    ],
  },
  {
    id: "probleme-jour",
    title: "Problème du jour",
    subject: "maths",
    duration: 15,
    hint: "Petit temps de recherche avant ou autour de la séance de maths.",
    windows: [
      w("10:25", "10:50", "souvent autour du coeur de séance"),
      w("13:40", "14:10", "ou en début d'après-midi"),
    ],
  },
  {
    id: "calcul-mental",
    title: "Calcul mental",
    subject: "maths",
    duration: 10,
    hint: "Séance quotidienne courte, comme dans le guide.",
    windows: [w("09:20", "11:05", "en matinée"), w("14:20", "15:00", "ou en après-midi")],
  },
  {
    id: "sequence-maths-45",
    title: "Mathématiques",
    subject: "maths",
    duration: 45,
    hint: "Grande séance structurée, format 45 min du guide.",
    windows: [
      w("08:45", "09:55", "sur une vraie plage du matin"),
      w("10:05", "11:00", "ou juste après récréation"),
      w("13:55", "14:45", "ou en début d'après-midi"),
    ],
  },
  {
    id: "sequence-maths-35",
    title: "Mathématiques",
    subject: "maths",
    duration: 35,
    hint: "Format 35 min du guide, plus léger mais structuré.",
    windows: [
      w("08:50", "09:35", "sur le début de matinée"),
      w("10:05", "10:55", "ou juste après récréation"),
      w("13:55", "14:35", "ou en début d'après-midi"),
    ],
  },
  {
    id: "atelier-problemes",
    title: "Atelier problèmes",
    subject: "maths",
    duration: 30,
    hint: "Temps dédié de résolution de problèmes, comme indiqué dans le guide.",
    windows: [w("10:05", "11:15", "autour du bloc maths"), w("14:00", "15:00", "ou l'après-midi")],
  },
  {
    id: "anglais-rituel",
    title: "Anglais",
    subject: "lve",
    duration: 10,
    hint: "Format très court autorisé pour un petit rituel oral.",
    windows: [w("08:30", "09:20", "en rituel"), w("14:15", "15:35", "ou en fin de journée")],
  },
  {
    id: "anglais-seance",
    title: "Anglais",
    subject: "lve",
    duration: 30,
    hint: "Séance plus complète avec oral, écoute et réemploi.",
    windows: [
      w("15:05", "15:50", "plutôt l'après-midi"),
      w("13:55", "14:45", "ou après la reprise"),
    ],
  },
  {
    id: "qlm",
    title: "Questionner le monde",
    subject: "qlm",
    duration: 45,
    hint: "Bloc de découverte, manipulation ou structuration.",
    windows: [
      w("08:45", "09:50", "en matinée"),
      w("14:20", "15:00", "ou en début d'après-midi"),
      w("15:05", "16:00", "ou en fin d'après-midi"),
    ],
  },
  {
    id: "emc",
    title: "EMC",
    subject: "emc",
    duration: 30,
    hint: "Temps d'échanges, débat, régulation ou séance dédiée.",
    windows: [
      w("08:30", "09:15", "en ouverture"),
      w("13:45", "14:35", "ou en reprise d'après-midi"),
    ],
  },
  {
    id: "arts-visuels",
    title: "Arts visuels",
    subject: "arts",
    duration: 45,
    hint: "Créneau assez long pour installer, produire et ranger.",
    windows: [w("15:20", "16:30", "plutôt en deuxième partie d'après-midi")],
  },
];

function getTemplate(templateId?: string): BuilderTemplate | undefined {
  return BLOCK_LIBRARY.find((template) => template.id === templateId);
}

function resolveTemplate(slot: TimetableSlot): BuilderTemplate | undefined {
  return slot.builderTemplateId ? getTemplate(slot.builderTemplateId) : undefined;
}

function windowSummary(windows: TemplateWindow[]): string {
  return windows.map((window) => window.label).join(" · ");
}

type Props = {
  slot: TimetableSlot | null;
  onClose: () => void;
  onSave: (slot: TimetableSlot) => void;
  onDelete?: () => void;
};

export function TimetableSlotDialog({ slot, onClose, onSave, onDelete }: Props) {
  const [title, setTitle] = useState(slot?.title ?? "");
  const [subject, setSubject] = useState<SubjectKey>(slot?.subject ?? "francais");
  const [start, setStart] = useState(slot?.start ?? "08:30");
  const [end, setEnd] = useState(slot?.end ?? "09:00");
  const [pedagogicalDomain, setPedagogicalDomain] = useState(slot?.pedagogicalDomain ?? "");
  const [pedagogicalSubDomain, setPedagogicalSubDomain] = useState(
    slot?.pedagogicalSubDomain ?? "",
  );
  const [programmingItemId, setProgrammingItemId] = useState(slot?.programmingItemId ?? "");

  const options = programmingOptions(subject);
  const template = slot ? resolveTemplate(slot) : undefined;
  const domainOptions = useMemo(() => getPedagogicalOptions(subject), [subject]);
  const selectedDomain = domainOptions.find((option) => option.label === pedagogicalDomain) ?? null;
  const duration = start && end ? Math.max(0, toMinutes(end) - toMinutes(start)) : 0;

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>{slot ? "Modifier le bloc" : "Nouveau bloc"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          {template ? (
            <div className="rounded-xl border border-border bg-surface px-3 py-2.5">
              <p className="text-xs font-semibold text-foreground">Repère Ardoise</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Format de référence : {hoursLabel(template.duration)} ·{" "}
                {windowSummary(template.windows)}
              </p>
            </div>
          ) : null}

          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_12rem]">
            <div className="space-y-1.5">
              <Label>Intitulé du bloc</Label>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex. Langage oral, Littérature, Calcul mental..."
                autoFocus
              />
            </div>
            <div className="space-y-1.5">
              <Label>Matière</Label>
              <Select
                value={subject}
                onValueChange={(value) => {
                  const nextSubject = value as SubjectKey;
                  setSubject(nextSubject);
                  setPedagogicalDomain("");
                  setPedagogicalSubDomain("");
                  if (nextSubject !== "francais" && nextSubject !== "maths") {
                    setProgrammingItemId("");
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {EDITABLE_SUBJECTS.map((item) => (
                    <SelectItem key={item} value={item}>
                      {SUBJECTS[item].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Domaine</Label>
              <Select
                value={pedagogicalDomain || "__none"}
                onValueChange={(value) => {
                  setPedagogicalDomain(value === "__none" ? "" : value);
                  setPedagogicalSubDomain("");
                }}
                disabled={domainOptions.length === 0}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">Non précisé</SelectItem>
                  {domainOptions.map((option) => (
                    <SelectItem key={option.label} value={option.label}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sous-domaine</Label>
              <Select
                value={pedagogicalSubDomain || "__none"}
                onValueChange={(value) => setPedagogicalSubDomain(value === "__none" ? "" : value)}
                disabled={!selectedDomain}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir un sous-domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">Non précisé</SelectItem>
                  {(selectedDomain?.subDomains ?? []).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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

          <div className="rounded-xl border border-border bg-surface/70 px-3 py-2.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-card px-2 py-1 font-semibold text-foreground">
                {SUBJECTS[subject].label}
              </span>
              {pedagogicalDomain ? (
                <span className="rounded-full border border-border bg-card px-2 py-1">
                  {pedagogicalDomain}
                </span>
              ) : null}
              {pedagogicalSubDomain ? (
                <span className="rounded-full border border-border bg-card px-2 py-1">
                  {pedagogicalSubDomain}
                </span>
              ) : null}
              <span className="ml-auto font-mono">
                {duration > 0 ? hoursLabel(duration) : "0min"}
              </span>
            </div>
            <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground">
              Si tu laisses l'intitulé vide, Ardoise reprendra automatiquement le sous-domaine ou le
              domaine choisi pour nommer le bloc.
            </p>
          </div>

          {options.length > 0 ? (
            <div className="space-y-1.5">
              <Label>Rattacher une séance de programmation</Label>
              <select
                value={programmingItemId}
                onChange={(event) => setProgrammingItemId(event.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Aucune séance rattachée</option>
                {options.map((entry) => (
                  <option key={entry.id} value={entry.id}>
                    P{entry.period} · {entry.displayTitle}
                  </option>
                ))}
              </select>
              <p className="text-[0.7rem] leading-relaxed text-muted-foreground">
                La séance choisie sera conservée avec ce créneau et réutilisable pour préparer la
                séance.
              </p>
            </div>
          ) : null}
        </div>

        <DialogFooter className="mt-2 flex items-center sm:justify-between">
          {onDelete ? (
            <Button variant="ghost" className="text-danger-strong" onClick={onDelete}>
              Supprimer
            </Button>
          ) : (
            <span />
          )}
          <Button
            onClick={() => {
              const matchedTemplate = slot?.builderTemplateId
                ? getTemplate(slot.builderTemplateId)
                : undefined;
              const nextTemplateId =
                matchedTemplate && matchedTemplate.subject === subject
                  ? matchedTemplate.id
                  : undefined;

              onSave({
                start,
                end,
                title: buildSlotTitle(title, subject, pedagogicalDomain, pedagogicalSubDomain),
                subject,
                pedagogicalDomain: pedagogicalDomain || undefined,
                pedagogicalSubDomain: pedagogicalSubDomain || undefined,
                programmingItemId: programmingItemId || undefined,
                exercisePlan: getExercisePlan(programmingItemId),
                builderTemplateId: nextTemplateId,
              });
            }}
          >
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
