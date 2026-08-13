import { createFileRoute } from "@tanstack/react-router";
import { icloudCalendarConfigured, listICloudEvents } from "@/lib/server/icloud-calendar.server";

export const Route = createFileRoute("/api/calendar/icloud/events")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const timeMin = url.searchParams.get("timeMin") ?? new Date().toISOString();
        const timeMax =
          url.searchParams.get("timeMax") ?? new Date(Date.now() + 86_400_000).toISOString();
        try {
          return Response.json({
            configured: icloudCalendarConfigured(),
            events: await listICloudEvents(timeMin, timeMax),
          });
        } catch (error) {
          return Response.json(
            { error: error instanceof Error ? error.message : "Calendrier iCloud indisponible" },
            { status: 502 },
          );
        }
      },
    },
  },
});
