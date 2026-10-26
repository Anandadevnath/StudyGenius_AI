import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

/**
 * Root layout for StudyGenius AI.
 *
 * PLACEHOLDER ONLY — no authentication logic, session restoration, or
 * navigation guards are implemented yet. This file exists so the Expo Router
 * tree resolves. Feature work is intentionally deferred.
 */
export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="summary" />
        <Stack.Screen name="quiz" />
      </Stack>
    </>
  );
}
