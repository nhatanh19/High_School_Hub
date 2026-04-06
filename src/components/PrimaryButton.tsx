import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

type Props = {
  label: string;
  onPress?: () => void;
};

export function PrimaryButton({label, onPress}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#68BCDB',
    shadowColor: '#7FC6E2',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
