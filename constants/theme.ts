import { Platform } from 'react-native';

const stonksOrange = '#FF7A00'; // Primary Orange from Logo
const stonksBlue = '#007AFF'; // Primary Blue
const stonksDarkBackground = '#0B1120'; // Rich Navy Dark 
const stonksCardBackground = '#151E32'; // Lighter Navy for cards
const stonksLightBackground = '#F8FAFC';

export const Colors = {
  light: {
    text: '#0B1120',
    background: stonksLightBackground,
    tint: stonksOrange,
    card: '#FFFFFF',
    border: '#E2E8F0',
    icon: '#64748B',
    profit: '#10B981', // green for actual profit numbers
    loss: '#EF4444', 
    primary: stonksOrange,
    secondary: stonksBlue,
  },
  dark: {
    text: '#F8FAFC',
    background: stonksDarkBackground,
    tint: stonksOrange,
    card: stonksCardBackground,
    border: '#2A364F',
    icon: '#94A3B8',
    profit: '#10B981', // green for actual profit numbers
    loss: '#EF4444',
    primary: stonksOrange,
    secondary: stonksBlue,
  },
};

export const Sizing = {
  radius: 16,
  padding: 16,
  margin: 16,
};

export const Typography = {
  sizes: {
    small: 12,
    base: 16,
    large: 20,
    xlarge: 24,
    xxlarge: 32,
    xxxlarge: 48,
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
