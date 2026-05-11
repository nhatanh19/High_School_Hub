import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {HighSchoolHubLogo} from '../components/HighSchoolHubLogo';
import {
  teacherDashboardShortcuts,
  teacherNews,
  teacherProfile,
  teacherQuote,
} from '../mocks/teacherDashboard';
import type {DashboardShortcut, NewsItem} from '../models/dashboard';

type Props = {
  onOpenApproval: () => void;
  onOpenAttendance: () => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenReport: () => void;
  onOpenSchedule: () => void;
  onOpenSearch: () => void;
  onOpenScore: () => void;
};

export function TeacherDashboardScreen({
  onOpenApproval,
  onOpenAttendance,
  onOpenNotifications,
  onOpenProfile,
  onOpenReport,
  onOpenSchedule,
  onOpenSearch,
  onOpenScore,
}: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.profileRow}>
            <Pressable onPress={onOpenProfile} style={styles.avatar}>
              <Text style={styles.avatarText}>VA</Text>
            </Pressable>

            <View>
              <Text style={styles.profileName}>{teacherProfile.name}</Text>
              <Text style={styles.profileClass}>{teacherProfile.className}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <Pressable onPress={onOpenSearch} style={styles.searchBox}>
              <Text style={styles.searchIcon}>⌕</Text>
              <Text style={styles.searchText}>Tìm kiếm</Text>
            </Pressable>
            <Pressable onPress={onOpenNotifications} style={styles.bellCircle}>
              <Text style={styles.bellIcon}>🔔</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.shortcutGrid}>
          {teacherDashboardShortcuts.map(item => (
            <ShortcutCard
              item={item}
              key={item.id}
              onPress={
                item.id === 'report'
                  ? onOpenReport
                  : item.id === 'approval'
                    ? onOpenApproval
                    : item.id === 'attendance'
                      ? onOpenAttendance
                      : item.id === 'schedule'
                        ? onOpenSchedule
                        : item.id === 'score'
                          ? onOpenScore
                    : undefined
              }
            />
          ))}
        </View>

        <View style={styles.quoteCard}>
          <View style={styles.quoteAccent} />
          <View style={styles.quoteBody}>
            <Text style={styles.quoteText}>{teacherQuote.text}</Text>
            <View style={styles.quoteFooter}>
              <Text style={styles.quoteAuthor}>{teacherQuote.author}</Text>
              <Text style={styles.quoteRefresh}>◌</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tin tức - Sự kiện</Text>

        <View style={styles.newsList}>
          {teacherNews.map(item => (
            <NewsCard item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.footerBlock}>
          <View style={styles.logoWrap}>
            <HighSchoolHubLogo />
          </View>
          <Text style={styles.brandText}>HIGH SCHOOL</Text>
          <Text style={styles.brandTextAccent}>HUB</Text>
          <Text style={styles.footerText}>High School Hub. All rights reserved.</Text>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <NavItem active icon="⌂" label="Trang chủ" />
        <NavItem icon="▤" label="Lớp học" />
        <View style={styles.centerNav}>
          <Text style={styles.centerNavIcon}>◉</Text>
        </View>
        <NavItem icon="💬" label="Trò chuyện" />
        <NavItem icon="👥" label="Cá nhân" onPress={onOpenProfile} />
      </View>
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
      <View style={[styles.shortcutCircle, {backgroundColor: item.tint}]}>
        <Text style={[styles.shortcutIcon, {color: item.iconColor}]}>{item.icon}</Text>
      </View>
      <Text style={styles.shortcutLabel}>{item.label}</Text>
    </Pressable>
  );
}

function NewsCard({item}: {item: NewsItem}) {
  return (
    <View style={styles.newsCard}>
      <View style={[styles.newsThumb, {backgroundColor: item.tint}]}>
        <View style={styles.newsThumbGrid}>
          <View style={styles.newsThumbLine} />
          <View style={styles.newsThumbLineShort} />
          <View style={styles.newsThumbLine} />
          <View style={styles.newsThumbLineShort} />
        </View>
      </View>

      <View style={styles.newsBody}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDate}>{item.dateTime}</Text>
      </View>
    </View>
  );
}

function NavItem({
  active = false,
  icon,
  label,
  onPress,
}: {
  active?: boolean;
  icon: string;
  label: string;
  onPress?: () => void;
}) {
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
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 104,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDE9E8',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#54646C',
    fontSize: 14,
    fontWeight: '800',
  },
  profileName: {
    color: '#1E2B38',
    fontSize: 16,
    fontWeight: '800',
  },
  profileClass: {
    color: '#A4AFBC',
    fontSize: 11,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchBox: {
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E6EEF5',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchIcon: {
    color: '#7CBFDB',
    fontSize: 13,
  },
  searchText: {
    color: '#A5B4C3',
    fontSize: 11,
    marginLeft: 5,
  },
  bellCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E6EEF5',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellIcon: {
    fontSize: 14,
  },
  shortcutGrid: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 18,
  },
  shortcutItem: {
    width: '25%',
    alignItems: 'center',
  },
  shortcutCircle: {
    width: 58,
    height: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shortcutIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  shortcutLabel: {
    color: '#243247',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  quoteCard: {
    marginTop: 18,
    borderRadius: 18,
    backgroundColor: '#EFF8FC',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  quoteAccent: {
    width: 4,
    borderRadius: 999,
    backgroundColor: '#79C4DE',
    marginRight: 12,
  },
  quoteBody: {
    flex: 1,
  },
  quoteText: {
    color: '#1F2A36',
    fontSize: 14,
    lineHeight: 20,
  },
  quoteFooter: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quoteAuthor: {
    color: '#A1A8B0',
    fontSize: 11,
    fontWeight: '700',
  },
  quoteRefresh: {
    color: '#72BFE0',
    fontSize: 16,
  },
  sectionTitle: {
    color: '#1E2B38',
    fontSize: 16,
    fontWeight: '800',
    marginTop: 20,
  },
  newsList: {
    marginTop: 12,
    gap: 10,
  },
  newsCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8EDF4',
    backgroundColor: '#FFFFFF',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsThumb: {
    width: 62,
    height: 62,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  newsThumbGrid: {
    width: 40,
    gap: 4,
  },
  newsThumbLine: {
    height: 6,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.92)',
  },
  newsThumbLineShort: {
    width: 26,
    height: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.82)',
  },
  newsBody: {
    flex: 1,
    marginLeft: 12,
  },
  newsTitle: {
    color: '#1E2B38',
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  newsDate: {
    color: '#96A2B1',
    fontSize: 11,
    marginTop: 8,
  },
  footerBlock: {
    alignItems: 'center',
    marginTop: 28,
  },
  logoWrap: {
    width: 92,
    height: 72,
    overflow: 'hidden',
    marginBottom: -18,
    justifyContent: 'center',
  },
  brandText: {
    color: '#214B81',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
  },
  brandTextAccent: {
    color: '#F39C31',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0.8,
    marginTop: -2,
  },
  footerText: {
    color: '#1F1F1F',
    fontSize: 11,
    marginTop: 8,
  },
  bottomNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 76,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8EEF5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 54,
  },
  navIcon: {
    color: '#CCD2DA',
    fontSize: 16,
  },
  navIconActive: {
    color: '#69BFDE',
  },
  navLabel: {
    color: '#CCD2DA',
    fontSize: 10,
    marginTop: 4,
  },
  navLabelActive: {
    color: '#69BFDE',
    fontWeight: '700',
  },
  centerNav: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#69BFDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  centerNavIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});
