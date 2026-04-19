import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  studentScheduleDays,
  studentScheduleTimeline,
} from '../mocks/studentSchedule';
import type {
  ScheduleDayOption,
  ScheduleTimelineItem,
} from '../models/schedule';

type Props = {
  onBack: () => void;
};

const assets = {
  back: require('../assets/schedule/student/icons/back.png'),
  dotDefault: require('../assets/schedule/student/icons/timeline_dot_default.png'),
  dotInnerActive: require('../assets/schedule/student/icons/timeline_dot_inner_active.png'),
  dotOuterActive: require('../assets/schedule/student/icons/timeline_dot_outer_active.png'),
  googleDocs: require('../assets/schedule/student/icons/google_docs.png'),
  googleMeet: require('../assets/schedule/student/icons/google_meet.png'),
  menuDark: require('../assets/schedule/student/icons/menu_dark.png'),
  menuWhite: require('../assets/schedule/student/icons/menu_white.png'),
  physicsMark: require('../assets/schedule/student/icons/physics_mark.png'),
  userPrimary: require('../assets/schedule/student/icons/meta_user_primary.png'),
  userPrimaryInverted: require('../assets/schedule/student/icons/meta_user_primary_inverted.png'),
  userSecondary: require('../assets/schedule/student/icons/meta_user_secondary.png'),
  zoom: require('../assets/schedule/student/icons/zoom.png'),
};

export function StudentScheduleScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Image source={assets.back} style={styles.backIcon} />
        </Pressable>

        <Text style={styles.topBarTitle}>Thời khóa biểu</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.daysRow}>
          {studentScheduleDays.map(item => (
            <DayItem item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.timelineList}>
          {studentScheduleTimeline.map((item, index) => (
            <ScheduleTimelineCard
              isLast={index === studentScheduleTimeline.length - 1}
              item={item}
              key={item.id}
            />
          ))}
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

function DayItem({ item }: { item: ScheduleDayOption }) {
  return (
    <View style={styles.dayItem}>
      <Text
        style={[styles.dayLabel, item.isActive ? styles.dayLabelActive : null]}
      >
        {item.dayLabel}
      </Text>

      <Text
        style={[
          styles.dayNumber,
          item.isActive ? styles.dayNumberActive : null,
        ]}
      >
        {item.dateNumber}
      </Text>

      {item.isActive ? <View style={styles.dayUnderline} /> : null}
    </View>
  );
}

function ScheduleTimelineCard({
  isLast,
  item,
}: {
  isLast: boolean;
  item: ScheduleTimelineItem;
}) {
  const isPrimary = item.lesson.id === 'lesson-physics';
  const userIcon =
    item.lesson.id === 'lesson-physics'
      ? assets.userPrimaryInverted
      : item.lesson.id === 'lesson-geology'
        ? assets.userPrimary
        : assets.userSecondary;

  const platformIcon =
    item.lesson.platform === 'Google Meet'
      ? assets.googleMeet
      : item.lesson.platform === 'Google Docs'
        ? assets.googleDocs
        : assets.zoom;

  return (
    <View style={styles.timelineItemRow}>
      <View style={styles.timeColumn}>
        <Text style={styles.startTime}>{item.startTime}</Text>
        <Text style={styles.endTime}>{item.endTime}</Text>
      </View>

      <View style={styles.railColumn}>
        {isPrimary ? (
          <>
            <Image
              source={assets.dotOuterActive}
              style={styles.dotOuterActive}
            />
            <Image
              source={assets.dotInnerActive}
              style={styles.dotInnerActive}
            />
          </>
        ) : (
          <Image source={assets.dotDefault} style={styles.dotDefault} />
        )}

        {!isLast ? <View style={styles.railLine} /> : null}
      </View>

      <View
        style={[
          styles.lessonCard,
          isPrimary ? styles.lessonCardPrimary : styles.lessonCardSecondary,
        ]}
      >
        <Image
          source={isPrimary ? assets.menuWhite : assets.menuDark}
          style={styles.cardMenuIcon}
        />

        <Text
          style={[
            styles.lessonTitle,
            isPrimary ? styles.lessonTitlePrimary : null,
          ]}
        >
          {item.lesson.title}
        </Text>

        <Text
          style={[
            styles.lessonTopic,
            isPrimary ? styles.lessonTopicPrimary : null,
          ]}
        >
          {item.lesson.topic}
        </Text>

        <View style={styles.metaRow}>
          <Image source={userIcon} style={styles.metaIcon} />
          <Text
            style={[styles.metaText, isPrimary ? styles.metaTextPrimary : null]}
          >
            {item.lesson.teacherName}
          </Text>
        </View>

        <View style={[styles.metaRow, styles.metaRowBottom]}>
          <Image source={platformIcon} style={styles.platformIcon} />
          <Text
            style={[styles.metaText, isPrimary ? styles.metaTextPrimary : null]}
          >
            {item.lesson.platform}
          </Text>
        </View>

        {isPrimary ? (
          <Image source={assets.physicsMark} style={styles.physicsMark} />
        ) : null}
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
    height: 57,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 14,
    top: 7,
    width: 28,
    height: 43,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 14,
    height: 25,
    resizeMode: 'contain',
  },
  topBarTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  scrollContent: {
    paddingTop: 14,
    paddingHorizontal: 18,
    paddingBottom: 94,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  dayItem: {
    alignItems: 'center',
    width: 38,
  },
  dayLabel: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '400',
  },
  dayLabelActive: {
    color: '#49B583',
  },
  dayNumber: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    marginTop: 4,
  },
  dayNumberActive: {
    color: '#49B583',
  },
  dayUnderline: {
    width: 31,
    height: 2,
    borderRadius: 8,
    backgroundColor: '#49B583',
    marginTop: 3,
  },
  timelineList: {
    rowGap: 18,
  },
  timelineItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  timeColumn: {
    width: 56,
    paddingTop: 2,
  },
  startTime: {
    color: '#000000',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  endTime: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 4,
    lineHeight: 22,
  },
  railColumn: {
    width: 22,
    alignItems: 'center',
    marginRight: 9,
  },
  dotOuterActive: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  dotInnerActive: {
    position: 'absolute',
    top: 4,
    width: 8,
    height: 8,
    resizeMode: 'contain',
  },
  dotDefault: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  railLine: {
    width: 2,
    height: 140,
    marginTop: 4,
    backgroundColor: '#54B07A',
    borderColor: '#7F86FF',
    borderWidth: 1,
  },
  lessonCard: {
    flex: 1,
    minHeight: 146,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    overflow: 'hidden',
  },
  lessonCardPrimary: {
    backgroundColor: '#7F86FF',
    shadowColor: '#7F86FF',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 4,
  },
  lessonCardSecondary: {
    backgroundColor: 'rgba(169, 255, 253, 0.25)',
  },
  cardMenuIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 4,
    height: 12,
    resizeMode: 'contain',
  },
  lessonTitle: {
    color: 'rgba(0,0,0,0.9)',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
    paddingRight: 34,
  },
  lessonTitlePrimary: {
    color: '#FFFFFF',
  },
  lessonTopic: {
    marginTop: 2,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
    paddingRight: 34,
  },
  lessonTopicPrimary: {
    color: '#FFFFFF',
  },
  metaRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaRowBottom: {
    marginTop: 4,
  },
  metaIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 6,
  },
  platformIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 6,
  },
  metaText: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 20,
  },
  metaTextPrimary: {
    color: 'rgba(255,255,255,0.8)',
  },
  physicsMark: {
    position: 'absolute',
    right: 18,
    bottom: 16,
    width: 63,
    height: 68,
    resizeMode: 'contain',
    opacity: 0.75,
  },
  footerActions: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  downloadButton: {
    width: 156,
    height: 43,
    borderRadius: 10,
    backgroundColor: '#0DA6C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    width: 156,
    height: 43,
    borderRadius: 10,
    backgroundColor: '#0DA6C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: -0.3,
  },
});
