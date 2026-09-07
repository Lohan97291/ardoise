import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Maximize2, Minimize2, Puzzle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { AppShell } from "@/components/ardoise/app-shell";
import { Button } from "@/components/ui/button";
import { resolveCurrentClassroomKey } from "@/lib/ardoise-eval";

export const Route = createFileRoute("/orthographemic")({
  head: () => ({
    meta: [
      { title: "L'atelier des étiquettes — Ardoise" },
      {
        name: "description",
        content: "Atelier tactile des étiquettes, intégré à Ardoise.",
      },
    ],
  }),
  component: OrthographemicPage,
});

const LETTERS = new Set(["a", "o", "e", "c", "g", "s", "i"]);
const ACTIVITIES = new Set(["sort", "images", "write", "riddles", "tap", "free"]);

function getWorkshopConfig() {
  if (typeof window === "undefined") return { letter: undefined, activity: undefined };
  const params = new URLSearchParams(window.location.search);
  const letter = params.get("letter")?.trim().toLowerCase();
  const activity = params.get("activity")?.trim().toLowerCase();
  return {
    letter: letter && LETTERS.has(letter) ? letter : undefined,
    activity: activity && ACTIVITIES.has(activity) ? activity : undefined,
  };
}

function OrthographemicPage() {
  const navigate = useNavigate();
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const config = getWorkshopConfig();

  const src = useMemo(() => {
    const fragment = new URLSearchParams({
      embed: "1",
      session: `classe-${resolveCurrentClassroomKey()}`,
    });
    if (config.letter) fragment.set("letter", config.letter);
    if (config.activity) fragment.set("activity", config.activity);
    return `/modules/orthographemic/Orthographemic-CE1.html#${fragment.toString()}`;
  }, [config.activity, config.letter]);

  useEffect(() => {
    if ("serviceWorker" in navigator && window.isSecureContext) {
      navigator.serviceWorker.register("/modules/orthographemic/sw.js", {
        scope: "/modules/orthographemic/",
      }).catch(() => {
        // Le module reste autonome même si le navigateur interdit le cache hors connexion.
      });
    }

    function connectToWorkshop() {
      frameRef.current?.contentWindow?.postMessage(
        { source: "ardoise", version: 1, type: "connect" },
        window.location.origin,
      );
    }

    function onMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frameRef.current?.contentWindow) return;
      const message = event.data;
      if (!message || message.source !== "orthographemic-ce1" || message.version !== 1) return;
      if (message.type === "ready") connectToWorkshop();
      if (message.type === "close") navigate({ to: "/ressources" });
    }

    function onFullscreenChange() {
      setFullscreen(Boolean(document.fullscreenElement));
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [navigate]);

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await frameRef.current?.requestFullscreen();
      }
    } catch {
      // Certains navigateurs encadrés limitent le plein écran : l'atelier reste disponible en grand format.
    }
  }

  return (
    <AppShell>
      <main className="mx-auto flex min-h-[calc(100dvh-5rem)] max-w-[1440px] flex-col px-3 py-3 sm:px-5 sm:py-5">
        <header className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-border/70 bg-card/85 px-3 py-2.5 shadow-card sm:px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Puzzle className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-foreground sm:text-base">L'atelier des étiquettes</h1>
              <p className="hidden text-xs text-muted-foreground sm:block">Atelier tactile de manipulation</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Button asChild variant="ghost" size="sm" className="h-9 px-2.5">
              <Link to="/ressources">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Retour
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="h-9 px-2.5" onClick={toggleFullscreen}>
              {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              <span className="ml-1.5 hidden sm:inline">Plein écran</span>
            </Button>
          </div>
        </header>

        <section className="min-h-[calc(100dvh-9.5rem)] flex-1 overflow-hidden rounded-2xl border border-border bg-[#f4f7fc] shadow-raised sm:rounded-3xl">
          <iframe
            ref={frameRef}
            title="L'atelier des étiquettes"
            src={src}
            allowFullScreen
            className="block h-full min-h-[620px] w-full border-0"
          />
        </section>
      </main>
    </AppShell>
  );
}
