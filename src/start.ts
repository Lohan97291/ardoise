import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
import {
  AUTH_COOKIE_NAME,
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
  return pathname === "/login" || pathname.startsWith("/api/auth/");
}

const authMiddleware = createMiddleware().server(async ({ request, pathname, next }) => {
  const appPassword = process.env.APP_PASSWORD;
  if (!appPassword || isPublicAuthPath(pathname)) return next();

  const acceptsHtml = request.headers.get("accept")?.includes("text/html") ?? false;
  const isApiRequest = pathname.startsWith("/api/");
  if (!acceptsHtml && !isApiRequest) return next();

  const cookies = parseCookieHeader(request.headers.get("cookie"));
  if (isValidSessionCookie(cookies[AUTH_COOKIE_NAME])) return next();

  if (acceptsHtml) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", pathname);
    return new Response(null, { status: 302, headers: { Location: redirectUrl.toString() } });
  }
  return Response.json({ error: "Unauthorized" }, { status: 401 });
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
