import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  onBack: () => void;
  onSubmit: () => void;
};

const assets = {
  answerABg: require('../assets/homework/student/quiz/answer_a_bg.png'),
  avatar: require('../assets/homework/student/quiz/avatar.png'),
  cardBg: require('../assets/homework/student/quiz/card_bg.png'),
  exitCancelBg: require('../assets/homework/student/quiz/exit_cancel_bg.png'),
  exitLeaveBg: require('../assets/homework/student/quiz/exit_leave_bg.png'),
  home: require('../assets/homework/student/quiz/home.png'),
  navLeft: require('../assets/homework/student/quiz/nav_left.png'),
  navRight: require('../assets/homework/student/quiz/nav_right.png'),
  questionNo: require('../assets/homework/student/quiz/question_no.png'),
  sunIcon: require('../assets/homework/student/quiz/sun_icon.png'),
};

const mockQuestions = [
  {
    id: 'q1',
    options: ['is', 'am', 'has been', 'was'],
    prompt: 'I ___ playing the piano at the moment.',
  },
  {
    id: 'q2',
    options: ['goes', 'is going', 'went', 'will going'],
    prompt: 'She usually ___ to school by bus.',
  },
  {
    id: 'q3',
    options: ['have visited', 'visited', 'visits', 'are visiting'],
    prompt: 'They ___ Ha Noi twice this year.',
  },
  {
    id: 'q4',
    options: ['to play', 'playing', 'play', 'played'],
    prompt: 'He enjoys ___ football after class.',
  },
  {
    id: 'q5',
    options: ['in', 'on', 'at', 'for'],
    prompt: 'The meeting starts ___ 8:00 AM tomorrow.',
  },
];

export function StudentQuizQuestionScreen({ onBack, onSubmit }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const activeQuestion = mockQuestions[activeIndex];
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < mockQuestions.length - 1;
  const isLastQuestion = activeIndex === mockQuestions.length - 1;

  const handlePrev = () => {
    if (canGoPrev) {
      setActiveIndex(current => current - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      setActiveIndex(current => current + 1);
    }
  };

  const handleOpenExitPopup = () => {
    setShowExitPopup(true);
  };

  const handleCancelExit = () => {
    setShowExitPopup(false);
  };

  const handleConfirmExit = () => {
    setShowExitPopup(false);
    onBack();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View>
            <View style={styles.goodMorningRow}>
              <Image source={assets.sunIcon} style={styles.sunIcon} />
              <Text style={styles.goodMorningText}>GOOD MORNING</Text>
            </View>
            <Text style={styles.progressText}>
              {activeIndex + 1}/{mockQuestions.length}
            </Text>
          </View>

          <View style={styles.topRightWrap}>
            <Image source={assets.avatar} style={styles.avatar} />
            <Pressable
              hitSlop={8}
              onPress={handleOpenExitPopup}
              style={styles.homeButton}
            >
              <Image source={assets.home} style={styles.homeIcon} />
            </Pressable>
          </View>
        </View>

        <View style={styles.questionWrap}>
          <Pressable
            disabled={!canGoPrev}
            onPress={handlePrev}
            style={[
              styles.navButton,
              !canGoPrev ? styles.navButtonDisabled : null,
            ]}
          >
            <Image source={assets.navLeft} style={styles.navIcon} />
          </Pressable>

          <View style={styles.questionCard}>
            <Image source={assets.cardBg} style={styles.questionCardBg} />
            <Image source={assets.questionNo} style={styles.questionNoIcon} />
            <Text style={styles.questionHint}>Choose the right answer:</Text>
            <Text style={styles.questionText}>{activeQuestion.prompt}</Text>
          </View>

          <Pressable
            disabled={!canGoNext}
            onPress={handleNext}
            style={[
              styles.navButton,
              !canGoNext ? styles.navButtonDisabled : null,
            ]}
          >
            <Image source={assets.navRight} style={styles.navIcon} />
          </Pressable>
        </View>

        <View style={styles.answersGrid}>
          <View style={styles.answerRow}>
            <Pressable style={[styles.answerCard, styles.answerACard]}>
              <Image source={assets.answerABg} style={styles.answerABg} />
              <Text style={styles.answerText}>
                A. {activeQuestion.options[0]}
              </Text>
            </Pressable>

            <Pressable style={[styles.answerCard, styles.answerBCard]}>
              <Text style={styles.answerText}>
                B. {activeQuestion.options[1]}
              </Text>
            </Pressable>
          </View>

          <View style={styles.answerRow}>
            <Pressable style={[styles.answerCard, styles.answerCCard]}>
              <Text style={styles.answerText}>
                C. {activeQuestion.options[2]}
              </Text>
            </Pressable>

            <Pressable style={[styles.answerCard, styles.answerDCard]}>
              <Text style={styles.answerText}>
                D. {activeQuestion.options[3]}
              </Text>
            </Pressable>
          </View>
        </View>

        {isLastQuestion ? (
          <Pressable onPress={onSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Nộp bài</Text>
          </Pressable>
        ) : null}
      </View>

      {showExitPopup ? (
        <View style={styles.exitOverlay}>
          <View style={styles.exitCard}>
            <Text style={styles.exitMessage}>
              {
                'Bạn muốn thoát Quizz ?\nLưu Ý:\nTiến trình sẽ không được lưu lại\n\nNếu muốn tiếp tục làm bài vui lòng nhấn “Hủy”\nhoặc nhấn “Thoát” để thoát Quizz'
              }
            </Text>

            <View style={styles.exitActionsRow}>
              <Pressable
                onPress={handleCancelExit}
                style={styles.exitActionButton}
              >
                <Image
                  source={assets.exitCancelBg}
                  style={styles.exitActionBg}
                />
                <Text style={styles.exitActionText}>Hủy</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmExit}
                style={styles.exitActionButton}
              >
                <Image
                  source={assets.exitLeaveBg}
                  style={styles.exitActionBg}
                />
                <Text style={styles.exitActionText}>Thoát</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0284C7',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  topRow: {
    height: 66,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goodMorningRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
  },
  sunIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  goodMorningText: {
    marginLeft: 8,
    color: '#FFD6DD',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.04,
  },
  progressText: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 36,
  },
  topRightWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  avatar: {
    width: 56,
    height: 56,
    resizeMode: 'cover',
  },
  homeButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  questionWrap: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 20,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonDisabled: {
    opacity: 0.35,
  },
  navIcon: {
    width: 15,
    height: 27,
    resizeMode: 'contain',
  },
  questionCard: {
    width: 327,
    height: 232,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionCardBg: {
    position: 'absolute',
    width: 327,
    height: 232,
    resizeMode: 'cover',
  },
  questionNoIcon: {
    position: 'absolute',
    left: 15,
    top: 19,
    width: 48.3,
    height: 48,
    resizeMode: 'contain',
  },
  questionHint: {
    position: 'absolute',
    left: 67,
    top: 33,
    width: 195,
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19.6,
  },
  questionText: {
    position: 'absolute',
    left: 61,
    top: 92,
    width: 200,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24.3,
    textAlign: 'center',
  },
  answersGrid: {
    marginTop: 22,
    rowGap: 14,
  },
  answerRow: {
    flexDirection: 'row',
    columnGap: 14,
  },
  answerCard: {
    flex: 1,
    height: 88,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  answerACard: {
    backgroundColor: '#FCD9D8',
  },
  answerABg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  answerBCard: {
    backgroundColor: '#FBAEAF',
  },
  answerCCard: {
    backgroundColor: '#E8E5FA',
  },
  answerDCard: {
    backgroundColor: '#C9F6C9',
  },
  answerText: {
    color: '#0C092A',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  submitButton: {
    marginTop: 24,
    alignSelf: 'center',
    width: 149,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#3DD598',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 3,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
  exitOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(9,16,29,0.34)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  exitCard: {
    width: 269,
    minHeight: 356,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 42,
    paddingBottom: 34,
    alignItems: 'center',
  },
  exitMessage: {
    width: 229,
    color: '#374151',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  exitActionsRow: {
    marginTop: 22,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exitActionButton: {
    width: 81.73,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
  },
  exitActionBg: {
    position: 'absolute',
    width: 81.73,
    height: 29,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  exitActionText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
    textAlign: 'center',
  },
});
