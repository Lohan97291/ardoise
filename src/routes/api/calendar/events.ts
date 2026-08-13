import { createFileRoute } from "@tanstack/react-router";
import {
  createGoogleEvent,
  listGoogleEvents,
  type CalendarCreateInput,
} from "@/lib/server/google-calendar.server";

export const Route = createFileRoute("/api/calendar/events")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const timeMin = url.searchParams.get("timeMin") ?? new Date().toISOString();
        const timeMax =
          url.searchParams.get("timeMax") ?? new Date(Date.now() + 86_400_000).toISOString();
        try {
          return Response.json({ events: await listGoogleEvents(timeMin, timeMax) });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Google Calendar indisponible" },
            { status: 401 },
          );
        }
      },
      POST: async ({ request }) => {
        let value: unknown;
        try {
          value = await request.json();
        } catch {
          return Response.json({ error: "JSON invalide" }, { status: 400 });
        }
        const input = value as Partial<CalendarCreateInput>;
        if (!input.summary || typeof input.summary !== "string" || (!input.date && !input.start)) {
          return Response.json({ error: "Titre et date requis" }, { status: 400 });
        }
        try {
          return Response.json({ event: await createGoogleEvent(input as CalendarCreateInput) });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Google Calendar indisponible" },
            { status: 502 },
          );
        }
      },
    },
  },
});
