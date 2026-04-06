import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import type {RoleKey} from '../models/navigation';
import type {RoleOption} from '../models/ui';

type Props = {
  onPress: (role: RoleKey) => void;
  option: RoleOption;
};

export function RoleButton({onPress, option}: Props) {
  return (
    <Pressable
      onPress={() => onPress(option.id)}
      style={[styles.button, {backgroundColor: option.color}]}>
      <Text style={styles.text}>{option.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 302,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    shadowColor: '#2A7EA7',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
});
