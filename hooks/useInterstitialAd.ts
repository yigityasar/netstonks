import { useState, useEffect } from 'react';
import { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { getInterstitialAdUnitId } from '@/constants/ads';

const interstitialId = getInterstitialAdUnitId();
const interstitial = InterstitialAd.createForAdRequest(interstitialId, {
  requestNonPersonalizedAdsOnly: true,
});

export const useInterstitialAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setIsAdLoaded(true);
    });
    
    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setIsAdLoaded(false);
      // Bir sonraki kullanımlar için yeniden yükle
      interstitial.load();
    });

    // İlk reklamı yüklemeye başla
    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAd = () => {
    if (isAdLoaded) {
      try {
        interstitial.show();
        setIsAdLoaded(false);
      } catch (err) {
        console.log('Error showing interstitial ad:', err);
      }
    }
  };

  return { showAd, isAdLoaded };
};
