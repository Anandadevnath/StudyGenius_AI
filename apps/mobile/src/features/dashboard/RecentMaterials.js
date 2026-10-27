/**
 * features/dashboard/RecentMaterials.js — horizontal recent-materials cards.
 */

import { ScrollView, StyleSheet, View } from 'react-native';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { Card } from '../../components/Card';
import { IconButton } from '../../components/IconButton';
import { useTheme } from '../../theme/ThemeProvider';

const FILE_TONE = { PDF: 'danger', DOCX: 'primary', TXT: 'ai' };

export function RecentMaterials({ materials }) {
  const theme = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {materials.map((m) => (
        <Card key={m.id} style={styles.card} padded={false}>
          <View style={styles.body}>
            <View style={styles.headRow}>
              <Badge label={m.meta} tone={FILE_TONE[m.fileType] ?? 'neutral'} />
              <Badge label={`🔒 ${m.badge}`} tone="ai" />
            </View>
            <Text variant="title" color={theme.colors.textHeading} numberOfLines={2}>
              {m.title}
            </Text>
            <Text variant="bodySm" color={theme.colors.textMuted} numberOfLines={1}>
              {m.tags[0]}
            </Text>
          </View>
          <View style={[styles.foot, { borderTopColor: theme.colors.border }]}>
            <Text variant="labelSm" color={theme.colors.textMuted}>
              {m.studided}
            </Text>
            <IconButton name="play" variant="primarySoft" size={16} label="Open material" />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: 12, paddingRight: 8 },
  card: { width: 260 },
  body: { padding: 14, gap: 8 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between' },
  foot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});

export default RecentMaterials;
