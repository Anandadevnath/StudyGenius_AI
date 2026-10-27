/**
 * features/dashboard/CopilotCard.js — "StudyGenius Copilot" AI prompt card.
 */

import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { useTheme } from '../../theme/ThemeProvider';

export function CopilotCard({ prompt }) {
  const theme = useTheme();

  return (
    <View style={[styles.base, { backgroundColor: theme.colors.copilotFrom }]}>
      <View style={styles.titleRow}>
        <Badge label="✦  StudyGenius Copilot" tone="glass" style={styles.badge} />
        <View style={styles.liveDot} />
      </View>
      <Text variant="headlineMd" color="#FFFFFF" style={styles.title}>
        Supercharge your retention
      </Text>
      <Text variant="bodySm" color="rgba(255,255,255,0.85)">
        Ask anything about your lecture notes or create instant adaptive flashcards.
      </Text>
      <View style={styles.tryRow}>
        <Text variant="labelSm" color="rgba(255,255,255,0.75)">
          Try:
        </Text>
        <Pressable style={styles.tryPill}>
          <Text variant="labelSm" color="#FFFFFF">
            {prompt}
          </Text>
          <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
        </Pressable>
      </View>
      <View style={styles.askBar}>
        <Ionicons name="sparkles" size={16} color={theme.colors.textMuted} />
        <Text variant="bodySm" color={theme.colors.textMuted} style={styles.askPlaceholder}>
          Ask AI from uploaded materials...
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 22, padding: 18, gap: 10 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  badge: { backgroundColor: 'rgba(255,255,255,0.18)' },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#67E8F9' },
  title: { marginTop: 4 },
  tryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 2 },
  tryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  askBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    marginTop: 4,
  },
  askPlaceholder: { flex: 1 },
});

export default CopilotCard;
