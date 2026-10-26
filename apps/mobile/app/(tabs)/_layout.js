import { Tabs } from 'expo-router';

/**
 * Bottom tab navigation (PLACEHOLDER).
 *
 * Proposal ref: Section 6 — five bottom navigation tabs:
 * Home, Library, Planner, Progress, Profile.
 *
 * Icons/theme styling are intentionally minimal. No feature logic here.
 */
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="library" options={{ title: 'Library' }} />
      <Tabs.Screen name="planner" options={{ title: 'Planner' }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
