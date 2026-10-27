/**
 * components/ProgressBar.js — horizontal progress bar (mastery, study load).
 */

import { StyleSheet, View } from 'react-native';

import { useTheme } from '../theme/ThemeProvider';

export function ProgressBar({ progress = 0, color, height = 8, trackColor, style }) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: height / 2,
          backgroundColor: trackColor ?? theme.colors.surfaceAlt,
        },
        style,
      ]}
    >
      <View
        style={{
          width: `${clamped * 100}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: color ?? theme.colors.primary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
});

export default ProgressBar;
