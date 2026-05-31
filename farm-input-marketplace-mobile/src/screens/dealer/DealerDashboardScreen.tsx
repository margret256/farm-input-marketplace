import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { AppHeader } from '@/components/marketplace/AppHeader';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const stats = [
  { label: 'Total Sales', value: '1,248', icon: 'trending-up-outline', iconColor: marketplaceColors.primary, dark: false },
  { label: 'Orders', value: '86', icon: 'bag-handle-outline', iconColor: '#F57C00', dark: false },
  { label: 'Revenue', value: '$42.5k', icon: 'wallet-outline', iconColor: '#FFFFFF', dark: true },
  { label: 'In Stock', value: '312', icon: 'cube-outline', iconColor: '#F57C00', dark: false },
];

const tools = [
  { label: 'Product Management', subtitle: 'Edit listings, prices, and stock levels.', icon: 'create-outline', bg: '#E8F5E9', iconColor: marketplaceColors.primary, route: '/dealer/add-product' },
  { label: 'Order Management', subtitle: 'Track sales and process customer orders.', icon: 'receipt-outline', bg: '#FFF3E0', iconColor: '#F57C00', route: '/orders' },
  { label: 'Delivery Management', subtitle: 'Manage logistics and fleet tracking.', icon: 'car-outline', bg: '#FFF3E0', iconColor: '#F57C00', route: '/track-order' },
  { label: 'Business Analytics', subtitle: 'Detailed performance and growth insights.', icon: 'bar-chart-outline', bg: '#E8F5E9', iconColor: marketplaceColors.primary, route: '/dealer/dashboard' },
];

const activity = [
  { icon: 'checkmark-circle-outline', iconColor: marketplaceColors.primary, title: 'Order #8922 Delivered', subtitle: 'To: Farm Heights Coop • 2h ago', value: '+$1,420', valueColor: marketplaceColors.primary },
  { icon: 'chatbubble-ellipses-outline', iconColor: '#F57C00', title: 'New Order Received', subtitle: 'From: Green Valley Ltd • 5h ago', value: '$850', valueColor: '#101710' },
  { icon: 'warning-outline', iconColor: '#D32F2F', title: 'Low Stock Alert', subtitle: 'NPK Fertilizer (50kg) • 3 units left', value: 'Restock', valueColor: '#D32F2F', badge: true },
];

export function DealerDashboardScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <AppHeader title="AgroConnect" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <Text style={styles.title}>Dealer Dashboard</Text>
        <Text style={styles.subtitle}>Welcome back, Harvesters Co. Here's your overview.</Text>

        {/* Stats grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={[styles.statCard, stat.dark && styles.statCardDark, marketplaceShadows.card]}>
              <Ionicons name={stat.icon as any} size={20} color={stat.iconColor} />
              <Text style={[styles.statLabel, stat.dark && styles.statLabelDark]}>{stat.label}</Text>
              <Text style={[styles.statValue, stat.dark && styles.statValueDark]}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Management Tools */}
        <Text style={styles.sectionTitle}>Management Tools</Text>
        <View style={styles.toolsList}>
          {tools.map((tool) => (
            <Pressable key={tool.label} style={[styles.toolCard, marketplaceShadows.card]} onPress={() => router.push(tool.route as any)}>
              <View style={[styles.toolIcon, { backgroundColor: tool.bg }]}>
                <Ionicons name={tool.icon as any} size={20} color={tool.iconColor} />
              </View>
              <View style={styles.toolBody}>
                <Text style={styles.toolTitle}>{tool.label}</Text>
                <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={marketplaceColors.inkMuted} />
            </Pressable>
          ))}
        </View>

        {/* Promo banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoContent}>
            <Text style={styles.promoTitle}>Restock Seeds{'\n'}Today</Text>
            <Text style={styles.promoSubtitle}>
              Get a 15% discount on bulk orders of hybrid maize and wheat seeds.
            </Text>
            <Pressable style={styles.promoButton}>
              <Text style={styles.promoButtonText}>View Catalog</Text>
            </Pressable>
          </View>
          <Image source={appImages.harvest} style={styles.promoImage} />
          <View style={styles.promoOverlay} />
        </View>

        {/* Recent Activity */}
        <View style={styles.activityHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Pressable>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <View style={[styles.activityCard, marketplaceShadows.card]}>
          {activity.map((item, i) => (
            <View key={item.title}>
              <View style={styles.activityRow}>
                <View style={styles.activityIcon}>
                  <Ionicons name={item.icon as any} size={20} color={item.iconColor} />
                </View>
                <View style={styles.activityBody}>
                  <Text style={styles.activityTitle}>{item.title}</Text>
                  <Text style={styles.activitySubtitle}>{item.subtitle}</Text>
                </View>
                {item.badge ? (
                  <View style={styles.restockBadge}>
                    <Text style={styles.restockText}>{item.value}</Text>
                  </View>
                ) : (
                  <Text style={[styles.activityValue, { color: item.valueColor }]}>{item.value}</Text>
                )}
              </View>
              {i < activity.length - 1 && <View style={styles.activityDivider} />}
            </View>
          ))}
        </View>

      </ScrollView>
      <FloatingTabBar active="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: marketplaceColors.screen },
  content: { padding: 16, paddingBottom: 100 },
  title: { fontSize: 20, fontWeight: '900', color: '#101710' },
  subtitle: { fontSize: 12, color: marketplaceColors.inkSoft, marginTop: 3, marginBottom: 16 },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  statCard: {
    width: '47.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    gap: 4,
  },
  statCardDark: {
    backgroundColor: marketplaceColors.primaryDark,
  },
  statLabel: {
    fontSize: 11,
    color: marketplaceColors.inkSoft,
    fontWeight: '600',
    marginTop: 4,
  },
  statLabelDark: { color: '#A5D6A7' },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#101710',
  },
  statValueDark: { color: '#FFFFFF' },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#101710',
    marginBottom: 12,
  },
  toolsList: { gap: 10, marginBottom: 20 },
  toolCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toolIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBody: { flex: 1 },
  toolTitle: { fontSize: 13, fontWeight: '800', color: '#101710' },
  toolSubtitle: { fontSize: 11, color: marketplaceColors.inkSoft, marginTop: 2 },
  promoBanner: {
    borderRadius: 14,
    backgroundColor: '#7B3200',
    overflow: 'hidden',
    padding: 18,
    marginBottom: 20,
    minHeight: 160,
    flexDirection: 'row',
  },
  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(80,30,0,0.55)',
  },
  promoContent: { flex: 1, zIndex: 2 },
  promoTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '900', lineHeight: 26 },
  promoSubtitle: { color: '#FFCC80', fontSize: 11, lineHeight: 16, marginTop: 8 },
  promoButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 14,
  },
  promoButtonText: { color: '#7B3200', fontSize: 13, fontWeight: '800' },
  promoImage: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    resizeMode: 'cover',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  viewAll: { color: marketplaceColors.primaryDark, fontSize: 12, fontWeight: '800' },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityBody: { flex: 1 },
  activityTitle: { fontSize: 12, fontWeight: '800', color: '#101710' },
  activitySubtitle: { fontSize: 11, color: marketplaceColors.inkSoft, marginTop: 2 },
  activityValue: { fontSize: 13, fontWeight: '800' },
  activityDivider: { height: 1, backgroundColor: '#F0F4ED', marginVertical: 8 },
  restockBadge: {
    backgroundColor: '#D32F2F',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  restockText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
});