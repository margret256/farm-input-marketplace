import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/marketplace/AppHeader';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const deliveryMethods = [
  ['Standard Delivery', '3-5 Business Days', 'UGX 5,000', true],
  ['Express Delivery', 'Same Day Delivery', 'UGX 15,000', false],
  ['Pickup Station', 'Ready in 24 hours', 'Free', false],
] as const;

const paymentMethods = [
  ['MTN MoMo', '#14392E', '#FBC02D', false],
  ['Airtel Money', '#8E1717', '#EF4444', false],
  ['Cash on Delivery', '#E2E8DC', '#344033', true],
] as const;

export function CheckoutScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader back help title="Checkout" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Delivery Address */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <Text style={styles.addNew}>+ Add New</Text>
        </View>
        <View style={[styles.addressCard, marketplaceShadows.card]}>
          <Ionicons name="location-outline" size={18} color={marketplaceColors.primaryDark} />
          <View style={styles.addressBody}>
            <Text style={styles.addressTitle}>Primary Farm Office</Text>
            <Text style={styles.addressText}>Plot 45, Green Valley Industrial Hub, Wakiso District, Uganda</Text>
            <Text style={styles.addressText}>+256 701 234 567</Text>
          </View>
          <Ionicons name="pencil" size={14} color={marketplaceColors.inkMuted} />
        </View>

        {/* Delivery Method */}
        <Text style={styles.sectionTitle}>Delivery Method</Text>
        <View style={styles.methodList}>
          {deliveryMethods.map(([title, subtitle, price, selected]) => (
            <View key={title} style={[styles.methodCard, selected && styles.selectedMethod]}>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected ? <View style={styles.radioDot} /> : null}
              </View>
              <View style={styles.methodBody}>
                <Text style={styles.methodTitle}>{title}</Text>
                <Text style={styles.methodSubtitle}>{subtitle}</Text>
              </View>
              <Text style={styles.methodPrice}>{price}</Text>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodList}>
          {paymentMethods.map(([title, bg, fg, selected]) => (
            <View key={title} style={styles.paymentCard}>
<View style={[styles.paymentIcon, { backgroundColor: bg, borderColor: fg }]}>
                <Ionicons
                  name={title === 'Cash on Delivery' ? 'cash-outline' : 'wallet-outline'}
                  size={16}
                  color={fg}
                />
              </View>
              <Text style={styles.paymentTitle}>{title}</Text>
              <View style={[styles.paymentRadio, selected && styles.paymentSelected]}>
                {selected ? <View style={styles.paymentDot} /> : null}
              </View>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Image source={appImages.fastPayments} style={styles.summaryImage} />
            <View style={styles.summaryBody}>
              <Text style={styles.summaryName}>Hybrid Maize Seeds</Text>
              <Text style={styles.summaryMeta}>2 x 5kg Bags</Text>
            </View>
            <Text style={styles.summaryPrice}>UGX 84,000</Text>
          </View>
          <View style={styles.summaryLine} />
          <View style={styles.summaryItem}>
            <Image source={appImages.betterYields} style={styles.summaryImage} />
            <View style={styles.summaryBody}>
              <Text style={styles.summaryName}>NPK Fertilizer</Text>
              <Text style={styles.summaryMeta}>1 x 25kg Bag</Text>
            </View>
            <Text style={styles.summaryPrice}>UGX 125,000</Text>
          </View>
          <View style={styles.summaryLine} />
          <View style={styles.totalsRow}>
            <Text style={styles.totalMuted}>Subtotal</Text>
            <Text style={styles.totalMuted}>UGX 209,000</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalMuted}>Delivery Fee</Text>
            <Text style={styles.totalMuted}>UGX 5,000</Text>
          </View>
          <View style={[styles.totalsRow, styles.totalFinalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>UGX 214,000</Text>
          </View>
        </View>

      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottom}>
        <Pressable onPress={() => router.push('/mobile-money-payment')} style={styles.confirmButton}>
          <Text style={styles.confirmText}>Confirm Order</Text>
          <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: marketplaceColors.screen,
  },
  content: {
    padding: 12,
    paddingBottom: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#101710',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 12,
    marginBottom: 8,
  },
  addNew: {
    color: marketplaceColors.primaryDark,
    fontSize: 11,
    fontWeight: '900',
    marginTop: 12,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    padding: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addressBody: {
    flex: 1,
    gap: 3,
  },
  addressTitle: {
    color: '#101710',
    fontSize: 12,
    fontWeight: '900',
  },
  addressText: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    lineHeight: 14,
  },
  methodList: {
    gap: 8,
    marginBottom: 4,
  },
  methodCard: {
    minHeight: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  selectedMethod: {
    borderWidth: 2,
    borderColor: marketplaceColors.primaryDark,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: marketplaceColors.inkMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: marketplaceColors.primaryDark,
    backgroundColor: marketplaceColors.primaryDark,
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  methodBody: {
    flex: 1,
  },
  methodTitle: {
    color: '#101710',
    fontSize: 12,
    fontWeight: '800',
  },
  methodSubtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    marginTop: 2,
  },
  methodPrice: {
    color: marketplaceColors.primaryDark,
    fontSize: 11,
    fontWeight: '900',
  },
  paymentCard: {
    minHeight: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentTitle: {
    flex: 1,
    color: '#101710',
    fontSize: 12,
    fontWeight: '800',
  },
  paymentRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: marketplaceColors.inkMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentSelected: {
    borderColor: marketplaceColors.primaryDark,
  },
  paymentDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: marketplaceColors.primaryDark,
  },
  summary: {
    backgroundColor: '#E2E8DC',
    borderRadius: 12,
    padding: 12,
    marginTop: 6,
  },
  summaryTitle: {
    color: '#101710',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  summaryBody: {
    flex: 1,
  },
  summaryName: {
    color: '#101710',
    fontSize: 11,
    fontWeight: '800',
  },
  summaryMeta: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    marginTop: 2,
  },
  summaryPrice: {
    color: '#101710',
    fontSize: 11,
    fontWeight: '700',
  },
  summaryLine: {
    height: 1,
    backgroundColor: '#B8C6B1',
    marginVertical: 8,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalFinalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#B8C6B1',
  },
  totalMuted: {
    color: marketplaceColors.inkSoft,
    fontSize: 11,
  },
  totalLabel: {
    color: '#101710',
    fontSize: 13,
    fontWeight: '800',
  },
  totalValue: {
    color: marketplaceColors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#CAD5C4',
    backgroundColor: marketplaceColors.screen,
    padding: 12,
  },
  confirmButton: {
    height: 46,
    borderRadius: 12,
    backgroundColor: marketplaceColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...marketplaceShadows.button,
  },
  confirmText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});