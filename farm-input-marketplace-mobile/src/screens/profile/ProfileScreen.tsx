import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function ProfileScreen() {
  return (
    <StaticScreen>
      <AppScreen notificationDot title="AgroMarket">
        <View style={[styles.profileCard, marketplaceShadows.card]}>
          <Image source={appImages.smartFarming} style={styles.avatar} />
          <Text style={styles.name}>Margret Nanyonga</Text>
          <Text style={styles.meta}>Farmer • Wakiso District</Text>
        </View>
        {['Personal Information', 'Farm Information', 'Payment Methods', 'Delivery Addresses', 'Settings & Support'].map((item) => (
          <View key={item} style={styles.row}>
            <Text style={styles.rowText}>{item}</Text>
            <Ionicons name="chevron-forward" size={20} color={marketplaceColors.inkMuted} />
          </View>
        ))}
      </AppScreen>
      <FloatingTabBar active="profile" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1E8DA',
    marginBottom: 22,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    resizeMode: 'cover',
  },
  name: {
    color: '#101710',
    fontSize: 25,
    fontWeight: '900',
    marginTop: 16,
  },
  meta: {
    color: marketplaceColors.inkSoft,
    fontSize: 15,
    marginTop: 4,
  },
  row: {
    height: 64,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E1E8DA',
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowText: {
    color: '#101710',
    fontSize: 17,
    fontWeight: '800',
  },
});
