import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StonksCard } from '@/components/ui/StonksCard';

export default function KDVDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useColorScheme() ?? 'light';

  // Parse params
  const productVat = Number(params.productVat) || 0;
  const expensesVat = Number(params.expensesVat) || 0;
  const totalPurchaseVat = Number(params.totalPurchaseVat) || 0;
  const salesVat = Number(params.salesVat) || 0;
  const taxPayable = Number(params.taxPayable) || 0;

  const formatNumber = (num: number) => num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={Colors[theme].text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: Colors[theme].text }]}>KDV Detayları</Text>
        <View style={{ width: 24 }} />
      </View>

      <StonksCard>
        <Text style={[styles.sectionTitle, { color: Colors[theme].icon }]}>Alınan (Girdi) KDV</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: Colors[theme].text }]}>Ürün Maliyet KDV'si:</Text>
          <Text style={[styles.value, { color: Colors[theme].text }]}>{formatNumber(productVat)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: Colors[theme].text }]}>Giderler KDV Toplamı:</Text>
          <Text style={[styles.value, { color: Colors[theme].text }]}>{formatNumber(expensesVat)}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          <Text style={[styles.totalLabel, { color: Colors[theme].text }]}>Toplam Alınan KDV:</Text>
          <Text style={[styles.totalValue, { color: Colors[theme].text }]}>{formatNumber(totalPurchaseVat)}</Text>
        </View>
      </StonksCard>

      <StonksCard>
        <Text style={[styles.sectionTitle, { color: Colors[theme].icon }]}>Satılan (Çıktı) KDV</Text>
        <View style={styles.row}>
          <Text style={[styles.label, { color: Colors[theme].text }]}>Satış KDV'si:</Text>
          <Text style={[styles.value, { color: Colors[theme].text }]}>{formatNumber(salesVat)}</Text>
        </View>
      </StonksCard>

      <StonksCard style={taxPayable > 0 ? styles.payableCard : styles.receivableCard}>
        <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
          {taxPayable >= 0 ? 'Ödenecek Net KDV' : 'Devreden KDV (Alacak)'}
        </Text>
        <Text style={[styles.finalTaxValue, { color: taxPayable >= 0 ? Colors[theme].loss : Colors[theme].profit }]}>
          {formatNumber(Math.abs(taxPayable))}
        </Text>
        <Text style={[styles.taxDescription, { color: Colors[theme].text, opacity: 0.8 }]}>
          Satılan KDV - Toplam Alınan KDV
        </Text>
      </StonksCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Sizing.padding,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizing.margin * 1.5,
    marginTop: Sizing.margin,
  },
  closeButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.bold,
  },
  sectionTitle: {
    fontSize: Typography.sizes.small,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: Typography.sizes.base,
  },
  value: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.medium,
  },
  divider: {
    height: 1,
    backgroundColor: '#ffffff20',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  totalValue: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  },
  payableCard: {
    marginTop: Sizing.margin * 2,
    alignItems: 'center',
    backgroundColor: '#2D1B1E', // Slight red tint for dark mode feel
  },
  receivableCard: {
    marginTop: Sizing.margin * 2,
    alignItems: 'center',
    backgroundColor: '#162C21', // Slight green tint
  },
  finalTaxValue: {
    fontSize: Typography.sizes.xxlarge,
    fontWeight: Typography.weights.black,
    marginVertical: 12,
  },
  taxDescription: {
    fontSize: Typography.sizes.small,
  }
});
