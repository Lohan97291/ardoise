import { createFileRoute } from "@tanstack/react-router";

import {
  AUTH_COOKIE_NAME,
  changePassword,
  getClassroomFromSessionCookie,
  getEditionFromSessionCookie,
  parseCookieHeader,
} from "@/lib/server/auth.server";

export const Route = createFileRoute("/api/auth/change-password")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Requête invalide." }, { status: 400 });
        }

        const currentPassword =
          body && typeof body === "object" && "currentPassword" in body
            ? String((body as Record<string, unknown>).currentPassword ?? "")
            : "";
        const nextPassword =
          body && typeof body === "object" && "nextPassword" in body
            ? String((body as Record<string, unknown>).nextPassword ?? "")
            : "";

        const cookies = parseCookieHeader(request.headers.get("cookie"));
        const edition = getEditionFromSessionCookie(cookies[AUTH_COOKIE_NAME]) ?? "full";
        const classroom = getClassroomFromSessionCookie(cookies[AUTH_COOKIE_NAME]);

        const result = await changePassword(edition, classroom, currentPassword, nextPassword);
        if (!result.ok) {
          return Response.json({ error: result.error ?? "Impossible de changer le mot de passe." }, { status: 400 });
        }

        return Response.json({ success: true, edition });
      },
    },
  },
});
