import { createFileRoute } from "@tanstack/react-router";

import { buildLogoutCookie } from "@/lib/server/auth.server";

export const Route = createFileRoute("/api/auth/logout")({
  server: {
    handlers: {
      POST: async () => {
        return Response.json({ success: true }, { headers: { "Set-Cookie": buildLogoutCookie() } });
      },
    },
  },
});
