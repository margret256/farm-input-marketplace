import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/marketplace/AppHeader';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';
import { registerDealer } from '@/services/auth.service';

const steps = ['Business', 'Identity', 'Documents'];

type DocumentType = 'license' | 'permit';

type UploadedDoc = {
  name: string;
  uri: string;
  mimeType: string;
};

export function DealerOnboardingScreen() {
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState<{
    license?: UploadedDoc;
    permit?: UploadedDoc;
  }>({});

  async function handleDocumentPick(type: DocumentType) {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setDocuments((prev) => ({
          ...prev,
          [type]: {
            name: 'document.jpg',
            uri: file.uri,
            mimeType: 'image/jpeg',
          },
        }));
      }
    } catch {
      Alert.alert('Error', 'Failed to pick document');
    }
  }

  async function handleSubmit() {
    if (!businessName || !ownerName || !businessLocation || !phone || !email) {
      Alert.alert('Missing details', 'Fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Invalid password', 'Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        businessName,
        ownerName,
        businessLocation,
        phone,
        email,
        password,
        confirmPassword,
      };
      await registerDealer(payload);
      router.replace('/auth/login');
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      Alert.alert('Submission failed', err.response?.data?.message ?? 'Try again in a moment.');
    } finally {
      setLoading(false);
    }
  }

  function handleSaveDraft() {
    if (!businessName && !ownerName && !businessLocation && !phone && !email && !password) {
      Alert.alert('No data', 'Fill in some fields before saving draft.');
      return;
    }
    Alert.alert('Draft saved', 'Your onboarding progress has been saved.');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="AgroConnect" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dealer Onboarding</Text>
          <Text style={styles.cardSubtitle}>
            Grow your business with AgroConnect. Complete the verification process to start listing your inventory.
          </Text>

          {/* Steps */}
          <View style={styles.stepsRow}>
            {steps.map((step, i) => (
              <View key={step} style={styles.stepItem}>
                <View style={styles.stepLineWrap}>
                  {i > 0 && <View style={[styles.stepLine, i === 0 && styles.stepLineActive]} />}
                  <View style={[styles.stepCircle, i === 0 && styles.stepCircleActive]}>
                    <Text style={[styles.stepNumber, i === 0 && styles.stepNumberActive]}>{i + 1}</Text>
                  </View>
                  {i < steps.length - 1 && <View style={styles.stepLine} />}
                </View>
                <Text style={[styles.stepLabel, i === 0 && styles.stepLabelActive]}>{step}</Text>
              </View>
            ))}
          </View>

          {/* Form Fields */}
          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="storefront-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Business Name</Text>
            </View>
            <TextInput
              style={styles.fieldInput}
              placeholder="e.g. Green Field Supplies Co."
              placeholderTextColor="#BCBCBC"
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="person-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Owner Name</Text>
            </View>
            <TextInput
              style={styles.fieldInput}
              placeholder="Full legal name"
              placeholderTextColor="#BCBCBC"
              value={ownerName}
              onChangeText={setOwnerName}
            />
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="location-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Business Location</Text>
            </View>
            <TextInput
              style={styles.fieldInput}
              placeholder="Street address, City, Province"
              placeholderTextColor="#BCBCBC"
              value={businessLocation}
              onChangeText={setBusinessLocation}
            />
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="call-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Phone Number</Text>
            </View>
            <TextInput
              style={styles.fieldInput}
              placeholder="+1 (555) 000-0000"
              placeholderTextColor="#BCBCBC"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="mail-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Email Address</Text>
            </View>
            <TextInput
              style={styles.fieldInput}
              placeholder="contact@business.com"
              placeholderTextColor="#BCBCBC"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="lock-closed-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Password</Text>
            </View>
            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter password (min 8 characters)"
                placeholderTextColor="#BCBCBC"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={marketplaceColors.inkMuted}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.fieldWrap}>
            <View style={styles.fieldLabelRow}>
              <Ionicons name="refresh-circle-outline" size={13} color={marketplaceColors.inkMuted} />
              <Text style={styles.fieldLabel}>Confirm Password</Text>
            </View>
            <View style={styles.passwordRow}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm your password"
                placeholderTextColor="#BCBCBC"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={marketplaceColors.inkMuted}
                />
              </Pressable>
            </View>
          </View>

          {/* Document Verification */}
          <Text style={styles.docTitle}>Document Verification</Text>

          <View style={styles.docWrap}>
            <Text style={styles.docLabel}>Trade License (PDF or JPEG)</Text>
            <Pressable style={styles.uploadBox} onPress={() => handleDocumentPick('license')}>
              <Ionicons name="document-outline" size={32} color={marketplaceColors.primary} />
              <Text style={styles.uploadText}>
                {documents.license ? documents.license.name : 'Click to upload License'}
              </Text>
              <Text style={styles.uploadLimit}>MAX 10MB</Text>
            </Pressable>
          </View>

          <View style={styles.docWrap}>
            <Text style={styles.docLabel}>Business Permit (PDF or JPEG)</Text>
            <Pressable style={styles.uploadBox} onPress={() => handleDocumentPick('permit')}>
              <Ionicons name="shield-checkmark-outline" size={32} color={marketplaceColors.primary} />
              <Text style={styles.uploadText}>
                {documents.permit ? documents.permit.name : 'Click to upload Permit'}
              </Text>
              <Text style={styles.uploadLimit}>MAX 10MB</Text>
            </Pressable>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Ionicons name="information-circle-outline" size={14} color={marketplaceColors.inkMuted} />
            <Text style={styles.disclaimerText}>
              By submitting this form, you agree to our Dealer Terms of Service. Verification typically takes 24-48 business hours.
            </Text>
          </View>

          {/* Buttons */}
          <MarketplaceButton
            title="Save Draft"
            icon="document-text-outline"
            onPress={handleSaveDraft}
            variant="outlined"
            style={styles.draftButton}
          />
          <MarketplaceButton
            title="Submit for Verification"
            icon="arrow-forward"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitButton}
          />
        </View>

        {/* Features */}
        {[
          { icon: 'headset-outline' as const, title: '24/7 Support', subtitle: 'Dedicated dealer desk' },
          { icon: 'wallet-outline' as const, title: 'Fast Settlements', subtitle: 'Get paid in T+1 days' },
          { icon: 'trending-up-outline' as const, title: 'Wide Reach', subtitle: '10,000+ active farmers' },
        ].map((feature) => (
          <View key={feature.title} style={styles.featureRow}>
            <View style={styles.featureIcon}>
              <Ionicons name={feature.icon} size={20} color={marketplaceColors.primary} />
            </View>
            <View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: marketplaceColors.screen },
  content: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginBottom: 20,
    ...marketplaceShadows.card,
  },
  cardTitle: {
    color: marketplaceColors.primaryDark,
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  cardSubtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepItem: {
    alignItems: 'center',
    flex: 1,
  },
  stepLineWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#DDE6D6',
  },
  stepLineActive: {
    backgroundColor: marketplaceColors.primary,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#DDE6D6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: marketplaceColors.primary,
    borderColor: marketplaceColors.primary,
  },
  stepNumber: {
    fontSize: 12,
    fontWeight: '900',
    color: marketplaceColors.inkMuted,
  },
  stepNumberActive: {
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: marketplaceColors.inkMuted,
    marginTop: 4,
  },
  stepLabelActive: {
    color: marketplaceColors.primaryDark,
    fontWeight: '900',
  },
  fieldWrap: { marginBottom: 14 },
  fieldLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 5,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#101710',
  },
  fieldInput: {
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE6D6',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 12,
    fontSize: 13,
    color: '#101710',
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#101710',
    marginTop: 10,
    marginBottom: 12,
  },
  docWrap: { marginBottom: 14 },
  docLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#101710',
    marginBottom: 6,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderColor: '#DDE6D6',
    borderStyle: 'dashed',
    borderRadius: 10,
    backgroundColor: '#F7FAF0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  uploadText: {
    color: marketplaceColors.primary,
    fontSize: 13,
    fontWeight: '800',
  },
  uploadLimit: {
    color: marketplaceColors.inkMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F0F4ED',
    borderRadius: 8,
    padding: 12,
    marginTop: 6,
    marginBottom: 18,
  },
  disclaimerText: {
    flex: 1,
    color: marketplaceColors.inkSoft,
    fontSize: 11,
    lineHeight: 16,
  },
  draftButton: {
    minHeight: 46,
    borderRadius: 24,
    borderColor: marketplaceColors.primaryDark,
    borderWidth: 1.5,
    width: '100%',
  },
  submitButton: {
    minHeight: 46,
    borderRadius: 24,
    backgroundColor: '#F57C00',
    width: '100%',
    marginTop: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#101710',
  },
  featureSubtitle: {
    fontSize: 11,
    color: marketplaceColors.inkSoft,
    marginTop: 2,
  },
  passwordRow: {
    height: 42,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDE6D6',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    fontSize: 13,
    color: '#101710',
  },
});