import React, { useState } from 'react';
import { StyleSheet, View, Text, useColorScheme, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Sizing, Typography } from '@/constants/theme';
import { MeshBackground } from '@/components/ui/MeshBackground';
import { HowToUseModal } from '@/components/ui/HowToUseModal';
import { Ionicons } from '@expo/vector-icons';
import AdBanner from '@/components/calculator/AdBanner';
import { ThemeProvider, useAppTheme } from '@/hooks/useAppTheme';

function HomeContent() {
  const router = useRouter();
  const theme = useAppTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors[theme].background }]}>
      <MeshBackground />
      
      <HowToUseModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <AdBanner isTopBanner />

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/netstonks_logo_png.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={[styles.subtitle, { color: Colors[theme].icon }]}>
            Yeni Nesil Kâr Hesaplama Aracı
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.mainButtonWrapper, { shadowColor: Colors[theme].tint, shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: {width: 0, height: 5} }]}
            onPress={() => router.push('/calculator')}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors[theme].tint, '#FF8A00']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.mainButton}
            >
              <Text style={styles.mainButtonText}>HESAPLAMAYA BAŞLA</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" style={{ marginLeft: 8 }} />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.secondaryButton, { borderColor: Colors[theme].border, backgroundColor: Colors[theme].card }]}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="information-circle-outline" size={20} color={Colors[theme].text} style={{ marginRight: 8 }} />
            <Text style={[styles.secondaryButtonText, { color: Colors[theme].text }]}>Nasıl Kullanılır?</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <AdBanner />
    </SafeAreaView>
  );
}

export default function HomeScreen() {
  return (
    <ThemeProvider theme="light">
      <HomeContent />
    </ThemeProvider>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: Sizing.padding * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    width: width * 0.7,
    height: 120,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.medium,
    letterSpacing: 0.5,
  },
  actionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  mainButtonWrapper: {
    width: '100%',
    borderRadius: Sizing.radius,
    marginBottom: 20,
  },
  mainButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: Sizing.radius,
  },
  mainButtonText: {
    color: '#FFFFFF',
    fontSize: Typography.sizes.large,
    fontWeight: Typography.weights.bold,
    letterSpacing: 1,
  },
  secondaryButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: Sizing.radius,
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.weights.bold,
  }
});
