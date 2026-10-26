# stores/

Zustand stores. Intended stores: `authStore`, `notesStore`, `aiStore`,
`planStore`, `settingsStore`.

Implemented:

- `authStore` — authentication session state (`user`, `status`, `error`,
  `actionPending`) with actions `bootstrap`, `teardown`, `register`, `login`,
  `logout`, `clearError`, `getIdToken`. Delegates to
  `services/firebase/auth`; screens never call Firebase directly.

Shared state uses Zustand consistently; `useState` only for ephemeral form
state. `notesStore`, `aiStore`, `planStore` and `settingsStore` are added with
their respective features.
