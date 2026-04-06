import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import type {TeacherClassOption} from '../models/dashboard';

type Props = {
  onClose: () => void;
  onSelectClass: (className: string) => void;
  options: TeacherClassOption[];
};

export function ClassSwitchMenu({onClose, onSelectClass, options}: Props) {
  return (
    <View style={styles.overlay}>
      <Pressable onPress={onClose} style={styles.backdrop} />
      <View style={styles.panel}>
        <Pressable hitSlop={8} onPress={onClose} style={styles.closeWrap}>
          <Text style={styles.closeIcon}>✕</Text>
        </Pressable>

        {options.map(option => (
          <View key={option.id} style={styles.row}>
            <View style={styles.classLabelWrap}>
              <Text style={styles.classLabel}>{option.label}</Text>
              <View style={styles.classLine} />
            </View>
            <Pressable
              onPress={() => onSelectClass(option.label)}
              style={[styles.changeButton, {backgroundColor: option.buttonColor}]}>
              <Text style={styles.changeButtonText}>Đổi lớp</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.68)',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  panel: {
    width: 376,
    maxWidth: '86%',
    marginTop: 142,
    marginLeft: 18,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 34,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
    paddingTop: 14,
    paddingBottom: 16,
    paddingHorizontal: 18,
    shadowColor: '#98A6B7',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
  closeWrap: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  closeIcon: {
    color: '#A9ABB0',
    fontSize: 18,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  classLabelWrap: {
    flex: 1,
    marginRight: 20,
  },
  classLabel: {
    color: '#121212',
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  classLine: {
    height: 1,
    backgroundColor: '#D7D7D7',
  },
  changeButton: {
    width: 126,
    height: 42,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});
