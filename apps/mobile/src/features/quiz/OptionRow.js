/**
 * features/quiz/OptionRow.js — lettered answer option with selected state.
 * Minimum 48 dp touch target (proposal §12.1).
 */

import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { useTheme } from '../../theme/ThemeProvider';

export function OptionRow({ option, selected, onPress }) {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: selected ? colors.primarySoft : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
          borderLeftColor: selected ? colors.primary : colors.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      <View
        style={[styles.letter, { backgroundColor: selected ? colors.primary : colors.surfaceAlt }]}
      >
        <Text variant="label" color={selected ? '#FFFFFF' : colors.textBody}>
          {option.letter}
        </Text>
      </View>
      <Text variant="body" color={colors.textHeading} style={styles.text}>
        {option.text}
      </Text>
      <Ionicons
        name={selected ? 'checkmark-circle' : 'ellipse-outline'}
        size={24}
        color={selected ? colors.primary : colors.border}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  letter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
});

export default OptionRow;
