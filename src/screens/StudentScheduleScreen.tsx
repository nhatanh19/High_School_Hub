import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {studentScheduleDays, studentScheduleTimeline} from '../mocks/studentSchedule';
import type {ScheduleDayOption, ScheduleTimelineItem} from '../models/schedule';

type Props = {
  onBack: () => void;
};

export function StudentScheduleScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Thời khóa biểu</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.daysRow}>
          {studentScheduleDays.map(item => (
            <DayItem item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.timelineWrap}>
          <View style={styles.timelineRail}>
            <View style={styles.timelineLine} />
            {studentScheduleTimeline.map((item, index) => (
              <View key={item.id} style={[styles.railDotWrap, {top: index * 192 + 6}]}>
                <View style={styles.railDot} />
              </View>
            ))}
          </View>

          <View style={styles.timelineContent}>
            {studentScheduleTimeline.map(item => (
              <ScheduleTimelineCard item={item} key={item.id} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerActions}>
        <Pressable style={styles.downloadButton}>
          <Text style={styles.footerActionText}>Tải xuống</Text>
        </Pressable>
        <Pressable style={styles.viewButton}>
          <Text style={styles.footerActionText}>Xem</Text>
        </Pressable>
      </View>
    </View>
  );
}

function DayItem({item}: {item: ScheduleDayOption}) {
  return (
    <View style={styles.dayItem}>
      <Text style={[styles.dayLabel, item.isActive ? styles.dayLabelActive : null]}>
        {item.dayLabel}
      </Text>
      <Text style={[styles.dayNumber, item.isActive ? styles.dayNumberActive : null]}>
        {item.dateNumber}
      </Text>
      {item.isActive ? <View style={styles.dayUnderline} /> : null}
    </View>
  );
}

function ScheduleTimelineCard({item}: {item: ScheduleTimelineItem}) {
  const isPrimary = item.lesson.id === 'lesson-physics';

  return (
    <View style={styles.timelineItemRow}>
      <View style={styles.timeColumn}>
        <Text style={styles.startTime}>{item.startTime}</Text>
        <Text style={styles.endTime}>{item.endTime}</Text>
      </View>

      <View style={[styles.lessonCard, {backgroundColor: item.lesson.accentColor}]}> 
        <Text style={[styles.lessonTitle, isPrimary ? styles.lessonTitlePrimary : null]}>
          {item.lesson.title}
        </Text>
        <Text style={[styles.lessonTopic, isPrimary ? styles.lessonTopicPrimary : null]}>
          {item.lesson.topic}
        </Text>

        <View style={styles.lessonMetaWrap}>
          <View>
            <View style={styles.metaRow}>
              <View style={styles.personBadge}>
                <Text style={styles.personBadgeText}>{item.lesson.teacherName.slice(0, 1)}</Text>
              </View>
              <Text style={[styles.metaText, isPrimary ? styles.metaTextPrimary : null]}>
                {item.lesson.teacherName}
              </Text>
            </View>

            <View style={[styles.metaRow, styles.platformRow]}>
              <View style={styles.platformBadge}>
                <Text style={styles.platformBadgeText}>{item.lesson.platformIcon}</Text>
              </View>
              <Text style={[styles.metaText, isPrimary ? styles.metaTextPrimary : null]}>
                {item.lesson.platform}
              </Text>
            </View>
          </View>

          <Text style={[styles.lessonIcon, isPrimary ? styles.lessonIconPrimary : null]}>
            {item.lesson.icon}
          </Text>
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
    paddingTop: 18,
    paddingHorizontal: 14,
    paddingBottom: 130,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  dayItem: {
    alignItems: 'center',
    width: 46,
  },
  dayLabel: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '500',
  },
  dayLabelActive: {
    color: '#53C79B',
  },
  dayNumber: {
    color: '#151515',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 8,
  },
  dayNumberActive: {
    color: '#53C79B',
  },
  dayUnderline: {
    width: 54,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#53C79B',
    marginTop: 10,
  },
  timelineWrap: {
    flexDirection: 'row',
  },
  timelineRail: {
    width: 38,
    alignItems: 'center',
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 56,
    bottom: 18,
    width: 4,
    borderRadius: 2,
    backgroundColor: '#7980F1',
  },
  railDotWrap: {
    position: 'absolute',
    left: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: '#7980F1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  railDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  timelineContent: {
    flex: 1,
    gap: 18,
  },
  timelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    minHeight: 174,
  },
  timeColumn: {
    width: 72,
    paddingTop: 6,
    paddingRight: 10,
  },
  startTime: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '500',
  },
  endTime: {
    color: '#A0A3AA',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    marginTop: 6,
  },
  lessonCard: {
    flex: 1,
    borderRadius: 26,
    paddingHorizontal: 18,
    paddingVertical: 18,
    shadowColor: '#DDE5F0',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 4,
  },
  lessonTitle: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '900',
  },
  lessonTitlePrimary: {
    color: '#FFFFFF',
  },
  lessonTopic: {
    color: '#7C838C',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  lessonTopicPrimary: {
    color: '#F1F4FF',
  },
  lessonMetaWrap: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformRow: {
    marginTop: 10,
  },
  personBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#6E6E6E',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  personBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  platformBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#2A8CFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  platformBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  metaText: {
    color: '#6E757F',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  metaTextPrimary: {
    color: '#FFFFFF',
  },
  lessonIcon: {
    color: 'rgba(17,17,17,0.15)',
    fontSize: 72,
    fontWeight: '400',
    marginRight: 8,
  },
  lessonIconPrimary: {
    color: 'rgba(39,29,157,0.32)',
  },
  footerActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingBottom: 20,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  downloadButton: {
    width: '46.5%',
    height: 72,
    borderRadius: 18,
    backgroundColor: '#1BAFD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    width: '46.5%',
    height: 72,
    borderRadius: 18,
    backgroundColor: '#1BAFD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerActionText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '500',
  },
});
