# backend/services/

Business logic and AI-provider calls.

- `geminiService.js` — single integration point for Gemini (summary, quiz,
  plan). PLACEHOLDER: throws clear "not implemented" errors; makes no network
  calls.

Uses `config/gemini.js` for the server-side key/model. Implemented during
feature development.
