import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {studentExamSchedule} from '../mocks/studentExamSchedule';
import type {ExamScheduleItem} from '../models/exam';

type Props = {
  onBack: () => void;
};

export function StudentExamScheduleScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Lịch thi</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {studentExamSchedule.map(item => (
          <ExamTimelineItem item={item} key={item.id} />
        ))}

        <Pressable style={styles.downloadButton}>
          <Text style={styles.downloadIcon}>⇩</Text>
          <Text style={styles.downloadText}>TẢI LỊCH VỀ MÁY</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

type ExamTimelineItemProps = {
  item: ExamScheduleItem;
};

function ExamTimelineItem({item}: ExamTimelineItemProps) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineRail}>
        <View style={styles.timelineDot} />
        <View style={styles.timelineLine} />
      </View>

      <View style={styles.timelineContent}>
        <Text style={styles.dayLabel}>{item.dayLabel}</Text>
        <Text style={styles.dateLabel}>{item.dateLabel}</Text>

        <View style={styles.examCardWrap}>
          <View style={[styles.examTrack, {backgroundColor: item.trackColor}]} />
          <View style={styles.examCard}>
            <View style={[styles.examIconWrap, {backgroundColor: item.iconTint}]}>
              <Text style={[styles.examIcon, {color: item.iconColor}]}>{item.icon}</Text>
            </View>

            <View style={styles.examBody}>
              <Text style={styles.examSubject}>{item.subject}</Text>
              <Text style={styles.examRoom}>📍 {item.room}</Text>
            </View>

            <View style={styles.timePill}>
              <Text style={styles.timePillText}>{item.timeLabel}</Text>
            </View>
          </View>
        </View>
      </View>
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
    paddingBottom: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    bottom: 10,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 40,
    lineHeight: 40,
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 28,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  timelineRail: {
    width: 24,
    alignItems: 'center',
    paddingTop: 4,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#67BCDB',
    marginBottom: 8,
  },
  timelineLine: {
    width: 4,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#EEF2F7',
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 12,
  },
  dayLabel: {
    color: '#6E778A',
    fontSize: 15,
    fontWeight: '800',
  },
  dateLabel: {
    color: '#202938',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 8,
    marginBottom: 12,
  },
  examCardWrap: {
    flexDirection: 'row',
  },
  examTrack: {
    width: 3,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  examCard: {
    flex: 1,
    minHeight: 108,
    borderWidth: 1,
    borderColor: '#E9EDF3',
    borderLeftWidth: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  examIconWrap: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  examIcon: {
    fontSize: 22,
    fontWeight: '800',
  },
  examBody: {
    flex: 1,
    paddingRight: 10,
  },
  examSubject: {
    color: '#222C3A',
    fontSize: 18,
    fontWeight: '900',
  },
  examRoom: {
    color: '#6D778A',
    fontSize: 14,
    marginTop: 6,
  },
  timePill: {
    minWidth: 98,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#F4F6FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePillText: {
    color: '#4E596B',
    fontSize: 14,
    fontWeight: '800',
  },
  downloadButton: {
    marginTop: 6,
    height: 84,
    borderRadius: 22,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#8ECFE5',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 5,
  },
  downloadIcon: {
    color: '#FFFFFF',
    fontSize: 28,
    marginRight: 12,
    lineHeight: 30,
  },
  downloadText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
  },
});
