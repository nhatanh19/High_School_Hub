import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppFooter} from '../components/AppFooter';
import {ClassSwitchMenu} from '../components/ClassSwitchMenu';
import {HighSchoolHubLogo} from '../components/HighSchoolHubLogo';
import {
  teacherClassOptions,
  teacherDashboardShortcuts,
  teacherNews,
  teacherProfile,
  teacherQuote,
  todayLessons,
  topStudents,
} from '../mocks/teacherDashboard';
import type {
  DashboardLesson,
  DashboardShortcut,
  HighlightStudent,
  NewsItem,
} from '../models/dashboard';

type Props = {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenSearch: () => void;
};

export function TeacherDashboardScreen({
  onOpenNotifications,
  onOpenProfile,
  onOpenSearch,
}: Props) {
  const [activeClassName, setActiveClassName] = useState(teacherProfile.className);
  const [isClassMenuVisible, setIsClassMenuVisible] = useState(false);

  const handleSelectClass = (className: string) => {
    setActiveClassName(className);
    setIsClassMenuVisible(false);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.topRow}>
            <View style={styles.profileRow}>
              <Pressable onPress={() => setIsClassMenuVisible(true)} style={styles.avatarPressable}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>VA</Text>
                </View>
              </Pressable>
              <View>
                <Text style={styles.profileName}>{teacherProfile.name}</Text>
                <Text style={styles.profileClass}>{activeClassName}</Text>
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
            {teacherDashboardShortcuts.map(item => (
              <ShortcutCard item={item} key={item.id} />
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
            {todayLessons.map(item => (
              <LessonCard item={item} key={item.id} />
            ))}
          </ScrollView>

          <View style={styles.quoteCard}>
            <View style={styles.quoteBar} />
            <View style={styles.quoteContent}>
              <Text style={styles.quoteText}>{teacherQuote.text}</Text>
              <View style={styles.quoteFooter}>
                <Text style={styles.quoteRefresh}>⟳</Text>
                <Text style={styles.quoteAuthor}>{teacherQuote.author}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Top học sinh nổi bật</Text>
          <View style={styles.studentsRow}>
            {topStudents.map(item => (
              <StudentCard item={item} key={item.id} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>Tin tức - Sự kiện</Text>
          <View style={styles.newsList}>
            {teacherNews.map(item => (
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

      {isClassMenuVisible ? (
        <ClassSwitchMenu
          onClose={() => setIsClassMenuVisible(false)}
          onSelectClass={handleSelectClass}
          options={teacherClassOptions}
        />
      ) : null}
    </View>
  );
}

type ShortcutCardProps = {
  item: DashboardShortcut;
};

function ShortcutCard({item}: ShortcutCardProps) {
  return (
    <View style={styles.shortcutItem}>
      <View style={[styles.shortcutCircle, {backgroundColor: item.tint}]}>
        <Text style={[styles.shortcutIcon, {color: item.iconColor}]}>{item.icon}</Text>
      </View>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </View>
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
    paddingBottom: 124,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarPressable: {
    borderRadius: 29,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#1D1D1D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  profileName: {
    color: '#141414',
    fontSize: 17,
    fontWeight: '900',
  },
  profileClass: {
    color: '#8B8B8B',
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    width: 120,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  searchIcon: {
    color: '#62BCD9',
    fontSize: 22,
    marginRight: 6,
  },
  searchText: {
    color: '#A2A9B2',
    fontSize: 14,
  },
  bellCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  bellIcon: {
    fontSize: 18,
  },
  shortcutGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 24,
    rowGap: 26,
  },
  shortcutItem: {
    width: '24%',
    alignItems: 'center',
  },
  shortcutCircle: {
    width: 92,
    height: 92,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutIcon: {
    fontSize: 34,
  },
  shortcutLabel: {
    marginTop: 10,
    color: '#222222',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 19,
    fontWeight: '900',
    marginTop: 18,
    marginBottom: 14,
  },
  datePill: {
    minWidth: 128,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#F0FAFD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datePillText: {
    color: '#82C8DD',
    fontSize: 14,
    fontWeight: '600',
  },
  lessonScroller: {
    marginHorizontal: -18,
  },
  lessonScrollerContent: {
    paddingHorizontal: 18,
    gap: 12,
  },
  lessonCard: {
    width: 150,
    minHeight: 124,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
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
    marginBottom: 12,
  },
  lessonPeriod: {
    color: '#A7B0BC',
    fontSize: 12,
    fontWeight: '700',
    backgroundColor: '#F4FBFE',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  lessonPeriodActive: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  lessonStatus: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  lessonSubject: {
    color: '#242424',
    fontSize: 17,
    fontWeight: '900',
  },
  lessonSubjectActive: {
    color: '#FFFFFF',
  },
  lessonRoom: {
    color: '#858B94',
    fontSize: 14,
    marginTop: 10,
  },
  lessonRoomActive: {
    color: '#E8F7FD',
  },
  quoteCard: {
    marginTop: 18,
    flexDirection: 'row',
    borderRadius: 26,
    backgroundColor: '#ECF7FB',
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'stretch',
  },
  quoteBar: {
    width: 5,
    borderRadius: 4,
    backgroundColor: '#69BFDE',
    marginRight: 16,
  },
  quoteContent: {
    flex: 1,
  },
  quoteText: {
    color: '#1F1F1F',
    fontSize: 16,
    lineHeight: 34,
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
    fontSize: 28,
  },
  quoteAuthor: {
    color: '#989898',
    fontSize: 16,
    fontWeight: '800',
  },
  studentsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  studentCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  studentImage: {
    height: 136,
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPortrait: {
    width: 76,
    height: 98,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  studentPortraitText: {
    color: '#5A4E22',
    fontSize: 24,
    fontWeight: '900',
  },
  studentBody: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  studentName: {
    color: '#242424',
    fontSize: 18,
    fontWeight: '500',
  },
  studentClass: {
    color: '#878787',
    fontSize: 14,
    marginTop: 4,
  },
  newsList: {
    gap: 14,
  },
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    backgroundColor: '#FFFFFF',
  },
  newsThumb: {
    width: 96,
    height: 96,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  newsThumbText: {
    color: '#8E7B35',
    fontSize: 20,
    fontWeight: '900',
  },
  newsBody: {
    flex: 1,
  },
  newsTitle: {
    color: '#181818',
    fontSize: 16,
    lineHeight: 32,
    fontWeight: '700',
  },
  newsDate: {
    color: '#777777',
    fontSize: 14,
    marginTop: 8,
  },
  logoFooterWrap: {
    alignItems: 'center',
    marginTop: 22,
  },
  logoScaleWrap: {
    transform: [{scale: 0.45}],
    marginBottom: -18,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 92,
    borderTopWidth: 1,
    borderTopColor: '#EDF0F4',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  navItem: {
    width: 62,
    alignItems: 'center',
  },
  navIcon: {
    color: '#D0D4DC',
    fontSize: 28,
  },
  navIconActive: {
    color: '#69BFDE',
  },
  navLabel: {
    color: '#C6CAD1',
    fontSize: 12,
    marginTop: 6,
  },
  navLabelActive: {
    color: '#69BFDE',
    fontWeight: '700',
  },
  centerNav: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -18,
  },
  centerNavIcon: {
    color: '#FFFFFF',
    fontSize: 28,
  },
});
