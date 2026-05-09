import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  onBack: () => void;
};

const students = [
  {id: '1', initials: 'An', name: 'Nguyễn Văn An', score: '8.6', tint: '#E8F2FF'},
  {id: '2', initials: 'Bi', name: 'Trần Thị Bích', score: '7.8', tint: '#FFE7F1'},
  {id: '3', initials: 'Cu', name: 'Lê Hoàng Cường', score: '5.8', tint: '#EAF0FF'},
  {id: '4', initials: 'Du', name: 'Phạm Minh Duy', score: '8.3', tint: '#EEF1FF'},
  {id: '5', initials: 'En', name: 'Đỗ Thị En', score: '--', tint: '#FFEAF5'},
];

export function TeacherScoreScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Sổ điểm</Text>
        <Text style={styles.searchIcon}>⌕</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subjectLabel}>MÔN TOÁN</Text>
        <Text style={styles.classTitle}>Lớp 10A1 ▾</Text>

        <View style={styles.termRow}>
          <TermPill active label="Học kỳ 1" />
          <TermPill label="Học kỳ 2" />
          <View style={styles.smallTag}>
            <Text style={styles.smallTagText}>5 HS</Text>
          </View>
        </View>

        <View style={styles.searchBox}>
          <Text style={styles.searchPlaceholder}>Tìm tên học sinh...</Text>
        </View>

        {students.map(item => (
          <View key={item.id} style={styles.studentCard}>
            <View style={[styles.initialBubble, {backgroundColor: item.tint}]}>
              <Text style={styles.initialText}>{item.initials}</Text>
            </View>
            <View style={styles.studentBody}>
              <Text style={styles.studentName}>{item.name}</Text>
              <Text style={styles.studentCode}>ID: HS1024</Text>
            </View>
            <View style={styles.scoreBox}>
              <Text
                style={[
                  styles.scoreText,
                  item.score === '5.8'
                    ? styles.scoreWarn
                    : item.score === '--'
                      ? styles.scoreMuted
                      : null,
                ]}>
                {item.score}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.footerRow}>
          <View>
            <Text style={styles.footerLabel}>ĐIỂM TRUNG BÌNH LỚP</Text>
            <Text style={styles.footerValue}>7.9</Text>
          </View>
          <Pressable style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Lưu điểm</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function TermPill({active = false, label}: {active?: boolean; label: string}) {
  return (
    <View style={[styles.termPill, active ? styles.termPillActive : null]}>
      <Text style={[styles.termPillText, active ? styles.termPillTextActive : null]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},
  topBar: {height: 48, backgroundColor: '#67BCDB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10},
  backButton: {width: 28, alignItems: 'center', justifyContent: 'center'},
  backIcon: {color: '#FFFFFF', fontSize: 26, lineHeight: 26},
  topBarTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  searchIcon: {color: '#FFFFFF', width: 28, textAlign: 'center', fontSize: 16},
  scrollContent: {padding: 12, paddingBottom: 24},
  subjectLabel: {color: '#B4BDC9', fontSize: 9, textAlign: 'center', marginTop: 4},
  classTitle: {color: '#253243', fontSize: 18, fontWeight: '800', textAlign: 'center', marginTop: 4},
  termRow: {flexDirection: 'row', gap: 8, marginTop: 14, alignItems: 'center'},
  termPill: {flex: 1, height: 26, borderRadius: 8, backgroundColor: '#F3F6FA', alignItems: 'center', justifyContent: 'center'},
  termPillActive: {backgroundColor: '#E8F4FF'},
  termPillText: {color: '#9BA7B5', fontSize: 10, fontWeight: '700'},
  termPillTextActive: {color: '#63A7EA'},
  smallTag: {paddingHorizontal: 10, height: 24, borderRadius: 8, backgroundColor: '#E8F8FE', alignItems: 'center', justifyContent: 'center'},
  smallTagText: {color: '#6BB9DA', fontSize: 9, fontWeight: '700'},
  searchBox: {height: 34, borderRadius: 8, borderWidth: 1, borderColor: '#E7EDF4', justifyContent: 'center', paddingHorizontal: 10, marginTop: 12, marginBottom: 12},
  searchPlaceholder: {color: '#B2BCC8', fontSize: 10},
  studentCard: {flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#EBF0F5', padding: 10, marginBottom: 8},
  initialBubble: {width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center'},
  initialText: {color: '#7A8DA5', fontSize: 9, fontWeight: '800'},
  studentBody: {flex: 1, marginLeft: 10},
  studentName: {color: '#263243', fontSize: 11, fontWeight: '800'},
  studentCode: {color: '#BBC4CF', fontSize: 8, marginTop: 4},
  scoreBox: {minWidth: 34, height: 22, borderRadius: 8, backgroundColor: '#F4FAF4', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 8},
  scoreText: {color: '#42B968', fontSize: 10, fontWeight: '800'},
  scoreWarn: {color: '#F08A3C'},
  scoreMuted: {color: '#AEB8C4'},
  footerRow: {flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16},
  footerLabel: {color: '#C0C8D2', fontSize: 8, fontWeight: '700'},
  footerValue: {color: '#202B38', fontSize: 22, fontWeight: '900', marginTop: 4},
  saveButton: {width: 92, height: 34, borderRadius: 10, backgroundColor: '#67BCDB', alignItems: 'center', justifyContent: 'center'},
  saveButtonText: {color: '#FFFFFF', fontSize: 11, fontWeight: '800'},
});
