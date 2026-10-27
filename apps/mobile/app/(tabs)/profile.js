import { useState } from 'react';
import { ScrollView, StyleSheet, View, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Button } from '../../src/components/Button';
import { Screen } from '../../src/components/Screen';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { SegmentedControl } from '../../src/components/SegmentedControl';
import { useTheme } from '../../src/theme/ThemeProvider';
import { useAuthStore } from '../../src/stores/authStore';

export default function ProfileScreen() {
  const theme = useTheme();
  const { colors } = theme;
  const [reminders, setReminders] = useState(true);
  const [summaryStyle, setSummaryStyle] = useState('comprehensive');
  const handleSignOut = () => useAuthStore.getState().logout();

  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader title="Profile & Settings" showBell={false} />

        <Card style={styles.card}>
          <View style={styles.prefHead}>
            <Text variant="headlineSm" color={colors.textHeading}>
              Study Preferences
            </Text>
            <Text variant="labelSm" color={colors.textMuted}>
              Auto-saved
            </Text>
          </View>

          <View style={styles.prefRow}>
            <View style={[styles.prefIcon, { backgroundColor: colors.aiHighlightSoft }]}>
              <Ionicons name="notifications-outline" size={18} color={colors.aiHighlight} />
            </View>
            <View style={styles.flex}>
              <Text variant="title" color={colors.textHeading}>
                Study Notification Reminders
              </Text>
              <Text variant="labelSm" color={colors.textMuted}>
                Daily spaced repetition intervals
              </Text>
            </View>
            <Switch
              value={reminders}
              onValueChange={setReminders}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.prefBlock}>
            <View style={styles.prefRow}>
              <View style={[styles.prefIcon, { backgroundColor: colors.primarySoft }]}>
                <Ionicons name="options-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.flex}>
                <Text variant="title" color={colors.textHeading}>
                  AI Model Tuning
                </Text>
                <Text variant="labelSm" color={colors.textMuted}>
                  Adjust synthesis depth for flash summaries
                </Text>
              </View>
            </View>
            <SegmentedControl
              value={summaryStyle}
              onChange={setSummaryStyle}
              options={[
                { value: 'concise', label: 'Concise Bulleted' },
                { value: 'comprehensive', label: 'Comprehensive' },
              ]}
            />
          </View>

          <View style={styles.prefRow}>
            <View style={[styles.prefIcon, { backgroundColor: colors.aiAccentSoft }]}>
              <Ionicons name="cloud-download-outline" size={18} color={colors.aiAccent} />
            </View>
            <View style={styles.flex}>
              <Text variant="title" color={colors.textHeading}>
                Offline Document Cache
              </Text>
              <Text variant="labelSm" color={colors.textMuted}>
                340 MB stored locally for fast study
              </Text>
            </View>
            <Badge label="Manage" tone="neutral" />
          </View>
        </Card>

        <Button
          label="Sign Out of Account"
          variant="danger"
          icon="log-out-outline"
          onPress={handleSignOut}
        />

        <Card style={[styles.footer, { backgroundColor: colors.primarySoft }]}>
          <View style={[styles.footerIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="sparkles" size={18} color="#FFFFFF" />
          </View>
          <View style={styles.flex}>
            <Text variant="title" color={colors.textHeading}>
              AI Study Companion v2.4
            </Text>
            <Text variant="labelSm" color={colors.textMuted}>
              Token balance: 420,000 / 500,000
            </Text>
          </View>
          <Ionicons name="flash" size={18} color={colors.primary} />
        </Card>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 24, gap: 16 },
  card: { gap: 18 },
  prefHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  prefRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  prefBlock: { gap: 12 },
  prefIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1, gap: 2 },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  footerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
