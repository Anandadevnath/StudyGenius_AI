# components/

Reusable presentational UI consumed by the screens (proposal §6, §12.6).
All components read the active theme via `useTheme()`.

- `Text.js` — themed text with variants (display, headline, title, body, label).
- `Screen.js` — safe-area screen container with the themed background.
- `Button.js` — primary / secondary / outline / ghost / danger button (48 dp+).
- `Card.js` — rounded surface card (16–24 dp radius, soft shadow).
- `Input.js` — labelled input with icon and password show/hide.
- `Badge.js` — small status pill (primary, success, warning, ai, highlight).
- `Chip.js` — selectable filter chip (subject filters).
- `IconButton.js` — circular icon action (44 dp).
- `Avatar.js` — circular avatar (initials or icon).
- `SectionHeader.js` — section title with optional right action.
- `ScreenHeader.js` — "STUDYGENIUS AI / <Title>" header with bell + avatar.
- `SegmentedControl.js` — pill segmented switch.
- `ProgressRing.js` — circular progress (daily target).
- `ProgressBar.js` — horizontal progress (mastery, reading progress).
