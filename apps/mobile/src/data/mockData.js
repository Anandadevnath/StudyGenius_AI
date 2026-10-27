/**
 * data/mockData.js — placeholder content for UI-first screens.
 *
 * PROPOSAL NOTICE: These are mock values used to render the UI before the
 * Firestore/AI backend is wired. They are clearly isolated here so screens can
 * later read from notesStore / aiStore / planStore instead. No screen claims
 * this data is real.
 */

export const dashboard = {
  user: { name: 'Ananda', initials: 'AN' },
  copilotPrompt: 'Explain Byzantine Fault Tolerance',
  dailyTarget: {
    percent: 0.75,
    done: '2.5',
    goal: '3.2',
    remaining: '42 mins left to finish dail...',
  },
  streakDays: 5,
  nextUp: {
    title: 'OS Virtual Memory review',
    when: 'Scheduled for 3:00 PM today',
    inLabel: 'IN 45 MINS',
  },
};

export const quickActions = [
  {
    key: 'upload',
    label: 'Upload Notes',
    sub: 'PDF, audio, or slides',
    icon: 'document-text',
    tone: 'primary',
  },
  {
    key: 'quiz',
    label: 'Generate Quiz',
    sub: 'AI test with 10 questions',
    icon: 'help-circle',
    tone: 'highlight',
  },
  {
    key: 'summary',
    label: 'Create Summary',
    sub: 'Executive bullet points',
    icon: 'reader',
    tone: 'ai',
  },
  {
    key: 'planner',
    label: 'Study Planner',
    sub: 'Exam schedules & pacing',
    icon: 'calendar',
    tone: 'primary',
  },
];

export const recentMaterials = [
  {
    id: 'n1',
    title: 'Distributed Systems – Lecture 8: Consensus Protocols',
    meta: 'PDF • 14 PGS',
    tags: ['Raft, Paxos & Split-brain scenarios'],
    badge: '94% reten.',
    studided: 'Studied 2 hrs ago',
    fileType: 'PDF',
  },
  {
    id: 'n2',
    title: 'Database Normalization – BCNF vs BASE',
    meta: 'DOCX • 8 PGS',
    tags: ['Eventual consistency trade-offs'],
    badge: '88% reten.',
    studided: 'Studied Yesterday',
    fileType: 'DOCX',
  },
];

export const subjects = [
  { key: 'all', label: 'All', count: 24 },
  { key: 'cs', label: 'Computer Science', count: 12 },
  { key: 'alg', label: 'Algorithms' },
];

export const notes = [
  {
    id: 'lib1',
    title: 'Distributed Systems – Raft & ...',
    course: 'CS 401',
    meta: '14 pages • 2 hrs ago',
    fileType: 'PDF',
    badge: { label: 'AI Summary Ready', tone: 'highlight' },
    actions: [{ label: 'Study', icon: 'book' }],
  },
  {
    id: 'lib2',
    title: 'Relational Schema Normaliza...',
    course: 'CS 330',
    meta: '9 pages • Yesterday',
    fileType: 'DOCX',
    badge: { label: 'Quiz Available (85%)', tone: 'ai' },
    actions: [{ label: 'Retake Quiz', icon: 'help-circle' }],
  },
  {
    id: 'lib3',
    title: 'Dynamic Programming Mem...',
    course: 'CS 302',
    meta: '4 pages • Oct 12',
    fileType: 'TXT',
    badge: { label: 'Processed', tone: 'success' },
    actions: [{ label: 'Synthesize', icon: 'sparkles' }],
  },
  {
    id: 'lib4',
    title: 'Network Layer Routing Proto...',
    course: 'CS 420',
    meta: '28 pages • Oct 9',
    fileType: 'PDF',
    badge: { label: 'AI Summary Ready', tone: 'highlight' },
    actions: [{ label: 'Study', icon: 'book' }],
  },
];

export const summary = {
  course: 'CS 401 • ADVANCED DISTRIBUTED SYSTEMS',
  title: 'Distributed Systems – Lecture 8: Consensus Protocols & Raft Algorithm',
  readPercent: 0.78,
  readLabel: '78% read',
  timeLeft: '4 min remaining',
  synth: {
    title: 'Executive AI Synthesis',
    body: 'Distilled from 24 slides. High-yield exam focus.',
    badge: 'Verified',
  },
  executive:
    'Consensus protocols resolve state consistency across unreliable distributed nodes facing arbitrary network delays and partial partitions. In distributed architectures, split-brain failure modes occur when disconnected subgroups independently designate active leaders, resulting in conflicting writes and a catastrophic log divergence. The Raft algorithm counters this vulnerability by decomposing distributed consensus into distinct, verifiable phases: strict leader election, structured log replication via majority quorums, and persistent safety invariant verification.',
  keyPoints: [
    {
      n: 1,
      title: 'Leader Election & Heartbeat Dynamics',
      body: 'A cluster functions under an active leader transmitting recurring heartbeats. If followers experience heartbeat timeouts, they transition to candidate state. Raft mandates randomized election timeouts (150–300ms) to deliberately desynchronize candidate transitions and preclude repetitive split-vote stalemates.',
      chips: ['150–300ms window', 'Heartbeat ping'],
    },
    {
      n: 2,
      title: 'Log Replication & Majority Commitment',
      body: 'Client commands flow exclusively through the active leader. The leader appends commands into its local log, broadcasts AppendEntries RPCs, and commits entries solely when acknowledged by a strict majority quorum before applying changes to the state machine.',
      formula: 'Quorum Match: Q = ⌊N/2⌋ + 1',
    },
    {
      n: 3,
      title: 'Safety Invariants & State Consistency',
      body: 'Guaranteed via three immutable axioms: Election Safety (at most one leader per term), Leader Append-Only (a leader never overwrites or truncates its log entries), and the Log Matching Invariant (identical term and index guarantee matching preceding sequence).',
    },
  ],
  definition: {
    label: 'HIGHLIGHTED DEFINITION • Exam High-Yield',
    term: 'Quorum (Consensus Majority)',
    body: 'A majority subset of active cluster nodes — formally expressed as (N/2 + 1) — required to guarantee log consistency and resist network partitions, enabling resilience against up to F simultaneous node crashes in an overall topology of 2F + 1 nodes.',
  },
};

export const quiz = {
  topic: 'Raft Protocol Fundamentals',
  question:
    'In the Raft consensus protocol, why are election timeouts randomized between 150ms and 300ms?',
  hint: 'Select the single best answer to lock in term state',
  options: [
    { letter: 'A', text: 'To reduce network bandwidth consumption during idle states.' },
    {
      letter: 'B',
      text: 'To prevent split-vote scenarios where multiple followers become candidates simultaneously.',
      correct: true,
    },
    { letter: 'C', text: 'To ensure Byzantine nodes are automatically excluded from the cluster.' },
    { letter: 'D', text: 'To allow followers enough time to replicate uncommitted log entries.' },
  ],
  proTip:
    'Split votes trigger repeated election rounds without a decisive leader, delaying consensus and stalling client write availability. Randomization breaks election ties immediately.',
  successRate: '84% answered correctly',
};

export const planner = {
  week: [
    { day: 'Mon', date: 14 },
    { day: 'Tue', date: 15 },
    { day: 'Wed', date: 16, active: true },
    { day: 'Thu', date: 17 },
    { day: 'Fri', date: 18 },
    { day: 'Sat', date: 19 },
    { day: 'Sun', date: 20 },
  ],
  focus: { label: 'WEDNESDAY FOCUS', percent: '40% Complete' },
  load: { title: "Today's Study Load", detail: '3 Sessions · 2.5 hrs planned · 1 completed' },
  sessions: [
    {
      id: 's1',
      time: '09:00 AM - 10:00 AM',
      status: 'Completed',
      title: 'Distributed Systems – Raft Review',
      tags: ['CS 401', 'Consensus & RPCs'],
      done: true,
    },
    {
      id: 's2',
      time: '02:00 PM - 03:00 PM',
      status: 'Up Next · In 30 mins',
      title: 'Database Normalization (BCNF vs 3NF)',
      tags: ['CS 330'],
      remind: 'Reminder ON',
      primary: true,
    },
    {
      id: 's3',
      time: '04:30 PM - 05:00 PM',
      status: 'Spaced Repetition',
      title: 'Dynamic Programming Flashcard Drill',
      tags: ['CS 302', '24 Flashcards'],
    },
  ],
  recommendation:
    'Schedule a 15-min recap tomorrow morning for Raft protocols to reach 95% retention before your Friday quiz.',
};

export const progress = {
  name: 'Ananda Dev Nath',
  stats: [
    {
      key: 'time',
      label: 'STUDY TIME',
      value: '48.5h',
      sub: '↗ +12% this week',
      icon: 'time',
      tone: 'primary',
    },
    {
      key: 'docs',
      label: 'DOCS READ',
      value: '38',
      sub: '4 pending sync',
      icon: 'document',
      tone: 'ai',
    },
    {
      key: 'quiz',
      label: 'QUIZZES',
      value: '52',
      sub: '100% evaluated',
      icon: 'help',
      tone: 'highlight',
    },
    {
      key: 'mastery',
      label: 'AVG MASTERY',
      value: '89.4%',
      sub: 'Top 5% Cohort',
      icon: 'stats',
      tone: 'highlight',
    },
  ],
  weekly: {
    title: 'Weekly Study Rhythm',
    sub: 'Hours logged by active session',
    badge: '14-Day Streak',
    bars: [
      { day: 'M', hours: '1.8h', value: 0.35 },
      { day: 'T', hours: '2.4h', value: 0.48 },
      { day: 'W', hours: '3.1h', value: 0.62 },
      { day: 'Th', hours: 'Peak', value: 0.95, peak: true },
      { day: 'F', hours: '2.0h', value: 0.4 },
      { day: 'Sa', hours: '3.8h', value: 0.8 },
      { day: 'Su', hours: '1.5h', value: 0.3 },
    ],
    legend: [
      { label: 'Deep Work (82%)', tone: 'primary' },
      { label: 'Quiz Recall (18%)', tone: 'ai' },
    ],
  },
  mastery: [
    { subject: 'Computer Science 401', level: 'Advanced', percent: 0.94, icon: 'code-slash' },
    { subject: 'Database Systems 330', level: 'Proficient', percent: 0.88, icon: 'server' },
    { subject: 'Algorithms 302', level: 'Proficient', percent: 0.82, icon: 'git-network' },
  ],
  prefs: [
    {
      key: 'reminders',
      label: 'Study Notification Reminders',
      sub: 'Daily spaced repetition intervals',
    },
    {
      key: 'offline',
      label: 'Offline Document Cache',
      sub: '340 MB stored locally for fast study',
      action: 'Manage',
    },
  ],
  footer: { title: 'AI Study Companion v2.4', sub: 'Token balance: 420,000 / 500,000' },
};

export default {
  dashboard,
  quickActions,
  recentMaterials,
  notes,
  summary,
  quiz,
  planner,
  progress,
};
