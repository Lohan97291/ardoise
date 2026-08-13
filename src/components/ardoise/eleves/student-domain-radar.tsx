import { ChevronRight, Radar as RadarIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";

import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { DomainScore } from "@/lib/student-domains";
import { cn } from "@/lib/utils";

const RADAR_CONFIG: ChartConfig = {
  score: { label: "Élève", color: "var(--color-chart-1)" },
  classScore: { label: "Classe", color: "var(--color-chart-3)" },
};

/**
 * Diagramme de Kiviat (radar) des domaines d'apprentissage d'un élève.
 * Chaque axe est cliquable : la liste des exercices du domaine s'affiche à côté.
 */
export function StudentDomainRadar({
  domains,
  compareDomains,
}: {
  domains: DomainScore[];
  compareDomains?: { key: string; score: number }[];
}) {
  const active = useMemo(
    () => domains.filter((domain) => domain.items.length > 0 || domain.evaluated > 0),
    [domains],
  );
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const selected = domains.find((domain) => domain.key === selectedKey) ?? null;

  if (active.length === 0) {
    return (
      <p className="grid min-h-[200px] place-items-center rounded-2xl border border-dashed border-border px-4 text-center text-sm text-muted-foreground">
        Le diagramme des domaines apparaîtra dès la première correction saisie pour cet élève.
      </p>
    );
  }
  const data = domains.map((domain) => ({
    domain: domain.short,
    key: domain.key,
    score: domain.score,
    classScore: compareDomains?.find((item) => item.key === domain.key)?.score,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div>
        <ChartContainer config={RADAR_CONFIG} className="mx-auto aspect-square max-h-[280px]">
          <RadarChart
            data={data}
            outerRadius="72%"
            onClick={(state: { activeLabel?: string }) => {
              const found = active.find((domain) => domain.short === state?.activeLabel);
              setSelectedKey(found ? found.key : null);
            }}
          >
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="domain"
              tick={{ fontSize: 11 }}
              onClick={(payload: { value?: string }) => {
                const found = active.find((domain) => domain.short === payload?.value);
                setSelectedKey(found ? found.key : null);
              }}
            />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="score"
              stroke="var(--color-score)"
              fill="var(--color-score)"
              fillOpacity={0.28}
              strokeWidth={2}
              dot={{ r: 3.5, fill: "var(--color-score)" }}
              activeDot={{ r: 6 }}
            />
            {compareDomains?.length ? (
              <Radar
                dataKey="classScore"
                stroke="var(--color-classScore)"
                fill="var(--color-classScore)"
                fillOpacity={0.08}
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={{ r: 2.5, fill: "var(--color-classScore)" }}
              />
            ) : null}
          </RadarChart>
        </ChartContainer>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {active.map((domain) => (
            <button
              key={domain.key}
              type="button"
              onClick={() => setSelectedKey(domain.key === selectedKey ? null : domain.key)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-[0.7rem] font-semibold transition-colors",
                domain.key === selectedKey
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-background/80 text-muted-foreground hover:bg-secondary",
              )}
            >
              {domain.short} · {domain.score}%
            </button>
          ))}
        </div>
        {compareDomains?.length ? (
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[0.7rem] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-score)]" />
              Élève
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-classScore)]" />
              Moyenne de la classe
            </span>
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border bg-background/70 p-3">
        {selected ? (
          <>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-foreground">{selected.label}</p>
                <p className="text-xs text-muted-foreground">
                  {selected.score}% de maîtrise · {selected.evaluated} exercice(s) renseigné(s)
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[0.7rem] font-bold text-primary">
                {selected.acquired} A · {selected.partial} PA · {selected.failed} NA
              </span>
            </div>
            {selected.items.length > 0 ? (
              <ul className="mt-2 max-h-[240px] space-y-1 overflow-y-auto pr-1">
                {selected.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/60"
                  >
                    <span className="shrink-0 text-[0.65rem] font-semibold text-muted-foreground">
                      P{item.period}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-foreground">{item.title}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                        STATUS_CHIP[item.status],
                      )}
                    >
                      {item.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-3 rounded-2xl border border-dashed border-border bg-secondary/20 px-3 py-3 text-sm text-muted-foreground">
                Cette vue montre ici le niveau moyen de la classe sur ce domaine. Utilisez
                l’araignée de l’élève pour retrouver le détail exercice par exercice.
              </div>
            )}
          </>
        ) : (
          <div className="grid h-full min-h-[180px] place-items-center px-4 text-center">
            <p className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-secondary text-muted-foreground">
                <RadarIcon className="h-5 w-5" />
              </span>
              Cliquez sur un domaine du diagramme pour voir le détail des exercices.
              <span className="inline-flex items-center gap-1 text-xs text-primary">
                Astuce <ChevronRight className="h-3 w-3" />
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
