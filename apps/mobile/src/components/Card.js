/**
 * components/Card.js — rounded surface card (16–24 dp radius, proposal §12.6).
 */

import { Pressable, StyleSheet, View } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

export function Card({
  children,
  style,
  onPress,
  padded = true,
  variant = 'surface',
  radius = 'card',
}) {
  const theme = useTheme();
  const bg = variant === 'alt' ? theme.colors.surfaceAlt : theme.colors.surface;

  const content = (
    <View
      style={[
        styles.base,
        {
          backgroundColor: bg,
          borderRadius: theme.radii[radius] ?? theme.radii.card,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: theme.colors.border,
          padding: padded ? 16 : 0,
        },
        theme.shadows.card,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
  pressed: { opacity: 0.92 },
});

export default Card;
