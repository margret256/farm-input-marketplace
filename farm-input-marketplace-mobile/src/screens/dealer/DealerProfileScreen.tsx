import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function DealerProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Dealer Profile</Text>
        <Text style={styles.pageSubtitle}>Manage your dealership account and preferences.</Text>

        <View style={[styles.card, marketplaceShadows.card]}>
          <View style={styles.avatar}>
            <Ionicons name="storefront-outline" size={40} color={marketplaceColors.primaryDark} />
          </View>
          <Text style={styles.name}>Harvesters Co.</Text>
          <Text style={styles.role}>Verified Dealer</Text>
        </View>

        <View style={styles.menu}>
          <Pressable style={[styles.menuItem, marketplaceShadows.card]} onPress={() => {}}>
            <Ionicons name="person-outline" size={20} color={marketplaceColors.primaryDark} />
            <Text style={styles.menuText}>Account Details</Text>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </Pressable>
          <Pressable style={[styles.menuItem, marketplaceShadows.card]} onPress={() => {}}>
            <Ionicons name="business-outline" size={20} color={marketplaceColors.primaryDark} />
            <Text style={styles.menuText}>Business Info</Text>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </Pressable>
          <Pressable style={[styles.menuItem, marketplaceShadows.card]} onPress={() => {}}>
            <Ionicons name="settings-outline" size={20} color={marketplaceColors.primaryDark} />
            <Text style={styles.menuText}>Settings</Text>
            <Ionicons name="chevron-forward" size={16} color="#888" />
          </Pressable>
          <Pressable style={[styles.menuItem, marketplaceShadows.card]} onPress={() => router.replace('/role-selection')}>
            <Ionicons name="log-out-outline" size={20} color="#E53935" />
            <Text style={[styles.menuText, { color: '#E53935' }]}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F5EE' },
  content: { padding: 16, paddingBottom: 100 },
  pageTitle: { fontSize: 22, fontWeight: '900', color: '#101710', marginBottom: 4 },
  pageSubtitle: { fontSize: 12, color: '#888', marginBottom: 20, lineHeight: 17 },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: '900', color: '#101710' },
  role: { fontSize: 12, color: marketplaceColors.primaryDark, fontWeight: '700', marginTop: 2 },
  menu: { gap: 10 },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuText: { flex: 1, fontSize: 14, fontWeight: '700', color: '#101710' },
});
