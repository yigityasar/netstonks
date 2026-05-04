import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import { StonksCard } from '../ui/StonksCard';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { CalculationResults } from '@/utils/calculateMargin';
import { Ionicons } from '@expo/vector-icons';

interface ResultCardProps {
  results: CalculationResults | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  const router = useRouter();
  const theme = useColorScheme() ?? 'light';

  if (!results) {
    return (
      <StonksCard style={styles.emptyContainer}>
        <Ionicons name="calculator-outline" size={48} color={Colors[theme].icon} />
        <Text style={[styles.emptyText, { color: Colors[theme].icon }]}>
          Değerleri girerek sonucu görebilirsiniz.
        </Text>
      </StonksCard>
    );
  }

  const isProfit = results.netProfit >= 0;
  const resultColor = isProfit ? Colors[theme].profit : Colors[theme].loss;

  return (
    <StonksCard style={styles.container}>
      <Text style={[styles.title, { color: Colors[theme].icon }]}>Performans Özeti</Text>
      
      <View style={styles.mainResult}>
        <Text style={[styles.netProfit, { color: resultColor }]}>
          {results.netProfit.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
        </Text>
        <Text style={[styles.profitMargin, { color: resultColor }]}>
          {isProfit ? '+' : ''}{results.profitMargin.toFixed(2)}%
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsRow}>
        <Text style={[styles.detailLabel, { color: Colors[theme].text }]}>Toplam Maliyet:</Text>
        <Text style={[styles.detailValue, { color: Colors[theme].text }]}>
          {results.totalCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.kdvButton, { backgroundColor: Colors[theme].background, borderColor: Colors[theme].border }]}
        onPress={() => router.push({ pathname: '/kdv-details', params: { ...results } })}
      >
        <Ionicons name="document-text-outline" size={20} color={Colors[theme].text} />
        <Text style={[styles.kdvButtonText, { color: Colors[theme].text }]}>KDV Detaylarını Gör</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors[theme].icon} />
      </TouchableOpacity>
    </StonksCard>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizing.padding * 2,
    marginTop: Sizing.margin,
  },
  emptyText: {
    marginTop: 16,
    fontSize: Typography.sizes.base,
    textAlign: 'center',
  },
  container: {
    marginTop: Sizing.margin,
  },
  title: {
    fontSize: Typography.sizes.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  mainResult: {
    alignItems: 'center',
    marginBottom: 20,
  },
  netProfit: {
    fontSize: Typography.sizes.xxxlarge,
    fontWeight: Typography.weights.black,
    marginBottom: 4,
  },
  profitMargin: {
    fontSize: Typography.sizes.xlarge,
    fontWeight: Typography.weights.bold,
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff20',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: Typography.sizes.base,
  },
  detailValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  kdvButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: Sizing.radius,
    borderWidth: 1,
  },
  kdvButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
});
