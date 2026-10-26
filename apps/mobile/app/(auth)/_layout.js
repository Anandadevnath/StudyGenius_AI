import { Stack } from 'expo-router';

/**
 * Auth group layout (PLACEHOLDER).
 *
 * Proposal ref: Section 6, screen 2 (Login / Register) and Section 5.1
 * (password reset). No Firebase Authentication flows are implemented. This
 * layout only groups the placeholder auth screens for routing.
 */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="register" options={{ title: 'Register' }} />
      <Stack.Screen name="forgot-password" options={{ title: 'Reset Password' }} />
    </Stack>
  );
}
