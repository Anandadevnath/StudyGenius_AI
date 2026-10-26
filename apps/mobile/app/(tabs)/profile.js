import { StyleSheet, Text, View } from 'react-native';

/**
 * Profile tab (PLACEHOLDER).
 *
 * Proposal ref: Section 6 — Profile is the fifth bottom tab; in the
 * proposal the Progress & Profile screen shares tab 5. This route exists so
 * the five-tab layout resolves. Final screen composition is decided during
 * implementation.
 */
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.note}>Placeholder screen. No preferences implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
