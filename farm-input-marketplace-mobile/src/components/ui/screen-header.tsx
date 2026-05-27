import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { marketplaceColors } from '@/constants/marketplace';

type ScreenHeaderProps = {
  title?: string;
  showHelp?: boolean;
};

export function ScreenHeader({ title = 'AgroConnect', showHelp = false }: ScreenHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable accessibilityRole="button" onPress={() => router.back()} style={styles.iconButton}>
        <Ionicons name="arrow-back" size={20} color={marketplaceColors.ink} />
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.rightSlot}>
        {showHelp ? <Ionicons name="help-circle-outline" size={18} color={marketplaceColors.ink} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 48,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: marketplaceColors.primaryDark,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
  },
  rightSlot: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
