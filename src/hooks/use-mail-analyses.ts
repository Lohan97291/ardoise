import { useQuery } from "@tanstack/react-query";

import type { MailAnalysis } from "@/lib/server/mail-types";

async function fetchMailAnalyses(): Promise<MailAnalysis[]> {
  const response = await fetch("/api/mail/n8n");
  const value = (await response.json()) as { analyses?: MailAnalysis[] };
  return value.analyses ?? [];
}

/**
 * Plusieurs pages (dashboard, agenda, messagerie, app-shell) ont besoin des mêmes
 * analyses de mail. La clé de requête partagée évite les appels /api/mail/n8n
 * dupliqués quand ces pages sont montées simultanément.
 */
export function useMailAnalyses() {
  return useQuery({
    queryKey: ["mail-analyses"],
    queryFn: fetchMailAnalyses,
    staleTime: 30_000,
    refetchInterval: 120_000,
  });
}
