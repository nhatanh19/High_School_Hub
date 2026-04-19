import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onContinue: () => void;
};

const successBorder = require('../assets/login/icons/success_border.png');

export function LoginSuccessModal({ onContinue }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Đăng nhập thành công</Text>

        <View style={styles.successIconWrap}>
          <Image source={successBorder} style={styles.successBorder} />

          <View style={styles.checkWrap}>
            <View style={styles.checkLeft} />
            <View style={styles.checkRight} />
          </View>
        </View>

        <Pressable hitSlop={8} onPress={onContinue} style={styles.continueWrap}>
          <Text style={styles.continueText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(39, 49, 61, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 269,
    height: 316,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  title: {
    marginTop: 62,
    width: 151,
    color: '#374151',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
  successIconWrap: {
    width: 88.89,
    height: 78.9,
    marginTop: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successBorder: {
    width: 63.43,
    height: 63.33,
    transform: [{ rotate: '180deg' }],
  },
  checkWrap: {
    position: 'absolute',
    width: 26.57,
    height: 25.53,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkLeft: {
    position: 'absolute',
    width: 3.33,
    height: 16.67,
    borderRadius: 111.11,
    backgroundColor: '#60A5FA',
    left: 2,
    top: 9.5,
    transform: [{ rotate: '-45deg' }],
  },
  checkRight: {
    position: 'absolute',
    width: 3.33,
    height: 28.33,
    borderRadius: 111.11,
    backgroundColor: '#60A5FA',
    left: 15.8,
    top: 0,
    transform: [{ rotate: '35deg' }],
  },
  continueWrap: {
    position: 'absolute',
    right: 35,
    bottom: 24,
  },
  continueText: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
