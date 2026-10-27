# stores/

Zustand stores. Intended stores: `authStore`, `notesStore`, `aiStore`,
`planStore`, `settingsStore`.

Implemented:

- `authStore` — authentication session state (`user`, `status`, `error`,
  `actionPending`) with actions `bootstrap`, `teardown`, `register`, `login`,
  `logout`, `clearError`, `getIdToken`. Delegates to
  `services/firebase/auth`.
- `notesStore` — notes list and upload state (`notes`, `status`,
  `uploadProgress`, `cursor`, `hasMore`) with actions `load`, `loadMore`,
  `addNote`, `removeNote`, `clear`, `clearError`. Orchestrates the storage,
  notes-metadata, and cache services; a failed upload is saved as a pending
  draft so nothing is lost silently.

Shared state uses Zustand consistently; `useState` only for ephemeral form
state. `aiStore`, `planStore` and `settingsStore` are added with their
respective features.
