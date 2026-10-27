import { useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Badge } from '../../src/components/Badge';
import { IconButton } from '../../src/components/IconButton';
import { SegmentedControl } from '../../src/components/SegmentedControl';
import { Screen } from '../../src/components/Screen';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/stores/authStore';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [localError, setLocalError] = useState(null);

  const pending = useAuthStore((s) => s.actionPending);
  const isRegister = mode === 'register';

  const handleSubmit = async () => {
    setLocalError(null);
    if (!email.trim() || !password) {
      setLocalError('Enter your email and password.');
      return;
    }
    try {
      if (isRegister) {
        await useAuthStore.getState().register({ email, password });
      } else {
        await useAuthStore.getState().login({ email, password });
      }
      router.replace('/(tabs)');
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconButton name="arrow-back" onPress={() => router.back()} label="Go back" />
        <View style={styles.brand}>
          <View style={[styles.logo, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="school" size={16} color={colors.primary} />
          </View>
          <Text variant="headlineSm" color={colors.primary}>
            StudyGenius
          </Text>
        </View>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Badge label="✦  Autonomous Learning Suite" tone="primary" />
        <Text variant="display" color={colors.textHeading} style={styles.title}>
          {isRegister ? 'Create account' : 'Welcome back'}
        </Text>
        <Text variant="body" color={colors.textBody}>
          {isRegister
            ? 'Register to start building AI summaries, quizzes, and your study schedule.'
            : 'Sign in to access your AI summaries, quizzes, and study schedule.'}
        </Text>

        <SegmentedControl
          value={mode}
          onChange={setMode}
          options={[
            { value: 'signin', label: 'Sign In' },
            { value: 'register', label: 'Register' },
          ]}
          style={styles.segments}
        />

        <Input
          label="University Email"
          icon="school-outline"
          value={email}
          onChangeText={setEmail}
          placeholder="ananda@university.edu"
          keyboardType="email-address"
        />

        <View>
          <View style={styles.passwordRow}>
            <Text variant="title" color={colors.textHeading}>
              Password
            </Text>
            <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
              <Text variant="label" color={colors.primary}>
                Forgot password?
              </Text>
            </Pressable>
          </View>
          <Input
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••••••"
            secureTextEntry
          />
        </View>

        <View style={styles.rememberRow}>
          <Pressable style={styles.rememberLeft} onPress={() => setRemember((r) => !r)}>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: remember ? colors.primary : colors.surface,
                  borderColor: remember ? colors.primary : colors.border,
                },
              ]}
            >
              {remember ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
            </View>
            <Text variant="bodySm" color={colors.textBody}>
              Remember me for 30 days
            </Text>
          </Pressable>
          <Badge label="● SSL Secured" tone="success" />
        </View>

        {localError ? (
          <View style={[styles.errorBox, { backgroundColor: colors.dangerSoft }]}>
            <Ionicons name="alert-circle" size={16} color={colors.danger} />
            <Text variant="bodySm" color={colors.danger} style={styles.errorText}>
              {localError}
            </Text>
          </View>
        ) : null}

        <Button
          label={isRegister ? 'Create Account' : 'Sign In to StudyGenius'}
          icon="flash"
          loading={pending}
          onPress={handleSubmit}
        />

        <View style={styles.orRow}>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
          <Text variant="labelSm" color={colors.textMuted} style={styles.orText}>
            OR CONTINUE WITH
          </Text>
          <View style={[styles.line, { backgroundColor: colors.border }]} />
        </View>

        <Button label="Continue with Google" variant="outline" fullWidth />
        <Button label="Sign in with Campus ID" variant="secondary" icon="business" />

        <Text variant="bodySm" color={colors.textMuted} style={styles.terms}>
          By continuing, you agree to StudyGenius{' '}
          <Text variant="bodySm" color={colors.primary}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text variant="bodySm" color={colors.primary}>
            Privacy Policy
          </Text>
          .
        </Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { width: 32, height: 32, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  spacer: { width: 44 },
  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  title: { marginTop: 4 },
  segments: { marginTop: 4 },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rememberLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
  line: { flex: 1, height: 1 },
  orText: { letterSpacing: 1 },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  errorText: { flex: 1 },
  terms: { textAlign: 'center', marginTop: 4 },
});
