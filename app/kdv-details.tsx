import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { StonksCard } from '@/components/ui/StonksCard';
import { MeshBackground } from '@/components/ui/MeshBackground';

export default function KDVDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const theme = useColorScheme() ?? 'dark';

  // Parse params
  const productVat = Number(params.productVat) || 0;
  const expensesVat = Number(params.expensesVat) || 0;
  const totalPurchaseVat = Number(params.totalPurchaseVat) || 0;
  const salesVat = Number(params.salesVat) || 0;
  const taxPayable = Number(params.taxPayable) || 0;

  const formatNumber = (num: number) => num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';

  return (
    <View style={styles.flexContainer}>
      <MeshBackground />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
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
            <Text style={[styles.label, { color: Colors[theme].icon }]}>Ürün Maliyet KDV'si:</Text>
            <Text style={[styles.value, { color: Colors[theme].text }]}>{formatNumber(productVat)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.label, { color: Colors[theme].icon }]}>Giderler KDV Toplamı:</Text>
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
            <Text style={[styles.label, { color: Colors[theme].icon }]}>Satış KDV'si:</Text>
            <Text style={[styles.value, { color: Colors[theme].text }]}>{formatNumber(salesVat)}</Text>
          </View>
        </StonksCard>

        <StonksCard style={taxPayable > 0 ? styles.payableCard : styles.receivableCard}>
          <Text style={[styles.sectionTitle, { color: Colors[theme].text }]}>
            {taxPayable >= 0 ? 'Ödenecek Net KDV' : 'Devreden KDV (Alacak)'}
          </Text>
          <Text style={[
            styles.finalTaxValue, 
            { 
              color: taxPayable >= 0 ? Colors[theme].loss : Colors[theme].profit,
              textShadowColor: taxPayable >= 0 ? Colors[theme].loss : Colors[theme].profit,
              textShadowOffset: { width: 0, height: 0 },
              textShadowRadius: 10
            }
          ]}>
            {formatNumber(Math.abs(taxPayable))}
          </Text>
          <Text style={[styles.taxDescription, { color: Colors[theme].icon }]}>
            Satılan KDV - Toplam Alınan KDV
          </Text>
        </StonksCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Sizing.padding,
    paddingBottom: Sizing.padding * 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizing.margin * 1.5,
    marginTop: Sizing.margin * 2,
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
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
    backgroundColor: 'rgba(255, 59, 48, 0.05)',
    borderColor: 'rgba(255, 59, 48, 0.1)',
  },
  receivableCard: {
    marginTop: Sizing.margin * 2,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 230, 118, 0.05)',
    borderColor: 'rgba(0, 230, 118, 0.1)',
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
