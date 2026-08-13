import type { StatusKey } from "@/lib/ardoise-eval";

/** Pastilles douces (fond teinté + texte foncé) */
export const STATUS_CHIP: Record<StatusKey, string> = {
  A: "bg-status-a text-status-a-foreground",
  PA: "bg-status-pa text-status-pa-foreground",
  NA: "bg-status-na text-status-na-foreground",
  NF: "bg-status-nf text-status-nf-foreground",
  AB: "bg-status-ab text-status-ab-foreground",
};

/** Bordures pour boutons / tuiles */
export const STATUS_BORDER: Record<StatusKey, string> = {
  A: "border-status-a-solid/35",
  PA: "border-status-pa-solid/35",
  NA: "border-status-na-solid/35",
  NF: "border-status-nf-solid/35",
  AB: "border-status-ab-solid/35",
};

/** Remplissage plein (barres de progression, sélection) */
export const STATUS_SOLID: Record<StatusKey, string> = {
  A: "bg-status-a-solid",
  PA: "bg-status-pa-solid",
  NA: "bg-status-na-solid",
  NF: "bg-status-nf-solid",
  AB: "bg-status-ab-solid",
};

export const STATUS_RING: Record<StatusKey, string> = {
  A: "ring-status-a-solid",
  PA: "ring-status-pa-solid",
  NA: "ring-status-na-solid",
  NF: "ring-status-nf-solid",
  AB: "ring-status-ab-solid",
};
