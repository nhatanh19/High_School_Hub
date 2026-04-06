import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {STUDENT_DEFAULT_CREDENTIALS} from '../mocks/auth';
import {VI_STRINGS} from '../constants/vi';
import {AppFooter} from '../components/AppFooter';
import {AuthInput} from '../components/AuthInput';
import {BiometricCard} from '../components/BiometricCard';
import {LoginSuccessModal} from '../components/LoginSuccessModal';
import {PrimaryButton} from '../components/PrimaryButton';
import type {RoleKey} from '../models/navigation';

type Props = {
  onBackToRoles: () => void;
  onStudentLoginSuccess: () => void;
  password: string;
  phoneNumber: string;
  role: RoleKey;
  setPassword: (value: string) => void;
  setPhoneNumber: (value: string) => void;
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

  return (
    <View style={styles.screen}>
      <View style={styles.blueCircle} />

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.headerBlock}>
            <Text style={styles.welcomeText}>{VI_STRINGS.welcome}</Text>
            <Text style={styles.title}>{VI_STRINGS.loginTitle}</Text>
            <Text style={styles.description}>
              {VI_STRINGS.loginDescriptionPrefix}{' '}
              <Text style={styles.brandInline}>High School Hub</Text>, vui lòng
            </Text>
            <Text style={styles.description}>nhập thông tin để đăng nhập bên dưới</Text>
          </View>

          <View style={styles.formBlock}>
            <AuthInput
              icon="☎"
              keyboardType="phone-pad"
              label={VI_STRINGS.phone}
              onChangeText={setPhoneNumber}
              placeholder={VI_STRINGS.phonePlaceholder}
              value={phoneNumber}
            />

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{VI_STRINGS.next}</Text>
              <View style={styles.dividerLine} />
            </View>

            <AuthInput
              icon="◉"
              label={VI_STRINGS.password}
              onChangeText={setPassword}
              placeholder={VI_STRINGS.passwordPlaceholder}
              secureTextEntry
              value={password}
            />

            <View style={styles.forgotRow}>
              <Text style={styles.forgotText}>🔑 {VI_STRINGS.forgotPassword}</Text>
            </View>

            <View style={styles.buttonWrap}>
              <PrimaryButton label={VI_STRINGS.loginTitle} onPress={handleLogin} />
            </View>

            <Text style={styles.altLoginText}>{VI_STRINGS.altLogin}</Text>

            <View style={styles.bioGrid}>
              <BiometricCard icon="◌" label={VI_STRINGS.fingerprint} active />
              <BiometricCard icon="◉" label={VI_STRINGS.faceId} />
            </View>
          </View>

          <View style={styles.footerDivider} />
          <AppFooter />
        </View>
      </ScrollView>

      {isSuccessVisible ? <LoginSuccessModal onContinue={handleContinue} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  blueCircle: {
    position: 'absolute',
    right: -66,
    top: 110,
    width: 152,
    height: 152,
    borderRadius: 76,
    backgroundColor: 'rgba(104,188,219,0.92)',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 54,
    paddingBottom: 14,
  },
  headerBlock: {
    marginTop: 2,
  },
  welcomeText: {
    color: '#787878',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#252525',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 6,
  },
  description: {
    color: '#8A8A8A',
    fontSize: 14,
    lineHeight: 28,
    fontWeight: '600',
    textAlign: 'center',
    width: '92%',
    alignSelf: 'center',
  },
  brandInline: {
    color: '#68BCDB',
    fontWeight: '800',
  },
  formBlock: {
    marginTop: 64,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 34,
    marginTop: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E6ECF2',
  },
  dividerText: {
    color: '#B7C4D8',
    fontSize: 15,
    fontWeight: '600',
    marginHorizontal: 16,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: -6,
  },
  forgotText: {
    color: '#68BCDB',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonWrap: {
    marginTop: 34,
  },
  altLoginText: {
    color: '#7F90A8',
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 18,
    marginBottom: 18,
    letterSpacing: 0.4,
  },
  bioGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#E8EDF3',
    marginTop: 30,
    marginBottom: 18,
  },
});
