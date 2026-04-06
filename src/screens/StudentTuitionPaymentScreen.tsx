import React, {useMemo, useState} from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PaymentSuccessModal} from '../components/PaymentSuccessModal';
import {studentTuitionPayment} from '../mocks/studentSettings';

type Props = {
  onBack: () => void;
  onPaymentSuccess: () => void;
};

export function StudentTuitionPaymentScreen({onBack, onPaymentSuccess}: Props) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const qrUrl = useMemo(() => {
    const description = encodeURIComponent(studentTuitionPayment.description);
    const accountName = encodeURIComponent(studentTuitionPayment.accountName);

    return `https://img.vietqr.io/image/${studentTuitionPayment.bankId}-${studentTuitionPayment.accountNo}-${studentTuitionPayment.template}.png?amount=${studentTuitionPayment.amount}&addInfo=${description}&accountName=${accountName}`;
  }, []);

  const handleContinue = () => {
    setShowSuccessModal(false);
    onPaymentSuccess();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Cổng thanh toán</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summaryWrap}>
          <Text style={styles.summaryLabel}>{studentTuitionPayment.orderTitle}</Text>
          <Text style={styles.amountText}>{studentTuitionPayment.amountLabel}</Text>
          <View style={styles.tuitionTitlePill}>
            <Text style={styles.tuitionTitleText}>{studentTuitionPayment.tuitionTitle}</Text>
          </View>
        </View>

        <View style={styles.expireWrap}>
          <Text style={styles.expireText}>{studentTuitionPayment.expiresInLabel}</Text>
        </View>

        <View style={styles.qrCard}>
          <View style={styles.qrCardHeader}>
            <Text style={styles.qrBrandText}>
              <Text style={styles.qrBrandBlue}>Viet</Text>
              <Text style={styles.qrBrandGold}>QR</Text>
            </Text>
            <Text style={styles.bankText}>{studentTuitionPayment.bankLabel}</Text>
          </View>

          <View style={styles.dashedDivider} />

          <View style={styles.qrFrame}>
            <Image resizeMode="contain" source={{uri: qrUrl}} style={styles.qrImage} />
          </View>

          <Text style={styles.scanHint}>
            Sử dụng <Text style={styles.scanHintBold}>App Ngân hàng</Text> bất kỳ để quét mã.
          </Text>
          <Text style={styles.scanSubhint}>Nội dung và số tiền đã được nhập tự động.</Text>

          <View style={styles.infoCard}>
            <InfoRow label="Số tài khoản" value={studentTuitionPayment.accountNo} />
            <InfoRow label="Chủ tài khoản" value={studentTuitionPayment.accountName} />
            <InfoRow
              isLast
              label="Nội dung CK"
              value={studentTuitionPayment.description}
            />
          </View>
        </View>

        <Pressable onPress={() => setShowSuccessModal(true)} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Mở App Ngân hàng thanh toán ↗</Text>
        </Pressable>

        <Pressable onPress={() => Linking.openURL(qrUrl)} style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>⇩   Tải ảnh mã QR xuống</Text>
        </Pressable>
      </ScrollView>

      {showSuccessModal ? (
        <PaymentSuccessModal
          message={'Bạn đã thanh toán\nhọc phí thành công'}
          onContinue={handleContinue}
        />
      ) : null}
    </View>
  );
}

type InfoRowProps = {
  isLast?: boolean;
  label: string;
  value: string;
};

function InfoRow({isLast = false, label, value}: InfoRowProps) {
  return (
    <View style={[styles.infoRow, !isLast ? styles.infoDivider : null]}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueWrap}>
        <Text style={styles.infoValue}>{value}</Text>
        <Text style={styles.copyIcon}>▢</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F8FB',
  },
  topBar: {
    height: 72,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F4',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 14,
    bottom: 0,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#111827',
    fontSize: 40,
    lineHeight: 40,
  },
  topBarTitle: {
    color: '#1F2938',
    fontSize: 22,
    fontWeight: '900',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  summaryWrap: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 24,
  },
  summaryLabel: {
    color: '#707A8D',
    fontSize: 18,
    fontWeight: '500',
  },
  amountText: {
    color: '#62BAD9',
    fontSize: 40,
    fontWeight: '900',
    marginTop: 8,
  },
  tuitionTitlePill: {
    marginTop: 16,
    minHeight: 42,
    borderRadius: 21,
    backgroundColor: '#ECFBF8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  tuitionTitleText: {
    color: '#187D78',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  expireWrap: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 12,
  },
  expireText: {
    color: '#D97706',
    fontSize: 16,
    fontWeight: '800',
    backgroundColor: '#FFEFB6',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  qrCard: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 20,
    shadowColor: '#CFD8E4',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.16,
    shadowRadius: 22,
    elevation: 5,
  },
  qrCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  qrBrandText: {
    fontSize: 25,
    fontWeight: '900',
  },
  qrBrandBlue: {
    color: '#0C63A9',
  },
  qrBrandGold: {
    color: '#F3B600',
  },
  bankText: {
    color: '#232D3D',
    fontSize: 24,
    fontWeight: '900',
  },
  dashedDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E9EEF5',
    borderStyle: 'dashed',
    marginTop: 18,
    marginBottom: 18,
  },
  qrFrame: {
    alignSelf: 'center',
    width: 252,
    height: 252,
    borderRadius: 26,
    borderWidth: 3,
    borderColor: '#63BAD9',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  qrImage: {
    width: '100%',
    height: '100%',
  },
  scanHint: {
    color: '#6D7586',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 18,
  },
  scanHintBold: {
    color: '#5C6474',
    fontWeight: '900',
  },
  scanSubhint: {
    color: '#7B8393',
    fontSize: 16,
    lineHeight: 28,
    textAlign: 'center',
    marginTop: 4,
  },
  infoCard: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#F7F9FC',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  infoRow: {
    minHeight: 58,
    justifyContent: 'center',
  },
  infoDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E6EBF2',
  },
  infoLabel: {
    color: '#778093',
    fontSize: 14,
  },
  infoValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  infoValue: {
    flex: 1,
    color: '#202A39',
    fontSize: 15,
    fontWeight: '900',
    paddingRight: 10,
  },
  copyIcon: {
    color: '#63BAD9',
    fontSize: 20,
  },
  primaryButton: {
    marginHorizontal: 16,
    marginTop: 18,
    height: 72,
    borderRadius: 22,
    backgroundColor: '#63BAD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
  secondaryButton: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 72,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DCE3EC',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#202A39',
    fontSize: 18,
    fontWeight: '900',
  },
});
