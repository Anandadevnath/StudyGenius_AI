import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Card } from '../../src/components/Card';
import { Badge } from '../../src/components/Badge';
import { Screen } from '../../src/components/Screen';
import { IconButton } from '../../src/components/IconButton';
import { OptionRow } from '../../src/features/quiz/OptionRow';
import { quiz } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function QuizScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;
  const [selected, setSelected] = useState('B');

  return (
    <Screen edges={['top']}>
      <View style={styles.topBar}>
        <IconButton name="arrow-back" onPress={() => router.back()} label="Go back" />
        <Text variant="headlineSm" color={colors.textHeading} style={styles.flex}>
          AI Quiz
        </Text>
        <IconButton name="person" variant="primary" label="Profile" />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Card style={styles.question}>
          <Text variant="labelSm" color={colors.aiAccent} style={styles.topic}>
            💡 {quiz.topic}
          </Text>
          <Text variant="headlineSm" color={colors.textHeading}>
            {quiz.question}
          </Text>
          <View style={styles.hintRow}>
            <Ionicons name="hand-left-outline" size={14} color={colors.textMuted} />
            <Text variant="labelSm" color={colors.textMuted}>
              {quiz.hint}
            </Text>
          </View>
        </Card>

        {quiz.options.map((option) => (
          <OptionRow
            key={option.letter}
            option={option}
            selected={selected === option.letter}
            onPress={() => setSelected(option.letter)}
          />
        ))}

        <Card style={[styles.proTip, { backgroundColor: colors.aiHighlightSoft }]}>
          <View style={[styles.tipIcon, { backgroundColor: colors.aiHighlight }]}>
            <Ionicons name="bulb" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.flex}>
            <View style={styles.tipHead}>
              <Text variant="label" color={colors.aiHighlight}>
                AI PRO TIP
              </Text>
              <View style={styles.verified}>
                <Ionicons name="sparkles" size={12} color={colors.aiAccent} />
                <Text variant="labelSm" color={colors.aiAccent}>
                  Verified
                </Text>
              </View>
            </View>
            <Text variant="bodySm" color={colors.textBody} style={styles.tipText}>
              {quiz.proTip}
            </Text>
          </View>
        </Card>

        <View style={[styles.successRow, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name="people-outline" size={18} color={colors.primary} />
          <Text variant="labelSm" color={colors.textBody}>
            Cohort Success Rate:
          </Text>
          <Badge label={quiz.successRate} tone="primary" />
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: colors.background }]}>
        <IconButton name="flag-outline" variant="soft" label="Report question" />
        <Button
          label="Next Question"
          iconRight="arrow-forward"
          style={styles.flex}
          onPress={() => router.back()}
        />
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
  content: { paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  question: { gap: 10 },
  topic: { letterSpacing: 0.4 },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  proTip: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  verified: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  tipText: { marginTop: 4 },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
  },
  footer: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
});
