import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "../../../");

const candidateEnvFiles = [
  process.env.DOTENV_CONFIG_PATH,
  path.resolve(process.cwd(), ".env"),
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(workspaceRoot, ".env"),
  path.resolve(workspaceRoot, "apps/api/.env"),
  path.resolve(workspaceRoot, "apps/ws/.env"),
].filter((file): file is string => Boolean(file));

if (!process.env.JWT_SECRET) {
  for (const envFile of candidateEnvFiles) {
    if (!fs.existsSync(envFile)) {
      continue;
    }

    dotenv.config({ path: envFile });
    if (process.env.JWT_SECRET) {
      break;
    }
  }
}

if (!process.env.JWT_SECRET) {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "JWT_SECRET is missing in environment variables. Add it to .env, apps/api/.env, or apps/ws/.env.",
    );
  }

  process.env.JWT_SECRET = "scribly-dev-jwt-secret";
  console.warn(
    "[backend-common] JWT_SECRET not found in env files; using development fallback secret.",
  );
}

export const JWT_SECRET = process.env.JWT_SECRET;
