import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AuthLayout } from '@/screens/auth/AuthLayout';
import { AuthHero } from '@/screens/auth/AuthHero';
import { AuthTextField } from '@/components/ui/auth-text-field';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { ScreenHeader } from '@/components/ui/screen-header';
import { marketplaceColors, marketplaceImages } from '@/constants/marketplace';

export function ForgotPasswordScreen() {
  return (
    <AuthLayout>
      <ScreenHeader />
      <View style={styles.heroWrap}>
        <AuthHero source={marketplaceImages.forgotPassword} icon="mail-outline" />
      </View>
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>Enter your email or phone to receive a reset code</Text>
      <View style={styles.form}>
        <AuthTextField
          autoCapitalize="none"
          icon="mail-outline"
          keyboardType="email-address"
          label="Email or Phone Number"
          placeholder="e.g. farmer@field.com"
        />
        <MarketplaceButton title="Send Reset Code" icon="arrow-forward" style={styles.button} />
      </View>
      <Link href="/auth/login" asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backText}>Back to Login</Text>
        </Pressable>
      </Link>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  heroWrap: {
    marginTop: 40,
  },
  title: {
    color: '#000000',
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 38,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 11,
  },
  form: {
    gap: 20,
    marginTop: 30,
  },
  button: {
    marginTop: 0,
  },
  backLink: {
    alignItems: 'center',
    marginTop: 66,
  },
  backText: {
    color: marketplaceColors.primaryDark,
    fontSize: 11,
    fontWeight: '900',
  },
});
