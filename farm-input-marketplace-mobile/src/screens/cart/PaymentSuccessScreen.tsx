import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function PaymentSuccessScreen() {
  return (
    <StaticScreen>
      <AppScreen title="AgroMarket">
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle-outline" size={52} color="#C5F7C4" />
        </View>
        <Text style={styles.title}>Payment Successful!</Text>
        <Text style={styles.subtitle}>Order #12345 confirmed</Text>

        <View style={[styles.receipt, marketplaceShadows.card]}>
          <View style={styles.receiptTop}>
            <Text style={styles.receiptLabel}>TRANSACTION RECEIPT</Text>
            <Text style={styles.receiptDate}>Oct 24, 2023</Text>
          </View>
          <View style={styles.productRow}>
            <Image source={appImages.fastPayments} style={styles.productImage} />
            <View style={styles.productBody}>
              <Text style={styles.productTitle}>Hybrid Maize Seeds</Text>
              <Text style={styles.productMeta}>50kg Bulk Pack</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Merchant</Text>
            <Text style={styles.infoValue}>Green Valley Supplies</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Payment Method</Text>
            <Text style={styles.infoValue}>AgroWallet</Text>
          </View>
          <View style={styles.dashedLine} />
          <View style={styles.priceRow}>
            <Text style={styles.infoLabel}>Subtotal</Text>
            <Text style={styles.infoValue}>$245.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.infoLabel}>Delivery Fee</Text>
            <Text style={styles.infoValue}>$12.50</Text>
          </View>
          <View style={styles.solidLine} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>$257.50</Text>
          </View>
        </View>

        <Pressable onPress={() => router.push('/track-order')} style={styles.trackButton}>
          <Ionicons name="car-outline" size={20} color="#FFFFFF" />
          <Text style={styles.trackText}>Track Order</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/tabs/market')} style={styles.shoppingButton}>
          <Ionicons name="basket-outline" size={20} color={marketplaceColors.primaryDark} />
          <Text style={styles.shoppingText}>Continue Shopping</Text>
        </Pressable>
        <Text style={styles.support}>Need help? <Text style={styles.supportLink}>Contact Support</Text></Text>
      </AppScreen>
      <FloatingTabBar active="orders" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  successIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: marketplaceColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 24,
    ...marketplaceShadows.button,
  },
  title: { color: '#101710', fontSize: 24, fontWeight: '900', textAlign: 'center', marginTop: 16 },
  subtitle: { color: marketplaceColors.inkSoft, fontSize: 13, textAlign: 'center', marginTop: 8 },
  receipt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    padding: 14,
    marginTop: 20,
  },
  receiptTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  receiptLabel: { color: marketplaceColors.inkMuted, fontSize: 11, fontWeight: '900', letterSpacing: 1.1 },
  receiptDate: { color: '#101710', fontSize: 11, fontWeight: '900' },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14 },
  productImage: { width: 56, height: 56, borderRadius: 8, resizeMode: 'cover' },
  productBody: { flex: 1 },
  productTitle: { color: '#101710', fontSize: 15, fontWeight: '800' },
  productMeta: { color: marketplaceColors.inkSoft, fontSize: 12, marginTop: 3 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14, gap: 10 },
  infoLabel: { color: marketplaceColors.inkSoft, fontSize: 12 },
  infoValue: { color: '#101710', fontSize: 12, fontWeight: '900', textAlign: 'right' },
  dashedLine: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#B8C6B1', marginVertical: 14 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  solidLine: { height: 1, backgroundColor: '#B8C6B1', marginTop: 8, marginBottom: 14 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: '#101710', fontSize: 15, fontWeight: '800' },
  totalValue: { color: marketplaceColors.primaryDark, fontSize: 18, fontWeight: '900' },
  trackButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: marketplaceColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 22,
    ...marketplaceShadows.button,
  },
  trackText: { color: '#FFFFFF', fontSize: 15, fontWeight: '900' },
  shoppingButton: {
    height: 52,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: marketplaceColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
  },
  shoppingText: { color: marketplaceColors.primaryDark, fontSize: 15, fontWeight: '900' },
  support: { color: marketplaceColors.inkMuted, fontSize: 12, textAlign: 'center', marginTop: 24 },
  supportLink: { color: marketplaceColors.primaryDark, fontWeight: '900', textDecorationLine: 'underline' },
});
