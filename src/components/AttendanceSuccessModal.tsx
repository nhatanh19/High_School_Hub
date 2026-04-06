import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

type Props = {
  onContinue: () => void;
};

export function AttendanceSuccessModal({onContinue}: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Bạn đã báo cáo{`\n`}thành công. Vui{`\n`}lòng chờ thông báo</Text>
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
    backgroundColor: 'rgba(27, 38, 51, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  modal: {
    width: '72%',
    minHeight: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingTop: 54,
    paddingBottom: 30,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#8799B5',
    shadowOffset: {width: 0, height: 14},
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 8,
  },
  title: {
    color: '#47566D',
    fontSize: 27,
    fontWeight: '500',
    lineHeight: 56,
    textAlign: 'center',
    textShadowColor: 'rgba(84, 94, 110, 0.18)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
  checkCircle: {
    width: 85,
    height: 85,
    borderRadius: 42.5,
    borderWidth: 4,
    borderColor: '#66A2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  checkMark: {
    color: '#66A2F7',
    fontSize: 26,
    fontWeight: '400',
    marginTop: -3,
  },
  buttonWrap: {
    alignSelf: 'flex-end',
    marginTop: 18,
  },
  buttonText: {
    color: '#BAC3D0',
    fontSize: 26,
    fontWeight: '500',
    textShadowColor: 'rgba(84, 94, 110, 0.14)',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 2,
  },
});


