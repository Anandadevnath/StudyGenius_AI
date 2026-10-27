/**
 * components/SectionHeader.js — section title with optional right action.
 */

import { Pressable, StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function SectionHeader({ title, action, onPressAction, eyebrow, style }) {
  const theme = useTheme();

  return (
    <View style={[styles.base, style]}>
      <View style={styles.left}>
        {eyebrow ? (
          <Text variant="labelSm" color={theme.colors.textMuted} style={styles.eyebrow}>
            {eyebrow}
          </Text>
        ) : null}
        <Text variant="headlineSm" color={theme.colors.textHeading}>
          {title}
        </Text>
      </View>
      {action ? (
        <Pressable onPress={onPressAction} accessibilityRole="button">
          <Text variant="label" color={theme.colors.primary}>
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  left: { flex: 1 },
  eyebrow: { textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 },
});

export default SectionHeader;
