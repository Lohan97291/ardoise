import { createFileRoute } from "@tanstack/react-router";

import {
  buildSessionCookie,
  getLoginAccess,
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
        const access = getLoginAccess(password);
        if (!access) {
          return Response.json({ error: "Mot de passe incorrect." }, { status: 401 });
        }
        return Response.json(
          {
            success: true,
            edition: access.edition,
            mustChangePassword: access.mustChangePassword,
            classroom: access.classroom,
          },
          { headers: { "Set-Cookie": buildSessionCookie(request, access.edition, access.classroom) } },
        );
      },
    },
  },
});
