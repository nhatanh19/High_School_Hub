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
};

type FeatureItem = {
  icon: number;
  iconHeight: number;
  iconLeft: number;
  iconTop: number;
  iconWidth: number;
  id: string;
  label: string;
  labelLeft: number;
  labelWidth: number;
  tint: string;
};

const assets = {
  arrowDown: require('../assets/all-features/student/icons/arrow_down.png'),
  back: require('../assets/all-features/student/icons/header_back.png'),
  quickBg: require('../assets/all-features/student/images/quick_bg.png'),
  search: require('../assets/all-features/student/icons/header_search.png'),
  vector: require('../assets/all-features/student/images/bg_vector.png'),
  viewDetailBg: require('../assets/all-features/student/images/detail_bg.png'),
};

const quickFeatures: FeatureItem[] = [
  {
    icon: require('../assets/all-features/student/icons/icon_forum.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'quick-forum',
    label: 'Diễn đàn',
    labelLeft: 5,
    labelWidth: 55,
    tint: '#E0F2FE',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_score.png'),
    iconHeight: 24,
    iconLeft: 19,
    iconTop: 20,
    iconWidth: 26,
    id: 'quick-score',
    label: 'Điểm số',
    labelLeft: 6,
    labelWidth: 52,
    tint: '#FEF9C3',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_attendance.png'),
    iconHeight: 29,
    iconLeft: 17,
    iconTop: 18,
    iconWidth: 29,
    id: 'quick-attendance',
    label: 'Điểm danh',
    labelLeft: -1,
    labelWidth: 67,
    tint: '#DCFCE7',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_shop.png'),
    iconHeight: 30,
    iconLeft: 17,
    iconTop: 17,
    iconWidth: 30,
    id: 'quick-shop',
    label: 'Mua sắm',
    labelLeft: 3,
    labelWidth: 59,
    tint: '#FFF1F2',
  },
];

const allFeatures: FeatureItem[] = [
  {
    icon: require('../assets/all-features/student/icons/icon_conduct.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-conduct',
    label: 'Nề nếp',
    labelLeft: 10,
    labelWidth: 44,
    tint: '#FCE7F3',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_score.png'),
    iconHeight: 24,
    iconLeft: 19,
    iconTop: 20,
    iconWidth: 26,
    id: 'all-score',
    label: 'Điểm số',
    labelLeft: 6,
    labelWidth: 52,
    tint: '#FEF9C3',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_attendance.png'),
    iconHeight: 29,
    iconLeft: 17,
    iconTop: 18,
    iconWidth: 29,
    id: 'all-attendance',
    label: 'Điểm danh',
    labelLeft: -1,
    labelWidth: 67,
    tint: '#DCFCE7',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_schedule.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-schedule',
    label: 'Thời khoá biểu',
    labelLeft: -14,
    labelWidth: 92,
    tint: '#E0F2FE',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_training_orange.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-training-1',
    label: 'Rèn luyện',
    labelLeft: 2,
    labelWidth: 61,
    tint: '#FFEDD5',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_notebook.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-notebook',
    label: 'Sổ đầu bài',
    labelLeft: -1,
    labelWidth: 66,
    tint: '#FCE7F3',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_forum.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-forum',
    label: 'Diễn đàn',
    labelLeft: 5,
    labelWidth: 55,
    tint: '#E0F2FE',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_contact.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-contact',
    label: 'Danh bạ',
    labelLeft: 6,
    labelWidth: 52,
    tint: '#F3E8FF',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_shop.png'),
    iconHeight: 30,
    iconLeft: 17,
    iconTop: 17,
    iconWidth: 30,
    id: 'all-shop',
    label: 'Mua sắm',
    labelLeft: 3,
    labelWidth: 59,
    tint: '#FFF1F2',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_classroom.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-classroom',
    label: 'Lớp học',
    labelLeft: 7,
    labelWidth: 50,
    tint: '#D9F99D',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_training_blue.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-training-2',
    label: 'Rèn luyện',
    labelLeft: 2,
    labelWidth: 61,
    tint: '#CFFAFE',
  },
  {
    icon: require('../assets/all-features/student/icons/icon_quiz.png'),
    iconHeight: 26,
    iconLeft: 19,
    iconTop: 19,
    iconWidth: 26,
    id: 'all-quiz',
    label: 'Quiz',
    labelLeft: 18,
    labelWidth: 28,
    tint: '#FFEDD5',
  },
];

export function StudentAllFeaturesScreen({ onBack }: Props) {
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const horizontalPadding = 20;
    const available = Math.max(240, width - horizontalPadding * 2);
    const minGap = 6;
    const maxGap = 24;

    let tileWidth = (available - minGap * 3) / 4;
    tileWidth = Math.max(56, Math.min(tileWidth, 80));

    let columnGap = (available - tileWidth * 4) / 3;
    columnGap = Math.max(minGap, Math.min(columnGap, maxGap));

    if (tileWidth * 4 + columnGap * 3 > available) {
      tileWidth = (available - minGap * 3) / 4;
      columnGap = minGap;
    }

    const scale = tileWidth / 64;
    const tileHeight = 93 * scale;
    const rowGap = 25 * scale;
    const quickSectionHeight = 42 + tileHeight + 11;

    return {
      columnGap,
      horizontalPadding,
      quickSectionHeight,
      rowGap,
      scale,
      tileHeight,
      tileWidth,
    };
  }, [width]);

  const quickSectionStyle = useMemo(
    () => ({ height: layout.quickSectionHeight }),
    [layout.quickSectionHeight],
  );

  const quickBgStyle = useMemo(
    () => ({ height: layout.quickSectionHeight }),
    [layout.quickSectionHeight],
  );

  const quickRowStyle = useMemo(
    () => ({
      columnGap: layout.columnGap,
      paddingHorizontal: layout.horizontalPadding,
    }),
    [layout.columnGap, layout.horizontalPadding],
  );

  const allGridStyle = useMemo(
    () => ({
      columnGap: layout.columnGap,
      paddingHorizontal: layout.horizontalPadding,
      rowGap: layout.rowGap,
    }),
    [layout.columnGap, layout.horizontalPadding, layout.rowGap],
  );

  const vectorStyle = useMemo(() => ({ left: width / 2 - 32.5 }), [width]);

  return (
    <View style={styles.screen}>
      <View style={styles.canvas}>
        <View style={styles.header}>
          <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
            <Image source={assets.back} style={styles.backIcon} />
          </Pressable>
          <Text style={styles.headerTitle}>Chức năng</Text>
          <Pressable style={styles.searchButton}>
            <Image source={assets.search} style={styles.searchIcon} />
          </Pressable>
        </View>

        <Image
          source={assets.vector}
          style={[styles.vectorDecor, vectorStyle]}
        />

        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentColumn}>
            <View style={styles.pinnedSection}>
              <Text style={styles.pinnedTitle}>Chức năng được ghim</Text>
              <Pressable style={styles.detailButton}>
                <Image
                  source={assets.viewDetailBg}
                  style={styles.detailButtonBg}
                />
                <Text style={styles.detailButtonText}>Xem chi tiết</Text>
                <Image source={assets.arrowDown} style={styles.detailArrow} />
              </Pressable>
            </View>

            <View style={[styles.quickSection, quickSectionStyle]}>
              <Image
                source={assets.quickBg}
                style={[styles.quickBg, quickBgStyle]}
              />
              <View style={[styles.quickRow, quickRowStyle]}>
                {quickFeatures.map(item => (
                  <FeatureTile item={item} key={item.id} layout={layout} />
                ))}
              </View>
            </View>

            <View style={styles.allSection}>
              <Text style={styles.allTitle}>Tất cả chức năng</Text>
              <View style={[styles.allGrid, allGridStyle]}>
                {allFeatures.map(item => (
                  <FeatureTile item={item} key={item.id} layout={layout} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

function FeatureTile({
  item,
  layout,
}: {
  item: FeatureItem;
  layout: {
    scale: number;
    tileHeight: number;
    tileWidth: number;
  };
}) {
  const iconStyle = {
    width: item.iconWidth * layout.scale,
    height: item.iconHeight * layout.scale,
    left: item.iconLeft * layout.scale,
    top: item.iconTop * layout.scale,
  };

  const labelStyle = {
    fontSize: 14 * layout.scale,
    height: 16 * layout.scale,
    left: item.labelLeft * layout.scale,
    lineHeight: 16 * layout.scale,
    top: 74 * layout.scale,
    width: item.labelWidth * layout.scale,
  };

  const tileStyle = {
    height: layout.tileHeight,
    width: layout.tileWidth,
  };

  const circleStyle = {
    borderRadius: 24 * layout.scale,
    height: 64 * layout.scale,
    width: 64 * layout.scale,
  };

  const tintStyle = {
    backgroundColor: item.tint,
  };

  return (
    <View style={[styles.featureTile, tileStyle]}>
      <View style={[styles.featureCircle, circleStyle, tintStyle]}>
        <Image source={item.icon} style={[styles.featureIcon, iconStyle]} />
      </View>
      <Text numberOfLines={1} style={[styles.featureLabel, labelStyle]}>
        {item.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  allGrid: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 43,
    paddingHorizontal: 29.5,
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 25,
    rowGap: 25,
  },
  allSection: {
    width: '100%',
    height: 578,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  allTitle: {
    position: 'absolute',
    left: 20,
    top: 11,
    width: 136,
    height: 25,
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 16,
    width: 12,
    height: 24,
  },
  backIcon: {
    width: 12,
    height: 24,
    resizeMode: 'cover',
  },
  canvas: {
    width: '100%',
    flex: 1,
  },
  contentColumn: {
    width: '100%',
    rowGap: 10,
  },
  detailArrow: {
    position: 'absolute',
    width: 24,
    height: 24,
    left: 89,
    top: 10,
    resizeMode: 'cover',
  },
  detailButton: {
    position: 'absolute',
    right: 16,
    top: 10,
    width: 127,
    height: 40,
  },
  detailButtonBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 122,
    height: 40,
    resizeMode: 'cover',
  },
  detailButtonText: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: 94,
    height: 20,
    color: '#000000',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  featureCircle: {
    width: 64,
    height: 64,
    borderRadius: 24,
  },
  featureLabel: {
    position: 'absolute',
    top: 74,
    height: 16,
    color: '#000000',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 16,
  },
  featureIcon: {
    position: 'absolute',
  },
  featureTile: {
    width: 64,
    height: 93,
    position: 'relative',
  },
  header: {
    width: '100%',
    height: 56,
    backgroundColor: '#63BAD5',
    position: 'relative',
  },
  headerTitle: {
    position: 'absolute',
    alignSelf: 'center',
    top: 14,
    width: 94,
    height: 25,
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 25,
  },
  pinnedSection: {
    width: '100%',
    height: 60,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  pinnedTitle: {
    position: 'absolute',
    left: 20,
    top: 19,
    width: 176,
    height: 22,
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  },
  quickBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 146,
    resizeMode: 'stretch',
  },
  quickRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 42,
    paddingHorizontal: 32.5,
    flexDirection: 'row',
    columnGap: 25,
  },
  quickSection: {
    width: '100%',
    height: 146,
    position: 'relative',
  },
  screen: {
    flex: 1,
    backgroundColor: '#F5F8FF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchButton: {
    position: 'absolute',
    right: 27,
    top: 14,
    width: 24,
    height: 24,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  vectorDecor: {
    position: 'absolute',
    alignSelf: 'center',
    top: 605,
    width: 65,
    height: 65,
    borderRadius: 16,
    resizeMode: 'cover',
  },
});
