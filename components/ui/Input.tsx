import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, useColorScheme } from 'react-native';
import { Colors, Sizing, Typography } from '@/constants/theme';

interface InputProps extends TextInputProps {
  label: string;
  leftIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, leftIcon, style, onFocus, onBlur, ...props }) => {
  const theme = useColorScheme() ?? 'dark';
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].icon }]}>{label}</Text>
      <View style={[
        styles.inputContainer, 
        { 
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          borderColor: isFocused ? Colors[theme].tint : 'rgba(255, 255, 255, 0.1)',
          shadowColor: isFocused ? Colors[theme].tint : 'transparent',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: isFocused ? 0.6 : 0,
          shadowRadius: isFocused ? 12 : 0,
        }
      ]}>
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, { color: Colors[theme].text }]}
          placeholderTextColor={'rgba(255, 255, 255, 0.3)'}
          keyboardType="decimal-pad"
          onFocus={(e) => {
            setIsFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
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
    marginBottom: 8,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: Sizing.radius,
    height: 60,
    paddingHorizontal: Sizing.padding,
  },
  iconContainer: {
    marginRight: 12,
    opacity: 0.8,
  },
  input: {
    flex: 1,
    fontSize: Typography.sizes.base,
    height: '100%',
    fontWeight: Typography.weights.medium,
  },
});
