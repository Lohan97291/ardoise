import { createFileRoute } from "@tanstack/react-router";

import {
  buildSessionCookie,
  colleaguePasswordNeedsReset,
  getEditionForPassword,
  isAuthConfigured,
} from "@/lib/server/auth.server";

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthConfigured()) {
          return Response.json({ error: "Aucun mot de passe configuré." }, { status: 500 });
        }
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Requête invalide." }, { status: 400 });
        }
        const password =
          body && typeof body === "object" && "password" in body
            ? String((body as Record<string, unknown>).password ?? "")
            : "";
        const edition = getEditionForPassword(password);
        if (!edition) {
          return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
        }
        return Response.json(
          {
            success: true,
            edition,
            mustChangePassword: edition === "collegue" ? colleaguePasswordNeedsReset() : false,
          },
          { headers: { "Set-Cookie": buildSessionCookie(request, edition) } },
        );
      },
    },
  },
});
