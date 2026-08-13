import { createFileRoute } from "@tanstack/react-router";
import {
  googleCalendarConfigured,
  googleCalendarConnected,
} from "@/lib/server/google-calendar.server";

export const Route = createFileRoute("/api/calendar/google/status")({
  server: {
    handlers: {
      GET: async () =>
        Response.json({
          configured: googleCalendarConfigured(),
          connected: googleCalendarConnected(),
        }),
    },
  },
});
