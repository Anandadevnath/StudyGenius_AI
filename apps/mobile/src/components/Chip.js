/**
 * components/Chip.js — selectable filter chip (subject filters, proposal §6).
 */

import { Pressable, StyleSheet } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function Chip({ label, count, active = false, onPress, style }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: active ? colors.primary : colors.surface,
          borderColor: active ? colors.primary : colors.border,
          borderRadius: theme.radii.pill,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <Text variant="labelSm" color={active ? '#FFFFFF' : colors.textBody}>
        {label}
        {count != null ? `  ${count}` : ''}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
  },
});

export default Chip;
