/**
 * theme/ThemeProvider.js — light/dark theme context + useTheme hook.
 *
 * Source: proposal §12.6/§12.7. Consumes the token modules and exposes the
 * active palette plus typography/layout tokens to all components.
 */

import { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { palettes } from './colors';
import tokens from './typography';

const ThemeContext = createContext(null);

export function ThemeProvider({ children, mode }) {
  const systemScheme = useColorScheme();
  const scheme = mode ?? (systemScheme === 'dark' ? 'dark' : 'light');

  const value = useMemo(() => ({ scheme, colors: palettes[scheme], ...tokens }), [scheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  if (!theme) {
    // Fallback so a component never crashes outside the provider.
    return { scheme: 'light', colors: palettes.light, ...tokens };
  }
  return theme;
}

export default ThemeProvider;
