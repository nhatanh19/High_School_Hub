import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  onBack: () => void;
};

type ApprovalTab = 'pending' | 'approved' | 'history';

const pendingRequests = [
  {
    id: 'pending-1',
    actionLabel: 'Trùng lịch thi',
    accentColor: '#FF6A6A',
    dateLabel: 'Ngày mai, 21/12',
    detail: 'Lý do: "Gia đình đi du lịch."',
    extra: 'Cảnh báo: Có bài Kiểm tra 1 tiết Toán',
    name: 'Hoàng Văn Hùng',
    role: '12A1',
    subtitleTone: 'red' as const,
  },
  {
    id: 'pending-2',
    actionLabel: 'Về sớm',
    accentColor: '#C36DFF',
    dateLabel: 'Hôm nay • Từ tiết 4',
    detail: '"Em xin về sớm sau tiết 3 để đi niềng răng theo lịch hẹn bác sĩ."',
    extra: '',
    name: 'Trần Trà My',
    role: '10A1',
    subtitleTone: 'purple' as const,
  },
  {
    id: 'pending-3',
    actionLabel: 'Ốm/Sốt',
    accentColor: '#468DFF',
    dateLabel: 'Hôm nay, 20/12',
    detail: '"Em bị sốt cao, xin nghỉ 1 ngày."',
    extra: 'don_thuoc.jpg',
    name: 'Phạm Vân Đức',
    role: '10A1',
    subtitleTone: 'blue' as const,
  },
];

const approvedToday = [
  {
    id: 'approved-1',
    actionLabel: 'Về sớm',
    accentColor: '#C36DFF',
    dateLabel: 'Hôm nay • Từ tiết 4',
    detail: '"Em xin về sớm sau tiết 3 để đi niềng răng theo lịch hẹn bác sĩ."',
    extra: '',
    name: 'Trần Trà My',
    role: '10A1',
    subtitleTone: 'purple' as const,
  },
  {
    id: 'approved-2',
    actionLabel: 'Ốm/Sốt',
    accentColor: '#468DFF',
    dateLabel: 'Hôm nay, 20/12',
    detail: '"Em bị sốt cao, xin nghỉ 1 ngày."',
    extra: 'don_thuoc.jpg',
    name: 'Phạm Vân Đức',
    role: '10A1',
    subtitleTone: 'blue' as const,
  },
];

const completedItems = [
  {
    id: 'done-1',
    color: '#DFF6E8',
    subtitle: 'Đã duyệt lúc 08:30',
    title: 'Lê Thị Mai (Việc riêng)',
  },
  {
    id: 'done-2',
    color: '#FBE6E6',
    subtitle: 'Đã từ chối lúc 08:32',
    title: 'Trần Quốc Hùng (Đi chơi)',
  },
];

export function TeacherApprovalScreen({onBack}: Props) {
  const [activeTab, setActiveTab] = useState<ApprovalTab>('pending');

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
          <View style={styles.titleWrap}>
            <Text style={styles.schoolYear}>NĂM HỌC 2023 - 2024</Text>
            <Text style={styles.topBarTitle}>Duyệt Đơn Phép</Text>
          </View>
          <View style={styles.dot} />
        </View>

        <View style={styles.tabShell}>
          <TabButton
            active={activeTab === 'pending'}
            count={5}
            label="Chờ duyệt"
            onPress={() => setActiveTab('pending')}
          />
          <TabButton
            active={activeTab === 'approved'}
            count={2}
            label="Đã duyệt"
            onPress={() => setActiveTab('approved')}
          />
          <TabButton
            active={activeTab === 'history'}
            count={0}
            label="Lịch sử"
            onPress={() => setActiveTab('history')}
          />
        </View>

        {activeTab === 'pending' ? (
          <>
            <SectionHeader actionLabel="Duyệt tất cả" count={5} title="CẦN XỬ LÝ" />
            {pendingRequests.map(item => (
              <ApprovalCard item={item} key={item.id} mode="pending" />
            ))}
            <HistorySection title="VỪA XỬ LÝ" />
          </>
        ) : null}

        {activeTab === 'approved' ? (
          <>
            <SectionHeader actionLabel="Xem tất cả" count={2} title="HÔM NAY ĐÃ DUYỆT" />
            {approvedToday.map(item => (
              <ApprovalCard item={item} key={item.id} mode="approved" />
            ))}
            <HistorySection title="ĐÃ DUYỆT TRƯỚC ĐÓ" />
          </>
        ) : null}

        {activeTab === 'history' ? <HistorySection title="LỊCH SỬ DUYỆT ĐƠN" /> : null}
      </ScrollView>
    </View>
  );
}

function TabButton({
  active,
  count,
  label,
  onPress,
}: {
  active: boolean;
  count: number;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.tabButton, active ? styles.tabButtonActive : null]}>
      <Text style={[styles.tabText, active ? styles.tabTextActive : null]}>{label}</Text>
      {count > 0 ? (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{count}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function SectionHeader({
  actionLabel,
  count,
  title,
}: {
  actionLabel: string;
  count: number;
  title: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <View>
        <Text style={styles.sectionTitle}>
          {title} ({count})
        </Text>
      </View>
      <Text style={styles.sectionAction}>{actionLabel}</Text>
    </View>
  );
}

function ApprovalCard({
  item,
  mode,
}: {
  item: {
    actionLabel: string;
    accentColor: string;
    dateLabel: string;
    detail: string;
    extra: string;
    name: string;
    role: string;
    subtitleTone: 'red' | 'purple' | 'blue';
  };
  mode: 'approved' | 'pending';
}) {
  return (
    <View style={[styles.card, {borderLeftColor: item.accentColor}]}>
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{item.name.slice(0, 2)}</Text>
        </View>

        <View style={styles.cardHeaderBody}>
          <View style={styles.nameRow}>
            <Text style={styles.cardName}>{item.name}</Text>
            <Text style={styles.cardRole}>• {item.role}</Text>
          </View>
          <Text
            style={[
              styles.cardDate,
              item.subtitleTone === 'red'
                ? styles.cardDateRed
                : item.subtitleTone === 'purple'
                  ? styles.cardDatePurple
                  : styles.cardDateBlue,
            ]}>
            {item.dateLabel}
          </Text>
        </View>

        <View
          style={[
            styles.tagPill,
            item.subtitleTone === 'red'
              ? styles.tagPillRed
              : item.subtitleTone === 'purple'
                ? styles.tagPillPurple
                : styles.tagPillBlue,
          ]}>
          <Text
            style={[
              styles.tagPillText,
              item.subtitleTone === 'red'
                ? styles.tagPillTextRed
                : item.subtitleTone === 'purple'
                  ? styles.tagPillTextPurple
                  : styles.tagPillTextBlue,
            ]}>
            {item.actionLabel}
          </Text>
        </View>
      </View>

      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{item.detail}</Text>
        {item.extra ? (
          <Text style={item.subtitleTone === 'red' ? styles.warningText : styles.fileText}>
            {item.extra}
          </Text>
        ) : null}
      </View>

      <View style={styles.actionRow}>
        <Pressable style={[styles.secondaryButton, mode === 'pending' ? styles.secondaryPending : null]}>
          <Text style={styles.secondaryButtonText}>
            {mode === 'pending' ? (item.subtitleTone === 'red' ? 'Từ chối ngay' : 'Từ chối') : 'Hủy Duyệt'}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.primaryButton,
            mode === 'pending' && item.subtitleTone === 'red' ? styles.rejectButton : null,
          ]}>
          <Text style={styles.primaryButtonText}>
            {mode === 'pending'
              ? item.subtitleTone === 'red'
                ? 'Từ chối ngay'
                : item.subtitleTone === 'purple'
                  ? 'Duyệt (Cấp giấy ra cổng)'
                  : 'Duyệt phép'
              : 'Xem Chi tiết'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function HistorySection({title}: {title: string}) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDone}>Hoàn tất</Text>
      </View>

      {completedItems.map(item => (
        <View key={item.id} style={styles.historyCard}>
          <View style={[styles.historyDot, {backgroundColor: item.color}]} />
          <View style={styles.historyBody}>
            <Text style={styles.historyTitle}>{item.title}</Text>
            <Text style={styles.historySubtitle}>{item.subtitle}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  backButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#1E2A38',
    fontSize: 28,
    lineHeight: 28,
  },
  titleWrap: {
    alignItems: 'center',
    flex: 1,
  },
  schoolYear: {
    color: '#B8C1CC',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  topBarTitle: {
    color: '#263243',
    fontSize: 16,
    fontWeight: '900',
    marginTop: 2,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#F14646',
  },
  tabShell: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 4,
    flexDirection: 'row',
    marginBottom: 14,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tabButtonActive: {
    backgroundColor: '#F7F9FC',
    shadowColor: '#DCE4EE',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 2,
  },
  tabText: {
    color: '#95A1B0',
    fontSize: 12,
    fontWeight: '700',
  },
  tabTextActive: {
    color: '#67BCDB',
  },
  countBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#F54F4F',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
    paddingHorizontal: 4,
  },
  countBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
  },
  sectionTitle: {
    color: '#A2ACB8',
    fontSize: 12,
    fontWeight: '800',
  },
  sectionAction: {
    color: '#67BCDB',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionDone: {
    color: '#C3CCD6',
    fontSize: 11,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 3,
    shadowColor: '#DCE4EE',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FCE5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#E26D6D',
    fontSize: 11,
    fontWeight: '800',
  },
  cardHeaderBody: {
    flex: 1,
    marginLeft: 10,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardName: {
    color: '#2B3748',
    fontSize: 14,
    fontWeight: '800',
  },
  cardRole: {
    color: '#A3AEBA',
    fontSize: 11,
    marginLeft: 4,
  },
  cardDate: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  cardDateRed: {
    color: '#FF6A6A',
  },
  cardDatePurple: {
    color: '#A063F4',
  },
  cardDateBlue: {
    color: '#5A96F7',
  },
  tagPill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tagPillRed: {
    backgroundColor: '#FFF0F0',
  },
  tagPillPurple: {
    backgroundColor: '#F6ECFF',
  },
  tagPillBlue: {
    backgroundColor: '#EEF4FF',
  },
  tagPillText: {
    fontSize: 10,
    fontWeight: '800',
  },
  tagPillTextRed: {
    color: '#F14D4D',
  },
  tagPillTextPurple: {
    color: '#9C64F3',
  },
  tagPillTextBlue: {
    color: '#4A88F0',
  },
  messageBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEF2F6',
    backgroundColor: '#FBFCFE',
    padding: 12,
    marginTop: 12,
  },
  messageText: {
    color: '#6B7787',
    fontSize: 12,
    lineHeight: 18,
  },
  warningText: {
    color: '#F24D4D',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
  },
  fileText: {
    color: '#326DE0',
    fontSize: 11,
    fontWeight: '700',
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  actionRow: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  secondaryButton: {
    minWidth: 86,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E4EAF1',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  secondaryPending: {
    backgroundColor: '#F6F8FB',
  },
  secondaryButtonText: {
    color: '#6C7A8C',
    fontSize: 12,
    fontWeight: '700',
  },
  primaryButton: {
    flex: 1,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#67BCDB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  rejectButton: {
    backgroundColor: '#F54747',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  historyCard: {
    backgroundColor: 'rgba(255,255,255,0.68)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDF2F6',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  historyBody: {
    marginLeft: 12,
  },
  historyTitle: {
    color: '#A8B2BF',
    fontSize: 12,
    fontWeight: '700',
  },
  historySubtitle: {
    color: '#C5CDD6',
    fontSize: 10,
    marginTop: 4,
  },
});
