import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

type Props = {
  onBack: () => void;
  onOpenAi: () => void;
  onOpenReview: () => void;
};

const DESIGN_WIDTH = 393;
const DESIGN_HEIGHT = 852;

const assets = {
  avatar: require('../assets/homework/student/result/avatar.png'),
  back: require('../assets/homework/student/result/back.png'),
  bg: require('../assets/homework/student/result/bg.png'),
  home: require('../assets/homework/student/quiz/home.png'),
  iconCorrect: require('../assets/homework/student/result/icon_correct.png'),
  iconRank: require('../assets/homework/student/result/icon_rank.png'),
  iconScore: require('../assets/homework/student/result/icon_score.png'),
  iconTime: require('../assets/homework/student/result/icon_time.png'),
  iconWrong: require('../assets/homework/student/result/icon_wrong.png'),
  medal: require('../assets/homework/student/result/medal.png'),
  resultCardBg: require('../assets/homework/student/result/result_card_bg.png'),
};

export function StudentQuizResultScreen({
  onBack,
  onOpenAi,
  onOpenReview,
}: Props) {
  const { width, height } = useWindowDimensions();
  const scale = Math.min(width / DESIGN_WIDTH, height / DESIGN_HEIGHT);
  const viewportWidth = DESIGN_WIDTH * scale;
  const viewportHeight = DESIGN_HEIGHT * scale;
  const translateX = (viewportWidth - DESIGN_WIDTH) / 2;
  const translateY = (viewportHeight - DESIGN_HEIGHT) / 2;

  return (
    <View style={styles.screen}>
      <View
        style={[
          styles.viewport,
          { width: viewportWidth, height: viewportHeight },
        ]}
      >
        <View
          style={[
            styles.canvas,
            { transform: [{ translateX }, { translateY }, { scale }] },
          ]}
        >
          <Image source={assets.bg} style={styles.bg} />

          <View style={styles.mainContentShift}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
              <Image source={assets.back} style={styles.backIcon} />
            </Pressable>
            <Image source={assets.avatar} style={styles.avatar} />
            <Pressable hitSlop={8} onPress={onBack} style={styles.homeButton}>
              <Image source={assets.home} style={styles.homeIcon} />
            </Pressable>

            <Text style={styles.studentName}>Bùi Quốc Văn</Text>

            <View style={styles.statsCard}>
              <View style={styles.statsItem}>
                <Image source={assets.iconScore} style={styles.statsIcon} />
                <Text style={styles.statsLabel}>Điểm</Text>
                <Text style={styles.statsValue}>590</Text>
              </View>

              <View style={styles.statsDivider} />

              <View style={styles.statsItemCenter}>
                <Image source={assets.iconRank} style={styles.statsIcon} />
                <Text style={styles.statsLabel}>Xếp hạng</Text>
                <Text style={styles.statsValue}>#5</Text>
              </View>

              <View style={styles.statsDivider} />

              <View style={styles.statsItem}>
                <Image source={assets.iconTime} style={styles.statsIcon} />
                <Text style={styles.statsLabel}>Thời Gian</Text>
                <Text style={styles.statsValue}>8:50</Text>
              </View>
            </View>

            <View style={styles.resultCard}>
              <Image source={assets.resultCardBg} style={styles.resultCardBg} />
              <Text style={styles.resultTitle}>
                Bạn đã hoàn thành 10 quizz, Chúc mừng !!
              </Text>
              <Image source={assets.medal} style={styles.medal} />

              <View style={styles.correctBox}>
                <View style={styles.resultValueRow}>
                  <Text style={styles.correctValue}>7</Text>
                  <Image
                    source={assets.iconCorrect}
                    style={styles.resultIcon}
                  />
                </View>
                <Text style={styles.correctLabel}>7 câu đúng</Text>
              </View>

              <View style={styles.wrongBox}>
                <View style={styles.resultValueRow}>
                  <Text style={styles.wrongValue}>3</Text>
                  <Image source={assets.iconWrong} style={styles.resultIcon} />
                </View>
                <Text style={styles.wrongLabel}>3 câu sai</Text>
              </View>
            </View>

            <Pressable onPress={onOpenReview} style={styles.reviewButton}>
              <Text style={styles.bottomButtonText}>Xem đáp án</Text>
            </Pressable>

            <Pressable onPress={onOpenAi} style={styles.aiButton}>
              <Text style={styles.bottomButtonText}>AI Phân tích</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  viewport: {
    overflow: 'hidden',
  },
  canvas: {
    width: DESIGN_WIDTH,
    height: DESIGN_HEIGHT,
    backgroundColor: '#FFFFFF',
  },
  mainContentShift: {
    ...StyleSheet.absoluteFillObject,
    transform: [{ translateY: -20 }],
  },
  bg: {
    position: 'absolute',
    left: -71.31,
    top: 0,
    width: 478.31,
    height: 1325,
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    left: 24,
    top: 60,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  avatar: {
    position: 'absolute',
    left: 147,
    top: 56,
    width: 100.61,
    height: 90.33,
    resizeMode: 'contain',
  },
  homeButton: {
    position: 'absolute',
    left: 343,
    top: 58,
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
  studentName: {
    position: 'absolute',
    left: 111,
    top: 200,
    width: 171,
    color: '#0C092A',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 36,
    textAlign: 'center',
  },
  statsCard: {
    position: 'absolute',
    left: 24,
    top: 260,
    width: 351,
    height: 101,
    borderRadius: 20,
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  statsDivider: {
    width: 1,
    height: 69,
    backgroundColor: 'rgba(255,255,255,0.26)',
  },
  statsItem: {
    width: 91,
    alignItems: 'center',
  },
  statsItemCenter: {
    width: 91,
    alignItems: 'center',
  },
  statsIcon: {
    width: 25.76,
    height: 24,
    resizeMode: 'contain',
  },
  statsLabel: {
    marginTop: 3,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    letterSpacing: 0.04,
    textAlign: 'center',
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  },
  resultCard: {
    position: 'absolute',
    left: 24,
    top: 385,
    width: 351,
    height: 445,
  },
  resultCardBg: {
    position: 'absolute',
    width: 351,
    height: 445,
    resizeMode: 'cover',
  },
  resultTitle: {
    position: 'absolute',
    left: 42,
    top: 46,
    width: 265.13,
    color: '#0C092A',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    textAlign: 'center',
  },
  medal: {
    position: 'absolute',
    left: 93,
    top: 112,
    width: 158.86,
    height: 148.69,
    resizeMode: 'contain',
  },
  correctBox: {
    position: 'absolute',
    left: 20,
    top: 278,
    width: 150.28,
    height: 96.45,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    paddingTop: 12,
  },
  wrongBox: {
    position: 'absolute',
    left: 203,
    top: 294,
    width: 116,
  },
  resultValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  resultIcon: {
    width: 25.76,
    height: 24.11,
    resizeMode: 'contain',
  },
  correctValue: {
    color: '#0C092A',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
  },
  wrongValue: {
    color: '#FF383C',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 48,
  },
  correctLabel: {
    marginTop: -2,
    color: '#0C092A',
    fontSize: 14,
    lineHeight: 20,
  },
  wrongLabel: {
    marginTop: -2,
    color: '#000000',
    fontSize: 14,
    lineHeight: 20,
  },
  reviewButton: {
    position: 'absolute',
    left: 55,
    top: 777,
    width: 129,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#FC5A5A',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  aiButton: {
    position: 'absolute',
    left: 212,
    top: 777,
    width: 128,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#15803D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  bottomButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 22,
  },
});
