import React from 'react';
import { StyleSheet, ViewProps, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Colors, Sizing } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

interface StonksCardProps extends ViewProps {
  children: React.ReactNode;
}

export const StonksCard: React.FC<StonksCardProps> = ({ children, style, ...props }) => {
  const theme = useAppTheme();
  const backgroundColor = Colors[theme].card;
  const borderColor = Colors[theme].border;

  return (
    <View style={[styles.container, { borderColor }, style]} {...props}>
      <BlurView
        intensity={40}
        tint={theme === 'dark' ? 'dark' : 'light'}
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor }
        ]}
      />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Sizing.margin / 2,
    borderRadius: Sizing.radius,
    overflow: 'hidden',
    borderWidth: 1,
  },
  content: {
    padding: Sizing.padding,
    position: 'relative',
    zIndex: 1,
  },
});
