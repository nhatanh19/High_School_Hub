import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {VI_STRINGS} from '../constants/vi';

export function AppFooter() {
  return <Text style={styles.footer}>{VI_STRINGS.footer}</Text>;
}

const styles = StyleSheet.create({
  footer: {
    marginBottom: 8,
    color: '#111111',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
  },
});
