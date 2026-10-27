# assets/

- `images/` — screen imagery (splash, illustrations).
- `icons/` — app icon (1024×1024), adaptive icon, favicon (proposal §19.1).
- `fonts/` — Plus Jakarta Sans and Inter (variable TTFs, proposal §12.6),
  loaded in the root layout via `expo-font`.

The font files are real and bundled. The app icon / feature graphic are still
placeholders (1×1 PNGs so `app.json` resolves); real visual assets are produced
in the release phase (§19).
