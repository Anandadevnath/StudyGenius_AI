import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Badge } from '../../src/components/Badge';
import { IconButton } from '../../src/components/IconButton';
import { Screen } from '../../src/components/Screen';
import { useTheme } from '../../src/theme/ThemeProvider';
import { sendPasswordReset } from '../../src/services/firebase/auth';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  const [email, setEmail] = useState('');
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async () => {
    setError(null);
    if (!email.trim()) {
      setError('Enter your email address.');
      return;
    }
    setPending(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconButton name="arrow-back" onPress={() => router.back()} label="Go back" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Badge label="✦  Account Recovery" tone="primary" />
        <Text variant="headlineLg" color={colors.textHeading}>
          Reset password
        </Text>
        <Text variant="body" color={colors.textBody}>
          Enter your university email and we will send a password reset link.
        </Text>

        {sent ? (
          <View style={[styles.note, { backgroundColor: colors.successSoft }]}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text variant="bodySm" color={colors.success} style={styles.flex}>
              If an account exists for {email}, a reset link is on the way.
            </Text>
          </View>
        ) : null}

        {error ? (
          <View style={[styles.note, { backgroundColor: colors.dangerSoft }]}>
            <Ionicons name="alert-circle" size={16} color={colors.danger} />
            <Text variant="bodySm" color={colors.danger} style={styles.flex}>
              {error}
            </Text>
          </View>
        ) : null}

        <Input
          label="University Email"
          icon="school-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="ananda@university.edu"
          keyboardType="email-address"
        />
        <Button
          label="Send Reset Link"
          icon="mail-outline"
          loading={pending}
          onPress={handleSend}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingVertical: 8 },
  content: { paddingHorizontal: 16, gap: 16 },
  flex: { flex: 1 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 12, borderRadius: 12 },
});
