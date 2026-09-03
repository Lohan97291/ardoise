import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Cloud,
  ClipboardCheck,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Mail,
  Palette,
  Pin,
  PinOff,
  Printer,
  Users2,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { useMailAnalyses } from "@/hooks/use-mail-analyses";
import { getHandledMailIds } from "@/lib/mail-status-storage";
import {
  countUnseenAgendaKeys,
  countUnseenMailIds,
  markAgendaKeysSeen,
  markMailIdsSeen,
} from "@/lib/nav-alerts-storage";
import { CLOUD_SYNC_EVENT, getCloudSyncState } from "@/lib/cloud-sync";
import { ThemeControls } from "@/components/ardoise/theme-controls";
import { ProfileSettingsPanel } from "@/components/ardoise/profile-settings-panel";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useThemePalette } from "@/lib/theme-palette";
import {
  PROFILE_SETTINGS_EVENT,
  readProfileSettings,
  type ProfileSettings,
} from "@/lib/profile-settings";
import {
  APP_EDITION_STORAGE_KEY,
  FORCE_PASSWORD_CHANGE_STORAGE_KEY,
  getEditionLabel,
  isRouteEnabled,
  useAppEdition,
  type AppRoutePath,
} from "@/lib/app-edition";
import { cn } from "@/lib/utils";

type NavItem = {
  to: AppRoutePath;
  label: string;
  icon: LucideIcon;
  alertKey?: "agenda" | "messagerie";
};

const NAV_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: "Pilotage",
    items: [
      { to: "/", label: "Centre de pilotage", icon: LayoutDashboard },
      { to: "/journal", label: "Cahier journal", icon: BookOpen },
    ],
  },
  {
    title: "Agenda & messages",
    items: [
      { to: "/agenda", label: "Agenda", icon: CalendarClock, alertKey: "agenda" },
      { to: "/messagerie", label: "Messagerie", icon: Mail, alertKey: "messagerie" },
    ],
  },
  {
    title: "Préparer",
    items: [
      { to: "/emploi-du-temps", label: "Emploi du temps", icon: CalendarDays },
      { to: "/programmation", label: "Programmations", icon: CalendarCheck },
      { to: "/ressources", label: "Fiches de prep", icon: ClipboardList },
    ],
  },
  {
    title: "Corriger & suivre",
    items: [
      { to: "/correction-rapide", label: "Corrections", icon: ClipboardCheck },
      { to: "/eleves", label: "Élèves", icon: Users2 },
    ],
  },
];

const NAV: NavItem[] = NAV_GROUPS.flatMap((g) => g.items);
const PAGE_LABELS: Record<NavItem["to"], string> = {
  "/": "Centre de pilotage",
  "/journal": "Cahier journal",
  "/agenda": "Agenda",
  "/programmation": "Programmations",
  "/programmation-annuelle": "Programmation annuelle",
  "/emploi-du-temps": "Emploi du temps",
  "/ressources": "Fiches de prep",
  "/correction-rapide": "Corrections",
  "/fluence": "Fluence",
  "/bilan-seance": "Bilan de séance",
  "/carnet-notes": "Carnet de notes",
  "/eleves": "Élèves",
  "/resultats-exercices": "Résultats d'exercices",
  "/groupes-besoin": "Groupes de besoin",
  "/ateliers-reprise": "Ateliers de reprise",
  "/messagerie": "Messagerie",
};

const SECONDARY: { label: string; icon: LucideIcon }[] = [{ label: "Photocopies", icon: Printer }];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { edition, isColleagueEdition } = useAppEdition();
  const { logoCompactSrc, logoIconSrc } = useThemePalette();
  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sidebarCompact = !pinned && !hovered;
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [mailAlertCount, setMailAlertCount] = useState(0);
  const [agendaAlertCount, setAgendaAlertCount] = useState(0);
  const [mailIds, setMailIds] = useState<string[]>([]);
  const [agendaKeys, setAgendaKeys] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileSettings>(readProfileSettings);
  const [cloudState, setCloudState] = useState(getCloudSyncState);
  const { data: mailAnalyses = [] } = useMailAnalyses();
  const visibleNavGroups = useMemo(
    () =>
      NAV_GROUPS.map((group) => ({
        ...group,
        items: group.items.filter((item) => isRouteEnabled(item.to, edition)),
      })).filter((group) => group.items.length > 0),
    [edition],
  );
  const visibleNav = useMemo(
    () => visibleNavGroups.flatMap((group) => group.items),
    [visibleNavGroups],
  );
  const routeEnabled = isRouteEnabled(pathname, edition);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("ardoise-sidebar-pinned");
    setPinned(stored === "1");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const shouldPrompt =
      isColleagueEdition && window.localStorage.getItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY) === "1";
    setMustChangePassword(shouldPrompt);
    if (shouldPrompt) {
      setOptionsOpen(true);
    }
  }, [isColleagueEdition]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function syncProfile() {
      setProfile(readProfileSettings());
    }

    syncProfile();
    window.addEventListener(PROFILE_SETTINGS_EVENT, syncProfile as EventListener);
    window.addEventListener("storage", syncProfile);
    return () => {
      window.removeEventListener(PROFILE_SETTINGS_EVENT, syncProfile as EventListener);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function syncCloud() {
      setCloudState(getCloudSyncState());
    }

    syncCloud();
    window.addEventListener(CLOUD_SYNC_EVENT, syncCloud as EventListener);
    window.addEventListener("focus", syncCloud);
    return () => {
      window.removeEventListener(CLOUD_SYNC_EVENT, syncCloud as EventListener);
      window.removeEventListener("focus", syncCloud);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("ardoise-sidebar-pinned", pinned ? "1" : "0");
  }, [pinned]);

  useEffect(() => {
    if (isColleagueEdition) {
      setMailIds([]);
      setMailAlertCount(0);
      return;
    }
    const handledIds = new Set(getHandledMailIds());
    const activeMailIds = mailAnalyses
      .filter((mail) => !handledIds.has(mail.externalId))
      .map((mail) => mail.externalId);
    setMailIds(activeMailIds);
    setMailAlertCount(countUnseenMailIds(activeMailIds));
  }, [isColleagueEdition, mailAnalyses]);

  useEffect(() => {
    if (isColleagueEdition) {
      setAgendaKeys([]);
      setAgendaAlertCount(0);
      return;
    }
    let cancelled = false;

    function toParisMidnightIso(date: Date, addDays = 0): string {
      const copy = new Date(date);
      copy.setDate(copy.getDate() + addDays);
      copy.setHours(0, 0, 0, 0);
      return copy.toISOString();
    }

    function buildAgendaKey(
      source: "google" | "icloud",
      event: {
        id: string;
        summary?: string;
        start: { date?: string; dateTime?: string };
      },
    ) {
      return [
        source,
        event.id,
        event.summary ?? "",
        event.start.date ?? "",
        event.start.dateTime ?? "",
      ].join("::");
    }

    async function loadAgendaAlerts() {
      try {
        const statusResponse = await fetch("/api/calendar/google/status");
        const statusValue = (await statusResponse.json()) as { connected?: boolean };

        const timeMin = encodeURIComponent(toParisMidnightIso(new Date()));
        const timeMax = encodeURIComponent(toParisMidnightIso(new Date(), 14));

        const agendaBuckets: string[] = [];

        if (statusValue.connected) {
          const googleResponse = await fetch(
            `/api/calendar/events?timeMin=${timeMin}&timeMax=${timeMax}`,
          );
          const googleValue = (await googleResponse.json()) as {
            events?: {
              id: string;
              summary?: string;
              start: { date?: string; dateTime?: string };
            }[];
          };
          for (const event of googleValue.events ?? []) {
            agendaBuckets.push(buildAgendaKey("google", event));
          }
        }

        const icloudResponse = await fetch(
          `/api/calendar/icloud/events?timeMin=${timeMin}&timeMax=${timeMax}`,
        );
        const icloudValue = (await icloudResponse.json()) as {
          events?: { id: string; summary?: string; start: { date?: string; dateTime?: string } }[];
        };
        for (const event of icloudValue.events ?? []) {
          agendaBuckets.push(buildAgendaKey("icloud", event));
        }

        if (cancelled) return;

        setAgendaKeys(agendaBuckets);
        setAgendaAlertCount(countUnseenAgendaKeys(agendaBuckets));
      } catch {
        if (cancelled) return;
        setAgendaKeys([]);
        setAgendaAlertCount(0);
      }
    }

    void loadAgendaAlerts();
    const intervalId = window.setInterval(() => {
      void loadAgendaAlerts();
    }, 120000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [isColleagueEdition]);

  useEffect(() => {
    if (pathname === "/messagerie" && mailIds.length > 0) {
      markMailIdsSeen(mailIds);
      setMailAlertCount(0);
    }
  }, [pathname, mailIds]);

  useEffect(() => {
    if (pathname === "/agenda" && agendaKeys.length > 0) {
      markAgendaKeysSeen(agendaKeys);
      setAgendaAlertCount(0);
    }
  }, [pathname, agendaKeys]);

  const groupAlertCounts = useMemo(
    () => ({
      "Agenda & messages": mailAlertCount + agendaAlertCount,
    }),
    [agendaAlertCount, mailAlertCount],
  );

  function getItemAlertCount(item: NavItem): number {
    if (item.alertKey === "agenda") return agendaAlertCount;
    if (item.alertKey === "messagerie") return mailAlertCount;
    return 0;
  }

  const restrictedPage = (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="card-surface rounded-[28px] p-6 sm:p-8">
        <p className="eyebrow">Édition collègue</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Cette page n’est pas incluse dans cette version
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Cette déclinaison d’Ardoise est recentrée sur le cahier journal, les ressources, les
          corrections, le carnet de notes et le suivi des élèves pour garder un espace plus simple à
          utiliser au quotidien.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/journal"
            className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-card transition-opacity hover:opacity-90"
          >
            Ouvrir le cahier journal
          </Link>
          <Link
            to="/ressources"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Voir les ressources
          </Link>
          <Link
            to="/eleves"
            className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Suivre les élèves
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_82%,transparent),color-mix(in_oklab,var(--color-surface)_88%,transparent))] py-5 backdrop-blur-2xl transition-[width,padding,box-shadow,background] duration-300 ease-out lg:flex",
          sidebarCompact ? "w-20 px-3" : "w-64 px-4",
          "shadow-[0_10px_35px_rgba(15,23,42,0.05)]",
          !pinned && hovered && "shadow-[0_24px_60px_rgba(15,23,42,0.14)]",
        )}
      >
        <div
          className={cn("flex items-center", sidebarCompact ? "justify-center" : "justify-between")}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[1.35rem] border border-white/60 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_85%,transparent),color-mix(in_oklab,var(--color-secondary)_42%,transparent))] shadow-[var(--shadow-card)]">
              <img src={logoIconSrc} alt="Ardoise" className="h-8 w-8 rounded-xl object-contain" />
            </span>
            {!sidebarCompact ? (
              <span className="min-w-0">
                <span className="block font-display truncate text-lg font-semibold tracking-tight text-foreground">
                  Ardoise
                </span>
                <span className="block truncate text-[0.68rem] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                  Espace enseignant
                </span>
              </span>
            ) : null}
          </span>

          {!sidebarCompact ? (
            <button
              type="button"
              onClick={() => setPinned((value) => !value)}
              className={cn(
                "grid h-8 w-8 place-items-center rounded-full border transition-colors",
                pinned
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
              aria-pressed={pinned}
              aria-label={pinned ? "Rendre le menu rétractable" : "Garder le menu ouvert"}
              title={pinned ? "Rendre le menu rétractable" : "Garder le menu ouvert"}
            >
              {pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </button>
          ) : null}
        </div>
        <TooltipProvider delayDuration={120}>
          <nav className="mt-7 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto pr-1">
            {visibleNavGroups.map((group) => (
              <div key={group.title}>
                {!sidebarCompact ? (
                  <div className="flex items-center gap-2 px-3">
                    <p className="eyebrow">{group.title}</p>
                    {(groupAlertCounts[group.title as keyof typeof groupAlertCounts] ?? 0) > 0 ? (
                      <span className="rounded-full bg-danger-soft px-1.5 py-0.5 text-[0.62rem] font-semibold text-danger-strong">
                        {groupAlertCounts[group.title as keyof typeof groupAlertCounts]}
                      </span>
                    ) : null}
                  </div>
                ) : null}
                <div className="mt-1.5 flex flex-col gap-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = pathname === item.to;
                    const alertCount = getItemAlertCount(item);

                    const itemLink = (
                      <Link
                        key={item.label}
                        to={item.to}
                        aria-current={active ? "page" : undefined}
                        title={sidebarCompact ? item.label : undefined}
                        className={cn(
                          "group relative flex min-h-11 items-center rounded-xl text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/85 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                          sidebarCompact ? "justify-center px-2 py-2.5" : "gap-2.5 px-3 py-2.5",
                          active &&
                            "bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_90%,transparent),color-mix(in_oklab,var(--color-primary)_74%,var(--color-sage)))] text-primary-foreground shadow-[var(--shadow-raised)] hover:bg-primary hover:text-primary-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-ochre transition-all duration-200",
                            active ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200",
                            !active && "group-hover:scale-110",
                          )}
                        />
                        {!sidebarCompact ? <span className="truncate">{item.label}</span> : null}
                        {alertCount > 0 ? (
                          <span
                            className={cn(
                              "inline-flex min-w-5 shrink-0 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold",
                              sidebarCompact ? "absolute right-1 top-1" : "ml-auto",
                              active
                                ? "bg-white/20 text-primary-foreground"
                                : "bg-danger-soft text-danger-strong",
                            )}
                          >
                            {alertCount}
                          </span>
                        ) : null}
                      </Link>
                    );

                    if (!sidebarCompact) return itemLink;

                    return (
                      <Tooltip key={item.label}>
                        <TooltipTrigger asChild>{itemLink}</TooltipTrigger>
                        <TooltipContent side="right" className="rounded-lg">
                          {item.label}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </TooltipProvider>

        {!isColleagueEdition ? (
          <nav className="mt-6 flex flex-col gap-0.5" aria-label="Fonctionnalités à venir">
            {SECONDARY.map(({ label, icon: Icon }) => (
              <span
                key={label}
                aria-disabled="true"
                title={`${label} · fonctionnalité à venir`}
                className={cn(
                  "cursor-not-allowed items-center rounded-lg border border-dashed border-border/70 text-sm font-medium text-muted-foreground/60",
                  sidebarCompact ? "flex justify-center px-2 py-2.5" : "flex gap-2.5 px-3 py-2",
                )}
              >
                <Icon className="h-4 w-4 shrink-0 opacity-60" />
                {!sidebarCompact ? (
                  <>
                    <span className="truncate">{label}</span>
                    <span className="ml-auto shrink-0 rounded-full bg-secondary px-1.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wide text-muted-foreground">
                      Bientôt
                    </span>
                  </>
                ) : null}
              </span>
            ))}
          </nav>
        ) : null}

        <div
          className={cn(
            "card-surface mt-auto overflow-hidden bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_92%,transparent),color-mix(in_oklab,var(--color-secondary)_44%,transparent))]",
            sidebarCompact ? "p-2 text-center" : "p-3.5",
          )}
        >
          <div className={cn("flex items-center", sidebarCompact ? "justify-center" : "gap-2")}>
            <span className="h-2 w-2 shrink-0 rounded-full bg-sage" />
            {!sidebarCompact ? (
              <p className="truncate text-sm font-semibold">{profile.classLabel}</p>
            ) : null}
          </div>
          {!sidebarCompact ? (
            <p className="mt-1 text-xs text-muted-foreground">{profile.schoolLabel}</p>
          ) : (
            <p className="mt-1 text-[0.62rem] font-semibold text-muted-foreground">
              {profile.classLabel.split("·")[0]?.trim() || "CE1"}
            </p>
          )}
        </div>
      </aside>

      <div className={cn("transition-all duration-300", pinned ? "lg:pl-64" : "lg:pl-20")}>
        <header className="sticky top-0 z-30 flex items-center gap-2.5 border-b border-border/70 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-background)_84%,transparent),color-mix(in_oklab,var(--color-card)_74%,transparent))] px-3 py-2.5 backdrop-blur-2xl sm:gap-3 sm:px-6 sm:py-3">
          <img src={logoCompactSrc} alt="Ardoise" className="h-7 w-auto shrink-0 lg:hidden" />
          <nav
            className="flex min-w-0 items-center gap-1 overflow-x-auto pb-0.5 lg:hidden"
            style={{ scrollbarWidth: "none" }}
          >
            {visibleNav.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                aria-current={pathname === item.to ? "page" : undefined}
                aria-label={item.label}
                title={item.label}
                className={cn(
                  "min-h-10 shrink-0 rounded-xl border border-border/80 bg-card px-3 py-2 text-[0.72rem] font-semibold text-muted-foreground transition-colors hover:border-primary/30 hover:bg-secondary hover:text-foreground max-[430px]:px-2.5",
                  pathname === item.to &&
                    "border-primary/20 bg-primary text-primary-foreground shadow-card hover:bg-primary hover:text-primary-foreground",
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <item.icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="max-[430px]:hidden">{item.label}</span>
                  {getItemAlertCount(item) > 0 ? (
                    <span
                      className={cn(
                        "inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[0.62rem] font-semibold",
                        pathname === item.to
                          ? "bg-white/20 text-primary-foreground"
                          : "bg-danger-soft text-danger-strong",
                      )}
                    >
                      {getItemAlertCount(item)}
                    </span>
                  ) : null}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden min-w-0 flex-col lg:flex">
            <span className="eyebrow">Ardoise</span>
            <span className="panel-heading truncate text-[0.95rem]">
              {PAGE_LABELS[pathname as keyof typeof PAGE_LABELS] ?? "Ardoise"}
            </span>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            {!isColleagueEdition && (mailAlertCount > 0 || agendaAlertCount > 0) ? (
              <span className="hidden items-center gap-1.5 rounded-full border border-danger-soft-border bg-danger-soft px-3 py-1.5 text-xs font-semibold text-danger-strong lg:inline-flex">
                <CalendarCheck className="h-3.5 w-3.5" />
                {mailAlertCount + agendaAlertCount} alerte
                {mailAlertCount + agendaAlertCount > 1 ? "s" : ""}
              </span>
            ) : null}
            <Popover open={optionsOpen} onOpenChange={setOptionsOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex shrink-0 items-center gap-2 rounded-2xl border border-border/80 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-card)_96%,transparent),color-mix(in_oklab,var(--color-secondary)_38%,transparent))] px-2 py-1.5 text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-raised sm:gap-3 sm:px-2.5"
                  aria-label="Options et apparence"
                  title="Options et apparence"
                >
                  <Avatar className="h-10 w-10 border border-primary/15 shadow-card">
                    <AvatarFallback className="bg-[linear-gradient(135deg,color-mix(in_oklab,var(--color-primary)_90%,transparent),color-mix(in_oklab,var(--color-primary)_70%,var(--color-sage)))] text-sm font-semibold text-primary-foreground">
                      {profile.initials || "MB"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden min-w-0 sm:block">
                    <span className="block truncate text-sm font-semibold text-foreground">
                      {profile.displayName || "M. Boulard"}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          cloudState.configured ? "bg-sage" : "bg-amber-400",
                        )}
                      />
                      {cloudState.configured ? "Cloud prêt" : "Cloud local"}
                    </span>
                    {isColleagueEdition ? (
                      <span className="mt-0.5 block text-[0.68rem] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                        {getEditionLabel(edition)}
                      </span>
                    ) : null}
                  </span>
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-border/70 bg-secondary/85 text-primary sm:h-8 sm:w-8">
                    <Palette className="h-3.5 w-3.5" />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="max-h-[80vh] w-[23rem] overflow-y-auto">
                <ThemeControls />
                <div className="mt-4 space-y-2 border-t border-border pt-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-sage" />
                      {profile.classLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Cloud className="h-3.5 w-3.5" />
                      {cloudState.configured ? "Cloud prêt" : "Cloud local"}
                    </span>
                  </div>
                  <ProfileSettingsPanel
                    mustChangePassword={mustChangePassword}
                    onPasswordChanged={() => {
                      if (typeof window !== "undefined") {
                        window.localStorage.removeItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY);
                      }
                      setMustChangePassword(false);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      window.localStorage.removeItem(APP_EDITION_STORAGE_KEY);
                      window.localStorage.removeItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY);
                      void fetch("/api/auth/logout", { method: "POST" }).finally(() => {
                        window.location.href = "/login";
                      });
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Se déconnecter
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <main className="animate-fade-in">{routeEnabled ? children : restrictedPage}</main>
      </div>
    </div>
  );
}
