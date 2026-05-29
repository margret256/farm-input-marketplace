import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function ProfileScreen() {
  return (
    <StaticScreen>
      <AppScreen notificationDot title="AgroMarket">
        {/* Profile hero banner */}
        <View style={styles.heroBanner}>
          <View style={styles.avatarWrap}>
            <Image source={appImages.smartFarming} style={styles.avatar} />
            <Pressable style={styles.editBadge}>
              <Ionicons name="pencil" size={14} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <Text style={styles.name}>Margret Nanyonga</Text>
        <Text style={styles.meta}>Verified Farmer • Wakiso District</Text>

        {/* Personal Information */}
        <View style={[styles.section, marketplaceShadows.card]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-outline" size={18} color={marketplaceColors.primaryDark} />
            <Text style={styles.sectionTitle}>Personal Information</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>+256 773 815 442</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Address</Text>
            <Text style={styles.infoValue}>lwangamargret68@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Location</Text>
            <Text style={styles.infoValue}>Wakiso District, Uganda</Text>
          </View>
        </View>

        {/* Farm Information */}
        <View style={[styles.section, marketplaceShadows.card]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="leaf-outline" size={18} color={marketplaceColors.primaryDark} />
            <Text style={styles.sectionTitle}>Farm Information</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Farm type</Text>
            <Text style={styles.infoValue}>Mixed Crop Farm</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Farm size</Text>
            <Text style={styles.infoValue}>12 Hectares</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Crops grown</Text>
            <View style={styles.tagRow}>
              {['Maize', 'Beans', 'Cassava'].map((crop) => (
                <View key={crop} style={styles.tag}>
                  <Text style={styles.tagText}>{crop}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={[styles.section, marketplaceShadows.card]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="settings-outline" size={18} color={marketplaceColors.primaryDark} />
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>
          {[
            { label: 'Change password', icon: 'lock-closed-outline' },
            { label: 'Payment methods', icon: 'wallet-outline' },
            { label: 'Delivery addresses', icon: 'location-outline' },
          ].map((item, i, arr) => (
            <Pressable
              key={item.label}
              style={[styles.settingRow, i < arr.length - 1 && styles.settingBorder]}>
              <Ionicons name={item.icon as any} size={18} color="#555" />
              <Text style={styles.settingText}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={marketplaceColors.inkMuted} />
            </Pressable>
          ))}
        </View>

        {/* Edit Profile button — solid dark green */}
        <Pressable style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </Pressable>

        {/* Logout button — light red background */}
        <Pressable style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>

      </AppScreen>
      <FloatingTabBar active="profile" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  heroBanner: {
    height: 110,
    backgroundColor: marketplaceColors.primaryDark,
    borderRadius: 14,
    marginBottom: 48,
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'absolute',
    bottom: -40,
    alignSelf: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F57C00',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    color: '#101710',
    fontSize: 22,
    fontWeight: '900',
    textAlign: 'center',
  },
  meta: {
    color: marketplaceColors.inkSoft,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E1E8DA',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#101710',
  },
  infoRow: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 11,
    color: marketplaceColors.inkMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#101710',
    fontWeight: '700',
  },
  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  tagText: {
    color: marketplaceColors.primaryDark,
    fontSize: 12,
    fontWeight: '700',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
  },
  settingBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F4ED',
  },
  settingText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#101710',
  },
  /* Edit Profile — solid dark green matching app style */
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: marketplaceColors.primaryDark,
    marginBottom: 12,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  /* Logout — light red background, red text */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: '#FDE8E8',
    marginBottom: 24,
  },
  logoutText: {
    color: '#D32F2F',
    fontSize: 15,
    fontWeight: '800',
  },
});