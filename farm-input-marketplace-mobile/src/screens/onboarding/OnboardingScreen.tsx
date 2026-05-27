import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FeatureCard } from '@/components/ui/feature-card';
import { MarketplaceButton } from '@/components/ui/marketplace-button';
import { marketplaceColors, marketplaceImages, marketplaceShadows, onboardingSlides } from '@/constants/marketplace';

type SlideKey = (typeof onboardingSlides)[number]['key'];

function Dots({ activeIndex }: { activeIndex: number }) {
  return (
    <View style={styles.dots}>
      {onboardingSlides.map((slide, index) => (
        <View key={slide.key} style={[styles.dot, index === activeIndex && styles.dotActive]} />
      ))}
    </View>
  );
}

function Artwork({ slideKey, source }: { slideKey: SlideKey; source?: ImageSourcePropType }) {
  if (source) {
    return (
      <Image
        source={source}
        style={[
          styles.artworkImage,
          slideKey === 'welcome' && styles.welcomeArtworkImage,
          slideKey === 'compare' && styles.compareArtworkImage,
          slideKey === 'delivery' && styles.deliveryArtworkImage,
        ]}
      />
    );
  }

  if (slideKey === 'compare') {
    return (
      <View style={[styles.phoneArtwork, marketplaceShadows.card]}>
        <Text style={styles.phoneMicro}>Compare{'\n'}& Save</Text>
        <View style={styles.priceTags}>
          <View style={[styles.priceTag, styles.priceTagOld]}>
            <Text style={styles.priceTagText}>STANDARD{'\n'}PRICE</Text>
            <Text style={styles.priceValue}>$150</Text>
          </View>
          <View style={[styles.priceTag, styles.priceTagBest]}>
            <Ionicons name="shield-checkmark" size={22} color="#FFFFFF" />
            <Text style={styles.bestText}>BEST{'\n'}PRICE</Text>
            <Text style={styles.priceValue}>$100</Text>
          </View>
        </View>
        <Text style={styles.phoneCaption}>Smart Sourcing,{'\n'}Better Yields</Text>
      </View>
    );
  }

  if (slideKey === 'delivery') {
    return (
      <View style={styles.deliveryArtwork}>
        <View style={styles.cityBars}>
          {[36, 66, 92, 54, 118].map((height, index) => (
            <View key={height} style={[styles.cityBar, { height, left: 34 + index * 28 }]} />
          ))}
        </View>
        <MaterialCommunityIcons name="scooter" size={84} color={marketplaceColors.primary} style={styles.scooter} />
        <View style={[styles.deliveryPhone, marketplaceShadows.card]}>
          <Ionicons name="shield-checkmark" size={30} color={marketplaceColors.primary} />
          <Ionicons name="checkmark-circle" size={26} color={marketplaceColors.primary} />
          <View style={styles.payNowLine} />
          <View style={styles.payNowButton}>
            <Text style={styles.payNowText}>PAY NOW</Text>
          </View>
        </View>
        <Text style={styles.deliveryCaption}>Secure & Fast Payments</Text>
      </View>
    );
  }

  return (
    <View style={styles.welcomeArtwork}>
      <View style={styles.curveBlock} />
      <View style={[styles.welcomePhone, marketplaceShadows.card]}>
        <Ionicons name="phone-portrait-outline" size={45} color={marketplaceColors.primary} />
        <MaterialCommunityIcons name="sprout" size={38} color={marketplaceColors.primary} />
        <Text style={styles.welcomePhoneText}>Smart Farming,{'\n'}Easy Shopping</Text>
        <View style={styles.getStartedMini}>
          <Text style={styles.getStartedMiniText}>Get Started</Text>
        </View>
      </View>
    </View>
  );
}

function WelcomeSlide({ activeIndex, onNext }: { activeIndex: number; onNext: () => void }) {
  const slide = onboardingSlides[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.welcomeCard, marketplaceShadows.card]}>
        <Artwork slideKey="welcome" source={marketplaceImages.onboardingWelcome} />
        <Dots activeIndex={activeIndex} />
        <Text style={styles.titleLeft}>{slide.title}</Text>
        <Text style={styles.bodyLeft}>{slide.body}</Text>
        <View style={styles.featureRow}>
          <FeatureCard label={slide.primaryFeature} icon="shield-checkmark-outline" />
          <FeatureCard label={slide.secondaryFeature} icon="truck-delivery-outline" color="orange" />
        </View>
        <MarketplaceButton title="Next" icon="arrow-forward" onPress={onNext} style={styles.fullButton} />
        <Pressable onPress={() => router.replace('/auth/login')} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CompareSlide({ activeIndex, onNext }: { activeIndex: number; onNext: () => void }) {
  const slide = onboardingSlides[1];

  return (
    <SafeAreaView style={styles.safeAreaPlain}>
      <View style={styles.topDotsSmall}>
        <Dots activeIndex={activeIndex} />
      </View>
      <Artwork slideKey="compare" source={marketplaceImages.onboardingCompare} />
      <Text style={styles.titleCenter}>{slide.title}</Text>
      <Text style={styles.bodyCenter}>{slide.body}</Text>
      <MarketplaceButton title="Next" icon="arrow-forward" onPress={onNext} style={styles.compareButton} />
      <Pressable onPress={() => router.replace('/auth/login')} style={styles.skipButtonLarge}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <View style={styles.tinyFooter}>
        <Ionicons name="bicycle-outline" size={12} color={marketplaceColors.inkMuted} />
        <Text style={styles.tinyFooterText}>Local Dealers</Text>
        <Ionicons name="shield-checkmark-outline" size={12} color={marketplaceColors.inkMuted} />
        <Text style={styles.tinyFooterText}>Secure Sourcing</Text>
      </View>
    </SafeAreaView>
  );
}

function DeliverySlide({ activeIndex }: { activeIndex: number }) {
  const slide = onboardingSlides[2];

  return (
    <View style={styles.deliveryScreen}>
      <View style={styles.deliveryTop}>
        <Artwork slideKey="delivery" source={marketplaceImages.onboardingDelivery} />
      </View>
      <SafeAreaView style={styles.deliverySheet}>
        <Dots activeIndex={activeIndex} />
        <Text style={styles.titleCenter}>{slide.title}</Text>
        <Text style={styles.bodyCenter}>{slide.body}</Text>
        <View style={styles.featureRowDelivery}>
          <FeatureCard label={slide.primaryFeature} icon="shield-checkmark-outline" />
          <FeatureCard label={slide.secondaryFeature} icon="truck-delivery-outline" color="orange" />
        </View>
        <Text style={styles.supportedTitle}>SUPPORTED NETWORKS</Text>
        <View style={styles.networkRow}>
          <View style={styles.networkBadge}>
            <Text style={styles.networkText}>MTN MoMo</Text>
          </View>
          <View style={styles.networkBadge}>
            <Text style={styles.networkText}>Airtel Money</Text>
          </View>
        </View>
        <MarketplaceButton
          title="Get Started"
          icon="arrow-forward"
          onPress={() => router.replace('/auth/login')}
          style={styles.deliveryButton}
        />
        <Pressable onPress={() => router.replace('/auth/login')} style={styles.loginLink}>
          <Text style={styles.loginText}>Already have an account? Log In</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

export function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const screen = useMemo(() => {
    if (activeIndex === 0) {
      return <WelcomeSlide activeIndex={activeIndex} onNext={() => setActiveIndex(1)} />;
    }

    if (activeIndex === 1) {
      return <CompareSlide activeIndex={activeIndex} onNext={() => setActiveIndex(2)} />;
    }

    return <DeliverySlide activeIndex={activeIndex} />;
  }, [activeIndex]);

  return <View style={styles.screen}>{screen}</View>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: marketplaceColors.screen,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 28,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  safeAreaPlain: {
    flex: 1,
    paddingHorizontal: 14,
    paddingTop: 18,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcomeCard: {
    flex: 1,
    maxHeight: 650,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    padding: 24,
  },
  welcomeArtwork: {
    height: 226,
    borderRadius: 22,
    backgroundColor: '#D8EED9',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  curveBlock: {
    position: 'absolute',
    bottom: -24,
    left: -18,
    right: -18,
    height: 92,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 120,
    backgroundColor: '#FFFFFF',
  },
  welcomePhone: {
    width: 128,
    height: 196,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  welcomePhoneText: {
    color: marketplaceColors.primaryDark,
    fontSize: 11,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 14,
    letterSpacing: 0,
  },
  getStartedMini: {
    backgroundColor: marketplaceColors.primary,
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 4,
  },
  getStartedMiniText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#C8D1C0',
  },
  dotActive: {
    width: 23,
    backgroundColor: marketplaceColors.primary,
  },
  titleLeft: {
    color: '#000000',
    fontSize: 26,
    lineHeight: 31,
    fontWeight: '900',
    letterSpacing: 0,
    marginTop: 18,
  },
  bodyLeft: {
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 19,
    letterSpacing: 0,
    marginTop: 12,
  },
  featureRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  fullButton: {
    marginTop: 18,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 18,
  },
  skipButtonLarge: {
    alignItems: 'center',
    paddingVertical: 22,
  },
  skipText: {
    color: marketplaceColors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  topDotsSmall: {
    height: 22,
    justifyContent: 'center',
  },
  artworkImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  welcomeArtworkImage: {
    height: 226,
    borderRadius: 22,
  },
  compareArtworkImage: {
    height: 400,
    resizeMode: 'contain',
  },
  deliveryArtworkImage: {
    height: 320,
    resizeMode: 'cover',
  },
  phoneArtwork: {
    width: '100%',
    height: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  phoneMicro: {
    color: marketplaceColors.inkSoft,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '800',
  },
  priceTags: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  priceTag: {
    width: 84,
    height: 122,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  priceTagOld: {
    backgroundColor: '#E5F2E2',
    transform: [{ rotate: '-8deg' }],
  },
  priceTagBest: {
    backgroundColor: marketplaceColors.primary,
    transform: [{ rotate: '8deg' }],
  },
  priceTagText: {
    color: marketplaceColors.primaryDark,
    fontSize: 8,
    fontWeight: '900',
    textAlign: 'center',
  },
  bestText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    textAlign: 'center',
  },
  priceValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  phoneCaption: {
    color: marketplaceColors.ink,
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  titleCenter: {
    color: '#000000',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 22,
  },
  bodyCenter: {
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: 14,
    paddingHorizontal: 26,
  },
  compareButton: {
    width: '100%',
    marginTop: 26,
  },
  tinyFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
    paddingBottom: 14,
  },
  tinyFooterText: {
    color: marketplaceColors.inkMuted,
    fontSize: 9,
    fontWeight: '700',
  },
  deliveryScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  deliveryTop: {
    height: 320,
    backgroundColor: '#CDEAD2',
    overflow: 'hidden',
  },
  deliveryArtwork: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cityBars: {
    ...StyleSheet.absoluteFillObject,
  },
  cityBar: {
    position: 'absolute',
    bottom: 112,
    width: 22,
    backgroundColor: 'rgba(46, 125, 50, 0.18)',
  },
  scooter: {
    position: 'absolute',
    bottom: 55,
    left: 54,
  },
  deliveryPhone: {
    width: 112,
    height: 190,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    right: 48,
    top: 68,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  payNowLine: {
    width: 58,
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E6EFE1',
  },
  payNowButton: {
    backgroundColor: marketplaceColors.primary,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
  },
  payNowText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  deliveryCaption: {
    position: 'absolute',
    bottom: 28,
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  deliverySheet: {
    flex: 1,
    marginTop: -42,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  featureRowDelivery: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 22,
  },
  supportedTitle: {
    color: marketplaceColors.inkMuted,
    fontSize: 9,
    fontWeight: '900',
    marginTop: 24,
  },
  networkRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 12,
  },
  networkBadge: {
    minWidth: 70,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#E4E8DF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  networkText: {
    color: marketplaceColors.inkMuted,
    fontSize: 9,
    fontWeight: '900',
  },
  deliveryButton: {
    width: '100%',
    marginTop: 24,
  },
  loginLink: {
    paddingVertical: 18,
  },
  loginText: {
    color: marketplaceColors.primaryDark,
    fontSize: 12,
    fontWeight: '800',
  },
});
