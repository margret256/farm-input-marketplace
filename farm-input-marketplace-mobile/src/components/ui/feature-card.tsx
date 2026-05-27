import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { marketplaceColors } from '@/constants/marketplace';

type FeatureCardProps = {
  label: string;
  icon: ComponentProps<typeof Ionicons>['name'] | ComponentProps<typeof MaterialCommunityIcons>['name'];
  color?: 'green' | 'orange';
};

export function FeatureCard({ label, icon, color = 'green' }: FeatureCardProps) {
  const isOrange = color === 'orange';

  return (
    <View style={styles.card}>
      {isOrange ? (
        <MaterialCommunityIcons name={icon as ComponentProps<typeof MaterialCommunityIcons>['name']} size={20} color={marketplaceColors.secondary} />
      ) : (
        <Ionicons name={icon as ComponentProps<typeof Ionicons>['name']} size={20} color={marketplaceColors.primary} />
      )}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 71,
    borderRadius: 11,
    backgroundColor: marketplaceColors.muted,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    gap: 7,
  },
  label: {
    color: marketplaceColors.ink,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0,
  },
});
