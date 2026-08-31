import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Layers,
  NotebookPen,
  Sunrise,
  SunMedium,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

import { PedagogicalAiDialog } from "@/components/ardoise/pedagogical-ai-dialog";
import { AppShell } from "@/components/ardoise/app-shell";
import { StudentDomainRadar } from "@/components/ardoise/eleves/student-domain-radar";
import {
  SecondaryPageHeader,
  SecondaryPageLinkCard,
  SecondaryPageLinks,
} from "@/components/ardoise/secondary-page-chrome";
import { STATUS_CHIP } from "@/components/ardoise/status-styles";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ARDOISE_AI_NAME, ardoiseAiTitle } from "@/lib/ardoise-ai-brand";
import {
  CLEO_CATALOG,
  MATHS_CATALOG,
  STUDENTS,
  fullName,
  initials,
  type StatusKey,
} from "@/lib/ardoise-eval";
import { domainScores } from "@/lib/student-domains";
import {
  getStudentProfile,
  saveStudentProfile,
  type SubjectOverviewKey,
} from "@/lib/student-profiles";
import {
  attendanceKey,
  getActiveExercises,
  getAttendance,
  getAttendanceMonthStats,
  getExerciseResults,
  getFluenceRecords,
  loadExerciseResults,
  listAttendanceDates,
  saveExerciseResults,
  saveAttendance,
  type AttendanceStatus,
} from "@/lib/storage";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/eleves")({
  head: () => ({
    meta: [
      { title: "Élèves — Ardoise" },
      { name: "description", content: "Liste de la classe CE1 et cahier d'appel." },
      { property: "og:title", content: "Élèves — Ardoise" },
    ],
  }),
  component: ElevesPage,
});

type Tab = "liste" | "appel";
type AttendanceView = "register" | "stats";
type AttendanceMoment = "morning" | "afternoon";

const TODAY = toDateKey(new Date());
const THIS_MONTH = TODAY.slice(0, 7);
const ATTENDANCE_OPTIONS: { key: AttendanceStatus; label: string; short: string }[] = [
  { key: "present", label: "Présent", short: "P" },
  { key: "retard", label: "Retard", short: "R" },
  { key: "absent", label: "Absent", short: "A" },
];

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function dateFromKey(value: string): Date {
  return new Date(`${value}T12:00:00`);
}

function shiftDateKey(value: string, days: number): string {
  const date = dateFromKey(value);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

function formatMonthLabel(value: string): string {
  const [year, month] = value.split("-");
  const date = new Date(Number(year), Number(month) - 1, 1, 12);
  return new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric" }).format(date);
}

function formatDateLabel(value: string): string {
  const date = dateFromKey(value);
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);
}

function countAttendance(attendance: Record<string, AttendanceStatus>) {
  return {
    present: Object.values(attendance).filter((value) => value === "present").length,
    retard: Object.values(attendance).filter((value) => value === "retard").length,
    absent: Object.values(attendance).filter((value) => value === "absent").length,
  };
}

function seededStatus(studentIndex: number, exerciseIndex: number): StatusKey {
  const value = (studentIndex * 7 + exerciseIndex * 11 + 3) % 100;
  if (value < 42) return "A";
  if (value < 67) return "PA";
  if (value < 84) return "NA";
  if (value < 94) return "NF";
  return "AB";
}

function buildDemoExerciseResults(): Record<string, Record<string, StatusKey>> {
  const catalog = [...CLEO_CATALOG, ...MATHS_CATALOG];
  const store: Record<string, Record<string, StatusKey>> = {};

  for (const [exerciseIndex, exercise] of catalog.entries()) {
    store[exercise.id] = {};
    for (const [studentIndex, student] of STUDENTS.entries()) {
      store[exercise.id]![student.id] = seededStatus(studentIndex, exerciseIndex);
    }
  }

  return store;
}

const SUBJECT_OVERVIEW_META: {
  key: SubjectOverviewKey;
  label: string;
  shortLabel: string;
}[] = [
  { key: "francais", label: "Français", shortLabel: "Français" },
  { key: "maths", label: "Mathématiques", shortLabel: "Maths" },
  { key: "qlm", label: "Questionner le monde", shortLabel: "QLM" },
  { key: "emc", label: "EMC", shortLabel: "EMC" },
  { key: "arts", label: "Arts", shortLabel: "Arts" },
  { key: "eps", label: "EPS", shortLabel: "EPS" },
  { key: "lve", label: "Anglais", shortLabel: "LVE" },
];

function seededSubjectScore(studentIndex: number, subjectIndex: number): number {
  return 48 + ((studentIndex * 9 + subjectIndex * 13 + 7) % 45);
}

function buildDemoSubjectSnapshots() {
  const notesByBand = [
    "À consolider",
    "Fragile mais engagé",
    "En progrès",
    "À l’aise",
    "Très solide",
  ];

  return Object.fromEntries(
    STUDENTS.map((student, studentIndex) => [
      student.id,
      {
        subjectSnapshots: Object.fromEntries(
          SUBJECT_OVERVIEW_META.map((subject, subjectIndex) => {
            const score = seededSubjectScore(studentIndex, subjectIndex);
            const bandIndex =
              score < 58 ? 0 : score < 66 ? 1 : score < 76 ? 2 : score < 86 ? 3 : 4;
            return [
              subject.key,
              {
                score,
                note: notesByBand[bandIndex],
              },
            ];
          }),
        ),
      },
    ]),
  );
}

function averageOf(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function scoreToAppreciation(score: number): string {
  if (score >= 85) return "Très solide";
  if (score >= 74) return "À l’aise";
  if (score >= 64) return "En progrès";
  if (score >= 52) return "Fragile mais engagé";
  return "À consolider";
}

function scoreTone(score: number) {
  if (score >= 80) return "border-status-a/30 bg-status-a/10 text-status-a-foreground";
  if (score >= 65) return "border-status-pa/40 bg-status-pa/15 text-status-pa-foreground";
  return "border-status-na/35 bg-status-na/10 text-status-na-foreground";
}

function formatBirthDate(value?: string): string {
  if (!value) return "Non renseignée";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatShortDate(value?: string): string {
  if (!value) return "Pas encore de mesure";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function readRecordedAttendanceForMoment(
  date: string,
  moment: AttendanceMoment,
): Record<string, AttendanceStatus> | null {
  try {
    const raw = localStorage.getItem(attendanceKey(date));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const record = parsed as {
        morning?: Record<string, AttendanceStatus>;
        afternoon?: Record<string, AttendanceStatus>;
      };

      if (
        (moment === "morning" || moment === "afternoon") &&
        record[moment] &&
        typeof record[moment] === "object"
      ) {
        return record[moment] ?? null;
      }

      if (
        moment === "morning" &&
        Object.values(parsed as Record<string, unknown>).every(
          (value) => value === "present" || value === "retard" || value === "absent",
        )
      ) {
        return parsed as Record<string, AttendanceStatus>;
      }
    }
  } catch {
    return null;
  }

  return null;
}

function StatPill({
  label,
  value,
  hint,
  accent = "primary",
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  accent?: "primary" | "sage" | "ochre";
  icon: React.ReactNode;
}) {
  const accentStyle =
    accent === "sage"
      ? "bg-sage/15 text-sage"
      : accent === "ochre"
        ? "bg-ochre/15 text-ochre-foreground"
        : "bg-primary/10 text-primary";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/90 px-3 py-2.5 shadow-sm">
      <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-xl", accentStyle)}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="truncate text-[0.65rem] font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-lg font-semibold leading-tight tracking-tight text-foreground">
          {value}
        </p>
        {hint ? <p className="truncate text-[0.7rem] text-muted-foreground">{hint}</p> : null}
      </div>
    </div>
  );
}

function SheetSectionTitle({
  icon,
  title,
  hint,
}: {
  icon: React.ReactNode;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </span>
      <h2 className="font-display text-sm font-semibold text-foreground">{title}</h2>
      {hint ? (
        <span className="ml-auto truncate text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  );
}



function DistributionRow({
  label,
  value,
  total,
  className,
}: {
  label: string;
  value: number;
  total: number;
  className: string;
}) {
  const percent = total > 0 ? Math.round((value / total) * 100) : 0;
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">
          {value} · {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-secondary">
        <div className={cn("h-full rounded-full", className)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

const STATUS_LABELS: Record<StatusKey, string> = {
  A: "Acquis",
  PA: "Partiel",
  NA: "Non acquis",
  NF: "Non fait",
  AB: "Absent",
};

const STATUS_CHART_CONFIG: ChartConfig = {
  A: { label: "Acquis", color: "var(--color-status-a-solid)" },
  PA: { label: "Partiel", color: "var(--color-status-pa-solid)" },
  NA: { label: "Non acquis", color: "var(--color-status-na-solid)" },
  NF: { label: "Non fait", color: "var(--color-status-nf-solid)" },
  AB: { label: "Absent", color: "var(--color-status-ab-solid)" },
};

const FLUENCE_CHART_CONFIG: ChartConfig = {
  wpm: { label: "Mots / min", color: "var(--color-chart-1)" },
};

const SUBJECT_CHART_CONFIG: ChartConfig = {
  acquired: { label: "Acquis", color: "var(--color-chart-3)" },
  remaining: { label: "Reste à consolider", color: "var(--color-secondary)" },
};

function StatusDistributionChart({
  counts,
  total,
}: {
  counts: Record<StatusKey, number>;
  total: number;
}) {
  if (total === 0) {
    return (
      <p className="grid h-[200px] place-items-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
        Aucun résultat enregistré pour l'instant.
      </p>
    );
  }

  const data = (Object.keys(counts) as StatusKey[])
    .filter((key) => counts[key] > 0)
    .map((key) => ({ key, name: STATUS_LABELS[key], value: counts[key] }));

  return (
    <ChartContainer config={STATUS_CHART_CONFIG} className="mx-auto aspect-square max-h-[220px]">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="key" />} />
        <Pie data={data} dataKey="value" nameKey="key" innerRadius={48} outerRadius={80} strokeWidth={2}>
          {data.map((entry) => (
            <Cell key={entry.key} fill={`var(--color-status-${entry.key.toLowerCase()}-solid)`} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

function FluenceTrendChart({ data }: { data: { period: string; wpm: number }[] }) {
  if (data.length === 0) {
    return (
      <p className="grid h-[180px] place-items-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
        Aucune mesure de fluence n'a encore été enregistrée pour cet élève.
      </p>
    );
  }

  return (
    <ChartContainer config={FLUENCE_CHART_CONFIG} className="aspect-auto h-[180px] w-full">
      <LineChart data={data} margin={{ left: 4, right: 12, top: 8, bottom: 0 }}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={11} />
        <YAxis tickLine={false} axisLine={false} width={32} fontSize={11} />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Line
          type="monotone"
          dataKey="wpm"
          stroke="var(--color-wpm)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "var(--color-wpm)" }}
        />
      </LineChart>
    </ChartContainer>
  );
}

function SubjectMasteryChart({
  subjectCounts,
}: {
  subjectCounts: Record<"francais" | "maths", { acquired: number; total: number }>;
}) {
  const data = (["francais", "maths"] as const)
    .map((subject) => ({
      subject: subject === "francais" ? "Français" : "Maths",
      acquired: subjectCounts[subject].acquired,
      remaining: Math.max(subjectCounts[subject].total - subjectCounts[subject].acquired, 0),
      total: subjectCounts[subject].total,
    }))
    .filter((entry) => entry.total > 0);

  if (data.length === 0) {
    return (
      <p className="grid h-[160px] place-items-center rounded-2xl border border-dashed border-border text-center text-sm text-muted-foreground">
        Pas encore de résultats par matière pour cet élève.
      </p>
    );
  }

  return (
    <ChartContainer config={SUBJECT_CHART_CONFIG} className="aspect-auto h-[160px] w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 4, right: 12, top: 4, bottom: 4 }}>
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="subject" tickLine={false} axisLine={false} width={56} fontSize={12} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="acquired" stackId="a" fill="var(--color-acquired)" radius={[6, 0, 0, 6]} />
        <Bar dataKey="remaining" stackId="a" fill="var(--color-remaining)" radius={[0, 6, 6, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

function AttendanceStatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function AttendancePanel({
  title,
  subtitle,
  icon,
  attendance,
  onChange,
  onSave,
  onSetAllPresent,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  attendance: Record<string, AttendanceStatus>;
  onChange: (studentId: string, status: AttendanceStatus) => void;
  onSave: () => void;
  onSetAllPresent: () => void;
}) {
  const counts = countAttendance(attendance);

  return (
    <section className="card-surface overflow-hidden p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-primary/10 text-primary">
              {icon}
            </span>
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onSetAllPresent}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Tous présents
          </button>
          <button
            type="button"
            onClick={onSave}
            className="rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <AttendanceStatCard label="Présents" value={counts.present} />
        <AttendanceStatCard label="Retards" value={counts.retard} />
        <AttendanceStatCard label="Absents" value={counts.absent} />
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {STUDENTS.map((student) => {
            const current = attendance[student.id] ?? "present";
            return (
              <li
                key={student.id}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-secondary font-display text-xs font-semibold text-muted-foreground">
                  {initials(student)}
                </span>
                <span className="min-w-0 truncate text-sm font-medium text-foreground">
                  {fullName(student)}
                </span>
                <div className="flex gap-1">
                  {ATTENDANCE_OPTIONS.map(({ key, label, short }) => (
                    <button
                      key={key}
                      type="button"
                      title={label}
                      onClick={() => onChange(student.id, key)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[0.65rem] font-semibold transition-colors duration-150",
                        current === key &&
                          key === "present" &&
                          "bg-status-a text-status-a-foreground",
                        current === key &&
                          key === "retard" &&
                          "bg-status-pa text-status-pa-foreground",
                        current === key &&
                          key === "absent" &&
                          "bg-status-na text-status-na-foreground",
                        current !== key && "bg-secondary text-muted-foreground hover:bg-muted",
                      )}
                    >
                      {short}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ElevesPage() {
  const initialStudentId = useMemo(() => {
    if (typeof window === "undefined") return STUDENTS[0]?.id ?? "";
    return new URLSearchParams(window.location.search).get("studentId") ?? STUDENTS[0]?.id ?? "";
  }, []);
  const [tab, setTab] = useState<Tab>(() => {
    if (typeof window === "undefined") return "liste";
    return new URLSearchParams(window.location.search).get("tab") === "appel" ? "appel" : "liste";
  });
  const [attendanceView, setAttendanceView] = useState<AttendanceView>("register");
  const [search, setSearch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState(initialStudentId);
  const [selectedDate, setSelectedDate] = useState(TODAY);
  const [statsMonth, setStatsMonth] = useState(THIS_MONTH);
  const [attendanceVersion, setAttendanceVersion] = useState(0);
  const [profileVersion, setProfileVersion] = useState(0);
  const [resultsVersion, setResultsVersion] = useState(0);
  const [birthDateDraft, setBirthDateDraft] = useState("");
  const [notesDraft, setNotesDraft] = useState("");
  const [subjectFocus, setSubjectFocus] = useState<SubjectOverviewKey>("francais");
  const [showClassOverlay, setShowClassOverlay] = useState(false);
  const [morningAttendance, setMorningAttendance] = useState<Record<string, AttendanceStatus>>(() =>
    getAttendance(TODAY, "morning"),
  );
  const [afternoonAttendance, setAfternoonAttendance] = useState<Record<string, AttendanceStatus>>(
    () => getAttendance(TODAY, "afternoon"),
  );
  const [mounted, setMounted] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [detailTab, setDetailTab] = useState("domaines");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMorningAttendance(getAttendance(selectedDate, "morning"));
    setAfternoonAttendance(getAttendance(selectedDate, "afternoon"));
    setStatsMonth(selectedDate.slice(0, 7));
  }, [selectedDate]);

  const filtered = STUDENTS.filter((student) =>
    fullName(student).toLowerCase().includes(search.toLowerCase()),
  );
  const selectedStudent =
    STUDENTS.find((student) => student.id === selectedStudentId) ?? filtered[0] ?? STUDENTS[0];
  const selectedIndex = STUDENTS.findIndex((student) => student.id === selectedStudent?.id);
  const studentPosition = selectedIndex >= 0 ? selectedIndex + 1 : 1;

  function shiftStudent(delta: number) {
    if (STUDENTS.length === 0) return;
    const base = selectedIndex >= 0 ? selectedIndex : 0;
    const next = (base + delta + STUDENTS.length) % STUDENTS.length;
    setSelectedStudentId(STUDENTS[next].id);
  }


  const exercise = getActiveExercises()[0];
  const exerciseResults = exercise ? getExerciseResults(exercise.id) : {};
  const monthStats = useMemo(
    () => getAttendanceMonthStats(statsMonth),
    [attendanceVersion, statsMonth],
  );
  const statsRows = [
    { label: "Nombre d'élèves", value: monthStats.studentCount, hint: "Effectif de la classe" },
    { label: "Jours saisis", value: monthStats.recordedDays, hint: "Au moins un appel enregistré" },
    {
      label: "Demi-journées",
      value: monthStats.recordedHalfDays,
      hint: "Matin et après-midi cumulés",
    },
    { label: "Retards", value: monthStats.retards, hint: "Retards relevés sur le mois" },
    { label: "Absences", value: monthStats.absences, hint: "Absences comptabilisées" },
    {
      label: "Présences possibles",
      value: monthStats.possibleAttendances,
      hint: "Présences théoriques",
    },
    {
      label: "Présences réelles",
      value: monthStats.realAttendances,
      hint: "Présences effectivement observées",
    },
    { label: "% absents", value: monthStats.absentRate.toFixed(2), hint: "Taux d'absence du mois" },
    {
      label: "% présents",
      value: monthStats.presentRate.toFixed(2),
      hint: "Taux de présence du mois",
    },
  ];

  useEffect(() => {
    if (!selectedStudent) return;
    const profile = getStudentProfile(selectedStudent.id);
    setBirthDateDraft(profile.birthDate ?? "");
    setNotesDraft(profile.notes ?? "");
  }, [selectedStudent?.id, profileVersion]);

  const studentDashboard = useMemo(() => {
    if (!selectedStudent) return null;
    const profile = getStudentProfile(selectedStudent.id);

    const allResults = loadExerciseResults();
    const correctionCounts: Record<StatusKey, number> = {
      A: 0,
      PA: 0,
      NA: 0,
      NF: 0,
      AB: 0,
    };

    const subjectMap = new Map(getActiveExercises().map((activeExercise) => [activeExercise.id, activeExercise.subject]));
    const subjectCounts: Record<"francais" | "maths", { acquired: number; total: number }> = {
      francais: { acquired: 0, total: 0 },
      maths: { acquired: 0, total: 0 },
    };

    const studentResults: Record<string, StatusKey> = {};
    const classResultsByStudent: Record<string, Record<string, StatusKey>> = {};

    for (const student of STUDENTS) {
      classResultsByStudent[student.id] = {};
    }

    for (const [exerciseId, results] of Object.entries(allResults)) {
      for (const student of STUDENTS) {
        const studentStatus = results[student.id];
        if (studentStatus) {
          classResultsByStudent[student.id]![exerciseId] = studentStatus;
        }
      }

      const status = results[selectedStudent.id];
      if (status) {
        correctionCounts[status] += 1;
        studentResults[exerciseId] = status;

        const subject = subjectMap.get(exerciseId);
        if (subject) {
          subjectCounts[subject].total += 1;
          if (status === "A" || status === "PA") subjectCounts[subject].acquired += 1;
        }
      }
    }

    const totalCorrections = Object.values(correctionCounts).reduce((sum, value) => sum + value, 0);
    const totalAcquired = correctionCounts.A + correctionCounts.PA;

    const fluenceRecord = getFluenceRecords().find(
      (record) => record.studentId === selectedStudent.id,
    ) ?? {
      studentId: selectedStudent.id,
      wpm: 0,
      history: [],
    };
    const latestFluence = fluenceRecord.history[fluenceRecord.history.length - 1];
    const fluenceHistory = [...fluenceRecord.history].slice(-4).reverse();
    const fluenceChartData = fluenceRecord.history.map((entry) => ({
      period: entry.period,
      wpm: entry.wpm,
    }));

    const attendanceSummary = {
      halfDays: 0,
      present: 0,
      retard: 0,
      absent: 0,
    };

    for (const date of listAttendanceDates()) {
      for (const moment of ["morning", "afternoon"] as AttendanceMoment[]) {
        const slot = readRecordedAttendanceForMoment(date, moment);
        if (!slot) continue;
        attendanceSummary.halfDays += 1;
        const status = slot[selectedStudent.id] ?? "present";
        if (status === "present") attendanceSummary.present += 1;
        if (status === "retard") attendanceSummary.retard += 1;
        if (status === "absent") attendanceSummary.absent += 1;
      }
    }

    const recentExercises = getActiveExercises()
      .map((activeExercise) => ({
        exercise: activeExercise,
        status: getExerciseResults(activeExercise.id)[selectedStudent.id] as StatusKey | undefined,
      }))
      .filter((entry) => entry.status);

    const domainBreakdown = domainScores(studentResults);
    const classAveragesByDomain = (() => {
      const buckets = new Map<string, number[]>();
      for (const student of STUDENTS) {
        const scores = domainScores(classResultsByStudent[student.id] ?? {});
        for (const domain of scores) {
          if (domain.evaluated <= 0) continue;
          const bucket = buckets.get(domain.key) ?? [];
          bucket.push(domain.score);
          buckets.set(domain.key, bucket);
        }
      }

      return domainBreakdown.map((domain) => ({
        key: domain.key,
        label: domain.label,
        short: domain.short,
        subject: domain.subject,
        score: Math.round(averageOf(buckets.get(domain.key) ?? []) ?? 0),
        evaluated: buckets.get(domain.key)?.length ?? 0,
        acquired: 0,
        partial: 0,
        failed: 0,
        items: [],
      }));
    })();

    const globalSubjects = SUBJECT_OVERVIEW_META.map((subject, subjectIndex) => {
      const profileSnapshot = profile.subjectSnapshots?.[subject.key];
      const score =
        subject.key === "francais"
          ? studentResults
            ? Math.round(
                averageOf(
                  domainBreakdown
                    .filter((domain) => domain.subject === "francais" && domain.evaluated > 0)
                    .map((domain) => domain.score),
                ) ?? 0,
              )
            : profileSnapshot?.score ?? 0
          : subject.key === "maths"
            ? Math.round(
                averageOf(
                  domainBreakdown
                    .filter((domain) => domain.subject === "maths" && domain.evaluated > 0)
                    .map((domain) => domain.score),
                ) ?? 0,
              )
            : profileSnapshot?.score ?? seededSubjectScore(selectedIndex >= 0 ? selectedIndex : 0, subjectIndex);

      return {
        key: subject.key,
        label: subject.label,
        shortLabel: subject.shortLabel,
        score,
        note: profileSnapshot?.note ?? scoreToAppreciation(score),
        detailAvailable: subject.key === "francais" || subject.key === "maths",
      };
    });

    return {
      correctionCounts,
      totalCorrections,
      totalAcquired,
      fluenceRecord,
      latestFluence,
      fluenceHistory,
      fluenceChartData,
      subjectCounts,
      attendanceSummary,
      recentExercises,
      domains: domainBreakdown,
      classAveragesByDomain,
      globalSubjects,
    };
  }, [selectedStudent, attendanceVersion, profileVersion, resultsVersion, mounted, selectedIndex]);

  const studentRemediationTargets = useMemo(() => {
    if (!selectedStudent || !studentDashboard) return [];
    return (["NA", "PA"] as StatusKey[])
      .filter((status) => studentDashboard.correctionCounts[status] > 0)
      .map((status) => {
        const label =
          status === "NA" ? "non acquis" : status === "PA" ? "partiellement acquis" : status;
        return `${studentDashboard.correctionCounts[status]} résultat(s) ${label}`;
      });
  }, [selectedStudent, studentDashboard]);

  function persistProfile() {
    if (!selectedStudent) return;
    saveStudentProfile(selectedStudent.id, {
      birthDate: birthDateDraft || undefined,
      notes: notesDraft.trim() || undefined,
    });
    setProfileVersion((value) => value + 1);
  }

  function loadDomainDemo() {
    saveExerciseResults(buildDemoExerciseResults());
    const subjectSnapshots = buildDemoSubjectSnapshots();
    for (const student of STUDENTS) {
      const snapshot = subjectSnapshots[student.id];
      if (snapshot) {
        saveStudentProfile(student.id, snapshot);
      }
    }
    setResultsVersion((value) => value + 1);
    setProfileVersion((value) => value + 1);
    toast.success("Démo chargée pour visualiser les domaines des élèves.");
  }

  function saveMoment(moment: AttendanceMoment) {
    const data = moment === "morning" ? morningAttendance : afternoonAttendance;
    const counts = countAttendance(data);
    saveAttendance(selectedDate, data, moment);
    setAttendanceVersion((value) => value + 1);
    toast.success(
      `Appel ${moment === "morning" ? "du matin" : "de l'après-midi"} enregistré — ${counts.present} présent${counts.present > 1 ? "s" : ""}${counts.retard ? `, ${counts.retard} retard${counts.retard > 1 ? "s" : ""}` : ""}${counts.absent ? `, ${counts.absent} absent${counts.absent > 1 ? "s" : ""}` : ""}.`,
    );
  }

  function setAllPresent(moment: AttendanceMoment) {
    const next = Object.fromEntries(
      STUDENTS.map((student) => [student.id, "present" as AttendanceStatus]),
    );
    if (moment === "morning") setMorningAttendance(next);
    else setAfternoonAttendance(next);
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8">
        <SecondaryPageHeader
          eyebrow="Corriger & suivre"
          title={`CE1 · ${STUDENTS.length} élèves`}
          description="Retrouvez la classe, faites l'appel et basculez rapidement vers les outils de suivi qui prolongent les corrections."
        />

        <SecondaryPageLinks className="md:grid-cols-3">
          <SecondaryPageLinkCard
            to="/fluence"
            icon={Gauge}
            title="Fluence"
            description="Voir les élèves fragiles, les seuils et les derniers relevés."
          />
          <SecondaryPageLinkCard
            to="/groupes-besoin"
            icon={UsersRound}
            title="Groupes de besoin"
            description="Regrouper les élèves par difficulté pour préparer les reprises."
          />
          <SecondaryPageLinkCard
            to="/ateliers-reprise"
            icon={Layers}
            title="Ateliers de reprise"
            description="Accéder aux remédiations et aux approfondissements liés aux besoins."
          />
        </SecondaryPageLinks>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex gap-1 rounded-full border border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_90%,transparent),color-mix(in_oklab,var(--color-secondary)_48%,transparent))] p-1 shadow-sm">
            {(["liste", "appel"] as Tab[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-150",
                  tab === value
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {value === "liste" ? "Fiches élèves" : "Cahier d'appel"}
              </button>
            ))}
          </div>

          {tab === "liste" ? (
            <Button type="button" variant="outline" size="sm" onClick={loadDomainDemo}>
              Charger une démo
            </Button>
          ) : null}

          {tab === "liste" ? null : (
            <div className="ml-auto flex gap-1 rounded-full border border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_90%,transparent),color-mix(in_oklab,var(--color-secondary)_48%,transparent))] p-1 shadow-sm">
              {(
                [
                  { key: "register", label: "Registre d'appel" },
                  { key: "stats", label: "Statistiques" },
                ] as { key: AttendanceView; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setAttendanceView(key)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-150",
                    attendanceView === key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>

        {tab === "liste" && (
          <div className="mt-4 space-y-4">
            {/* ── Sélecteur d'élève (menu déroulant) ─────────────────────── */}
            <div className="card-surface flex flex-wrap items-center gap-2 rounded-[26px] border-primary/8 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_28%,transparent))] p-3 shadow-raised">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Élève précédent"
                onClick={() => shiftStudent(-1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Popover open={pickerOpen} onOpenChange={setPickerOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                  className="flex min-w-0 flex-1 items-center gap-3 rounded-[22px] border border-border/70 bg-background/85 px-3 py-2 text-left shadow-sm transition-colors hover:bg-secondary/50"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_90%,transparent),color-mix(in_oklab,var(--color-primary)_68%,var(--color-sage)))] font-display text-sm font-bold text-primary-foreground shadow-sm">
                      {selectedStudent ? initials(selectedStudent) : "—"}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-foreground">
                        {selectedStudent ? fullName(selectedStudent) : "Choisir un élève"}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Fiche de suivi · CE1 · {STUDENTS.length} élèves
                      </span>
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[min(360px,90vw)] p-0">
                  <Command>
                    <CommandInput placeholder="Rechercher un élève…" />
                    <CommandList>
                      <CommandEmpty>Aucun élève trouvé.</CommandEmpty>
                      <CommandGroup heading="Liste de classe">
                        {STUDENTS.map((student) => {
                          const status = (exerciseResults[student.id] ?? "NF") as StatusKey;
                          return (
                            <CommandItem
                              key={student.id}
                              value={fullName(student)}
                              onSelect={() => {
                                setSelectedStudentId(student.id);
                                setPickerOpen(false);
                              }}
                              className="gap-2"
                            >
                              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-secondary text-[0.65rem] font-bold text-muted-foreground">
                                {initials(student)}
                              </span>
                              <span className="min-w-0 flex-1 truncate">{fullName(student)}</span>
                              <span
                                className={cn(
                                  "shrink-0 rounded-full px-2 py-0.5 text-[0.6rem] font-bold",
                                  STATUS_CHIP[status],
                                )}
                              >
                                {status}
                              </span>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <Button
                variant="ghost"
                size="icon"
                aria-label="Élève suivant"
                onClick={() => shiftStudent(1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {studentPosition}/{STUDENTS.length}
              </span>
            </div>

            {selectedStudent && studentDashboard && mounted ? (
              <>
                {/* ── Bandeau de repères compact ───────────────────────── */}
                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                  <StatPill
                    label="Corrections"
                    value={studentDashboard.totalCorrections}
                    hint={
                      studentDashboard.totalCorrections > 0
                        ? `${Math.round(
                            (studentDashboard.totalAcquired / studentDashboard.totalCorrections) *
                              100,
                          )}% acquis`
                        : "Pas de saisie"
                    }
                    icon={<BookOpen className="h-4 w-4" />}
                  />
                  <StatPill
                    label="Fluence"
                    value={
                      studentDashboard.fluenceRecord.wpm > 0
                        ? `${studentDashboard.fluenceRecord.wpm}`
                        : "—"
                    }
                    hint={
                      studentDashboard.latestFluence
                        ? `${studentDashboard.latestFluence.period} · mots/min`
                        : "Pas de mesure"
                    }
                    accent="sage"
                    icon={<Gauge className="h-4 w-4" />}
                  />
                  <StatPill
                    label="Présences"
                    value={studentDashboard.attendanceSummary.present}
                    hint={`${studentDashboard.attendanceSummary.absent} abs. · ${studentDashboard.attendanceSummary.retard} ret.`}
                    accent="ochre"
                    icon={<CheckCircle2 className="h-4 w-4" />}
                  />
                  <StatPill
                    label="Demi-journées"
                    value={studentDashboard.attendanceSummary.halfDays}
                    hint="Appels enregistrés"
                    icon={<CalendarDays className="h-4 w-4" />}
                  />
                </div>

                {/* ── Détail de la fiche, un onglet à la fois ──────────── */}
                <Tabs value={detailTab} onValueChange={setDetailTab} className="gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <TabsList className="flex-wrap">
                      <TabsTrigger value="domaines">Domaines</TabsTrigger>
                      <TabsTrigger value="corrections">Corrections</TabsTrigger>
                      <TabsTrigger value="fluence">Fluence</TabsTrigger>
                      <TabsTrigger value="presences">Présences</TabsTrigger>
                      <TabsTrigger value="notes">Notes</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto">
                      <PedagogicalAiDialog
                        title={ardoiseAiTitle("Analyse élève")}
                        description={`${ARDOISE_AI_NAME} relit les résultats de l'élève pour proposer des pistes de remédiation ou de devoirs ciblés.`}
                        triggerLabel="Analyser avec l'IA"
                        modes={["remediation", "homework"]}
                        initialMode="remediation"
                        className="h-9 rounded-full px-3 text-xs"
                        buildRequest={(mode) => ({
                          title:
                            mode === "remediation"
                              ? `Analyse de ${fullName(selectedStudent)}`
                              : `Devoirs pour ${fullName(selectedStudent)}`,
                          subject: "Français et mathématiques CE1",
                          contextSections: [
                            {
                              label: "Élève",
                              items: [
                                fullName(selectedStudent),
                                `Date de naissance : ${formatBirthDate(birthDateDraft)}`,
                              ],
                            },
                            {
                              label: "Vue d'ensemble",
                              items: [
                                `${studentDashboard.totalCorrections} résultat(s) enregistrés`,
                                `${studentDashboard.totalAcquired} acquis ou presque acquis`,
                                `${studentDashboard.attendanceSummary.absent} absence(s)`,
                                studentDashboard.latestFluence
                                  ? `Fluence : ${studentDashboard.latestFluence.wpm} mots/min`
                                  : "Pas encore de mesure de fluence",
                              ],
                            },
                            {
                              label: "Domaines",
                              items: studentDashboard.domains
                                .filter((domain) => domain.evaluated > 0)
                                .map(
                                  (domain) =>
                                    `${domain.label} : ${domain.score}% (${domain.evaluated} exercice(s))`,
                                ),
                            },
                            {
                              label: "Points de vigilance",
                              items:
                                studentRemediationTargets.length > 0
                                  ? studentRemediationTargets
                                  : ["Aucun point NA ou PA marquant pour le moment."],
                            },
                            {
                              label: "Notes enseignant",
                              items: notesDraft.trim()
                                ? [notesDraft.trim()]
                                : ["Aucune note particulière enregistrée pour l'instant."],
                            },
                          ],
                        })}
                      />
                    </div>
                  </div>

                  {/* Domaines — diagramme de Kiviat interactif */}
                  <TabsContent value="domaines" className="mt-0">
                    <div className="card-surface p-4 shadow-card">
                      <SheetSectionTitle
                        icon={<Layers className="h-4 w-4" />}
                        title="Domaines d'apprentissage"
                        hint="Vue d'ensemble de tous les apprentissages, puis zoom par matière"
                      />
                      <div className="mt-4 rounded-3xl border border-border/70 bg-gradient-to-br from-background via-background to-secondary/20 p-3 shadow-sm">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            Vue matière
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Cliquer pour changer de focale
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {studentDashboard.globalSubjects.map((subject) => {
                            const isActive = subjectFocus === subject.key;
                            return (
                              <button
                                key={subject.key}
                                type="button"
                                onClick={() => setSubjectFocus(subject.key)}
                                className={cn(
                                  "group inline-flex items-center gap-2 rounded-full border px-3 py-2 text-left transition-all",
                                  isActive
                                    ? "border-primary/40 bg-primary/10 shadow-sm ring-1 ring-primary/15"
                                    : "border-border bg-background/90 hover:border-primary/25 hover:bg-secondary/40",
                                )}
                              >
                                <span className="text-sm font-semibold text-foreground">
                                  {subject.shortLabel}
                                </span>
                                <span
                                  className={cn(
                                    "rounded-full border px-2 py-0.5 text-[0.68rem] font-semibold",
                                    scoreTone(subject.score),
                                  )}
                                >
                                  {subject.score}%
                                </span>
                                <span className="hidden text-[0.68rem] text-muted-foreground lg:inline">
                                  {subject.note}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-5 rounded-[28px] border border-border/70 bg-gradient-to-br from-background via-background to-primary/5 p-4 shadow-[0_18px_45px_-28px_rgba(15,23,42,0.35)]">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-foreground">
                              Lecture des apprentissages
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Vue générale puis zoom matière
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowClassOverlay((value) => !value)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                              showClassOverlay
                                ? "border-primary/40 bg-primary/10 text-primary"
                                : "border-border bg-background/90 text-muted-foreground hover:bg-secondary/40",
                            )}
                          >
                            {showClassOverlay
                              ? "Masquer le profil classe"
                              : "Afficher le profil classe"}
                          </button>
                        </div>

                        <div className="rounded-3xl border border-border/70 bg-background/85 p-4 shadow-sm">
                          <SheetSectionTitle
                            icon={<Layers className="h-4 w-4" />}
                            title="Araignée générale"
                            hint="Tous les domaines de l'élève"
                          />
                          <div className="mt-3">
                            <StudentDomainRadar
                              domains={studentDashboard.domains}
                              compareDomains={
                                showClassOverlay ? studentDashboard.classAveragesByDomain : undefined
                              }
                            />
                          </div>
                        </div>

                        <div className="mt-4 rounded-3xl border border-border/70 bg-background/80 p-4 shadow-sm">
                          <SheetSectionTitle
                            icon={<UsersRound className="h-4 w-4" />}
                            title="Araignée de la classe"
                            hint="Profil moyen de la classe"
                          />
                          <div className="mt-3">
                            <StudentDomainRadar
                              domains={studentDashboard.classAveragesByDomain}
                            />
                          </div>
                        </div>

                        {(() => {
                          const activeSubject =
                            studentDashboard.globalSubjects.find(
                              (subject) => subject.key === subjectFocus,
                            ) ?? studentDashboard.globalSubjects[0];
                          const focusedDomains = studentDashboard.domains.filter((domain) =>
                            activeSubject.key === "francais"
                              ? domain.subject === "francais"
                              : activeSubject.key === "maths"
                                ? domain.subject === "maths"
                                : false,
                          );

                          if (activeSubject.detailAvailable) {
                            return (
                              <>
                                <SheetSectionTitle
                                  icon={<TrendingUp className="h-4 w-4" />}
                                  title={`Zoom ${activeSubject.label}`}
                                  hint="Araignée par sous-domaines"
                                />
                                <div className="mt-3 flex flex-wrap items-center gap-2">
                                  <span
                                    className={cn(
                                      "rounded-full border px-3 py-1 text-xs font-semibold",
                                      scoreTone(activeSubject.score),
                                    )}
                                  >
                                    {activeSubject.score}% de maîtrise
                                  </span>
                                  <span className="rounded-full border border-border bg-background/80 px-3 py-1 text-xs text-muted-foreground">
                                    {activeSubject.note}
                                  </span>
                                </div>
                                <div className="mt-3">
                                  <StudentDomainRadar
                                    domains={focusedDomains}
                                    compareDomains={
                                      showClassOverlay
                                        ? studentDashboard.classAveragesByDomain.filter((domain) =>
                                            focusedDomains.some(
                                              (focusedDomain) => focusedDomain.key === domain.key,
                                            ),
                                          )
                                        : undefined
                                    }
                                  />
                                </div>
                                <div className="mt-4 border-t border-border pt-3">
                                  <SheetSectionTitle
                                    icon={<CheckCircle2 className="h-4 w-4" />}
                                    title="Lecture rapide"
                                  />
                                  <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                                    {focusedDomains
                                      .filter((domain) => domain.evaluated > 0)
                                      .map((domain) => (
                                          <div
                                            key={domain.key}
                                          className="rounded-2xl border border-border/80 bg-background/90 px-3 py-3 shadow-sm"
                                          >
                                          <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-semibold text-foreground">
                                              {domain.label}
                                            </p>
                                            <span
                                              className={cn(
                                                "rounded-full border px-2 py-0.5 text-[0.7rem] font-semibold",
                                                scoreTone(domain.score),
                                              )}
                                            >
                                              {domain.score}%
                                            </span>
                                          </div>
                                          <p className="mt-2 text-xs text-muted-foreground">
                                            {domain.evaluated} exercice(s) renseigné(s)
                                          </p>
                                        </div>
                                      ))}
                                  </div>
                                  {activeSubject.key === "francais" ? (
                                    <div className="mt-4 border-t border-border pt-3">
                                      <SheetSectionTitle
                                        icon={<BookOpen className="h-4 w-4" />}
                                        title="Réussite par matière"
                                      />
                                      <div className="mt-2">
                                        <SubjectMasteryChart
                                          subjectCounts={studentDashboard.subjectCounts}
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </>
                            );
                          }

                          return (
                            <>
                              <SheetSectionTitle
                                icon={<Layers className="h-4 w-4" />}
                                title={activeSubject.label}
                                hint="Repère global"
                              />
                              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)]">
                                <div className="rounded-3xl border border-border/80 bg-background/95 px-4 py-4 shadow-sm">
                                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Niveau repéré
                                  </p>
                                  <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                                    {activeSubject.score}%
                                  </p>
                                  <span
                                    className={cn(
                                      "mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                                      scoreTone(activeSubject.score),
                                    )}
                                  >
                                    {activeSubject.note}
                                  </span>
                                </div>
                                <div className="rounded-3xl border border-dashed border-border bg-secondary/20 px-4 py-4">
                                  <p className="text-sm font-semibold text-foreground">
                                    Vision d'ensemble
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Pour {activeSubject.label.toLowerCase()}, on garde ici un repère
                                    rapide dans le tableau de bord de l'élève. Le détail fin pourra
                                    ensuite être enrichi comme pour le français et les maths si tu
                                    veux aller plus loin domaine par domaine.
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Corrections */}
                  <TabsContent value="corrections" className="mt-0">
                    <div className="grid gap-3 xl:grid-cols-2">
                      <div className="card-surface p-4 shadow-card">
                        <SheetSectionTitle
                          icon={<BookOpen className="h-4 w-4" />}
                          title="Résultats cumulés"
                          hint={`${studentDashboard.totalCorrections} résultat(s)`}
                        />
                        <div className="mt-3 grid gap-4 sm:grid-cols-[minmax(0,170px)_minmax(0,1fr)] sm:items-center">
                          <StatusDistributionChart
                            counts={studentDashboard.correctionCounts}
                            total={studentDashboard.totalCorrections}
                          />
                          <div className="space-y-2.5">
                            <DistributionRow
                              label="Acquis"
                              value={studentDashboard.correctionCounts.A}
                              total={studentDashboard.totalCorrections}
                              className="bg-status-a"
                            />
                            <DistributionRow
                              label="Partiellement acquis"
                              value={studentDashboard.correctionCounts.PA}
                              total={studentDashboard.totalCorrections}
                              className="bg-status-pa"
                            />
                            <DistributionRow
                              label="Non acquis"
                              value={studentDashboard.correctionCounts.NA}
                              total={studentDashboard.totalCorrections}
                              className="bg-status-na"
                            />
                            <DistributionRow
                              label="Non fait"
                              value={studentDashboard.correctionCounts.NF}
                              total={studentDashboard.totalCorrections}
                              className="bg-status-nf"
                            />
                            <DistributionRow
                              label="Absent"
                              value={studentDashboard.correctionCounts.AB}
                              total={studentDashboard.totalCorrections}
                              className="bg-status-ab"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="card-surface p-4 shadow-card">
                        <SheetSectionTitle
                          icon={<NotebookPen className="h-4 w-4" />}
                          title="Exercices en cours"
                          hint="Cliquez pour ouvrir le carnet de notes"
                        />
                        <div className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1">
                          {studentDashboard.recentExercises.length > 0 ? (
                            studentDashboard.recentExercises.map(
                              ({ exercise: activeExercise, status }) => (
                                <button
                                  key={activeExercise.id}
                                  type="button"
                                  onClick={() =>
                                    window.location.assign(
                                      `/carnet-notes?detail=eleve&studentId=${encodeURIComponent(
                                        selectedStudent.id,
                                      )}&exerciseId=${encodeURIComponent(activeExercise.id)}`,
                                    )
                                  }
                                  className="flex w-full items-center gap-2 rounded-2xl border border-border bg-background/85 px-3 py-2 text-left transition-colors hover:bg-secondary/50"
                                >
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-semibold text-foreground">
                                      {activeExercise.title}
                                    </span>
                                    <span className="block truncate text-xs text-muted-foreground">
                                      {activeExercise.sessionTitle}
                                    </span>
                                  </span>
                                  {status ? (
                                    <span
                                      className={cn(
                                        "shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                                        STATUS_CHIP[status],
                                      )}
                                    >
                                      {status}
                                    </span>
                                  ) : null}
                                </button>
                              ),
                            )
                          ) : (
                            <p className="rounded-2xl border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                              Aucun exercice récent n'est encore relié à cet élève.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Fluence */}
                  <TabsContent value="fluence" className="mt-0">
                    <div className="card-surface p-4 shadow-card">
                      <SheetSectionTitle
                        icon={<Gauge className="h-4 w-4" />}
                        title="Fluence"
                        hint={
                          studentDashboard.latestFluence
                            ? `Dernier relevé : ${studentDashboard.latestFluence.wpm} mots/min`
                            : "Aucun relevé"
                        }
                      />
                      <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                        <FluenceTrendChart data={studentDashboard.fluenceChartData} />
                        <div className="max-h-[200px] space-y-2 overflow-y-auto pr-1">
                          {studentDashboard.fluenceHistory.length > 0 ? (
                            studentDashboard.fluenceHistory.map((entry) => (
                              <div
                                key={`${entry.period}-${entry.wpm}`}
                                className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-background/80 px-3 py-2"
                              >
                                <span className="min-w-0 truncate text-sm text-foreground">
                                  {entry.period}
                                </span>
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {entry.erreurs ?? 0} err.
                                </span>
                                <span className="shrink-0 text-sm font-semibold text-primary">
                                  {entry.wpm}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="rounded-2xl border border-dashed border-border px-3 py-3 text-sm text-muted-foreground">
                              Aucune mesure enregistrée pour cet élève.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Présences */}
                  <TabsContent value="presences" className="mt-0">
                    <div className="card-surface p-4 shadow-card">
                      <SheetSectionTitle
                        icon={<CalendarDays className="h-4 w-4" />}
                        title="Assiduité observée"
                        hint={`${studentDashboard.attendanceSummary.halfDays} demi-journée(s) saisie(s)`}
                      />
                      <div className="mt-3 grid gap-4 sm:grid-cols-3">
                        <DistributionRow
                          label="Présent"
                          value={studentDashboard.attendanceSummary.present}
                          total={studentDashboard.attendanceSummary.halfDays}
                          className="bg-status-a"
                        />
                        <DistributionRow
                          label="Retard"
                          value={studentDashboard.attendanceSummary.retard}
                          total={studentDashboard.attendanceSummary.halfDays}
                          className="bg-status-pa"
                        />
                        <DistributionRow
                          label="Absent"
                          value={studentDashboard.attendanceSummary.absent}
                          total={studentDashboard.attendanceSummary.halfDays}
                          className="bg-status-na"
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Notes & administratif */}
                  <TabsContent value="notes" className="mt-0">
                    <div className="card-surface p-4 shadow-card">
                      <SheetSectionTitle
                        icon={<NotebookPen className="h-4 w-4" />}
                        title="Repères enseignant"
                        hint={`Née / né le ${formatBirthDate(birthDateDraft)}`}
                      />
                      <div className="mt-3 grid gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium text-foreground">Date de naissance</span>
                          <Input
                            type="date"
                            value={birthDateDraft}
                            onChange={(event) => setBirthDateDraft(event.target.value)}
                            onBlur={persistProfile}
                          />
                        </label>
                        <label className="grid gap-1.5 text-sm">
                          <span className="font-medium text-foreground">Notes sur l'élève</span>
                          <Textarea
                            value={notesDraft}
                            onChange={(event) => setNotesDraft(event.target.value)}
                            onBlur={persistProfile}
                            placeholder="Besoin particulier, vigilance, point fort, rendez-vous famille…"
                            className="min-h-[140px]"
                          />
                        </label>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <div className="card-surface grid min-h-[280px] place-items-center p-6 text-center text-sm text-muted-foreground shadow-card">
                Sélectionnez un élève pour afficher sa fiche de suivi.
              </div>
            )}
          </div>
        )}


        {tab === "appel" ? (
          <div className="mt-4 grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="card-surface p-4 shadow-card">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Registre
                  </p>
                  <h2 className="mt-1 text-lg font-semibold capitalize text-foreground">
                    {formatMonthLabel(selectedDate.slice(0, 7))}
                  </h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {attendanceView === "register" ? "Appel" : "Stats"}
                </span>
              </div>

              <div className="mt-4 rounded-2xl border border-border bg-background/80 p-2">
                <Calendar
                  mode="single"
                  selected={dateFromKey(selectedDate)}
                  onSelect={(date) => date && setSelectedDate(toDateKey(date))}
                  className="w-full"
                />
              </div>

              <div className="mt-4 grid gap-3">
                <AttendanceStatCard
                  label="Matin"
                  value={countAttendance(morningAttendance).present}
                  hint={`${countAttendance(morningAttendance).absent} absent(s)`}
                />
                <AttendanceStatCard
                  label="Après-midi"
                  value={countAttendance(afternoonAttendance).present}
                  hint={`${countAttendance(afternoonAttendance).absent} absent(s)`}
                />
              </div>
            </aside>

            <div className="space-y-4">
              <div className="card-surface p-4 shadow-card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDate(shiftDateKey(selectedDate, -1))}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDate(shiftDateKey(selectedDate, 1))}
                      className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Journée sélectionnée
                    </p>
                    <h2 className="mt-1 text-4xl font-semibold tracking-tight text-foreground capitalize">
                      {formatDateLabel(selectedDate)}
                    </h2>
                  </div>

                  <label className="min-w-[170px] text-sm">
                    <span className="mb-1.5 flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5" />
                      Date
                    </span>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(event) => setSelectedDate(event.target.value)}
                    />
                  </label>
                </div>
              </div>

              {attendanceView === "register" ? (
                <div className="grid gap-4 2xl:grid-cols-2">
                  <AttendancePanel
                    title="Matin"
                    subtitle="Appel de début de journée"
                    icon={<Sunrise className="h-5 w-5" />}
                    attendance={morningAttendance}
                    onChange={(studentId, status) =>
                      setMorningAttendance((current) => ({ ...current, [studentId]: status }))
                    }
                    onSave={() => saveMoment("morning")}
                    onSetAllPresent={() => setAllPresent("morning")}
                  />

                  <AttendancePanel
                    title="Après-midi"
                    subtitle="Retour de pause méridienne"
                    icon={<SunMedium className="h-5 w-5" />}
                    attendance={afternoonAttendance}
                    onChange={(studentId, status) =>
                      setAfternoonAttendance((current) => ({ ...current, [studentId]: status }))
                    }
                    onSave={() => saveMoment("afternoon")}
                    onSetAllPresent={() => setAllPresent("afternoon")}
                  />
                </div>
              ) : (
                <section className="card-surface p-5 shadow-card">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Statistiques du mois
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold capitalize text-foreground">
                        {formatMonthLabel(statsMonth)}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Les chiffres sont calculés à partir des appels réellement enregistrés, matin
                        et après-midi séparément.
                      </p>
                    </div>

                    <div className="w-[170px]">
                      <Input
                        type="month"
                        value={statsMonth}
                        onChange={(event) => setStatsMonth(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {statsRows.map((row) => (
                      <AttendanceStatCard
                        key={row.label}
                        label={row.label}
                        value={row.value}
                        hint={row.hint}
                      />
                    ))}
                  </div>

                  {monthStats.recordedHalfDays === 0 ? (
                    <p className="mt-4 rounded-2xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                      Aucune demi-journée n'a encore été enregistrée pour ce mois.
                    </p>
                  ) : null}
                </section>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
