# services/firebase/

Firebase client SDK configuration (proposal §7, §10.3).

- `client.js` — reads Firebase client config from `EXPO_PUBLIC_*` env vars
  and throws a clear error if any are missing. Does not initialize Firebase yet.

PLACEHOLDER. Auth/Firestore/Storage wiring is deferred to feature development.

## Security

`EXPO_PUBLIC_*` variables are bundled into the mobile app and are public.
Only Firebase client configuration belongs here. The Gemini API key and
Firebase Admin credentials must remain server-side in `backend/`.
