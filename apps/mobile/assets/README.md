# assets/

- `icons/` — app icon, adaptive icon, favicon (proposal §19.1).
  - `icon.png` (1024×1024) — iOS + Android app icon.
  - `adaptive-icon.png` (1024×1024) — Android adaptive foreground (transparent).
  - `favicon.png` (196×196) — web browser tab.
- `images/splash.png` (1242×2436) — launch/splash screen.
- `fonts/` — Plus Jakarta Sans and Inter (variable TTFs, proposal §12.6),
  loaded in the root layout via `expo-font`.

The icon and splash use the StudyGenius mark (graduation cap + AI spark) in
white on the brand indigo gradient, matching the Cognitive Luminary palette.
App icons appear in a real build (`eas build` / dev build); Expo Go shows its
own icon.
