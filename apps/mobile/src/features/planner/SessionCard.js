/**
 * features/planner/SessionCard.js — timeline session item with status.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

export function SessionCard({ session }) {
  const theme = useTheme();
  const { colors } = theme;

  const statusTone = session.done ? 'success' : session.primary ? 'primary' : 'highlight';

  return (
    <View style={styles.row}>
      <View style={styles.timeline}>
        <View
          style={[
            styles.node,
            {
              backgroundColor: session.done
                ? colors.success
                : session.primary
                  ? colors.primary
                  : colors.aiHighlightSoft,
            },
          ]}
        >
          <Ionicons
            name={session.done ? 'checkmark' : session.primary ? 'play' : 'sparkles'}
            size={14}
            color={session.done || session.primary ? '#FFFFFF' : colors.aiHighlight}
          />
        </View>
        <View style={[styles.line, { backgroundColor: colors.border }]} />
      </View>

      <Card style={styles.card}>
        <View style={styles.head}>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color={colors.textMuted} />
            <Text variant="labelSm" color={colors.textMuted}>
              {session.time}
            </Text>
          </View>
          <Badge label={session.status} tone={statusTone} />
        </View>
        <Text variant="title" color={colors.textHeading}>
          {session.title}
        </Text>
        <View style={styles.tags}>
          {session.tags.map((t) => (
            <Badge key={t} label={t} tone="neutral" />
          ))}
          {session.remind ? <Badge label={`🔔 ${session.remind}`} tone="primary" /> : null}
        </View>
        {session.primary ? (
          <View style={styles.startRow}>
            <View />
            <Badge label="Start →" tone="primary" />
          </View>
        ) : null}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  timeline: { alignItems: 'center', width: 32 },
  node: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  line: { width: 2, flex: 1, marginVertical: 4 },
  card: { flex: 1, gap: 10, marginBottom: 14 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tags: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  startRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default SessionCard;
