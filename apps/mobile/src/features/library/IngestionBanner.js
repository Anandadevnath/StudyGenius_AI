/**
 * features/library/IngestionBanner.js — "Upload & Auto-Summarize" gradient card.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Badge } from '../../components/Badge';
import { useTheme } from '../../theme/ThemeProvider';

export function IngestionBanner() {
  const theme = useTheme();

  return (
    <View style={[styles.base, { backgroundColor: theme.colors.copilotFrom }]}>
      <View style={styles.flex}>
        <Badge label="✦  StudyGenius Ingestion" tone="glass" style={styles.badge} />
        <Text variant="headlineSm" color="#FFFFFF" style={styles.title}>
          Upload & Auto-Summarize
        </Text>
        <Text variant="bodySm" color="rgba(255,255,255,0.85)">
          Drop your slides or syllabi. We extract formula sheets, key concepts, & adaptive
          flashcards instantly.
        </Text>
      </View>
      <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
        <Ionicons name="cloud-upload-outline" size={26} color="#FFFFFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: 22, padding: 18, flexDirection: 'row', gap: 12, alignItems: 'center' },
  flex: { flex: 1, gap: 8 },
  badge: { backgroundColor: 'rgba(255,255,255,0.18)' },
  title: { marginTop: 2 },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IngestionBanner;
