import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { studentExamSchedule } from '../mocks/studentExamSchedule';
import type { ExamScheduleItem } from '../models/exam';

type Props = {
  onBack: () => void;
};

const assets = {
  back: require('../assets/exam/student/icons/back.png'),
  bookReader: require('../assets/exam/student/icons/book_reader.png'),
  calculator: require('../assets/exam/student/icons/calculator.png'),
  cardBorder: require('../assets/exam/student/icons/card_border.png'),
  download: require('../assets/exam/student/icons/download.png'),
  globeAsia: require('../assets/exam/student/icons/globe_asia.png'),
  language: require('../assets/exam/student/icons/language.png'),
  mapMarker: require('../assets/exam/student/icons/map_marker.png'),
  palette: require('../assets/exam/student/icons/palette.png'),
};

const subjectIcons: Record<string, number> = {
  'Mỹ thuật': assets.palette,
  'Ngữ Văn': assets.bookReader,
  'Tiếng Anh': assets.language,
  'Toán học': assets.calculator,
  'Xã hội học': assets.globeAsia,
};

export function StudentExamScheduleScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Image source={assets.back} style={styles.backIcon} />
        </Pressable>

        <Text style={styles.topBarTitle}>Lịch thi</Text>
        <Text style={styles.editText}>Sửa</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {studentExamSchedule.map((item, index) => (
          <ExamTimelineItem
            isLast={index === studentExamSchedule.length - 1}
            item={item}
            key={item.id}
          />
        ))}

        <Pressable style={styles.downloadButton}>
          <Image source={assets.download} style={styles.downloadIcon} />
          <Text style={styles.downloadText}>TẢI LỊCH VỀ MÁY</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function ExamTimelineItem({
  isLast,
  item,
}: {
  isLast: boolean;
  item: ExamScheduleItem;
}) {
  const iconSource = subjectIcons[item.subject];

  return (
    <View style={styles.timelineRow}>
      <View style={styles.leftRail}>
        <View style={styles.dateDot} />
        {!isLast ? <View style={styles.timelineLine} /> : null}
      </View>

      <View style={styles.timelineContent}>
        <View style={styles.dateBlock}>
          <Text style={styles.dayLabel}>{item.dayLabel}</Text>
          <Text style={styles.dateLabel}>{item.dateLabel}</Text>
        </View>

        <View style={styles.examCard}>
          <Image source={assets.cardBorder} style={styles.cardBorder} />

          <View
            style={[styles.examIconWrap, { backgroundColor: item.iconTint }]}
          >
            {iconSource ? (
              <Image source={iconSource} style={styles.examIconImage} />
            ) : null}
          </View>

          <View style={styles.examBody}>
            <Text style={styles.examSubject}>{item.subject}</Text>

            <View style={styles.roomRow}>
              <Image source={assets.mapMarker} style={styles.markerIcon} />
              <Text style={styles.examRoom}>{item.room}</Text>
            </View>
          </View>

          <View style={styles.timePill}>
            <Text style={styles.timePillText}>{item.timeLabel}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    height: 44,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 7,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  editText: {
    position: 'absolute',
    right: 18,
    top: 14,
    color: '#63BAD5',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 20,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  leftRail: {
    width: 12,
    alignItems: 'center',
    position: 'relative',
  },
  dateDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#63BAD5',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    marginTop: 4,
  },
  timelineLine: {
    width: 2,
    backgroundColor: '#E5E7EB',
    flex: 1,
    marginTop: 2,
  },
  timelineContent: {
    flex: 1,
    marginLeft: 20,
    paddingBottom: 10,
  },
  dateBlock: {
    paddingLeft: 16,
    marginBottom: 8,
  },
  dayLabel: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  dateLabel: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 38,
    marginTop: -2,
  },
  examCard: {
    height: 76,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 17,
    overflow: 'hidden',
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  examIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  examIconImage: {
    width: 14.02,
    height: 18,
    resizeMode: 'contain',
  },
  examBody: {
    flex: 1,
    paddingRight: 6,
  },
  examSubject: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  roomRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerIcon: {
    width: 9.34,
    height: 12,
    resizeMode: 'contain',
    marginRight: 8,
  },
  examRoom: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  timePill: {
    width: 63.89,
    height: 24.5,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePillText: {
    color: '#4B5563',
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 16.5,
  },
  downloadButton: {
    marginTop: 14,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#63BAD5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#93C5FD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 4,
  },
  downloadIcon: {
    width: 14.02,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
});
