import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../src/components/Text';
import { Button } from '../src/components/Button';
import { Screen } from '../src/components/Screen';
import { Badge } from '../src/components/Badge';
import { Card } from '../src/components/Card';
import { useTheme } from '../src/theme/ThemeProvider';

const FEATURES = [
  {
    icon: 'document-text',
    tone: 'primary',
    title: 'AI Summaries in Seconds',
    sub: 'Distill 80-page slide decks into high-yield ...',
  },
  {
    icon: 'help-circle',
    tone: 'ai',
    title: 'Smart Active-Recall Quizzes',
    sub: 'Adaptive flashcards built directly from your ...',
  },
  {
    icon: 'calendar',
    tone: 'highlight',
    title: 'Automated Study Scheduling',
    sub: 'Spaced repetition synced automatically to ...',
  },
];

const TONE_BG = {
  primary: 'primarySoft',
  ai: 'aiAccentSoft',
  highlight: 'aiHighlightSoft',
};
const TONE_FG = {
  primary: 'primary',
  ai: 'aiAccent',
  highlight: 'aiHighlight',
};

export default function WelcomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  return (
    <Screen edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.brandRow}>
          <View style={[styles.logo, { backgroundColor: colors.primarySoft }]}>
            <Ionicons name="school" size={20} color={colors.primary} />
          </View>
          <View style={styles.flex}>
            <Text variant="headlineSm" color={colors.textHeading}>
              StudyGenius{' '}
              <Text variant="headlineSm" color={colors.primary}>
                AI
              </Text>
            </Text>
            <Text variant="labelXs" color={colors.textMuted} style={styles.letterSpacing}>
              SMART STUDY COMPANION
            </Text>
          </View>
          <Badge label="⚡ v2.4 Pro" tone="primary" />
        </View>

        <View style={[styles.hero, { backgroundColor: colors.primarySoft }]}>
          <View style={styles.heroIllustration}>
            <Ionicons name="sparkles" size={64} color={colors.primary} />
            <Ionicons name="book" size={72} color={colors.primaryPressed} style={styles.book} />
          </View>
          <Badge label="●  Personalized Adaptive Model Active" tone="neutral" />
        </View>

        <View style={styles.centerRow}>
          <Badge label="✦  Next-Gen Exam Prep" tone="highlight" />
        </View>

        <Text variant="display" color={colors.textHeading} style={styles.title}>
          Study Smarter, Not Harder
        </Text>
        <Text variant="body" color={colors.textBody} style={styles.subtitle}>
          Transform dense university lectures, textbooks, and notes into instant mastery with
          real-time AI synergy.
        </Text>

        {FEATURES.map((f) => (
          <Card key={f.title} style={styles.feature}>
            <View style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors[TONE_BG[f.tone]] }]}>
                <Ionicons name={f.icon} size={22} color={colors[TONE_FG[f.tone]]} />
              </View>
              <View style={styles.flex}>
                <Text variant="title" color={colors.textHeading}>
                  {f.title}
                </Text>
                <Text variant="bodySm" color={colors.textMuted}>
                  {f.sub}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </Card>
        ))}

        <View style={styles.dots}>
          <View style={[styles.dot, styles.dotActive, { backgroundColor: colors.primary }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
          <View style={[styles.dot, { backgroundColor: colors.border }]} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label="Get Started Free"
          iconRight="arrow-forward"
          onPress={() => router.push('/(auth)/login')}
        />
        <View style={styles.signInRow}>
          <Text variant="body" color={colors.textBody}>
            I already have an account ·{' '}
          </Text>
          <Text variant="title" color={colors.primary} onPress={() => router.push('/(auth)/login')}>
            Sign In
          </Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 16, paddingBottom: 16, gap: 16 },
  flex: { flex: 1 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 8 },
  logo: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  letterSpacing: { letterSpacing: 1, marginTop: 1 },
  hero: { height: 220, borderRadius: 24, alignItems: 'center', justifyContent: 'center', gap: 14 },
  heroIllustration: { alignItems: 'center' },
  book: { marginTop: -18 },
  centerRow: { alignItems: 'center' },
  title: { textAlign: 'center' },
  subtitle: { textAlign: 'center', paddingHorizontal: 8 },
  feature: { padding: 14 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 4 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  dotActive: { width: 22 },
  footer: { padding: 16, gap: 14 },
  signInRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
});
