import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Text, View, useColorScheme, KeyboardAvoidingView, Platform, TouchableOpacity, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AdBanner from '@/components/calculator/AdBanner';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { Input } from '@/components/ui/Input';
import { VATSwitch } from '@/components/ui/VATSwitch';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { StonksCard } from '@/components/ui/StonksCard';
import { ResultCard } from '@/components/calculator/ResultCard';
import { calculateMargin, CalculationResults } from '@/utils/calculateMargin';
import { Ionicons } from '@expo/vector-icons';
import { useInterstitialAd } from '@/hooks/useInterstitialAd';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { useRouter } from 'expo-router';
import { ThemeProvider, useAppTheme } from '@/hooks/useAppTheme';

function CalculatorContent() {
  const theme = useAppTheme();
  const router = useRouter();

  const [cost, setCost] = useState('');
  const [isVatIncluded, setIsVatIncluded] = useState(false);
  const [vatRate, setVatRate] = useState(20);
  const [packaging, setPackaging] = useState('');
  const [shipping, setShipping] = useState('');
  const [extra, setExtra] = useState('');
  const [salesPrice, setSalesPrice] = useState('');
  const [commissionRate, setCommissionRate] = useState('');
  const [stopajRate, setStopajRate] = useState('1');

  const [results, setResults] = useState<CalculationResults | null>(null);
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  
  const { showAd, isAdLoaded } = useInterstitialAd();

  const showInfoAlert = () => {
    setInfoModalVisible(true);
  };

  const handleCalculate = () => {
    // Reklamı göster (Web ortamında güvenle atlanır)
    showAd();

    const parsedCost = parseFloat(cost.replace(',', '.')) || 0;
    const parsedPackaging = parseFloat(packaging.replace(',', '.')) || 0;
    const parsedShipping = parseFloat(shipping.replace(',', '.')) || 0;
    const parsedExtra = parseFloat(extra.replace(',', '.')) || 0;
    const parsedSalesPrice = parseFloat(salesPrice.replace(',', '.')) || 0;
    const parsedCommissionRate = parseFloat(commissionRate.replace(',', '.')) || 0;
    const parsedStopajRate = parseFloat(stopajRate.replace(',', '.')) || 0;

    if (parsedCost <= 0 || parsedSalesPrice <= 0) {
      // Don't calculate if mandatory fields are zero or missing. Or we calculate anyway, but let's calculate anyway if they hit the button
    }

    const calculatedResults = calculateMargin({
      cost: parsedCost,
      isVatIncluded,
      vatRate,
      packaging: parsedPackaging,
      shipping: parsedShipping,
      extra: parsedExtra,
      salesPrice: parsedSalesPrice,
      commissionRate: parsedCommissionRate,
      stopajRate: parsedStopajRate
    });

    setResults(calculatedResults);
  };

  useEffect(() => {
    const loadSavedValues = async () => {
      try {
        const savedPackaging = await AsyncStorage.getItem('@packaging');
        const savedShipping = await AsyncStorage.getItem('@shipping');
        const savedExtra = await AsyncStorage.getItem('@extra');
        const savedCommission = await AsyncStorage.getItem('@commission');
        const savedStopaj = await AsyncStorage.getItem('@stopaj');
        
        if (savedPackaging !== null) setPackaging(savedPackaging);
        if (savedShipping !== null) setShipping(savedShipping);
        if (savedExtra !== null) setExtra(savedExtra);
        if (savedCommission !== null) setCommissionRate(savedCommission);
        if (savedStopaj !== null) setStopajRate(savedStopaj);
      } catch (e) {
        console.error('Kayıtlı veriler yüklenemedi: ', e);
      }
    };
    loadSavedValues();
  }, []);

  useEffect(() => {
    const saveValues = async () => {
      try {
        await AsyncStorage.setItem('@packaging', packaging);
        await AsyncStorage.setItem('@shipping', shipping);
        await AsyncStorage.setItem('@extra', extra);
        await AsyncStorage.setItem('@commission', commissionRate);
        await AsyncStorage.setItem('@stopaj', stopajRate);
      } catch (e) {
        console.error('Veriler kaydedilemedi: ', e);
      }
    };
    // Sadece bileşen mount olduktan sonraki değişiklikleri kaydetmek için,
    // basitçe her değişimde kaydettik.
    saveValues();
  }, [packaging, shipping, extra, commissionRate, stopajRate]);

  useEffect(() => {
    // Optionally trigger calculate on every change, but prompt said "Hesapla butonuna basıldıktan sonra" 
  }, [cost, isVatIncluded, vatRate, packaging, shipping, extra, salesPrice, commissionRate, stopajRate]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}>
      <MeshBackground />
      
      <Modal
        visible={isInfoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={[styles.modalContent, { backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]}>
            <Text style={[styles.modalTitle, { color: Colors[theme].text }]}>Bilgilendirme</Text>
            <Text style={[styles.modalText, { color: Colors[theme].icon }]}>
              Hesaplanan kâr ve KDV değerleri yaklaşık sonuçlar vermekte olup fiyatlandırma sürecinizde size yardımcı olması amacıyla tasarlanmıştır. Uygulanan komisyon ve vergi oranları dönemsel veya kategori bazlı değişiklik gösterebileceğinden, lütfen nihai fiyatlarınızı belirlerken tüm verileri dikkatlice kontrol ediniz. Olası yanlış fiyatlandırmalardan ve zararlardan uygulamamız sorumlu tutulamaz.
            </Text>
            <TouchableOpacity 
              style={[styles.modalButton, { backgroundColor: Colors[theme].tint, shadowColor: Colors[theme].tint, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: {width: 0, height: 0} }]} 
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Anladım</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AdBanner isTopBanner />
      
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          style={{ flex: 1 }} 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} keyboardShouldPersistTaps="handled">
          
          <StonksCard style={[styles.topHeaderCard, { backgroundColor: Colors[theme].card, borderColor: Colors[theme].border }]}>
            <View style={styles.headerTopRow}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButtonBg}>
                <Ionicons name="arrow-back" size={24} color={Colors[theme].text} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, { marginLeft: 12, color: Colors[theme].text }]}>Kârınızı Maksimize Edin</Text>
              <TouchableOpacity onPress={showInfoAlert} style={styles.infoButtonBg}>
                <Ionicons name="information-circle-outline" size={24} color={Colors[theme].tint} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.headerContent}>
              <Text style={styles.headerSubtitle}>
                Aşağıdaki alanlara ürün maliyetinizi, giderlerinizi ve pazaryeri kesintilerini girerek net kârınızı saniyeler içinde hesaplayın.
              </Text>
              
              <View style={styles.stepsContainer}>
                <View style={styles.stepItem}>
                  <View style={styles.stepIconWrapper}>
                    <Ionicons name="pricetag" size={14} color={Colors[theme].tint} />
                  </View>
                  <Text style={[styles.stepText, { color: Colors[theme].text }]}>Maliyet</Text>
                </View>
                <View style={[styles.stepDivider, { backgroundColor: Colors[theme].border }]} />
                <View style={styles.stepItem}>
                  <View style={styles.stepIconWrapper}>
                    <Ionicons name="calculator" size={14} color={Colors[theme].tint} />
                  </View>
                  <Text style={[styles.stepText, { color: Colors[theme].text }]}>Giderler</Text>
                </View>
                <View style={[styles.stepDivider, { backgroundColor: Colors[theme].border }]} />
                <View style={styles.stepItem}>
                  <View style={[styles.stepIconWrapper, { backgroundColor: 'rgba(0, 230, 118, 0.1)' }]}>
                    <Ionicons name="cash" size={14} color={Colors[theme].profit} />
                  </View>
                  <Text style={[styles.stepText, { color: Colors[theme].profit }]}>Net Kâr</Text>
                </View>
              </View>
            </View>
          </StonksCard>

          <StonksCard>
            <Input 
              label="Ürün Maliyeti (₺)" 
              placeholder="0.00"
              value={cost}
              onChangeText={setCost}
              leftIcon={<Ionicons name="pricetag-outline" size={20} color={Colors[theme].icon} />}
            />

            <VATSwitch 
              label="Maliyete KDV Dahil Mi?" 
              value={isVatIncluded}
              onValueChange={setIsVatIncluded}
            />

            <SegmentedControl 
              label="KDV Oranı"
              options={[1, 10, 20]}
              selectedValue={vatRate}
              onSelect={setVatRate}
            />
          </StonksCard>

          <StonksCard>
            <Input 
              label="Paketleme Gideri (₺)" 
              placeholder="0.00"
              value={packaging}
              onChangeText={setPackaging}
              leftIcon={<Ionicons name="cube-outline" size={20} color={Colors[theme].icon} />}
            />
            
            <Input 
              label="Kargo Ücreti (₺)" 
              placeholder="0.00"
              value={shipping}
              onChangeText={setShipping}
              leftIcon={<Ionicons name="bus-outline" size={20} color={Colors[theme].icon} />}
            />

            <Input 
              label="Ek Masraflar (₺)" 
              placeholder="0.00"
              value={extra}
              onChangeText={setExtra}
              leftIcon={<Ionicons name="add-circle-outline" size={20} color={Colors[theme].icon} />}
            />
          </StonksCard>

          <StonksCard>
            <Input 
              label="Pazaryeri Komisyon Oranı (%)" 
              placeholder="0.00"
              value={commissionRate}
              onChangeText={setCommissionRate}
              leftIcon={<Ionicons name="pie-chart-outline" size={20} color={Colors[theme].icon} />}
            />

            <Input 
              label="E-Ticaret Stopajı (%)" 
              placeholder="0.00"
              value={stopajRate}
              onChangeText={setStopajRate}
              leftIcon={<Ionicons name="receipt-outline" size={20} color={Colors[theme].icon} />}
            />

            <Input 
              label="Hedeflenen Satış Fiyatı (₺)" 
              placeholder="0.00"
              value={salesPrice}
              onChangeText={setSalesPrice}
              leftIcon={<Ionicons name="cash-outline" size={20} color={Colors[theme].icon} />}
            />
          </StonksCard>

          <TouchableOpacity 
            style={[styles.calculateButtonWrapper, { shadowColor: Colors[theme].tint, shadowOpacity: 0.6, shadowRadius: 20, shadowOffset: {width: 0, height: 0} }]}
            onPress={handleCalculate}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors[theme].tint, '#FF8A00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.calculateButton}
            >
              <Text style={styles.calculateButtonText}>HESAPLA</Text>
            </LinearGradient>
          </TouchableOpacity>

            <ResultCard results={results} />

            <View style={{ height: 20 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <AdBanner />

    </SafeAreaView>
  );
}

export default function CalculatorScreen() {
  return (
    <ThemeProvider theme="dark">
      <CalculatorContent />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: Sizing.padding,
    paddingTop: Sizing.padding,
  },
  topHeaderCard: {
            marginBottom: Sizing.margin,
            borderWidth: 1,
            padding: Sizing.padding,
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
          },
          headerTopRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          },
          backButtonBg: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(128,128,128,0.2)',
          },
          infoButtonBg: {
            width: 32,
            height: 32,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(255, 90, 0, 0.1)',
            borderWidth: 1,
            borderColor: 'rgba(255, 90, 0, 0.2)',
          },
          headerContent: {
            marginTop: 0,
          },
          headerTitle: {
            fontSize: Typography.sizes.large,
            fontWeight: Typography.weights.bold,
            flex: 1,
          },
          headerSubtitle: {
            color: '#94A3B8',
            fontSize: Typography.sizes.small + 1,
            fontWeight: Typography.weights.medium,
            lineHeight: 20,
            marginBottom: 20,
          },
          stepsContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: 12,
            borderRadius: Sizing.radius - 4,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.03)',
          },
          stepItem: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          },
          stepIconWrapper: {
            width: 28,
            height: 28,
            borderRadius: 14,
            backgroundColor: 'rgba(255, 90, 0, 0.1)',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 6,
          },
          stepText: {
            fontSize: Typography.sizes.small - 1,
            fontWeight: Typography.weights.bold,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          },
          stepDivider: {
            width: 1,
            height: 24,
            marginHorizontal: 8,
          },
  title: {
    fontSize: Typography.sizes.xxlarge,
    fontWeight: Typography.weights.black,
    letterSpacing: -1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Typography.sizes.base,
    marginTop: 4,
    textAlign: 'center',
  },
  calculateButtonWrapper: {
    marginVertical: Sizing.margin * 1.5,
    borderRadius: Sizing.radius,
  },
  calculateButton: {
    borderRadius: Sizing.radius,
    padding: Sizing.padding * 1.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateButtonText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.xlarge,
    fontWeight: Typography.weights.black,
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizing.padding,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: Sizing.radius,
    padding: Sizing.padding * 1.5,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.bold,
    marginBottom: 12,
  },
  modalText: {
    fontSize: Typography.sizes.base,
    lineHeight: 22,
    marginBottom: 20,
    opacity: 0.8,
  },
  modalButton: {
    padding: 14,
    borderRadius: Sizing.radius,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: Typography.weights.bold,
    fontSize: Typography.sizes.base,
    letterSpacing: 1,
  }
});
