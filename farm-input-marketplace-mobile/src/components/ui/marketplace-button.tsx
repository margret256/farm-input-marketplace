import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

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
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        variant === 'primary' && marketplaceShadows.button,
        style,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
      ]}>
      {children}
      {icon && iconPosition === 'left' ? <Ionicons name={icon} size={17} color={iconColor} /> : null}
      <Text style={textStyle}>{loading ? 'Please wait...' : title}</Text>
      {icon && iconPosition === 'right' ? <Ionicons name={icon} size={17} color={iconColor} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 18,
    width: '100%',
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
    backgroundColor: '#202620',
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
  },
  labelLight: {
    color: '#FFFFFF',
  },
  labelDark: {
    color: marketplaceColors.primaryDark,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.9,
  },
});