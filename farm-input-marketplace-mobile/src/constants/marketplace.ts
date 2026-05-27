import type { ImageSourcePropType } from 'react-native';

export const marketplaceColors = {
  primary: '#2E7D32',
  primaryDark: '#1B5E20',
  primarySoft: '#EAF4E8',
  secondary: '#F57C00',
  tertiary: '#FBC02D',
  neutral: '#747970',
  screen: '#F7FAF0',
  card: '#FFFFFF',
  muted: '#F2F5EC',
  border: '#E3E8DC',
  ink: '#101710',
  inkSoft: '#344033',
  inkMuted: '#747970',
  danger: '#C62828',
  warningSoft: '#FFF2DE',
};

export const marketplaceShadows = {
  card: {
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 4,
  },
  button: {
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 3,
  },
};

export const marketplaceImages: {
  logo: ImageSourcePropType;
  splashBackground?: ImageSourcePropType;
  onboardingWelcome?: ImageSourcePropType;
  onboardingCompare?: ImageSourcePropType;
  onboardingDelivery?: ImageSourcePropType;
  forgotPassword?: ImageSourcePropType;
  otpHero?: ImageSourcePropType;
} = {
  logo: require('@/assets/images/logo.png'),
  splashBackground: require('@/assets/images/farm.png'),
  onboardingWelcome: require('@/assets/images/smart-farming.png'),
  onboardingCompare: require('@/assets/images/better-yields.png'),
  onboardingDelivery: require('@/assets/images/fast-payments.png'),
  forgotPassword: require('@/assets/images/farm.png'),
  otpHero: require('@/assets/images/haverst.png'),
};

export const onboardingSlides = [
  {
    key: 'welcome',
    title: 'Buy Farm Inputs\nEasily',
    body: 'Find seeds, fertilizers, pesticides, and more directly from trusted dealers. Modern tools for the efficient farmer.',
    primaryFeature: 'Verified Sellers',
    secondaryFeature: 'Fast Delivery',
  },
  {
    key: 'compare',
    title: 'Compare Prices\nInstantly',
    body: "Choose the best prices from multiple agro-dealers. Save time and maximize your farm's profitability.",
    primaryFeature: 'Local Dealers',
    secondaryFeature: 'Secure Sourcing',
  },
  {
    key: 'delivery',
    title: 'Pay Securely & Get\nDelivery',
    body: 'Order and pay using MTN MoMo or Airtel Money.',
    primaryFeature: 'Secure Escrow',
    secondaryFeature: 'Farm Delivery',
  },
];
