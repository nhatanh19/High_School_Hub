import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  onBack: () => void;
};

const leaveTypes = [
  {
    id: 'personal',
    isActive: true,
    subtitle: '',
    title: 'Việc riêng',
  },
  {
    id: 'sick',
    isActive: false,
    subtitle: '(Ốm đau/ BHXH)',
    title: 'Ốm đau / Thai sản',
  },
  {
    id: 'work',
    isActive: false,
    subtitle: '(S/VĐA, điều động)',
    title: 'Công tác',
  },
  {
    id: 'annual',
    isActive: false,
    subtitle: '(Hè/ lễ tết)',
    title: 'Nghỉ phép năm',
  },
];

const affectedLessons = [
  {
    id: 'lesson-1',
    actionLabel: 'Đổi tiết',
    actionTone: 'blue' as const,
    replacement: 'Dạy bù vào...',
    subtitle: 'PPCT: Tiết 24 - Hàm số bậc hai',
    teacher: 'Đổi tiết (Dạy bù sau)',
    title: 'Tiết 2 • 10A1 • Toán',
  },
  {
    id: 'lesson-2',
    actionLabel: 'Dạy thay',
    actionTone: 'orange' as const,
    replacement: '',
    subtitle: 'PPCT: Tiết 18 - Hình không gian',
    teacher: 'Cô Nguyễn Thị B',
    title: 'Tiết 3 • 11B2 • Toán',
  },
];

export function TeacherReportScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.topBar}>
          <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>
          <Text style={styles.topBarTitle}>Xin nghỉ & Đổi tiết</Text>
        </View>

        <SectionCard title="HÌNH THỨC NGHỈ">
          <View style={styles.typeGrid}>
            {leaveTypes.map(item => (
              <Pressable
                key={item.id}
                style={[styles.typeCard, item.isActive ? styles.typeCardActive : null]}>
                <Text style={[styles.typeTitle, item.isActive ? styles.typeTitleActive : null]}>
                  {item.title}
                </Text>
                {item.subtitle ? (
                  <Text
                    style={[
                      styles.typeSubtitle,
                      item.isActive ? styles.typeSubtitleActive : null,
                    ]}>
                    {item.subtitle}
                  </Text>
                ) : null}
              </Pressable>
            ))}
          </View>
        </SectionCard>

        <SectionCard title="THỜI GIAN">
          <View style={styles.timeRow}>
            <DateBox label="TỪ NGÀY" value="2026-03-20" />
            <DateBox label="ĐẾN NGÀY" value="2026-03-22" />
          </View>
        </SectionCard>

        <View style={styles.lessonSection}>
          <View style={styles.lessonHeader}>
            <Text style={styles.lessonHeaderTitle}>TIẾT DẠY ẢNH HƯỞNG (3)</Text>
            <Text style={styles.lessonHeaderDate}>Thứ 6, 20/03</Text>
          </View>

          {affectedLessons.map(item => (
            <LessonCard item={item} key={item.id} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.submitBar}>
        <Pressable style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Gửi đơn xin nghỉ</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SectionCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function DateBox({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.dateBox}>
      <Text style={styles.dateLabel}>{label}</Text>
      <Text style={styles.dateValue}>{value}</Text>
    </View>
  );
}

function LessonCard({
  item,
}: {
  item: {
    actionLabel: string;
    actionTone: 'blue' | 'orange';
    replacement: string;
    subtitle: string;
    teacher: string;
    title: string;
  };
}) {
  return (
    <View style={styles.lessonCard}>
      <View style={styles.lessonTopRow}>
        <View style={styles.lessonBody}>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lessonSubtitle}>{item.subtitle}</Text>
        </View>

        <View
          style={[
            styles.lessonBadge,
            item.actionTone === 'blue' ? styles.lessonBadgeBlue : styles.lessonBadgeOrange,
          ]}>
          <Text
            style={[
              styles.lessonBadgeText,
              item.actionTone === 'blue'
                ? styles.lessonBadgeTextBlue
                : styles.lessonBadgeTextOrange,
            ]}>
            {item.actionLabel}
          </Text>
        </View>
      </View>

      <View style={styles.lessonInputRow}>
        <View style={styles.inputPillPrimary}>
          <Text style={styles.inputPillPrimaryText}>{item.teacher}</Text>
        </View>

        {item.replacement ? (
          <View style={styles.inputPillSecondary}>
            <Text style={styles.inputPillSecondaryText}>{item.replacement}</Text>
          </View>
        ) : (
          <View style={styles.dashedBox} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 106,
  },
  topBar: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#1F2B38',
    fontSize: 28,
    lineHeight: 28,
  },
  topBarTitle: {
    color: '#253040',
    fontSize: 18,
    fontWeight: '800',
  },
  sectionCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#9AA7B6',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 10,
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeCard: {
    width: '47%',
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6EDF4',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  typeCardActive: {
    backgroundColor: '#63BAD9',
    borderColor: '#63BAD9',
    shadowColor: '#63BAD9',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 4,
  },
  typeTitle: {
    color: '#435164',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  typeTitleActive: {
    color: '#FFFFFF',
  },
  typeSubtitle: {
    color: '#A4AFBC',
    fontSize: 9,
    marginTop: 2,
    textAlign: 'center',
  },
  typeSubtitleActive: {
    color: 'rgba(255,255,255,0.88)',
  },
  timeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateBox: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E7EDF4',
    backgroundColor: '#F9FBFD',
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 10,
  },
  dateLabel: {
    color: '#A3AEBB',
    fontSize: 9,
    fontWeight: '700',
  },
  dateValue: {
    color: '#374354',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 6,
  },
  lessonSection: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    backgroundColor: '#FFFFFF',
    padding: 12,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  lessonHeaderTitle: {
    color: '#6FC1E1',
    fontSize: 12,
    fontWeight: '800',
  },
  lessonHeaderDate: {
    color: '#79C2E1',
    fontSize: 11,
    fontWeight: '700',
  },
  lessonCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8EEF4',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 10,
  },
  lessonTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  lessonBody: {
    flex: 1,
    paddingRight: 10,
  },
  lessonTitle: {
    color: '#2A3647',
    fontSize: 13,
    fontWeight: '800',
  },
  lessonSubtitle: {
    color: '#98A4B3',
    fontSize: 9,
    marginTop: 4,
  },
  lessonBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  lessonBadgeBlue: {
    backgroundColor: '#E6EEFF',
  },
  lessonBadgeOrange: {
    backgroundColor: '#FFF0E2',
  },
  lessonBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  lessonBadgeTextBlue: {
    color: '#5687EC',
  },
  lessonBadgeTextOrange: {
    color: '#F08A3C',
  },
  lessonInputRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  inputPillPrimary: {
    flex: 1,
    minHeight: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D9E1E8',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputPillPrimaryText: {
    color: '#3C4859',
    fontSize: 12,
  },
  inputPillSecondary: {
    flex: 1,
    minHeight: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E4EAF0',
    backgroundColor: '#F7F9FB',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputPillSecondaryText: {
    color: '#A1ACB8',
    fontSize: 12,
  },
  dashedBox: {
    width: 22,
    minHeight: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DFE7EE',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
  },
  submitBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12,
  },
  submitButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#63BAD9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
});
