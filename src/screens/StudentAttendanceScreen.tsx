import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AttendanceSuccessModal} from '../components/AttendanceSuccessModal';
import {
  studentAttendanceSummary,
  studentAttendanceTimeline,
  studentAttendanceWeekLabel,
} from '../mocks/studentAttendance';
import type {AttendanceStatus, AttendanceTimelineItem} from '../models/attendance';

type Props = {
  onBack: () => void;
};

export function StudentAttendanceScreen({onBack}: Props) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openSuccessModal = () => setShowSuccessModal(true);

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </Pressable>

          <View style={styles.headerTitleWrap}>
            <View style={styles.liveDot} />
            <Text style={styles.headerTitle}>Smart Check-in</Text>
          </View>

          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{studentAttendanceSummary.avatarLabel}</Text>
          </View>
        </View>

        <View style={styles.heroShell}>
          <View style={styles.heroCard}>
            <View style={styles.heroThumb}>
              <View style={styles.heroThumbLine} />
            </View>

            <View style={styles.heroBody}>
              <Text style={styles.heroDate}>{studentAttendanceSummary.dateLabel}</Text>
              <Text style={styles.heroTitle}>{studentAttendanceSummary.title}</Text>
              <Text style={styles.heroSubtitle}>{studentAttendanceSummary.subtitle}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.weekLabel}>{studentAttendanceWeekLabel}</Text>

        {studentAttendanceTimeline.map(item => (
          <AttendanceRow item={item} key={item.id} onReportSuccess={openSuccessModal} />
        ))}
      </ScrollView>

      <View pointerEvents="box-none" style={styles.floatingButtonLayer}>
        <Pressable onPress={openSuccessModal} style={styles.manualButton}>
          <Text style={styles.manualButtonText}>Check-in Thủ công</Text>
        </Pressable>
      </View>

      {showSuccessModal ? (
        <AttendanceSuccessModal onContinue={() => setShowSuccessModal(false)} />
      ) : null}
    </View>
  );
}

type AttendanceRowProps = {
  item: AttendanceTimelineItem;
  onReportSuccess: () => void;
};

function AttendanceRow({item, onReportSuccess}: AttendanceRowProps) {
  const tone = useMemo(() => getTone(item.status), [item.status]);

  return (
    <View style={styles.rowWrap}>
      <View style={styles.dayColumn}>
        <Text style={styles.dayWeek}>{item.weekdayLabel}</Text>
        <Text style={styles.dayNumber}>{item.dayNumber}</Text>
      </View>

      <View style={[styles.entryCard, tone.cardStyle]}>
        <View style={styles.entryMainRow}>
          <View style={[styles.entryPhoto, {backgroundColor: item.imageTint}, tone.photoStyle]}>
            {item.imageLabel ? <Text style={styles.entryPhotoText}>{item.imageLabel}</Text> : null}
          </View>

          <View style={styles.entryBody}>
            <View style={styles.timeRow}>
              <Text style={[styles.timeText, tone.timeStyle]}>{item.timeLabel}</Text>
              <View style={[styles.statusPill, tone.badgeStyle]}>
                <Text style={[styles.statusPillText, tone.badgeTextStyle]}>{item.statusLabel}</Text>
              </View>
            </View>

            <Text style={styles.locationText}>{item.locationLabel}</Text>
            {item.accuracyLabel ? (
              <Text style={styles.accuracyText}>{item.accuracyLabel}</Text>
            ) : null}
          </View>
        </View>

        {item.note ? (
          <View style={[styles.noteBanner, tone.noteStyle]}>
            <Text style={[styles.noteText, tone.noteTextStyle]}>{item.note}</Text>
          </View>
        ) : null}

        {item.actionLabel ? (
          <Pressable onPress={onReportSuccess} style={styles.reportButton}>
            <Text style={styles.reportButtonText}>{item.actionLabel}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function getTone(status: AttendanceStatus) {
  if (status === 'on-time') {
    return {
      badgeStyle: styles.badgeOnTime,
      badgeTextStyle: styles.badgeOnTimeText,
      cardStyle: styles.cardDefault,
      noteStyle: styles.noteNeutral,
      noteTextStyle: styles.noteNeutralText,
      photoStyle: styles.photoDark,
      timeStyle: styles.timeOnTime,
    };
  }

  if (status === 'late') {
    return {
      badgeStyle: styles.badgeLate,
      badgeTextStyle: styles.badgeLateText,
      cardStyle: styles.cardDefault,
      noteStyle: styles.noteLate,
      noteTextStyle: styles.noteLateText,
      photoStyle: styles.photoGray,
      timeStyle: styles.timeLate,
    };
  }

  return {
    badgeStyle: styles.badgeMissing,
    badgeTextStyle: styles.badgeMissingText,
    cardStyle: styles.cardMissing,
    noteStyle: styles.noteNeutral,
    noteTextStyle: styles.noteNeutralText,
    photoStyle: styles.photoMissing,
    timeStyle: styles.timeMissing,
  };
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F8FC',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 156,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#788192',
    fontSize: 34,
    lineHeight: 34,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 18,
  },
  liveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#58CC7E',
  },
  headerTitle: {
    color: '#1F2938',
    fontSize: 20,
    fontWeight: '900',
  },
  avatarCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#CBEAF4',
    backgroundColor: '#F2FCFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#5EB7D7',
    fontSize: 16,
    fontWeight: '800',
  },
  heroShell: {
    marginTop: 18,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    padding: 12,
    shadowColor: '#C9D5E3',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  heroCard: {
    borderRadius: 26,
    backgroundColor: '#18202E',
    paddingHorizontal: 18,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  heroThumb: {
    width: 82,
    height: 108,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    backgroundColor: '#2A3040',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  heroThumbLine: {
    height: 3,
    backgroundColor: '#65B8D7',
  },
  heroBody: {
    flex: 1,
    paddingLeft: 18,
  },
  heroDate: {
    color: '#8F99AB',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 8,
  },
  heroSubtitle: {
    color: '#96A2B6',
    fontSize: 15,
    marginTop: 8,
  },
  weekLabel: {
    color: '#8D97AA',
    fontSize: 17,
    fontWeight: '900',
    marginTop: 22,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  dayColumn: {
    width: 60,
    alignItems: 'center',
    paddingTop: 8,
  },
  dayWeek: {
    color: '#9CA5B7',
    fontSize: 16,
    fontWeight: '800',
  },
  dayNumber: {
    color: '#1F2938',
    fontSize: 24,
    fontWeight: '900',
    marginTop: 10,
  },
  entryCard: {
    flex: 1,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    padding: 14,
    shadowColor: '#D8E1EC',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 4,
  },
  cardDefault: {
    borderColor: '#EEF2F6',
  },
  cardMissing: {
    borderColor: '#FFD8D8',
  },
  entryMainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  entryPhoto: {
    width: 78,
    height: 102,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  photoDark: {
    borderWidth: 1,
    borderColor: '#20242D',
  },
  photoGray: {
    borderWidth: 1,
    borderColor: '#D5DAE2',
  },
  photoMissing: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E3E7EE',
  },
  entryPhotoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  entryBody: {
    flex: 1,
    paddingTop: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  timeText: {
    fontSize: 26,
    fontWeight: '900',
    marginRight: 10,
  },
  timeOnTime: {
    color: '#62BDDE',
  },
  timeLate: {
    color: '#FF7112',
  },
  timeMissing: {
    color: '#F05C59',
  },
  statusPill: {
    minHeight: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  badgeOnTime: {
    backgroundColor: '#E8FBEE',
  },
  badgeOnTimeText: {
    color: '#16A147',
  },
  badgeLate: {
    backgroundColor: '#FFF1E4',
  },
  badgeLateText: {
    color: '#EF6B0B',
  },
  badgeMissing: {
    backgroundColor: '#FFF0F0',
  },
  badgeMissingText: {
    color: '#F04A4A',
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '800',
  },
  locationText: {
    color: '#667084',
    fontSize: 15,
    marginTop: 10,
  },
  accuracyText: {
    color: '#98A2B3',
    fontSize: 13,
    marginTop: 6,
  },
  noteBanner: {
    marginTop: 14,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  noteNeutral: {
    backgroundColor: '#F8FAFD',
  },
  noteNeutralText: {
    color: '#667084',
  },
  noteLate: {
    backgroundColor: '#FFF5E9',
  },
  noteLateText: {
    color: '#EB6111',
  },
  noteText: {
    fontSize: 14,
    fontWeight: '500',
  },
  reportButton: {
    marginTop: 14,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E7EE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportButtonText: {
    color: '#556071',
    fontSize: 15,
    fontWeight: '800',
  },
  floatingButtonLayer: {
    position: 'absolute',
    right: 18,
    bottom: 22,
  },
  manualButton: {
    width: 232,
    height: 76,
    borderRadius: 36,
    backgroundColor: '#141B2D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#263043',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 6,
  },
  manualButtonText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
});
