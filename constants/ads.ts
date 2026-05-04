import { Platform } from 'react-native';
import { TestIds } from 'react-native-google-mobile-ads';

/**
 * ADMOB REKLAM KİMLİKLERİ (AD UNIT IDs)
 * 
 * LÜTFEN KENDİ ADMOB HESABINIZDAN ALDIĞINIZ GERÇEK KİMLİKLERİ BURAYA GİRİN.
 * 
 * NOT: Uygulamayı test ederken (__DEV__ aktifken) her zaman Google'ın TEST REKLAMLARI gösterilir.
 * Bu sayede geliştirme aşamasında kendi reklamlarınıza tıklayıp banlanma riski yaşamazsınız.
 * Sadece uygulamanın build alınmış mağaza sürümünde (Production) kendi reklamlarınız gösterilir.
 */

// 1. BANNER (ALT KISIM) REKLAM KİMLİKLERİ
const REAL_BANNER_ID_ANDROID = 'ca-app-pub-6469408105371618/4104307282'; // Android Banner ID'niz
const REAL_BANNER_ID_IOS = 'ca-app-pub-6469408105371618/4104307282'; // iOS Banner ID'niz

// 1.5. TOP BANNER (ÜST KISIM) REKLAM KİMLİKLERİ
const REAL_TOP_BANNER_ID_ANDROID = 'ca-app-pub-6469408105371618/1085361895'; // Üst Banner ID'si
const REAL_TOP_BANNER_ID_IOS = 'ca-app-pub-6469408105371618/1085361895'; // Üst Banner ID'si

// 2. GEÇİŞ (INTERSTITIAL / TAM EKRAN VİDEO) REKLAM KİMLİKLERİ
const REAL_INTERSTITIAL_ID_ANDROID = 'ca-app-pub-6469408105371618/2248300130'; // Android Geçiş Reklamı ID'niz
const REAL_INTERSTITIAL_ID_IOS = 'ca-app-pub-6469408105371618/2248300130'; // iOS Geçiş Reklamı ID'niz

export const getBannerAdUnitId = () => {
  if (__DEV__) {
    // Geliştirme ortamındayken test reklamı göster
    return TestIds.ADAPTIVE_BANNER;
  }
  // Build alındıktan sonra gerçek reklamı göster
  return Platform.OS === 'android' ? REAL_BANNER_ID_ANDROID : REAL_BANNER_ID_IOS;
};

export const getTopBannerAdUnitId = () => {
  if (__DEV__) {
    return TestIds.ADAPTIVE_BANNER;
  }
  return Platform.OS === 'android' ? REAL_TOP_BANNER_ID_ANDROID : REAL_TOP_BANNER_ID_IOS;
};

export const getInterstitialAdUnitId = () => {
  if (__DEV__) {
    // Geliştirme ortamındayken test reklamı göster
    return TestIds.INTERSTITIAL;
  }
  // Build alındıktan sonra gerçek reklamı göster
  return Platform.OS === 'android' ? REAL_INTERSTITIAL_ID_ANDROID : REAL_INTERSTITIAL_ID_IOS;
};
