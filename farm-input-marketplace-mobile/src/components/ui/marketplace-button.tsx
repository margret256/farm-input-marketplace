import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { marketplaceColors, marketplaceShadows } from '@/constants/marketplace';

type ButtonVariant = 'primary' | 'secondary' | 'inverted' | 'outlined';

type MarketplaceButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: ComponentProps<typeof Ionicons>['name'];
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
  children?: ReactNode;
};

export function MarketplaceButton({
  title,
  onPress,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  style,
  disabled = false,
  loading = false,
  children,
}: MarketplaceButtonProps) {
  const variantStyle = styles[variant] ?? styles.primary;
  const textStyle = [
    styles.label,
    variant === 'secondary' || variant === 'outlined' ? styles.labelDark : styles.labelLight,
  ];
  const iconColor =
    variant === 'secondary' || variant === 'outlined' ? marketplaceColors.primaryDark : '#FFFFFF';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      android_ripple={variant === 'primary' ? { color: 'rgba(255,255,255,0.18)' } : undefined}
      style={[
        styles.pressable,
        style,
        (disabled || loading) && styles.disabled,
      ]}>
      <View style={[styles.button, variantStyle, variant === 'primary' && marketplaceShadows.button]}>
        {children}
        {icon && iconPosition === 'left' ? <Ionicons name={icon} size={17} color={iconColor} /> : null}
        <Text style={textStyle}>{loading ? 'Please wait...' : title}</Text>
        {icon && iconPosition === 'right' ? <Ionicons name={icon} size={17} color={iconColor} /> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
    width: '100%',
    alignSelf: 'stretch',
    flexShrink: 0,
  },
  primary: {
    backgroundColor: marketplaceColors.primary,
    borderWidth: 1,
    borderColor: marketplaceColors.primary,
  },
  secondary: {
    backgroundColor: marketplaceColors.card,
  },
  inverted: {
    backgroundColor: marketplaceColors.primaryDark,
    borderWidth: 1,
    borderColor: marketplaceColors.primaryDark,
  },
  outlined: {
    backgroundColor: marketplaceColors.card,
    borderWidth: 1,
    borderColor: marketplaceColors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    lineHeight: 18,
  },
  labelLight: {
    color: '#FFFFFF',
  },
  labelDark: {
    color: marketplaceColors.primaryDark,
  },
  disabled: {
    opacity: 0.9,
  },
});
