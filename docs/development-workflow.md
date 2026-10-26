# Development Workflow

> **Status:** conventions for the team. Nothing here is automated beyond the
> optional CI workflow.

## Branch model

- `main` — production-ready; updated only from `dev` via a reviewed PR.
- `dev` — integration branch for completed features.
- `feature/<name>` — one branch per screen, feature, or task.
- `fix/<name>` — bug fixes only.

## Commits

Conventional Commits:

```
feat: add note upload screen scaffold
fix: correct health-check route mount
docs: document Firebase setup
style: apply prettier formatting
test: add backend health test
refactor: extract error handler
```

## Pull requests

- One feature/fix branch → `dev`, reviewed by the other member.
- `dev` → `main` through a reviewed PR.
- Keep screens separated from service/data logic; keep files reasonably small
  (screens ~300 lines, extract components).

## Root scripts

```bash
npm run dev            # mobile + backend together (concurrently)
npm run dev:mobile     # Expo dev server
npm run dev:backend    # Express with --watch
npm run lint           # ESLint both workspaces
npm run format         # Prettier write
npm run format:check   # Prettier check (CI-friendly)
npm test               # Jest both workspaces
npm run test:mobile
npm run test:backend
```

## Ports

| Service | Port | Notes |
| --- | --- | --- |
| Expo/Metro | 8081 | Reuses the port; prompts if busy. |
| Backend | 4000 | Override with `PORT`; change here to avoid conflicts. |

When running `npm run dev`, both start together. If the backend port is taken,
set `PORT` in `apps/backend/.env`.

## CI

`.github/workflows/ci.yml` runs lint and tests on pushes/PRs to `main` and
`dev` (optional/bonus per proposal §24). It uses `.nvmrc` for Node and
non-secret test defaults.

## Definition of done

A task is complete only after integration, peer review, and test evidence —
not merely when a screen or file exists. Mockups, placeholders, and unrun
tests are never reported as complete.

## Release (later)

EAS profiles are defined in `apps/mobile/eas.json` but **no build has been
run**. A signed Android APK and the app icon/feature graphic are produced in a
later phase; keep the keystore outside the repository.
