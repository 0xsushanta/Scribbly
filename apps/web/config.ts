const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const rawHttpBackend = trimTrailingSlash(
  process.env.NEXT_PUBLIC_HTTP_BACKEND ?? "http://localhost:3001",
);
const rawWsBackend = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WS_BACKEND ?? "ws://localhost:8080",
);

export const HTTP_BACKEND = rawHttpBackend;
export const API_BACKEND = rawHttpBackend.endsWith("/api/v1")
  ? rawHttpBackend
  : `${rawHttpBackend}/api/v1`;
export const WS_BACKEND = rawWsBackend;
export const TOKEN_KEY = "scribly_token";
