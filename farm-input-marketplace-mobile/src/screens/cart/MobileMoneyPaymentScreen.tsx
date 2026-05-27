import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/marketplace/AppHeader';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const safetyItems = [
  ['shield-checkmark-outline', 'End-to-End Encryption', 'Your credentials are never stored on our servers.'],
  ['speedometer-outline', 'Instant Confirmation', 'Goods will be released immediately after payment.'],
] as const;

export function MobileMoneyPaymentScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader back notificationDot title="Checkout" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.amountCard, marketplaceShadows.card]}>
          <View style={styles.amountTop}>
            <Text style={styles.cardLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.pending}>Pending Payment</Text>
          </View>
          <Text style={styles.amount}>UGX 105,000</Text>
          <View style={styles.divider} />
          <View style={styles.purchaseRow}>
            <MaterialCommunityIcons name="tractor" size={31} color={marketplaceColors.primaryDark} />
            <Text style={styles.purchaseText}>AgroMarket Purchase #29482</Text>
          </View>
        </View>

        <Text style={styles.title}>Select Network</Text>
        <View style={styles.networkRow}>
          <View style={[styles.networkCard, styles.selectedNetwork]}>
            <View style={[styles.networkMark, { backgroundColor: '#1D2527' }]}>
              <Ionicons name="ellipse" size={28} color="#FBC02D" />
            </View>
            <Text style={styles.networkText}>MTN Uganda</Text>
            <Ionicons name="checkmark-circle-outline" size={35} color={marketplaceColors.primaryDark} style={styles.check} />
          </View>
          <View style={styles.networkCard}>
            <View style={[styles.networkMark, { backgroundColor: '#8E1717' }]}>
              <Ionicons name="ellipse" size={28} color="#EF4444" />
            </View>
            <Text style={styles.networkText}>Airtel Money</Text>
          </View>
        </View>

        <Text style={styles.inputLabel}>Phone Number</Text>
        <View style={styles.phoneBox}>
          <Text style={styles.countryCode}>+256</Text>
          <View style={styles.phoneDivider} />
          <Text style={styles.phonePlaceholder}>770 000 000</Text>
        </View>

        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={31} color={marketplaceColors.primaryDark} />
          <Text style={styles.noticeText}>You will receive a prompt on your phone to enter your PIN to authorize the transaction.</Text>
        </View>

        <View style={styles.safetyDivider} />
        <Text style={styles.safetyTitle}>TRANSACTION SAFETY</Text>
        <View style={styles.safetyList}>
          {safetyItems.map(([icon, title, body]) => (
            <View key={title} style={styles.safetyItem}>
              <View style={styles.safetyIcon}>
                <Ionicons name={icon} size={25} color={marketplaceColors.primaryDark} />
              </View>
              <View style={styles.safetyBody}>
                <Text style={styles.safetyName}>{title}</Text>
                <Text style={styles.safetyText}>{body}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <Pressable onPress={() => router.push('/payment-success')} style={styles.payButton}>
          <Text style={styles.payText}>Pay Now</Text>
          <View style={styles.payDivider} />
          <Text style={styles.payText}>UGX 105,000</Text>
        </Pressable>
        <Text style={styles.gateway}>Secured by AgroMarket FinTrust Gateway</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: marketplaceColors.screen },
  content: { padding: 24, paddingBottom: 152 },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    padding: 28,
  },
  amountTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: marketplaceColors.inkSoft, fontSize: 18, fontWeight: '900', letterSpacing: 1.4 },
  pending: {
    color: marketplaceColors.primaryDark,
    backgroundColor: '#E2E8DC',
    borderRadius: 12,
    overflow: 'hidden',
    paddingHorizontal: 13,
    paddingVertical: 7,
    fontSize: 19,
    fontWeight: '900',
  },
  amount: { color: '#101710', fontSize: 48, fontWeight: '900', marginTop: 16 },
  divider: { height: 1, backgroundColor: '#B8C6B1', marginVertical: 26 },
  purchaseRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  purchaseText: { color: marketplaceColors.inkSoft, fontSize: 23 },
  title: { color: '#101710', fontSize: 33, fontWeight: '800', marginTop: 42, marginBottom: 24 },
  networkRow: { flexDirection: 'row', gap: 24 },
  networkCard: {
    flex: 1,
    height: 150,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    position: 'relative',
  },
  selectedNetwork: { borderWidth: 4, borderColor: marketplaceColors.primaryDark },
  networkMark: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: { position: 'absolute', right: 18, top: 18 },
  networkText: { color: marketplaceColors.inkSoft, fontSize: 20, fontWeight: '900' },
  inputLabel: { color: marketplaceColors.inkSoft, fontSize: 21, fontWeight: '700', marginTop: 38, marginBottom: 12 },
  phoneBox: {
    height: 88,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    gap: 16,
  },
  countryCode: { color: '#101710', fontSize: 26, fontWeight: '800' },
  phoneDivider: { width: 1, height: 34, backgroundColor: '#B8C6B1' },
  phonePlaceholder: { color: '#7C8592', fontSize: 26 },
  notice: {
    backgroundColor: '#E2E8DC',
    borderRadius: 16,
    padding: 28,
    flexDirection: 'row',
    gap: 18,
    marginTop: 28,
  },
  noticeText: { flex: 1, color: marketplaceColors.inkSoft, fontSize: 23, lineHeight: 34 },
  safetyDivider: { height: 1, backgroundColor: '#CAD5C4', marginVertical: 44 },
  safetyTitle: { color: marketplaceColors.inkSoft, fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  safetyList: { gap: 26, marginTop: 24 },
  safetyItem: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  safetyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DDEDD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  safetyBody: { flex: 1 },
  safetyName: { color: '#101710', fontSize: 20, fontWeight: '900' },
  safetyText: { color: marketplaceColors.inkSoft, fontSize: 18, marginTop: 3 },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#CAD5C4',
    backgroundColor: marketplaceColors.screen,
    padding: 24,
    alignItems: 'center',
  },
  payButton: {
    width: '100%',
    height: 84,
    borderRadius: 15,
    backgroundColor: marketplaceColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  payText: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  payDivider: { height: 38, width: 1, backgroundColor: 'rgba(255,255,255,0.55)' },
  gateway: { color: marketplaceColors.inkSoft, fontSize: 18, marginTop: 16 },
});
