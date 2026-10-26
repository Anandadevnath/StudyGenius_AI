import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 2b: Register (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 2. NOT IMPLEMENTED.
 */
export default function RegisterScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <Text style={styles.note}>Placeholder. Account creation is not implemented yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12, textAlign: 'center' },
});
