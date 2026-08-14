import { createFileRoute } from "@tanstack/react-router";
import { googleCallback } from "@/lib/server/google-calendar.server";

export const Route = createFileRoute("/api/calendar/google/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        if (!code || !state) return new Response("Connexion Google incomplète.", { status: 400 });
        try {
          await googleCallback(code, state, request.url);
          return Response.redirect(new URL("/agenda?google=connected", request.url), 302);
        } catch (error) {
          console.error(error);
          return Response.redirect(new URL("/agenda?google=error", request.url), 302);
        }
      },
    },
  },
});
