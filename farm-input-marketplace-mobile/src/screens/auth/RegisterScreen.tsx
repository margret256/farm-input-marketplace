import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthTextField } from '@/components/ui/auth-text-field';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { marketplaceColors } from '@/constants/marketplace';
import { AuthLayout } from '@/screens/auth/AuthLayout';
import { registerUser } from '@/services/auth.service';
import { getApiErrorMessage } from '@/utils/api-error';

export function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!fullName || !phone || !email || !password || !confirmPassword) {
      Alert.alert('Missing details', 'Fill in all account fields.');
      return;
    }

    try {
      setLoading(true);
      await registerUser({ fullName, phone, email, password, confirmPassword });
      router.push({
        pathname: '/auth/otp-verification',
        params: { identifier: email },
      });
    } catch (error) {
      Alert.alert('Registration failed', getApiErrorMessage(error, 'Check your details and try again.'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <View style={styles.headerIcon}>
        <MaterialCommunityIcons name="tractor" size={30} color="#FFFFFF" />
      </View>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join the AgroConnect marketplace to access{'\n'}premium supplies and farming tools.</Text>
      <View style={styles.form}>
        <AuthTextField
          icon="person-outline"
          label="Full Name"
          onChangeText={setFullName}
          placeholder="John Doe"
          value={fullName}
        />
        <AuthTextField
          icon="call-outline"
          keyboardType="phone-pad"
          label="Phone Number"
          onChangeText={setPhone}
          placeholder="+256 700 000000"
          value={phone}
        />
        <AuthTextField
          autoCapitalize="none"
          icon="mail-outline"
          keyboardType="email-address"
          label="Email Address"
          onChangeText={setEmail}
          placeholder="farmer@example.com"
          value={email}
        />
        <AuthTextField
          icon="lock-closed-outline"
          label="Password"
          onChangeText={setPassword}
          placeholder="********"
          secureTextEntry
          value={password}
        />
        <AuthTextField
          icon="refresh-circle-outline"
          label="Confirm Password"
          onChangeText={setConfirmPassword}
          placeholder="********"
          secureTextEntry
          value={confirmPassword}
        />
      </View>
      <View style={styles.termsRow}>
        <View style={styles.checkbox} />
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.termsAccent}>Terms of Service</Text> and{' '}
          <Text style={styles.termsAccent}>Privacy Policy.</Text>
        </Text>
      </View>
      <MarketplaceButton
        title="Create Account"
        icon="arrow-forward"
        loading={loading}
        onPress={handleRegister}
        style={styles.button}
      />
      <Link href="/auth/login" asChild>
        <Pressable style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </Pressable>
      </Link>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: marketplaceColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    color: marketplaceColors.primaryDark,
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 20,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 11,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 8,
  },
  form: {
    gap: 14,
    marginTop: 28,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 9,
    marginTop: 20,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#B7C1AF',
    marginTop: 1,
  },
  termsText: {
    flex: 1,
    color: marketplaceColors.inkSoft,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '700',
  },
  termsAccent: {
    color: marketplaceColors.primaryDark,
    fontWeight: '900',
  },
  button: {
    marginTop: 18,
    minHeight: 48,
    backgroundColor: '#0B6E21',
    borderColor: '#0B6E21',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  loginText: {
    color: marketplaceColors.primaryDark,
    fontSize: 11,
    fontWeight: '800',
  },
});
