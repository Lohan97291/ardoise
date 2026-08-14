import { createFileRoute } from "@tanstack/react-router";

import {
  handleMailIngressDelete,
  handleMailIngressGet,
  handleMailIngressPost,
} from "@/lib/server/mail-ingest.server";

export const Route = createFileRoute("/api/integrations/n8n/mail")({
  server: {
    handlers: {
      GET: async () => handleMailIngressGet(),
      POST: async ({ request }) => handleMailIngressPost(request),
      DELETE: async ({ request }) => handleMailIngressDelete(request),
    },
  },
});
