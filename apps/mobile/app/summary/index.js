import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 5: AI Summary (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 5. NOT IMPLEMENTED: no AI summary
 * generation, no key-point rendering, no save. No backend calls are made.
 */
export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Summary</Text>
      <Text style={styles.note}>Placeholder screen. AI features not implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
