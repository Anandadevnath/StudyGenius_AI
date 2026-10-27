import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../src/theme/ThemeProvider';

export default function TabsLayout() {
  const theme = useTheme();

  const icon = (name, focused) => (
    <Ionicons
      name={focused ? name : `${name}-outline`}
      size={22}
      color={focused ? theme.colors.primary : theme.colors.textMuted}
    />
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          height: 64,
          paddingTop: 6,
          paddingBottom: 8,
        },
        tabBarLabelStyle: { fontFamily: theme.fontFamilies.labelMedium, fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home', tabBarIcon: ({ focused }) => icon('home', focused) }}
      />
      <Tabs.Screen
        name="library"
        options={{ title: 'Library', tabBarIcon: ({ focused }) => icon('book', focused) }}
      />
      <Tabs.Screen
        name="planner"
        options={{ title: 'Planner', tabBarIcon: ({ focused }) => icon('calendar', focused) }}
      />
      <Tabs.Screen
        name="progress"
        options={{ title: 'Progress', tabBarIcon: ({ focused }) => icon('trending-up', focused) }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ focused }) => icon('person-circle', focused) }}
      />
    </Tabs>
  );
}
