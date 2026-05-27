import { Image, StyleSheet, Text, View } from 'react-native';

import { marketplaceColors, marketplaceImages } from '@/constants/marketplace';

type LogoMarkProps = {
  size?: number;
  showText?: boolean;
};

export function LogoMark({ size = 72, showText = false }: LogoMarkProps) {
  return (
    <View style={[styles.logo, { width: size, height: size, borderRadius: size / 2 }]}>
      <Image source={marketplaceImages.logo} style={[styles.image, { width: size * 0.88, height: size * 0.88 }]} />
      {showText ? (
        <Text style={[styles.text, { fontSize: Math.max(7, size / 10) }]}>FARM INPUT{'\n'}MARKETPLACE</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'contain',
  },
  text: {
    color: marketplaceColors.primaryDark,
    fontWeight: '900',
    lineHeight: 9,
    textAlign: 'center',
    letterSpacing: 0,
    marginTop: -3,
  },
});
