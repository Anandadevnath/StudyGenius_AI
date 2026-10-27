/**
 * components/Input.js — labelled text input with validation states.
 * 52–56 dp high, ≥48 dp targets (proposal §12.6, §12.1).
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
  autoComplete,
  returnKeyType,
  onSubmitEditing,
  error,
  success = false,
  rightAccessory,
  editable = true,
  style,
}) {
  const theme = useTheme();
  const { colors } = theme;
  const [hidden, setHidden] = useState(secureTextEntry);
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.danger
    : success
      ? colors.success
      : focused
        ? colors.primary
        : colors.border;

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
            borderColor,
            borderRadius: theme.radii.input,
            borderWidth: focused || error || success ? 1.5 : 1,
            opacity: editable ? 1 : 0.6,
          },
        ]}
      >
        {icon ? <Ionicons name={icon} size={20} color={colors.iconMuted} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={hidden}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          editable={editable}
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
      {error ? (
        <View style={styles.messageRow}>
          <Ionicons name="alert-circle" size={13} color={colors.danger} />
          <Text variant="labelSm" color={colors.danger} style={styles.message}>
            {error}
          </Text>
        </View>
      ) : null}
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
  },
  input: { flex: 1, height: '100%', fontSize: 15 },
  messageRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  message: { flex: 1 },
});

export default Input;
