import {
  getPrepSheet,
  SUBJECTS,
  type PrepPhase,
  type Session,
  type SubjectKey,
} from "@/lib/ardoise-data";
import { getPatchedPrepSheet } from "@/lib/patched-prep-sheets";
import { getCustomSessionPrep } from "@/lib/custom-session-prep-storage";
import { getCustomPhases } from "@/lib/custom-phases-storage";
import { PhaseDetailCompact } from "@/components/ardoise/phase-detail-compact";

/**
 * Vue imprimable du cahier journal (quotidienne « fiche » ou hebdomadaire « grille »).
 *
 * Rendu propre pensé pour l'export PDF (via window.print()). Masquée à l'écran,
 * visible uniquement à l'impression (classe `journal-export`). Les champs affichés
 * sont pilotés par `options` — les mêmes items que l'enseignant remplit. Le style
 * (couleurs, accent) est piloté par `theme`.
 */

export type JournalExportTheme = "ardoise" | "ocean" | "colore" | "sobre";

export type JournalPrintOptions = {
  times: boolean;
  subjects: boolean;
  domaine: boolean;
  competence: boolean;
  objectif: boolean;
  materiel: boolean;
  activites: boolean;
  notes: boolean;
  pauses: boolean;
};

export type JournalPrintEntry = {
  dateLabel: string;
  sessions: Session[];
};

export const DEFAULT_PRINT_OPTIONS: JournalPrintOptions = {
  times: true,
  subjects: true,
  domaine: true,
  competence: true,
  objectif: true,
  materiel: true,
  activites: true,
  notes: true,
  pauses: true,
};

/* ─────────────── Résolution de la préparation d'une séance ─────────────── */

type ResolvedPrep = {
  domaine: string;
  competence: string;
  objective: string;
  material: string[];
  phases: PrepPhase[];
  note: string;
};

function mergeUnique(values: string[]): string[] {
  const seen = new Set<string>();
  return values.filter((value) => {
    const key = value?.trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function resolvePrep(session: Session): ResolvedPrep {
  const sheet = getPatchedPrepSheet(session.prepSheetId) ?? getPrepSheet(session.prepSheetId);
  const customPrep = getCustomSessionPrep(session.id);
  const customPhases = getCustomPhases(session.id);

  const phases: PrepPhase[] = sheet?.phases?.length
    ? sheet.phases
    : customPhases.length
      ? customPhases
      : [];

  const domaine =
    sheet?.disciplinaryDomains?.join(" · ") ||
    session.pedagogicalDomain ||
    session.pedagogicalSubDomain ||
    "";

  return {
    domaine,
    competence: customPrep.competence || sheet?.competence || "",
    objective: customPrep.objective || sheet?.objective || "",
    material: mergeUnique([...(sheet?.material ?? []), ...customPrep.materialSuggestions]),
    phases,
    note: session.note ?? "",
  };
}

/* ─────────────── Utilitaires ─────────────── */

function fmtTime(value?: string): string {
  if (!value) return "";
  const [h = "0", m = "00"] = value.split(":");
  const hour = String(Number(h));
  return m === "00" ? `${hour}h` : `${hour}h${m}`;
}

function durationLabel(start?: string, end?: string): string {
  if (!start || !end) return "";
  const toMin = (v: string) => {
    const [h = "0", m = "0"] = v.split(":");
    return Number(h) * 60 + Number(m);
  };
  const mins = toMin(end) - toMin(start);
  if (mins <= 0) return "";
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const r = mins % 60;
  return r === 0 ? `${h} h` : `${h} h ${r}`;
}

function subjectClass(subject: SubjectKey): string {
  return `s-${subject}`;
}

/* ─────────────── Vue QUOTIDIENNE (fiche détaillée) ─────────────── */

function DayField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <p className="jx-f">
      <b>{label} :</b> {children}
    </p>
  );
}

function DaySession({ session, options }: { session: Session; options: JournalPrintOptions }) {
  const subject = SUBJECTS[session.subject];
  const isPause = session.subject === "pause";

  if (isPause) {
    return (
      <div className="jx-pause">
        {options.times ? (
          <span className="jx-time">
            {session.start} – {session.end}
          </span>
        ) : null}
        <span className="jx-pause-name">{session.title}</span>
        <span className="jx-pause-dur">{durationLabel(session.start, session.end)}</span>
      </div>
    );
  }

  const prep = resolvePrep(session);
  const dur = durationLabel(session.start, session.end);

  return (
    <div className={`jx-session ${subjectClass(session.subject)}`}>
      <div className="jx-shead">
        {options.times ? (
          <span className="jx-time">
            {session.start} – {session.end}
          </span>
        ) : null}
        <span className="jx-stitle">{session.title}</span>
        {options.subjects ? <span className="jx-badge">{subject.label}</span> : null}
        {options.times && dur ? <span className="jx-sdur">{dur}</span> : null}
      </div>

      <div className="jx-fields">
        {options.domaine && prep.domaine ? <DayField label="Domaine">{prep.domaine}</DayField> : null}
        {options.competence && prep.competence ? (
          <DayField label="Compétence">{prep.competence}</DayField>
        ) : null}
        {options.objectif && prep.objective ? (
          <DayField label="Objectif">{prep.objective}</DayField>
        ) : null}
        {options.materiel && prep.material.length ? (
          <DayField label="Matériel">{prep.material.join(" · ")}</DayField>
        ) : null}
      </div>

      {options.activites && prep.phases.length ? (
        <div className="jx-deroule">
          <p className="jx-lbl">Déroulé{prep.phases.length > 1 ? ` · ${prep.phases.length} phases` : ""}</p>
          {prep.phases.map((phase, i) => (
            <div key={i} className="jx-phase">
              <p className="jx-ptitle">
                {phase.title}
                {phase.duration ? <span className="jx-pdur"> · {phase.duration}</span> : null}
              </p>
              <PhaseDetailCompact detail={phase.detail} className="jx-pbody" />
            </div>
          ))}
        </div>
      ) : null}

      {options.notes && prep.note ? <div className="jx-note"><b>Note :</b> {prep.note}</div> : null}
    </div>
  );
}

function DayView({ entry, options }: { entry: JournalPrintEntry; options: JournalPrintOptions }) {
  const sessions = options.pauses
    ? entry.sessions
    : entry.sessions.filter((s) => s.subject !== "pause");

  return (
    <>
      {sessions.length === 0 ? (
        <p className="jx-empty">Aucune séance sur cette journée.</p>
      ) : (
        sessions.map((session) => (
          <DaySession key={session.id} session={session} options={options} />
        ))
      )}
    </>
  );
}

/* ─────────────── Vue HEBDOMADAIRE (grille créneaux × jours) ─────────────── */

type GridRow = {
  time: string;
  isBand: boolean;
  bandLabel?: string;
  cells: (Session | null)[];
};

function buildGrid(entries: JournalPrintEntry[], options: JournalPrintOptions) {
  // On garde uniquement les jours qui ont au moins une séance affichable.
  const days = entries
    .map((entry) => ({
      label: entry.dateLabel,
      sessions: options.pauses
        ? entry.sessions
        : entry.sessions.filter((s) => s.subject !== "pause"),
    }))
    .filter((day) => day.sessions.length > 0);

  // Union triée des heures de début.
  const times = Array.from(
    new Set(days.flatMap((day) => day.sessions.map((s) => s.start))),
  ).sort();

  const rows: GridRow[] = times.map((time) => {
    const cells = days.map(
      (day) => day.sessions.find((s) => s.start === time) ?? null,
    );
    const present = cells.filter((c): c is Session => Boolean(c));
    const isBand = present.length > 0 && present.every((c) => c.subject === "pause");
    return {
      time,
      isBand,
      bandLabel: isBand ? present[0]?.title : undefined,
      cells,
    };
  });

  return { days, rows };
}

function GridCell({ session, options }: { session: Session; options: JournalPrintOptions }) {
  const prep = resolvePrep(session);
  const body = prep.note || prep.objective || "";
  return (
    <div className={`jx-cell ${subjectClass(session.subject)}`}>
      <p className="jx-ctitle">{session.title}</p>
      {body ? <p className="jx-cbody">{body}</p> : null}
      {options.competence && prep.competence ? (
        <p className="jx-comp">
          <span className="jx-comp-lab">Compétence</span> : {prep.competence}
        </p>
      ) : null}
      {options.domaine && prep.domaine ? <p className="jx-dom">{prep.domaine}</p> : null}
    </div>
  );
}

function WeekView({
  entries,
  options,
}: {
  entries: JournalPrintEntry[];
  options: JournalPrintOptions;
}) {
  const { days, rows } = buildGrid(entries, options);

  if (days.length === 0) {
    return <p className="jx-empty">Aucune séance sur cette semaine.</p>;
  }

  const colWidth = `${(100 - 6.2) / days.length}%`;

  return (
    <table className="jx-grid">
      <colgroup>
        <col style={{ width: "6.2%" }} />
        {days.map((_, i) => (
          <col key={i} style={{ width: colWidth }} />
        ))}
      </colgroup>
      <thead>
        <tr>
          <th className="jx-corner" />
          {days.map((day, i) => (
            <th key={i} className="jx-day">
              {day.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) =>
          row.isBand ? (
            <tr key={ri}>
              <td className="jx-t jx-band-t">{fmtTime(row.time)}</td>
              <td className="jx-band" colSpan={days.length}>
                {row.bandLabel || "Pause"}
              </td>
            </tr>
          ) : (
            <tr key={ri}>
              <td className="jx-t">{fmtTime(row.time)}</td>
              {row.cells.map((cell, ci) => (
                <td key={ci} className="jx-td">
                  {cell ? <GridCell session={cell} options={options} /> : null}
                </td>
              ))}
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

/* ─────────────── Composant principal ─────────────── */

export function JournalPrintView({
  mode,
  title,
  meta,
  weekTitle,
  entries,
  options,
  theme = "ardoise",
}: {
  mode: "day" | "week";
  title: string;
  meta?: string;
  weekTitle?: string;
  entries: JournalPrintEntry[];
  options: JournalPrintOptions;
  theme?: JournalExportTheme;
}) {
  const orientation = mode === "week" ? "landscape" : "portrait";

  return (
    <div className={`journal-export t-${theme}`} aria-hidden>
      <style>{EXPORT_CSS}</style>
      <style>{`@media print { @page { size: A4 ${orientation}; margin: ${
        mode === "week" ? "9mm" : "12mm"
      }; } }`}</style>

      {mode === "week" ? (
        <>
          <p className="jx-doc-title">{weekTitle ?? title}</p>
          <WeekView entries={entries} options={options} />
          <p className="jx-foot">Ardoise · Cahier journal — Organisation hebdomadaire</p>
        </>
      ) : (
        <>
          <header className="jx-header">
            <div>
              <p className="jx-eyebrow">Cahier journal</p>
              <h1 className="jx-heading">{title}</h1>
              {meta ? <p className="jx-sub">{meta}</p> : null}
            </div>
          </header>
          <DayView entry={entries[0] ?? { dateLabel: title, sessions: [] }} options={options} />
          <p className="jx-foot">Ardoise · Cahier journal — {title}</p>
        </>
      )}
    </div>
  );
}

/* ─────────────── Feuille de style de l'export (auto-contenue) ─────────────── */

const EXPORT_CSS = `
.journal-export {
  --ink:#1a2233; --muted:#5b6473; --line:#d7dce6; --line-strong:#c2c9d6;
  --accent:#2f5d50; --accent-soft:#eef4f1;
  color:var(--ink);
  font-family:"Inter","Segoe UI",system-ui,-apple-system,sans-serif;
  background:#fff;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;
}
.journal-export * { box-sizing:border-box; }

/* thèmes */
.journal-export.t-ardoise { --accent:#2f5d50; --accent-soft:#eef4f1; }
.journal-export.t-ocean   { --accent:#1d4ed8; --accent-soft:#e8eefc; }
.journal-export.t-colore  { --accent:#7c3aed; --accent-soft:#f2ecfe; }
.journal-export.t-sobre   { --accent:#111827; --accent-soft:#f3f4f6; }

/* couleurs matières */
.journal-export .s-francais { --sub:#2563eb; --sub-bg:#e8f0fe; --sub-ink:#1d4ed8; }
.journal-export .s-maths    { --sub:#e11d48; --sub-bg:#ffe9ef; --sub-ink:#9f1239; }
.journal-export .s-qlm      { --sub:#14b8a6; --sub-bg:#d9f6f1; --sub-ink:#0f766e; }
.journal-export .s-emc      { --sub:#b45309; --sub-bg:#fdecd8; --sub-ink:#92400e; }
.journal-export .s-eps      { --sub:#f97316; --sub-bg:#ffedd9; --sub-ink:#c2410c; }
.journal-export .s-arts     { --sub:#d946ef; --sub-bg:#fbe8fe; --sub-ink:#a21caf; }
.journal-export .s-lve      { --sub:#8b5cf6; --sub-bg:#f1ebfe; --sub-ink:#6d28d9; }
.journal-export .s-rituels  { --sub:#64748b; --sub-bg:#eef2f7; --sub-ink:#475569; }
.journal-export .s-pause    { --sub:#cbd5e1; --sub-bg:#f1f5f9; --sub-ink:#64748b; }

/* thème Sobre : tout en gris */
.journal-export.t-sobre .s-francais,
.journal-export.t-sobre .s-maths,
.journal-export.t-sobre .s-qlm,
.journal-export.t-sobre .s-emc,
.journal-export.t-sobre .s-eps,
.journal-export.t-sobre .s-arts,
.journal-export.t-sobre .s-lve,
.journal-export.t-sobre .s-rituels,
.journal-export.t-sobre .s-pause {
  --sub:#6b7280; --sub-bg:#f3f4f6; --sub-ink:#374151;
}

/* ===== Vue jour ===== */
.journal-export .jx-header {
  display:flex; align-items:flex-end; justify-content:space-between; gap:16px;
  padding-bottom:10px; margin-bottom:14px; border-bottom:2.5px solid var(--accent);
}
.journal-export .jx-eyebrow {
  font-size:7.5pt; letter-spacing:.18em; text-transform:uppercase; color:var(--accent);
  font-weight:700; margin:0 0 2px;
}
.journal-export .jx-heading {
  font-size:21pt; font-weight:800; margin:0; letter-spacing:-.02em;
  text-transform:capitalize; line-height:1.05;
}
.journal-export .jx-sub { font-size:9pt; color:var(--muted); margin:4px 0 0; }

.journal-export .jx-session {
  position:relative; margin:0 0 8px; padding:8px 12px 9px 16px;
  border:1px solid var(--line); border-radius:11px; background:#fff;
  break-inside:avoid; page-break-inside:avoid;
}
.journal-export .jx-session::before {
  content:""; position:absolute; left:0; top:8px; bottom:8px; width:4px; border-radius:4px;
  background:var(--sub,#cbd5e1);
}
.journal-export.t-colore .jx-session {
  background:color-mix(in srgb, var(--sub) 7%, #fff);
  border-color:color-mix(in srgb, var(--sub) 20%, #fff);
}
.journal-export .jx-shead { display:flex; align-items:baseline; gap:10px; }
.journal-export .jx-time {
  font-variant-numeric:tabular-nums; font-weight:700; font-size:8.6pt; color:var(--muted);
  white-space:nowrap;
}
.journal-export .jx-stitle { font-size:11pt; font-weight:800; letter-spacing:-.01em; flex:1; }
.journal-export.t-colore .jx-stitle { color:var(--sub-ink); }
.journal-export .jx-badge {
  font-size:7.2pt; font-weight:700; white-space:nowrap; padding:2px 9px; border-radius:999px;
  color:var(--sub-ink,#334155); background:var(--sub-bg,#f1f5f9);
}
.journal-export .jx-sdur { font-size:7.6pt; color:var(--muted); font-weight:600; white-space:nowrap; }

.journal-export .jx-fields { margin-top:5px; display:grid; gap:2px; }
.journal-export .jx-f { font-size:9pt; color:#2a3346; margin:0; }
.journal-export .jx-f b { color:var(--ink); font-weight:700; }

.journal-export .jx-deroule { margin-top:6px; }
.journal-export .jx-lbl {
  font-size:7.4pt; font-weight:800; letter-spacing:.1em; text-transform:uppercase;
  color:var(--muted); margin:0 0 4px;
}
.journal-export .jx-phase {
  margin:0 0 5px; padding-left:10px; border-left:2px solid var(--sub,#e5e7eb); break-inside:avoid;
}
.journal-export .jx-phase:last-child { margin-bottom:0; }
.journal-export .jx-ptitle { font-size:9pt; font-weight:700; margin:0; }
.journal-export .jx-pdur { font-weight:500; color:var(--muted); }
.journal-export .jx-pbody { font-size:8.7pt; color:#37415a; margin:1px 0 0; }

.journal-export .jx-pause {
  display:flex; align-items:center; gap:10px; margin:0 0 8px; padding:5px 12px; border-radius:9px;
  background:repeating-linear-gradient(135deg,#f4f6fa,#f4f6fa 7px,#eef1f7 7px,#eef1f7 14px);
  border:1px solid var(--line);
}
.journal-export .jx-pause-name { font-weight:700; font-size:9pt; color:#55607a; flex:1; }
.journal-export .jx-pause-dur { font-size:7.6pt; color:#7a8398; font-weight:600; }

.journal-export .jx-note {
  margin-top:5px; padding:5px 9px; border-radius:8px; background:#fff9e9;
  border:1px solid #f2e2ba; font-size:8.6pt; color:#6b5518;
}
.journal-export .jx-note b { color:#8a6d15; }

.journal-export .jx-empty {
  font-size:9pt; color:var(--muted); padding:16px; text-align:center;
  border:1px dashed var(--line-strong); border-radius:10px;
}

/* ===== Vue semaine (grille) ===== */
.journal-export .jx-doc-title {
  text-align:center; margin:0 0 5px; font-size:10.5pt; font-weight:400; color:var(--ink);
}
.journal-export .jx-doc-title b { font-weight:800; }

.journal-export .jx-grid {
  width:100%; border-collapse:collapse; table-layout:fixed;
  font-size:7.3pt; line-height:1.26;
}
.journal-export .jx-day {
  background:var(--accent-soft); color:var(--accent); font-weight:800; font-size:8.2pt;
  letter-spacing:.06em; text-transform:uppercase; border:1px solid var(--line-strong);
  padding:5px 6px; text-align:center;
}
.journal-export .jx-corner { background:var(--accent); border:1px solid var(--accent); }
.journal-export .jx-grid td { border:1px solid var(--line); vertical-align:top; padding:3.5px 7px; break-inside:avoid; }
.journal-export .jx-t {
  text-align:center; font-weight:800; font-size:8pt; color:var(--muted); background:#f7f9fb;
  font-variant-numeric:tabular-nums;
}
.journal-export .jx-cell { position:relative; padding-left:9px; }
.journal-export .jx-cell::before {
  content:""; position:absolute; left:0; top:1px; bottom:1px; width:3px; border-radius:3px;
  background:var(--sub,#cbd5e1);
}
.journal-export.t-colore .jx-td { background:color-mix(in srgb, var(--sub, #fff) 6%, #fff); }
.journal-export .jx-ctitle { font-weight:800; font-size:8pt; color:var(--sub-ink,#1a2233); margin:0 0 1px; letter-spacing:-.01em; }
.journal-export .jx-cbody { color:#333c52; margin:0; }
.journal-export .jx-comp { margin:2px 0 0; color:#3a4256; }
.journal-export .jx-comp-lab { text-decoration:underline; color:var(--muted); font-weight:700; }
.journal-export .jx-dom { color:var(--muted); font-size:7pt; margin:1px 0 0; }

.journal-export .jx-band {
  text-align:center; font-weight:800; letter-spacing:.22em; font-size:8pt; color:#6b7280;
  background:repeating-linear-gradient(135deg,#f3f5f9,#f3f5f9 8px,#eaeef4 8px,#eaeef4 16px);
  padding:4px; text-transform:uppercase;
}
.journal-export .jx-band-t { background:#eef1f5; color:var(--muted); }

.journal-export .jx-foot { margin-top:8px; text-align:center; font-size:6.8pt; color:#9aa2b1; }

/* ===== Affichage écran vs impression ===== */
.journal-export { display:block; }
@media print {
  .journal-export, .journal-export * { visibility:visible !important; }
  .journal-export {
    position:absolute; left:0; top:0; width:100%; margin:0; padding:0;
  }
}
`;
