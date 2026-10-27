/**
 * components/Screen.js — safe-area screen container with themed background.
 */

import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useTheme } from '../theme/ThemeProvider';

export function Screen({ children, style, edges = ['top'], padded = false }) {
  const theme = useTheme();

  return (
    <SafeAreaView edges={edges} style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={[padded && styles.padded, styles.flex, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  padded: { paddingHorizontal: 16 },
});

export default Screen;
