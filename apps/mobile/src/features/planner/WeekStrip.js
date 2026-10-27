/**
 * features/planner/WeekStrip.js — horizontal week date strip with active day.
 */

import { StyleSheet, View } from 'react-native';

import { Text } from '../../components/Text';
import { useTheme } from '../../theme/ThemeProvider';

export function WeekStrip({ days }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={[styles.base, { backgroundColor: colors.surface }]}>
      {days.map((d) => (
        <View key={d.day} style={styles.day}>
          <Text variant="labelSm" color={d.active ? colors.primary : colors.textMuted}>
            {d.day}
          </Text>
          <View style={[styles.dateBox, d.active && { backgroundColor: colors.primary }]}>
            <Text variant="title" color={d.active ? '#FFFFFF' : colors.textBody}>
              {d.date}
            </Text>
          </View>
          <View
            style={[styles.dot, { backgroundColor: d.active ? colors.primary : colors.border }]}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderRadius: 18 },
  day: { alignItems: 'center', gap: 6, flex: 1 },
  dateBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: { width: 4, height: 4, borderRadius: 2 },
});

export default WeekStrip;
