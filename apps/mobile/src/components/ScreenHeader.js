/**
 * components/ScreenHeader.js — app header with title, notification bell, avatar.
 * Mirrors the "STUDYGENIUS AI / <Title>" header in the mockups.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from './Text';
import { Avatar } from './Avatar';
import { useTheme } from '../theme/ThemeProvider';

export function ScreenHeader({ title, eyebrow = 'STUDYGENIUS AI', showBell = true, style }) {
  const theme = useTheme();

  return (
    <View style={[styles.base, style]}>
      <View style={styles.titleWrap}>
        <View style={styles.mark}>
          <Ionicons name="school" size={16} color={theme.colors.primary} />
        </View>
        <View>
          <Text variant="labelXs" color={theme.colors.primary} style={styles.eyebrow}>
            {eyebrow}
          </Text>
          <Text variant="headlineSm" color={theme.colors.textHeading}>
            {title}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        {showBell ? (
          <Ionicons name="notifications-outline" size={22} color={theme.colors.textHeading} />
        ) : null}
        <Avatar icon="person" size={38} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  titleWrap: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mark: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyebrow: { letterSpacing: 1, marginBottom: 1 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 14 },
});

export default ScreenHeader;
