import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

/**
 * Screen 1: Welcome / Onboarding (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 1. No onboarding logic is implemented.
 */
export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>StudyGenius AI</Text>
      <Text style={styles.subtitle}>Personal Learning Assistant</Text>
      <Text style={styles.note}>Placeholder screen. No features implemented yet.</Text>
      <Link href="/(tabs)" style={styles.link}>
        Continue to app (placeholder)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: { fontSize: 34, fontWeight: '700', color: '#0F172A' },
  subtitle: { fontSize: 16, color: '#475569', marginTop: 8 },
  note: { fontSize: 12, color: '#94A3B8', marginTop: 24, textAlign: 'center' },
  link: { marginTop: 24, color: '#4F46E5', fontWeight: '600' },
});
