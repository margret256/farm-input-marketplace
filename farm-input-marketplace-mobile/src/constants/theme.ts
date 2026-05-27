/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const FarmColors = {
  primary: '#2E7D32',
  primaryLight: '#66BB6A',
  primaryDark: '#1B5E20',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#9E9E9E',
  darkGray: '#424242',
  black: '#212121',
  orange: '#F57C00',
  yellow: '#FBC02D',
};

const tintColorLight = FarmColors.primary;
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: FarmColors.black,
    background: FarmColors.white,
    tint: tintColorLight,
    icon: FarmColors.darkGray,
    tabIconDefault: FarmColors.gray,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: FarmColors.white,
    background: FarmColors.black,
    tint: tintColorDark,
    icon: FarmColors.gray,
    tabIconDefault: FarmColors.gray,
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
