import React, { useState } from 'react';
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
  back: require('../assets/scorebook/student/icons/back.png'),
  english: require('../assets/scorebook/student/icons/english.png'),
  filterSort: require('../assets/scorebook/student/icons/filter_sort.png'),
  headerAction: require('../assets/scorebook/student/icons/header_action.png'),
  literature: require('../assets/scorebook/student/icons/literature.png'),
  math: require('../assets/scorebook/student/icons/math.png'),
  physics: require('../assets/scorebook/student/icons/physics.png'),
  simulateArrow: require('../assets/scorebook/student/icons/simulate_arrow.png'),
  summaryRing: require('../assets/scorebook/student/icons/summary_ring.png'),
  trendDown: require('../assets/scorebook/student/icons/trend_down.png'),
  trendUp: require('../assets/scorebook/student/icons/trend_up.png'),
};

export function StudentScoreBookScreen({ onBack }: Props) {
  const [activeSemester, setActiveSemester] = useState<'hk1' | 'hk2' | 'year'>(
    'hk2',
  );
  const isYear = activeSemester === 'year';

  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
              <Image source={assets.back} style={styles.backIcon} />
            </Pressable>

            <Text style={styles.headerTitle}>Sổ Điểm Điện Tử</Text>

            <Image
              source={assets.headerAction}
              style={styles.headerActionIcon}
            />
          </View>

          <View style={styles.semesterTabsWrap}>
            <Pressable
              onPress={() => setActiveSemester('hk1')}
              style={
                activeSemester === 'hk1'
                  ? styles.semesterTabActive
                  : styles.semesterTabDefault
              }
            >
              <Text
                style={
                  activeSemester === 'hk1'
                    ? styles.semesterTabActiveText
                    : styles.semesterTabDefaultText
                }
              >
                Học kỳ 1
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveSemester('hk2')}
              style={
                activeSemester === 'hk2'
                  ? styles.semesterTabActive
                  : styles.semesterTabDefault
              }
            >
              <Text
                style={
                  activeSemester === 'hk2'
                    ? styles.semesterTabActiveText
                    : styles.semesterTabDefaultText
                }
              >
                Học kỳ 2
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setActiveSemester('year')}
              style={
                activeSemester === 'year'
                  ? styles.semesterTabActive
                  : styles.semesterTabDefault
              }
            >
              <Text
                style={
                  activeSemester === 'year'
                    ? styles.semesterTabActiveText
                    : styles.semesterTabDefaultText
                }
              >
                Cả năm
              </Text>
            </Pressable>
          </View>
        </View>

        {isYear ? (
          <>
            <View style={styles.summaryCard}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryLabel}>TRUNG BÌNH CẢ NĂM</Text>

                <View style={styles.summaryValueRow}>
                  <Text style={styles.summaryValue}>8.7</Text>
                  <Text style={styles.summaryScale}>/ 10</Text>
                </View>

                <View style={styles.summaryTagsRow}>
                  <View style={styles.tagBlueWrap}>
                    <Text style={styles.tagBlueText}>Tốt</Text>
                  </View>
                </View>

                <View style={styles.yearBadgesRow}>
                  <View style={styles.yearBadgeExcellent}>
                    <Text style={styles.yearBadgeExcellentText}>Xuất sắc</Text>
                  </View>
                  <View style={styles.yearBadgeUp}>
                    <Image
                      source={assets.trendUp}
                      style={styles.yearBadgeUpIcon}
                    />
                    <Text style={styles.yearBadgeUpText}>Tăng 0.2</Text>
                  </View>
                </View>
              </View>

              <Image source={assets.summaryRing} style={styles.summaryRing} />
            </View>

            <View style={styles.yearResultCardsRow}>
              <YearResultCard
                active={false}
                grade="HK1"
                result="8.5"
                tag="Giỏi"
                tagStyle={styles.yearResultTagMuted}
              />
              <YearResultCard
                active
                grade="HK2"
                result="8.9"
                tag="Xuất sắc"
                tagStyle={styles.yearResultTagBlue}
              />
            </View>

            <View style={styles.yearSectionHeader}>
              <Text style={styles.yearSectionTitle}>Chi tiết các môn</Text>
              <View style={styles.yearLegendRow}>
                <View
                  style={[styles.yearLegendDot, styles.yearLegendDotGreen]}
                />
                <Text style={styles.yearLegendText}>Tiến bộ</Text>
                <View style={[styles.yearLegendDot, styles.yearLegendDotRed]} />
                <Text style={styles.yearLegendText}>Tụt lùi</Text>
              </View>
            </View>

            <YearSubjectCard
              icon={assets.math}
              iconBgStyle={styles.yearIconBgBlue}
              score="9.2"
              scoreStyle={styles.yearScoreBlue}
              subject="Toán Học"
              subtitle="Hệ số 2"
              trend="up"
              trendText="Tiến bộ"
              hk1="8.9"
              hk2="9.5"
              year="9.2"
              highlight="hk2"
            />

            <YearSubjectCard
              icon={assets.literature}
              iconBgStyle={styles.yearIconBgOrange}
              score="7.8"
              scoreStyle={styles.yearScoreDark}
              subject="Ngữ Văn"
              subtitle="Hệ số 2"
              trend="stable"
              trendText="- Ổn định"
              hk1="7.8"
              hk2="7.8"
              year="7.8"
              highlight="none"
            />

            <YearSubjectCard
              danger
              icon={assets.physics}
              iconBgStyle={styles.yearIconBgRed}
              score="6.5"
              scoreStyle={styles.yearScoreRed}
              subject="Vật Lý"
              subtitle="Hệ số 1"
              trend="down"
              trendText="Sa sút"
              hk1="7.0"
              hk2="6.0"
              year="6.5"
              highlight="hk2"
            />
          </>
        ) : (
          <>
            <View style={styles.summaryCard}>
              <View style={styles.summaryLeft}>
                <Text style={styles.summaryLabel}>ĐIỂM TRUNG BÌNH</Text>

                <View style={styles.summaryValueRow}>
                  <Text style={styles.summaryValue}>8.5</Text>
                  <Text style={styles.summaryScale}>/ 10</Text>
                </View>

                <View style={styles.summaryTagsRow}>
                  <View style={styles.tagGreenWrap}>
                    <Text style={styles.tagGreenText}>Giỏi</Text>
                  </View>
                  <View style={styles.tagBlueWrap}>
                    <Text style={styles.tagBlueText}>Tốt</Text>
                  </View>
                  <View style={styles.tagGrayWrap}>
                    <Text style={styles.tagGrayText}>Hạng 5</Text>
                  </View>
                </View>
              </View>

              <Image source={assets.summaryRing} style={styles.summaryRing} />
            </View>

            <View style={styles.statsRow}>
              <StatCard
                label="SỐ MÔN"
                value="13"
                valueStyle={styles.statValueDefault}
              />
              <StatCard
                label="ĐẠT YÊU CẦU"
                value="13"
                valueStyle={styles.statValueGreen}
              />
              <StatCard
                label="CHƯA ĐẠT"
                value="0"
                valueStyle={styles.statValueMuted}
              />
            </View>

            <View style={styles.filterRow}>
              <View style={styles.filterActivePill}>
                <Text style={styles.filterActiveText}>Tất cả</Text>
              </View>
              <View style={styles.filterPill}>
                <Text style={styles.filterText}>Dưới 5.0</Text>
              </View>
              <View style={styles.filterPill}>
                <Text style={styles.filterText}>Trên 8.0</Text>
              </View>
              <Image source={assets.filterSort} style={styles.filterSortIcon} />
            </View>

            <View style={styles.subjectCardPrimary}>
              <View style={styles.subjectRowTop}>
                <View style={styles.subjectTitleWrap}>
                  <View style={styles.subjectIconBgMath}>
                    <Image
                      source={assets.math}
                      style={styles.subjectIconMath}
                    />
                  </View>
                  <View>
                    <Text style={styles.subjectTitle}>Toán Học</Text>
                    <Text style={styles.subjectSub}>Hệ số 2</Text>
                  </View>
                </View>
                <View style={styles.scorePillBlue}>
                  <Text style={styles.scorePillBlueText}>9.2</Text>
                </View>
              </View>

              <View style={styles.subjectDivider} />

              <View style={styles.metricsRow}>
                <MetricBlock label="MIỆNG" values={['9', '10']} />
                <MetricBlock label="15 PHÚT" values={['8', '9']} />
                <MetricBlock active label="1 TIẾT" values={['9.5']} />
                <MetricBlock label="THI HK" values={['--']} />
              </View>

              <View style={styles.simulateBox}>
                <Text style={styles.simulateText}>Giả lập: Nếu thi </Text>
                <Text style={styles.simulateEmphasis}>9.0</Text>
                <Text style={styles.simulateText}> thì TB là </Text>
                <Text style={styles.simulateEmphasis}>9.2</Text>
                <Image
                  source={assets.simulateArrow}
                  style={styles.simulateArrowIcon}
                />
              </View>
            </View>

            <SimpleSubjectCard
              icon={assets.literature}
              iconBgStyle={styles.subjectIconBgLite}
              score="7.8"
              scoreStyle={styles.scorePillOrangeText}
              subject="Ngữ Văn"
              subtitle="Hệ số 2"
            />

            <SimpleSubjectCard
              danger
              icon={assets.physics}
              iconBgStyle={styles.subjectIconBgPhysics}
              score="6.2"
              scoreStyle={styles.scorePillRedText}
              subject="Vật Lý"
              subtitle="Cần cố gắng"
            />

            <SimpleSubjectCard
              icon={assets.english}
              iconBgStyle={styles.subjectIconBgEnglish}
              score="8.5"
              scoreStyle={styles.scorePillBlueText}
              subject="Tiếng Anh"
              subtitle="Hệ số 1"
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

function YearResultCard({
  active,
  grade,
  result,
  tag,
  tagStyle,
}: {
  active: boolean;
  grade: string;
  result: string;
  tag: string;
  tagStyle: object;
}) {
  return (
    <View style={styles.yearResultCard}>
      <View
        style={[
          styles.yearResultGradeDot,
          active ? styles.yearResultGradeDotActive : null,
        ]}
      >
        <Text
          style={[
            styles.yearResultGradeText,
            active ? styles.yearResultGradeTextActive : null,
          ]}
        >
          {grade}
        </Text>
      </View>
      <View>
        <Text style={styles.yearResultLabel}>Kết quả</Text>
        <View style={styles.yearResultValueRow}>
          <Text style={styles.yearResultValue}>{result}</Text>
          <Text style={[styles.yearResultTag, tagStyle]}>({tag})</Text>
        </View>
      </View>
    </View>
  );
}

function YearSubjectCard({
  danger = false,
  icon,
  iconBgStyle,
  score,
  scoreStyle,
  subject,
  subtitle,
  trend,
  trendText,
  hk1,
  hk2,
  year,
  highlight,
}: {
  danger?: boolean;
  icon: number;
  iconBgStyle: object;
  score: string;
  scoreStyle: object;
  subject: string;
  subtitle: string;
  trend: 'up' | 'down' | 'stable';
  trendText: string;
  hk1: string;
  hk2: string;
  year: string;
  highlight: 'none' | 'hk2';
}) {
  return (
    <View
      style={[
        styles.yearSubjectCard,
        danger ? styles.yearSubjectCardDanger : null,
      ]}
    >
      <View
        style={[
          styles.yearSubjectTop,
          danger ? styles.yearSubjectTopDanger : null,
        ]}
      >
        <View style={styles.subjectTitleWrap}>
          <View style={[styles.subjectIconBgBase, iconBgStyle]}>
            <Image source={icon} style={styles.subjectIconGeneric} />
          </View>
          <View>
            <Text style={styles.subjectTitle}>{subject}</Text>
            <View style={styles.yearSubjectTrendRow}>
              <Text style={styles.subjectSub}>{subtitle}</Text>
              {trend === 'stable' ? (
                <Text style={styles.yearTrendStable}>{trendText}</Text>
              ) : (
                <View
                  style={
                    trend === 'up' ? styles.yearTrendUp : styles.yearTrendDown
                  }
                >
                  <Image
                    source={trend === 'up' ? assets.trendUp : assets.trendDown}
                    style={styles.yearTrendIcon}
                  />
                  <Text
                    style={
                      trend === 'up'
                        ? styles.yearTrendUpText
                        : styles.yearTrendDownText
                    }
                  >
                    {trendText}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <Text style={scoreStyle}>{score}</Text>
      </View>

      <View
        style={[styles.yearSplitRow, danger ? styles.yearSplitRowDanger : null]}
      >
        <View style={styles.yearSplitCol}>
          <Text style={styles.yearSplitLabel}>HK1</Text>
          <Text style={[styles.yearSplitValue, styles.yearSplitValueDefault]}>
            {hk1}
          </Text>
        </View>
        <View style={[styles.yearSplitCol, styles.yearSplitColMiddle]}>
          <Text
            style={[
              styles.yearSplitLabel,
              highlight === 'hk2' ? styles.yearSplitLabelHighlight : null,
            ]}
          >
            HK2
          </Text>
          <Text
            style={[
              styles.yearSplitValue,
              highlight === 'hk2'
                ? styles.yearSplitValueHighlight
                : styles.yearSplitValueDefault,
            ]}
          >
            {hk2}
          </Text>
        </View>
        <View
          style={[
            styles.yearSplitCol,
            highlight === 'hk2' ? styles.yearSplitColYearHighlight : null,
          ]}
        >
          <Text
            style={[
              styles.yearSplitLabel,
              highlight === 'hk2'
                ? styles.yearSplitLabelYear
                : styles.yearSplitLabelDefault,
            ]}
          >
            Cả Năm
          </Text>
          <Text
            style={[
              styles.yearSplitValue,
              highlight === 'hk2'
                ? styles.yearSplitValueYear
                : styles.yearSplitValueDark,
            ]}
          >
            {year}
          </Text>
        </View>
      </View>
    </View>
  );
}

function StatCard({
  label,
  value,
  valueStyle,
}: {
  label: string;
  value: string;
  valueStyle: object;
}) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValueBase, valueStyle]}>{value}</Text>
    </View>
  );
}

function MetricBlock({
  active = false,
  label,
  values,
}: {
  active?: boolean;
  label: string;
  values: string[];
}) {
  return (
    <View style={styles.metricBlock}>
      <Text
        style={[styles.metricLabel, active ? styles.metricLabelActive : null]}
      >
        {label}
      </Text>

      <View style={styles.metricValuesRow}>
        {values.map(value => (
          <View
            key={`${label}-${value}`}
            style={[
              styles.metricValueBox,
              value === '--' ? styles.metricValueBoxEmpty : null,
              active ? styles.metricValueBoxActive : null,
            ]}
          >
            <Text
              style={[
                styles.metricValueText,
                value === '--' ? styles.metricValueTextEmpty : null,
                active ? styles.metricValueTextActive : null,
              ]}
            >
              {value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function SimpleSubjectCard({
  danger = false,
  icon,
  iconBgStyle,
  score,
  scoreStyle,
  subject,
  subtitle,
}: {
  danger?: boolean;
  icon: number;
  iconBgStyle: object;
  score: string;
  scoreStyle: object;
  subject: string;
  subtitle: string;
}) {
  return (
    <View
      style={[
        styles.subjectCardSimple,
        danger ? styles.subjectCardDanger : null,
      ]}
    >
      <View style={styles.subjectTitleWrap}>
        <View style={[styles.subjectIconBgBase, iconBgStyle]}>
          <Image source={icon} style={styles.subjectIconGeneric} />
        </View>
        <View>
          <Text style={styles.subjectTitle}>{subject}</Text>
          <Text
            style={[styles.subjectSub, danger ? styles.subjectSubDanger : null]}
          >
            {subtitle}
          </Text>
        </View>
      </View>

      <View
        style={[styles.scorePillSimple, danger ? styles.scorePillRed : null]}
      >
        <Text style={[styles.scorePillSimpleText, scoreStyle]}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingTop: 14,
    paddingBottom: 10,
    paddingHorizontal: 14,
  },
  headerRow: {
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  headerActionIcon: {
    width: 21,
    height: 28,
    resizeMode: 'contain',
  },
  semesterTabsWrap: {
    marginTop: 8,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    padding: 4,
  },
  semesterTabActive: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
  },
  semesterTabDefault: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  semesterTabActiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  semesterTabDefaultText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryCard: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
    paddingVertical: 21,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  summaryLeft: {
    width: 190,
  },
  summaryLabel: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '700',
  },
  summaryValueRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  summaryValue: {
    color: '#63BAD5',
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 48,
    letterSpacing: -2.4,
  },
  summaryScale: {
    marginLeft: 8,
    marginBottom: 6,
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '700',
  },
  summaryTagsRow: {
    marginTop: 6,
    flexDirection: 'row',
    columnGap: 8,
  },
  tagGreenWrap: {
    height: 21,
    borderRadius: 4,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tagGreenText: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '700',
  },
  tagBlueWrap: {
    height: 21,
    borderRadius: 4,
    backgroundColor: '#5BB0CA',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tagBlueText: {
    color: '#FEF2F2',
    fontSize: 10,
    fontWeight: '700',
  },
  tagGrayWrap: {
    height: 21,
    borderRadius: 4,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  tagGrayText: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '700',
  },
  summaryRing: {
    width: 96,
    height: 96,
    resizeMode: 'contain',
    marginTop: 1,
  },
  yearBadgesRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  yearBadgeExcellent: {
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 7,
    justifyContent: 'center',
  },
  yearBadgeExcellentText: {
    color: '#16A34A',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  yearBadgeUp: {
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  yearBadgeUpIcon: {
    width: 7,
    height: 10,
    resizeMode: 'contain',
  },
  yearBadgeUpText: {
    color: '#3B82F6',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  yearResultCardsRow: {
    marginHorizontal: 16,
    marginTop: 12,
    flexDirection: 'row',
    columnGap: 12,
  },
  yearResultCard: {
    flex: 1,
    height: 62,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    columnGap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  yearResultGradeDot: {
    width: 32,
    height: 32,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearResultGradeDotActive: {
    backgroundColor: '#63BAD5',
  },
  yearResultGradeText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
  },
  yearResultGradeTextActive: {
    color: '#FFFFFF',
  },
  yearResultLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  yearResultValueRow: {
    marginTop: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  yearResultValue: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  yearResultTag: {
    marginLeft: 2,
    fontSize: 10,
    lineHeight: 20,
  },
  yearResultTagMuted: {
    color: '#9CA3AF',
  },
  yearResultTagBlue: {
    color: '#63BAD5',
    fontWeight: '700',
  },
  yearSectionHeader: {
    marginHorizontal: 20,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearSectionTitle: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  yearLegendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  yearLegendDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginLeft: 6,
  },
  yearLegendDotGreen: {
    backgroundColor: '#22C55E',
  },
  yearLegendDotRed: {
    backgroundColor: '#EF4444',
  },
  yearLegendText: {
    color: '#9CA3AF',
    fontSize: 10,
    lineHeight: 15,
  },
  yearSubjectCard: {
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  yearSubjectCardDanger: {
    borderColor: '#FEE2E2',
  },
  yearSubjectTop: {
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#F9FAFB',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearSubjectTopDanger: {
    borderBottomColor: '#FEF2F2',
  },
  yearSubjectTrendRow: {
    marginTop: -1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 6,
  },
  yearTrendStable: {
    color: '#D1D5DB',
    fontSize: 9,
    fontWeight: '500',
    lineHeight: 13.5,
  },
  yearTrendUp: {
    height: 14,
    borderRadius: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  yearTrendDown: {
    height: 14,
    borderRadius: 4,
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 2,
  },
  yearTrendIcon: {
    width: 6,
    height: 8,
    resizeMode: 'contain',
  },
  yearTrendUpText: {
    color: '#16A34A',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 13.5,
  },
  yearTrendDownText: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 13.5,
  },
  yearIconBgBlue: {
    backgroundColor: '#EFF6FF',
  },
  yearIconBgOrange: {
    backgroundColor: '#FFF7ED',
  },
  yearIconBgRed: {
    backgroundColor: '#FEF2F2',
  },
  yearScoreBlue: {
    color: '#63BAD5',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  yearScoreDark: {
    color: '#374151',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  yearScoreRed: {
    color: '#EF4444',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  yearSplitRow: {
    height: 50,
    backgroundColor: 'rgba(249,250,251,0.5)',
    flexDirection: 'row',
  },
  yearSplitRowDanger: {
    backgroundColor: 'rgba(254,242,242,0.1)',
  },
  yearSplitCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearSplitColMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  yearSplitColYearHighlight: {
    backgroundColor: 'rgba(239,246,255,0.5)',
    borderLeftWidth: 1,
    borderColor: '#F3F4F6',
  },
  yearSplitLabel: {
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 13.5,
    color: '#9CA3AF',
  },
  yearSplitLabelDefault: {
    color: '#6B7280',
  },
  yearSplitLabelHighlight: {
    color: '#63BAD5',
  },
  yearSplitLabelYear: {
    color: '#2563EB',
  },
  yearSplitValue: {
    marginTop: 2,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  yearSplitValueDefault: {
    color: '#4B5563',
  },
  yearSplitValueHighlight: {
    color: '#63BAD5',
  },
  yearSplitValueDark: {
    color: '#374151',
  },
  yearSplitValueYear: {
    color: '#2563EB',
  },
  statsRow: {
    marginHorizontal: 16,
    marginTop: 14,
    flexDirection: 'row',
    columnGap: 11,
  },
  statCard: {
    flex: 1,
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    color: '#9CA3AF',
    fontSize: 8,
    fontWeight: '700',
    lineHeight: 15,
  },
  statValueBase: {
    marginTop: -1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  statValueDefault: {
    color: '#1F2937',
  },
  statValueGreen: {
    color: '#16A34A',
  },
  statValueMuted: {
    color: 'rgba(107,114,128,0.66)',
  },
  filterRow: {
    marginHorizontal: 16,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  filterActivePill: {
    width: 127,
    height: 30,
    borderRadius: 9999,
    backgroundColor: '#63BAD5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActiveText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  filterPill: {
    width: 84,
    height: 30,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '700',
  },
  filterSortIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
  subjectCardPrimary: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    padding: 16,
  },
  subjectRowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjectTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 12,
  },
  subjectIconBgBase: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectIconBgMath: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subjectIconBgLite: {
    backgroundColor: '#F3F4F6',
  },
  subjectIconBgPhysics: {
    backgroundColor: '#FEE2E2',
  },
  subjectIconBgEnglish: {
    backgroundColor: '#F3F4F6',
  },
  subjectIconMath: {
    width: 25,
    height: 28,
    resizeMode: 'contain',
  },
  subjectIconGeneric: {
    width: 32,
    height: 24,
    resizeMode: 'contain',
  },
  subjectTitle: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  subjectSub: {
    color: '#9CA3AF',
    fontSize: 10,
    lineHeight: 15,
  },
  subjectSubDanger: {
    color: '#F87171',
    fontWeight: '700',
  },
  scorePillBlue: {
    width: 48,
    height: 31,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePillBlueText: {
    color: '#63BAD5',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  subjectDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginTop: 13,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metricBlock: {
    width: 65,
  },
  metricLabel: {
    color: '#9CA3AF',
    fontSize: 9,
    fontWeight: '700',
    lineHeight: 13.5,
  },
  metricLabelActive: {
    color: '#63BAD5',
  },
  metricValuesRow: {
    marginTop: 4,
    flexDirection: 'row',
    columnGap: 4,
  },
  metricValueBox: {
    minWidth: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  metricValueBoxActive: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  metricValueBoxEmpty: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  metricValueText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 16,
  },
  metricValueTextActive: {
    color: '#63BAD5',
  },
  metricValueTextEmpty: {
    color: '#9CA3AF',
    fontWeight: '400',
  },
  simulateBox: {
    marginTop: 12,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
  },
  simulateText: {
    color: '#6B7280',
    fontSize: 10,
    lineHeight: 15,
  },
  simulateEmphasis: {
    color: '#6B7280',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 15,
  },
  simulateArrowIcon: {
    width: 8,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 'auto',
  },
  subjectCardSimple: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    minHeight: 74,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  subjectCardDanger: {
    borderColor: '#FECACA',
  },
  scorePillSimple: {
    width: 48,
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scorePillRed: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FEE2E2',
  },
  scorePillSimpleText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
  },
  scorePillOrangeText: {
    color: '#D97706',
  },
  scorePillRedText: {
    color: '#EF4444',
  },
});
