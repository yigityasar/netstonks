import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  isTopBanner?: boolean;
};

export default function AdBanner({ isTopBanner }: Props) {
  return (
    <View style={styles.adContainer}>
      {/* Web ortamında Admob çalışmadığı için yer tutucu gösteriyoruz */}
      <Text style={{ color: '#888', fontSize: 12 }}>[Reklam Alanı Sadece Mobilde Çalışır]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  adContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    marginTop: 8,
  }
});
