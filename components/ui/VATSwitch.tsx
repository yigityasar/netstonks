import React from 'react';
import { View, Text, Switch, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Typography, Sizing } from '@/constants/theme';

interface VATSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const VATSwitch: React.FC<VATSwitchProps> = ({ label, value, onValueChange }) => {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].text }]}>{label}</Text>
      <Switch
        trackColor={{ false: Colors[theme].border, true: Colors[theme].tint }}
        thumbColor={'#fff'}
        ios_backgroundColor={Colors[theme].border}
        onValueChange={onValueChange}
        value={value}
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
  },
  label: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
});
