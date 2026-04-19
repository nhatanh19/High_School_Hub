import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  message: string;
  onContinue: () => void;
};

const successAnimation = require('../assets/payment/icons/success_animation.png');

export function PaymentSuccessModal({ message, onContinue }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>{message}</Text>

        <Image source={successAnimation} style={styles.animation} />

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
    paddingHorizontal: 20,
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
    marginTop: 88,
    width: 183,
    color: '#374151',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 29,
  },
  animation: {
    width: 88.89,
    height: 78.9,
    marginTop: 14,
    resizeMode: 'contain',
  },
  continueWrap: {
    position: 'absolute',
    right: 35,
    bottom: 24,
  },
  continueText: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});
