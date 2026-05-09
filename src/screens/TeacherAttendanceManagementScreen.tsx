import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  onBack: () => void;
};

const pendingStudents = [
  {
    id: 'pending-1',
    label: 'Cần đơn nghỉ phép',
    name: 'Phạm Văn Đức',
    status: 'Duyệt',
    subtitle: '1A1 • Đi học đủ tiết',
  },
  {
    id: 'pending-2',
    label: '',
    name: 'Lê Thị Mai',
    status: '',
    subtitle: '07:15 • Có mặt',
  },
  {
    id: 'pending-3',
    label: 'Chưa thấy điểm danh',
    name: 'Trần Quốc Hùng',
    status: 'Đợi PH',
    subtitle: 'Đi trễ',
  },
];

const attendedStudents = [
  {id: 'att-1', name: 'Nguyễn Văn An', time: '06:59'},
  {id: 'att-2', name: 'Đỗ Thị Hòa', time: '06:58'},
];

export function TeacherAttendanceManagementScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Điểm danh học sinh</Text>
        <Text style={styles.moreIcon}>⋯</Text>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryDate}>THỨ TƯ, 20/12/2023</Text>
          <Text style={styles.summaryClass}>Lớp 10A1</Text>

          <View style={styles.statsRow}>
            <View style={styles.mainStat}>
              <Text style={styles.mainStatLabel}>SĨ SỐ LỚP</Text>
              <Text style={styles.mainStatValue}>38</Text>
              <Text style={styles.mainStatNote}>HS có mặt</Text>
            </View>

            <View style={styles.miniStatWrap}>
              <MiniStat label="TRỄ" value="2" />
              <MiniStat label="VẮNG" value="2" />
            </View>
          </View>

          <View style={styles.filterRow}>
            <FilterPill active label="Tất cả" />
            <FilterPill label="Vắng / Trễ (4)" />
            <FilterPill label="Có phép (1)" />
          </View>
        </View>

        <Text style={styles.sectionTitle}>CẦN XỬ LÝ (3)</Text>
        {pendingStudents.map(item => (
          <View key={item.id} style={styles.pendingCard}>
            <View style={styles.pendingRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.slice(0, 1)}</Text>
              </View>
              <View style={styles.pendingBody}>
                <Text style={styles.pendingName}>{item.name}</Text>
                <Text style={styles.pendingSubtitle}>{item.subtitle}</Text>
              </View>
              {item.status ? (
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>{item.status}</Text>
                </View>
              ) : (
                <View style={styles.ghostWrap}>
                  <View style={styles.ghostBox} />
                  <View style={styles.ghostBox} />
                </View>
              )}
            </View>
            {item.label ? <Text style={styles.pendingLabel}>{item.label}</Text> : null}
          </View>
        ))}

        <Text style={styles.sectionTitle}>ĐÃ ĐIỂM DANH (35)</Text>
        {attendedStudents.map(item => (
          <View key={item.id} style={styles.attendedCard}>
            <View style={[styles.avatar, styles.attendedAvatar]}>
              <Text style={styles.avatarText}>{item.name.slice(0, 1)}</Text>
            </View>
            <Text style={styles.attendedName}>{item.name}</Text>
            <Text style={styles.attendedTime}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Xuất báo cáo</Text>
        </Pressable>
        <Pressable style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Chốt sổ</Text>
        </Pressable>
      </View>
    </View>
  );
}

function MiniStat({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.miniStat}>
      <View style={styles.miniStatCircle}>
        <Text style={styles.miniStatValue}>{value}</Text>
      </View>
      <Text style={styles.miniStatLabel}>{label}</Text>
    </View>
  );
}

function FilterPill({active = false, label}: {active?: boolean; label: string}) {
  return (
    <View style={[styles.filterPill, active ? styles.filterPillActive : null]}>
      <Text style={[styles.filterPillText, active ? styles.filterPillTextActive : null]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F5F8FB'},
  topBar: {height: 48, backgroundColor: '#67BCDB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10},
  backButton: {width: 28, alignItems: 'center', justifyContent: 'center'},
  backIcon: {color: '#FFFFFF', fontSize: 26, lineHeight: 26},
  topBarTitle: {color: '#FFFFFF', fontSize: 15, fontWeight: '800'},
  moreIcon: {color: '#FFFFFF', width: 28, textAlign: 'center', fontSize: 18},
  scrollContent: {padding: 10, paddingBottom: 88},
  summaryCard: {backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 14},
  summaryDate: {color: '#C0C9D4', fontSize: 9, textAlign: 'center'},
  summaryClass: {color: '#263243', fontSize: 18, fontWeight: '900', textAlign: 'center', marginTop: 6},
  statsRow: {flexDirection: 'row', justifyContent: 'space-between', marginTop: 14},
  mainStatLabel: {color: '#BBC4D0', fontSize: 9, fontWeight: '700'},
  mainStatValue: {color: '#253243', fontSize: 38, fontWeight: '900'},
  mainStatNote: {color: '#32B25B', fontSize: 10, fontWeight: '700'},
  miniStatWrap: {flexDirection: 'row', gap: 14},
  miniStat: {alignItems: 'center'},
  miniStatCircle: {width: 24, height: 24, borderRadius: 12, backgroundColor: '#FFEBDC', alignItems: 'center', justifyContent: 'center'},
  miniStatValue: {color: '#F08A3C', fontSize: 10, fontWeight: '800'},
  miniStatLabel: {color: '#C5CDD6', fontSize: 8, marginTop: 6},
  filterRow: {flexDirection: 'row', gap: 8, marginTop: 14},
  filterPill: {paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, backgroundColor: '#F2F5F8'},
  filterPillActive: {backgroundColor: '#253243'},
  filterPillText: {color: '#7D8A9B', fontSize: 10, fontWeight: '700'},
  filterPillTextActive: {color: '#FFFFFF'},
  sectionTitle: {color: '#A4AFBB', fontSize: 11, fontWeight: '800', marginBottom: 8},
  pendingCard: {backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginBottom: 10, borderWidth: 1, borderColor: '#EAF0F5'},
  pendingRow: {flexDirection: 'row', alignItems: 'center'},
  avatar: {width: 28, height: 28, borderRadius: 14, backgroundColor: '#E7F0FF', alignItems: 'center', justifyContent: 'center'},
  attendedAvatar: {backgroundColor: '#FFE8E0'},
  avatarText: {color: '#627181', fontSize: 10, fontWeight: '800'},
  pendingBody: {flex: 1, marginLeft: 10},
  pendingName: {color: '#2B3848', fontSize: 12, fontWeight: '800'},
  pendingSubtitle: {color: '#A5AFBA', fontSize: 9, marginTop: 3},
  statusPill: {borderRadius: 8, backgroundColor: '#E8F2FF', paddingHorizontal: 8, paddingVertical: 4},
  statusPillText: {color: '#4D8AF1', fontSize: 9, fontWeight: '800'},
  ghostWrap: {flexDirection: 'row', gap: 6},
  ghostBox: {width: 18, height: 18, borderRadius: 6, backgroundColor: '#EEF4F4'},
  pendingLabel: {color: '#FF6B6B', fontSize: 9, fontWeight: '700', marginTop: 8, marginLeft: 38},
  attendedCard: {backgroundColor: '#FFFFFF', borderRadius: 12, padding: 10, marginBottom: 8, flexDirection: 'row', alignItems: 'center'},
  attendedName: {flex: 1, color: '#2D394A', fontSize: 11, fontWeight: '700', marginLeft: 10},
  attendedTime: {color: '#34B45C', fontSize: 10, fontWeight: '800'},
  bottomBar: {position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', padding: 10, flexDirection: 'row', gap: 10},
  secondaryButton: {flex: 1, height: 40, borderRadius: 10, backgroundColor: '#F1F5F8', alignItems: 'center', justifyContent: 'center'},
  secondaryButtonText: {color: '#6E7B8C', fontSize: 11, fontWeight: '700'},
  primaryButton: {flex: 1, height: 40, borderRadius: 10, backgroundColor: '#67BCDB', alignItems: 'center', justifyContent: 'center'},
  primaryButtonText: {color: '#FFFFFF', fontSize: 11, fontWeight: '800'},
});
