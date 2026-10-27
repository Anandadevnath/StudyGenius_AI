/**
 * components/SegmentedControl.js — pill segmented switch (Sign In/Register,
 * Concise/Comprehensive).
 */

import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function SegmentedControl({ options, value, onChange, style }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: colors.primarySoft, borderRadius: theme.radii.pill },
        style,
      ]}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange?.(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[
              styles.segment,
              { borderRadius: theme.radii.pill },
              active && { backgroundColor: colors.surface },
            ]}
          >
            <Text variant="label" color={active ? colors.primary : colors.textBody}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row', padding: 4 },
  segment: {
    flex: 1,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SegmentedControl;
