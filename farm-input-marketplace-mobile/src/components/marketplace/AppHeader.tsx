import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { marketplaceColors } from '@/constants/marketplace';

type AppHeaderProps = {
  title?: string;
  back?: boolean;
  help?: boolean;
  cart?: boolean;
  notificationDot?: boolean;
};

export function AppHeader({
  title = 'AgroMarket',
  back = false,
  help = false,
  cart = false,
  notificationDot = false,
}: AppHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        {back ? (
          <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={25} color={marketplaceColors.primaryDark} />
          </Pressable>
        ) : (
          <MaterialCommunityIcons name="tractor" size={32} color={marketplaceColors.primaryDark} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.actions}>
        {cart ? (
          <Pressable accessibilityRole="button" onPress={() => router.push('/cart')} style={styles.iconButton}>
            <MaterialCommunityIcons name="tractor" size={28} color={marketplaceColors.primaryDark} />
          </Pressable>
        ) : null}
        {help ? <Ionicons name="help-circle-outline" size={28} color={marketplaceColors.inkSoft} /> : null}
        <View>
          <Ionicons name="notifications-outline" size={29} color={marketplaceColors.inkSoft} />
          {notificationDot ? <View style={styles.dot} /> : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 74,
    borderBottomWidth: 1,
    borderBottomColor: '#CAD5C4',
    backgroundColor: marketplaceColors.screen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
    flex: 1,
  },
  title: {
    color: marketplaceColors.primaryDark,
    fontSize: 30,
    fontWeight: '800',
    letterSpacing: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  iconButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    right: 1,
    top: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C62828',
  },
});
