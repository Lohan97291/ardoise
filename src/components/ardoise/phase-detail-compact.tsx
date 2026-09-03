import { cn } from "@/lib/utils";

/**
 * Rendu compact et lisible du déroulé d'une phase.
 *
 * Le détail d'une phase peut être :
 *  - structuré : des labels ("Activité enseignant", "Consignes", "Activité élève",
 *    "Repères"…) et des puces séparés par des retours à la ligne. On affiche alors
 *    chaque label sur sa ligne (petit gras) et les puces indentées ;
 *  - un simple paragraphe (ex. séances EPS) : on l'affiche tel quel.
 *
 * `className` permet d'adapter la taille de texte au contexte (cahier journal,
 * compagnon de classe, modal de séance…).
 */
const PHASE_DETAIL_HEADINGS = new Set([
  "Activité enseignant",
  "Consignes",
  "Activité élève",
  "Repères",
  "Matériel",
  "Différenciation",
  "Formulation ou consigne",
]);

export function PhaseDetailCompact({
  detail,
  className,
}: {
  detail: string;
  className?: string;
}) {
  const lines = detail
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length <= 1) {
    return (
      <p className={cn("leading-relaxed text-muted-foreground", className)}>{detail.trim()}</p>
    );
  }

  return (
    <div className={cn("space-y-1 leading-relaxed text-muted-foreground", className)}>
      {lines.map((line, idx) => {
        if (PHASE_DETAIL_HEADINGS.has(line)) {
          return (
            <p
              key={idx}
              className="mt-2 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-foreground/70"
            >
              {line}
            </p>
          );
        }
        const bullet = line.startsWith("•");
        return (
          <p key={idx} className={cn(bullet && "pl-3")}>
            {bullet ? line.replace(/^•\s*/, "– ") : line}
          </p>
        );
      })}
    </div>
  );
}
