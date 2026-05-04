import React from 'react';
import { View, StyleSheet, ViewProps, useColorScheme } from 'react-native';
import { Colors, Sizing } from '@/constants/theme';

interface StonksCardProps extends ViewProps {
  children: React.ReactNode;
}

export const StonksCard: React.FC<StonksCardProps> = ({ children, style, ...props }) => {
  const theme = useColorScheme() ?? 'light';
  const backgroundColor = Colors[theme].card;
  const borderColor = Colors[theme].border;

  return (
    <View 
      style={[
        styles.card, 
        { backgroundColor, borderColor, shadowColor: Colors[theme].text }, 
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: Sizing.radius,
    padding: Sizing.padding,
    marginVertical: Sizing.margin / 2,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
});
