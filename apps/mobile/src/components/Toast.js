/**
 * components/Toast.js — animated, app-wide toast notifications.
 *
 * A single provider owns the visible toast; any screen calls `useToast()` to
 * show a success/error/info message. Modeled on the professional feedback used
 * across the app (register, login, logout, and error states).
 */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

const ToastContext = createContext(null);

const ICONS = {
  success: 'checkmark-circle',
  error: 'alert-circle',
  info: 'information-circle',
};

/**
 * @param {{tone?: 'success'|'error'|'info', title: string, message?: string}} options
 */
function ToastItem({ tone, title, message, onDone }) {
  const theme = useTheme();
  const { colors } = theme;
  const [translateY] = useState(() => new Animated.Value(-120));
  const [opacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, bounciness: 8 }),
      Animated.timing(opacity, { toValue: 1, duration: 180, useNativeDriver: true }),
    ]).start();

    return () => {
      translateY.stopAnimation();
      opacity.stopAnimation();
    };
  }, [translateY, opacity]);

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -120, duration: 220, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) {
        onDone();
      }
    });
  }, [translateY, opacity, onDone]);

  const toneColor = {
    success: colors.success,
    error: colors.danger,
    info: colors.primary,
  }[tone];

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: colors.surface,
          borderLeftColor: toneColor,
          transform: [{ translateY }],
          opacity,
        },
        theme.shadows.card,
      ]}
    >
      <Ionicons name={ICONS[tone] ?? ICONS.info} size={22} color={toneColor} />
      <View style={styles.body}>
        <Text variant="title" color={colors.textHeading}>
          {title}
        </Text>
        {message ? (
          <Text variant="bodySm" color={colors.textBody} numberOfLines={2}>
            {message}
          </Text>
        ) : null}
      </View>
      <Pressable onPress={dismiss} accessibilityLabel="Dismiss notification" hitSlop={10}>
        <Ionicons name="close" size={18} color={colors.textMuted} />
      </Pressable>
    </Animated.View>
  );
}

export function ToastProvider({ children }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState(null);
  const timer = useRef(null);

  const showToast = useCallback((options) => {
    const { duration = 3200 } = options;
    setToast({ tone: 'info', ...options });
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => setToast(null), duration);
  }, []);

  const hideToast = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      {toast ? (
        <View pointerEvents="box-none" style={[styles.layer, { top: insets.top + 8 }]}>
          <ToastItem key={toast.id ?? toast.title} {...toast} onDone={() => setToast(null)} />
        </View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Safe fallback so a component never crashes outside the provider.
    return { showToast: () => {}, hideToast: () => {} };
  }
  return ctx;
}

const styles = StyleSheet.create({
  layer: { position: 'absolute', left: 16, right: 16, zIndex: 1000 },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 16,
    borderLeftWidth: 5,
  },
  body: { flex: 1, gap: 2 },
});

export default ToastProvider;
