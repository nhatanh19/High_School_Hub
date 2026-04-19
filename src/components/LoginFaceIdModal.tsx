import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onClose: () => void;
};

const assets = {
  bottomLeft: require('../assets/login/icons/faceid_bottom_left.png'),
  bottomRight: require('../assets/login/icons/faceid_bottom_right.png'),
  eye: require('../assets/login/icons/faceid_eye.png'),
  mouth: require('../assets/login/icons/faceid_mouth.png'),
  nose: require('../assets/login/icons/faceid_nose.png'),
  topLeft: require('../assets/login/icons/faceid_top_left.png'),
  topRight: require('../assets/login/icons/faceid_top_right.png'),
};

export function LoginFaceIdModal({ onClose }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <Text style={styles.title}>Face iD{`\n`}Authentication</Text>

        <View style={styles.promptWrap}>
          <View style={styles.animationWrap}>
            <View style={styles.ringWrap}>
              <Image source={assets.topLeft} style={styles.topLeft} />
              <Image source={assets.bottomLeft} style={styles.bottomLeft} />
              <Image source={assets.topRight} style={styles.topRight} />
              <Image source={assets.bottomRight} style={styles.bottomRight} />
            </View>

            <View style={styles.faceWrap}>
              <Image source={assets.mouth} style={styles.mouth} />
              <Image source={assets.nose} style={styles.nose} />
              <Image source={assets.eye} style={styles.eyeLeft} />
              <Image source={assets.eye} style={styles.eyeRight} />
            </View>
          </View>

          <Text style={styles.faceIdText}>Face ID</Text>
        </View>

        <Pressable hitSlop={8} onPress={onClose} style={styles.closeWrap}>
          <Text style={styles.closeText}>Đóng</Text>
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
    paddingHorizontal: 20,
  },
  card: {
    width: 269,
    height: 356,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
  },
  title: {
    width: 133,
    color: '#374151',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 27,
    textAlign: 'center',
  },
  promptWrap: {
    width: 150,
    height: 148,
    marginTop: 27,
    borderRadius: 9.02,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  animationWrap: {
    width: 88.89,
    height: 88.89,
    position: 'relative',
  },
  ringWrap: {
    position: 'absolute',
    left: 13.33,
    top: 12.22,
    width: 63.33,
    height: 63.8,
  },
  topLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 17.83,
    height: 18.3,
  },
  bottomLeft: {
    position: 'absolute',
    left: 0,
    top: 45.5,
    width: 17.83,
    height: 18.3,
  },
  topRight: {
    position: 'absolute',
    left: 45.5,
    top: 0,
    width: 17.83,
    height: 18.3,
  },
  bottomRight: {
    position: 'absolute',
    left: 45.5,
    top: 45.5,
    width: 17.83,
    height: 18.3,
  },
  faceWrap: {
    position: 'absolute',
    left: 31.63,
    top: 34.1,
    width: 27.21,
    height: 28.15,
  },
  mouth: {
    position: 'absolute',
    left: 2.81,
    top: 23.46,
    width: 21.11,
    height: 4.69,
  },
  nose: {
    position: 'absolute',
    left: 10.32,
    top: 0,
    width: 4.44,
    height: 15.56,
  },
  eyeLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 3.33,
    height: 5.56,
  },
  eyeRight: {
    position: 'absolute',
    left: 23.88,
    top: 0,
    width: 3.33,
    height: 5.56,
  },
  faceIdText: {
    marginTop: 7.89,
    color: '#8E8E93',
    fontSize: 16.92,
    fontWeight: '700',
    letterSpacing: -0.04,
    textAlign: 'center',
  },
  closeWrap: {
    marginTop: 43,
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#9CA3AF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
});
