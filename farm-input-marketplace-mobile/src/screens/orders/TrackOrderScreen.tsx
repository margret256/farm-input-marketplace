import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const timeline = [
  ['Order Placed', 'Oct 10, 02:30 PM', true, 'checkmark'],
  ['Payment Confirmed', 'Oct 10, 02:45 PM', true, 'checkmark'],
  ['Preparing Order', 'Oct 11, 09:00 AM', true, 'checkmark'],
  ['Shipped', 'Package is on the way to your location', true, 'car-outline'],
  ['Out for Delivery', 'Pending', false, 'bicycle-outline'],
  ['Delivered', 'Pending', false, 'checkmark-done-outline'],
] as const;

export function TrackOrderScreen() {
  return (
    <StaticScreen>
      <AppScreen back help notificationDot title="Track Order">
        <View style={[styles.mapCard, marketplaceShadows.card]}>
          <Image source={appImages.harvest} style={styles.mapImage} />
          <View style={styles.mapOverlay} />
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>Live Tracking</Text>
          </View>
          <View style={styles.routeLine} />
          <View style={styles.routePin} />
        </View>

        <View style={[styles.arrivalCard, marketplaceShadows.card]}>
          <Text style={styles.arrivalLabel}>ESTIMATED ARRIVAL</Text>
          <Text style={styles.arrivalTime}>Oct 12, 10:00 AM</Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
          <View style={styles.arrivalRow}>
            <Text style={styles.orderNumber}>Order #AG-99821</Text>
            <Text style={styles.distance}>6.4 km away</Text>
          </View>
        </View>

        <View style={styles.timeline}>
          {timeline.map(([title, subtitle, completed, icon], index) => (
            <View key={title} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                {index < timeline.length - 1 ? <View style={[styles.verticalLine, !completed && styles.mutedLine]} /> : null}
                <View style={[styles.timelineIcon, completed ? styles.completedIcon : styles.pendingIcon, title === 'Shipped' && styles.currentIcon]}>
                  <Ionicons name={icon} size={completed ? 22 : 20} color={completed ? '#FFFFFF' : marketplaceColors.inkMuted} />
                </View>
              </View>
              <View style={styles.timelineBody}>
                <Text style={[styles.timelineTitle, completed && styles.completedTitle, title === 'Shipped' && styles.currentTitle]}>{title}</Text>
                <Text style={styles.timelineSubtitle}>{subtitle}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.riderCard, marketplaceShadows.card]}>
          <Image source={appImages.smartFarming} style={styles.riderPhoto} />
          <View style={styles.riderBody}>
            <Text style={styles.riderName}>Samuel Mwangi</Text>
            <Text style={styles.riderRating}>4.9 (240+ deliveries)</Text>
          </View>
          <Pressable style={styles.callButton}>
            <Ionicons name="call-outline" size={29} color="#FFFFFF" />
            <Text style={styles.callText}>Call Rider</Text>
          </Pressable>
        </View>
      </AppScreen>
      <FloatingTabBar active="orders" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  mapCard: { height: 262, borderRadius: 12, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#B8C6B1' },
  mapImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  mapOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,40,20,0.28)' },
  liveBadge: {
    position: 'absolute',
    top: 28,
    left: 24,
    borderRadius: 24,
    backgroundColor: '#EAF4E8',
    paddingHorizontal: 18,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  liveDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: marketplaceColors.primary },
  liveText: { color: marketplaceColors.primaryDark, fontSize: 16, fontWeight: '900' },
  routeLine: {
    position: 'absolute',
    left: '37%',
    bottom: 34,
    width: 3,
    height: 150,
    backgroundColor: marketplaceColors.secondary,
    transform: [{ rotate: '19deg' }],
  },
  routePin: {
    position: 'absolute',
    left: '34%',
    bottom: 28,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: marketplaceColors.secondary,
    borderWidth: 2,
    borderColor: '#101710',
  },
  arrivalCard: { backgroundColor: '#FFFFFF', borderRadius: 14, borderWidth: 1, borderColor: '#B8C6B1', padding: 22, marginTop: 34 },
  arrivalLabel: { color: marketplaceColors.inkSoft, fontSize: 17, fontWeight: '900', letterSpacing: 1.3 },
  arrivalTime: { color: marketplaceColors.primaryDark, fontSize: 29, fontWeight: '900', marginTop: 12 },
  progressTrack: { height: 9, borderRadius: 8, backgroundColor: '#DDE6D6', marginTop: 28 },
  progressFill: { width: '67%', height: 9, borderRadius: 8, backgroundColor: marketplaceColors.primaryDark },
  arrivalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  orderNumber: { color: marketplaceColors.primaryDark, fontSize: 17, fontWeight: '900' },
  distance: { color: marketplaceColors.inkSoft, fontSize: 17, fontWeight: '800' },
  timeline: { marginTop: 34, gap: 0 },
  timelineItem: { flexDirection: 'row', minHeight: 104 },
  timelineLeft: { width: 62, alignItems: 'center', position: 'relative' },
  verticalLine: { position: 'absolute', top: 39, width: 3, height: 72, backgroundColor: marketplaceColors.primaryDark },
  mutedLine: { backgroundColor: '#CAD5C4' },
  timelineIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  completedIcon: { backgroundColor: marketplaceColors.primaryDark },
  pendingIcon: { backgroundColor: '#E2E8DC' },
  currentIcon: { borderWidth: 8, borderColor: '#B9F0B9', backgroundColor: marketplaceColors.primary },
  timelineBody: { flex: 1, paddingTop: 2 },
  timelineTitle: { color: marketplaceColors.inkSoft, fontSize: 28, fontWeight: '500' },
  completedTitle: { color: marketplaceColors.primaryDark },
  currentTitle: { fontWeight: '900' },
  timelineSubtitle: { color: marketplaceColors.inkSoft, fontSize: 19, marginTop: 6 },
  riderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#B8C6B1',
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 26,
  },
  riderPhoto: { width: 74, height: 74, borderRadius: 37, borderWidth: 3, borderColor: '#8BEF90' },
  riderBody: { flex: 1 },
  riderName: { color: '#101710', fontSize: 22, fontWeight: '900' },
  riderRating: { color: marketplaceColors.inkSoft, fontSize: 17, marginTop: 6 },
  callButton: {
    width: 158,
    height: 88,
    borderRadius: 15,
    backgroundColor: '#A24900',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  callText: { color: '#FFFFFF', fontSize: 21, fontWeight: '900' },
});
