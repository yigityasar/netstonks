import React from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, useColorScheme } from 'react-native';
import { Colors, Sizing, Typography } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, leftIcon, style, ...props }) => {
  const theme = useColorScheme() ?? 'light';
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].icon }]}>{label}</Text>
      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: Colors[theme].background,
          borderColor: Colors[theme].border 
        }
      ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, { color: Colors[theme].text }]}
          placeholderTextColor={Colors[theme].icon}
          keyboardType="numeric"
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizing.margin,
  },
  label: {
    fontSize: Typography.sizes.small,
    fontWeight: Typography.weights.medium,
    marginBottom: 4,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Sizing.radius,
    height: 56,
    paddingHorizontal: Sizing.padding,
  },
  iconContainer: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.base,
    height: '100%',
  },
});
