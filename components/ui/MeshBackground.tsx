import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';

const { width } = Dimensions.get('window');

export const MeshBackground: React.FC = () => {
  return (
    <View style={styles.container} pointerEvents="none">
      <LinearGradient
        colors={[Colors.dark.secondary, 'transparent']}
        style={[styles.glow, { top: -width * 0.3, right: -width * 0.4 }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
      
      <LinearGradient
        colors={[Colors.dark.primary, 'transparent']}
        style={[styles.glow, { bottom: -width * 0.2, left: -width * 0.5 }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 0, y: 0 }}
      />
      
      <LinearGradient
        colors={[Colors.dark.secondary, 'transparent']}
        style={[styles.glow, { top: width, left: -width * 0.2, opacity: 0.05 }]}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.dark.background,
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    opacity: 0.15,
  },
});
