import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Screen } from '../../src/components/Screen';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { SectionHeader } from '../../src/components/SectionHeader';
import { CopilotCard } from '../../src/features/dashboard/CopilotCard';
import { DailyTargetCard } from '../../src/features/dashboard/DailyTargetCard';
import { QuickActions } from '../../src/features/dashboard/QuickActions';
import { RecentMaterials } from '../../src/features/dashboard/RecentMaterials';
import { dashboard, quickActions, recentMaterials } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  const onQuickAction = (key) => {
    if (key === 'summary') router.push('/summary');
    else if (key === 'quiz') router.push('/quiz');
    else if (key === 'planner') router.push('/(tabs)/planner');
    else if (key === 'upload') router.push('/(tabs)/library');
  };

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Home Dashboard" />

        <CopilotCard prompt={dashboard.copilotPrompt} />
        <DailyTargetCard target={dashboard.dailyTarget} streakDays={dashboard.streakDays} />

        <SectionHeader title="Quick Workflows" action="INSTANT ACTIONS" />
        <QuickActions actions={quickActions} onAction={onQuickAction} />

        <Pressable
          style={[
            styles.nextUp,
            { backgroundColor: colors.primarySoft, borderRadius: theme.radii.card },
          ]}
          onPress={() => router.push('/(tabs)/planner')}
        >
          <View style={styles.nextUpIcon}>
            <Ionicons name="time-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.flex}>
            <Text variant="labelSm" color={colors.primary} style={styles.uppercase}>
              UP NEXT • {dashboard.nextUp.inLabel}
            </Text>
            <Text variant="title" color={colors.textHeading}>
              {dashboard.nextUp.title}
            </Text>
            <Text variant="labelSm" color={colors.textMuted}>
              {dashboard.nextUp.when}
            </Text>
          </View>
          <View style={[styles.toggleOn, { backgroundColor: colors.primary }]}>
            <View style={styles.toggleKnob} />
          </View>
        </Pressable>

        <SectionHeader
          title="Recent Materials"
          action="View All"
          onPressAction={() => router.push('/(tabs)/library')}
        />
        <RecentMaterials materials={recentMaterials} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  flex: { flex: 1, gap: 2 },
  nextUp: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 },
  nextUpIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uppercase: { letterSpacing: 0.6, textTransform: 'uppercase' },
  toggleOn: {
    width: 46,
    height: 26,
    borderRadius: 13,
    padding: 3,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  toggleKnob: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },
});
