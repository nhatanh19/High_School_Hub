import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const logoImage = require('../assets/icons/png/logo.png');

export function HighSchoolHubLogo() {
  return (
    <View style={styles.logoWrapper}>
      <Image resizeMode="contain" source={logoImage} style={styles.logoImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 220,
    height: 180,
  },
});
