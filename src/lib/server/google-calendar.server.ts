import { createHash, randomBytes } from "node:crypto";

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
const oauthStates = new Set<string>();

function config() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ?? "http://localhost:8080/api/calendar/google/callback";
  if (!clientId || !clientSecret) throw new Error("Google Calendar OAuth n'est pas configuré.");
  return { clientId, clientSecret, redirectUri };
}

export function googleCalendarConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function googleCalendarConnected(): boolean {
  return token !== null;
}

export function googleConnectUrl(): string {
  const { clientId, redirectUri } = config();
  const state = randomBytes(24).toString("hex");
  oauthStates.add(state);
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

export async function googleCallback(code: string, state: string): Promise<void> {
  if (!oauthStates.delete(state)) throw new Error("État OAuth Google invalide ou expiré.");
  const { clientId, clientSecret, redirectUri } = config();
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
}

async function accessToken(): Promise<string> {
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
    throw new Error(value.error ?? "Rafraîchissement Google impossible.");
  }
  token = {
    ...token,
    access_token: value.access_token,
    expires_at: Date.now() + (value.expires_in ?? 3600) * 1000,
  };
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
  if (response.status === 401) token = null;
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
