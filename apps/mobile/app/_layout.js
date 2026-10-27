import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';

import { ThemeProvider } from '../src/theme/ThemeProvider';
import { useAuthStore } from '../src/stores/authStore';

/**
 * Loads the design-system fonts before the first paint so headings render in
 * Plus Jakarta Sans (proposal §12.6). The app always renders after at most a
 * short delay; if font loading fails the system font is used as a fallback.
 */
function useDesignFonts() {
  const [loaded] = useFonts({
    PlusJakartaSans: require('../assets/fonts/PlusJakartaSans.ttf'),
    Inter: require('../assets/fonts/Inter.ttf'),
  });
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    // Safety net: never block the app for more than 1.5s on font loading.
    const timer = setTimeout(() => setTimedOut(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return loaded || timedOut;
}

/**
 * Protected-route guard (proposal workstream: Navigation & core screens).
 * Sends unauthenticated users to login and authenticated users into the app.
 * The welcome screen (index) stays public; auth screens stay public.
 */
function useAuthRedirect() {
  const status = useAuthStore((s) => s.status);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (status === 'initializing') {
      return;
    }

    const inAuthGroup = segments[0] === '(auth)';
    const onWelcome = segments.length === 0;
    const isSignedIn = status === 'signedIn';

    if (!isSignedIn && !inAuthGroup && !onWelcome) {
      router.replace('/(auth)/login');
    } else if (isSignedIn && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [status, segments, router]);
}

export default function RootLayout() {
  const fontsReady = useDesignFonts();
  useAuthRedirect();

  useEffect(() => {
    useAuthStore.getState().bootstrap();
    return () => useAuthStore.getState().teardown();
  }, []);

  if (!fontsReady) {
    return <View style={{ flex: 1, backgroundColor: '#F7F8FC' }} />;
  }

  return (
    <ThemeProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="summary/index" />
        <Stack.Screen name="quiz/index" />
      </Stack>
    </ThemeProvider>
  );
}
