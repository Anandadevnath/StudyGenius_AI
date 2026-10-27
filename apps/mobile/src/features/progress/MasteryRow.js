/**
 * features/progress/MasteryRow.js — subject mastery bar with level badge.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { ProgressBar } from '../../components/ProgressBar';
import { useTheme } from '../../theme/ThemeProvider';

const LEVEL = { Advanced: 'highlight', Proficient: 'ai' };

export function MasteryRow({ item }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={styles.base}>
      <View style={styles.head}>
        <View style={styles.left}>
          <Ionicons name={item.icon} size={18} color={colors.primary} />
          <Text variant="title" color={colors.textHeading} style={styles.flex}>
            {item.subject}
          </Text>
        </View>
        <Badge label={item.level} tone={LEVEL[item.level] ?? 'neutral'} />
        <Text variant="title" color={colors.textHeading}>
          {Math.round(item.percent * 100)}%
        </Text>
      </View>
      <ProgressBar progress={item.percent} color={colors.primary} height={8} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { gap: 10 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  flex: { flex: 1 },
});

export default MasteryRow;
