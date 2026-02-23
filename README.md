# Scribly

**Real-time collaborative whiteboard for teams that draw together.** Build, share, and sync drawings instantly with end-to-end persistence—no accounts required (optional auth built in).

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9+-blue)](https://www.typescriptlang.org/)
[![Status](https://img.shields.io/badge/status-active-success)](#status)

## Overview

Scribly is a full-stack collaborative drawing application demonstrating modern web architecture patterns. Multiple users join a shared canvas room, draw in real-time with sub-100ms latency, see each other's cursors, exchange messages, and have all activity persisted to PostgreSQL. The project is structured as a **monorepo** (pnpm + Turborepo) with separate frontend, API, and WebSocket services—a practical reference for building **scalable multi-service applications**.

**What problem does it solve?**

- Demonstrates real-time synchronization across distributed services
- Provides a production-ready monorepo structure for Node.js teams
- Shows how to architect WebSocket + REST API patterns together
- Offers a clean, documented codebase for learning full-stack TypeScript development

## Key Features

- 🎨 **Real-time Drawing Canvas** – Multiple users draw simultaneously with live cursor positions
- 💬 **In-room Messaging** – Chat integrated with drawing sessions
- 🔒 **Authentication** – Sign up / sign in with JWT-based sessions
- 💾 **Persistent History** – All drawings and messages saved to PostgreSQL
- 🚀 **Low-latency Sync** – WebSocket server ensures sub-100ms updates
- 📦 **Monorepo Structure** – Organized with pnpm workspaces and Turborepo orchestration
- 🏗️ **Type-Safe** – Full TypeScript across frontend, backend, and shared packages
- 🎯 **Modern Stack** – Next.js + React, Express, Prisma ORM, PostgreSQL

## Status

**Active Development** — Stable for learning and deployment. Core features complete; contributions welcome for enhancements.

## Prerequisites

- **Node.js** >= 18 (see `package.json` for exact version)
- **pnpm** 9.x ([install guide](https://pnpm.io))
- **PostgreSQL** 12+ (local or cloud)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/0xsushanta/scribly.git
cd scribly
```

### 2. Install dependencies

```bash
pnpm install
```

All packages and workspaces will be installed via pnpm workspaces.

### 3. Configure environment variables

Create the following `.env` files in their respective directories:

**`apps/api/.env`**
```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/scribly
JWT_SECRET=your-secret-key-min-32-chars-recommended
CORS_ORIGIN=http://localhost:3000
```

**`apps/ws/.env`**
```env
WS_PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/scribly
JWT_SECRET=your-secret-key-min-32-chars-recommended
```

**`apps/web/.env.local`**
```env
NEXT_PUBLIC_HTTP_BACKEND=http://localhost:3001
NEXT_PUBLIC_WS_BACKEND=ws://localhost:8080
```

### 4. Set up the database

From the repository root:

```bash
pnpm --filter @repo/database exec prisma migrate dev
pnpm --filter @repo/database exec prisma generate
```

This creates tables for users, rooms, drawings, and messages.

### 5. Start development servers

Run each in a separate terminal:

```bash
# Terminal 1: Frontend (Next.js)
pnpm --filter web dev

# Terminal 2: REST API (Express)
pnpm --filter api dev

# Terminal 3: WebSocket Server
pnpm --filter ws dev
```

Open **http://localhost:3000** in your browser.

Alternatively, use the root dev script if Turbo is configured:
```bash
pnpm dev
```

## Quick Start

### Create and join a room in 2 minutes

1. **Sign up** at http://localhost:3000/signup
2. **Go to canvas** at http://localhost:3000/canvas
3. **Create a new room** or paste a room ID shared by a friend
4. **Invite others** to the same room ID
5. **Start drawing** — changes sync in real-time
6. **Refresh the page** — your drawings persist

## Usage

### Basic Workflows

**Solo drawing (no auth needed):**
- Open `/canvas` and start drawing immediately in a temporary room

**Collaborative drawing (with persistence):**
- Sign up
- Create a named room
- Share the room link with teammates
- All drawings are saved and restored on page reload

**Developer API:**

```bash
# Create a user
curl -X POST http://localhost:3001/api/v1/users/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"securepass"}'

# Create a room
curl -X POST http://localhost:3001/api/v1/rooms \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"name":"TeamBoard"}'

# Get room history
curl http://localhost:3001/api/v1/rooms/{roomId}/history \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

## Configuration

### Environment Variables

| Variable | Service | Description |
|----------|---------|-------------|
| `DATABASE_URL` | API, WS | PostgreSQL connection string |
| `JWT_SECRET` | API, WS | Secret key for signing JWT tokens (min 32 chars) |
| `PORT` | API | REST API server port (default: 3001) |
| `WS_PORT` | WS | WebSocket server port (default: 8080) |
| `CORS_ORIGIN` | API | Allowed CORS origin (default: http://localhost:3000) |
| `NEXT_PUBLIC_HTTP_BACKEND` | Web | HTTP backend API URL |
| `NEXT_PUBLIC_WS_BACKEND` | Web | WebSocket backend URL |

### Database Migrations

To add or modify the database schema:

1. Edit `packages/database/prisma/schema.prisma`
2. Run: `pnpm --filter @repo/database exec prisma migrate dev --name <description>`
3. Check `packages/database/prisma/migrations/<timestamp>_<description>/migration.sql`

## Project Structure

```
scribly/
├── apps/
│   ├── web/                 # Next.js frontend (React + Tailwind)
│   │   ├── app/             # App Router pages (login, signup, canvas)
│   │   ├── components/      # UI components (Canvas, Button, etc.)
│   │   └── draw/            # Canvas drawing utilities
│   ├── api/                 # Express REST API
│   │   ├── src/
│   │   │   ├── controllers/ # Route handlers (auth, rooms, chat)
│   │   │   ├── middlewares/ # Auth, error handling
│   │   │   └── routes/      # API endpoints
│   │   └── dist/            # Compiled JavaScript
│   └── ws/                  # WebSocket server
│       ├── src/
│       │   ├── index.ts     # WS connection & message handling
│       └── dist/            # Compiled JavaScript
├── packages/
│   ├── database/            # Prisma schema & migrations
│   │   ├── prisma/
│   │   │   ├── schema.prisma
│   │   │   └── migrations/
│   │   └── src/
│   ├── common/              # Shared types & utilities
│   ├── backend-common/      # Server utilities (auth, validation)
│   ├── ui/                  # Reusable UI components
│   ├── typescript-config/   # Shared TypeScript configs
│   └── eslint-config/       # Shared ESLint configs
├── package.json             # Root workspace config
├── pnpm-workspace.yaml      # pnpm monorepo declaration
└── turbo.json               # Turborepo pipeline config
```

## Tech Stack Breakdown

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Monorepo** | pnpm + Turborepo | Workspace management & task orchestration |
| **Frontend** | Next.js 16 + React 19 + Tailwind CSS | UI and UX |
| **Backend** | Express + Node.js | REST API server |
| **Realtime** | WebSocket (ws) | Live drawing sync |
| **Database** | PostgreSQL + Prisma ORM | Data persistence |
| **Language** | TypeScript | Type safety across stack |
| **Tooling** | Prettier + TypeScript compiler | Code quality & compilation |

## Available Commands

```bash
# Install dependencies
pnpm install

# Run all dev tasks (Turborepo)
pnpm dev

# Build all packages
pnpm build

# Run type checking
pnpm check-types

# Format code
pnpm format

# Run a single package
pnpm --filter <package-name> <script>

# Example: Run only the web app
pnpm --filter web dev

# View database in Prisma Studio
pnpm --filter @repo/database exec prisma studio
```

## Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes and test locally
4. Commit with clear messages: `git commit -m "feat: add new feature"`
5. Push and open a Pull Request

### Code Standards

- **TypeScript** only — no untyped code
- **Prettier** formatting: `pnpm format`
- **ESLint**: ensure no lint errors before opening a PR
- **Tests**: add unit tests for new features where applicable
- **Commit messages**: use [Conventional Commits](https://www.conventionalcommits.org/)

### Workflow

- Fork → Feature Branch → Test Locally → Commit → Push → Open PR
- PRs should target `main` branch
- Code review required before merge
- Ensure the build passes (`pnpm build`, `pnpm check-types`)

## Roadmap

### Current
- ✅ Real-time drawing with WebSocket sync
- ✅ User authentication (signup/signin)
- ✅ Room/board management
- ✅ Drawing & message persistence
- ✅ Monorepo structure with Turborepo

## Acknowledgements

- Inspired by [Figma](https://figma.com), [Excalidraw](https://excalidraw.com), and [Miro](https://miro.com)
- Built with [Next.js](https://nextjs.org), [Express](https://expressjs.com), [Prisma](https://www.prisma.io), and [ws](https://github.com/websockets/ws)
- Monorepo structure follows patterns from [Vercel's AI SDK](https://github.com/vercel/ai) and [tRPC](https://trpc.io)
- Typescript configuration inspired by [Create T3 App](https://create.t3.gg)

---

**Questions?** Open an issue on [GitHub](https://github.com/0xsushanta/scribly/issues) or start a discussion.

**Want to learn more?** See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and [ARCHITECTURE.md](ARCHITECTURE.md) for design decisions.
