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
};

const assets = {
  answerStrip1: require('../assets/homework/student/review/icons/answer_strip_1.png'),
  answerStrip3: require('../assets/homework/student/review/icons/answer_strip_3.png'),
  back: require('../assets/homework/student/icons/back.png'),
  clock: require('../assets/homework/student/icons/clock.png'),
  pagerLeft: require('../assets/homework/student/review/icons/pager_left.png'),
  pagerRight: require('../assets/homework/student/review/icons/pager_right.png'),
  question: require('../assets/homework/student/icons/question.png'),
};

const questionItems = [
  {
    id: '1',
    strip: assets.answerStrip1,
    text: 'I ___ playing the piano at the moment.',
  },
  {
    id: '2',
    strip: assets.answerStrip1,
    text: 'He ___ here yesterday',
  },
  {
    id: '3',
    strip: assets.answerStrip3,
    text: 'They make the audiances ___',
  },
];

export function StudentQuizAnswerReviewScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.navBar}>
          <Pressable hitSlop={8} onPress={onBack} style={styles.backButtonWrap}>
            <Image source={assets.back} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>Đáp án</Text>
          <View style={styles.headerPlaceholder} />
        </View>
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.quizSummaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>
              Mock Test THPT Quốc Gia - Tiếng Anh Đề 03
            </Text>
          </View>

          <View style={styles.summaryMetaRow}>
            <View style={styles.metaClassPill}>
              <Text style={styles.metaClassText}>Lớp 12</Text>
            </View>
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>Tổng hợp</Text>
            </View>
          </View>

          <View style={styles.summaryFooter}>
            <View style={styles.summaryStatRow}>
              <View style={styles.summaryStatItem}>
                <Image source={assets.clock} style={styles.summaryStatIcon} />
                <Text style={styles.summaryStatText}>10 phút</Text>
              </View>

              <View style={styles.summaryStatItem}>
                <Image
                  source={assets.question}
                  style={styles.summaryStatIcon}
                />
                <Text style={styles.summaryStatText}>10 câu</Text>
              </View>
            </View>
          </View>

          <View style={styles.summaryCorner} />
        </View>

        <AnswerCard
          question={questionItems[0].text}
          questionNo={questionItems[0].id}
          strip={questionItems[0].strip}
          style={styles.firstAnswerCard}
        />

        <AnswerCard
          question={questionItems[1].text}
          questionNo={questionItems[1].id}
          strip={questionItems[1].strip}
          style={styles.midAnswerCard}
        />

        <AnswerCard
          question={questionItems[2].text}
          questionNo={questionItems[2].id}
          strip={questionItems[2].strip}
          style={styles.lastAnswerCard}
        />
      </ScrollView>

      <View style={styles.paginationWrap}>
        <Image source={assets.pagerLeft} style={styles.paginationArrow} />

        <View style={styles.paginationPillActive}>
          <Text style={styles.paginationPillText}>1</Text>
        </View>

        <View style={styles.paginationPill}>
          <Text style={styles.paginationPillText}>2</Text>
        </View>

        <View style={styles.paginationPill}>
          <Text style={styles.paginationPillText}>3</Text>
        </View>

        <Image source={assets.pagerRight} style={styles.paginationArrow} />
      </View>
    </View>
  );
}

function AnswerCard({
  question,
  questionNo,
  strip,
  style,
}: {
  question: string;
  questionNo: string;
  strip: number;
  style?: object;
}) {
  return (
    <View style={[styles.answerCard, style]}>
      <View style={styles.answerHeader}>
        <Text style={styles.answerQuestionNo}>Câu {questionNo}:</Text>
        <Text style={styles.answerQuestionText}>{question}</Text>
      </View>

      <Image source={strip} style={styles.answerStrip} />
      <View style={styles.answerCorner} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },
  header: {
    height: 62,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  navBar: {
    marginTop: 6,
    marginHorizontal: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButtonWrap: {
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
  headerPlaceholder: {
    width: 40,
    height: 40,
  },
  contentContainer: {
    paddingTop: 21,
    paddingBottom: 170,
    alignItems: 'center',
  },
  quizSummaryCard: {
    width: 353,
    height: 143,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#F3F4F6',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
    paddingHorizontal: 17,
    paddingTop: 17,
  },
  summaryHeader: {
    height: 44,
  },
  summaryTitle: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  summaryMetaRow: {
    marginTop: 13,
    flexDirection: 'row',
    columnGap: 7,
  },
  metaClassPill: {
    height: 19.5,
    borderRadius: 6,
    backgroundColor: '#E0F4F8',
    paddingHorizontal: 9,
    justifyContent: 'center',
  },
  metaClassText: {
    color: '#4AA3BF',
    fontSize: 10,
    fontWeight: '700',
  },
  metaPill: {
    height: 19.5,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 9,
    justifyContent: 'center',
  },
  metaText: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '700',
  },
  summaryFooter: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: 43,
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  summaryStatRow: {
    flexDirection: 'row',
    columnGap: 14,
  },
  summaryStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryStatIcon: {
    width: 10.1,
    height: 13,
    resizeMode: 'contain',
  },
  summaryStatText: {
    marginLeft: 5,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
  summaryCorner: {
    position: 'absolute',
    right: 1,
    top: 1,
    width: 80,
    height: 80,
    borderBottomLeftRadius: 80,
    backgroundColor: '#EEF0F4',
  },
  answerCard: {
    width: 353,
    height: 160.5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    backgroundColor: '#FFFFFF',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 2,
    overflow: 'hidden',
    paddingHorizontal: 17,
    paddingTop: 17,
  },
  firstAnswerCard: {
    marginTop: 29,
  },
  midAnswerCard: {
    marginTop: 34,
  },
  lastAnswerCard: {
    marginTop: 90,
  },
  answerHeader: {
    height: 67.5,
  },
  answerQuestionNo: {
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  answerQuestionText: {
    marginTop: 2,
    width: 259,
    color: '#1F2937',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24.3,
  },
  answerStrip: {
    marginTop: 23,
    width: 310,
    height: 22,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  answerCorner: {
    position: 'absolute',
    right: 1,
    top: 1,
    width: 80,
    height: 80,
    borderBottomLeftRadius: 80,
    backgroundColor: '#F9FAFB',
  },
  paginationWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 12,
  },
  paginationArrow: {
    width: 10,
    height: 17,
    resizeMode: 'contain',
  },
  paginationPillActive: {
    width: 20,
    height: 21,
    borderRadius: 12,
    backgroundColor: '#6C686C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationPill: {
    width: 22,
    height: 21,
    borderRadius: 12,
    backgroundColor: '#A09FA0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationPillText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 18,
  },
});
