import { Ionicons } from '@expo/vector-icons';
import { type Href, router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { tabItems, type AppTabKey } from '@/constants/mock-marketplace';

type FloatingTabBarProps = {
  active: AppTabKey;
};

export function FloatingTabBar({ active }: FloatingTabBarProps) {
  return (
    <View pointerEvents="box-none" style={styles.wrap}>
      <View style={styles.pill}>
        {tabItems.map((item) => {
          const selected = item.key === active;
          return (
            <Pressable
              accessibilityRole="button"
              key={item.key}
              onPress={() => router.push(item.route as Href)}
              style={[styles.item, selected && styles.activeItem]}>
              <Ionicons name={item.icon} size={25} color={selected ? '#FFFFFF' : '#B7BDC5'} />
              <Text style={[styles.label, selected && styles.activeLabel]}>{item.label}</Text>
              {selected ? <View style={styles.underline} /> : null}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 24,
    alignItems: 'center',
    zIndex: 30,
  },
  pill: {
    width: '88%',
    maxWidth: 390,
    height: 76,
    borderRadius: 34,
    backgroundColor: '#07090E',
    borderWidth: 1,
    borderColor: '#1C2930',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  item: {
    width: 62,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  activeItem: {
    backgroundColor: '#1C2334',
  },
  label: {
    color: '#B7BDC5',
    fontSize: 9,
    fontWeight: '700',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
  underline: {
    width: 36,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#28D1C2',
    position: 'absolute',
    bottom: 5,
  },
});
