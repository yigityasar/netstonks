import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StonksCard } from '../ui/StonksCard';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { CalculationResults } from '@/utils/calculateMargin';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks/useAppTheme';

interface ResultCardProps {
  results: CalculationResults | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ results }) => {
  const router = useRouter();
  const theme = useAppTheme();

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
      <Text style={[styles.title, { color: Colors[theme].icon }]}>Hesaplama Özeti</Text>
      
      <View style={styles.detailsRow}>
        <Text style={[styles.detailLabel, { color: Colors[theme].text, fontWeight: 'bold' }]}>Satış Fiyatı:</Text>
        <Text style={[styles.detailValue, { color: Colors[theme].text, fontSize: Typography.sizes.large }]}>
          {results.salesPrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <Text style={[styles.detailLabel, { color: Colors[theme].icon }]}>- Ürün Maliyeti:</Text>
          <Text style={[styles.detailValue, { color: Colors[theme].icon }]}>
            {results.baseCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
          </Text>
        </View>

        {results.baseExpenses > 0 && (
          <View style={styles.detailsRow}>
            <Text style={[styles.detailLabel, { color: Colors[theme].icon }]}>- Kargo & Ek Giderler:</Text>
            <Text style={[styles.detailValue, { color: Colors[theme].icon }]}>
              {results.baseExpenses.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
            </Text>
          </View>
        )}

        <View style={styles.detailsRow}>
          <Text style={[styles.detailLabel, { color: Colors[theme].icon }]}>- Pazaryeri Komisyonu:</Text>
          <Text style={[styles.detailValue, { color: Colors[theme].icon }]}>
            {results.commissionCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
          </Text>
        </View>

        <View style={styles.detailsRow}>
          <Text style={[styles.detailLabel, { color: Colors[theme].icon }]}>- E-Ticaret Stopajı:</Text>
          <Text style={[styles.detailValue, { color: Colors[theme].icon }]}>
            {results.stopajCost.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.mainResult}>
        <Text style={[styles.title, { color: Colors[theme].icon, marginBottom: 8 }]}>NET {isProfit ? 'KÂR' : 'ZARAR'}</Text>
        <Text style={[
          styles.netProfit, 
          { 
            color: resultColor,
            textShadowColor: resultColor,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 15
          }
        ]}>
          {results.netProfit.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
        </Text>
        <Text style={[styles.profitMargin, { color: resultColor, textShadowColor: resultColor, textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5 }]}>
          {isProfit ? '+' : ''}{results.profitMargin.toFixed(2)}% Marj
        </Text>
      </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: 16,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
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
    padding: 8,
    paddingRight: 16,
    borderRadius: Sizing.radius,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  kdvIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  kdvButtonText: {
    flex: 1,
    marginLeft: 12,
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
});
