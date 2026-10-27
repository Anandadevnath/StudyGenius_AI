/**
 * components/Badge.js — small status pill (labels/badges, proposal §12.6).
 */

import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function Badge({ label, tone = 'neutral', icon, style }) {
  const theme = useTheme();
  const { colors } = theme;

  const map = {
    primary: { bg: colors.primarySoft, fg: colors.primary },
    success: { bg: colors.successSoft, fg: colors.success },
    warning: { bg: colors.warningSoft, fg: '#B45309' },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
    ai: { bg: colors.aiAccentSoft, fg: '#0E7490' },
    highlight: { bg: colors.aiHighlightSoft, fg: colors.aiHighlight },
    neutral: { bg: colors.surfaceAlt, fg: theme.colors.textBody },
  }[tone] ?? { bg: colors.surfaceAlt, fg: colors.textBody };

  return (
    <View style={[styles.base, { backgroundColor: map.bg, borderRadius: theme.radii.pill }, style]}>
      {icon ? <Text variant="labelSm">{icon} </Text> : null}
      <Text variant="labelSm" color={map.fg}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});

export default Badge;
