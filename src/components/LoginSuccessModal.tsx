import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {VI_STRINGS} from '../constants/vi';

type Props = {
  onContinue: () => void;
};

export function LoginSuccessModal({onContinue}: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>{VI_STRINGS.loginSuccess}</Text>
        <View style={styles.checkCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Pressable hitSlop={8} onPress={onContinue} style={styles.continueWrap}>
          <Text style={styles.continueText}>{VI_STRINGS.continue}</Text>
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
    paddingHorizontal: 28,
  },
  modal: {
    width: '76%',
    minHeight: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingTop: 74,
    paddingBottom: 38,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#8094B1',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    color: '#4A5A72',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 60,
    textAlign: 'center',
    textShadowColor: 'rgba(96, 112, 132, 0.28)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
  checkCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    borderWidth: 4,
    borderColor: '#6A9EF0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  checkMark: {
    color: '#6A9EF0',
    fontSize: 26,
    fontWeight: '400',
    marginTop: -3,
  },
  continueWrap: {
    alignSelf: 'flex-end',
    marginTop: 18,
  },
  continueText: {
    color: '#B3BCC9',
    fontSize: 28,
    fontWeight: '500',
    textShadowColor: 'rgba(125, 134, 146, 0.18)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
});


