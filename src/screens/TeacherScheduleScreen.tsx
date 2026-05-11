import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

type Props = {
  onBack: () => void;
};

const lessons = [
  {id: '1', title: 'Vật lý', room: 'Chương 2: Lực lượng', who1: 'Aver Chloe Gió', who2: 'George Weff', time: '9:30\n10:20', tint: '#7B7EF6'},
  {id: '2', title: 'Địa lý', room: 'Chương 12: Hệ số', who1: 'Jelmy Clark', who2: 'Zoom', time: '11:00\n11:50', tint: '#EEFCFC'},
  {id: '3', title: 'Phân công', room: 'Mô hình khu vực thế giới', who1: 'Avery Tenore', who2: 'Google Docs', time: '12:20\n13:00', tint: '#D9F7F7'},
];

export function TeacherScheduleScreen({onBack}: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.topBarTitle}>Lịch dạy</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarRow}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((item, index) => (
            <View key={item} style={styles.calendarItem}>
              <Text style={[styles.weekText, index === 4 ? styles.weekTextActive : null]}>{item}</Text>
              <Text style={[styles.dayText, index === 4 ? styles.weekTextActive : null]}>{14 + index}</Text>
            </View>
          ))}
        </View>

        {lessons.map(item => (
          <View key={item.id} style={styles.lessonRow}>
            <Text style={styles.timeText}>{item.time}</Text>
            <View style={styles.timeline}>
              <View style={styles.dot} />
              <View style={styles.line} />
            </View>
            <View style={[styles.lessonCard, {backgroundColor: item.tint}]}>
              <Text style={[styles.lessonTitle, item.id === '1' ? styles.lightText : null]}>{item.title}</Text>
              <Text style={[styles.lessonSub, item.id === '1' ? styles.lightSubText : null]}>{item.room}</Text>
              <Text style={[styles.lessonMeta, item.id === '1' ? styles.lightSubText : null]}>• {item.who1}</Text>
              <Text style={[styles.lessonMeta, item.id === '1' ? styles.lightSubText : null]}>• {item.who2}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Tải xuống</Text>
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Xem</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#FFFFFF'},
  topBar: {height: 48, backgroundColor: '#67BCDB', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10},
  backButton: {width: 28, alignItems: 'center', justifyContent: 'center'},
  backIcon: {color: '#FFFFFF', fontSize: 26, lineHeight: 26},
  topBarTitle: {color: '#FFFFFF', fontSize: 18, fontWeight: '800'},
  scrollContent: {paddingHorizontal: 12, paddingTop: 10, paddingBottom: 84},
  calendarRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16},
  calendarItem: {alignItems: 'center', width: 34},
  weekText: {color: '#7F8A99', fontSize: 9},
  weekTextActive: {color: '#31B657', fontWeight: '800'},
  dayText: {color: '#253243', fontSize: 11, fontWeight: '700', marginTop: 4},
  lessonRow: {flexDirection: 'row', marginBottom: 12},
  timeText: {width: 34, color: '#404C5D', fontSize: 10, lineHeight: 15, marginTop: 8},
  timeline: {width: 18, alignItems: 'center'},
  dot: {width: 7, height: 7, borderRadius: 4, borderWidth: 1, borderColor: '#8189FF', backgroundColor: '#FFFFFF', marginTop: 10},
  line: {width: 1, flex: 1, backgroundColor: '#D9E0EA', marginTop: 2},
  lessonCard: {flex: 1, borderRadius: 14, padding: 14},
  lessonTitle: {color: '#1E2A38', fontSize: 16, fontWeight: '800'},
  lightText: {color: '#FFFFFF'},
  lessonSub: {color: '#708092', fontSize: 10, marginTop: 6},
  lightSubText: {color: 'rgba(255,255,255,0.86)'},
  lessonMeta: {color: '#506070', fontSize: 10, marginTop: 8},
  bottomBar: {position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF', flexDirection: 'row', gap: 14, padding: 12},
  actionButton: {flex: 1, height: 34, borderRadius: 8, backgroundColor: '#1FA7D0', alignItems: 'center', justifyContent: 'center'},
  actionButtonText: {color: '#FFFFFF', fontSize: 11, fontWeight: '700'},
});
