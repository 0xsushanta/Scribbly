const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");

const defaultHttpBackend = trimTrailingSlash(
  process.env.NEXT_PUBLIC_HTTP_BACKEND ?? "http://localhost:3001",
);
const defaultWsBackend = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WS_BACKEND ?? "ws://localhost:8080",
);

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1"]);

function toApiBase(httpBase: string) {
  return httpBase.endsWith("/api/v1") ? httpBase : `${httpBase}/api/v1`;
}

function inferLocalHttpBackendFromBrowser() {
  if (typeof window === "undefined") {
    return null;
  }

  const { protocol, hostname, port } = window.location;
  if (!LOCAL_HOSTS.has(hostname)) {
    return null;
  }

  const inferredApiPort = port === "3000" ? "3001" : port === "3001" ? "3000" : "3001";
  return `${protocol}//${hostname}:${inferredApiPort}`;
}

export function getHttpBackend() {
  if (process.env.NEXT_PUBLIC_HTTP_BACKEND) {
    return defaultHttpBackend;
  }

  return inferLocalHttpBackendFromBrowser() ?? defaultHttpBackend;
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
