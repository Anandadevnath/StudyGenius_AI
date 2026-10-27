/**
 * features/progress/WeeklyChart.js — bar chart of weekly study rhythm.
 */

import { StyleSheet, View } from 'react-native';

import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { useTheme } from '../../theme/ThemeProvider';

export function WeeklyChart({ data }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Card style={styles.base}>
      <View style={styles.head}>
        <View>
          <Text variant="headlineSm" color={colors.textHeading}>
            {data.title}
          </Text>
          <Text variant="labelSm" color={colors.textMuted}>
            {data.sub}
          </Text>
        </View>
        <Badge label={`🔥 ${data.badge}`} tone="warning" />
      </View>

      <View style={styles.chart}>
        {data.bars.map((b) => (
          <View key={b.day} style={styles.barCol}>
            <Text variant="labelXs" color={b.peak ? colors.primary : colors.textMuted}>
              {b.hours}
            </Text>
            <View
              style={[
                styles.bar,
                {
                  height: 90 * b.value,
                  backgroundColor: b.peak ? colors.primary : colors.primarySoft,
                },
              ]}
            />
            <Text variant="labelSm" color={colors.textMuted}>
              {b.day}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.legend}>
        {data.legend.map((l) => (
          <View key={l.label} style={styles.legendItem}>
            <View
              style={[
                styles.legendDot,
                { backgroundColor: l.tone === 'primary' ? colors.primary : colors.aiAccent },
              ]}
            />
            <Text variant="labelSm" color={colors.textBody}>
              {l.label}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { gap: 14 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 130,
  },
  barCol: { alignItems: 'center', gap: 6, flex: 1, justifyContent: 'flex-end' },
  bar: { width: 18, borderRadius: 6 },
  legend: { flexDirection: 'row', gap: 18 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
});

export default WeeklyChart;
