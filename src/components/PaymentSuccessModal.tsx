import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  message: string;
  onContinue: () => void;
};

export function PaymentSuccessModal({message, onContinue}: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>{message}</Text>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Pressable hitSlop={8} onPress={onContinue} style={styles.buttonWrap}>
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30, 39, 52, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  modal: {
    width: '74%',
    minHeight: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingTop: 66,
    paddingBottom: 34,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#7D8FAA',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    color: '#4B5A72',
    fontSize: 29,
    fontWeight: '500',
    lineHeight: 54,
    textAlign: 'center',
    textShadowColor: 'rgba(97, 110, 126, 0.18)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
  checkCircle: {
    width: 83,
    height: 83,
    borderRadius: 41.5,
    borderWidth: 4,
    borderColor: '#65A1F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  checkMark: {
    color: '#65A1F3',
    fontSize: 26,
    fontWeight: '400',
    marginTop: -3,
  },
  buttonWrap: {
    alignSelf: 'flex-end',
    marginTop: 18,
  },
  buttonText: {
    color: '#BAC4D1',
    fontSize: 28,
    fontWeight: '500',
    textShadowColor: 'rgba(97, 110, 126, 0.14)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
});


