import React from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Typography, Sizing } from '@/constants/theme';

interface VATSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const VATSwitch: React.FC<VATSwitchProps> = ({ label, value, onValueChange }) => {
  const theme = useColorScheme() ?? 'dark';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].text }]}>{label}</Text>
      <Switch
        trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: Colors[theme].tint }}
        thumbColor={'#fff'}
        ios_backgroundColor={'rgba(255, 255, 255, 0.1)'}
        onValueChange={onValueChange}
        value={value}
        style={styles.switch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizing.padding / 2,
    marginBottom: Sizing.margin,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    paddingHorizontal: Sizing.padding,
    borderRadius: Sizing.radius,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  label: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  switch: {
    transform: [{ scale: 0.9 }],
  }
});
