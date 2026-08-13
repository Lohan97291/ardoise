import { useCallback, useState } from "react";

import { postJsonOrThrow } from "@/lib/ai-client";

export function useAiRequest(defaultErrorMessage: string) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runJson = useCallback(
    async function runJson<TResponse>(
      url: string,
      body: unknown,
      fallbackMessage = defaultErrorMessage,
    ): Promise<TResponse | null> {
      setBusy(true);
      setError(null);

      try {
        return await postJsonOrThrow<TResponse>(url, body, fallbackMessage);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : fallbackMessage);
        return null;
      } finally {
        setBusy(false);
      }
    },
    [defaultErrorMessage],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    busy,
    error,
    setError,
    clearError,
    runJson,
  };
}
