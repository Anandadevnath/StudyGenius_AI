/**
 * components/Text.js — themed text with "Cognitive Luminary" variants.
 */

import { Text as RNText } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

const VARIANTS = {
  display: { family: 'heading', fontSize: 34, lineHeight: 40 },
  headlineLg: { family: 'heading', fontSize: 26, lineHeight: 32 },
  headlineMd: { family: 'heading', fontSize: 22, lineHeight: 28 },
  headlineSm: { family: 'heading', fontSize: 18, lineHeight: 24 },
  title: { family: 'headingSemi', fontSize: 16, lineHeight: 22 },
  body: { family: 'body', fontSize: 15, lineHeight: 22 },
  bodySm: { family: 'body', fontSize: 13, lineHeight: 19 },
  label: { family: 'label', fontSize: 13, lineHeight: 18 },
  labelSm: { family: 'label', fontSize: 11, lineHeight: 15 },
  labelXs: { family: 'label', fontSize: 10, lineHeight: 14 },
};

export function Text({ variant = 'body', color, weight, style, children, ...rest }) {
  const theme = useTheme();
  const base = VARIANTS[variant] ?? VARIANTS.body;

  return (
    <RNText
      style={[
        {
          fontFamily: theme.fontFamilies[base.family],
          fontSize: base.fontSize,
          lineHeight: base.lineHeight,
        },
        { color: color ?? theme.colors.textBody },
        weight ? { fontWeight: weight } : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}

export default Text;
