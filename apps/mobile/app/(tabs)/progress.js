import { ScrollView, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { StatTile } from '../../src/features/progress/StatTile';
import { WeeklyChart } from '../../src/features/progress/WeeklyChart';
import { MasteryRow } from '../../src/features/progress/MasteryRow';
import { progress } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function ProgressScreen() {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Progress & Profile" />

        <Card style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={[styles.badge, { backgroundColor: colors.primarySoft }]}>
              <Ionicons name="school" size={18} color={colors.primary} />
            </View>
            <View style={styles.flex}>
              <Text variant="title" color={colors.textHeading}>
                {progress.name}
              </Text>
              <Badge label="🎖 Dean's Honor Roll" tone="primary" />
            </View>
          </View>
          <View style={[styles.synapse, { backgroundColor: colors.surfaceAlt }]}>
            <View style={styles.synapseLeft}>
              <View style={[styles.dot, { backgroundColor: colors.aiAccent }]} />
              <Text variant="labelSm" color={colors.textBody}>
                Synapses Connected
              </Text>
            </View>
            <Text variant="label" color={colors.primary}>
              Gemini 1.5 Flash Turbo
            </Text>
          </View>
        </Card>

        <View style={styles.statsGrid}>
          {progress.stats.map((s) => (
            <StatTile key={s.key} stat={s} />
          ))}
        </View>

        <WeeklyChart data={progress.weekly} />

        <Card style={styles.mastery}>
          <View style={styles.masteryHead}>
            <Text variant="headlineSm" color={colors.textHeading}>
              Subject-wise Mastery
            </Text>
            <Ionicons name="stats-chart" size={18} color={colors.primary} />
          </View>
          <Text variant="labelSm" color={colors.textMuted}>
            Real-time dynamic adaptive retention
          </Text>
          <View style={styles.masteryList}>
            {progress.mastery.map((m) => (
              <MasteryRow key={m.subject} item={m} />
            ))}
          </View>
        </Card>

        <Button
          label="Sign Out of Account"
          variant="danger"
          icon="log-out-outline"
          onPress={() => {}}
        />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  flex: { flex: 1, gap: 4 },
  profileCard: { gap: 14 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  synapse: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 14,
  },
  synapseLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  mastery: { gap: 12 },
  masteryHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  masteryList: { gap: 16, marginTop: 4 },
});
