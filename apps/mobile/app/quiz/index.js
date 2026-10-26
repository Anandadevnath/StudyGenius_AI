import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 6: AI Quiz (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 6. NOT IMPLEMENTED: no quiz generation,
 * no answer selection, no scoring. No backend calls are made.
 */
export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Quiz</Text>
      <Text style={styles.note}>Placeholder screen. Quiz features not implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
