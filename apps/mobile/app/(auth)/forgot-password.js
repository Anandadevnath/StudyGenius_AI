import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 2c: Forgot Password (PLACEHOLDER).
 *
 * Proposal ref: Section 5.1, Section 6 — password reset by email.
 * NOT IMPLEMENTED: no Firebase Auth sendPasswordResetEmail call, no form.
 */
export default function ForgotPasswordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.note}>Placeholder. Password reset is not implemented yet.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#0F172A' },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 12, textAlign: 'center' },
});
