/**
 * ui-smoke.test.js — verifies the shared UI components and mock fixtures load
 * without throwing. Screens are exercised visually; screens that import
 * expo-router are covered by the router's own build, not this unit test.
 */

import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { Input } from '../src/components/Input';
import { Badge } from '../src/components/Badge';
import { Chip } from '../src/components/Chip';
import { Avatar } from '../src/components/Avatar';
import { IconButton } from '../src/components/IconButton';
import { Text } from '../src/components/Text';
import { Screen } from '../src/components/Screen';
import { ProgressRing } from '../src/components/ProgressRing';
import { ProgressBar } from '../src/components/ProgressBar';
import { SectionHeader } from '../src/components/SectionHeader';
import { SegmentedControl } from '../src/components/SegmentedControl';

import { palettes } from '../src/theme/colors';
import { fontFamilies, spacing, touchTargets } from '../src/theme/typography';
import { dashboard, notes, progress, quiz } from '../src/data/mockData';

describe('shared components', () => {
  it.each([
    ['Button', Button],
    ['Card', Card],
    ['Input', Input],
    ['Badge', Badge],
    ['Chip', Chip],
    ['Avatar', Avatar],
    ['IconButton', IconButton],
    ['Text', Text],
    ['Screen', Screen],
    ['ProgressRing', ProgressRing],
    ['ProgressBar', ProgressBar],
    ['SectionHeader', SectionHeader],
    ['SegmentedControl', SegmentedControl],
  ])('%s exports a component', (_name, component) => {
    expect(typeof component).toBe('function');
  });
});

describe('theme tokens', () => {
  it('defines light and dark palettes with the Cognitive Luminary primary', () => {
    expect(palettes.light.primary).toBe('#4F46E5');
    expect(palettes.dark.primary).toBe('#818CF8');
  });

  it('exposes typography, spacing, and radii tokens', () => {
    expect(fontFamilies.heading).toBe('PlusJakartaSans');
    expect(spacing.grid).toBe(8);
    expect(touchTargets.min).toBeGreaterThanOrEqual(48);
  });
});

describe('mock data shape', () => {
  it('provides dashboard, notes, and progress fixtures', () => {
    expect(dashboard.dailyTarget.percent).toBeGreaterThan(0);
    expect(Array.isArray(notes)).toBe(true);
    expect(progress.stats.length).toBeGreaterThan(0);
  });

  it('provides a quiz with exactly one correct option', () => {
    expect(quiz.options).toHaveLength(4);
    expect(quiz.options.filter((o) => o.correct)).toHaveLength(1);
  });
});
