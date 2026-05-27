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
      <AppScreen notificationDot title="AgroMarket">
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle-outline" size={86} color="#C5F7C4" />
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
          <Ionicons name="car-outline" size={29} color="#FFFFFF" />
          <Text style={styles.trackText}>Track Order</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/market')} style={styles.shoppingButton}>
          <Ionicons name="basket-outline" size={29} color={marketplaceColors.primaryDark} />
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
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: marketplaceColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 48,
    ...marketplaceShadows.button,
  },
  title: { color: '#101710', fontSize: 42, fontWeight: '900', textAlign: 'center', marginTop: 32 },
  subtitle: { color: marketplaceColors.inkSoft, fontSize: 24, textAlign: 'center', marginTop: 16 },
  receipt: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    padding: 26,
    marginTop: 42,
  },
  receiptTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  receiptLabel: { color: marketplaceColors.inkMuted, fontSize: 18, fontWeight: '900', letterSpacing: 1.5 },
  receiptDate: { color: '#101710', fontSize: 18, fontWeight: '900' },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 24, marginTop: 28 },
  productImage: { width: 100, height: 100, borderRadius: 10, resizeMode: 'cover' },
  productBody: { flex: 1 },
  productTitle: { color: '#101710', fontSize: 29, fontWeight: '800' },
  productMeta: { color: marketplaceColors.inkSoft, fontSize: 24, marginTop: 5 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 28, gap: 18 },
  infoLabel: { color: marketplaceColors.inkSoft, fontSize: 22 },
  infoValue: { color: '#101710', fontSize: 20, fontWeight: '900', textAlign: 'right' },
  dashedLine: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: '#B8C6B1', marginVertical: 30 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 17 },
  solidLine: { height: 1, backgroundColor: '#B8C6B1', marginTop: 14, marginBottom: 26 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { color: '#101710', fontSize: 29, fontWeight: '800' },
  totalValue: { color: marketplaceColors.primaryDark, fontSize: 34, fontWeight: '900' },
  trackButton: {
    height: 82,
    borderRadius: 15,
    backgroundColor: marketplaceColors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 46,
    ...marketplaceShadows.button,
  },
  trackText: { color: '#FFFFFF', fontSize: 25, fontWeight: '900' },
  shoppingButton: {
    height: 82,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: marketplaceColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginTop: 24,
  },
  shoppingText: { color: marketplaceColors.primaryDark, fontSize: 25, fontWeight: '900' },
  support: { color: marketplaceColors.inkMuted, fontSize: 22, textAlign: 'center', marginTop: 48 },
  supportLink: { color: marketplaceColors.primaryDark, fontWeight: '900', textDecorationLine: 'underline' },
});
