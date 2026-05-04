import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

const { width } = Dimensions.get('window');

export const MeshBackground: React.FC = () => {
  const theme = useAppTheme();
  const currentColors = Colors[theme];
  const bottomColor = theme === 'light' ? '#F0E6D2' : currentColors.primary;
  const glowOpacity = theme === 'light' ? 0.6 : 0.15;

  return (
    <View style={[styles.container, { backgroundColor: currentColors.background }]} pointerEvents="none">
      <LinearGradient
        colors={[currentColors.secondary, 'transparent']}
        style={[styles.glow, { top: -width * 0.3, right: -width * 0.4, opacity: glowOpacity }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
      
      <LinearGradient
        colors={[bottomColor, 'transparent']}
        style={[styles.glow, { bottom: -width * 0.2, left: -width * 0.5, opacity: glowOpacity }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      />
      
      <LinearGradient
        colors={[currentColors.secondary, 'transparent']}
        style={[styles.glow, { top: width, left: -width * 0.2, opacity: theme === 'light' ? 0.4 : 0.05 }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
  },
});
