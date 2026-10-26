import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 4: Notes Library & Upload (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 4. NOT IMPLEMENTED: no file selection,
 * no camera capture, no Firebase Storage upload, no Firestore library.
 */
export default function LibraryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notes Library & Upload</Text>
      <Text style={styles.note}>Placeholder screen. No upload logic implemented.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12 },
});
