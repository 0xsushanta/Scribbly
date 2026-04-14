const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const LOCAL_HTTP_FALLBACK = "http://localhost:3001";
const LOCAL_WS_FALLBACK = "ws://localhost:8080";

/**
 * IMPORTANT: Next.js inlines NEXT_PUBLIC_ env vars via static string
 * replacement at build time. You MUST use the literal expression
 * `process.env.NEXT_PUBLIC_XXX` — dynamic access like
 * `process.env[name]` will NOT be replaced and will be `undefined`
 * in the browser.
 */
const RAW_HTTP_BACKEND = process.env.NEXT_PUBLIC_HTTP_BACKEND;
const RAW_WS_BACKEND = process.env.NEXT_PUBLIC_WS_BACKEND;

function resolveEnv(
  rawValue: string | undefined,
  envName: string,
  localFallback: string,
): string {
  if (rawValue?.trim()) {
    return rawValue.trim();
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${envName} is required in production.`);
  }

  return localFallback;
}

function parseAbsoluteUrl(rawValue: string, envName: string) {
  try {
    return new URL(trimTrailingSlash(rawValue));
  } catch {
    throw new Error(`${envName} must be a valid absolute URL. Received: "${rawValue}"`);
  }
}

function normalizeHttpBackend(rawValue: string, envName: string) {
  const parsed = parseAbsoluteUrl(rawValue, envName);
  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    throw new Error(`${envName} must use http:// or https://`);
  }
  return trimTrailingSlash(parsed.toString());
}

function normalizeWsBackend(rawValue: string, envName: string) {
  const parsed = parseAbsoluteUrl(rawValue, envName);
  if (parsed.protocol === "https:") {
    parsed.protocol = "wss:";
  } else if (parsed.protocol === "http:") {
    parsed.protocol = "ws:";
  }

  if (parsed.protocol !== "ws:" && parsed.protocol !== "wss:") {
    throw new Error(`${envName} must use ws://, wss://, http://, or https://`);
  }

  return trimTrailingSlash(parsed.toString());
}

const defaultHttpBackend = normalizeHttpBackend(
  resolveEnv(RAW_HTTP_BACKEND, "NEXT_PUBLIC_HTTP_BACKEND", LOCAL_HTTP_FALLBACK),
  "NEXT_PUBLIC_HTTP_BACKEND",
);

const defaultWsBackend = normalizeWsBackend(
  resolveEnv(RAW_WS_BACKEND, "NEXT_PUBLIC_WS_BACKEND", LOCAL_WS_FALLBACK),
  "NEXT_PUBLIC_WS_BACKEND",
);

function toApiBase(httpBase: string) {
  return httpBase.endsWith("/api/v1") ? httpBase : `${httpBase}/api/v1`;
}

export function getHttpBackend() {
  return defaultHttpBackend;
}

export function getApiBackend() {
  return toApiBase(getHttpBackend());
}

export function getWsBackend() {
  return defaultWsBackend;
}

export const HTTP_BACKEND = defaultHttpBackend;
export const API_BACKEND = toApiBase(defaultHttpBackend);
export const WS_BACKEND = defaultWsBackend;
export const TOKEN_KEY = "scribly_token";
