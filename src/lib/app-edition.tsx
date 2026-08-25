import { useRouterState } from "@tanstack/react-router";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AppRoutePath =
  | "/"
  | "/journal"
  | "/agenda"
  | "/programmation"
  | "/programmation-annuelle"
  | "/emploi-du-temps"
  | "/ressources"
  | "/correction-rapide"
  | "/fluence"
  | "/bilan-seance"
  | "/carnet-notes"
  | "/eleves"
  | "/resultats-exercices"
  | "/groupes-besoin"
  | "/ateliers-reprise"
  | "/messagerie";

export type AppEdition = "full" | "collegue";

type AppEditionContextValue = {
  edition: AppEdition;
  setEdition: (edition: AppEdition) => void;
  isColleagueEdition: boolean;
};

export const APP_EDITION_STORAGE_KEY = "ardoise-app-edition";
export const FORCE_PASSWORD_CHANGE_STORAGE_KEY = "ardoise-force-password-change";
const QUERY_KEY = "edition";

const ENABLED_ROUTES: Record<AppEdition, AppRoutePath[]> = {
  full: [
    "/",
    "/journal",
    "/agenda",
    "/programmation",
    "/programmation-annuelle",
    "/emploi-du-temps",
    "/ressources",
    "/correction-rapide",
    "/fluence",
    "/bilan-seance",
    "/carnet-notes",
    "/eleves",
    "/resultats-exercices",
    "/groupes-besoin",
    "/ateliers-reprise",
    "/messagerie",
  ],
  collegue: [
    "/",
    "/journal",
    "/ressources",
    "/correction-rapide",
    "/carnet-notes",
    "/eleves",
    "/resultats-exercices",
  ],
};

const EDITION_LABELS: Record<AppEdition, string> = {
  full: "Ardoise complet",
  collegue: "Ardoise collègue",
};

const AppEditionContext = createContext<AppEditionContextValue | null>(null);

function normalizeEdition(raw: string | null | undefined): AppEdition {
  if (!raw) return "full";
  return raw === "collegue" || raw === "colleague" ? "collegue" : "full";
}

function getEnvEdition(): AppEdition {
  return normalizeEdition(import.meta.env.VITE_ARDOISE_EDITION);
}

function getStoredEdition(): AppEdition | null {
  if (typeof window === "undefined") return getEnvEdition();
  const stored = window.localStorage.getItem(APP_EDITION_STORAGE_KEY);
  return stored ? normalizeEdition(stored) : null;
}

export function AppEditionProvider({ children }: { children: ReactNode }) {
  const search = useRouterState({ select: (state) => state.location.search });
  const queryEdition = useMemo<AppEdition | null>(() => {
    const params = new URLSearchParams(search);
    return params.has(QUERY_KEY) ? normalizeEdition(params.get(QUERY_KEY)) : null;
  }, [search]);

  const [edition, setEditionState] = useState<AppEdition>(() => {
    if (queryEdition) return queryEdition;
    return getStoredEdition() ?? getEnvEdition();
  });

  useEffect(() => {
    if (!queryEdition) return;
    setEditionState(queryEdition);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(APP_EDITION_STORAGE_KEY, queryEdition);
    }
  }, [queryEdition]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (!url.searchParams.has(QUERY_KEY)) return;

    url.searchParams.delete(QUERY_KEY);
    const nextSearch = url.searchParams.toString();
    const nextUrl = url.pathname + (nextSearch ? `?${nextSearch}` : "") + url.hash;
    window.history.replaceState({}, "", nextUrl);
  }, []);

  const value = useMemo<AppEditionContextValue>(
    () => ({
      edition,
      setEdition: (nextEdition) => {
        setEditionState(nextEdition);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(APP_EDITION_STORAGE_KEY, nextEdition);
        }
      },
      isColleagueEdition: edition === "collegue",
    }),
    [edition],
  );

  return <AppEditionContext.Provider value={value}>{children}</AppEditionContext.Provider>;
}

export function useAppEdition(): AppEditionContextValue {
  const context = useContext(AppEditionContext);
  if (!context) {
    throw new Error("useAppEdition must be used within AppEditionProvider");
  }
  return context;
}

export function isRouteEnabled(pathname: string, edition: AppEdition): pathname is AppRoutePath {
  return ENABLED_ROUTES[edition].includes(pathname as AppRoutePath);
}

export function getEditionLabel(edition: AppEdition): string {
  return EDITION_LABELS[edition];
}
