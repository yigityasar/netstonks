import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

interface SegmentedControlProps {
  label: string;
  options: number[];
  selectedValue: number;
  onSelect: (value: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ label, options, selectedValue, onSelect }) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: Colors[theme].icon }]}>{label}</Text>
      <View style={[styles.optionsContainer]}>
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.option,
                isSelected && { backgroundColor: Colors[theme].tint, borderColor: Colors[theme].tint }
              ]}
              onPress={() => onSelect(option)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.optionText, 
                  { color: isSelected ? '#fff' : Colors[theme].icon },
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
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionsContainer: {
    flexDirection: 'row',
    borderRadius: Sizing.radius,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    padding: 4,
    height: 54,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Sizing.radius - 4,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  optionText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  optionTextSelected: {
    fontWeight: Typography.weights.bold,
  },
});
