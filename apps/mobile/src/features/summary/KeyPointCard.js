/**
 * features/summary/KeyPointCard.js — numbered key concept with body and chips.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

export function KeyPointCard({ point }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Card style={styles.base}>
      <View style={styles.head}>
        <View style={[styles.number, { backgroundColor: colors.primarySoft }]}>
          <Text variant="title" color={colors.primary}>
            {point.n}
          </Text>
        </View>
        <Text variant="title" color={colors.textHeading} style={styles.flex}>
          {point.title}
        </Text>
      </View>
      <Text variant="bodySm" color={colors.textBody}>
        {point.body}
      </Text>
      {point.chips ? (
        <View style={styles.chipRow}>
          {point.chips.map((c) => (
            <Badge key={c} label={c} tone="primary" />
          ))}
        </View>
      ) : null}
      {point.formula ? (
        <View style={[styles.formula, { backgroundColor: colors.aiAccentSoft }]}>
          <Text variant="labelSm" color={colors.textBody}>
            {point.formula}
          </Text>
          <Ionicons name="calculator-outline" size={16} color={colors.aiAccent} />
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { gap: 10 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flex: { flex: 1 },
  number: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  formula: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 12,
  },
});

export default KeyPointCard;
