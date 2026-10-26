/**
 * theme/typography.js — "Cognitive Luminary" typography and layout tokens.
 *
 * Source: proposal Section 12.6, Table 8.
 * Documented design constants only; not consumed by any component yet.
 *
 * Fonts: Plus Jakarta Sans (headings/body) and Inter (labels/badges).
 * Font files are not bundled yet — add them under assets/fonts/ and wire
 * them with expo-font during implementation.
 */

export const fontFamilies = {
  heading: 'Plus Jakarta Sans',
  body: 'Plus Jakarta Sans',
  label: 'Inter',
};

export const fontSizes = {
  display: 34,
  headlineLg: 26,
  headlineMd: 22,
  headlineSm: 18,
  title: 16,
  bodyLg: 16,
  bodyMd: 14,
  bodySm: 12,
  labelMd: 14,
  labelSm: 12,
  labelXs: 10,
};

export const spacing = {
  grid: 8,
  screenMargin: 16,
  gutter: 16,
};

export const touchTargets = {
  min: 48,
  inputMinHeight: 52,
  inputMaxHeight: 56,
};

export const radii = {
  button: 8,
  input: 8,
  cardMin: 16,
  cardMax: 24,
};

export default { fontFamilies, fontSizes, spacing, touchTargets, radii };
