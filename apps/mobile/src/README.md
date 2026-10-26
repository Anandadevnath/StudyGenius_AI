# src/

Feature-based source layout. UI is separated from business logic and data
access. Services are injected into Zustand stores rather than called directly
from screens.

- `components/` — reusable UI (Button, Card, Input, ...).
- `features/` — one folder per feature: auth, library, summaries, quizzes, planner, progress.
- `services/` — firebase, api client, sqlite database, notifications.
- `stores/` — Zustand stores.
- `hooks/` — reusable React hooks.
- `constants/` — app-wide constants (routes, limits, config keys).
- `database/` — SQLite schema, migrations, and local persistence helpers.
- `theme/` — colors, typography, light/dark theme tokens.
- `utils/` — validators, formatters.

PLACEHOLDER DIRECTORY. No features are implemented yet.
