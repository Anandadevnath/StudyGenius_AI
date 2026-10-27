import { Stack } from 'expo-router';

/**
 * Auth group layout — Login/Register (screen 2) and password reset.
 * Headers are hidden because each screen renders its own custom header.
 */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot-password" />
    </Stack>
  );
}
