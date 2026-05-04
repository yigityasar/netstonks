import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';
import { Colors, Sizing, Typography } from '@/constants/theme';

interface SegmentedControlProps {
  label: string;
  options: number[];
  selectedValue: number;
  onSelect: (value: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ label, options, selectedValue, onSelect }) => {
  const theme = useColorScheme() ?? 'light';

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].icon }]}>{label}</Text>
      <View style={[styles.optionsContainer, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].border }]}>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && { backgroundColor: Colors[theme].tint }
              ]}
              onPress={() => onSelect(option)}
            >
              <Text 
                style={[
                  styles.optionText, 
                  { color: isSelected ? '#fff' : Colors[theme].text },
                  isSelected && styles.optionTextSelected
                ]}
              >
                %{option}
              </Text>
            </TouchableOpacity>
          );
        })}
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
  },
  optionsContainer: {
    flexDirection: 'row',
    borderRadius: Sizing.radius,
    borderWidth: 1,
    overflow: 'hidden',
    height: 48,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  optionTextSelected: {
    fontWeight: Typography.weights.bold,
  },
});
