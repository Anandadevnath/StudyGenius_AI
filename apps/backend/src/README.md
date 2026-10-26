# src/

Backend source (proposal §8). Secure AI backend that verifies Firebase ID
tokens, keeps provider secrets server-side, applies rate limits, and validates
requests and responses.

- `config/` — environment loading, Firebase Admin plan, Gemini config.
- `middleware/` — auth (ID-token verification), rate limiting, error handling.
- `routes/` — HTTP routes (currently only `health`).
- `controllers/` — request handlers (empty placeholder).
- `services/` — business logic and AI provider calls (empty placeholder).
- `validators/` — request/response schema validation with zod (empty placeholder).
- `utils/` — logger and helpers.

PLACEHOLDER FOUNDATION. Only `/api/health` responds. No AI features exist.
