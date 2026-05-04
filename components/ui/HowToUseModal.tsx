import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { useAppTheme } from '@/hooks/useAppTheme';

interface HowToUseModalProps {
  visible: boolean;
  onClose: () => void;
}

export const HowToUseModal: React.FC<HowToUseModalProps> = ({ visible, onClose }) => {
  const theme = useAppTheme();

  const steps = [
    {
      icon: 'pricetag-outline',
      title: 'Ürün Maliyeti',
      desc: 'Ürünün size geliş veya üretim maliyetini girin. KDV dahil olup olmadığını sağdaki anahtardan seçebilirsiniz.'
    },
    {
      icon: 'cube-outline',
      title: 'Paketleme ve Kargo',
      desc: 'Ürünün gönderimi için yapacağınız paketleme masraflarını ve kargo ücretlerini belirleyin.'
    },
    {
      icon: 'pie-chart-outline',
      title: 'Pazaryeri Komisyonu',
      desc: 'Trendyol, Hepsiburada gibi satış yapacağınız platformun kesinti oranını (yüzdelik olarak) girin.'
    },
    {
      icon: 'receipt-outline',
      title: 'E-Ticaret Stopajı',
      desc: 'Yeni yasalar gereği uygulanan stopaj vergisini (genellikle %1-2 arası) ekleyin.'
    },
    {
      icon: 'cash-outline',
      title: 'Hedeflenen Satış Fiyatı',
      desc: 'Tüm kesintilerden sonra elde edeceğiniz net kârı ve kâr marjını görmek için hedeflenen satış fiyatını girin.'
    }
  ];

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <BlurView intensity={20} tint="light" style={StyleSheet.absoluteFill} />
        <View style={[styles.modalContainer, { backgroundColor: Colors[theme].background }]}>
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: Colors[theme].text }]}>Nasıl Kullanılır?</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color={Colors[theme].text} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
            {steps.map((step, index) => (
              <View key={index} style={[styles.stepItem, { borderColor: Colors[theme].border, backgroundColor: Colors[theme].card }]}>
                <View style={[styles.iconWrapper, { backgroundColor: Colors[theme].tint + '20' }]}>
                  <Ionicons name={step.icon as any} size={24} color={Colors[theme].tint} />
                </View>
                <View style={styles.stepTextContent}>
                  <Text style={[styles.stepTitle, { color: Colors[theme].text }]}>{step.title}</Text>
                  <Text style={[styles.stepDesc, { color: Colors[theme].icon }]}>{step.desc}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    height: '80%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Sizing.padding * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerTitle: {
    fontSize: Typography.sizes.xlarge,
    fontWeight: Typography.weights.bold,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: Sizing.padding,
    paddingBottom: 40,
  },
  stepItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepTextContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.bold,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: Typography.sizes.base,
    lineHeight: 20,
  }
});
