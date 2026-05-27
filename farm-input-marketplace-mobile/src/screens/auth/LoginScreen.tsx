import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthTextField } from '@/components/ui/auth-text-field';
import { LogoMark } from '@/components/ui/logo-mark';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';
import { AuthLayout } from '@/screens/auth/AuthLayout';
import { loginUser } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import { getApiErrorMessage } from '@/utils/api-error';

export function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);

  async function handleLogin() {
    if (!identifier.trim() || !password) {
      Alert.alert('Missing details', 'Enter your email or phone and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await loginUser({ identifier, password });
      await setSession(response.accessToken, response.user);
      router.replace('/home');
    } catch (error) {
      Alert.alert('Login failed', getApiErrorMessage(error, 'Check your details and try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout centered>
      <View style={[styles.card, marketplaceShadows.card]}>
        <View style={styles.logoWrap}>
          <LogoMark size={78} />
        </View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Access your agricultural marketplace and{'\n'}inventory</Text>
        <View style={styles.form}>
          <AuthTextField
            autoCapitalize="none"
            icon="person-outline"
            keyboardType="email-address"
            label="Email or Phone Number"
            onChangeText={setIdentifier}
            placeholder="Enter your email or phone"
            value={identifier}
          />
          <AuthTextField
            icon="lock-closed-outline"
            label="Password"
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            trailingIcon="eye-outline"
            value={password}
          />
        </View>
        <View style={styles.rowBetween}>
          <View style={styles.rememberRow}>
            <View style={styles.checkbox} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>
          <Pressable onPress={() => router.push('/auth/forgot-password')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </Pressable>
        </View>
        <MarketplaceButton
          title="Login"
          icon="log-in-outline"
          loading={loading}
          onPress={handleLogin}
          style={styles.loginButton}
        />
        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.divider} />
        </View>
        <MarketplaceButton
          title="Login with Biometrics"
          icon="finger-print-outline"
          iconPosition="left"
          variant="outlined"
          style={styles.biometricButton}
        />
        <View style={styles.bottomLink}>
          <Text style={styles.bottomText}>{"Don't have an account? "}</Text>
          <Link href="/auth/register" asChild>
            <Pressable>
              <Text style={styles.signUpText}>Sign up</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 0,
    alignItems: 'stretch',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 82,
    overflow: 'hidden',
  },
  title: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 10,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
    marginTop: 7,
    letterSpacing: 0,
  },
  form: {
    gap: 16,
    marginTop: 28,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 13,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  checkbox: {
    width: 15,
    height: 15,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: marketplaceColors.inkMuted,
  },
  rememberText: {
    color: marketplaceColors.ink,
    fontSize: 9,
    fontWeight: '700',
  },
  forgotText: {
    color: marketplaceColors.primaryDark,
    fontSize: 9,
    fontWeight: '900',
  },
  loginButton: {
    marginTop: 25,
    minHeight: 48,
    backgroundColor: '#0B6E21',
    borderColor: '#0B6E21',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E8E0',
  },
  orText: {
    color: marketplaceColors.inkMuted,
    fontSize: 9,
    fontWeight: '800',
  },
  biometricButton: {
    borderColor: '#D8DED1',
  },
  bottomLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  bottomText: {
    color: marketplaceColors.inkMuted,
    fontSize: 11,
    fontWeight: '700',
  },
  signUpText: {
    color: marketplaceColors.secondary,
    fontSize: 11,
    fontWeight: '900',
  },
});
