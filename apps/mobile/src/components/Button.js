/**
 * components/Button.js — primary/secondary/ghost button with icon support.
 * Minimum 48 dp touch target (proposal §12.1).
 */

import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = true,
  size = 'md',
  style,
}) {
  const theme = useTheme();
  const { colors } = theme;

  const palette = {
    primary: { bg: colors.primary, fg: '#FFFFFF', border: colors.primary },
    secondary: { bg: colors.primarySoft, fg: colors.primary, border: 'transparent' },
    ghost: { bg: 'transparent', fg: colors.primary, border: 'transparent' },
    danger: { bg: colors.dangerSoft, fg: colors.danger, border: 'transparent' },
    outline: { bg: colors.surface, fg: colors.textHeading, border: colors.border },
  }[variant];

  const height = size === 'lg' ? 56 : size === 'sm' ? 44 : 52;
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.base,
        {
          height,
          backgroundColor: palette.bg,
          borderColor: palette.border,
          borderWidth: palette.border === 'transparent' ? 0 : 1,
          borderRadius: theme.radii.button,
          opacity: isDisabled ? 0.55 : pressed ? 0.9 : 1,
          width: fullWidth ? '100%' : undefined,
        },
        variant === 'primary' && !isDisabled ? theme.shadows.primary : null,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={palette.fg} />
      ) : (
        <View style={styles.content}>
          {icon ? <Ionicons name={icon} size={18} color={palette.fg} /> : null}
          <Text variant="title" color={palette.fg} style={styles.label}>
            {label}
          </Text>
          {iconRight ? <Ionicons name={iconRight} size={18} color={palette.fg} /> : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  label: { letterSpacing: 0.2 },
});

export default Button;
