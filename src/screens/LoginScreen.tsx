import React, { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { STUDENT_DEFAULT_CREDENTIALS } from '../mocks/auth';
import { LoginSuccessModal } from '../components/LoginSuccessModal';
import { LoginFingerprintModal } from '../components/LoginFingerprintModal';
import { LoginFaceIdModal } from '../components/LoginFaceIdModal';
import type { RoleKey } from '../models/navigation';

type Props = {
  onBackToRoles: () => void;
  onStudentLoginSuccess: () => void;
  password: string;
  phoneNumber: string;
  role: RoleKey;
  setPassword: (value: string) => void;
  setPhoneNumber: (value: string) => void;
};

const assets = {
  eye: require('../assets/login/icons/eye.png'),
  faceId: require('../assets/login/icons/faceid.png'),
  fingerprint: require('../assets/login/icons/fingerprint.png'),
  key: require('../assets/login/icons/key.png'),
  phone: require('../assets/login/icons/phone.png'),
};

export function LoginScreen({
  onStudentLoginSuccess,
  password,
  phoneNumber,
  role,
  setPassword,
  setPhoneNumber,
}: Props) {
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [isFingerprintModalVisible, setIsFingerprintModalVisible] =
    useState(false);
  const [isFaceIdModalVisible, setIsFaceIdModalVisible] = useState(false);

  const handleLogin = () => {
    const isStudentValid =
      role === 'student' &&
      phoneNumber === STUDENT_DEFAULT_CREDENTIALS.phoneNumber &&
      password === STUDENT_DEFAULT_CREDENTIALS.password;

    if (isStudentValid) {
      setIsSuccessVisible(true);
    }
  };

  const handleContinue = () => {
    setIsSuccessVisible(false);
    onStudentLoginSuccess();
  };

  const handleOpenFingerprintModal = () => {
    setIsFingerprintModalVisible(true);
  };

  const handleCloseFingerprintModal = () => {
    setIsFingerprintModalVisible(false);
  };

  const handleOpenFaceIdModal = () => {
    setIsFaceIdModalVisible(true);
  };

  const handleCloseFaceIdModal = () => {
    setIsFaceIdModalVisible(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.loginCard}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Chào mừng</Text>
            <Text style={styles.loginTitle}>Đăng nhập</Text>
            <Text style={styles.subtitleText}>
              Chào mừng bạn đến với High School Hub, vui lòng nhập thông tin để
              đăng nhập bên dưới
            </Text>
            <View style={styles.headerCircle} />
          </View>

          <View style={styles.formWrap}>
            <Text style={styles.label}>Số điện thoại</Text>

            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="phone-pad"
                onChangeText={setPhoneNumber}
                placeholder="Nhập số điện thoại"
                placeholderTextColor="#757575"
                style={styles.input}
                value={phoneNumber}
              />
              <Image source={assets.phone} style={styles.inputIconPhone} />
            </View>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Tiếp theo</Text>
              <View style={styles.dividerLine} />
            </View>

            <Text style={styles.label}>Mật khẩu</Text>

            <View style={styles.inputContainerPassword}>
              <TextInput
                onChangeText={setPassword}
                placeholder="Nhập mật khẩu của bạn"
                placeholderTextColor="#757575"
                secureTextEntry
                style={styles.input}
                value={password}
              />
              <Image source={assets.eye} style={styles.inputIconEye} />
            </View>

            <View style={styles.forgotWrap}>
              <Image source={assets.key} style={styles.forgotIcon} />
              <Text style={styles.forgotText}>Quên mật khẩu</Text>
            </View>

            <Pressable onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </Pressable>
          </View>

          <Text style={styles.altLoginText}>Hoặc đăng nhập bằng</Text>

          <View style={styles.biometricOptions}>
            <Pressable
              onPress={handleOpenFingerprintModal}
              style={styles.biometricCardActive}
            >
              <View style={styles.biometricCircleActive}>
                <Image
                  source={assets.fingerprint}
                  style={styles.fingerprintIcon}
                />
              </View>
              <Text style={styles.biometricLabel}>Vân tay</Text>
            </Pressable>

            <Pressable
              onPress={handleOpenFaceIdModal}
              style={styles.biometricCardDefault}
            >
              <View style={styles.biometricCircleDefault}>
                <Image source={assets.faceId} style={styles.faceIdIcon} />
              </View>
              <Text style={styles.biometricLabel}>Face ID</Text>
            </Pressable>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © High School Hub. All rights reserved.
            </Text>
          </View>
        </View>
      </ScrollView>

      {isSuccessVisible ? (
        <LoginSuccessModal onContinue={handleContinue} />
      ) : null}

      {isFingerprintModalVisible ? (
        <LoginFingerprintModal onClose={handleCloseFingerprintModal} />
      ) : null}

      {isFaceIdModalVisible ? (
        <LoginFaceIdModal onClose={handleCloseFaceIdModal} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  loginCard: {
    minHeight: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 4,
    paddingTop: 27,
    paddingHorizontal: 26,
    paddingBottom: 14,
  },
  welcomeSection: {
    width: '100%',
    minHeight: 152,
    position: 'relative',
  },
  welcomeText: {
    color: '#666666',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22.5,
    letterSpacing: 0.2,
  },
  loginTitle: {
    color: '#1A1A1A',
    fontSize: 27.4,
    fontWeight: '700',
    marginTop: 4,
  },
  subtitleText: {
    marginTop: 16,
    color: '#4A5568',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 23,
    textAlign: 'center',
    width: '100%',
    paddingRight: 18,
  },
  headerCircle: {
    position: 'absolute',
    right: -58,
    top: -8,
    width: 157,
    height: 154,
    borderRadius: 78,
    backgroundColor: '#ECF7FC',
  },
  formWrap: {
    marginTop: 40,
  },
  label: {
    color: '#333333',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
    letterSpacing: -0.2,
    marginBottom: 10,
  },
  inputContainer: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#C4CEEC',
    backgroundColor: '#F9FBFD',
    justifyContent: 'center',
    paddingRight: 36,
  },
  inputContainerPassword: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E1E5E9',
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    paddingRight: 40,
  },
  input: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 19,
    paddingVertical: 12,
  },
  inputIconPhone: {
    position: 'absolute',
    right: 18,
    width: 18,
    height: 18,
  },
  inputIconEye: {
    position: 'absolute',
    right: 18,
    width: 20.25,
    height: 15.75,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    color: '#A0AEC0',
    fontSize: 14,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  forgotWrap: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 8,
  },
  forgotIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  forgotText: {
    color: '#63BAD5',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 22.5,
  },
  loginButton: {
    marginTop: 34,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4A6CF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  altLoginText: {
    marginTop: 14,
    color: '#718096',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  biometricOptions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  biometricCardActive: {
    width: 89.5,
    height: 116,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#F8FAFC',
    alignItems: 'center',
    paddingTop: 18,
  },
  biometricCardDefault: {
    width: 89.5,
    height: 116,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    paddingTop: 18,
  },
  biometricCircleActive: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#63BAD5',
    shadowColor: '#4A6CF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 19.68,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  biometricCircleDefault: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#B8C4D7',
    shadowColor: '#A0AEC0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fingerprintIcon: {
    width: 24,
    height: 23.6,
  },
  faceIdIcon: {
    width: 24,
    height: 24,
  },
  biometricLabel: {
    marginTop: 9.5,
    color: '#4A5568',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
  },
  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    minHeight: 38,
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  footerText: {
    color: '#000000',
    fontSize: 12,
    textAlign: 'center',
  },
});
