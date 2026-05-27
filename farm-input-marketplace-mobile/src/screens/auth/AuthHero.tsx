import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

import { marketplaceColors } from '@/constants/marketplace';

type AuthHeroProps = {
  source?: ImageSourcePropType;
  icon?: ComponentProps<typeof Ionicons>['name'];
};

export function AuthHero({ source, icon = 'leaf-outline' }: AuthHeroProps) {
  if (source) {
    return <Image source={source} style={styles.image} />;
  }

  return (
    <View style={styles.placeholder}>
      <View style={styles.sun} />
      {Array.from({ length: 7 }).map((_, index) => (
        <View key={index} style={[styles.cropRow, { left: index * 36 - 28 }]} />
      ))}
      <View style={styles.iconCard}>
        <Ionicons name={icon} size={42} color={marketplaceColors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 126,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  placeholder: {
    width: '100%',
    height: 126,
    borderRadius: 10,
    backgroundColor: '#DCEACB',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sun: {
    position: 'absolute',
    right: 34,
    top: 22,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(251, 192, 45, 0.46)',
  },
  cropRow: {
    position: 'absolute',
    bottom: -22,
    width: 26,
    height: 150,
    backgroundColor: 'rgba(46, 125, 50, 0.18)',
    transform: [{ rotate: '18deg' }],
  },
  iconCard: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
