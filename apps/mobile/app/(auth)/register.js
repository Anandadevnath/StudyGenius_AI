import { Redirect } from 'expo-router';

/**
 * Screen 2: Login / Register.
 *
 * The design uses a single screen with Sign In and Register tabs (proposal
 * Table 6), so this route redirects to the login screen where the tabs live.
 */
export default function RegisterScreen() {
  return <Redirect href="/(auth)/login" />;
}
