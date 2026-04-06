import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VI_STRINGS} from '../constants/vi';
import {AppFooter} from '../components/AppFooter';
import {HighSchoolHubLogo} from '../components/HighSchoolHubLogo';
import {RoleButton} from '../components/RoleButton';
import type {RoleKey} from '../models/navigation';
import type {RoleOption} from '../models/ui';

type Props = {
  onChooseRole: (role: RoleKey) => void;
  options: RoleOption[];
};

export function RoleSelectionScreen({onChooseRole, options}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.topBlock}>
          <HighSchoolHubLogo />
        </View>
        <View style={styles.selectionBlock}>
          <Text style={styles.prompt}>{VI_STRINGS.prompt}</Text>
          <RoleButton option={options[0]} onPress={onChooseRole} />
          <Text style={styles.orText}>{VI_STRINGS.or}</Text>
          <RoleButton option={options[1]} onPress={onChooseRole} />
        </View>
        <AppFooter />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  topBlock: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 18,
  },
  selectionBlock: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 88,
  },
  prompt: {
    marginBottom: 14,
    color: '#5D5D5D',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  orText: {
    color: '#505050',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 14,
  },
});
