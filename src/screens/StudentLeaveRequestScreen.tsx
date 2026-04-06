import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import type {LeaveReasonKey, LeaveRequestDraft} from '../models/leave';

type Props = {
  draft: LeaveRequestDraft;
  onBack: () => void;
  onChangeField: (field: keyof LeaveRequestDraft, value: string) => void;
  onChangeReason: (reason: LeaveReasonKey) => void;
  onPreview: () => void;
};

const REASON_OPTIONS: Array<{key: LeaveReasonKey; label: string}> = [
  {key: 'sick', label: 'Ốm / Sốt'},
  {key: 'family', label: 'Việc gia đình'},
  {key: 'medical', label: 'Đi khám bệnh'},
];

export function StudentLeaveRequestScreen({
  draft,
  onBack,
  onChangeField,
  onChangeReason,
  onPreview,
}: Props) {
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
        <CardSection title="KÍNH GỬI">
          <View style={styles.teacherBadge}>
            <Text style={styles.teacherBadgeIcon}>☏</Text>
            <Text style={styles.teacherBadgeText}>Kính gửi giáo viên chủ nhiệm</Text>
          </View>

          <Text style={styles.inlineLabel}>HỌ VÀ TÊN GIÁO VIÊN</Text>
          <View style={styles.teacherField}>
            <Text style={styles.teacherFieldIcon}>◡</Text>
            <Text style={styles.teacherFieldValue}>{draft.teacherName}</Text>
            <View style={styles.classBadge}>
              <Text style={styles.classBadgeText}>{draft.teacherClass}</Text>
            </View>
          </View>
        </CardSection>

        <CardSection title="THỜI GIAN NGHỈ" titleIcon="◔">
          <View style={styles.dateRowLabels}>
            <Text style={styles.dateLabel}>Từ ngày</Text>
            <Text style={styles.dateLabel}>Đến ngày</Text>
          </View>

          <View style={styles.dateRow}>
            <DateField value={draft.startDate} />
            <Text style={styles.arrowText}>→</Text>
            <DateField value={draft.endDate} />
          </View>

          <View style={styles.totalWrap}>
            <Text style={styles.totalText}>
              Tổng: <Text style={styles.totalTextAccent}>{draft.totalDays}</Text>
            </Text>
          </View>
        </CardSection>

        <CardSection title="LÝ DO NGHỈ" titleIcon="✎">
          <View style={styles.reasonRow}>
            {REASON_OPTIONS.map(option => {
              const active = draft.reason === option.key;
              return (
                <Pressable
                  key={option.key}
                  onPress={() => onChangeReason(option.key)}
                  style={[styles.reasonChip, active ? styles.reasonChipActive : null]}>
                  <Text style={[styles.reasonChipText, active ? styles.reasonChipTextActive : null]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            multiline
            onChangeText={value => onChangeField('detailReason', value)}
            placeholder="Nhập chi tiết lý do..."
            placeholderTextColor="#B3BAC7"
            style={styles.reasonInput}
            value={draft.detailReason}
          />

          <Text style={styles.proofTitle}>📎 MINH CHỨNG (NẾU CÓ)</Text>
          <Pressable style={styles.uploadBox}>
            <View style={styles.uploadCircle}>
              <Text style={styles.uploadCircleIcon}>📷</Text>
            </View>
            <Text style={styles.uploadTitle}>Chạm để chụp ảnh hoặc tải lên</Text>
            <Text style={styles.uploadSubtitle}>({draft.evidenceLabel})</Text>
          </Pressable>
        </CardSection>

        <View style={styles.footerButtons}>
          <Pressable onPress={onPreview} style={[styles.actionButton, styles.previewButton]}>
            <Text style={styles.actionButtonText}>Xem trước</Text>
          </Pressable>
          <Pressable onPress={onPreview} style={[styles.actionButton, styles.downloadButton]}>
            <Text style={styles.actionButtonText}>Tải xuống</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

type CardSectionProps = {
  children: React.ReactNode;
  title: string;
  titleIcon?: string;
};

function CardSection({children, title, titleIcon}: CardSectionProps) {
  return (
    <View style={styles.sectionCard}>
      <View style={styles.sectionTitleRow}>
        {titleIcon ? <Text style={styles.sectionIcon}>{titleIcon}</Text> : null}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

function DateField({value}: {value: string}) {
  return (
    <View style={styles.dateField}>
      <Text style={styles.dateValue}>{value}</Text>
      <Text style={styles.calendarIcon}>🗓</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFD',
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
    fontWeight: '900',
  },
  scrollContent: {
    paddingVertical: 18,
    paddingHorizontal: 16,
    paddingBottom: 28,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#D8E0EA',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIcon: {
    color: '#9FA7B8',
    fontSize: 18,
    marginRight: 8,
  },
  sectionTitle: {
    color: '#7A8292',
    fontSize: 15,
    fontWeight: '900',
  },
  teacherBadge: {
    height: 68,
    borderRadius: 18,
    backgroundColor: '#FFF0F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 16,
  },
  teacherBadgeIcon: {
    color: '#69BFDE',
    fontSize: 22,
    marginRight: 12,
  },
  teacherBadgeText: {
    color: '#69BFDE',
    fontSize: 16,
    fontWeight: '800',
  },
  inlineLabel: {
    color: '#A0A8B7',
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  teacherField: {
    height: 74,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ECEFF4',
    backgroundColor: '#F9FBFE',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  teacherFieldIcon: {
    color: '#D0D5DE',
    fontSize: 22,
    marginRight: 10,
  },
  teacherFieldValue: {
    color: '#596273',
    fontSize: 15,
    fontWeight: '500',
    flex: 1,
  },
  classBadge: {
    minWidth: 64,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#ECEFF5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  classBadgeText: {
    color: '#7D8594',
    fontSize: 14,
    fontWeight: '800',
  },
  dateRowLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  dateLabel: {
    width: '44%',
    color: '#9EA6B6',
    fontSize: 14,
    fontWeight: '600',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateField: {
    flex: 1,
    height: 64,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6EBF3',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  dateValue: {
    color: '#263143',
    fontSize: 15,
    fontWeight: '800',
  },
  calendarIcon: {
    fontSize: 18,
  },
  arrowText: {
    color: '#D0D5DE',
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 12,
  },
  totalWrap: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  totalText: {
    color: '#8A92A1',
    fontSize: 14,
    fontWeight: '600',
  },
  totalTextAccent: {
    color: '#69BFDE',
    fontWeight: '800',
  },
  reasonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  reasonChip: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8EDF3',
    backgroundColor: '#FAFBFD',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  reasonChipActive: {
    backgroundColor: '#F1FBFF',
    borderColor: '#CDEDF7',
  },
  reasonChipText: {
    color: '#666F80',
    fontSize: 14,
    fontWeight: '700',
  },
  reasonChipTextActive: {
    color: '#69BFDE',
  },
  reasonInput: {
    minHeight: 150,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E6EBF3',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
    textAlignVertical: 'top',
    color: '#263143',
    fontSize: 15,
    marginBottom: 16,
  },
  proofTitle: {
    color: '#7A8292',
    fontSize: 15,
    fontWeight: '900',
    marginBottom: 12,
  },
  uploadBox: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#E5EAF2',
    borderRadius: 22,
    minHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  uploadCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F5F7FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  uploadCircleIcon: {
    fontSize: 24,
  },
  uploadTitle: {
    color: '#5B6475',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadSubtitle: {
    color: '#A8AFBE',
    fontSize: 12,
    marginTop: 6,
    textAlign: 'center',
  },
  footerButtons: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    height: 62,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewButton: {
    backgroundColor: '#69BFDE',
  },
  downloadButton: {
    backgroundColor: '#2ECC71',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '800',
  },
});
