/**
 * features/progress/StatTile.js — statistic tile (study time, docs, quizzes).
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

const TONE = { primary: 'primary', ai: 'aiAccent', highlight: 'aiHighlight' };

export function StatTile({ stat }) {
  const theme = useTheme();
  const color = theme.colors[TONE[stat.tone]] ?? theme.colors.primary;

  return (
    <Card style={styles.base}>
      <View style={styles.head}>
        <Text variant="labelSm" color={theme.colors.textMuted} style={styles.label}>
          {stat.label}
        </Text>
        <Ionicons name={`${stat.icon}-outline`} size={16} color={color} />
      </View>
      <Text variant="headlineMd" color={color}>
        {stat.value}
      </Text>
      <Text variant="labelSm" color={theme.colors.textMuted}>
        {stat.sub}
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { flexGrow: 1, flexBasis: '47%', gap: 6, padding: 14 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { letterSpacing: 0.4 },
});

export default StatTile;
