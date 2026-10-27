import { useMemo, useState } from 'react';
import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Badge } from '../../src/components/Badge';
import { IconButton } from '../../src/components/IconButton';
import { SegmentedControl } from '../../src/components/SegmentedControl';
import { PasswordStrengthMeter } from '../../src/components/PasswordStrengthMeter';
import { Screen } from '../../src/components/Screen';
import { useToast } from '../../src/components/Toast';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/stores/authStore';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  passwordStrength,
} from '../../src/utils/validation';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;
  const { showToast } = useToast();

  const [mode, setMode] = useState('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [remember, setRemember] = useState(true);
  const [touched, setTouched] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const pending = useAuthStore((s) => s.actionPending);
  const isRegister = mode === 'register';

  const errors = useMemo(
    () => ({
      name: isRegister ? validateName(name) : null,
      email: validateEmail(email),
      password: validatePassword(password, { requireStrong: isRegister }),
      confirm: isRegister ? validateConfirmPassword(password, confirm) : null,
      terms: isRegister && !acceptedTerms ? 'Please accept the terms to continue.' : null,
    }),
    [isRegister, name, email, password, confirm, acceptedTerms],
  );

  const strength = useMemo(() => passwordStrength(password), [password]);
  const showError = (field) => (touched[field] ? errors[field] : null);

  const switchMode = (next) => {
    setMode(next);
    setTouched({});
    setSubmitError(null);
  };

  const markAllTouched = () =>
    setTouched({ name: true, email: true, password: true, confirm: true, terms: true });

  const canSubmit = Object.values(errors).every((e) => !e);

  const handleSubmit = async () => {
    setSubmitError(null);
    markAllTouched();
    if (!canSubmit) {
      return;
    }
    try {
      if (isRegister) {
        await useAuthStore.getState().register({ email, password, displayName: name.trim() });
        showToast({
          tone: 'success',
          title: 'Account created',
          message: `Welcome to StudyGenius, ${name.trim().split(' ')[0] || 'friend'}!`,
        });
      } else {
        await useAuthStore.getState().login({ email, password });
        showToast({
          tone: 'success',
          title: 'Signed in',
          message: 'Welcome back to StudyGenius.',
        });
      }
      router.replace('/(tabs)');
    } catch (error) {
      setSubmitError(error.message);
      showToast({ tone: 'error', title: 'Sign-in failed', message: error.message });
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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Badge label="✦  Autonomous Learning Suite" tone="primary" />
        <Text variant="display" color={colors.textHeading} style={styles.title}>
          {isRegister ? 'Create account' : 'Welcome back'}
        </Text>
        <Text variant="body" color={colors.textBody}>
          {isRegister
            ? 'Set up your account to build AI summaries, quizzes, and your study schedule.'
            : 'Sign in to continue to your AI summaries, quizzes, and study schedule.'}
        </Text>

        <SegmentedControl
          value={mode}
          onChange={switchMode}
          options={[
            { value: 'signin', label: 'Sign In' },
            { value: 'register', label: 'Register' },
          ]}
          style={styles.segments}
        />

        {isRegister ? (
          <Input
            label="Full Name"
            icon="person-outline"
            value={name}
            onChangeText={setName}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Ananda Dev Nath"
            autoCapitalize="words"
            autoComplete="name"
            error={showError('name')}
            success={touched.name && !errors.name && Boolean(name)}
          />
        ) : null}

        <Input
          label="University Email"
          icon="school-outline"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          placeholder="ananda@university.edu"
          keyboardType="email-address"
          autoComplete="email"
          error={showError('email')}
          success={touched.email && !errors.email && Boolean(email)}
        />

        <View>
          <View style={styles.passwordRow}>
            <Text variant="title" color={colors.textHeading}>
              Password
            </Text>
            {!isRegister ? (
              <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
                <Text variant="label" color={colors.primary}>
                  Forgot password?
                </Text>
              </Pressable>
            ) : null}
          </View>
          <Input
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder={isRegister ? 'At least 8 characters' : '••••••••••••'}
            secureTextEntry
            autoComplete={isRegister ? 'new-password' : 'current-password'}
            error={showError('password')}
          />
          {isRegister && password ? (
            <PasswordStrengthMeter score={strength.score} label={strength.label} />
          ) : null}
          {isRegister && !password ? (
            <Text variant="labelSm" color={colors.textMuted} style={styles.hint}>
              Use 8+ characters with upper and lower case letters.
            </Text>
          ) : null}
        </View>

        {isRegister ? (
          <Input
            label="Confirm Password"
            icon="lock-closed-outline"
            value={confirm}
            onChangeText={setConfirm}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
            placeholder="Re-enter your password"
            secureTextEntry
            autoComplete="new-password"
            error={showError('confirm')}
            success={touched.confirm && !errors.confirm && Boolean(confirm)}
          />
        ) : null}

        {isRegister ? (
          <Pressable
            style={styles.termsRow}
            onPress={() => setAcceptedTerms((v) => !v)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: acceptedTerms }}
          >
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: acceptedTerms ? colors.primary : colors.surface,
                  borderColor: acceptedTerms ? colors.primary : colors.border,
                },
              ]}
            >
              {acceptedTerms ? <Ionicons name="checkmark" size={14} color="#fff" /> : null}
            </View>
            <Text variant="bodySm" color={colors.textBody} style={styles.termsText}>
              I agree to the StudyGenius{' '}
              <Text variant="bodySm" color={colors.primary}>
                Terms of Service
              </Text>{' '}
              and{' '}
              <Text variant="bodySm" color={colors.primary}>
                Privacy Policy
              </Text>
              .
            </Text>
          </Pressable>
        ) : (
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
        )}

        {submitError ? (
          <View style={[styles.errorBox, { backgroundColor: colors.dangerSoft }]}>
            <Ionicons name="alert-circle" size={16} color={colors.danger} />
            <Text variant="bodySm" color={colors.danger} style={styles.errorText}>
              {submitError}
            </Text>
          </View>
        ) : null}

        <Button
          label={isRegister ? 'Create Account' : 'Sign In to StudyGenius'}
          icon="flash"
          loading={pending}
          disabled={!canSubmit}
          onPress={handleSubmit}
        />

        <View style={styles.switchRow}>
          <Text variant="bodySm" color={colors.textMuted}>
            {isRegister ? 'Already have an account? ' : 'New to StudyGenius? '}
          </Text>
          <Pressable onPress={() => switchMode(isRegister ? 'signin' : 'register')}>
            <Text variant="label" color={colors.primary}>
              {isRegister ? 'Sign in' : 'Create one'}
            </Text>
          </Pressable>
        </View>
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
  content: { paddingHorizontal: 16, paddingBottom: 32, gap: 16 },
  title: { marginTop: 4 },
  segments: { marginTop: 4 },
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  hint: { marginTop: 6 },
  rememberRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rememberLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  termsText: { flex: 1, lineHeight: 18 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 12,
  },
  errorText: { flex: 1 },
  switchRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4 },
});
