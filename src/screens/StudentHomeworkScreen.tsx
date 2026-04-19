import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  onBack: () => void;
  onOpenQuiz: () => void;
};

const assets = {
  back: require('../assets/homework/student/icons/back.png'),
  chemistry: require('../assets/homework/student/icons/chemistry.png'),
  clock: require('../assets/homework/student/icons/clock.png'),
  english: require('../assets/homework/student/icons/english.png'),
  math: require('../assets/homework/student/icons/math.png'),
  physics: require('../assets/homework/student/icons/physics.png'),
  question: require('../assets/homework/student/icons/question.png'),
  search: require('../assets/homework/student/icons/search.png'),
};

const subjects = [
  'Tất cả',
  'Toán Học',
  'Tiếng Anh',
  'Vật Lý',
  'Hóa Học',
  'Sinh Học',
  'Lịch Sử',
  'Địa Lý',
];

const quizzes = [
  {
    id: 'quiz-1',
    duration: '90 phút',
    icon: assets.math,
    iconBg: '#E0F2FE',
    questions: '50 câu',
    tags: ['Lớp 12', 'Chương 1', 'Hàm số'],
    title: 'Khảo sát chất lượng Toán 12 - Lần 1 (2024-2025)',
  },
  {
    id: 'quiz-2',
    duration: '10 phút',
    icon: assets.english,
    iconBg: '#F3E8FF',
    questions: '10 câu',
    tags: ['Lớp 12', 'Tổng hợp'],
    title: 'Mock Test THPT Quốc Gia - Tiếng Anh Đề 03',
  },
  {
    id: 'quiz-3',
    duration: '45 phút',
    icon: assets.physics,
    iconBg: '#FFF7ED',
    questions: '40 câu',
    tags: ['Lớp 12', 'Lý thuyết', 'Vận dụng cao'],
    title: 'Ôn tập chuyên đề: Dao động cơ & Sóng cơ',
  },
  {
    id: 'quiz-4',
    duration: '45 phút',
    icon: assets.chemistry,
    iconBg: '#ECFDF5',
    questions: '30 câu',
    tags: ['Lớp 12', 'Hóa hữu cơ'],
    title: 'Kiểm tra 1 tiết - Este, Lipit & Cacbohidrat',
  },
];

export function StudentHomeworkScreen({ onBack, onOpenQuiz }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.navBar}>
          <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
            <Image source={assets.back} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>Quiz</Text>
          <View style={styles.navRightPlaceholder} />
        </View>

        <View style={styles.searchBox}>
          <Image source={assets.search} style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>
            Tìm đề thi, giáo viên, chuyên đề...
          </Text>
        </View>
      </View>

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Môn học</Text>
          <Text style={styles.sectionAction}>Tất cả</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsRow}
        >
          {subjects.map((item, index) => (
            <View
              key={item}
              style={index === 0 ? styles.chipActive : styles.chipDefault}
            >
              <Text
                style={
                  index === 0 ? styles.chipActiveText : styles.chipDefaultText
                }
              >
                {item}
              </Text>
            </View>
          ))}
        </ScrollView>

        <Text style={styles.listTitle}>Đề ôn tập mới nhất</Text>

        {quizzes.map(item => (
          <QuizCard item={item} key={item.id} onStart={onOpenQuiz} />
        ))}
      </ScrollView>
    </View>
  );
}

function QuizCard({
  item,
  onStart,
}: {
  item: {
    duration: string;
    icon: number;
    iconBg: string;
    questions: string;
    tags: string[];
    title: string;
  };
  onStart: () => void;
}) {
  return (
    <View style={styles.quizCard}>
      <View style={styles.cornerBubble} />

      <View style={styles.cardHeader}>
        <View
          style={[styles.subjectIconWrap, { backgroundColor: item.iconBg }]}
        >
          <Image source={item.icon} style={styles.subjectIcon} />
        </View>

        <View style={styles.cardInfo}>
          <Text numberOfLines={2} style={styles.quizTitle}>
            {item.title}
          </Text>

          <View style={styles.metaRow}>
            {item.tags.map((tag, index) => (
              <View
                key={`${item.title}-${tag}`}
                style={index === 0 ? styles.classTag : styles.metaTag}
              >
                <Text
                  style={index === 0 ? styles.classTagText : styles.metaTagText}
                >
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Image source={assets.clock} style={styles.statIcon} />
            <Text style={styles.statText}>{item.duration}</Text>
          </View>
          <View style={styles.statItem}>
            <Image source={assets.question} style={styles.statIcon} />
            <Text style={styles.statText}>{item.questions}</Text>
          </View>
        </View>

        <Pressable onPress={onStart} style={styles.startButton}>
          <Text style={styles.startButtonText}>Làm bài</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    height: 118,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  navBar: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 14,
    height: 18,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#1F2937',
    fontSize: 20,
    fontWeight: '700',
  },
  navRightPlaceholder: {
    width: 40,
    height: 40,
  },
  searchBox: {
    marginTop: 11,
    height: 46,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 12.5,
    height: 16,
    resizeMode: 'contain',
  },
  searchPlaceholder: {
    marginLeft: 16,
    color: '#757575',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 36,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionAction: {
    color: '#63BAD5',
    fontSize: 13,
    fontWeight: '700',
  },
  chipsRow: {
    marginTop: 12,
    paddingBottom: 2,
    columnGap: 10,
  },
  chipActive: {
    height: 34,
    borderRadius: 30,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
  },
  chipDefault: {
    height: 34,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 1,
  },
  chipActiveText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  chipDefaultText: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
  },
  listTitle: {
    marginTop: 10,
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
  },
  quizCard: {
    marginTop: 11,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#FFFFFF',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 3,
    overflow: 'hidden',
    paddingHorizontal: 17,
    paddingTop: 17,
    paddingBottom: 16,
  },
  cornerBubble: {
    position: 'absolute',
    width: 80,
    height: 80,
    right: 1,
    top: 1,
    borderBottomLeftRadius: 80,
    backgroundColor: '#F3F9FC',
  },
  cardHeader: {
    minHeight: 67.5,
    flexDirection: 'row',
  },
  subjectIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectIcon: {
    width: 16,
    height: 20,
    resizeMode: 'contain',
  },
  cardInfo: {
    marginLeft: 12,
    flex: 1,
  },
  quizTitle: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  metaRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  classTag: {
    height: 19.5,
    borderRadius: 6,
    backgroundColor: '#E0F4F8',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  classTagText: {
    color: '#4AA3BF',
    fontSize: 10,
    fontWeight: '700',
  },
  metaTag: {
    height: 19.5,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  metaTagText: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '700',
  },
  cardFooter: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 13,
  },
  statsRow: {
    flexDirection: 'row',
    columnGap: 12,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    width: 10.2,
    height: 13,
    resizeMode: 'contain',
  },
  statText: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    width: 81.4,
    height: 30,
    borderRadius: 12,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
