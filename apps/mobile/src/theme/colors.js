/**
 * theme/colors.js — "Cognitive Luminary" design system palette.
 *
 * Source: proposal Section 12.6 (Style Guide), Tables 7 and 8.
 * These are documented design constants only. No styling, theming logic,
 * context provider, or component consumes them yet.
 *
 * NOTE: light/dark switching and WCAG AA verification are NOT implemented.
 */

export const palettes = {
  light: {
    primary: '#4F46E5',
    primaryPressed: '#4338CA',
    aiAccent: '#06B6D4',
    success: '#10B981',
    warning: '#F59E0B',
    aiHighlight: '#8B5CF6',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    textHeading: '#0F172A',
    textBody: '#475569',
    border: '#E2E8F0',
  },
  dark: {
    primary: '#818CF8',
    primaryPressed: '#6366F1',
    aiAccent: '#22D3EE',
    success: '#34D399',
    warning: '#FBBF24',
    aiHighlight: '#A78BFA',
    background: '#0F172A',
    surface: '#1E293B',
    textHeading: '#F1F5F9',
    textBody: '#CBD5E1',
    border: '#334155',
  },
};

export default palettes;
