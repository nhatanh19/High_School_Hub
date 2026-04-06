import React from 'react';
import {StyleSheet, View} from 'react-native';
import {AppFooter} from '../components/AppFooter';
import {HighSchoolHubLogo} from '../components/HighSchoolHubLogo';

export function SplashScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logoBlock}>
          <HighSchoolHubLogo />
        </View>
        <AppFooter />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  logoBlock: {
    flex: 1,
    justifyContent: 'center',
  },
});
