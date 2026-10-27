# features/

Feature modules — the supporting components for each screen, kept separate so
screen files stay small and readable (proposal §8.2).

- `dashboard/` — CopilotCard, DailyTargetCard, QuickActions, RecentMaterials.
- `library/` — NoteCard, IngestionBanner, WeeklyRecap.
- `summary/` — SummaryHeader, KeyPointCard.
- `quiz/` — OptionRow (lettered option with selected state).
- `planner/` — WeekStrip, SessionCard.
- `progress/` — StatTile, WeeklyChart, MasteryRow.

Auth screens live entirely under `app/(auth)/` and reuse `src/components/`.
Values are still read from `src/data/mockData.js` until the Firestore/AI
stores are wired.
