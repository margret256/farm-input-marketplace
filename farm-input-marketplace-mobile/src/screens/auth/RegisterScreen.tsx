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

      <View style={styles.formCard}>
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
            placeholder="••••••••"
            secureTextEntry
            value={password}
          />
          <AuthTextField
            icon="refresh-circle-outline"
            label="Confirm Password"
            onChangeText={setConfirmPassword}
            placeholder="••••••••"
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

        <View style={styles.dividerRow}>
          <View style={styles.divider} />
          <Text style={styles.orText}>OR REGISTER WITH</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton} onPress={() => {}}>
            <View style={styles.googleBadge}>
              <Text style={styles.googleLetter}>G</Text>
            </View>
            <Text style={styles.socialButtonText}>Google</Text>
          </Pressable>

          <Pressable style={styles.socialButton} onPress={() => {}}>
            <View style={styles.facebookBadge}>
              <Text style={styles.facebookLetter}>f</Text>
            </View>
            <Text style={styles.socialButtonText}>Facebook</Text>
          </Pressable>
        </View>
      </View>

      <Link href="/auth/login" asChild>
        <Pressable style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginAccent}>Login</Text>
          </Text>
        </Pressable>
      </Link>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: marketplaceColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  title: {
    color: marketplaceColors.primaryDark,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 16,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 8,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignSelf: 'stretch',
  },
  form: {
    gap: 14,
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
    borderWidth: 1.5,
    borderColor: '#B7C1AF',
    marginTop: 1,
  },
  termsText: {
    flex: 1,
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '600',
  },
  termsAccent: {
    color: marketplaceColors.primaryDark,
    fontWeight: '800',
  },
  button: {
    marginTop: 20,
    minHeight: 52,
    borderRadius: 10,
    backgroundColor: '#1A5E20',
    borderColor: '#1A5E20',
    width: '100%',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E8E0',
  },
  orText: {
    color: marketplaceColors.inkMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 46,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#DDE1D8',
    backgroundColor: '#FFFFFF',
  },
  googleBadge: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleLetter: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  facebookBadge: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#1877F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookLetter: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  socialButtonText: {
    color: '#1C1C1C',
    fontSize: 14,
    fontWeight: '600',
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  loginText: {
    color: marketplaceColors.inkMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  loginAccent: {
    color: '#C0580A',
    fontWeight: '800',
  },
});