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

/** Fonds de ligne/carte pour rendre la note visible sans masquer le contenu. */
export const STATUS_SURFACE: Record<StatusKey, string> = {
  A: "border-status-a-solid/45 bg-status-a/45 shadow-card",
  PA: "border-status-pa-solid/45 bg-status-pa/45 shadow-card",
  NA: "border-status-na-solid/45 bg-status-na/45 shadow-card",
  NF: "border-status-nf-solid/40 bg-status-nf/40 shadow-card",
  AB: "border-status-ab-solid/40 bg-status-ab/45 shadow-card",
};

/** État sélectionné posé au-dessus du fond de statut. */
export const STATUS_SELECTED_SURFACE: Record<StatusKey, string> = {
  A: "border-status-a-solid/65 bg-status-a/60 ring-2 ring-status-a-solid/25",
  PA: "border-status-pa-solid/65 bg-status-pa/60 ring-2 ring-status-pa-solid/25",
  NA: "border-status-na-solid/65 bg-status-na/60 ring-2 ring-status-na-solid/25",
  NF: "border-status-nf-solid/60 bg-status-nf/55 ring-2 ring-status-nf-solid/25",
  AB: "border-status-ab-solid/60 bg-status-ab/60 ring-2 ring-status-ab-solid/25",
};
