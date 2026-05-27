import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppScreen } from '@/components/marketplace/AppScreen';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

export function RoleSelectionScreen() {
  return (
    <AppScreen notificationDot title="AgroMarket">
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.subtitle}>Select your primary role to customize your AgroMarket experience.</Text>
      <View style={[styles.roleCard, styles.selectedCard, marketplaceShadows.card]}>
        <View style={styles.check}>
          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
        </View>
        <Image source={appImages.farmStatus} style={styles.roleImage} />
        <View style={styles.roleFooter}>
          <View>
            <Text style={styles.roleTitle}>Farmer</Text>
            <Text style={styles.roleText}>I want to buy inputs for my farm</Text>
          </View>
          <View style={styles.radio} />
        </View>
      </View>
      <View style={[styles.roleCard, marketplaceShadows.card]}>
        <Image source={appImages.agroHub} style={styles.roleImage} />
        <View style={styles.roleFooter}>
          <View>
            <Text style={styles.roleTitle}>Dealer</Text>
            <Text style={styles.roleText}>I want to sell agricultural supplies</Text>
          </View>
          <View style={styles.emptyRadio} />
        </View>
      </View>
      <MarketplaceButton
        title="Continue"
        icon="arrow-forward"
        onPress={() => router.replace('/home')}
        style={styles.button}
      />
      <View style={styles.brandRow}>
        <MaterialCommunityIcons name="tractor" size={18} color={marketplaceColors.primaryDark} />
        <Text style={styles.brandText}>AgroMarket</Text>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#101710',
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: 0,
  },
  subtitle: {
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 8,
    marginBottom: 14,
  },
  roleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E7DA',
    marginTop: 12,
  },
  selectedCard: {
    borderColor: marketplaceColors.primary,
    borderWidth: 2,
  },
  check: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: marketplaceColors.primary,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleImage: {
    width: '100%',
    height: 214,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  roleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 2,
  },
  roleTitle: {
    color: '#101710',
    fontSize: 18,
    fontWeight: '900',
  },
  roleText: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    marginTop: 3,
    fontWeight: '700',
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 5,
    borderColor: marketplaceColors.primary,
  },
  emptyRadio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#9DA994',
  },
  button: {
    marginTop: 18,
    minHeight: 48,
  },
  brandRow: {
    position: 'absolute',
    top: 8,
    left: 26,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  brandText: {
    color: marketplaceColors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
  },
});
