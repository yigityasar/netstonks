import { Platform } from 'react-native';

const stonksOrange = '#FF5A00'; // Electric Orange for neon effects
const stonksBlue = '#00C3FF'; // Cyan for mesh gradient
const stonksDarkBackground = '#0A0F1C'; // Deep midnight blue
const stonksCardBackground = 'rgba(255, 255, 255, 0.03)'; // Frosted glass baseline
const stonksBorder = 'rgba(255, 255, 255, 0.1)';

const midnightTheme = {
  text: '#F8FAFC',
  background: stonksDarkBackground,
  tint: stonksOrange,
  card: stonksCardBackground,
  border: stonksBorder,
  icon: '#94A3B8',
  profit: '#00E676', // Brighter neon green for profit
  loss: '#FF3B30', // Neon red for loss
  primary: stonksOrange,
  secondary: stonksBlue,
  glassHighlight: 'rgba(255, 255, 255, 0.05)',
};

export const Colors = {
  light: midnightTheme,
  dark: midnightTheme,
};

export const Sizing = {
  radius: 24, // Softer curves for premium feel
  padding: 20,
  margin: 16,
};

export const Typography = {
  sizes: {
    small: 13,
    base: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 34,
    xxxlarge: 52,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    bold: '700' as const,
    black: '900' as const,
  }
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
