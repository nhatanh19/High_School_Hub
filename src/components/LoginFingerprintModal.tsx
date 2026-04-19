import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onClose: () => void;
};

const fingerprintModal = require('../assets/login/icons/fingerprint_modal.png');

export function LoginFingerprintModal({ onClose }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Fingerprint Authentication</Text>

        <Image source={fingerprintModal} style={styles.fingerprintImage} />

        <Text style={styles.messageText}>
          Touch the fingerprint scanner to verify your identity.
        </Text>

        <Pressable hitSlop={8} onPress={onClose} style={styles.closeWrap}>
          <Text style={styles.closeText}>Đóng</Text>
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
    minHeight: 316,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 38,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  title: {
    color: '#374151',
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 30,
  },
  fingerprintImage: {
    width: 84,
    height: 104.5,
    marginTop: 20,
  },
  messageText: {
    marginTop: 16,
    color: '#6B7280',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  closeWrap: {
    marginTop: 20,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
});
