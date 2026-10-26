import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { useAuthStore } from '../src/stores/authStore';

/**
 * Root layout for StudyGenius AI.
 *
 * Starts the Firebase auth session listener on mount so a persisted session is
 * restored (authStore status moves off 'initializing'). Navigation guards are
 * added with the auth screens; this layout only owns session bootstrap.
 */
export default function RootLayout() {
  useEffect(() => {
    useAuthStore.getState().bootstrap();
    return () => useAuthStore.getState().teardown();
  }, []);

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
