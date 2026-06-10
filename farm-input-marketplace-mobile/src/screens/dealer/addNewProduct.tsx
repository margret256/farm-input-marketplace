import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

const CATEGORIES = [
  'Seeds',
  'Fertilizer',
  'Pesticides',
  'Equipment',
  'Soil',
  'Other',
];

export function AddProductScreen() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null, null]);
  const [loading, setLoading] = useState(false);

  async function handlePickImage(index: number) {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        const next = [...images];
        next[index] = result.assets[0].uri;
        setImages(next);
      }
    } catch {
      Alert.alert('Error', 'Failed to pick image');
    }
  }

  function handlePublish() {
    if (!productName || !category || !price) {
      Alert.alert('Missing details', 'Fill in product name, category and price.');
      return;
    }
    Alert.alert('Success', 'Product published successfully!');
  }

  function handleSaveDraft() {
    Alert.alert('Draft saved', 'Your product has been saved as a draft.');
  }

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="menu-outline" size={24} color={marketplaceColors.primaryDark} />
        </Pressable>
        <Text style={styles.headerTitle}>AgroConnect</Text>
        <Ionicons name="notifications-outline" size={24} color={marketplaceColors.primaryDark} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Breadcrumb */}
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbLink}>Inventory</Text>
          <Ionicons name="chevron-forward" size={12} color="#888" />
          <Text style={styles.breadcrumbCurrent}>Add New Product</Text>
        </View>

        <Text style={styles.pageTitle}>List Your Harvest</Text>
        <Text style={styles.pageSubtitle}>
          Fill in the details below to reach thousands of buyers across the region.
        </Text>

        {/* Product Gallery */}
        <View style={styles.card}>
          <Text style={styles.sectionLabel}>PRODUCT GALLERY</Text>
          <View style={styles.galleryGrid}>
            {/* Primary large photo */}
            <Pressable style={styles.primaryPhoto} onPress={() => handlePickImage(0)}>
              {images[0] ? (
                <View style={styles.imagePlaceholderFilled} />
              ) : (
                <>
                  <MaterialCommunityIcons name="camera-plus-outline" size={32} color={marketplaceColors.primary} />
                  <Text style={styles.primaryPhotoLabel}>Primary Photo</Text>
                </>
              )}
            </Pressable>

            {/* Right column: 2 small */}
            <View style={styles.galleryRightCol}>
              {[1, 2].map((i) => (
                <Pressable key={i} style={styles.smallPhoto} onPress={() => handlePickImage(i)}>
                  <Ionicons name="add" size={24} color="#AAAAAA" />
                </Pressable>
              ))}
            </View>
          </View>

          {/* Bottom row: 2 small */}
          <View style={styles.galleryBottomRow}>
            {[3, 4].map((i) => (
              <Pressable key={i} style={styles.smallPhotoWide} onPress={() => handlePickImage(i)}>
                <Ionicons name="add" size={24} color="#AAAAAA" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>PRODUCT NAME</Text>
          <TextInput
            style={styles.fieldInput}
            placeholder="e.g. Premium Grade Hybrid Maize"
            placeholderTextColor="#BCBCBC"
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>CATEGORY</Text>
          <Pressable
            style={styles.dropdownTrigger}
            onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <Text style={[styles.dropdownText, !category && { color: '#BCBCBC' }]}>
              {category || 'Select Category'}
            </Text>
            <Ionicons name="chevron-down" size={18} color="#666" />
          </Pressable>
          {showCategoryDropdown && (
            <View style={styles.dropdown}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{cat}</Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>PRICE (UGX)</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currencyLabel}>UGX</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="0.00"
              placeholderTextColor="#BCBCBC"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={setPrice}
            />
          </View>

          <Text style={[styles.fieldLabel, { marginTop: 16 }]}>QUANTITY AVAILABLE</Text>
          <View style={styles.quantityRow}>
            <Pressable
              style={styles.quantityBtn}
              onPress={() => setQuantity(Math.max(0, quantity - 1))}
            >
              <Ionicons name="remove" size={20} color={marketplaceColors.primaryDark} />
            </Pressable>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <Pressable
              style={styles.quantityBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={20} color={marketplaceColors.primaryDark} />
            </Pressable>
          </View>
        </View>

        {/* Description */}
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>PRODUCT DESCRIPTION</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe the origin, quality, and any special features of your product..."
            placeholderTextColor="#BCBCBC"
            multiline
            maxLength={1000}
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.descriptionFooter}>
            <Text style={styles.descriptionTip}>
              Helpful tip: Detailed descriptions increase buyer trust by 40%.
            </Text>
            <Text style={styles.descriptionCount}>{description.length} / 1000</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <Pressable style={styles.draftButton} onPress={handleSaveDraft}>
            <Text style={styles.draftButtonText}>Save Draft</Text>
          </Pressable>
          <Pressable style={styles.publishButton} onPress={handlePublish} disabled={loading}>
            <Ionicons name="rocket-outline" size={18} color="#FFF" />
            <Text style={styles.publishButtonText}>Publish Product</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F2F5EE' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F2F5EE',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: marketplaceColors.primaryDark,
  },
  content: { padding: 16, paddingBottom: 40 },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  breadcrumbLink: { fontSize: 12, color: '#666' },
  breadcrumbCurrent: { fontSize: 12, color: '#333', fontWeight: '700' },
  pageTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#101710',
    marginBottom: 6,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 20,
    lineHeight: 18,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...marketplaceShadows.card,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 12,
  },
  galleryGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  primaryPhoto: {
    flex: 2,
    height: 180,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDE6D6',
    borderStyle: 'dashed',
    backgroundColor: '#F7FAF0',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  primaryPhotoLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: marketplaceColors.primary,
  },
  imagePlaceholderFilled: {
    flex: 1,
    width: '100%',
    backgroundColor: '#C8DDB8',
    borderRadius: 10,
  },
  galleryRightCol: {
    flex: 1,
    gap: 8,
  },
  smallPhoto: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDE6D6',
    backgroundColor: '#F7FAF0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 84,
  },
  galleryBottomRow: {
    flexDirection: 'row',
    gap: 8,
  },
  smallPhotoWide: {
    flex: 1,
    height: 84,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#DDE6D6',
    backgroundColor: '#F7FAF0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#888',
    letterSpacing: 1,
    marginBottom: 8,
  },
  fieldInput: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#101710',
  },
  dropdownTrigger: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownText: { fontSize: 14, color: '#101710' },
  dropdown: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#FFFFFF',
    marginTop: 4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemText: { fontSize: 14, color: '#101710' },
  priceRow: {
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currencyLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#888',
  },
  priceInput: {
    flex: 1,
    fontSize: 14,
    color: '#101710',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 14,
  },
  quantityBtn: { padding: 4 },
  quantityValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#101710',
  },
  descriptionInput: {
    minHeight: 120,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E8DA',
    backgroundColor: '#F7FAF0',
    paddingHorizontal: 14,
    paddingTop: 12,
    fontSize: 13,
    color: '#101710',
    textAlignVertical: 'top',
  },
  descriptionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
  },
  descriptionTip: {
    flex: 1,
    fontSize: 11,
    color: '#888',
    fontStyle: 'italic',
    lineHeight: 15,
  },
  descriptionCount: {
    fontSize: 11,
    color: '#888',
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 4,
  },
  draftButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: marketplaceColors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  draftButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: marketplaceColors.primaryDark,
  },
  publishButton: {
    flex: 1.4,
    height: 52,
    borderRadius: 26,
    backgroundColor: marketplaceColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  publishButtonText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});