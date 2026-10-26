import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 7: Study Planner (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 7. NOT IMPLEMENTED: no plan creation,
 * no AI schedule suggestions, no session management.
 */
export default function PlannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Study Planner</Text>
      <Text style={styles.note}>Placeholder screen. No planner logic implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
