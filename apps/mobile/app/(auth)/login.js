import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 2a: Login (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 2. NOT IMPLEMENTED: no Firebase Auth,
 * no email/password validation, no password reset, no Google Sign-In.
 */
export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.note}>Placeholder. Authentication is not implemented yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12, textAlign: 'center' },
});
