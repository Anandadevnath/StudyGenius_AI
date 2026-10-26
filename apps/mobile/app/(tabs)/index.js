import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 3: Home Dashboard (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 3. NOT IMPLEMENTED: no summary data,
 * no daily target, no quick actions, no recent materials.
 */
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Dashboard</Text>
      <Text style={styles.note}>Placeholder screen. No features implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
