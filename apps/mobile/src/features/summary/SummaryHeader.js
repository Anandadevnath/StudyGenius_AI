/**
 * features/summary/SummaryHeader.js — course title + reading progress.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { ProgressBar } from '../../components/ProgressBar';
import { IconButton } from '../../components/IconButton';
import { useTheme } from '../../theme/ThemeProvider';

export function SummaryHeader({ data }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View style={[styles.base, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.topRow}>
        <Text variant="labelSm" color={colors.aiAccent} style={styles.course}>
          ● {data.course}
        </Text>
        <IconButton name="bookmark-outline" variant="primarySoft" size={16} label="Bookmark" />
      </View>
      <Text variant="headlineSm" color={colors.textHeading}>
        {data.title}
      </Text>
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="book-outline" size={14} color={colors.primary} />
          <Text variant="labelSm" color={colors.textBody}>
            {data.readLabel}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={colors.textMuted} />
          <Text variant="labelSm" color={colors.textMuted}>
            {data.timeLeft}
          </Text>
        </View>
      </View>
      <ProgressBar progress={data.readPercent} height={6} />
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 18, padding: 16, gap: 10, borderWidth: 1 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  course: { letterSpacing: 0.5, flex: 1 },
  metaRow: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});

export default SummaryHeader;
