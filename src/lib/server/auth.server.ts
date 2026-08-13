import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export const AUTH_COOKIE_NAME = "ardoise_auth";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 jours
const AUTH_SETTINGS_PATH = join(process.cwd(), ".data", "auth-settings.json");

type AuthSettings = {
  password: string;
  updatedAt: string;
};

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function sign(payload: string): string {
  const secret = resolvePasswordSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function isAuthConfigured(): boolean {
  return Boolean(resolvePasswordSecret());
}

export function checkPassword(password: string): boolean {
  const expected = resolvePasswordSecret();
  if (!expected) return false;
  return safeEqual(password, expected);
}

function readStoredAuthSettings(): AuthSettings | null {
  try {
    if (!existsSync(AUTH_SETTINGS_PATH)) return null;
    const parsed = JSON.parse(readFileSync(AUTH_SETTINGS_PATH, "utf-8")) as Partial<AuthSettings>;
    if (!parsed.password || typeof parsed.password !== "string") return null;
    return {
      password: parsed.password,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

function writeStoredAuthSettings(settings: AuthSettings): void {
  mkdirSync(dirname(AUTH_SETTINGS_PATH), { recursive: true });
  writeFileSync(AUTH_SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
}

export function resolvePasswordSecret(): string {
  return readStoredAuthSettings()?.password ?? process.env.APP_PASSWORD ?? "";
}

export function changePassword(currentPassword: string, nextPassword: string): {
  ok: boolean;
  error?: string;
} {
  if (!isAuthConfigured()) {
    return { ok: false, error: "Aucun mot de passe n'est configuré pour le moment." };
  }

  if (!checkPassword(currentPassword)) {
    return { ok: false, error: "Le mot de passe actuel est incorrect." };
  }

  const trimmed = nextPassword.trim();
  if (trimmed.length < 6) {
    return { ok: false, error: "Le nouveau mot de passe doit contenir au moins 6 caractères." };
  }

  writeStoredAuthSettings({
    password: trimmed,
    updatedAt: new Date().toISOString(),
  });

  return { ok: true };
}

export function createSessionCookieValue(): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function isValidSessionCookie(value: string | undefined | null): boolean {
  if (!value) return false;
  const separatorIndex = value.indexOf(".");
  if (separatorIndex === -1) return false;
  const expiresAt = value.slice(0, separatorIndex);
  const signature = value.slice(separatorIndex + 1);
  if (!Number.isFinite(Number(expiresAt)) || Date.now() > Number(expiresAt)) return false;
  return safeEqual(signature, sign(expiresAt));
}

export function parseCookieHeader(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) continue;
    const key = part.slice(0, separatorIndex).trim();
    if (!key) continue;
    out[key] = decodeURIComponent(part.slice(separatorIndex + 1).trim());
  }
  return out;
}

export function buildSessionCookie(request: Request): string {
  const isHttps = new URL(request.url).protocol === "https:";
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  return [
    `${AUTH_COOKIE_NAME}=${createSessionCookieValue()}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
    isHttps ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

export function buildLogoutCookie(): string {
  return `${AUTH_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}
