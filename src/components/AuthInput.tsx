import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

type Props = {
  icon: string;
  keyboardType?: 'default' | 'phone-pad';
  label: string;
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (value: string) => void;
};

export function AuthInput({
  icon,
  keyboardType = 'default',
  label,
  placeholder,
  secureTextEntry = false,
  value,
  onChangeText,
}: Props) {
  return (
    <View style={styles.block}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#8E8E8E"
          secureTextEntry={secureTextEntry}
          selectionColor="#69BFDE"
          style={styles.input}
          value={value}
        />
        <Text style={styles.icon}>{icon}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginBottom: 22,
  },
  label: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 12,
  },
  inputWrap: {
    height: 48,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C7D7F2',
    backgroundColor: '#FCFDFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 18,
    paddingRight: 16,
  },
  input: {
    flex: 1,
    color: '#5B5B5B',
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 10,
  },
  icon: {
    color: '#A8B5C7',
    fontSize: 22,
    fontWeight: '700',
    marginLeft: 12,
  },
});
