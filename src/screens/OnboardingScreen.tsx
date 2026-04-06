import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {VI_STRINGS} from '../constants/vi';
import {AppFooter} from '../components/AppFooter';
import type {RoleKey} from '../models/navigation';

const studentImage = require('../assets/icons/png/hocsinh.png');
const teacherImage = require('../assets/icons/png/giaovien.png');

type Props = {
  onContinue: () => void;
  onSkip: () => void;
  variant: RoleKey;
};

export function OnboardingScreen({onContinue, onSkip, variant}: Props) {
  const illustrationSource = variant === 'student' ? studentImage : teacherImage;

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.skipRow}>
          <Pressable hitSlop={8} onPress={onSkip}>
            <Text style={styles.skipText}>{VI_STRINGS.skip}</Text>
          </Pressable>
        </View>
        <View style={styles.artWrap}>
          <Image resizeMode="contain" source={illustrationSource} style={styles.illustration} />
        </View>
        <View style={styles.bottom}>
          <Pressable onPress={onContinue} style={styles.button}>
            <Text style={styles.buttonText}>{VI_STRINGS.continue}</Text>
          </Pressable>
          <AppFooter />
        </View>
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
    paddingHorizontal: 22,
  },
  skipRow: {
    alignItems: 'flex-end',
    paddingTop: 12,
    paddingRight: 8,
  },
  skipText: {
    color: '#B5B5B5',
    fontSize: 16,
    fontWeight: '700',
  },
  artWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  illustration: {
    width: 310,
    height: 390,
  },
  bottom: {
    paddingBottom: 10,
  },
  button: {
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#69BFDE',
    shadowColor: '#2A7EA7',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 52,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
});
