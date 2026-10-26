# Data Model (planned — NOT implemented)

> **Status:** Documentation only. No Firestore collections, security rules,
> or data-access code exist yet. This records the proposal's planned schema
> (Section 10) so implementation can follow it later.

## Overview

All user-owned documents are scoped to the authenticated user's UID. Every
document carries `ownerUid`, which keeps Firestore security rules simple:

```
resource.data.ownerUid == request.auth.uid
```

Data is stored in **top-level collections** (not deep subcollections) so
cross-cutting queries stay simple — e.g. listing all quiz attempts for the
progress screen without traversing each quiz. Quiz questions are embedded as
an array of maps inside the quiz document because they are always read with
the quiz and never queried individually.

## Collections

| Collection | Fields (type) |
| --- | --- |
| `users` | `uid` (string), `displayName` (string), `email` (string), `theme` (string), `createdAt` (timestamp) |
| `notes` | `noteId` (string), `ownerUid` (string), `title` (string), `filePath` (string), `fileType` (string), `createdAt` (timestamp), `status` (string) |
| `summaries` | `summaryId` (string), `ownerUid` (string), `noteId` (string, ref), `content` (string), `createdAt` (timestamp) |
| `quizzes` | `quizId` (string), `ownerUid` (string), `noteId` (string, ref), `topic` (string), `difficulty` (string), `questions` (array of maps), `createdAt` (timestamp) |
| `quizAttempts` | `attemptId` (string), `ownerUid` (string), `quizId` (string, ref), `answers` (array), `score` (number), `completedAt` (timestamp) |
| `studyPlans` | `planId` (string), `ownerUid` (string), `examDate` (timestamp), `topics` (array of strings), `tasks` (array of maps), `createdAt` (timestamp), `updatedAt` (timestamp) |
| `reminders` | `reminderId` (string), `ownerUid` (string), `title` (string), `scheduledAt` (timestamp), `enabled` (boolean) |

## Relationships

```
                    USERS (uid, email, theme)
                      │
     ┌────────────────┼─────────────────┬───────────────┐
  NOTES           STUDY PLANS        REMINDERS
  noteId,        planId, tasks,     reminderId,
  ownerUid,      ownerUid           scheduledAt
  filePath
     │
     ├── SUMMARIES (summaryId, noteId, content)
     └── QUIZZES (quizId, noteId, questions)
              │
              └── QUIZ ATTEMPTS (attemptId, quizId, ownerUid, score)
```

## Planned queries

- Notes for the current user, ordered by `createdAt`, with pagination.
- Summaries and quizzes for a given `noteId`.
- Quiz attempts for the current user, ordered by `completedAt`.
- Study plans for the current user, ordered by `examDate`.
- Enabled reminders for the current user.

## Security (planned)

- Firestore rules require authentication and enforce user ownership for reads
  and writes.
- Storage rules restrict access to each user's files and validate allowed
  paths and file limits where supported.
- The backend verifies Firebase ID tokens before accepting AI requests.
- API secrets and service-account credentials must never be in the mobile
  bundle or committed to Git.
