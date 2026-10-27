/**
 * components/Input.js — labelled text input (52–56 dp high, proposal §12.6).
 */

import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function Input({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = 'none',
  rightAccessory,
  style,
}) {
  const theme = useTheme();
  const { colors } = theme;
  const [hidden, setHidden] = useState(secureTextEntry);

  return (
    <View style={style}>
      {label ? (
        <Text variant="title" color={colors.textHeading} style={styles.label}>
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.field,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: theme.radii.input,
          },
        ]}
      >
        {icon ? <Ionicons name={icon} size={20} color={colors.iconMuted} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, { color: colors.textHeading, fontFamily: theme.fontFamilies.body }]}
        />
        {secureTextEntry ? (
          <Pressable onPress={() => setHidden((h) => !h)} accessibilityLabel="Toggle password">
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color={colors.iconMuted}
            />
          </Pressable>
        ) : (
          rightAccessory
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 8 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 54,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  input: { flex: 1, height: '100%', fontSize: 15 },
});

export default Input;
