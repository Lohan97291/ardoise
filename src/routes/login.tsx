import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  APP_EDITION_STORAGE_KEY,
  FORCE_PASSWORD_CHANGE_STORAGE_KEY,
} from "@/lib/app-edition";

const COLLEAGUE_CLASSROOM_STORAGE_KEY = "ardoise-colleague-classroom";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Connexion — Ardoise" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? "Mot de passe incorrect.");
        setLoading(false);
        return;
      }
      const payload = (await response.json().catch(() => null)) as
        | {
            edition?: "full" | "collegue";
            mustChangePassword?: boolean;
            classroom?: "durand" | "grimal" | "menager" | "thomas-henry";
          }
        | null;
      if (payload?.edition) {
        window.localStorage.setItem(APP_EDITION_STORAGE_KEY, payload.edition);
      }
      if (payload?.classroom) {
        window.localStorage.setItem(COLLEAGUE_CLASSROOM_STORAGE_KEY, payload.classroom);
      }
      if (payload?.mustChangePassword) {
        window.localStorage.setItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY, "1");
      } else {
        window.localStorage.removeItem(FORCE_PASSWORD_CHANGE_STORAGE_KEY);
      }
      const next = new URLSearchParams(window.location.search).get("next");
      const target = new URL(next && next.startsWith("/") ? next : "/", window.location.origin);
      if (payload?.edition === "collegue") {
        target.searchParams.set("edition", "collegue");
        if (payload.classroom) {
          target.searchParams.set("classroom", payload.classroom);
        }
      }
      window.location.href = `${target.pathname}${target.search}${target.hash}`;
    } catch {
      setError("Connexion impossible pour le moment.");
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_12%,color-mix(in_oklab,var(--color-primary)_17%,transparent),transparent_31%),radial-gradient(circle_at_88%_88%,color-mix(in_oklab,var(--color-sage)_23%,transparent),transparent_36%),var(--color-background)] px-4 py-8 sm:grid sm:place-items-center sm:p-8">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,var(--color-primary),var(--color-sage),var(--color-ochre))]" />
      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-card/90 shadow-[0_38px_100px_-48px_rgba(15,23,42,0.55)] backdrop-blur sm:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
        <section className="relative overflow-hidden bg-[linear-gradient(145deg,color-mix(in_oklab,var(--color-primary)_96%,#122444),color-mix(in_oklab,var(--color-primary)_74%,var(--color-sage)))] px-6 py-9 text-primary-foreground sm:px-10 sm:py-12">
          <div aria-hidden="true" className="absolute -right-16 -top-14 h-56 w-56 rounded-full border border-white/15 bg-white/5" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-white/10 bg-white/5" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              ARDOISE · CE1
            </div>
            <h1 className="mt-7 max-w-md font-display text-4xl font-semibold leading-[1.03] tracking-tight sm:text-5xl">
              Une classe claire, une journée sereine.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-6 text-primary-foreground/80 sm:text-base">
              Le cahier journal, les ressources et le suivi des élèves réunis dans un espace simple à utiliser chaque jour.
            </p>
            <div className="mt-10 grid gap-3 text-sm text-primary-foreground/85">
              {["Préparer la journée en un coup d'œil", "Retrouver les séances et leurs supports", "Garder le fil des apprentissages"].map((item) => (
                <p key={item} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/15"><Check className="h-3.5 w-3.5" /></span>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </section>

        <form onSubmit={handleSubmit} className="p-6 sm:p-10">
          <div>
            <p className="eyebrow">Bienvenue</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Ouvrir mon espace</h2>
            <p className="mt-2 text-sm leading-5 text-muted-foreground">Entrez simplement votre mot de passe : Ardoise ouvre automatiquement le bon espace.</p>
          </div>

          <div className="mt-8 space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" autoFocus autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </div>

          {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

          <Button type="submit" disabled={loading || !password} className="mt-6 w-full rounded-xl">
            <Lock className="mr-2 h-4 w-4" />
            {loading ? "Connexion…" : "Entrer dans Ardoise"}
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">À la première connexion, chaque collègue choisit son mot de passe personnel.</p>
        </form>
      </div>
    </div>
  );
}
