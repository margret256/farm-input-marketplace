import { Ionicons } from '@expo/vector-icons';
import { type Href, router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { type DealerAppTabKey, dealerTabItems } from '@/constants/mock-marketplace';

type DealerFloatingTabBarProps = {
  active: DealerAppTabKey;
};

export function DealerFloatingTabBar({ active }: DealerFloatingTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View pointerEvents="box-none" style={[styles.wrap, { bottom: insets.bottom + 8 }]}>
      <View style={styles.pill}>
        {dealerTabItems.map((item) => {
          const selected = item.key === active;
          return (
            <Pressable
              accessibilityRole="button"
              key={item.key}
              onPress={() => router.push(item.route as Href)}
              style={[styles.item, selected && styles.activeItem]}>
              <Ionicons
                name={item.icon}
                size={28}
                color={selected ? '#FFFFFF' : '#9E9E9E'}
              />
              <Text style={[styles.label, selected && styles.activeLabel]}>
                {item.label}
              </Text>
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
    alignItems: 'center',
    zIndex: 30,
  },
  pill: {
    width: '96%',
    maxWidth: 400,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8F5E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    shadowColor: '#212121',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  item: {
    width: 46,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
  },
  activeItem: {
    backgroundColor: '#1B5E20',
  },
  label: {
    color: '#9E9E9E',
    fontSize: 7,
    fontWeight: '700',
  },
  activeLabel: {
    color: '#FFFFFF',
  },
});