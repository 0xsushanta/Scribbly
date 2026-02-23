# Scribly

Scribly is a collaborative whiteboard app built as a Turborepo monorepo.

It includes:
- `web`: Next.js frontend
- `api`: Express REST API (auth, room creation, chat history)
- `ws`: WebSocket server (realtime shape sync + DB persistence)
- `packages/database`: Prisma + PostgreSQL models
- `packages/common`: shared Zod schemas

## Monorepo Structure

```text
apps/
  web/   # Next.js app
  api/   # Express API
  ws/    # WebSocket server
packages/
  common/
  backend-common/
  database/
```

## Prerequisites

- Node.js `>=18`
- `pnpm@9`
- PostgreSQL database

## 1) Install dependencies

```bash
pnpm install
```

## 2) Environment setup

Create these files:

### `apps/api/.env`

```env
PORT=3001
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/scribly
JWT_SECRET=replace-with-a-strong-secret
CORS_ORIGIN=http://localhost:3000
```

### `apps/ws/.env`

```env
WS_PORT=8080
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/scribly
JWT_SECRET=replace-with-a-strong-secret
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_HTTP_BACKEND=http://localhost:3001
NEXT_PUBLIC_WS_BACKEND=ws://localhost:8080
```

## 3) Run Prisma migrations

From the repo root:

```bash
pnpm --filter @repo/database exec prisma migrate dev
pnpm --filter @repo/database exec prisma generate
```

## 4) Start services (3 terminals)

Terminal 1:

```bash
pnpm --filter api dev
```

Terminal 2:

```bash
pnpm --filter ws dev
```

Terminal 3:

```bash
pnpm --filter web dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 5) Basic flow to verify

1. Sign up (`/signup`)
2. Sign in (`/login`)
3. Go to `/canvas`
4. Create a room or join by room id
5. Open same room in two browser tabs and draw
6. Refresh the room and confirm shapes are loaded from DB

## Useful commands

```bash
# Type-check frontend
pnpm --filter web exec tsc --noEmit

# Build API and WS
pnpm --filter api build
pnpm --filter ws build
```

## Notes

- API base path is `/api/v1`.
- Realtime messages are stored in `Chat.message` as JSON (shape payload).
- Canvas currently supports rectangle and circle tools.
