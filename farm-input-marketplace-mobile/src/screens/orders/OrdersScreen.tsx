import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages, orderItems } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function OrdersScreen() {
  return (
    <StaticScreen>
      <AppScreen notificationDot title="AgroMarket">
        <Text style={styles.title}>My Orders</Text>
        <Text style={styles.subtitle}>Track your supplies and equipment deliveries.</Text>
        <View style={styles.tabs}>
          <Text style={[styles.tab, styles.activeTab]}>Active</Text>
          <Text style={styles.tab}>Completed</Text>
          <Text style={styles.tab}>Cancelled</Text>
        </View>
        <View style={styles.orderList}>
          {orderItems.map((order) => (
            <View key={order.number} style={[styles.orderCard, marketplaceShadows.card]}>
              <View style={styles.orderTop}>
                <View>
                  <Text style={styles.orderNumber}>ORDER {order.number}</Text>
                  <Text style={styles.orderTitle}>{order.title}</Text>
                </View>
                <View style={[styles.statusPill, { backgroundColor: order.statusColor }]}>
                  <Ionicons name="car-outline" size={15} color={marketplaceColors.primaryDark} />
                  <Text style={styles.statusText}>{order.status}</Text>
                </View>
              </View>
              <View style={styles.imageRow}>
                {order.images.map((image, index) => (
                  <Image key={`${order.number}-${index}`} source={image} style={styles.orderImage} />
                ))}
                {order.images.length > 1 ? (
                  <View style={styles.moreBox}>
                    <Text style={styles.moreText}>+1</Text>
                  </View>
                ) : null}
              </View>
              <View style={styles.line} />
              <View style={styles.orderBottom}>
                <View>
                  <Text style={styles.totalLabel}>Total Amount</Text>
                  <Text style={styles.totalText}>{order.total}</Text>
                </View>
                <Pressable onPress={() => router.push('/track-order')} style={styles.detailsButton}>
                  <Text style={styles.detailsText}>View Details</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.offerCard}>
          <Text style={styles.offerBadge}>Exclusive Offer</Text>
          <Text style={styles.offerTitle}>Get 15% off on Irrigation Kits</Text>
          <Text style={styles.offerText}>Upgrade your farm efficiency with modern watering systems.</Text>
          <Pressable style={styles.offerButton}>
            <Text style={styles.offerButtonText}>Shop Now</Text>
          </Pressable>
          <Ionicons name="leaf-outline" size={112} color="rgba(255,255,255,0.18)" style={styles.offerLeaf} />
        </View>
      </AppScreen>
      <FloatingTabBar active="orders" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#101710',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 18,
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    marginBottom: 22,
  },
  tab: {
    backgroundColor: '#E9EFE4',
    color: marketplaceColors.inkSoft,
    borderRadius: 24,
    overflow: 'hidden',
    paddingHorizontal: 29,
    paddingVertical: 11,
    fontSize: 20,
    fontWeight: '800',
  },
  activeTab: {
    backgroundColor: marketplaceColors.primaryDark,
    color: '#FFFFFF',
  },
  orderList: {
    gap: 22,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8DC',
  },
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  orderNumber: {
    color: marketplaceColors.inkMuted,
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  orderTitle: {
    color: '#101710',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 5,
  },
  statusPill: {
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statusText: {
    color: marketplaceColors.primaryDark,
    fontSize: 15,
    fontWeight: '900',
  },
  imageRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 26,
  },
  orderImage: {
    width: 78,
    height: 78,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  moreBox: {
    width: 78,
    height: 78,
    borderRadius: 8,
    backgroundColor: '#E9EFE4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreText: {
    color: marketplaceColors.inkSoft,
    fontSize: 20,
    fontWeight: '900',
  },
  line: {
    height: 1,
    backgroundColor: '#DCE4D7',
    marginTop: 30,
  },
  orderBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  totalLabel: {
    color: marketplaceColors.inkMuted,
    fontSize: 15,
    fontWeight: '800',
  },
  totalText: {
    color: marketplaceColors.primaryDark,
    fontSize: 25,
    fontWeight: '900',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: marketplaceColors.primaryDark,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  detailsText: {
    color: marketplaceColors.primaryDark,
    fontSize: 21,
    fontWeight: '800',
  },
  offerCard: {
    marginTop: 26,
    borderRadius: 18,
    backgroundColor: '#FF7F11',
    padding: 28,
    overflow: 'hidden',
  },
  offerBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.24)',
    color: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 7,
    fontSize: 16,
    fontWeight: '900',
  },
  offerTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900',
    marginTop: 17,
  },
  offerText: {
    color: '#FFFFFF',
    fontSize: 19,
    lineHeight: 27,
    marginTop: 18,
  },
  offerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    alignSelf: 'flex-start',
    paddingHorizontal: 32,
    paddingVertical: 17,
    marginTop: 28,
  },
  offerButtonText: {
    color: '#9C3F00',
    fontSize: 23,
    fontWeight: '800',
  },
  offerLeaf: {
    position: 'absolute',
    right: 44,
    bottom: 70,
  },
});
