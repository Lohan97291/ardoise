import { createFileRoute } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      const next = new URLSearchParams(window.location.search).get("next");
      window.location.href = next && next.startsWith("/") ? next : "/";
    } catch {
      setError("Connexion impossible pour le moment.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="card-surface w-full max-w-sm rounded-2xl border border-border p-6 shadow-card"
      >
        <div className="mb-5 flex flex-col items-center text-center">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary">
            <Lock className="h-5 w-5" />
          </div>
          <h1 className="mt-3 text-lg font-semibold text-foreground">Ardoise</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Entrez le mot de passe pour continuer.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}

        <Button type="submit" disabled={loading || !password} className="mt-5 w-full">
          {loading ? "Connexion…" : "Se connecter"}
        </Button>
      </form>
    </div>
  );
}
