/**
 * features/dashboard/QuickActions.js — 2x2 quick-action tiles.
 */

import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../components/Text';
import { Card } from '../../components/Card';
import { useTheme } from '../../theme/ThemeProvider';

const TONE_BG = { primary: 'primarySoft', ai: 'aiAccentSoft', highlight: 'aiHighlightSoft' };
const TONE_FG = { primary: 'primary', ai: 'aiAccent', highlight: 'aiHighlight' };

export function QuickActions({ actions, onAction }) {
  const theme = useTheme();

  return (
    <View style={styles.grid}>
      {actions.map((a) => (
        <Card key={a.key} style={styles.tile} onPress={() => onAction?.(a.key)}>
          <View style={[styles.icon, { backgroundColor: theme.colors[TONE_BG[a.tone]] }]}>
            <Ionicons name={a.icon} size={20} color={theme.colors[TONE_FG[a.tone]]} />
          </View>
          <Text variant="title" color={theme.colors.textHeading} style={styles.label}>
            {a.label}
          </Text>
          <Text variant="labelSm" color={theme.colors.textMuted}>
            {a.sub}
          </Text>
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: { flexGrow: 1, flexBasis: '47%', padding: 14, gap: 8 },
  icon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  label: { marginTop: 2 },
});

export default QuickActions;
