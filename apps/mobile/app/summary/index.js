import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Screen } from '../../src/components/Screen';
import { IconButton } from '../../src/components/IconButton';
import { SummaryHeader } from '../../src/features/summary/SummaryHeader';
import { KeyPointCard } from '../../src/features/summary/KeyPointCard';
import { summary } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function SummaryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  return (
    <Screen edges={['top']}>
      <View style={styles.topBar}>
        <IconButton name="arrow-back" onPress={() => router.back()} label="Go back" />
        <Text variant="headlineSm" color={colors.textHeading} style={styles.flex}>
          AI Summary
        </Text>
        <IconButton name="person" variant="primary" label="Profile" />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <SummaryHeader data={summary} />

        <Card style={[styles.synth, { backgroundColor: colors.aiAccentSoft }]}>
          <View style={styles.synthHead}>
            <Text variant="title" color={colors.textHeading}>
              {summary.synth.title}
            </Text>
            <View style={styles.verified}>
              <Ionicons name="checkmark-circle" size={14} color={colors.aiAccent} />
              <Text variant="labelSm" color={colors.aiAccent}>
                {summary.synth.badge}
              </Text>
            </View>
          </View>
          <Text variant="bodySm" color={colors.textBody}>
            {summary.synth.body}
          </Text>
        </Card>

        <View style={styles.execBlock}>
          <Text variant="title" color={colors.textHeading}>
            📄 Executive Summary
          </Text>
          <Text variant="bodySm" color={colors.textBody} style={styles.execText}>
            {summary.executive}
          </Text>
        </View>

        <View style={styles.keyHead}>
          <Text variant="headlineSm" color={colors.textHeading}>
            ✦ Key Concepts & Important Points
          </Text>
          <Text variant="labelSm" color={colors.textMuted}>
            3 Core Pillars
          </Text>
        </View>

        {summary.keyPoints.map((p) => (
          <KeyPointCard key={p.n} point={p} />
        ))}

        <Card style={[styles.def, { backgroundColor: colors.aiHighlightSoft }]}>
          <Text variant="labelSm" color={colors.aiHighlight} style={styles.defLabel}>
            {summary.definition.label}
          </Text>
          <Text variant="title" color={colors.textHeading}>
            {summary.definition.term}
          </Text>
          <Text variant="bodySm" color={colors.textBody}>
            {summary.definition.body}
          </Text>
        </Card>
      </ScrollView>

      <View
        style={[
          styles.footer,
          { backgroundColor: colors.background, borderTopColor: colors.border },
        ]}
      >
        <Button
          label={`Generate AI Quiz (10 Qs)`}
          icon="help-circle-outline"
          onPress={() => router.push('/quiz')}
        />
        <View style={styles.footerRow}>
          <Button
            label="Save Summary"
            variant="secondary"
            icon="bookmark-outline"
            style={styles.flex}
            onPress={() => {}}
          />
          <Button
            label=""
            variant="outline"
            icon="share-outline"
            fullWidth={false}
            onPress={() => {}}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  flex: { flex: 1 },
  content: { paddingHorizontal: 16, paddingBottom: 140, gap: 14 },
  synth: { gap: 8 },
  synthHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  verified: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  execBlock: { gap: 8, paddingHorizontal: 4 },
  execText: { lineHeight: 21 },
  keyHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  def: { gap: 6 },
  defLabel: { letterSpacing: 0.6, textTransform: 'uppercase' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
  },
  footerRow: { flexDirection: 'row', gap: 10 },
});
