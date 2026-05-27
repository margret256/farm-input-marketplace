import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppScreen } from '@/components/marketplace/AppScreen';
import { appImages } from '@/constants/mock-marketplace';
import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const instructions = [
  ['Soil test', 'Determine nitrogen requirements before application to avoid over-saturation.'],
  ['Broadcast application', 'Spread evenly across the field using a spreader or manual broadcast technique.'],
  ['Incorporation', 'Mix into the top 2-4 inches of soil immediately to prevent nitrogen loss.'],
];

export function ProductDetailsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <AppScreen back cart title="AgroMarket" padded={false}>
        <Image source={appImages.betterYields} style={styles.hero} />
        <View style={styles.body}>
          <View style={styles.titleRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Premium Urea Fertilizer{'\n'}(46-0-0)</Text>
              <View style={styles.starRow}>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Ionicons key={star} name="star" size={13} color="#8A5A00" />
                ))}
                <Text style={styles.reviewText}>4.8 (120 reviews)</Text>
              </View>
              <Text style={styles.price}>UGX 85,000</Text>
            </View>
            <Text style={styles.stock}>In{'\n'}Stock</Text>
          </View>
          <View style={styles.descriptionCard}>
            <Text style={styles.cardLabel}>DESCRIPTION</Text>
            <Text style={styles.description}>
              High-quality nitrogen fertilizer for rapid crop growth and healthy yields. Specifically formulated for East African soil conditions to maximize grain development.
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Usage Instructions</Text>
          {instructions.map((item, index) => (
            <View key={item[0]} style={styles.instructionRow}>
              <Text style={styles.step}>{index + 1}</Text>
              <View style={styles.instructionText}>
                <Text style={styles.instructionTitle}>{item[0]}</Text>
                <Text style={styles.instructionBody}>{item[1]}</Text>
              </View>
            </View>
          ))}
          <View style={[styles.dealerCard, marketplaceShadows.card]}>
            <Image source={appImages.agroHub} style={styles.dealerImage} />
            <View style={styles.dealerInfo}>
              <Text style={styles.dealerName}>Agro-Input Dealer UG</Text>
              <Text style={styles.dealerMeta}>Kampala, Central Region</Text>
            </View>
            <Ionicons name="chatbox-outline" size={23} color={marketplaceColors.primaryDark} />
          </View>
          <View style={styles.ratingsRow}>
            <View>
              <Text style={styles.bigRating}>4.8</Text>
              <Text style={styles.outOf}>OUT OF 5</Text>
            </View>
            <View style={styles.ratingBars}>
              {[5, 4, 3, 2, 1].map((rating, index) => (
                <View key={rating} style={styles.barRow}>
                  <Text style={styles.barLabel}>{rating}</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${90 - index * 16}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.reviewCard}>
            <Text style={styles.reviewer}>John Musoke</Text>
            <View style={styles.reviewStarRow}>
              {[0, 1, 2, 3, 4].map((star) => (
                <Ionicons key={star} name="star" size={12} color="#8A5A00" />
              ))}
            </View>
            <Text style={styles.reviewBody}>
              This urea worked wonders on my maize crop this season. Prompt delivery from the dealer as well.
            </Text>
          </View>
          <Pressable style={styles.allReviews}>
            <Text style={styles.allReviewsText}>See all 120 reviews</Text>
          </Pressable>
        </View>
      </AppScreen>
      <View style={styles.bottomBar}>
        <Ionicons name="heart-outline" size={25} color={marketplaceColors.primaryDark} />
        <Pressable onPress={() => router.push('/cart')} style={styles.outlineButton}>
          <Text style={styles.outlineText}>Add to Cart</Text>
        </Pressable>
        <Pressable onPress={() => router.push('/checkout')} style={styles.buyButton}>
          <Text style={styles.buyText}>Buy Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: marketplaceColors.screen },
  hero: {
    width: '100%',
    height: 330,
    resizeMode: 'cover',
  },
  body: {
    padding: 24,
    paddingBottom: 130,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBlock: { flex: 1 },
  title: {
    color: '#101710',
    fontSize: 25,
    lineHeight: 30,
    fontWeight: '900',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 10,
  },
  reviewText: {
    color: marketplaceColors.inkSoft,
    fontSize: 11,
  },
  price: {
    color: '#B45500',
    fontSize: 29,
    fontWeight: '900',
    marginTop: 10,
  },
  stock: {
    color: marketplaceColors.primaryDark,
    backgroundColor: '#EAF4E8',
    borderRadius: 6,
    overflow: 'hidden',
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '900',
  },
  descriptionCard: {
    backgroundColor: '#F0F5EA',
    borderRadius: 11,
    padding: 18,
    marginTop: 18,
  },
  cardLabel: {
    color: marketplaceColors.inkMuted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  description: {
    color: marketplaceColors.inkSoft,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#101710',
    fontSize: 20,
    fontWeight: '900',
    marginTop: 28,
    marginBottom: 14,
  },
  instructionRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 16,
  },
  step: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: marketplaceColors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '900',
  },
  instructionText: { flex: 1 },
  instructionTitle: {
    color: '#101710',
    fontSize: 12,
    fontWeight: '900',
  },
  instructionBody: {
    color: marketplaceColors.inkSoft,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  dealerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#DDE6D6',
    padding: 13,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  dealerImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  dealerInfo: { flex: 1 },
  dealerName: {
    color: '#101710',
    fontSize: 13,
    fontWeight: '900',
  },
  dealerMeta: {
    color: marketplaceColors.inkMuted,
    fontSize: 10,
    marginTop: 2,
  },
  ratingsRow: {
    flexDirection: 'row',
    gap: 25,
    marginTop: 22,
    alignItems: 'center',
  },
  bigRating: {
    color: '#101710',
    fontSize: 40,
    fontWeight: '900',
  },
  outOf: {
    color: marketplaceColors.inkMuted,
    fontSize: 10,
    fontWeight: '800',
  },
  ratingBars: { flex: 1, gap: 6 },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  barLabel: {
    color: marketplaceColors.inkSoft,
    fontSize: 10,
    width: 10,
  },
  barTrack: {
    flex: 1,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#DDE6D6',
  },
  barFill: {
    height: 5,
    borderRadius: 4,
    backgroundColor: marketplaceColors.primary,
  },
  reviewCard: {
    backgroundColor: '#EAF4E8',
    borderLeftWidth: 4,
    borderLeftColor: marketplaceColors.primary,
    borderRadius: 10,
    padding: 16,
    marginTop: 18,
  },
  reviewer: {
    color: '#101710',
    fontSize: 12,
    fontWeight: '900',
  },
  reviewStarRow: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 4,
  },
  reviewBody: {
    color: marketplaceColors.inkSoft,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  allReviews: {
    borderWidth: 1,
    borderColor: '#B9C8B2',
    borderRadius: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  allReviewsText: {
    color: marketplaceColors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    backgroundColor: marketplaceColors.screen,
    borderTopWidth: 1,
    borderTopColor: '#CAD5C4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: marketplaceColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineText: {
    color: marketplaceColors.primaryDark,
    fontSize: 14,
    fontWeight: '900',
  },
  buyButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    backgroundColor: marketplaceColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});
