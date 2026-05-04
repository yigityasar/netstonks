export const useInterstitialAd = () => {
  return {
    showAd: () => {
      console.log('Web environment: Interstitial ad simulated.');
    },
    isAdLoaded: false
  };
};
