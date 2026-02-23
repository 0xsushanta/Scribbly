# Contributing to Scribly

Thank you for your interest in contributing to Scribly! We welcome contributions from developers at all skill levels. Whether you're fixing bugs, adding features, improving documentation, or suggesting ideas, your help makes Scribly better for everyone.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. By participating in this project, you agree to:

- Be respectful and inclusive in all interactions
- Welcome diverse perspectives and backgrounds
- Give credit where credit is due
- Focus on constructive feedback
- Report inappropriate behavior to maintainers

Please read our full [Code of Conduct](CODE_OF_CONDUCT.md) for details.

## How to Get Started

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** >= 18 ([download](https://nodejs.org))
- **pnpm** 9.x (`npm install -g pnpm`)
- **PostgreSQL** 12+ ([download](https://www.postgresql.org/download/) or use [Docker](https://docs.docker.com/))
- **Git** ([download](https://git-scm.com/downloads))

You'll also need a GitHub account. If you're new to Git, check out [GitHub's Git handbook](https://guides.github.com/).

### Fork the Repository

1. Navigate to [Scribly on GitHub](https://github.com/0xsushanta/scribly)
2. Click the **Fork** button in the top-right corner
3. This creates a copy of the repo under your GitHub account

### Clone Your Fork Locally

```bash
# Replace <your-username> with your GitHub username
git clone https://github.com/<your-username>/scribly.git
cd scribly

# Add upstream remote to sync with original repo
git remote add upstream https://github.com/0xsushanta/scribly.git
```

Verify your remotes:
```bash
git remote -v
# origin    https://github.com/<your-username>/scribly.git (fetch)
# origin    https://github.com/<your-username>/scribly.git (push)
# upstream  https://github.com/0xsushanta/scribly.git (fetch)
# upstream  https://github.com/0xsushanta/scribly.git (push)
```

## Development Setup

### 1. Install Dependencies

From the repository root:

```bash
pnpm install
```

This installs all dependencies for the monorepo and all workspace packages.

### 2. Configure PostgreSQL

Set up a local PostgreSQL database:

```bash
# Using psql (command line)
createdb scribly

# Or use Docker
docker run --name scribly-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:latest
```

Then create a `.env` file in the root (or see step 3 in [README.md](README.md) for per-app setup).

### 3. Run Database Migrations

```bash
pnpm --filter @repo/database exec prisma migrate dev
pnpm --filter @repo/database exec prisma generate
```

This creates tables and syncs your local database with the schema.

### 4. Start the Development Servers

Run each service in a separate terminal:

```bash
# Terminal 1: Frontend (Next.js on port 3000)
pnpm --filter web dev

# Terminal 2: REST API (Express on port 3001)
pnpm --filter api dev

# Terminal 3: WebSocket Server (on port 8080)
pnpm --filter ws dev
```

You should now see the app at http://localhost:3000

### 5. Verify Everything Works

- Open http://localhost:3000
- Sign up and create an account
- Try drawing in a canvas room
- Refresh the page—your drawings should persist
- Open the room in a different tab—changes should sync in real-time

## Making Contributions

### Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your fork with the latest upstream changes
git fetch upstream main
git rebase upstream/main

# Create a descriptive branch name
git checkout -b feat/add-shape-tools
# or
git checkout -b fix/drawing-sync-lag
# or
git checkout -b docs/improve-api-docs
```

Branch naming conventions:
- `feat/` — new features
- `fix/` — bug fixes
- `docs/` — documentation improvements
- `refactor/` — code improvements without changing behavior
- `test/` — test additions or fixes
- `chore/` — build, tooling, dependencies

### Coding Standards

#### TypeScript

We enforce strict TypeScript across the project:

- **No `any` types** — use proper types or generics
- **Strict mode enabled** — all types must be properly typed
- **No untyped imports** — explicitly import types

```typescript
// ✅ Good
interface UserPayload {
  email: string;
  password: string;
}

function createUser(payload: UserPayload): Promise<User> {
  // implementation
}

// ❌ Avoid
function createUser(payload: any): any {
  // implementation
}
```

#### Code Style

We use **Prettier** for consistent formatting:

```bash
# Format your changes before committing
pnpm format

# Or format specific files
pnpm format apps/api/src/controllers/auth.ts
```

#### ESLint

Run linting to catch issues:

```bash
pnpm lint

# Or lint a specific package
pnpm --filter api run lint
```

#### Naming Conventions

- **Files**: Use `camelCase` for TypeScript files (`userController.ts`)
- **React components**: Use `PascalCase` (`RoomCanvas.tsx`)
- **Constants**: Use `UPPER_SNAKE_CASE` (`MAX_DRAWING_SIZE`)
- **Variables/functions**: Use `camelCase` (`createRoom`, `userEmail`)

#### Comments & Documentation

Add JSDoc comments for public functions:

```typescript
/**
 * Fetches a room and its drawing history
 * @param roomId - The unique room identifier
 * @returns - Promise resolving to room data with drawings
 * @throws - Error if room not found (404)
 */
export async function getRoom(roomId: string): Promise<RoomData> {
  // implementation
}
```

### Commit Message Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` — a new feature
- `fix` — a bug fix
- `docs` — documentation changes
- `style` — code style changes (formatting, semicolons, etc.)
- `refactor` — code refactoring
- `perf` — performance improvements
- `test` — test additions or updates
- `chore` — dependency updates, build changes, etc.

**Scope** (optional): Which part of the codebase (`api`, `web`, `ws`, `database`)

**Subject:**
- Use imperative mood ("add feature" not "added feature")
- Don't capitalize first letter
- No period at the end
- Max 50 characters

**Body** (optional):
- Wrap at 72 characters
- Explain *what* and *why*, not *how*
- Reference any related issues

**Examples:**

```
feat(ws): add cursor position sync for multiple users

Users can now see other participants' cursor positions in real-time
as they draw. This improves the collaborative experience.

Implements WebSocket message type and client-side cursor tracking.

Fixes #42
```

```
fix(api): handle missing JWT secret gracefully

Previously, the API would crash if JWT_SECRET env var was missing.
Now it logs a clear error and exits with code 1.
```

```
docs: update quick start guide with Docker instructions
```

## Submitting Changes

### Push Your Branch

```bash
git push origin feat/add-shape-tools
```

### Open a Pull Request

1. Go to your fork on GitHub: `https://github.com/<your-username>/scribly`
2. Click **Pull Requests** → **New Pull Request**
3. Set:
   - **Base repository**: `0xsushanta/scribly` (base: `main`)
   - **Head repository**: `<your-username>/scribly` (compare: your branch)
4. Click **Create Pull Request**

### PR Description Template

Please include:

**What does this PR do?**
Brief description of the changes.

**Why?**
Explain the problem it solves or the value it adds.

**How to test?**
Steps to verify the changes work correctly.

**Checklist:**
- [ ] I've tested these changes locally
- [ ] I've run `pnpm format` and `pnpm check-types`
- [ ] I've added tests for new features (if applicable)
- [ ] I've updated documentation (if applicable)
- [ ] Commit messages follow Conventional Commits
- [ ] No breaking changes (or clearly documented if there are)

**Related Issues:**
Closes #123

**screenshots (if applicable):**
For UI changes, please include before/after screenshots.

### PR Review Process

- A maintainer will review your PR
- Feedback may be requested—this is normal and helps improve the code
- Once approved, your PR will be merged
- Your contribution will be included in the next release

## Reporting Issues

### Reporting Bugs

Use the [Bug Report](https://github.com/0xsushanta/scribly/issues/new?template=bug_report.md) template:

**Describe the bug:**
Clear description of what went wrong.

**Steps to reproduce:**
1. Go to '...'
2. Click on '...'
3. See the error

**Expected behavior:**
What should happen.

**Actual behavior:**
What actually happened.

**Environment:**
- OS: macOS 14, Ubuntu 22.04, Windows 11
- Node version: 18.x, 20.x
- Browser: Chrome, Firefox, Safari

**Logs or screenshots:**
Include error messages, stack traces, or screenshots.

### Suggesting Features

Use the [Feature Request](https://github.com/0xsushanta/scribly/issues/new?template=feature_request.md) template:

**Is this related to a problem?**
Describe the use case or limitation.

**Proposed solution:**
Your idea for solving it.

**Alternatives considered:**
Other approaches and why they didn't work.

**Additional context:**
Links, examples, or sketches.

## Community & Support

### Ask Questions

- **GitHub Discussions**: [Scribly Discussions](https://github.com/0xsushanta/scribly/discussions)
- **Issues**: Open a question-labeled issue
- **Reach out**: Contact maintainers directly if needed

### Getting Help

**Stuck on development setup?**
- Check [README.md](README.md) and this guide
- Search existing issues for similar problems
- Create a new issue with the `help wanted` label

**Need architectural guidance?**
- See [ARCHITECTURE.md](ARCHITECTURE.md) (if available)
- Open a discussion in the community forum
- Ask in a GitHub issue

**Have ideas for improvements?**
- Open a discussion to gauge interest
- File a feature request issue
- Contribute your own solution!

### Maintenance & Response Times

We aim to:
- Respond to issues within 7 days
- Review PRs within 10 days
- Release updates monthly (roughly)

Timelines may vary based on complexity and maintainer availability.

## Performance Considerations

When contributing, keep these in mind:

### WebSocket Performance
- Test drawing sync with multiple concurrent users
- Keep message payloads small
- Avoid excessive re-renders in the canvas component

### Database Performance
- Use indexes for frequently queried fields
- Test migrations with realistic data volumes
- Consider N+1 query problems

### Frontend Performance
- Minimize bundle size impacts
- Avoid blocking the main thread
- Test on low-end devices/slow networks

## Security

If you discover a security vulnerability, **do not** open a public issue. Instead:

1. Email security details to the project maintainers
2. Include steps to reproduce and impact assessment
3. Allow time for a fix before public disclosure
4. We'll credit you when the fix is released

## License

By contributing to Scribly, you agree that your contributions will be licensed under the [MIT License](LICENSE).

## Thank You! 🎉

Every contribution counts—whether it's code, documentation, bug reports, or feature ideas. Thank you for being part of the Scribly community.

Have fun building! 🚀
