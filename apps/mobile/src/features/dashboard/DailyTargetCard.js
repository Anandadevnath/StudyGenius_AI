/**
 * features/dashboard/DailyTargetCard.js — daily study target with progress ring.
 */

import { StyleSheet, View } from 'react-native';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { ProgressRing } from '../../components/ProgressRing';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

export function DailyTargetCard({ target, streakDays }) {
  const theme = useTheme();

  return (
    <Card style={styles.base}>
      <ProgressRing progress={target.percent} size={62} thickness={6} />
      <View style={styles.middle}>
        <Text variant="labelSm" color={theme.colors.textHeading}>
          Daily Study Target
        </Text>
        <Text variant="headlineSm" color={theme.colors.textHeading}>
          <Text variant="headlineSm" color={theme.colors.primary}>
            {target.done}
          </Text>
          {' /'}
          {target.goal}
        </Text>
        <Text variant="labelSm" color={theme.colors.textMuted}>
          {target.remaining}
        </Text>
      </View>
      <View style={styles.right}>
        <Badge label={`🔥 ${streakDays} Days`} tone="warning" />
        <Text variant="labelSm" color={theme.colors.textMuted} style={styles.keep}>
          Keep it rolling!
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  middle: { flex: 1, gap: 2 },
  right: { alignItems: 'center', gap: 6 },
  keep: { fontSize: 10 },
});

export default DailyTargetCard;
