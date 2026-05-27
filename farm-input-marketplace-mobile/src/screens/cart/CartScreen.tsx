import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from '@/components/marketplace/AppHeader';
import { cartItems } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function CartScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="AgroMarket" />
      <View style={styles.content}>
        <Text style={styles.title}>Your Cart</Text>
        <Text style={styles.subtitle}>Review items before checkout</Text>
        <View style={styles.items}>
          {cartItems.map((item) => (
            <View key={item.name} style={[styles.itemCard, marketplaceShadows.card]}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemBody}>
                <View style={styles.itemTop}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <View style={styles.controls}>
                  <View style={styles.qty}>
                    <Text style={styles.qtyIcon}>-</Text>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <Text style={styles.qtyIcon}>+</Text>
                  </View>
                  <Text style={styles.save}><Ionicons name="bookmark-outline" size={20} /> Save</Text>
                  <Text style={styles.remove}><Ionicons name="trash-outline" size={20} /> Remove</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          {[
            ['Subtotal  (3 items)', '$202.50'],
            ['Delivery Fee', '$15.00'],
            ['Taxes (VAT)', '$18.22'],
          ].map(([label, value]) => (
            <View key={label} style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>{label}</Text>
              <Text style={styles.summaryValue}>{value}</Text>
            </View>
          ))}
          <View style={styles.summaryLine} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>$235.72</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottom}>
        <Pressable onPress={() => router.push('/market')} style={styles.continueButton}>
          <Text style={styles.continueText}>Continue Shopping</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/checkout')} style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: marketplaceColors.screen },
  content: { flex: 1, padding: 24 },
  title: { color: '#101710', fontSize: 40, fontWeight: '900', letterSpacing: 0 },
  subtitle: { color: marketplaceColors.inkSoft, fontSize: 24, marginTop: 6 },
  items: { gap: 22, marginTop: 38 },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    gap: 22,
  },
  itemImage: { width: 140, height: 140, borderRadius: 10, resizeMode: 'cover' },
  itemBody: { flex: 1 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  itemTitle: { flex: 1, color: '#101710', fontSize: 25, fontWeight: '900' },
  itemPrice: { color: marketplaceColors.primaryDark, fontSize: 24, fontWeight: '900' },
  itemDescription: { color: marketplaceColors.inkSoft, fontSize: 19, fontWeight: '700', marginTop: 22 },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 25 },
  qty: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E9EFE4',
    borderRadius: 28,
    paddingHorizontal: 24,
    height: 56,
    gap: 30,
  },
  qtyIcon: { color: marketplaceColors.primaryDark, fontSize: 27, fontWeight: '900' },
  qtyText: { color: '#101710', fontSize: 24, fontWeight: '900' },
  save: { color: '#A84900', fontSize: 19, fontWeight: '900' },
  remove: { color: '#C62828', fontSize: 19, fontWeight: '900' },
  summary: {
    backgroundColor: '#E2E8DC',
    borderRadius: 18,
    padding: 34,
    marginTop: 44,
  },
  summaryTitle: { color: '#101710', fontSize: 32, fontWeight: '800', marginBottom: 26 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 26 },
  summaryLabel: { color: marketplaceColors.inkSoft, fontSize: 25 },
  summaryValue: { color: '#101710', fontSize: 25, fontWeight: '700' },
  summaryLine: { height: 1, backgroundColor: '#B8C6B1', marginBottom: 26 },
  totalLabel: { color: '#101710', fontSize: 25, fontWeight: '900' },
  totalValue: { color: marketplaceColors.primaryDark, fontSize: 38, fontWeight: '900' },
  bottom: {
    height: 130,
    borderTopWidth: 1,
    borderTopColor: '#CAD5C4',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26,
    paddingHorizontal: 24,
  },
  continueButton: {
    flex: 1,
    height: 78,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: marketplaceColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: { color: marketplaceColors.primaryDark, fontSize: 24, fontWeight: '800' },
  checkoutButton: {
    flex: 1,
    height: 78,
    borderRadius: 16,
    backgroundColor: marketplaceColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
});
