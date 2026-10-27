import { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '../../src/components/Text';
import { Screen } from '../../src/components/Screen';
import { ScreenHeader } from '../../src/components/ScreenHeader';
import { Chip } from '../../src/components/Chip';
import { Badge } from '../../src/components/Badge';
import { IngestionBanner } from '../../src/features/library/IngestionBanner';
import { NoteCard } from '../../src/features/library/NoteCard';
import { WeeklyRecap } from '../../src/features/library/WeeklyRecap';
import { notes, subjects } from '../../src/data/mockData';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function LibraryScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;
  const [activeSubject, setActiveSubject] = useState('all');

  return (
    <Screen edges={['top']}>
      <View style={styles.headerWrap}>
        <ScreenHeader title="Notes Library" />
        <View
          style={[styles.search, { backgroundColor: colors.surface, borderColor: colors.border }]}
        >
          <Ionicons name="search" size={18} color={colors.iconMuted} />
          <TextInput
            placeholder="Search 24 lectures, notes, and summaries"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.searchInput,
              { color: colors.textHeading, fontFamily: theme.fontFamilies.body },
            ]}
          />
          <Ionicons name="mic-outline" size={18} color={colors.primary} />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {subjects.map((s) => (
            <Chip
              key={s.key}
              label={s.label}
              count={s.count}
              active={activeSubject === s.key}
              onPress={() => setActiveSubject(s.key)}
            />
          ))}
        </ScrollView>
        <View style={styles.sortRow}>
          <Badge label="↕  Sort: Recently opened  ⌄" tone="neutral" />
          <View style={styles.viewToggle}>
            <Ionicons name="list" size={18} color={colors.textHeading} />
            <Ionicons name="grid-outline" size={18} color={colors.textMuted} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <IngestionBanner />
        {notes.slice(0, 2).map((n) => (
          <NoteCard key={n.id} note={n} />
        ))}
        <WeeklyRecap />
        {notes.slice(2).map((n) => (
          <NoteCard key={n.id} note={n} />
        ))}
        <View
          style={[
            styles.supported,
            { backgroundColor: colors.primarySoft, borderRadius: theme.radii.card },
          ]}
        >
          <Text variant="labelSm" color={colors.textBody}>
            📄 PDF • 📄 DOCX • 📄 TXT
          </Text>
          <Text variant="labelSm" color={colors.textMuted}>
            Supports PDF, DOCX, TXT up to 50MB
          </Text>
          <Text variant="labelSm" color={colors.textMuted}>
            End-to-end encrypted • AI indexing happens securely
          </Text>
        </View>
      </ScrollView>

      <View style={styles.fabWrap} pointerEvents="box-none">
        <Pressable
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => router.push('/(tabs)/library')}
        >
          <Ionicons name="add-circle" size={22} color="#fff" />
          <Text variant="title" color="#fff">
            Upload Note
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerWrap: { paddingHorizontal: 16, gap: 12 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 48,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filters: { gap: 8, paddingRight: 8 },
  sortRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  viewToggle: { flexDirection: 'row', gap: 12 },
  content: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 120, gap: 12 },
  supported: { alignItems: 'center', gap: 4, padding: 16 },
  fabWrap: { position: 'absolute', bottom: 20, left: 0, right: 0, alignItems: 'center' },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    height: 54,
    borderRadius: 27,
  },
});
