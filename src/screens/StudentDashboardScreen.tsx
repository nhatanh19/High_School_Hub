import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AppFooter } from '../components/AppFooter';
import { StudentBottomNav } from '../components/StudentBottomNav';
import {
  classmates,
  studentDashboardShortcuts,
  studentNews,
  studentProfile,
  studentQuote,
  studentTodayLessons,
} from '../mocks/studentDashboard';
import type {
  DashboardLesson,
  DashboardShortcut,
  HighlightStudent,
  NewsItem,
} from '../models/dashboard';

type Props = {
  onOpenAttendance: () => void;
  onOpenAllFeatures: () => void;
  onOpenExamSchedule: () => void;
  onOpenForum: () => void;
  onOpenHomework: () => void;
  onOpenLeaveRequest: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenScore: () => void;
  onOpenSchedule: () => void;
  onOpenSearch: () => void;
};

const assets = {
  all: require('../assets/dashboard/student/icons/all.png'),
  attendanceBase: require('../assets/dashboard/student/icons/attendance_base.png'),
  attendanceDot: require('../assets/dashboard/student/icons/attendance_dot.png'),
  attendanceLine: require('../assets/dashboard/student/icons/attendance_midline.png'),
  attendanceTop: require('../assets/dashboard/student/icons/attendance_top.png'),
  chat: require('../assets/dashboard/student/icons/chat.png'),
  exam: require('../assets/dashboard/student/icons/exam.png'),
  footerLogo: require('../assets/dashboard/student/images/footer_logo.png'),
  forumInner: require('../assets/dashboard/student/icons/forum_inner.png'),
  forumOuter: require('../assets/dashboard/student/icons/forum_outer.png'),
  homeworkBase: require('../assets/dashboard/student/icons/homework_base.png'),
  homeworkLine: require('../assets/dashboard/student/icons/homework_line.png'),
  leave: require('../assets/dashboard/student/icons/leave.png'),
  news1: require('../assets/dashboard/student/images/news_1.png'),
  news2: require('../assets/dashboard/student/images/news_2.png'),
  news3: require('../assets/dashboard/student/images/news_3.png'),
  notify: require('../assets/dashboard/student/icons/notify.png'),
  notifyBg: require('../assets/dashboard/student/images/notify_bg.png'),
  profileAvatar: require('../assets/dashboard/student/images/profile_avatar.png'),
  quoteBg: require('../assets/dashboard/student/images/quote_bg.png'),
  quoteBar: require('../assets/dashboard/student/images/quote_bar.png'),
  reload: require('../assets/dashboard/student/icons/reload.png'),
  scan: require('../assets/dashboard/student/icons/scan.png'),
  scheduleBase: require('../assets/dashboard/student/icons/schedule_base.png'),
  scheduleDot: require('../assets/dashboard/student/icons/schedule_dot.png'),
  scheduleMid: require('../assets/dashboard/student/icons/schedule_mid.png'),
  scheduleTopDot: require('../assets/dashboard/student/icons/schedule_topdot.png'),
  score: require('../assets/dashboard/student/icons/score.png'),
  search: require('../assets/dashboard/student/icons/search.png'),
  searchBg: require('../assets/dashboard/student/images/search_bg.png'),
  student1: require('../assets/dashboard/student/images/student_1.png'),
  student3: require('../assets/dashboard/student/images/student_3.png'),
};

export function StudentDashboardScreen({
  onOpenAttendance,
  onOpenAllFeatures,
  onOpenExamSchedule,
  onOpenForum,
  onOpenHomework,
  onOpenLeaveRequest,
  onOpenNotifications,
  onOpenProfile,
  onOpenScore,
  onOpenSchedule,
  onOpenSearch,
}: Props) {
  const shortcutFirstRow = studentDashboardShortcuts.slice(0, 4);
  const shortcutSecondRow = studentDashboardShortcuts.slice(4, 8);

  const getShortcutAction = (id: string) => {
    if (id === 'homework') {
      return onOpenHomework;
    }
    if (id === 'attendance') {
      return onOpenAttendance;
    }
    if (id === 'schedule') {
      return onOpenSchedule;
    }
    if (id === 'score') {
      return onOpenScore;
    }
    if (id === 'exam') {
      return onOpenExamSchedule;
    }
    if (id === 'forum') {
      return onOpenForum;
    }
    if (id === 'leave') {
      return onOpenLeaveRequest;
    }
    if (id === 'all') {
      return onOpenAllFeatures;
    }

    return undefined;
  };

  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.topRow}>
          <Image source={assets.profileAvatar} style={styles.profileAvatar} />
          <View style={styles.profileBody}>
            <Text style={styles.profileName}>{studentProfile.name}</Text>
            <Text style={styles.profileClass}>{studentProfile.className}</Text>
          </View>

          <Pressable onPress={onOpenSearch} style={styles.searchWrap}>
            <Image source={assets.searchBg} style={styles.searchBg} />
            <Image source={assets.search} style={styles.searchIcon} />
            <Text style={styles.searchText}>Tìm Kiếm</Text>
          </Pressable>

          <Pressable onPress={onOpenNotifications} style={styles.notifyWrap}>
            <Image source={assets.notifyBg} style={styles.notifyBg} />
            <Image source={assets.notify} style={styles.notifyIcon} />
          </Pressable>
        </View>

        <View style={styles.shortcutGrid}>
          <View style={styles.shortcutRow}>
            {shortcutFirstRow.map(item => (
              <ShortcutCard
                item={item}
                key={item.id}
                onPress={getShortcutAction(item.id)}
              />
            ))}
          </View>

          <View style={styles.shortcutRow}>
            {shortcutSecondRow.map(item => (
              <ShortcutCard
                item={item}
                key={item.id}
                onPress={getShortcutAction(item.id)}
              />
            ))}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lịch học hôm nay</Text>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>Thứ Tư, 15/05</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.lessonRow}
        >
          {studentTodayLessons.map(item => (
            <LessonCard item={item} key={item.id} />
          ))}
        </ScrollView>

        <View style={styles.quoteCard}>
          <View style={styles.quoteBgFill} />
          <Image source={assets.quoteBar} style={styles.quoteBar} />
          <Text style={styles.quoteText}>{studentQuote.text}</Text>
          <Image source={assets.reload} style={styles.reloadIcon} />
          <Text style={styles.quoteAuthor}>{studentQuote.author}</Text>
        </View>

        <Text style={styles.sectionTitle}>Top học sinh nổi bật</Text>
        <View style={styles.studentRow}>
          <TopStudentCard image={assets.student1} item={classmates[0]} />
          <TopStudentCard image={assets.student3} item={classmates[1]} />
        </View>

        <Text style={styles.sectionTitle}>Tin tức - Sự kiện</Text>
        <View style={styles.newsList}>
          {studentNews.map((item, index) => (
            <NewsCard
              item={item}
              key={item.id}
              thumb={
                index === 0
                  ? assets.news1
                  : index === 1
                    ? assets.news2
                    : assets.news3
              }
            />
          ))}
        </View>

        <View style={styles.footerArea}>
          <Image source={assets.footerLogo} style={styles.footerLogo} />
          <AppFooter />
        </View>
      </ScrollView>

      <StudentBottomNav onOpenProfile={onOpenProfile} />
    </View>
  );
}

function ShortcutCard({
  item,
  onPress,
}: {
  item: DashboardShortcut;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.shortcutItem}>
      <View style={[styles.shortcutCircle, { backgroundColor: item.tint }]}>
        <ShortcutIcon id={item.id} />
      </View>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </Pressable>
  );
}

function ShortcutIcon({ id }: { id: string }) {
  if (id === 'score') {
    return <Image source={assets.score} style={styles.scoreIcon} />;
  }

  if (id === 'homework') {
    return (
      <View style={styles.homeworkWrap}>
        <Image source={assets.homeworkBase} style={styles.homeworkBase} />
        <Image source={assets.homeworkLine} style={styles.homeworkLine} />
      </View>
    );
  }
  if (id === 'schedule') {
    return (
      <View style={styles.scheduleWrap}>
        <Image source={assets.scheduleBase} style={styles.scheduleBase} />
        <Image source={assets.scheduleMid} style={styles.scheduleMid} />
        <Image source={assets.scheduleTopDot} style={styles.scheduleTopDot1} />
        <Image source={assets.scheduleTopDot} style={styles.scheduleTopDot2} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot1} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot2} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot3} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot4} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot5} />
        <Image source={assets.scheduleDot} style={styles.scheduleDot6} />
      </View>
    );
  }
  if (id === 'exam') {
    return <Image source={assets.exam} style={styles.examIcon} />;
  }
  if (id === 'forum') {
    return (
      <View style={styles.forumWrap}>
        <Image source={assets.forumOuter} style={styles.forumOuter} />
        <Image source={assets.forumInner} style={styles.forumInner} />
      </View>
    );
  }
  if (id === 'attendance') {
    return (
      <View style={styles.attendanceWrap}>
        <Image source={assets.attendanceBase} style={styles.attendanceBase} />
        <Image source={assets.attendanceTop} style={styles.attendanceTop} />
        <Image source={assets.attendanceLine} style={styles.attendanceLine1} />
        <Image source={assets.attendanceLine} style={styles.attendanceLine2} />
        <Image source={assets.attendanceDot} style={styles.attendanceDot1} />
        <Image source={assets.attendanceDot} style={styles.attendanceDot2} />
      </View>
    );
  }

  if (id === 'leave') {
    return <Image source={assets.leave} style={styles.leaveIcon} />;
  }

  if (id === 'all') {
    return <Image source={assets.all} style={styles.allIcon} />;
  }

  return (
    <Text style={styles.shortcutFallback}>
      {id === 'leave' ? '✒' : id === 'score' ? '◔' : '▦'}
    </Text>
  );
}

function LessonCard({ item }: { item: DashboardLesson }) {
  const isActive = item.status != null;
  return (
    <View
      style={[styles.lessonCard, isActive ? styles.lessonCardActive : null]}
    >
      <View style={styles.lessonTop}>
        <View
          style={[
            styles.lessonPeriodPill,
            isActive ? styles.lessonPeriodPillActive : null,
          ]}
        >
          <Text
            style={[
              styles.lessonPeriodText,
              isActive ? styles.lessonPeriodTextActive : null,
            ]}
          >
            {item.period}
          </Text>
        </View>
        {item.status ? (
          <Text style={styles.lessonStatus}>● Đang học</Text>
        ) : null}
      </View>
      <Text
        style={[
          styles.lessonSubject,
          isActive ? styles.lessonSubjectActive : null,
        ]}
      >
        {item.subject}
      </Text>
      <Text
        style={[styles.lessonRoom, isActive ? styles.lessonRoomActive : null]}
      >
        📍 {item.room}
      </Text>
    </View>
  );
}

function TopStudentCard({
  image,
  item,
}: {
  image: number;
  item: HighlightStudent;
}) {
  return (
    <View style={styles.studentCard}>
      <Image source={image} style={styles.studentImage} />
      <View style={styles.studentBody}>
        <Text numberOfLines={1} style={styles.studentName}>
          {item.name}
        </Text>
        <Text style={styles.studentClass}>{item.className}</Text>
      </View>
    </View>
  );
}

function NewsCard({ item, thumb }: { item: NewsItem; thumb: number }) {
  return (
    <View style={styles.newsCard}>
      <Image source={thumb} style={styles.newsThumb} />
      <View style={styles.newsBody}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.dateTime}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F4F4F5' },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 120 },
  topRow: { height: 54, flexDirection: 'row', alignItems: 'center' },
  profileAvatar: { width: 40, height: 40, borderRadius: 20 },
  profileBody: { marginLeft: 12, flex: 1 },
  profileName: { fontSize: 15, fontWeight: '700', color: '#111111' },
  profileClass: {
    marginTop: 2,
    fontSize: 10,
    color: '#8E8E8E',
    fontStyle: 'italic',
  },
  searchWrap: {
    width: 110,
    height: 38,
    marginRight: 10,
    justifyContent: 'center',
  },
  searchBg: {
    position: 'absolute',
    width: 110,
    height: 38,
    resizeMode: 'stretch',
  },
  searchIcon: {
    position: 'absolute',
    width: 15.3,
    height: 15.3,
    left: 12,
    top: 11.5,
  },
  searchText: { marginLeft: 34, color: '#A4A7AD', fontSize: 12 },
  notifyWrap: { width: 38, height: 38 },
  notifyBg: { position: 'absolute', width: 38, height: 38 },
  notifyIcon: {
    position: 'absolute',
    width: 16.4,
    height: 20,
    left: 11,
    top: 9,
  },

  shortcutGrid: {
    marginTop: 24,
    rowGap: 24,
  },
  shortcutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  shortcutItem: { flex: 1, alignItems: 'center' },
  shortcutCircle: {
    width: 64,
    height: 64,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutLabel: {
    marginTop: 10,
    fontSize: 14,
    color: '#161616',
    textAlign: 'center',
  },
  shortcutFallback: { fontSize: 22, color: '#5E6B7A' },
  homeworkWrap: { width: 26, height: 26 },
  homeworkBase: {
    position: 'absolute',
    width: 21.7,
    height: 19.5,
    left: 2.2,
    top: 3.3,
  },
  homeworkLine: {
    position: 'absolute',
    width: 1,
    height: 15.2,
    left: 13,
    top: 7.6,
  },
  scheduleWrap: { width: 28, height: 28 },
  scheduleBase: {
    position: 'absolute',
    width: 21,
    height: 21,
    left: 3.5,
    top: 4.7,
  },
  scheduleMid: {
    position: 'absolute',
    width: 21,
    height: 1,
    left: 3.5,
    top: 11.7,
  },
  scheduleTopDot1: {
    position: 'absolute',
    width: 1,
    height: 4.7,
    left: 9.3,
    top: 2.3,
  },
  scheduleTopDot2: {
    position: 'absolute',
    width: 1,
    height: 4.7,
    left: 18.7,
    top: 2.3,
  },
  scheduleDot1: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 7,
    top: 12.8,
  },
  scheduleDot2: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 11.7,
    top: 12.8,
  },
  scheduleDot3: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 16.4,
    top: 12.8,
  },
  scheduleDot4: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 7,
    top: 17.4,
  },
  scheduleDot5: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 11.7,
    top: 17.4,
  },
  scheduleDot6: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 16.4,
    top: 17.4,
  },
  examIcon: { width: 21, height: 23.3 },
  scoreIcon: { width: 26, height: 24.1 },
  leaveIcon: { width: 25, height: 25 },
  allIcon: { width: 22, height: 25.1 },
  forumWrap: { width: 26, height: 26 },
  forumOuter: {
    position: 'absolute',
    width: 19.5,
    height: 19.5,
    left: 4.9,
    top: 4.9,
  },
  forumInner: {
    position: 'absolute',
    width: 13,
    height: 13,
    left: 1.6,
    top: 1.6,
  },
  attendanceWrap: { width: 29, height: 29 },
  attendanceBase: {
    position: 'absolute',
    width: 19.3,
    height: 21.8,
    left: 4.8,
    top: 4.8,
  },
  attendanceTop: {
    position: 'absolute',
    width: 9.7,
    height: 4.8,
    left: 9.7,
    top: 2.4,
  },
  attendanceLine1: {
    position: 'absolute',
    width: 4.8,
    height: 1,
    left: 14.5,
    top: 13.3,
  },
  attendanceLine2: {
    position: 'absolute',
    width: 4.8,
    height: 1,
    left: 14.5,
    top: 19.3,
  },
  attendanceDot1: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 9.7,
    top: 13.3,
  },
  attendanceDot2: {
    position: 'absolute',
    width: 1,
    height: 1,
    left: 9.7,
    top: 19.3,
  },

  sectionHeader: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#131A28',
    marginTop: 20,
    marginBottom: 12,
  },
  datePill: {
    minWidth: 112,
    height: 28,
    borderRadius: 5,
    backgroundColor: '#E8F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  datePillText: { fontSize: 12, color: '#63BAD5', fontWeight: '500' },
  lessonRow: { gap: 8, paddingBottom: 4 },
  lessonCard: {
    width: 162,
    minHeight: 124,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EBEEF2',
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  lessonCardActive: { backgroundColor: '#63BAD5', borderColor: '#63BAD5' },
  lessonTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lessonPeriodPill: {
    height: 28,
    minWidth: 54,
    borderRadius: 8,
    backgroundColor: '#F2F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  lessonPeriodPillActive: { backgroundColor: 'rgba(255,255,255,0.22)' },
  lessonPeriodText: { fontSize: 14, color: '#9EA7B3', fontWeight: '700' },
  lessonPeriodTextActive: { color: '#FFFFFF' },
  lessonStatus: { fontSize: 12, color: '#FFFFFF', fontWeight: '700' },
  lessonSubject: {
    marginTop: 10,
    fontSize: 17,
    fontWeight: '700',
    color: '#1E2734',
  },
  lessonSubjectActive: { color: '#FFFFFF' },
  lessonRoom: { marginTop: 8, fontSize: 15, color: '#7D838D' },
  lessonRoomActive: { color: '#E7F7FD' },

  quoteCard: {
    height: 126,
    marginTop: 18,
    borderRadius: 22,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 22,
    paddingTop: 14,
    paddingBottom: 12,
    backgroundColor: '#DFEEF5',
  },
  quoteBgFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#DFEEF5',
  },
  quoteBar: { position: 'absolute', left: 14, top: 14, width: 4, height: 98 },
  quoteText: {
    marginLeft: 18,
    marginRight: 62,
    fontSize: 16,
    lineHeight: 20,
    color: '#000000',
  },
  reloadIcon: {
    position: 'absolute',
    right: 18,
    top: 66,
    width: 22.4,
    height: 19.5,
  },
  quoteAuthor: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    fontSize: 17,
    color: '#838383',
    fontWeight: '700',
  },

  studentRow: { flexDirection: 'row', gap: 12 },
  studentCard: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  studentImage: { width: '100%', height: 167, resizeMode: 'cover' },
  studentBody: { paddingHorizontal: 12, paddingVertical: 8 },
  studentName: { fontSize: 17, color: '#1F1F1F' },
  studentClass: { marginTop: 4, fontSize: 15, color: '#6E737B' },

  newsList: { gap: 12 },
  newsCard: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: 'rgba(255,255,255,0.45)',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  newsThumb: { width: 80, height: 80, borderRadius: 20, marginRight: 14 },
  newsBody: { flex: 1, justifyContent: 'space-between' },
  newsTitle: {
    fontSize: 19,
    lineHeight: 22,
    fontWeight: '500',
    color: '#000000',
  },
  newsDate: { fontSize: 14, color: '#666B74' },

  footerArea: { marginTop: 30, alignItems: 'center' },
  footerLogo: { width: 87, height: 75, marginBottom: 6 },
});
