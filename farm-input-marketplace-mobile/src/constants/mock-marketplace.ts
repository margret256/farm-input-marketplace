import type { ComponentProps } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export type AppTabKey = 'home' | 'market' | 'orders' | 'alerts' | 'profile';

export type ProductItem = {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  rating: string;
  image: ImageSourcePropType;
  badge?: string;
  status?: 'in-stock' | 'low-stock' | 'out-of-stock';
};

export const appImages = {
  farm: require('@/assets/images/farm.png'),
  harvest: require('@/assets/images/haverst.png'),
  smartFarming: require('@/assets/images/smart-farming.png'),
  betterYields: require('@/assets/images/better-yields.png'),
  fastPayments: require('@/assets/images/fast-payments.png'),
  farmStatus: require('@/assets/images/farm-status.png'),
  agroHub: require('@/assets/images/agro-hub.png'),
  logo: require('@/assets/images/logo.png'),
};

export const tabItems: {
  key: AppTabKey;
  label: string;
  route: string;
  icon: ComponentProps<typeof Ionicons>['name'];
}[] = [
  { key: 'home', label: 'Home', route: '/home', icon: 'home' },
  { key: 'market', label: 'Market', route: '/market', icon: 'storefront' },
  { key: 'orders', label: 'Orders', route: '/orders', icon: 'receipt' },
  { key: 'alerts', label: 'Alerts', route: '/alerts', icon: 'notifications' },
  { key: 'profile', label: 'Profile', route: '/profile', icon: 'person' },
];

export const categories: {
  name: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
}[] = [
  { name: 'Seeds', icon: 'seed-outline' },
  { name: 'Fertilizers', icon: 'sack' },
  { name: 'Animal Feeds', icon: 'food-drumstick-outline' },
  { name: 'Farm Tools', icon: 'shovel' },
  { name: 'Irrigation', icon: 'water-pump' },
];

export const featuredProducts: ProductItem[] = [
  {
    id: 'maize',
    name: 'Premium Urea 46%',
    subtitle: 'AgriSource Organic Ltd',
    price: 'UGX 85k',
    rating: '4.8 (124)',
    image: appImages.betterYields,
    badge: 'In Stock',
    status: 'in-stock',
  },
  {
    id: 'seeds',
    name: 'Hybrid Maize H614',
    subtitle: 'Silver Seeds Ltd',
    price: 'UGX 12k',
    rating: '4.9 (96)',
    image: appImages.fastPayments,
    badge: 'Limited Supply',
    status: 'low-stock',
  },
];

export const marketProducts: ProductItem[] = [
  {
    id: 'hybrid-maize',
    name: 'Hybrid Maize Seeds L-10',
    subtitle: 'Simba Farm Depot',
    price: 'UGX 15,000',
    rating: '4.8 (120)',
    image: appImages.fastPayments,
    badge: 'PROMO',
    status: 'in-stock',
  },
  {
    id: 'npk',
    name: 'NPK 17-17-17 (50kg)',
    subtitle: 'Fertilizer World',
    price: 'UGX 180,000',
    rating: '4.5 (85)',
    image: appImages.betterYields,
    status: 'in-stock',
  },
  {
    id: 'hoe',
    name: 'Forged Steel Hoe',
    subtitle: 'Hardware Plus',
    price: 'UGX 22,000',
    rating: '4.9 (42)',
    image: appImages.agroHub,
    status: 'in-stock',
  },
  {
    id: 'tomato',
    name: 'Assorted Tomato Seeds',
    subtitle: 'Green Roots Seeds',
    price: 'UGX 8,500',
    rating: '5.0 (210)',
    image: appImages.smartFarming,
    badge: 'TOP RATED',
    status: 'low-stock',
  },
];

export const recommendedProducts = [
  {
    name: 'Digital Soil pH Meter',
    subtitle: 'Precision Farming Tools',
    price: 'UGX 45,000',
    image: appImages.farmStatus,
  },
  {
    name: 'Pro 16L Knapsack Sprayer',
    subtitle: 'Duracare Supplies',
    price: 'UGX 120,000',
    image: appImages.agroHub,
  },
];

export const cartItems = [
  {
    name: 'Hybrid Maize Seeds',
    description: 'High-yield variety, 10kg bag',
    price: '$45.00',
    quantity: 2,
    image: appImages.fastPayments,
  },
  {
    name: 'NPK Fertilizer',
    description: 'NPK 15-15-15, 50kg industrial bag',
    price: '$112.50',
    quantity: 1,
    image: appImages.betterYields,
  },
];

export const dealerOffers = [
  {
    name: 'Agro-Input Central',
    price: 'UGX 82,000',
    delivery: '+ UGX 5,000 delivery',
    rating: '4.8 (120+)',
    status: 'In Stock (24 units)',
    selected: true,
    icon: 'storefront-outline' as ComponentProps<typeof Ionicons>['name'],
  },
  {
    name: "Farmer's Choice Ltd",
    price: 'UGX 85,000',
    delivery: 'Free Delivery',
    rating: '4.5 (89)',
    status: 'In Stock',
    selected: false,
    icon: 'storefront-outline' as ComponentProps<typeof Ionicons>['name'],
  },
  {
    name: 'Green Valley Supplies',
    price: 'UGX 84,500',
    delivery: '+ UGX 8,000 delivery',
    rating: '4.2 (45)',
    status: 'Low Stock (3 left)',
    selected: false,
    icon: 'car-outline' as ComponentProps<typeof Ionicons>['name'],
  },
];

export const alertItems = [
  {
    title: 'Order Confirmed',
    body: 'Your order #AG-8821 for 50kg Organic Fertilizer has been confirmed by the dealer.',
    time: '2m ago',
    color: '#2E7D32',
    icon: 'receipt-outline' as ComponentProps<typeof Ionicons>['name'],
    unread: true,
  },
  {
    title: 'Payment Successful',
    body: 'Payment of $450.00 for the latest seed inventory was successfully processed.',
    time: '1h ago',
    color: '#F57C00',
    icon: 'wallet-outline' as ComponentProps<typeof Ionicons>['name'],
  },
  {
    title: 'Flash Offer: 15% OFF',
    body: "Get exclusive discounts on high-yield corn seeds for the next 24 hours. Don't miss out!",
    time: '4h ago',
    color: '#FBC02D',
    icon: 'pricetag-outline' as ComponentProps<typeof Ionicons>['name'],
    image: appImages.harvest,
  },
  {
    title: 'Profile Updated',
    body: 'Your farm location and dealer preferences were updated successfully from your dashboard.',
    time: 'Yesterday',
    color: '#DDE6D6',
    icon: 'settings-outline' as ComponentProps<typeof Ionicons>['name'],
  },
];

export const orderItems = [
  {
    number: '#AM-82910',
    title: '12kg Hybrid Maize Seeds',
    status: 'In Transit',
    total: '$450.00',
    statusColor: '#99F09B',
    images: [appImages.fastPayments, appImages.betterYields],
  },
  {
    number: '#AM-82905',
    title: 'Compact Utility Tractor',
    status: 'Processing',
    total: '$12,400.00',
    statusColor: '#FFD992',
    images: [appImages.farmStatus],
  },
];

export const wishlistItems: ProductItem[] = [
  {
    id: 'tomato-seeds',
    name: 'Hybrid Tomato Seeds',
    subtitle: 'High-yield variety, disease resistant and fast growing.',
    price: '$24.50',
    rating: '',
    image: appImages.fastPayments,
    status: 'in-stock',
  },
  {
    id: 'trowel',
    name: 'Steel Hand Trowel',
    subtitle: 'Ergonomic grip with reinforced heavy-duty stainless steel blade.',
    price: '$12.99',
    rating: '',
    image: appImages.agroHub,
    status: 'out-of-stock',
  },
  {
    id: 'organic-npk',
    name: 'Organic NPK 10-10-10',
    subtitle: 'Slow-release granules for sustained vegetable growth.',
    price: '$45.00',
    rating: '',
    image: appImages.betterYields,
    status: 'in-stock',
  },
  {
    id: 'controller',
    name: 'Auto-Drip Controller',
    subtitle: 'Bluetooth enabled solar-powered water management system.',
    price: '$89.00',
    rating: '',
    image: appImages.farmStatus,
    status: 'low-stock',
  },
  {
    id: 'pepper-starters',
    name: 'Bell Pepper Starters',
    subtitle: 'Pack of 12 healthy starters ready for field transplantation.',
    price: '$18.75',
    rating: '',
    image: appImages.harvest,
    status: 'in-stock',
  },
  {
    id: 'ph-monitor',
    name: 'Soil pH Monitor',
    subtitle: 'Instant digital readings for pH, moisture, and light levels.',
    price: '$32.00',
    rating: '',
    image: appImages.smartFarming,
    status: 'in-stock',
  },
];
