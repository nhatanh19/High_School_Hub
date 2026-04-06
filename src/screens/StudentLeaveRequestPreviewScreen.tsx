import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import type {LeaveRequestDraft} from '../models/leave';
import type {StudentProfileDetails} from '../models/profile';

type Props = {
  draft: LeaveRequestDraft;
  profile: StudentProfileDetails;
  onBack: () => void;
};

const REASON_LABELS = {
  family: 'Việc gia đình',
  medical: 'Đi khám bệnh',
  sick: 'Em mắc bệnh',
} as const;

export function StudentLeaveRequestPreviewScreen({draft, profile, onBack}: Props) {
  const reasonText = draft.detailReason.trim() || REASON_LABELS[draft.reason];

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Đơn xin nghỉ</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.paper}>
          <Text style={styles.centerHeading}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Text>
          <Text style={styles.centerSubHeading}>Độc lập - Tự do - Hạnh phúc</Text>
          <Text style={styles.separator}>-------------</Text>
          <Text style={styles.formTitle}>ĐƠN XIN NGHỈ HỌC</Text>
          <Text style={styles.dateLine}>............., ngày... tháng.... năm....</Text>

          <Text style={styles.bodyText}>Kính gửi:</Text>
          <Text style={styles.bodyText}>- Ban giám hiệu nhà trường</Text>
          <Text style={styles.bodyText}>- Giáo viên chủ nhiệm lớp: {draft.teacherName}</Text>

          <Text style={styles.bodyText}>
            Em tên là {profile.fullName}. Học sinh lớp {profile.className}. Trường {profile.schoolName}.
          </Text>
          <Text style={styles.bodyText}>
            Em làm đơn này để xin phép thầy/cô cho em nghỉ học {draft.totalDays}, từ ngày {draft.startDate} đến ngày {draft.endDate}.
          </Text>
          <Text style={styles.bodyText}>Lý do: {reasonText}.</Text>
          <Text style={styles.bodyText}>
            Em xin hứa trong thời gian nghỉ sẽ chép bài, học bài và làm bài tập đầy đủ.
          </Text>
          <Text style={styles.bodyText}>Rất mong nhận được sự chấp thuận của quý Thầy/Cô.</Text>
          <Text style={styles.bodyText}>Em xin chân thành cảm ơn!</Text>

          <Text style={styles.bodyText}>Ý kiến phụ huynh:</Text>
          <Text style={styles.dashLine}>....................................................................................</Text>
          <Text style={styles.dashLine}>....................................................................................</Text>

          <View style={styles.signatureWrap}>
            <Text style={styles.signatureTitle}>Người viết đơn</Text>
            <Text style={styles.signatureSubtitle}>(Ký và ghi rõ họ tên)</Text>
          </View>
        </View>

        <Pressable style={styles.downloadButton}>
          <Text style={styles.downloadText}>Tải xuống</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 82,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 14,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 14,
    bottom: 8,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 40,
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 28,
  },
  paper: {
    backgroundColor: '#FFFFFF',
    minHeight: 980,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
  },
  centerHeading: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 8,
  },
  centerSubHeading: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 6,
  },
  separator: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 12,
    marginTop: 2,
  },
  formTitle: {
    textAlign: 'center',
    color: '#111111',
    fontSize: 13,
    fontWeight: '900',
    marginTop: 10,
  },
  dateLine: {
    textAlign: 'right',
    color: '#222222',
    fontSize: 12,
    marginTop: 10,
    marginBottom: 22,
  },
  bodyText: {
    color: '#111111',
    fontSize: 12,
    lineHeight: 22,
    marginBottom: 12,
  },
  dashLine: {
    color: '#111111',
    fontSize: 12,
    marginBottom: 10,
  },
  signatureWrap: {
    marginTop: 28,
    alignItems: 'flex-end',
    paddingRight: 26,
  },
  signatureTitle: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '900',
  },
  signatureSubtitle: {
    color: '#111111',
    fontSize: 12,
    marginTop: 40,
  },
  downloadButton: {
    marginTop: 14,
    height: 64,
    borderRadius: 18,
    backgroundColor: '#2ECC71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
