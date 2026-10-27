# src/

Backend source (proposal §8). Secure AI backend that verifies Firebase ID
tokens, keeps provider secrets server-side, applies rate limits, and validates
requests and responses.

- `config/` — environment loading, Firebase Admin init, Gemini config.
- `middleware/` — auth (Firebase ID-token verification), rate limiting, error
  handling.
- `routes/` — HTTP routes (`health`, `auth/me`).
- `controllers/` — request handlers (empty placeholder).
- `services/` — business logic and AI provider calls (empty placeholder).
- `validators/` — request/response schema validation with zod (empty placeholder).
- `utils/` — logger and helpers.

FOUNDATION + AUTH. `/api/health` is public; `/api/auth/me` verifies a Firebase
ID token end to end. No AI features exist yet.
