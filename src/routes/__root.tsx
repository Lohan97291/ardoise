import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { ThemePaletteProvider } from "@/lib/theme-palette";
import { AppEditionProvider } from "@/lib/app-edition";
import { Toaster } from "@/components/ui/sonner";
import { reportLovableError } from "../lib/lovable-error-reporting";
import "../styles.css";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ardoise — l'assistant du quotidien des enseignants" },
      {
        name: "description",
        content:
          "Ardoise réunit le cahier journal, la programmation, les ressources et le suivi des élèves de CE1 dans une interface claire.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f7f3eb" },
    ],
    links: [
      { rel: "shortcut icon", href: "/favicon.ico?v=ardoise-20260814", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.ico?v=ardoise-20260814", sizes: "any", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.png?v=ardoise-20260814", sizes: "48x48", type: "image/png" },
      { rel: "icon", href: "/assets/icons/favicon-32.png?v=ardoise-20260814", sizes: "32x32", type: "image/png" },
      { rel: "icon", href: "/assets/icons/favicon-16.png?v=ardoise-20260814", sizes: "16x16", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=ardoise-20260814", sizes: "180x180" },
      { rel: "manifest", href: "/assets/icons/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Outfit:wght@500;600;700;800&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Public+Sans:wght@400;500;600;700&family=Source+Sans+3:wght@400;500;600;700&family=Sora:wght@500;600;700;800&family=Work+Sans:wght@500;600;700;800&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemePaletteProvider>
          <AppEditionProvider>
            <QueryClientProvider client={queryClient}>
              {/* Required: nested routes render here. */}
              <Outlet />
              <Toaster richColors position="bottom-right" />
            </QueryClientProvider>
          </AppEditionProvider>
        </ThemePaletteProvider>
        <Scripts />
      </body>
    </html>
  );
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-6xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Retour au centre de pilotage
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Cette page ne s'est pas chargée
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Réessayez ou revenez à l'accueil.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
