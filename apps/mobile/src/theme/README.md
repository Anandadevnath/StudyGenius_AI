# theme/

Design tokens for the "Cognitive Luminary" system (proposal §12.6).

- `colors.js` — light/dark palettes (primary #4F46E5 / #818CF8, AI cyan, soft
  tints, gradients, semantic tones).
- `typography.js` — font families, sizes, spacing (8-pt grid), touch targets,
  radii, shadows.
- `ThemeProvider.js` — light/dark context plus the `useTheme()` hook that
  every component reads. Follows the device scheme by default (`mode` prop
  overrides it).

Fonts (Plus Jakarta Sans, Inter) are bundled in `assets/fonts/` and loaded in
the root layout. Dark-mode WCAG AA contrast checks are validated in Figma
before implementation.
