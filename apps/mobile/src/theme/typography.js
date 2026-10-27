/**
 * theme/typography.js — "Cognitive Luminary" typography and layout tokens.
 *
 * Source: proposal §12.6, Table 8.
 * Fonts: Plus Jakarta Sans (headings/body) and Inter (labels/badges).
 */

export const fontFamilies = {
  heading: 'PlusJakartaSans',
  headingSemi: 'PlusJakartaSans',
  body: 'PlusJakartaSans',
  bodyMedium: 'PlusJakartaSans',
  label: 'Inter',
  labelMedium: 'Inter',
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
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  screenMargin: 16,
  gutter: 16,
};

export const touchTargets = {
  min: 48,
  inputMinHeight: 52,
  inputMaxHeight: 56,
};

export const radii = {
  sm: 8,
  button: 12,
  input: 12,
  card: 18,
  cardLg: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 14,
    elevation: 3,
  },
  soft: {
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  primary: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 6,
  },
};

export default {
  fontFamilies,
  fontSizes,
  spacing,
  touchTargets,
  radii,
  shadows,
};
