/**
 * components/IconButton.js — circular icon action (header actions, back, etc.).
 * Minimum 48 dp touch target (proposal §12.1).
 */

import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../theme/ThemeProvider';

export function IconButton({ name, onPress, size = 20, variant = 'soft', label, style }) {
  const theme = useTheme();
  const { colors } = theme;

  const map = {
    soft: { bg: colors.surfaceAlt, fg: colors.textHeading },
    primary: { bg: colors.primary, fg: '#FFFFFF' },
    primarySoft: { bg: colors.primarySoft, fg: colors.primary },
    glass: { bg: 'rgba(255,255,255,0.2)', fg: '#FFFFFF' },
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: map.bg, opacity: pressed ? 0.85 : 1 },
        style,
      ]}
    >
      <View>
        <Ionicons name={name} size={size} color={map.fg} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconButton;
