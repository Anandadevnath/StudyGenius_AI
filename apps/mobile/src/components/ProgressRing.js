/**
 * components/ProgressRing.js — circular progress indicator (daily target).
 */

import { StyleSheet, View } from 'react-native';

import { Text } from './Text';
import { useTheme } from '../theme/ThemeProvider';

export function ProgressRing({ progress = 0, size = 64, thickness = 7, label, sublabel }) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));
  const inner = size - thickness * 2;

  return (
    <View
      style={[
        styles.base,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: theme.colors.primarySoft,
          borderWidth: thickness,
        },
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            width: inner,
            height: inner,
            borderRadius: inner / 2,
            borderColor: theme.colors.primary,
            borderWidth: thickness,
            borderRightColor: 'transparent',
            borderBottomColor: 'transparent',
            transform: [{ rotate: `${clamped * 360 - 45}deg` }],
            position: 'absolute',
            top: -thickness,
            left: -thickness,
          },
        ]}
      />
      <View style={styles.center}>
        <Text variant="title" color={theme.colors.primary}>
          {label ?? `${Math.round(clamped * 100)}%`}
        </Text>
        {sublabel ? (
          <Text variant="labelXs" color={theme.colors.textMuted}>
            {sublabel}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center' },
  inner: {},
  center: { alignItems: 'center' },
});

export default ProgressRing;
