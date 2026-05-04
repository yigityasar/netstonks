import { Platform } from 'react-native';

const stonksOrange = '#E05A00'; // Deep Orange / Soft Copper
const stonksBeige = '#FDFBF7'; // Soft Cream
const stonksPeach = '#FFDAB9'; // Warm Peach
const stonksDarkText = '#1E293B'; // Dark Charcoal
const stonksIcon = '#64748B'; // Slate Grey

const stonksCardBackground = 'rgba(255, 255, 255, 0.4)'; // Frosted light glass
const stonksBorder = 'rgba(0, 0, 0, 0.05)';

const beigeTheme = {
  text: stonksDarkText,
  background: stonksBeige,
  tint: stonksOrange,
  card: stonksCardBackground,
  border: stonksBorder,
  icon: stonksIcon,
  profit: '#059669', // Deep green for profit
  loss: '#DC2626', // Deep red for loss
  primary: stonksOrange,
  secondary: stonksPeach,
  glassHighlight: 'rgba(255, 255, 255, 0.6)',
};

const stonksDarkOrange = '#FF5A00'; // Electric Orange for neon effects
const stonksBlue = '#00C3FF'; // Cyan for mesh gradient
const stonksDarkBackground = '#0A0F1C'; // Deep midnight blue
const stonksDarkCardBackground = 'rgba(255, 255, 255, 0.03)'; // Frosted glass baseline
const stonksDarkBorder = 'rgba(255, 255, 255, 0.1)';

const midnightTheme = {
  text: '#F8FAFC',
  background: stonksDarkBackground,
  tint: stonksDarkOrange,
  card: stonksDarkCardBackground,
  border: stonksDarkBorder,
  icon: '#94A3B8',
  profit: '#00E676', // Brighter neon green for profit
  loss: '#FF3B30', // Neon red for loss
  primary: stonksDarkOrange,
  secondary: stonksBlue,
  glassHighlight: 'rgba(255, 255, 255, 0.05)',
};

export const Colors = {
  light: beigeTheme,
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
