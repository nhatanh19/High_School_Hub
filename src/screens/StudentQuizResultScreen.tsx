import React, { useMemo } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
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

export function StudentQuizResultScreen({ onBack, onOpenAi, onOpenReview }: Props) {
  const { width, height } = useWindowDimensions();

  const layout = useMemo(() => {
    const scale = width / DESIGN_WIDTH;
    return {
      canvasHeight: DESIGN_HEIGHT * scale,
      canvasWidth: width,
      scale,
      viewportHeight: Math.max(height, DESIGN_HEIGHT * scale),
    };
  }, [height, width]);

  const S = (value: number) => value * layout.scale;

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[styles.scrollContent, { minHeight: layout.viewportHeight }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ width: layout.canvasWidth, height: layout.canvasHeight }}>
          <Image source={assets.bg} style={[styles.bg, { left: S(-71.3066), width: S(478.3066), height: S(1325) }]} />

          <Pressable
            hitSlop={8}
            onPress={onBack}
            style={[styles.iconButton, { left: S(24), top: S(60), width: S(24), height: S(24) }]}
          >
            <Image source={assets.back} style={[styles.backIcon, { width: S(24), height: S(24) }]} />
          </Pressable>

          <Image
            source={assets.avatar}
            style={{
              position: 'absolute',
              left: S(147),
              top: S(56),
              width: S(100.608),
              height: S(90.3283),
              resizeMode: 'contain',
            }}
          />

          <Pressable
            hitSlop={8}
            onPress={onBack}
            style={[styles.iconButton, { left: S(343), top: S(58), width: S(28), height: S(28) }]}
          >
            <Image source={assets.home} style={{ width: S(28), height: S(28), resizeMode: 'contain' }} />
          </Pressable>

          <Text
            style={{
              position: 'absolute',
              left: S(111),
              top: S(200),
              width: S(152),
              color: '#0C092A',
              fontSize: S(24),
              fontWeight: '500',
              lineHeight: S(36),
              textAlign: 'center',
            }}
          >
            Bùi Quốc Văn
          </Text>

          <View
            style={{
              position: 'absolute',
              left: S(24),
              top: S(260),
              width: layout.canvasWidth - S(48),
              height: S(101),
              borderRadius: S(20),
              backgroundColor: '#0284C7',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <StatBlock icon={assets.iconScore} label="Điểm" scale={layout.scale} value="590" />
            <View style={{ width: S(1.073), height: S(69), backgroundColor: 'rgba(255,255,255,0.26)' }} />
            <StatBlock icon={assets.iconRank} label="Xếp hạng" scale={layout.scale} value="#5" />
            <View style={{ width: S(1.073), height: S(69), backgroundColor: 'rgba(255,255,255,0.26)' }} />
            <StatBlock icon={assets.iconTime} label="Thời Gian" scale={layout.scale} value="8:50" />
          </View>

          <View
            style={{
              position: 'absolute',
              left: S(24),
              top: S(385),
              width: layout.canvasWidth - S(48),
              height: S(445),
            }}
          >
            <Image source={assets.resultCardBg} style={styles.cardFill} />

            <Text
              style={{
                position: 'absolute',
                left: S(42),
                top: S(46),
                width: S(265.128),
                color: '#0C092A',
                fontSize: S(20),
                fontWeight: '500',
                lineHeight: S(28),
                textAlign: 'center',
              }}
            >
              Bạn đã hoàn thành 10 quizz, Chúc mừng !!
            </Text>

            <Image
              source={assets.medal}
              style={{
                position: 'absolute',
                left: S(93),
                top: S(112),
                width: S(158.8624),
                height: S(148.6884),
                resizeMode: 'contain',
              }}
            />

            <View
              style={{
                position: 'absolute',
                left: S(20),
                top: S(278),
                width: S(150.2752),
                height: S(96.4465),
                borderRadius: S(20),
                backgroundColor: '#FFFFFF',
                paddingHorizontal: S(17),
                paddingTop: S(12),
              }}
            >
              <View style={styles.valueRow}>
                <Text style={{ color: '#0C092A', fontSize: S(32), fontWeight: '700', lineHeight: S(48) }}>7</Text>
                <Image source={assets.iconCorrect} style={{ width: S(25.7615), height: S(24.1116), resizeMode: 'contain' }} />
              </View>
              <Text style={{ marginTop: S(-2), color: '#0C092A', fontSize: S(14), lineHeight: S(20) }}>7 câu đúng</Text>
            </View>

            <View
              style={{
                position: 'absolute',
                left: S(203),
                top: S(294),
                width: S(116),
              }}
            >
              <View style={styles.valueRow}>
                <Text style={{ color: '#FF383C', fontSize: S(32), fontWeight: '700', lineHeight: S(48) }}>3</Text>
                <Image source={assets.iconWrong} style={{ width: S(25.7615), height: S(24.1116), resizeMode: 'contain' }} />
              </View>
              <Text style={{ marginTop: S(-2), color: '#000000', fontSize: S(14), lineHeight: S(20) }}>3 câu sai</Text>
            </View>
          </View>

          <Pressable
            onPress={onOpenReview}
            style={{
              position: 'absolute',
              left: S(55),
              top: S(777),
              width: S(129),
              height: S(35),
              borderRadius: S(12),
              backgroundColor: '#FC5A5A',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#63BAD5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: S(18), fontWeight: '700', lineHeight: S(22) }}>Xem đáp án</Text>
          </Pressable>

          <Pressable
            onPress={onOpenAi}
            style={{
              position: 'absolute',
              left: S(212),
              top: S(777),
              width: S(128),
              height: S(35),
              borderRadius: S(12),
              backgroundColor: '#15803D',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#63BAD5',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 2,
            }}
          >
            <Text style={{ color: '#FFFFFF', fontSize: S(18), fontWeight: '700', lineHeight: S(22) }}>AI Phân tích</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function StatBlock({
  icon,
  label,
  scale,
  value,
}: {
  icon: number;
  label: string;
  scale: number;
  value: string;
}) {
  const S = (v: number) => v * scale;
  return (
    <View style={{ width: S(91.2385), alignItems: 'center' }}>
      <Image source={icon} style={{ width: S(25.7615), height: S(24), resizeMode: 'contain' }} />
      <Text
        style={{
          marginTop: S(3),
          color: 'rgba(255,255,255,0.5)',
          fontSize: S(12),
          fontWeight: '500',
          lineHeight: S(18),
          letterSpacing: 0.04,
          textAlign: 'center',
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: S(16),
          fontWeight: '700',
          lineHeight: S(24),
          textAlign: 'center',
        }}
      >
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  backIcon: { resizeMode: 'contain' },
  cardFill: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  iconButton: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
});
