import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { createLocalStore } from "@/lib/local-store";

export type ThemePaletteId = "forest" | "terracotta" | "slate" | "olive";
export type ThemeMode = "auto" | "manual";
export type ThemeAppearanceMode = "light" | "dark";
export type ThemeDensityId = "compact" | "balanced" | "comfortable";
export type ThemeRadiusId = "tight" | "balanced" | "soft";
export type ThemeTextSizeId = "compact" | "standard" | "large";
export type ThemeFontPresetId =
  "classic" | "editorial" | "contemporary" | "institutional" | "notebook" | "readable";

type ThemePreferences = {
  mode: ThemeMode;
  manualPalette: ThemePaletteId;
  appearanceMode: ThemeAppearanceMode;
  fontPreset: ThemeFontPresetId;
  density: ThemeDensityId;
  radius: ThemeRadiusId;
  textSize: ThemeTextSizeId;
};

type ThemePaletteMeta = {
  label: string;
  shortLabel: string;
  description: string;
  swatches: [string, string, string];
  metaColor: string;
  darkMetaColor: string;
};

type ThemeContextValue = {
  mode: ThemeMode;
  appearanceMode: ThemeAppearanceMode;
  isDark: boolean;
  fontPreset: ThemeFontPresetId;
  density: ThemeDensityId;
  radius: ThemeRadiusId;
  textSize: ThemeTextSizeId;
  activePalette: ThemePaletteId;
  automaticPalette: ThemePaletteId;
  manualPalette: ThemePaletteId;
  automaticLabel: string;
  logoHorizontalSrc: string;
  logoCompactSrc: string;
  logoIconSrc: string;
  setMode: (mode: ThemeMode) => void;
  setAppearanceMode: (mode: ThemeAppearanceMode) => void;
  setManualPalette: (palette: ThemePaletteId) => void;
  setFontPreset: (preset: ThemeFontPresetId) => void;
  setDensity: (density: ThemeDensityId) => void;
  setRadius: (radius: ThemeRadiusId) => void;
  setTextSize: (textSize: ThemeTextSizeId) => void;
};

const THEME_PREFERENCES_KEY = "ardoise.theme.palette.v1";
const DEFAULT_THEME_PREFERENCES: ThemePreferences = {
  mode: "auto",
  manualPalette: "slate",
  appearanceMode: "light",
  fontPreset: "classic",
  density: "balanced",
  radius: "balanced",
  textSize: "standard",
};

const themePreferencesStore = createLocalStore<ThemePreferences>(
  THEME_PREFERENCES_KEY,
  DEFAULT_THEME_PREFERENCES,
);

export const THEME_PALETTE_ORDER: ThemePaletteId[] = ["forest", "terracotta", "slate", "olive"];

export const THEME_FONT_PRESET_ORDER: ThemeFontPresetId[] = [
  "classic",
  "editorial",
  "contemporary",
  "institutional",
  "notebook",
  "readable",
];

export const THEME_DENSITY_ORDER: ThemeDensityId[] = ["compact", "balanced", "comfortable"];

export const THEME_RADIUS_ORDER: ThemeRadiusId[] = ["tight", "balanced", "soft"];

export const THEME_TEXT_SIZE_ORDER: ThemeTextSizeId[] = ["compact", "standard", "large"];

export const THEME_FONT_PRESETS: Record<
  ThemeFontPresetId,
  {
    label: string;
    description: string;
    sans: string;
    display: string;
    preview: string;
  }
> = {
  classic: {
    label: "Classique",
    description: "La base Ardoise: très lisible, douce et institutionnelle.",
    sans: '"Public Sans", ui-sans-serif, system-ui, sans-serif',
    display: '"Outfit", ui-sans-serif, system-ui, sans-serif',
    preview: "Organisation claire et repères solides",
  },
  editorial: {
    label: "Éditoriale",
    description: "Un rendu plus structuré, posé et premium.",
    sans: '"Source Sans 3", ui-sans-serif, system-ui, sans-serif',
    display: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    preview: "Préparer, suivre et organiser la classe",
  },
  contemporary: {
    label: "Contemporaine",
    description: "Plus nette et actuelle, sans devenir froide.",
    sans: '"Manrope", ui-sans-serif, system-ui, sans-serif',
    display: '"Sora", ui-sans-serif, system-ui, sans-serif',
    preview: "Une interface sereine au quotidien",
  },
  institutional: {
    label: "Institutionnelle",
    description: "Plus cadrée, plus officielle, parfaite pour un rendu école solide.",
    sans: '"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif',
    display: '"Work Sans", ui-sans-serif, system-ui, sans-serif',
    preview: "Repères stables, lecture fiable et ton rassurant",
  },
  notebook: {
    label: "Cahier premium",
    description: "Un peu plus éditoriale et haut de gamme, sans perdre en clarté.",
    sans: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    display: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    preview: "Préparer la classe avec une présence plus raffinée",
  },
  readable: {
    label: "Très lisible",
    description: "Pensée pour une lecture simple et confortable côté parents et enseignants.",
    sans: '"Lexend", ui-sans-serif, system-ui, sans-serif',
    display: '"Manrope", ui-sans-serif, system-ui, sans-serif',
    preview: "Des écrans faciles a lire en un coup d'oeil",
  },
};

export const THEME_DENSITY_PRESETS: Record<
  ThemeDensityId,
  {
    label: string;
    description: string;
    controlHeight: string;
    controlHeightSm: string;
    controlHeightLg: string;
    lineHeight: string;
  }
> = {
  compact: {
    label: "Compacte",
    description: "Plus resserrée pour afficher davantage d'informations.",
    controlHeight: "2.1rem",
    controlHeightSm: "1.9rem",
    controlHeightLg: "2.55rem",
    lineHeight: "1.42",
  },
  balanced: {
    label: "Équilibrée",
    description: "Le meilleur compromis entre respiration et efficacité.",
    controlHeight: "2.25rem",
    controlHeightSm: "2rem",
    controlHeightLg: "2.75rem",
    lineHeight: "1.5",
  },
  comfortable: {
    label: "Confort",
    description: "Plus aérée et plus tranquille à lire au quotidien.",
    controlHeight: "2.45rem",
    controlHeightSm: "2.15rem",
    controlHeightLg: "2.95rem",
    lineHeight: "1.62",
  },
};

export const THEME_RADIUS_PRESETS: Record<
  ThemeRadiusId,
  {
    label: string;
    description: string;
    radius: string;
  }
> = {
  tight: {
    label: "Discret",
    description: "Des angles plus nets, plus sobres et plus institutionnels.",
    radius: "0.58rem",
  },
  balanced: {
    label: "Équilibré",
    description: "Le juste milieu actuel, souple sans être mou.",
    radius: "0.75rem",
  },
  soft: {
    label: "Doux",
    description: "Des cartes plus accueillantes et légèrement plus chaleureuses.",
    radius: "0.95rem",
  },
};

export const THEME_TEXT_SIZE_PRESETS: Record<
  ThemeTextSizeId,
  {
    label: string;
    description: string;
    scale: number;
  }
> = {
  compact: {
    label: "Compact",
    description: "Un peu plus serré pour gagner de la place.",
    scale: 0.95,
  },
  standard: {
    label: "Standard",
    description: "Taille normale, équilibrée pour la plupart des usages.",
    scale: 1,
  },
  large: {
    label: "Grande",
    description: "Lecture plus confortable à distance ou sur de longues sessions.",
    scale: 1.08,
  },
};

export const THEME_PALETTES: Record<ThemePaletteId, ThemePaletteMeta> = {
  forest: {
    label: "Forêt & sable",
    shortLabel: "Forêt",
    description: "Très institutionnel, calme et premium.",
    swatches: ["#204a31", "#e5d7bd", "#f2b53a"],
    metaColor: "#f6f1e7",
    darkMetaColor: "#101712",
  },
  terracotta: {
    label: "Terracotta & encre",
    shortLabel: "Terracotta",
    description: "Plus vivant, chaleureux et singulier.",
    swatches: ["#cf6137", "#163a61", "#f0b53e"],
    metaColor: "#fbf0e7",
    darkMetaColor: "#18110f",
  },
  slate: {
    label: "Ardoise & cuivre doux",
    shortLabel: "Ardoise",
    description: "Le plus éditorial, net et équilibré.",
    swatches: ["#506b8b", "#d18b52", "#f0b848"],
    metaColor: "#f7f3eb",
    darkMetaColor: "#0f141d",
  },
  olive: {
    label: "Olive & crème",
    shortLabel: "Olive",
    description: "Chaleureux, feutré et très apaisé.",
    swatches: ["#6f6c3d", "#ede2c9", "#efb43f"],
    metaColor: "#f8f4ea",
    darkMetaColor: "#14150f",
  },
};

const ThemePaletteContext = createContext<ThemeContextValue | null>(null);

function getAutomaticPaletteForDay(day: number): ThemePaletteId {
  switch (day) {
    case 1:
      return "forest";
    case 2:
      return "terracotta";
    case 3:
      return "slate";
    case 4:
      return "olive";
    case 5:
      return "forest";
    case 6:
      return "terracotta";
    default:
      return "slate";
  }
}

function getAutomaticPaletteForDate(date: Date): ThemePaletteId {
  return getAutomaticPaletteForDay(date.getDay());
}

function getAutomaticLabel(date: Date, palette: ThemePaletteId): string {
  const day = new Intl.DateTimeFormat("fr-FR", { weekday: "long" }).format(date);
  const capitalizedDay = day.charAt(0).toUpperCase() + day.slice(1);
  return `${capitalizedDay} · ${THEME_PALETTES[palette].shortLabel}`;
}

function getThemeLogoSrc(
  palette: ThemePaletteId,
  appearanceMode: ThemeAppearanceMode,
  variant: "horizontal" | "compact" | "icon",
) {
  return `/assets/logo/themes/ardoise-logo-${variant}-${palette}-${appearanceMode}.png`;
}

export function ThemePaletteProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<ThemePreferences>(DEFAULT_THEME_PREFERENCES);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [todayKey, setTodayKey] = useState(() => new Date().toDateString());

  useEffect(() => {
    setPreferences({
      ...DEFAULT_THEME_PREFERENCES,
      ...themePreferencesStore.get(),
    });
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (preferences.mode !== "auto") return undefined;

    const intervalId = window.setInterval(() => {
      const nextKey = new Date().toDateString();
      setTodayKey((current) => (current === nextKey ? current : nextKey));
    }, 60000);

    return () => window.clearInterval(intervalId);
  }, [preferences.mode]);

  const automaticDate = useMemo(() => new Date(todayKey), [todayKey]);
  const automaticPalette = useMemo(
    () => getAutomaticPaletteForDate(automaticDate),
    [automaticDate],
  );
  const activePalette = preferences.mode === "auto" ? automaticPalette : preferences.manualPalette;
  const isDark = preferences.appearanceMode === "dark";
  const logoAppearance = isDark ? "dark" : "light";
  const automaticLabel = useMemo(
    () => getAutomaticLabel(automaticDate, automaticPalette),
    [automaticDate, automaticPalette],
  );

  useEffect(() => {
    const root = document.documentElement;
    const activeFontPreset = THEME_FONT_PRESETS[preferences.fontPreset];
    const densityPreset = THEME_DENSITY_PRESETS[preferences.density];
    const radiusPreset = THEME_RADIUS_PRESETS[preferences.radius];
    const textSizePreset = THEME_TEXT_SIZE_PRESETS[preferences.textSize];
    root.dataset.themePalette = activePalette;
    root.dataset.uiDensity = preferences.density;
    root.classList.toggle("dark", isDark);
    root.style.colorScheme = isDark ? "dark" : "light";
    root.style.setProperty("--app-font-sans", activeFontPreset.sans);
    root.style.setProperty("--app-font-display", activeFontPreset.display);
    root.style.setProperty("--app-control-height", densityPreset.controlHeight);
    root.style.setProperty("--app-control-height-sm", densityPreset.controlHeightSm);
    root.style.setProperty("--app-control-height-lg", densityPreset.controlHeightLg);
    root.style.setProperty("--app-line-height-body", densityPreset.lineHeight);
    root.style.setProperty("--app-radius-base", radiusPreset.radius);
    root.style.setProperty("--app-text-scale", `${textSizePreset.scale}`);

    const themeColorMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    themeColorMeta?.setAttribute(
      "content",
      isDark
        ? THEME_PALETTES[activePalette].darkMetaColor
        : THEME_PALETTES[activePalette].metaColor,
    );
  }, [
    activePalette,
    isDark,
    preferences.density,
    preferences.fontPreset,
    preferences.radius,
    preferences.textSize,
  ]);

  function updatePreferences(updater: (current: ThemePreferences) => ThemePreferences) {
    setPreferences((current) => {
      const next = updater(current);
      if (hasLoaded) {
        themePreferencesStore.set(next);
      }
      return next;
    });
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      mode: preferences.mode,
      appearanceMode: preferences.appearanceMode,
      isDark,
      fontPreset: preferences.fontPreset,
      density: preferences.density,
      radius: preferences.radius,
      textSize: preferences.textSize,
      activePalette,
      automaticPalette,
      manualPalette: preferences.manualPalette,
      automaticLabel,
      logoHorizontalSrc: getThemeLogoSrc(activePalette, logoAppearance, "horizontal"),
      logoCompactSrc: getThemeLogoSrc(activePalette, logoAppearance, "compact"),
      logoIconSrc: getThemeLogoSrc(activePalette, logoAppearance, "icon"),
      setMode: (mode) => {
        updatePreferences((current) => ({ ...current, mode }));
      },
      setAppearanceMode: (appearanceMode) => {
        updatePreferences((current) => ({ ...current, appearanceMode }));
      },
      setManualPalette: (palette) => {
        updatePreferences((current) => ({
          ...current,
          mode: "manual",
          manualPalette: palette,
        }));
      },
      setFontPreset: (fontPreset) => {
        updatePreferences((current) => ({ ...current, fontPreset }));
      },
      setDensity: (density) => {
        updatePreferences((current) => ({ ...current, density }));
      },
      setRadius: (radius) => {
        updatePreferences((current) => ({ ...current, radius }));
      },
      setTextSize: (textSize) => {
        updatePreferences((current) => ({ ...current, textSize }));
      },
    }),
    [
      activePalette,
      preferences.density,
      isDark,
      logoAppearance,
      preferences.appearanceMode,
      preferences.fontPreset,
      preferences.radius,
      preferences.textSize,
      automaticLabel,
      automaticPalette,
      hasLoaded,
      preferences.manualPalette,
      preferences.mode,
    ],
  );

  return <ThemePaletteContext.Provider value={value}>{children}</ThemePaletteContext.Provider>;
}

export function useThemePalette() {
  const context = useContext(ThemePaletteContext);
  if (!context) {
    throw new Error("useThemePalette must be used within ThemePaletteProvider");
  }
  return context;
}
