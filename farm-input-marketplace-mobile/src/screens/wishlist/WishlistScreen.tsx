import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen, StaticScreen } from '@/components/marketplace/AppScreen';
import { FloatingTabBar } from '@/components/marketplace/FloatingTabBar';
import { wishlistItems } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function WishlistScreen() {
  return (
    <StaticScreen>
      <AppScreen title="AgroMarket">
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.subtitle}>You have 6 items saved for later planting and tool upgrades.</Text>
        <View style={styles.chips}>
          {['All Items', 'Seeds', 'Equipment', 'Fertilizer'].map((chip, index) => (
            <Text key={chip} style={[styles.chip, index === 0 && styles.activeChip]}>{chip}</Text>
          ))}
        </View>
        <View style={styles.list}>
          {wishlistItems.map((item) => (
            <View key={item.id} style={[styles.card, marketplaceShadows.card]}>
              <Image source={item.image} style={styles.image} />
              <View style={styles.heart}>
                <Ionicons name="heart-outline" size={23} color={marketplaceColors.primaryDark} />
              </View>
              <View style={styles.body}>
                <View style={styles.nameRow}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={[styles.status, item.status === 'out-of-stock' && styles.out, item.status === 'low-stock' && styles.low]}>
                    {item.status === 'out-of-stock' ? 'OUT OF STOCK' : item.status === 'low-stock' ? 'LOW STOCK' : 'IN STOCK'}
                  </Text>
                </View>
                <Text style={styles.description}>{item.subtitle}</Text>
                <View style={styles.bottom}>
                  <Text style={styles.price}>{item.price}</Text>
                  <Pressable style={[styles.cartButton, item.status === 'out-of-stock' && styles.disabledButton]}>
                    <Text style={[styles.cartText, item.status === 'out-of-stock' && styles.disabledText]}>
                      {item.status === 'out-of-stock' ? 'Notify Me' : 'Add to Cart'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </AppScreen>
      <FloatingTabBar active="orders" />
    </StaticScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#101710',
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  chips: {
    flexDirection: 'row',
    gap: 9,
    marginTop: 18,
    marginBottom: 14,
  },
  chip: {
    backgroundColor: '#EAF4E8',
    color: marketplaceColors.primaryDark,
    borderRadius: 18,
    overflow: 'hidden',
    paddingHorizontal: 14,
    paddingVertical: 7,
    fontSize: 11,
    fontWeight: '800',
  },
  activeChip: {
    backgroundColor: marketplaceColors.primaryDark,
    color: '#FFFFFF',
  },
  list: {
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8DC',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 172,
    resizeMode: 'cover',
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: '#F7FAF0',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: marketplaceColors.primaryDark,
  },
  body: {
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  name: {
    flex: 1,
    color: '#101710',
    fontSize: 18,
    fontWeight: '800',
  },
  status: {
    backgroundColor: '#EAF4E8',
    color: marketplaceColors.primaryDark,
    borderRadius: 2,
    overflow: 'hidden',
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 8,
    fontWeight: '900',
  },
  out: {
    backgroundColor: '#FFE8E8',
    color: '#C62828',
  },
  low: {
    backgroundColor: '#FFF2DE',
    color: '#C46A00',
  },
  description: {
    color: marketplaceColors.inkSoft,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 7,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  price: {
    color: marketplaceColors.primaryDark,
    fontSize: 21,
    fontWeight: '900',
  },
  cartButton: {
    backgroundColor: marketplaceColors.primaryDark,
    borderRadius: 6,
    paddingHorizontal: 22,
    paddingVertical: 11,
  },
  cartText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
  disabledButton: {
    backgroundColor: '#E1E8DA',
  },
  disabledText: {
    color: marketplaceColors.inkMuted,
  },
});
