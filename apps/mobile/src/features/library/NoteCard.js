/**
 * features/library/NoteCard.js — a study-material card for the library list.
 */

import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

export function NoteCard({ note }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Card style={styles.base}>
      <View style={styles.head}>
        <View style={[styles.fileIcon, { backgroundColor: colors.surfaceAlt }]}>
          <Ionicons name="document-text" size={20} color={colors.primary} />
        </View>
        <View style={styles.flex}>
          <Text variant="title" color={colors.textHeading} numberOfLines={1}>
            {note.title}
          </Text>
          <Text variant="labelSm" color={colors.textMuted}>
            {note.course} • {note.meta}
          </Text>
        </View>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.textMuted} />
      </View>
      <View style={styles.actions}>
        <Badge label={note.badge.label} tone={note.badge.tone} />
        <View style={styles.actionRow}>
          {note.actions.map((a) => (
            <Pressable
              key={a.label}
              style={[
                styles.actionPill,
                { backgroundColor: colors.primarySoft, borderRadius: theme.radii.pill },
              ]}
            >
              <Ionicons name={a.icon} size={13} color={colors.primary} />
              <Text variant="labelSm" color={colors.primary}>
                {a.label}
              </Text>
            </Pressable>
          ))}
          <View style={[styles.bookmark, { backgroundColor: colors.surfaceAlt }]}>
            <Ionicons name="bookmark-outline" size={14} color={colors.textBody} />
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  base: { gap: 12 },
  head: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flex: { flex: 1, gap: 2 },
  fileIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { gap: 10 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  actionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  bookmark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteCard;
