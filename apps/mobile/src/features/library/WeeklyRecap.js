/**
 * features/library/WeeklyRecap.js — small illustrated weekly recap banner.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

export function WeeklyRecap() {
  const theme = useTheme();

  return (
    <Card style={styles.base}>
      <View style={[styles.icon, { backgroundColor: theme.colors.warningSoft }]}>
        <Ionicons name="sparkles" size={22} color={theme.colors.warning} />
      </View>
      <View style={styles.flex}>
        <Text variant="labelSm" color={theme.colors.primary} style={styles.eyebrow}>
          WEEKLY RECAP
        </Text>
        <Text variant="title" color={theme.colors.textHeading}>
          3 New Topics Mastered
        </Text>
        <Text variant="bodySm" color={theme.colors.textMuted}>
          You reviewed 28 pages across Database Systems & Distributed Nodes this week.
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', gap: 12, padding: 14, alignItems: 'center' },
  flex: { flex: 1, gap: 2 },
  icon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  eyebrow: { letterSpacing: 0.8 },
});

export default WeeklyRecap;
