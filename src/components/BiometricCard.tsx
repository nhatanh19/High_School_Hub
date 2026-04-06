import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  active?: boolean;
  icon: string;
  label: string;
};

export function BiometricCard({active = false, icon, label}: Props) {
  return (
    <Pressable style={styles.card}>
      <View style={[styles.iconCircle, active ? styles.iconCircleActive : null]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    height: 112,
    borderRadius: 16,
    backgroundColor: '#FBFCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B8C4D7',
    marginBottom: 10,
    shadowColor: '#A9B6C8',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 4,
  },
  iconCircleActive: {
    backgroundColor: '#67BCDB',
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    color: '#404D63',
    fontSize: 15,
    fontWeight: '700',
  },
});
