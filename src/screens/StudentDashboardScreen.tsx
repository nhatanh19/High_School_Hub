import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppFooter} from '../components/AppFooter';
import {HighSchoolHubLogo} from '../components/HighSchoolHubLogo';
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
  onOpenExamSchedule: () => void;
  onOpenLeaveRequest: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSchedule: () => void;
  onOpenSearch: () => void;
};

export function StudentDashboardScreen({
  onOpenAttendance,
  onOpenExamSchedule,
  onOpenLeaveRequest,
  onOpenNotifications,
  onOpenProfile,
  onOpenSchedule,
  onOpenSearch,
}: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.profileRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>ML</Text>
              </View>
              <View>
                <Text style={styles.profileName}>{studentProfile.name}</Text>
                <Text style={styles.profileClass}>{studentProfile.className}</Text>
              </View>
            </View>

            <View style={styles.searchWrap}>
              <Pressable onPress={onOpenSearch} style={styles.searchBox}>
                <Text style={styles.searchIcon}>⌕</Text>
                <Text style={styles.searchText}>Tìm Kiếm</Text>
              </Pressable>
              <Pressable onPress={onOpenNotifications} style={styles.bellCircle}>
                <Text style={styles.bellIcon}>🔔</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.shortcutGrid}>
            {studentDashboardShortcuts.map(item => (
              <ShortcutCard
                item={item}
                key={item.id}
                onPress={
                  item.id === 'attendance'
                    ? onOpenAttendance
                    : item.id === 'schedule'
                      ? onOpenSchedule
                      : item.id === 'exam'
                        ? onOpenExamSchedule
                        : item.id === 'leave'
                          ? onOpenLeaveRequest
                          : undefined
                }
              />
            ))}
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
            style={styles.lessonScroller}
            contentContainerStyle={styles.lessonScrollerContent}>
            {studentTodayLessons.map(item => (
              <LessonCard item={item} key={item.id} />
            ))}
          </ScrollView>

          <View style={styles.quoteCard}>
            <View style={styles.quoteBar} />
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>{studentQuote.text}</Text>
              <View style={styles.quoteFooter}>
                <Text style={styles.quoteRefresh}>⟳</Text>
                <Text style={styles.quoteAuthor}>{studentQuote.author}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Bạn học nổi bật</Text>
          <View style={styles.studentsRow}>
            {classmates.map(item => (
              <StudentCard item={item} key={item.id} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Tin tức - Sự kiện</Text>
          <View style={styles.newsList}>
            {studentNews.map(item => (
              <NewsCard item={item} key={item.id} />
            ))}
          </View>

          <View style={styles.logoFooterWrap}>
            <View style={styles.logoScaleWrap}>
              <HighSchoolHubLogo />
            </View>
            <AppFooter />
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavItem active icon="◔" label="Trang chủ" />
        <NavItem icon="📖" label="Lớp học" />
        <View style={styles.centerNav}>
          <Text style={styles.centerNavIcon}>👜</Text>
        </View>
        <NavItem icon="💬" label="Trò chuyện" />
        <NavItem icon="👥" label="Cá nhân" onPress={onOpenProfile} />
      </View>
    </View>
  );
}

type ShortcutCardProps = {
  item: DashboardShortcut;
  onPress?: () => void;
};

function ShortcutCard({item, onPress}: ShortcutCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.shortcutItem}>
      <View style={[styles.shortcutCircle, {backgroundColor: item.tint}]}>
        <Text style={[styles.shortcutIcon, {color: item.iconColor}]}>{item.icon}</Text>
      </View>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </Pressable>
  );
}

type LessonCardProps = {
  item: DashboardLesson;
};

function LessonCard({item}: LessonCardProps) {
  const isActive = item.status != null;

  return (
    <View
      style={[
        styles.lessonCard,
        {backgroundColor: item.tint},
        isActive ? styles.lessonCardActive : null,
      ]}>
      <View style={styles.lessonHeader}>
        <Text style={[styles.lessonPeriod, isActive ? styles.lessonPeriodActive : null]}>
          {item.period}
        </Text>
        {item.status ? <Text style={styles.lessonStatus}>● {item.status}</Text> : null}
      </View>
      <Text style={[styles.lessonSubject, isActive ? styles.lessonSubjectActive : null]}>
        {item.subject}
      </Text>
      <Text style={[styles.lessonRoom, isActive ? styles.lessonRoomActive : null]}>
        📍 {item.room}
      </Text>
    </View>
  );
}

type StudentCardProps = {
  item: HighlightStudent;
};

function StudentCard({item}: StudentCardProps) {
  return (
    <View style={styles.studentCard}>
      <View style={[styles.studentImage, {backgroundColor: item.tint}]}>
        <View style={styles.studentPortrait}>
          <Text style={styles.studentPortraitText}>{item.name.slice(0, 2)}</Text>
        </View>
      </View>
      <View style={styles.studentBody}>
        <Text style={styles.studentName}>{item.name}</Text>
        <Text style={styles.studentClass}>{item.className}</Text>
      </View>
    </View>
  );
}

type NewsCardProps = {
  item: NewsItem;
};

function NewsCard({item}: NewsCardProps) {
  return (
    <View style={styles.newsCard}>
      <View style={[styles.newsThumb, {backgroundColor: item.tint}]}>
        <Text style={styles.newsThumbText}>HSH</Text>
      </View>
      <View style={styles.newsBody}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.dateTime}</Text>
      </View>
    </View>
  );
}

type NavItemProps = {
  active?: boolean;
  icon: string;
  label: string;
  onPress?: () => void;
};

function NavItem({active = false, icon, label, onPress}: NavItemProps) {
  return (
    <Pressable onPress={onPress} style={styles.navItem}>
      <Text style={[styles.navIcon, active ? styles.navIconActive : null]}>{icon}</Text>
      <Text style={[styles.navLabel, active ? styles.navLabelActive : null]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 112,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  profileName: {
    color: '#141414',
    fontSize: 15,
    fontWeight: '900',
  },
  profileClass: {
    color: '#8B8B8B',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 3,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    width: 112,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    color: '#62BCD9',
    fontSize: 19,
    marginRight: 6,
  },
  searchText: {
    color: '#A2A9B2',
    fontSize: 13,
  },
  bellCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  bellIcon: {
    fontSize: 16,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 22,
    rowGap: 20,
  },
  shortcutItem: {
    width: '24%',
    alignItems: 'center',
  },
  shortcutCircle: {
    width: 76,
    height: 76,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutIcon: {
    fontSize: 28,
  },
  shortcutLabel: {
    marginTop: 8,
    color: '#222222',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 12,
  },
  datePill: {
    minWidth: 112,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F0FAFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePillText: {
    color: '#82C8DD',
    fontSize: 12,
    fontWeight: '600',
  },
  lessonScroller: {
    marginHorizontal: -16,
  },
  lessonScrollerContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  lessonCard: {
    width: 138,
    minHeight: 114,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#EFF2F5',
  },
  lessonCardActive: {
    borderColor: '#67BCDB',
  },
  lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  lessonPeriod: {
    color: '#A7B0BC',
    fontSize: 11,
    fontWeight: '700',
    backgroundColor: '#F4FBFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  lessonPeriodActive: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  lessonStatus: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  lessonSubject: {
    color: '#242424',
    fontSize: 15,
    fontWeight: '900',
  },
  lessonSubjectActive: {
    color: '#FFFFFF',
  },
  lessonRoom: {
    color: '#858B94',
    fontSize: 12,
    marginTop: 8,
  },
  lessonRoomActive: {
    color: '#E8F7FD',
  },
  quoteCard: {
    marginTop: 16,
    flexDirection: 'row',
    borderRadius: 22,
    backgroundColor: '#ECF7FB',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'stretch',
  },
  quoteBar: {
    width: 4,
    borderRadius: 3,
    backgroundColor: '#69BFDE',
    marginRight: 14,
  },
  quoteContent: {
    flex: 1,
  },
  quoteText: {
    color: '#1F1F1F',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '500',
  },
  quoteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  quoteRefresh: {
    color: '#69BFDE',
    fontSize: 24,
  },
  quoteAuthor: {
    color: '#989898',
    fontSize: 14,
    fontWeight: '800',
  },
  studentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  studentCard: {
    flex: 1,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  studentImage: {
    height: 122,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPortrait: {
    width: 68,
    height: 90,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPortraitText: {
    color: '#5A4E22',
    fontSize: 20,
    fontWeight: '900',
  },
  studentBody: {
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  studentName: {
    color: '#242424',
    fontSize: 15,
    fontWeight: '500',
  },
  studentClass: {
    color: '#878787',
    fontSize: 12,
    marginTop: 4,
  },
  newsList: {
    gap: 12,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  newsThumb: {
    width: 82,
    height: 82,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  newsThumbText: {
    color: '#8E7B35',
    fontSize: 17,
    fontWeight: '900',
  },
  newsBody: {
    flex: 1,
  },
  newsTitle: {
    color: '#181818',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
  },
  newsDate: {
    color: '#777777',
    fontSize: 12,
    marginTop: 6,
  },
  logoFooterWrap: {
    alignItems: 'center',
    marginTop: 18,
  },
  logoScaleWrap: {
    transform: [{scale: 0.4}],
    marginBottom: -24,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 86,
    borderTopWidth: 1,
    borderTopColor: '#EDF0F4',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    width: 62,
    alignItems: 'center',
  },
  navIcon: {
    color: '#D0D4DC',
    fontSize: 24,
  },
  navIconActive: {
    color: '#69BFDE',
  },
  navLabel: {
    color: '#C6CAD1',
    fontSize: 11,
    marginTop: 5,
  },
  navLabelActive: {
    color: '#69BFDE',
    fontWeight: '700',
  },
  centerNav: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
  },
  centerNavIcon: {
    color: '#FFFFFF',
    fontSize: 24,
  },
});
