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
  aiBadge: require('../assets/homework/student/ai-analysis/icons/ai_badge.png'),
  analysisStar: require('../assets/homework/student/ai-analysis/icons/analysis_star.png'),
  analysisTitle: require('../assets/homework/student/ai-analysis/icons/analysis_title.png'),
  avatar: require('../assets/homework/student/ai-analysis/images/avatar.png'),
  back: require('../assets/homework/student/ai-analysis/icons/back.png'),
  bullet: require('../assets/homework/student/ai-analysis/icons/bullet.png'),
  calendar: require('../assets/homework/student/ai-analysis/icons/calendar.png'),
  chevronRight: require('../assets/homework/student/ai-analysis/icons/chevron_right.png'),
  clockSmall: require('../assets/homework/student/ai-analysis/icons/clock_small.png'),
  detailArrow: require('../assets/homework/student/ai-analysis/icons/detail_arrow.png'),
  gapHigh: require('../assets/homework/student/ai-analysis/icons/gap_high.png'),
  gapLow: require('../assets/homework/student/ai-analysis/icons/gap_low.png'),
  gapMedium: require('../assets/homework/student/ai-analysis/icons/gap_medium.png'),
  gapWarning: require('../assets/homework/student/ai-analysis/icons/gap_warning.png'),
  knowledgeGap: require('../assets/homework/student/ai-analysis/icons/knowledge_gap.png'),
  progressUp: require('../assets/homework/student/ai-analysis/icons/progress_up.png'),
  recommend: require('../assets/homework/student/ai-analysis/icons/recommend.png'),
  recommendDoc: require('../assets/homework/student/ai-analysis/icons/recommend_doc.png'),
  recommendFlashcard: require('../assets/homework/student/ai-analysis/icons/recommend_flashcard.png'),
  recommendVideo: require('../assets/homework/student/ai-analysis/icons/recommend_video.png'),
  roadmap: require('../assets/homework/student/ai-analysis/icons/roadmap.png'),
  start: require('../assets/homework/student/ai-analysis/icons/start.png'),
  statRank: require('../assets/homework/student/ai-analysis/icons/stat_rank.png'),
  statScore: require('../assets/homework/student/ai-analysis/icons/stat_score.png'),
  statTime: require('../assets/homework/student/ai-analysis/icons/stat_time.png'),
  suggest: require('../assets/homework/student/ai-analysis/icons/suggest.png'),
  weakness: require('../assets/homework/student/ai-analysis/icons/weakness.png'),
};

const weakRows = [
  { label: 'Thì hiện tại hoàn thành', percent: '45%', tone: 'red' },
  { label: 'Câu bị động', percent: '52%', tone: 'orange' },
  { label: 'Mệnh đề quan hệ', percent: '68%', tone: 'orange' },
  { label: 'Từ vựng chủ đề Môi trường', percent: '72%', tone: 'green' },
] as const;

const gaps = [
  {
    accuracy: '45%',
    icon: assets.gapHigh,
    level: 'Ưu tiên cao',
    levelTone: 'high',
    missed: '12 câu',
    title: 'Thì hiện tại hoàn thành',
  },
  {
    accuracy: '52%',
    icon: assets.gapHigh,
    level: 'Ưu tiên cao',
    levelTone: 'high',
    missed: '8 câu',
    title: 'Câu bị động',
  },
  {
    accuracy: '68%',
    icon: assets.gapMedium,
    level: 'Trung bình',
    levelTone: 'medium',
    missed: '15 câu',
    title: 'Mệnh đề quan hệ',
  },
  {
    accuracy: '72%',
    icon: assets.gapLow,
    level: 'Thấp',
    levelTone: 'low',
    missed: '10 câu',
    title: 'Từ vựng chủ đề Môi trường',
  },
] as const;

export function StudentQuizAiAnalysisScreen({ onBack }: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.hero}>
          <View style={styles.heroBlur1} />
          <View style={styles.heroBlur2} />

          <View style={styles.heroTopRow}>
            <Pressable
              hitSlop={8}
              onPress={onBack}
              style={styles.heroBackButton}
            >
              <Image source={assets.back} style={styles.heroBackIcon} />
            </Pressable>

            <View style={styles.aiBadge}>
              <Image source={assets.aiBadge} style={styles.aiBadgeIcon} />
              <Text style={styles.aiBadgeText}>AI Analysis</Text>
            </View>
          </View>

          <View style={styles.heroAvatarRing}>
            <Image source={assets.avatar} style={styles.heroAvatar} />
          </View>

          <Text style={styles.heroName}>Bùi Quốc Văn</Text>

          <View style={styles.heroStatsRow}>
            <HeroStat icon={assets.statScore} label="ĐIỂM" value="590" />
            <HeroStat icon={assets.statRank} label="XẾP HẠNG" value="#5" />
            <HeroStat icon={assets.statTime} label="THỜI GIAN" value="8:50" />
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.card}>
            <View style={styles.analysisHeaderRow}>
              <View style={styles.analysisIconWrap}>
                <Image
                  source={assets.analysisTitle}
                  style={styles.analysisIcon}
                />
              </View>

              <View style={styles.analysisHeaderBody}>
                <View style={styles.analysisTitleRow}>
                  <Text style={styles.cardTitle}>AI Phân Tích</Text>
                  <Image
                    source={assets.analysisStar}
                    style={styles.cardTitleSpark}
                  />
                </View>
                <Text style={styles.analysisIntro}>
                  Dựa trên 10 bài quiz gần đây, AI đã phát hiện 3 lỗ hổng cần
                  cải thiện.
                </Text>
              </View>
            </View>

            <View style={styles.quickStatsRow}>
              <QuickStatCard
                bgStyle={styles.quickGreen}
                icon={assets.progressUp}
                label="Tiến bộ"
                value="+15%"
                valueStyle={styles.quickGreenValue}
              />
              <QuickStatCard
                bgStyle={styles.quickRed}
                icon={assets.gapWarning}
                label="Lỗ hổng"
                value="3"
                valueStyle={styles.quickRedValue}
              />
              <QuickStatCard
                bgStyle={styles.quickBlue}
                icon={assets.suggest}
                label="Đề xuất"
                value="5"
                valueStyle={styles.quickBlueValue}
              />
            </View>

            <Pressable style={styles.detailButton}>
              <Image
                source={assets.detailArrow}
                style={styles.detailButtonIcon}
              />
              <Text style={styles.detailButtonText}>Phân tích chi tiết</Text>
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeadingRow}>
              <Image source={assets.weakness} style={styles.cardHeadingIcon} />
              <Text style={styles.cardHeadingText}>Phân tích điểm yếu</Text>
            </View>

            <View style={styles.progressList}>
              {weakRows.map((item, index) => (
                <WeakProgressRow
                  key={item.label}
                  label={item.label}
                  percent={item.percent}
                  tone={item.tone}
                  widthStyle={
                    index === 0
                      ? styles.progress45
                      : index === 1
                        ? styles.progress52
                        : index === 2
                          ? styles.progress68
                          : styles.progress72
                  }
                />
              ))}
            </View>

            <View style={styles.legendRow}>
              <Legend dotStyle={styles.legendDotRed} label="<50%" />
              <Legend dotStyle={styles.legendDotOrange} label="50-70%" />
              <Legend dotStyle={styles.legendDotGreen} label=">70%" />
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeadingRow}>
              <Image
                source={assets.knowledgeGap}
                style={styles.cardHeadingIcon}
              />
              <Text style={styles.cardHeadingText}>Lỗ hổng kiến thức</Text>
            </View>

            <View style={styles.gapList}>
              {gaps.map(item => (
                <GapItem
                  accuracy={item.accuracy}
                  icon={item.icon}
                  key={item.title}
                  level={item.level}
                  levelTone={item.levelTone}
                  missed={item.missed}
                  title={item.title}
                />
              ))}
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.roadmapHeaderRow}>
              <View style={styles.cardHeadingRow}>
                <Image source={assets.roadmap} style={styles.cardHeadingIcon} />
                <Text style={styles.cardHeadingText}>Lộ trình ôn tập</Text>
              </View>
              <Text style={styles.linkText}>Xem tất cả</Text>
            </View>

            <RoadmapItem
              index="1"
              subtitle="Tuần 1"
              time="3 giờ"
              title="Thì hiện tại hoàn thành"
            />
            <RoadmapItem
              index="2"
              subtitle="Tuần 2"
              time="2.5 giờ"
              title="Câu bị động"
            />
            <RoadmapItem
              index="3"
              subtitle="Tuần 3"
              time="2 giờ"
              title="Mệnh đề quan hệ"
            />
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeadingRow}>
              <Image source={assets.recommend} style={styles.cardHeadingIcon} />
              <Text style={styles.cardHeadingText}>Đề xuất cho bạn</Text>
            </View>

            <RecommendItem
              icon={assets.recommendDoc}
              meta="Luyện tập"
              time="15 phút"
              title="Bài tập Thì hiện tại hoàn thành"
            />
            <RecommendItem
              icon={assets.recommendVideo}
              meta="Video"
              time="8 phút"
              title="Video: Cách dùng Have/Has Been"
            />
            <RecommendItem
              icon={assets.recommendFlashcard}
              meta="Flashcard"
              time="10 phút"
              title="Flashcard Câu bị động"
            />

            <Text style={styles.linkTextCenter}>Xem thêm đề xuất</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function HeroStat({
  icon,
  label,
  value,
}: {
  icon: number;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.heroStatItem}>
      <View style={styles.heroStatIconCircle}>
        <Image source={icon} style={styles.heroStatIcon} />
      </View>
      <Text style={styles.heroStatValue}>{value}</Text>
      <Text style={styles.heroStatLabel}>{label}</Text>
    </View>
  );
}

function QuickStatCard({
  bgStyle,
  icon,
  label,
  value,
  valueStyle,
}: {
  bgStyle: object;
  icon: number;
  label: string;
  value: string;
  valueStyle: object;
}) {
  return (
    <View style={[styles.quickCardBase, bgStyle]}>
      <Image source={icon} style={styles.quickIcon} />
      <View>
        <Text style={styles.quickLabel}>{label}</Text>
        <Text style={[styles.quickValue, valueStyle]}>{value}</Text>
      </View>
    </View>
  );
}

function WeakProgressRow({
  label,
  percent,
  tone,
  widthStyle,
}: {
  label: string;
  percent: string;
  tone: 'red' | 'orange' | 'green';
  widthStyle: object;
}) {
  return (
    <View style={styles.progressRow}>
      <View style={styles.progressLabelRow}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text
          style={[
            styles.progressPercent,
            tone === 'red'
              ? styles.progressPercentRed
              : tone === 'orange'
                ? styles.progressPercentOrange
                : styles.progressPercentGreen,
          ]}
        >
          {percent}
        </Text>
      </View>

      <View
        style={[
          styles.progressTrack,
          tone === 'red'
            ? styles.progressTrackRed
            : tone === 'orange'
              ? styles.progressTrackOrange
              : styles.progressTrackGreen,
        ]}
      >
        <View
          style={[
            styles.progressFill,
            widthStyle,
            tone === 'red'
              ? styles.progressFillRed
              : tone === 'orange'
                ? styles.progressFillOrange
                : styles.progressFillGreen,
          ]}
        />
      </View>
    </View>
  );
}

function Legend({ dotStyle, label }: { dotStyle: object; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDotBase, dotStyle]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

function GapItem({
  accuracy,
  icon,
  level,
  levelTone,
  missed,
  title,
}: {
  accuracy: string;
  icon: number;
  level: string;
  levelTone: 'high' | 'medium' | 'low';
  missed: string;
  title: string;
}) {
  return (
    <View style={styles.gapItem}>
      <View
        style={[
          styles.gapIconWrap,
          levelTone === 'high'
            ? styles.gapIconHigh
            : levelTone === 'medium'
              ? styles.gapIconMedium
              : styles.gapIconLow,
        ]}
      >
        <Image source={icon} style={styles.gapIcon} />
      </View>

      <View style={styles.gapMiddle}>
        <Text style={styles.gapTitle}>{title}</Text>
        <View style={styles.gapMetaRow}>
          <View
            style={[
              styles.levelPill,
              levelTone === 'high'
                ? styles.levelPillHigh
                : levelTone === 'medium'
                  ? styles.levelPillMedium
                  : styles.levelPillLow,
            ]}
          >
            <Text
              style={[
                styles.levelPillText,
                levelTone === 'high'
                  ? styles.levelTextHigh
                  : levelTone === 'medium'
                    ? styles.levelTextMedium
                    : styles.levelTextLow,
              ]}
            >
              {level}
            </Text>
          </View>
          <Text style={styles.gapMissedText}>{missed}</Text>
        </View>
      </View>

      <View style={styles.gapRight}>
        <Text
          style={[
            styles.gapAccuracy,
            levelTone === 'high'
              ? styles.gapAccuracyHigh
              : levelTone === 'medium'
                ? styles.gapAccuracyMedium
                : styles.gapAccuracyLow,
          ]}
        >
          {accuracy}
        </Text>
        <Image source={assets.chevronRight} style={styles.gapChevron} />
      </View>
    </View>
  );
}

function RoadmapItem({
  index,
  subtitle,
  time,
  title,
}: {
  index: string;
  subtitle: string;
  time: string;
  title: string;
}) {
  return (
    <View style={styles.roadmapItemRow}>
      <View style={styles.roadmapIndexCircle}>
        <Text style={styles.roadmapIndexText}>{index}</Text>
      </View>

      <View style={styles.roadmapCard}>
        <View style={styles.roadmapTopRow}>
          <View style={styles.roadmapTopLeft}>
            <Text style={styles.roadmapTitle}>{title}</Text>
            <View style={styles.roadmapMetaRow}>
              <View style={styles.roadmapMetaItem}>
                <Image source={assets.calendar} style={styles.metaIcon} />
                <Text style={styles.metaText}>{subtitle}</Text>
              </View>
              <View style={styles.roadmapMetaItem}>
                <Image source={assets.clockSmall} style={styles.metaIcon} />
                <Text style={styles.metaText}>{time}</Text>
              </View>
            </View>
          </View>

          <Pressable style={styles.startButton}>
            <Image source={assets.start} style={styles.startIcon} />
            <Text style={styles.startButtonText}>Bắt đầu</Text>
          </Pressable>
        </View>

        <View style={styles.roadmapBulletRow}>
          <Image source={assets.bullet} style={styles.bulletIcon} />
          <Text style={styles.bulletText}>Ôn lý thuyết cơ bản</Text>
        </View>
        <View style={styles.roadmapBulletRow}>
          <Image source={assets.bullet} style={styles.bulletIcon} />
          <Text style={styles.bulletText}>Làm 20 bài tập</Text>
        </View>
        <View style={styles.roadmapBulletRow}>
          <Image source={assets.bullet} style={styles.bulletIcon} />
          <Text style={styles.bulletText}>Quiz kiểm tra</Text>
        </View>
      </View>
    </View>
  );
}

function RecommendItem({
  icon,
  meta,
  time,
  title,
}: {
  icon: number;
  meta: string;
  time: string;
  title: string;
}) {
  return (
    <View style={styles.recommendItem}>
      <View style={styles.recommendIconWrap}>
        <Image source={icon} style={styles.recommendIcon} />
      </View>

      <View style={styles.recommendMiddle}>
        <Text style={styles.recommendTitle}>{title}</Text>
        <View style={styles.recommendMetaRow}>
          <View style={styles.recommendTypePill}>
            <Text style={styles.recommendTypeText}>{meta}</Text>
          </View>
          <Text style={styles.recommendTimeText}>{time}</Text>
        </View>
      </View>

      <Image source={assets.chevronRight} style={styles.recommendChevron} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EFF6FB',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  hero: {
    height: 254,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: '#0284C7',
    overflow: 'hidden',
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  heroBlur1: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 48,
    height: 48,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroBlur2: {
    position: 'absolute',
    top: 24,
    right: 22,
    width: 80,
    height: 80,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  heroTopRow: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBackButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBackIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  aiBadge: {
    height: 25,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    columnGap: 4,
  },
  aiBadgeIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  aiBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    lineHeight: 16.5,
  },
  heroAvatarRing: {
    alignSelf: 'center',
    marginTop: 12,
    width: 64,
    height: 64,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heroAvatar: {
    width: 59,
    height: 59,
    borderRadius: 29.5,
    resizeMode: 'cover',
  },
  heroName: {
    marginTop: 6,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  heroStatsRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 20,
  },
  heroStatItem: {
    width: 74,
    alignItems: 'center',
  },
  heroStatIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroStatIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  heroStatValue: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  heroStatLabel: {
    marginTop: -1,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    letterSpacing: 0.25,
    lineHeight: 15,
    textAlign: 'center',
  },
  main: {
    marginTop: 12,
    paddingHorizontal: 16,
    rowGap: 12,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  analysisHeaderRow: {
    flexDirection: 'row',
    columnGap: 12,
  },
  analysisIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  analysisIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  analysisHeaderBody: {
    flex: 1,
  },
  analysisTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  cardTitle: {
    color: '#0E171E',
    fontSize: 14,
    lineHeight: 20,
  },
  cardTitleSpark: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  analysisIntro: {
    marginTop: 4,
    color: '#5B6670',
    fontSize: 12,
    lineHeight: 18,
  },
  quickStatsRow: {
    marginTop: 12,
    flexDirection: 'row',
    columnGap: 8,
  },
  quickCardBase: {
    flex: 1,
    borderRadius: 20,
    minHeight: 52,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  quickGreen: {
    backgroundColor: '#ECFDF5',
  },
  quickRed: {
    backgroundColor: '#FEF2F2',
  },
  quickBlue: {
    backgroundColor: '#EFF6FF',
  },
  quickIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  quickLabel: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  quickValue: {
    marginTop: -1,
    fontSize: 12,
    lineHeight: 16,
  },
  quickGreenValue: {
    color: '#009966',
  },
  quickRedValue: {
    color: '#FB2C36',
  },
  quickBlueValue: {
    color: '#2196F3',
  },
  detailButton: {
    marginTop: 12,
    height: 44,
    borderRadius: 20,
    backgroundColor: '#1D7FD4',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 8,
  },
  detailButtonIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  detailButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
  },
  cardHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  cardHeadingIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  cardHeadingText: {
    color: '#0E171E',
    fontSize: 14,
    lineHeight: 20,
  },
  progressList: {
    marginTop: 12,
    rowGap: 8,
  },
  progressRow: {
    rowGap: 6,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    color: '#0E171E',
    fontSize: 12,
    lineHeight: 16,
  },
  progressPercent: {
    fontSize: 12,
    lineHeight: 16,
  },
  progressPercentRed: {
    color: '#FB2C36',
  },
  progressPercentOrange: {
    color: '#E17100',
  },
  progressPercentGreen: {
    color: '#009966',
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressTrackRed: {
    backgroundColor: '#FFE2E2',
  },
  progressTrackOrange: {
    backgroundColor: '#FEF3C6',
  },
  progressTrackGreen: {
    backgroundColor: '#D0FAE5',
  },
  progressFill: {
    height: 8,
    borderRadius: 999,
  },
  progressFillRed: {
    backgroundColor: '#FB2C36',
  },
  progressFillOrange: {
    backgroundColor: '#FE9A00',
  },
  progressFillGreen: {
    backgroundColor: '#00BC7D',
  },
  progress45: {
    width: '45%',
  },
  progress52: {
    width: '52%',
  },
  progress68: {
    width: '68%',
  },
  progress72: {
    width: '72%',
  },
  legendRow: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#D8DFE4',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  legendDotBase: {
    width: 8,
    height: 8,
    borderRadius: 999,
  },
  legendDotRed: {
    backgroundColor: '#FB2C36',
  },
  legendDotOrange: {
    backgroundColor: '#FE9A00',
  },
  legendDotGreen: {
    backgroundColor: '#00BC7D',
  },
  legendText: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  gapList: {
    marginTop: 12,
    rowGap: 8,
  },
  gapItem: {
    minHeight: 56,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  gapIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gapIconHigh: {
    backgroundColor: '#FEF2F2',
  },
  gapIconMedium: {
    backgroundColor: '#FFFBEB',
  },
  gapIconLow: {
    backgroundColor: '#ECFDF5',
  },
  gapIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  gapMiddle: {
    flex: 1,
  },
  gapTitle: {
    color: '#0E171E',
    fontSize: 12,
    lineHeight: 16,
  },
  gapMetaRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  levelPill: {
    height: 17,
    borderRadius: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  levelPillHigh: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FFC9C9',
  },
  levelPillMedium: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FEE685',
  },
  levelPillLow: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A4F4CF',
  },
  levelPillText: {
    fontSize: 10,
    lineHeight: 15,
  },
  levelTextHigh: {
    color: '#E7000B',
  },
  levelTextMedium: {
    color: '#BB4D00',
  },
  levelTextLow: {
    color: '#009966',
  },
  gapMissedText: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  gapRight: {
    alignItems: 'flex-end',
    rowGap: 2,
  },
  gapAccuracy: {
    fontSize: 12,
    lineHeight: 16,
  },
  gapAccuracyHigh: {
    color: '#FB2C36',
  },
  gapAccuracyMedium: {
    color: '#E17100',
  },
  gapAccuracyLow: {
    color: '#009966',
  },
  gapChevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  roadmapHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: '#2196F3',
    fontSize: 12,
    lineHeight: 16,
  },
  roadmapItemRow: {
    marginTop: 12,
    flexDirection: 'row',
    columnGap: 12,
  },
  roadmapIndexCircle: {
    width: 32,
    height: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D8DFE4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  roadmapIndexText: {
    color: '#0E171E',
    fontSize: 12,
    lineHeight: 16,
  },
  roadmapCard: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    padding: 12,
  },
  roadmapTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roadmapTopLeft: {
    flex: 1,
    marginRight: 8,
  },
  roadmapTitle: {
    color: '#0E171E',
    fontSize: 12,
    lineHeight: 16,
  },
  roadmapMetaRow: {
    marginTop: 4,
    flexDirection: 'row',
    columnGap: 8,
  },
  roadmapMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  metaIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
  },
  metaText: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  startButton: {
    width: 81,
    height: 28,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 4,
  },
  startIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 10,
    lineHeight: 15,
  },
  roadmapBulletRow: {
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  bulletIcon: {
    width: 8,
    height: 8,
    resizeMode: 'contain',
  },
  bulletText: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  recommendItem: {
    marginTop: 8,
    minHeight: 56,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  recommendIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 16,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  recommendMiddle: {
    flex: 1,
  },
  recommendTitle: {
    color: '#0E171E',
    fontSize: 12,
    lineHeight: 16,
  },
  recommendMetaRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  recommendTypePill: {
    height: 17,
    borderRadius: 14,
    paddingHorizontal: 6,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  recommendTypeText: {
    color: '#0E171E',
    fontSize: 10,
    lineHeight: 15,
  },
  recommendTimeText: {
    color: '#59656E',
    fontSize: 10,
    lineHeight: 15,
  },
  recommendChevron: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  linkTextCenter: {
    marginTop: 12,
    textAlign: 'center',
    color: '#2196F3',
    fontSize: 12,
    lineHeight: 16,
  },
});
