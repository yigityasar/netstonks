import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { getBannerAdUnitId, getTopBannerAdUnitId } from '@/constants/ads';

type Props = {
  isTopBanner?: boolean;
};

export default function AdBanner({ isTopBanner }: Props) {
  const adUnitId = isTopBanner ? getTopBannerAdUnitId() : getBannerAdUnitId();

  return (
    <View style={styles.adContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 8,
  }
});
