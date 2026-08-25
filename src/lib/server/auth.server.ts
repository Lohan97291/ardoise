import { createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { AppEdition } from "@/lib/app-edition";

export const AUTH_COOKIE_NAME = "ardoise_auth";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 jours
const AUTH_SETTINGS_PATH = join(process.cwd(), ".data", "auth-settings.json");

type AuthSettings = {
  password?: string;
  updatedAt?: string;
  colleaguePassword?: string;
  colleaguePasswordUpdatedAt?: string;
  colleaguePasswordMustChange?: boolean;
};

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function resolveFullPasswordSecret(): string {
  return readStoredAuthSettings()?.password ?? process.env.APP_PASSWORD ?? "";
}

function resolveColleaguePasswordSecret(): string {
  return readStoredAuthSettings()?.colleaguePassword ?? process.env.APP_PASSWORD_COLLEGUE ?? "";
}

function getSessionSecret(): string {
  return resolveFullPasswordSecret() || resolveColleaguePasswordSecret();
}

function sign(payload: string): string {
  const secret = getSessionSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function isAuthConfigured(): boolean {
  return Boolean(resolveFullPasswordSecret() || resolveColleaguePasswordSecret());
}

export function checkPassword(password: string): boolean {
  const expected = resolveFullPasswordSecret();
  if (!expected) return false;
  return safeEqual(password, expected);
}

function readStoredAuthSettings(): AuthSettings | null {
  try {
    if (!existsSync(AUTH_SETTINGS_PATH)) return null;
    const parsed = JSON.parse(readFileSync(AUTH_SETTINGS_PATH, "utf-8")) as Partial<AuthSettings>;
    const hasFullPassword = typeof parsed.password === "string" && parsed.password.trim().length > 0;
    const hasColleaguePassword =
      typeof parsed.colleaguePassword === "string" && parsed.colleaguePassword.trim().length > 0;
    if (!hasFullPassword && !hasColleaguePassword) return null;
    return {
      password: hasFullPassword ? parsed.password?.trim() : undefined,
      updatedAt: parsed.updatedAt ?? undefined,
      colleaguePassword: hasColleaguePassword ? parsed.colleaguePassword?.trim() : undefined,
      colleaguePasswordUpdatedAt: parsed.colleaguePasswordUpdatedAt ?? undefined,
      colleaguePasswordMustChange: Boolean(parsed.colleaguePasswordMustChange),
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
  return resolveFullPasswordSecret();
}

export function colleaguePasswordNeedsReset(): boolean {
  const stored = readStoredAuthSettings();
  if (stored?.colleaguePassword) {
    return stored.colleaguePasswordMustChange === true;
  }
  return Boolean(process.env.APP_PASSWORD_COLLEGUE);
}

export function getEditionForPassword(password: string): AppEdition | null {
  const colleaguePassword = resolveColleaguePasswordSecret();
  if (colleaguePassword && safeEqual(password, colleaguePassword)) {
    return "collegue";
  }

  const fullPassword = resolveFullPasswordSecret();
  if (fullPassword && safeEqual(password, fullPassword)) {
    return "full";
  }

  return null;
}

function persistAuthSettings(partial: Partial<AuthSettings>): void {
  const current = readStoredAuthSettings() ?? {};
  writeStoredAuthSettings({
    password: partial.password ?? current.password ?? process.env.APP_PASSWORD ?? undefined,
    updatedAt:
      partial.updatedAt ??
      current.updatedAt ??
      (partial.password ? new Date().toISOString() : undefined),
    colleaguePassword:
      partial.colleaguePassword ?? current.colleaguePassword ?? process.env.APP_PASSWORD_COLLEGUE ?? undefined,
    colleaguePasswordUpdatedAt:
      partial.colleaguePasswordUpdatedAt ??
      current.colleaguePasswordUpdatedAt ??
      (partial.colleaguePassword ? new Date().toISOString() : undefined),
    colleaguePasswordMustChange:
      partial.colleaguePasswordMustChange ?? current.colleaguePasswordMustChange ?? false,
  });
}

export function changePassword(
  edition: AppEdition,
  currentPassword: string,
  nextPassword: string,
): {
  ok: boolean;
  error?: string;
} {
  if (!isAuthConfigured()) {
    return { ok: false, error: "Aucun mot de passe n'est configuré pour le moment." };
  }

  const trimmed = nextPassword.trim();
  if (trimmed.length < 6) {
    return { ok: false, error: "Le nouveau mot de passe doit contenir au moins 6 caractères." };
  }

  if (edition === "collegue") {
    const expected = resolveColleaguePasswordSecret();
    if (!expected || !safeEqual(currentPassword, expected)) {
      return { ok: false, error: "Le mot de passe actuel est incorrect." };
    }

    persistAuthSettings({
      colleaguePassword: trimmed,
      colleaguePasswordUpdatedAt: new Date().toISOString(),
      colleaguePasswordMustChange: false,
    });
    return { ok: true };
  }

  if (!checkPassword(currentPassword)) {
    return { ok: false, error: "Le mot de passe actuel est incorrect." };
  }

  persistAuthSettings({
    password: trimmed,
    updatedAt: new Date().toISOString(),
  });

  return { ok: true };
}

export function createSessionCookieValue(edition: AppEdition): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const payload = `${edition}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

type ParsedSession = {
  edition: AppEdition;
  expiresAt: number;
};

function parseSessionCookie(value: string | undefined | null): ParsedSession | null {
  if (!value) return null;
  const parts = value.split(".");

  if (parts.length === 2) {
    const [expiresAt, signature] = parts;
    if (!Number.isFinite(Number(expiresAt)) || Date.now() > Number(expiresAt)) return null;
    if (!safeEqual(signature, sign(expiresAt))) return null;
    return { edition: "full", expiresAt: Number(expiresAt) };
  }

  if (parts.length !== 3) return null;

  const [rawEdition, expiresAt, signature] = parts;
  const edition: AppEdition = rawEdition === "collegue" ? "collegue" : "full";
  const payload = `${edition}.${expiresAt}`;
  if (!Number.isFinite(Number(expiresAt)) || Date.now() > Number(expiresAt)) return null;
  if (!safeEqual(signature, sign(payload))) return null;
  return { edition, expiresAt: Number(expiresAt) };
}

export function isValidSessionCookie(value: string | undefined | null): boolean {
  return Boolean(parseSessionCookie(value));
}

export function getEditionFromSessionCookie(value: string | undefined | null): AppEdition | null {
  return parseSessionCookie(value)?.edition ?? null;
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

export function buildSessionCookie(request: Request, edition: AppEdition): string {
  const isHttps = new URL(request.url).protocol === "https:";
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  return [
    `${AUTH_COOKIE_NAME}=${createSessionCookieValue(edition)}`,
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
