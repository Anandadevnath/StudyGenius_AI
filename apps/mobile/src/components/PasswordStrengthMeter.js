/**
 * components/PasswordStrengthMeter.js — four-segment password strength bar.
 */

import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

const TONE_BY_SCORE = ['danger', 'danger', 'warning', 'success', 'success'];

export function PasswordStrengthMeter({ score = 0, label }) {
  const theme = useTheme();
  const { colors } = theme;

  if (!label) {
    return null;
  }

  const fill = Math.max(1, score);
  const barColor = colors[TONE_BY_SCORE[score]] ?? colors.border;

  return (
    <View style={styles.base}>
      <View style={styles.bars}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[styles.bar, { backgroundColor: i < fill ? barColor : colors.surfaceAlt }]}
          />
        ))}
      </View>
      <Text variant="labelSm" color={barColor}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  bars: { flexDirection: 'row', gap: 4, flex: 1 },
  bar: { flex: 1, height: 5, borderRadius: 3 },
});

export default PasswordStrengthMeter;
