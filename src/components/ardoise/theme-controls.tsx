import { MoonStar, Palette, SunMedium, Type } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  THEME_DENSITY_ORDER,
  THEME_DENSITY_PRESETS,
  THEME_FONT_PRESETS,
  THEME_FONT_PRESET_ORDER,
  THEME_PALETTES,
  THEME_PALETTE_ORDER,
  THEME_RADIUS_ORDER,
  THEME_RADIUS_PRESETS,
  THEME_TEXT_SIZE_ORDER,
  THEME_TEXT_SIZE_PRESETS,
  useThemePalette,
  type ThemeDensityId,
  type ThemeFontPresetId,
  type ThemePaletteId,
  type ThemeRadiusId,
  type ThemeTextSizeId,
} from "@/lib/theme-palette";
import { cn } from "@/lib/utils";

function PaletteButton({
  paletteId,
  currentPalette,
  onChoose,
}: {
  paletteId: ThemePaletteId;
  currentPalette: ThemePaletteId;
  onChoose: (paletteId: ThemePaletteId) => void;
}) {
  const palette = THEME_PALETTES[paletteId];
  const active = currentPalette === paletteId;

  return (
    <button
      type="button"
      onClick={() => onChoose(paletteId)}
      className={cn(
        "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-all duration-200",
        active
          ? "border-primary bg-primary/8 shadow-card"
          : "border-border bg-card hover:border-primary/30 hover:bg-secondary/45",
      )}
    >
      <div className="flex gap-1.5 pt-0.5">
        {palette.swatches.map((swatch) => (
          <span
            key={swatch}
            className="h-4 w-4 rounded-full border border-black/5 shadow-sm"
            style={{ backgroundColor: swatch }}
          />
        ))}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{palette.label}</p>
          {active ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[0.62rem] font-semibold text-primary-foreground">
              Active
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{palette.description}</p>
      </div>
    </button>
  );
}

function FontPresetButton({
  presetId,
  currentPreset,
  onChoose,
}: {
  presetId: ThemeFontPresetId;
  currentPreset: ThemeFontPresetId;
  onChoose: (presetId: ThemeFontPresetId) => void;
}) {
  const preset = THEME_FONT_PRESETS[presetId];
  const active = currentPreset === presetId;

  return (
    <button
      type="button"
      onClick={() => onChoose(presetId)}
      className={cn(
        "w-full rounded-xl border px-3 py-3 text-left transition-all duration-200",
        active
          ? "border-primary bg-primary/8 shadow-card"
          : "border-border bg-card hover:border-primary/30 hover:bg-secondary/45",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-muted-foreground">
          <Type className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{preset.label}</p>
            {active ? (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[0.62rem] font-semibold text-primary-foreground">
                Active
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{preset.description}</p>
          <p className="mt-2 text-sm text-foreground" style={{ fontFamily: preset.sans }}>
            {preset.preview}
          </p>
          <p
            className="mt-1 text-base font-semibold text-foreground"
            style={{ fontFamily: preset.display }}
          >
            Ardoise
          </p>
        </div>
      </div>
    </button>
  );
}

function PreferenceChoiceGroup<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={(next) => {
        if (next) onChange(next as T);
      }}
      variant="outline"
      size="sm"
      className="grid w-full grid-cols-3 gap-2"
    >
      {options.map((option) => (
        <ToggleGroupItem key={option.value} value={option.value} className="w-full">
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

export function ThemeControls({ className }: { className?: string }) {
  const {
    activePalette,
    appearanceMode,
    automaticLabel,
    automaticPalette,
    density,
    fontPreset,
    isDark,
    manualPalette,
    mode,
    radius,
    setAppearanceMode,
    setDensity,
    setFontPreset,
    setManualPalette,
    setMode,
    setRadius,
    setTextSize,
    textSize,
  } = useThemePalette();

  const activeDensity = THEME_DENSITY_PRESETS[density];
  const activeRadius = THEME_RADIUS_PRESETS[radius];
  const activeTextSize = THEME_TEXT_SIZE_PRESETS[textSize];

  return (
    <div className={cn("space-y-4", className)}>
      <div>
        <p className="eyebrow">Préférences</p>
        <p className="mt-1 text-base font-semibold text-foreground">
          Personnalisation de l’interface
        </p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Tout est regroupé ici pour ajuster l’ambiance visuelle sans exposer de réglages dans la
          maquette.
        </p>
      </div>

      <Tabs defaultValue="style" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="layout">Interface</TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-4">
          <div className="rounded-xl border border-border bg-secondary/35 px-3 py-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
              {isDark ? (
                <MoonStar className="h-3.5 w-3.5 text-ochre" />
              ) : (
                <SunMedium className="h-3.5 w-3.5 text-ochre" />
              )}
              {isDark ? "Mode nuit actif" : "Mode jour actif"}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {(mode === "auto"
                ? `${automaticLabel} appliqué partout dans l'app.`
                : `${THEME_PALETTES[manualPalette].label} appliquée partout dans l'app.`) +
                (isDark ? " En version nocturne." : " En version lumineuse.")}
            </p>
          </div>

          <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-3 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Palette automatique</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                En automatique, la couleur change selon le jour. Choisir une palette repasse en
                manuel.
              </p>
            </div>
            <Switch
              checked={mode === "auto"}
              onCheckedChange={(checked) => setMode(checked ? "auto" : "manual")}
              aria-label="Activer la rotation automatique des palettes"
            />
          </div>

          <div className="flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-3 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Mode nuit</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Passe toute l’interface en version nocturne, sans changer la palette active.
              </p>
            </div>
            <Switch
              checked={appearanceMode === "dark"}
              onCheckedChange={(checked) => setAppearanceMode(checked ? "dark" : "light")}
              aria-label="Activer le mode nuit"
            />
          </div>

          <div>
            <div className="mb-2">
              <p className="text-sm font-semibold text-foreground">Palette</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Choisis l’ambiance couleur de la maquette.
              </p>
            </div>
            <div className="grid gap-2">
              {THEME_PALETTE_ORDER.map((paletteId) => (
                <PaletteButton
                  key={paletteId}
                  paletteId={paletteId}
                  currentPalette={mode === "auto" ? automaticPalette : activePalette}
                  onChoose={setManualPalette}
                />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2">
              <p className="text-sm font-semibold text-foreground">Typographie</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Change le ton visuel de toute l’interface sans toucher à la structure.
              </p>
            </div>
            <div className="grid gap-2">
              {THEME_FONT_PRESET_ORDER.map((presetId) => (
                <FontPresetButton
                  key={presetId}
                  presetId={presetId}
                  currentPreset={fontPreset}
                  onChoose={setFontPreset}
                />
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <div className="rounded-xl border border-border bg-secondary/35 px-3 py-2.5">
            <p className="text-xs font-semibold text-foreground">Réglage actif</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeDensity.label} · {activeRadius.label} · {activeTextSize.label}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card px-3 py-3">
            <p className="text-sm font-semibold text-foreground">Densité d’affichage</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Agit surtout sur le rythme des contrôles et la respiration globale.
            </p>
            <div className="mt-3">
              <PreferenceChoiceGroup<ThemeDensityId>
                value={density}
                onChange={setDensity}
                options={THEME_DENSITY_ORDER.map((presetId) => ({
                  value: presetId,
                  label: THEME_DENSITY_PRESETS[presetId].label,
                }))}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{activeDensity.description}</p>
          </div>

          <div className="rounded-xl border border-border bg-card px-3 py-3">
            <p className="text-sm font-semibold text-foreground">Rayon des cartes</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Rend l’interface plus nette ou plus douce selon le caractère que tu veux donner.
            </p>
            <div className="mt-3">
              <PreferenceChoiceGroup<ThemeRadiusId>
                value={radius}
                onChange={setRadius}
                options={THEME_RADIUS_ORDER.map((presetId) => ({
                  value: presetId,
                  label: THEME_RADIUS_PRESETS[presetId].label,
                }))}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{activeRadius.description}</p>
          </div>

          <div className="rounded-xl border border-border bg-card px-3 py-3">
            <p className="text-sm font-semibold text-foreground">Taille du texte</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Ajuste l’ensemble de la lecture dans toute l’application.
            </p>
            <div className="mt-3">
              <PreferenceChoiceGroup<ThemeTextSizeId>
                value={textSize}
                onChange={setTextSize}
                options={THEME_TEXT_SIZE_ORDER.map((presetId) => ({
                  value: presetId,
                  label: THEME_TEXT_SIZE_PRESETS[presetId].label,
                }))}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{activeTextSize.description}</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function ThemeControlsPopover() {
  const { activePalette } = useThemePalette();
  const activeSwatch = THEME_PALETTES[activePalette].swatches[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full"
          aria-label="Personnaliser l'apparence"
          title="Personnaliser l'apparence"
        >
          <Palette className="h-4 w-4" />
          <span
            className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full border border-background"
            style={{ backgroundColor: activeSwatch }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="max-h-[80vh] w-[23rem] overflow-y-auto">
        <ThemeControls />
      </PopoverContent>
    </Popover>
  );
}
