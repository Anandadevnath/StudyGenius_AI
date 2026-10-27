/**
 * components/Avatar.js — circular user avatar (initials or icon).
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function Avatar({ initials, size = 40, variant = 'primary', icon }) {
  const theme = useTheme();
  const bg = variant === 'primary' ? theme.colors.primary : theme.colors.primarySoft;
  const fg = variant === 'primary' ? '#FFFFFF' : theme.colors.primary;

  return (
    <View
      style={[
        styles.base,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
      ]}
    >
      {icon ? (
        <Ionicons name={icon} size={size * 0.5} color={fg} />
      ) : (
        <Text variant="title" color={fg}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
});

export default Avatar;
