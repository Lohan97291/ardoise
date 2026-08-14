import { createFileRoute } from "@tanstack/react-router";
import { googleCalendarConfigured, googleConnectUrl } from "@/lib/server/google-calendar.server";

export const Route = createFileRoute("/api/calendar/google/connect")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!googleCalendarConfigured())
          return new Response("Google Calendar n'est pas configuré.", { status: 503 });
        return Response.redirect(googleConnectUrl(request.url), 302);
      },
    },
  },
});
