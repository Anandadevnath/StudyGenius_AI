import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 8: Progress & Profile (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 8. NOT IMPLEMENTED: no statistics,
 * no charts, no preferences, no sign-out.
 */
export default function ProgressScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress & Profile</Text>
      <Text style={styles.note}>Placeholder screen. No tracking implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
