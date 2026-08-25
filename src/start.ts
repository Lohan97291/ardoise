import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import {
  AUTH_COOKIE_NAME,
  getEditionFromSessionCookie,
  isAuthConfigured,
  isValidSessionCookie,
  parseCookieHeader,
} from "./lib/server/auth.server";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Application accessible avec un seul mot de passe partagé (usage personnel, pas de comptes).
// Désactivé automatiquement si APP_PASSWORD n'est pas défini (dev local par défaut).
function isPublicAuthPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/api/auth/") ||
    pathname.startsWith("/assets/") ||
    pathname === "/favicon.ico" ||
    pathname === "/favicon.png" ||
    pathname === "/apple-touch-icon.png" ||
    pathname === "/robots.txt"
  );
}

function isServiceIngressRequest(request: Request, pathname: string): boolean {
  if (request.method.toUpperCase() !== "POST") return false;
  return pathname === "/api/mail/n8n" || pathname === "/api/integrations/n8n/mail";
}

const authMiddleware = createMiddleware().server(async ({ request, pathname, next }) => {
  if (!isAuthConfigured() || isPublicAuthPath(pathname) || isServiceIngressRequest(request, pathname)) {
    return next();
  }

  const isApiRequest = pathname.startsWith("/api/");

  const cookies = parseCookieHeader(request.headers.get("cookie"));
  if (isValidSessionCookie(cookies[AUTH_COOKIE_NAME])) {
    const acceptsHtml = request.headers.get("accept")?.includes("text/html") ?? false;
    if (acceptsHtml) {
      const sessionEdition = getEditionFromSessionCookie(cookies[AUTH_COOKIE_NAME]);
      if (sessionEdition === "collegue") {
        const currentUrl = new URL(request.url);
        if (currentUrl.searchParams.get("edition") !== "collegue") {
          currentUrl.searchParams.set("edition", "collegue");
          return new Response(null, {
            status: 302,
            headers: { Location: currentUrl.toString() },
          });
        }
      }
    }
    return next();
  }

  if (isApiRequest) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redirectUrl = new URL("/login", request.url);
  redirectUrl.searchParams.set("next", pathname);
  return new Response(null, { status: 302, headers: { Location: redirectUrl.toString() } });
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, authMiddleware, csrfMiddleware],
}));
