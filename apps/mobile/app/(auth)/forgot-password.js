import { StyleSheet, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

import { Text } from '../../src/components/Text';
import { Button } from '../../src/components/Button';
import { Input } from '../../src/components/Input';
import { Badge } from '../../src/components/Badge';
import { IconButton } from '../../src/components/IconButton';
import { Screen } from '../../src/components/Screen';
import { useTheme } from '../../src/theme/ThemeProvider';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { colors } = theme;

  return (
    <Screen edges={['top', 'bottom']}>
      <View style={styles.header}>
        <IconButton name="arrow-back" onPress={() => router.back()} label="Go back" />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Badge label="✦  Account Recovery" tone="primary" />
        <Text variant="headlineLg" color={colors.textHeading}>
          Reset password
        </Text>
        <Text variant="body" color={colors.textBody}>
          Enter your university email and we will send a password reset link.
        </Text>
        <Input label="University Email" icon="school-outline" placeholder="ananda@university.edu" />
        <Button label="Send Reset Link" icon="mail-outline" onPress={() => router.back()} />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 16, paddingVertical: 8 },
  content: { paddingHorizontal: 16, gap: 16 },
});
