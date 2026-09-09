import { createFileRoute } from "@tanstack/react-router";
import { LogOut, Palette, Settings2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { ProfileSettingsPanel } from "@/components/ardoise/profile-settings-panel";
import { ThemeControls } from "@/components/ardoise/theme-controls";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { APP_EDITION_STORAGE_KEY, FORCE_PASSWORD_CHANGE_STORAGE_KEY } from "@/lib/app-edition";

export const Route = createFileRoute("/options")({
  head: () => ({
    meta: [
      { title: "Options — Ardoise" },
      { name: "description", content: "Personnalisez votre profil, l’apparence et les réglages d’Ardoise." },
      { property: "og:title", content: "Options — Ardoise" },
      { property: "og:description", content: "Personnalisez votre profil, l’apparence et les réglages d’Ardoise." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OptionsPage,
});

function OptionsPage() {
  const [mustChangePassword, setMustChangePassword] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setMustChangePassword(window.localStorage.getItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY) === "1");
  }, []);

  function logout() {
    window.localStorage.removeItem(APP_EDITION_STORAGE_KEY);
    window.localStorage.removeItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY);
    void fetch("/api/auth/logout", { method: "POST" }).finally(() => {
      window.location.href = "/login";
    });
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-6 border-b border-border/70 pb-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
              <Settings2 className="h-5 w-5" />
            </span>
            <div>
              <p className="eyebrow">Ardoise</p>
              <h1 className="panel-heading text-2xl sm:text-3xl">Options</h1>
              <p className="mt-1 text-sm text-muted-foreground">Votre profil, l’affichage et les réglages de l’application.</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-xl border border-border/70 bg-secondary/55 p-1 sm:w-[28rem]">
            <TabsTrigger value="profile" className="gap-2 py-2.5">
              <UserRound className="h-4 w-4" />
              Profil et compte
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 py-2.5">
              <Palette className="h-4 w-4" />
              Apparence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6 max-w-3xl">
            <ProfileSettingsPanel
              mustChangePassword={mustChangePassword}
              onPasswordChanged={() => {
                if (typeof window !== "undefined") {
                  window.localStorage.removeItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY);
                }
                setMustChangePassword(false);
              }}
            />
            <div className="mt-5 border-t border-border/70 pt-5">
              <Button type="button" variant="outline" onClick={logout}>
                <LogOut className="h-4 w-4" />
                Se déconnecter
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-6 max-w-4xl">
            <section className="rounded-2xl border border-border/80 bg-card p-5 shadow-card sm:p-6">
              <ThemeControls />
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
