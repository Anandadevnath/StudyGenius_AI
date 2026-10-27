# StudyGenius AI – Agent Instructions

These rules are loaded into the system prompt for every conversation. Follow them on every task.

## 1. Project Overview

- **StudyGenius AI** is an AI-powered study app.
- Monorepo layout:
  - `apps/mobile` – Expo / React Native app (also runs on web)
  - `apps/backend` (or `server/`) – API and AI endpoints
  - `packages/*` – shared code (types, utils, API client), if present
- Primary stack: TypeScript, React Native (Expo), Node.js backend.
- Always check the existing code and `package.json` before assuming a library or pattern.

## 2. How You Work

1. **Read before writing.** Inspect related files, types, and existing patterns before making changes.
2. **Plan briefly** for anything touching more than 2 files: state the plan in 3–5 lines, then execute.
3. **Make minimal, focused changes.** Don't refactor unrelated code or rename things without being asked.
4. **Ask only when blocked.** If a requirement is ambiguous, make a reasonable assumption, state it in one line, and continue.
5. **Never invent** APIs, env vars, endpoints, or package names. Verify they exist first.

## 3. Code Standards

- Use **TypeScript** everywhere. No `any` unless unavoidable (add a comment explaining why).
- Prefer **functional components and hooks**. No class components.
- Keep components small; extract reusable UI into shared components.
- Follow the existing folder structure, naming, and import style.
  - Components: `PascalCase.tsx`
  - Hooks: `useSomething.ts`
  - Utilities: `camelCase.ts`
- Handle **loading, error, and empty states** for every screen and API call.
- No hardcoded secrets, URLs, or API keys. Use environment variables.
- No leftover `console.log`, commented-out code, or unused imports.

## 4. Mobile / UI (Expo + React Native)

- Must work on **iOS, Android, and Web**. Avoid platform-specific APIs without a fallback (`Platform.OS` checks).
- Use the existing theme, colors, spacing, and typography. Don't introduce new styles ad hoc.
- Use toasts for feedback (success/error) and confirmation dialogs for destructive actions (e.g. sign out, delete).
- Keep navigation flows consistent: auth screens → home dashboard → profile/settings.
- Ensure keyboard handling, safe areas, and scrolling work on small screens.
- Known harmless warning on web: `useNativeDriver is not supported` – ignore it.

## 5. Backend / AI Endpoints

- Validate all request input (schema validation) and return consistent JSON error shapes.
- Never expose API keys or provider details to the client.
- Wrap AI provider calls with:
  - timeouts
  - try/catch with meaningful errors
  - rate-limit / retry handling where appropriate
- Keep prompts in dedicated files/constants, not inline in route handlers.
- Stream or paginate long responses when possible.
- Authenticate protected routes and check user ownership of data.

## 6. Testing & Quality

Before saying a task is done, always:

1. Run **lint** and fix all errors.
2. Run the **test suite** and make sure everything passes.
3. Add or update tests for new logic (utilities, hooks, API handlers).
4. Manually verify the user flow when the change is UI-related, and describe how to check it.

Report results clearly, e.g. `Lint clean, 73 tests pass.`

## 7. Git & Safety

- Do not commit, push, or delete branches unless asked.
- Never delete files or run destructive commands (`rm -rf`, `git reset --hard`, DB drops) without explicit confirmation.
- Don't modify lock files, CI config, or env files unless the task requires it.
- Don't install new dependencies without stating why; prefer what's already in the project.

## 8. Communication Style

- Be concise and direct. Short summaries, no filler.
- After finishing, give:
  - **What changed** (files and a one-line reason each)
  - **How to run/test it** (exact commands)
  - **Notes or warnings** (only if relevant)
- Use code blocks for commands, e.g.:

  ```bash
  cd apps/mobile
  npx expo start -c
  ```

- End with the suggested **next task** when it's obvious.

## 9. Definition of Done

A task is complete only when:

- [ ] The feature works as described
- [ ] Lint passes with no errors
- [ ] All tests pass
- [ ] No new warnings or console errors (other than known harmless ones)
- [ ] Loading, error, and empty states are handled
- [ ] The summary of changes is provided
