import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import { getServerSupabaseClient } from "@/lib/server/supabase.server";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API_URL = "https://www.googleapis.com/calendar/v3";
const CALENDAR_SCOPE =
  "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.calendarlist.readonly";

type GoogleToken = {
  access_token: string;
  refresh_token?: string;
  expires_in?: number;
  expires_at: number;
};

type StoredGoogleToken = {
  version: 1;
  iv: string;
  tag: string;
  data: string;
  savedAt: string;
};

export type CalendarEvent = {
  id: string;
  summary: string;
  description?: string;
  location?: string;
  start: { date?: string; dateTime?: string; timeZone?: string };
  end: { date?: string; dateTime?: string; timeZone?: string };
  htmlLink?: string;
};

export type CalendarCreateInput = {
  sourceMailId?: string;
  summary: string;
  description?: string;
  location?: string;
  start?: string;
  end?: string;
  date?: string;
  time?: string | null;
  timeZone?: string;
};

let token: GoogleToken | null = null;
let tokenHydrationAttempted = false;
const GOOGLE_TOKEN_ROW_ID = "ardoise-google-calendar";
const GOOGLE_TOKEN_SCOPE = "google-calendar-token";
const GOOGLE_OAUTH_STATE_TTL_MS = 15 * 60_000;

function fallbackRedirectUri(requestUrl?: string): string {
  if (requestUrl) {
    return new URL("/api/calendar/google/callback", requestUrl).toString();
  }
  return "http://localhost:8080/api/calendar/google/callback";
}

function config(requestUrl?: string) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim() || fallbackRedirectUri(requestUrl);
  if (!clientId || !clientSecret) throw new Error("Google Calendar OAuth n'est pas configuré.");
  return { clientId, clientSecret, redirectUri };
}

export function googleCalendarConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleCalendarConnected(): boolean {
  return token !== null;
}

export async function googleCalendarConnectedStatus(): Promise<boolean> {
  await hydrateTokenFromCloud();
  return token !== null;
}

function encryptionSecret(): string | null {
  return process.env.GOOGLE_TOKEN_ENCRYPTION_SECRET?.trim() || process.env.APP_PASSWORD?.trim() || null;
}

function oauthStateSecret(): string {
  return (
    process.env.GOOGLE_OAUTH_STATE_SECRET?.trim() ||
    encryptionSecret() ||
    process.env.GOOGLE_CLIENT_SECRET?.trim() ||
    "ardoise-google-oauth"
  );
}

function encryptionKey(): Buffer | null {
  const secret = encryptionSecret();
  if (!secret) return null;
  return createHash("sha256").update(secret).digest();
}

function encryptToken(value: GoogleToken): StoredGoogleToken | null {
  const key = encryptionKey();
  if (!key) return null;
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const payload = Buffer.concat([
    cipher.update(JSON.stringify(value), "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return {
    version: 1,
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    data: payload.toString("base64"),
    savedAt: new Date().toISOString(),
  };
}

function decryptToken(value: unknown): GoogleToken | null {
  const key = encryptionKey();
  if (!key || !value || typeof value !== "object") return null;
  const payload = value as Partial<StoredGoogleToken>;
  if (!payload.iv || !payload.tag || !payload.data) return null;

  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      key,
      Buffer.from(payload.iv, "base64"),
    );
    decipher.setAuthTag(Buffer.from(payload.tag, "base64"));
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(payload.data, "base64")),
      decipher.final(),
    ]).toString("utf8");
    const parsed = JSON.parse(decrypted) as Partial<GoogleToken>;
    if (!parsed.access_token || typeof parsed.expires_at !== "number") return null;
    return {
      access_token: parsed.access_token,
      refresh_token: parsed.refresh_token,
      expires_in: parsed.expires_in,
      expires_at: parsed.expires_at,
    };
  } catch (error) {
    console.error("Impossible de déchiffrer le jeton Google Calendar.", error);
    return null;
  }
}

async function persistToken(nextToken: GoogleToken | null): Promise<void> {
  const client = getServerSupabaseClient();
  if (!client) return;
  if (!encryptionSecret()) return;

  if (!nextToken) {
    const { error } = await client.from("app_snapshots").upsert(
      {
        id: GOOGLE_TOKEN_ROW_ID,
        scope: GOOGLE_TOKEN_SCOPE,
        payload: {
          version: 1,
          disabled: true,
          savedAt: new Date().toISOString(),
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) {
      console.error(
        "Impossible de marquer la connexion Google Calendar comme déconnectée dans Supabase.",
        error,
      );
    }
    return;
  }

  const encrypted = encryptToken(nextToken);
  if (!encrypted) return;

  const { error } = await client.from("app_snapshots").upsert(
    {
      id: GOOGLE_TOKEN_ROW_ID,
      scope: GOOGLE_TOKEN_SCOPE,
      payload: encrypted,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "id" },
  );

  if (error) {
    console.error("Impossible de sauvegarder le jeton Google Calendar dans Supabase.", error);
  }
}

async function hydrateTokenFromCloud(): Promise<void> {
  if (tokenHydrationAttempted || token) return;
  tokenHydrationAttempted = true;

  const client = getServerSupabaseClient();
  if (!client) return;
  if (!encryptionSecret()) return;

  const { data, error } = await client
    .from("app_snapshots")
    .select("payload")
    .eq("id", GOOGLE_TOKEN_ROW_ID)
    .maybeSingle();

  if (error) {
    console.error("Impossible de relire le jeton Google Calendar depuis Supabase.", error);
    return;
  }

  const restored = decryptToken(data?.payload);
  if (restored) token = restored;
}

function signOauthState(timestamp: string, nonce: string): string {
  return createHmac("sha256", oauthStateSecret())
    .update(`${timestamp}.${nonce}`)
    .digest("hex");
}

function createOauthState(): string {
  const timestamp = Date.now().toString();
  const nonce = randomBytes(16).toString("hex");
  const signature = signOauthState(timestamp, nonce);
  return Buffer.from(`${timestamp}.${nonce}.${signature}`, "utf8").toString("base64url");
}

function verifyOauthState(state: string): boolean {
  try {
    const decoded = Buffer.from(state, "base64url").toString("utf8");
    const [timestamp, nonce, signature] = decoded.split(".");
    if (!timestamp || !nonce || !signature) return false;

    const issuedAt = Number(timestamp);
    if (!Number.isFinite(issuedAt)) return false;
    if (Math.abs(Date.now() - issuedAt) > GOOGLE_OAUTH_STATE_TTL_MS) return false;

    const expected = signOauthState(timestamp, nonce);
    const providedBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    if (providedBuffer.length !== expectedBuffer.length) return false;

    return timingSafeEqual(providedBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

export function googleConnectUrl(requestUrl?: string): string {
  const { clientId, redirectUri } = config(requestUrl);
  const state = createOauthState();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
    scope: CALENDAR_SCOPE,
    state,
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function googleCallback(
  code: string,
  state: string,
  requestUrl?: string,
): Promise<void> {
  if (!verifyOauthState(state)) throw new Error("État OAuth Google invalide ou expiré.");
  const { clientId, clientSecret, redirectUri } = config(requestUrl);
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });
  const value = (await response.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!response.ok || !value.access_token)
    throw new Error(value.error ?? "Connexion Google impossible.");
  token = {
    access_token: value.access_token,
    refresh_token: value.refresh_token,
    expires_in: value.expires_in,
    expires_at: Date.now() + (value.expires_in ?? 3600) * 1000,
  };
  await persistToken(token);
}

async function accessToken(): Promise<string> {
  await hydrateTokenFromCloud();
  if (!token) throw new Error("Google Calendar n'est pas connecté.");
  if (token.expires_at > Date.now() + 60_000) return token.access_token;
  if (!token.refresh_token)
    throw new Error("La session Google a expiré. Reconnecte Google Calendar.");

  const { clientId, clientSecret } = config();
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: token.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const value = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
  };
  if (!response.ok || !value.access_token) {
    token = null;
    await persistToken(null);
    throw new Error(value.error ?? "Rafraîchissement Google impossible.");
  }
  token = {
    ...token,
    access_token: value.access_token,
    expires_at: Date.now() + (value.expires_in ?? 3600) * 1000,
  };
  await persistToken(token);
  return token.access_token;
}

async function calendarFetch(path: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(`${CALENDAR_API_URL}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${await accessToken()}`,
      "content-type": "application/json",
      ...init?.headers,
    },
  });
  if (response.status === 401) {
    token = null;
    await persistToken(null);
  }
  return response;
}

export async function listGoogleEvents(timeMin: string, timeMax: string): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    timeMin,
    timeMax,
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "250",
  });
  const response = await calendarFetch(`/calendars/primary/events?${params.toString()}`);
  const value = (await response.json()) as {
    items?: CalendarEvent[];
    error?: { message?: string };
  };
  if (!response.ok)
    throw new Error(value.error?.message ?? "Lecture de Google Calendar impossible.");
  return value.items ?? [];
}

function googleEventId(sourceMailId: string | undefined): string | undefined {
  return sourceMailId
    ? createHash("sha256").update(sourceMailId).digest("hex").slice(0, 32)
    : undefined;
}

export async function createGoogleEvent(input: CalendarCreateInput): Promise<CalendarEvent> {
  const timeZone = input.timeZone ?? "Europe/Paris";
  const isAllDay = Boolean(input.date && !input.time);
  const startDate = input.date;
  const start = isAllDay
    ? { date: startDate }
    : { dateTime: input.start ?? `${startDate}T${input.time ?? "09:00"}:00`, timeZone };
  const end = isAllDay
    ? { date: nextDate(startDate ?? new Date().toISOString().slice(0, 10)) }
    : { dateTime: input.end ?? `${startDate}T${input.time ?? "10:00"}:00`, timeZone };

  const body = {
    id: googleEventId(input.sourceMailId),
    summary: input.summary,
    description: input.description,
    location: input.location,
    start,
    end,
    extendedProperties: input.sourceMailId
      ? { private: { ardoiseSourceMailId: input.sourceMailId } }
      : undefined,
  };
  const response = await calendarFetch("/calendars/primary/events", {
    method: "POST",
    body: JSON.stringify(body),
  });
  const value = (await response.json()) as CalendarEvent & { error?: { message?: string } };
  if (response.status === 409 && input.sourceMailId) {
    const existing = await listGoogleEvents("2000-01-01T00:00:00Z", "2100-01-01T00:00:00Z");
    const match = existing.find((event) => event.id === googleEventId(input.sourceMailId));
    if (match) return match;
  }
  if (!response.ok) throw new Error(value.error?.message ?? "Création de l’événement impossible.");
  return value;
}

function nextDate(date: string): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + 1);
  return value.toISOString().slice(0, 10);
}
