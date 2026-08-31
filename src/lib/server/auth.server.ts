import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { AppEdition } from "@/lib/app-edition";
import { getServerSupabaseClient } from "@/lib/server/supabase.server";

export const AUTH_COOKIE_NAME = "ardoise_auth";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 jours
const AUTH_SETTINGS_PATH = join(process.cwd(), ".data", "auth-settings.json");
export type ColleagueClassroom = "durand" | "grimal" | "menager" | "thomas-henry";

export type LoginAccess = {
  edition: AppEdition;
  classroom?: ColleagueClassroom;
  mustChangePassword: boolean;
};

type AuthSettings = {
  password?: string;
  updatedAt?: string;
  colleaguePassword?: string;
  colleaguePasswordUpdatedAt?: string;
  colleaguePasswordMustChange?: boolean;
  colleagueClassroom?: ColleagueClassroom;
};

type ColleagueCredential = {
  passwordHash: string;
  updatedAt: string;
  mustChangePassword: boolean;
};

type CloudCredentials = {
  version: 1;
  colleagues: Partial<Record<ColleagueClassroom, ColleagueCredential>>;
};

const CLOUD_CREDENTIALS_ID = "ardoise-colleague-credentials";
const CLOUD_CREDENTIALS_SCOPE = "auth-colleague-credentials";

function hashPassword(password: string): string {
  return createHash("sha256").update(`ardoise-auth-v1:${password}`).digest("hex");
}

function passwordMatchesHash(password: string, hash: string): boolean {
  return safeEqual(hashPassword(password), hash);
}

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

function normalizeColleagueClassroom(
  raw: string | null | undefined,
): ColleagueClassroom | null {
  if (!raw) return null;
  const cleaned = raw.trim().toLowerCase();
  if (cleaned === "durand") return "durand";
  if (cleaned === "grimal") return "grimal";
  if (cleaned === "menager") return "menager";
  if (cleaned === "thomas-henry" || cleaned === "thomas_henry") return "thomas-henry";
  return null;
}

export function resolveColleagueClassroom(): ColleagueClassroom {
  const stored = normalizeColleagueClassroom(readStoredAuthSettings()?.colleagueClassroom);
  if (stored) return stored;

  const envClassroom = normalizeColleagueClassroom(
    process.env.ARDOISE_COLLEAGUE_CLASSROOM ?? process.env.VITE_ARDOISE_COLLEAGUE_CLASSROOM,
  );
  return envClassroom ?? "durand";
}

function getSessionSecret(): string {
  return (
    resolveFullPasswordSecret() ||
    resolveColleaguePasswordSecret() ||
    process.env.APP_PASSWORD_MENAGER ||
    process.env.APP_PASSWORD_THOMAS_HENRY ||
    ""
  );
}

function sign(payload: string): string {
  const secret = getSessionSecret();
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function isAuthConfigured(): boolean {
  return Boolean(getSessionSecret());
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
      colleagueClassroom: normalizeColleagueClassroom(parsed.colleagueClassroom),
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

async function loadCloudCredentials(): Promise<CloudCredentials> {
  const client = getServerSupabaseClient();
  if (!client) return { version: 1, colleagues: {} };

  try {
    const { data, error } = await client
      .from("app_snapshots")
      .select("payload")
      .eq("id", CLOUD_CREDENTIALS_ID)
      .maybeSingle();
    if (error || !data?.payload || typeof data.payload !== "object") {
      return { version: 1, colleagues: {} };
    }

    const value = data.payload as Partial<CloudCredentials>;
    return value.version === 1 && value.colleagues && typeof value.colleagues === "object"
      ? { version: 1, colleagues: value.colleagues }
      : { version: 1, colleagues: {} };
  } catch {
    return { version: 1, colleagues: {} };
  }
}

async function saveCloudCredentials(credentials: CloudCredentials): Promise<void> {
  const client = getServerSupabaseClient();
  if (!client) throw new Error("La sauvegarde cloud des accès n'est pas disponible.");

  const { error } = await client.from("app_snapshots").upsert(
    {
      id: CLOUD_CREDENTIALS_ID,
      scope: CLOUD_CREDENTIALS_SCOPE,
      payload: credentials,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );
  if (error) throw new Error(error.message);
}

function colleagueEnvironmentPassword(classroom: ColleagueClassroom): string {
  if (classroom === "menager") return process.env.APP_PASSWORD_MENAGER ?? "";
  if (classroom === "thomas-henry") return process.env.APP_PASSWORD_THOMAS_HENRY ?? "";
  return "";
}

export async function getLoginAccess(
  password: string,
  requestedClassroom?: ColleagueClassroom | null,
): Promise<LoginAccess | null> {
  const fullPassword = resolveFullPasswordSecret();
  if (fullPassword && safeEqual(password, fullPassword)) {
    return { edition: "full", mustChangePassword: false };
  }

  // Des mots de passe collègue distincts suffisent à ouvrir automatiquement la bonne classe.
  // Le choix d'espace reste donc optionnel sur l'écran de connexion.
  if (!requestedClassroom) {
    const credentials = await loadCloudCredentials();
    for (const classroom of ["menager", "thomas-henry"] as const) {
      const savedCredential = credentials.colleagues[classroom];
      if (savedCredential && passwordMatchesHash(password, savedCredential.passwordHash)) {
        return {
          edition: "collegue",
          classroom,
          mustChangePassword: savedCredential.mustChangePassword,
        };
      }

      const starterPassword = colleagueEnvironmentPassword(classroom);
      if (starterPassword && safeEqual(password, starterPassword)) {
        return { edition: "collegue", classroom, mustChangePassword: true };
      }
    }
  }

  if (requestedClassroom === "menager" || requestedClassroom === "thomas-henry") {
    const credentials = await loadCloudCredentials();
    const savedCredential = credentials.colleagues[requestedClassroom];
    if (savedCredential && passwordMatchesHash(password, savedCredential.passwordHash)) {
      return {
        edition: "collegue",
        classroom: requestedClassroom,
        mustChangePassword: savedCredential.mustChangePassword,
      };
    }

    const starterPassword = colleagueEnvironmentPassword(requestedClassroom);
    if (starterPassword && safeEqual(password, starterPassword)) {
      return { edition: "collegue", classroom: requestedClassroom, mustChangePassword: true };
    }

    return null;
  }

  const colleaguePassword = resolveColleaguePasswordSecret();
  if (colleaguePassword && safeEqual(password, colleaguePassword)) {
    return {
      edition: "collegue",
      classroom: resolveColleagueClassroom(),
      mustChangePassword: colleaguePasswordNeedsReset(),
    };
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
    colleagueClassroom:
      partial.colleagueClassroom ??
      current.colleagueClassroom ??
      normalizeColleagueClassroom(
        process.env.ARDOISE_COLLEAGUE_CLASSROOM ?? process.env.VITE_ARDOISE_COLLEAGUE_CLASSROOM,
      ) ??
      "durand",
  });
}

export async function changePassword(
  edition: AppEdition,
  classroom: ColleagueClassroom | null,
  currentPassword: string,
  nextPassword: string,
): Promise<{
  ok: boolean;
  error?: string;
}> {
  if (!isAuthConfigured()) {
    return { ok: false, error: "Aucun mot de passe n'est configuré pour le moment." };
  }

  const trimmed = nextPassword.trim();
  if (trimmed.length < 6) {
    return { ok: false, error: "Le nouveau mot de passe doit contenir au moins 6 caractères." };
  }

  if (edition === "collegue") {
    if (classroom === "menager" || classroom === "thomas-henry") {
      const credentials = await loadCloudCredentials();
      const savedCredential = credentials.colleagues[classroom];
      const isCurrentPasswordValid = savedCredential
        ? passwordMatchesHash(currentPassword, savedCredential.passwordHash)
        : safeEqual(currentPassword, colleagueEnvironmentPassword(classroom));
      if (!isCurrentPasswordValid) {
        return { ok: false, error: "Le mot de passe actuel est incorrect." };
      }

      try {
        await saveCloudCredentials({
          version: 1,
          colleagues: {
            ...credentials.colleagues,
            [classroom]: {
              passwordHash: hashPassword(trimmed),
              updatedAt: new Date().toISOString(),
              mustChangePassword: false,
            },
          },
        });
        return { ok: true };
      } catch (error) {
        return {
          ok: false,
          error:
            error instanceof Error
              ? `Impossible d'enregistrer le nouveau mot de passe : ${error.message}`
              : "Impossible d'enregistrer le nouveau mot de passe.",
        };
      }
    }

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

export function createSessionCookieValue(edition: AppEdition, classroom?: ColleagueClassroom): string {
  const expiresAt = String(Date.now() + SESSION_TTL_MS);
  const payload = `${edition}.${classroom ?? ""}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

type ParsedSession = {
  edition: AppEdition;
  classroom?: ColleagueClassroom;
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

  if (parts.length === 3) {
    const [rawEdition, expiresAt, signature] = parts;
    const edition: AppEdition = rawEdition === "collegue" ? "collegue" : "full";
    const payload = `${edition}.${expiresAt}`;
    if (!Number.isFinite(Number(expiresAt)) || Date.now() > Number(expiresAt)) return null;
    if (!safeEqual(signature, sign(payload))) return null;
    return { edition, expiresAt: Number(expiresAt) };
  }

  if (parts.length !== 4) return null;

  const [rawEdition, rawClassroom, expiresAt, signature] = parts;
  const edition: AppEdition = rawEdition === "collegue" ? "collegue" : "full";
  const classroom = normalizeColleagueClassroom(rawClassroom);
  const payload = `${edition}.${rawClassroom}.${expiresAt}`;
  if (!Number.isFinite(Number(expiresAt)) || Date.now() > Number(expiresAt)) return null;
  if (!safeEqual(signature, sign(payload))) return null;
  return { edition, classroom: edition === "collegue" ? classroom ?? undefined : undefined, expiresAt: Number(expiresAt) };
}

export function isValidSessionCookie(value: string | undefined | null): boolean {
  return Boolean(parseSessionCookie(value));
}

export function getEditionFromSessionCookie(value: string | undefined | null): AppEdition | null {
  return parseSessionCookie(value)?.edition ?? null;
}

export function getClassroomFromSessionCookie(
  value: string | undefined | null,
): ColleagueClassroom | null {
  return parseSessionCookie(value)?.classroom ?? null;
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

export function buildSessionCookie(
  request: Request,
  edition: AppEdition,
  classroom?: ColleagueClassroom,
): string {
  const isHttps = new URL(request.url).protocol === "https:";
  const maxAgeSeconds = Math.floor(SESSION_TTL_MS / 1000);
  return [
    `${AUTH_COOKIE_NAME}=${createSessionCookieValue(edition, classroom)}`,
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
