import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Screen } from '../../src/components/Screen';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { SectionHeader } from '../../src/components/SectionHeader';
import { WeekStrip } from '../../src/features/planner/WeekStrip';
import { SessionCard } from '../../src/features/planner/SessionCard';
import { planner } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function PlannerScreen() {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Study Planner" />
        <WeekStrip days={planner.week} />

        <View style={[styles.focus, { backgroundColor: colors.copilotFrom }]}>
          <View style={styles.focusHead}>
            <Text variant="labelSm" color="#FFFFFF" style={styles.focusLabel}>
              🕐 {planner.focus.label}
            </Text>
            <Badge label={planner.focus.percent} tone="glass" style={styles.glassBadge} />
          </View>
          <Text variant="headlineMd" color="#FFFFFF">
            {planner.load.title}
          </Text>
          <Text variant="bodySm" color="rgba(255,255,255,0.85)">
            {planner.load.detail}
          </Text>
          <View style={styles.loadTrack}>
            <View style={[styles.loadFill, { width: '40%' }]} />
            <View style={styles.loadSegment} />
            <View style={styles.loadSegment} />
          </View>
        </View>

        <SectionHeader title="Scheduled Sessions" action="PST · GMT-8" />

        <View>
          {planner.sessions.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </View>

        <Button label="Add Study Session" icon="add-circle-outline" onPress={() => {}} />

        <Card style={[styles.rec, { backgroundColor: colors.primarySoft }]}>
          <View style={[styles.recIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="bulb-outline" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.flex}>
            <Text variant="label" color={colors.primary} style={styles.recLabel}>
              ⚡ AI RECOMMENDATION
            </Text>
            <Text variant="bodySm" color={colors.textBody}>
              {planner.recommendation}
            </Text>
            <View style={styles.recActions}>
              <Badge label="🗓 Auto-schedule (8:30 AM)" tone="neutral" />
              <Text variant="labelSm" color={colors.textBody}>
                Dismiss
              </Text>
            </View>
          </View>
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  flex: { flex: 1, gap: 6 },
  focus: { borderRadius: 22, padding: 18, gap: 8 },
  focusHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  focusLabel: { letterSpacing: 0.6 },
  glassBadge: { backgroundColor: 'rgba(255,255,255,0.18)' },
  loadTrack: { flexDirection: 'row', gap: 6, marginTop: 6 },
  loadFill: { height: 6, borderRadius: 3, backgroundColor: '#67E8F9' },
  loadSegment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.25)' },
  rec: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  recIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recLabel: { letterSpacing: 0.6 },
  recActions: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4 },
});
