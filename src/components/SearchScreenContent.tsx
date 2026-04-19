import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { VI_STRINGS } from '../constants/vi';
import type {
  SearchFeatureItem,
  SearchRecentItem,
  SearchScreenData,
  SearchSuggestionItem,
} from '../models/search';

type Props = {
  data: SearchScreenData;
  onBack: () => void;
};

const assets = {
  avatarStudent: require('../assets/search/icons/avatar_student.png'),
  avatarTeacher: require('../assets/search/icons/avatar_teacher.png'),
  calculator: require('../assets/search/icons/calculator.png'),
  calendarAlt: require('../assets/search/icons/calendar_alt.png'),
  chevronLeft: require('../assets/search/icons/chevron_left.png'),
  chevronRight: require('../assets/search/icons/chevron_right.png'),
  clock: require('../assets/search/icons/clock.png'),
  commentAlt: require('../assets/search/icons/comment_alt.png'),
  fileInvoiceDollar: require('../assets/search/icons/file_invoice_dollar.png'),
  penNib: require('../assets/search/icons/pen_nib.png'),
  search: require('../assets/search/icons/search.png'),
  utensils: require('../assets/search/icons/utensils.png'),
};

const featureIconSources = [
  assets.calendarAlt,
  assets.calculator,
  assets.penNib,
  assets.utensils,
];

const featureIconBoxColors = ['#E3F2FD', '#E8F5E9', '#F3E5F5', '#FFF3E0'];

export function SearchScreenContent({ data, onBack }: Props) {
  const [recentItems, setRecentItems] = useState<SearchRecentItem[]>(
    data.recentItems,
  );

  useEffect(() => {
    setRecentItems(data.recentItems);
  }, [data]);

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.topNav}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
              <Image source={assets.chevronLeft} style={styles.backIcon} />
            </Pressable>

            <Text style={styles.title}>{VI_STRINGS.searchTitle}</Text>
          </View>

          <View style={styles.searchWrap}>
            <View style={styles.searchInput}>
              <Image source={assets.search} style={styles.searchIcon} />
              <Text numberOfLines={1} style={styles.searchPlaceholder}>
                {data.placeholder}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{VI_STRINGS.searchRecent}</Text>
            <Pressable hitSlop={8} onPress={() => setRecentItems([])}>
              <Text style={styles.sectionAction}>
                {VI_STRINGS.searchClearAll}
              </Text>
            </Pressable>
          </View>

          <View style={styles.recentWrap}>
            {recentItems.map(item => (
              <RecentChip item={item} key={item.id} />
            ))}
          </View>

          <View style={styles.featureHeader}>
            <Text style={styles.sectionTitle}>{VI_STRINGS.searchFeatured}</Text>
            <Text style={styles.sectionAction}>{VI_STRINGS.searchAll}</Text>
          </View>

          <View style={styles.featureGrid}>
            {data.features.map((item, index) => (
              <FeatureCard index={index} item={item} key={item.id} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>
            {VI_STRINGS.searchQuickSuggestions}
          </Text>
          <View style={styles.suggestionList}>
            {data.suggestions.map((item, index) => (
              <SuggestionCard index={index} item={item} key={item.id} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function RecentChip({ item }: { item: SearchRecentItem }) {
  return (
    <View style={styles.recentChip}>
      <Image source={assets.clock} style={styles.recentClock} />
      <Text style={styles.recentText}>{item.label}</Text>
    </View>
  );
}

function FeatureCard({
  item,
  index,
}: {
  item: SearchFeatureItem;
  index: number;
}) {
  const iconSource = featureIconSources[index] ?? featureIconSources[0];
  const iconBoxColor =
    featureIconBoxColors[index] ??
    featureIconBoxColors[featureIconBoxColors.length - 1];

  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIconWrap, { backgroundColor: iconBoxColor }]}>
        <Image source={iconSource} style={styles.featureIcon} />
      </View>

      <View style={styles.featureBody}>
        <Text numberOfLines={2} style={styles.featureTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.featureSubtitle}>
          {item.subtitle}
        </Text>
      </View>
    </View>
  );
}

function SuggestionCard({
  item,
  index,
}: {
  item: SearchSuggestionItem;
  index: number;
}) {
  const isUtility = index === 2;
  const avatarBackground =
    index === 0
      ? assets.avatarTeacher
      : index === 1
        ? assets.avatarStudent
        : null;

  return (
    <View style={styles.suggestionCard}>
      <View
        style={[
          styles.suggestionAvatar,
          isUtility
            ? styles.suggestionAvatarUtility
            : styles.suggestionAvatarPerson,
        ]}
      >
        {avatarBackground ? (
          <>
            <Image source={avatarBackground} style={styles.avatarImage} />
            <Text style={styles.avatarInitialText}>{item.avatarLabel}</Text>
          </>
        ) : (
          <Image
            source={assets.fileInvoiceDollar}
            style={styles.utilityAvatarIcon}
          />
        )}
      </View>

      <View style={styles.suggestionBody}>
        <Text numberOfLines={1} style={styles.suggestionTitle}>
          {item.title}
        </Text>

        <View style={styles.suggestionMetaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
          <Text numberOfLines={1} style={styles.suggestionSubtitle}>
            {item.subtitle}
          </Text>
        </View>
      </View>

      <View style={styles.actionCircle}>
        <Image
          source={isUtility ? assets.chevronRight : assets.commentAlt}
          style={isUtility ? styles.actionChevron : styles.actionComment}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  headerSection: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  topNav: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  backIcon: {
    width: 14.94,
    height: 19.2,
    marginLeft: 4,
  },
  title: {
    marginLeft: 10,
    color: '#1A1D1E',
    fontSize: 20,
    fontWeight: '700',
  },
  searchWrap: {
    marginTop: 20,
  },
  searchInput: {
    height: 47.43,
    borderRadius: 16,
    backgroundColor: '#F2F4F8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchIcon: {
    width: 13.71,
    height: 17.6,
    marginRight: 16,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#757575',
    fontSize: 16,
    lineHeight: 19,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#1A1D1E',
    fontSize: 17.6,
    fontWeight: '700',
  },
  sectionAction: {
    color: '#6B7280',
    fontSize: 13.6,
    fontWeight: '400',
  },
  recentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
  },
  recentChip: {
    height: 32.1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  recentClock: {
    width: 10.46,
    height: 12.8,
    marginRight: 8,
  },
  recentText: {
    color: '#6B7280',
    fontSize: 14.4,
    fontWeight: '400',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  featureCard: {
    width: '48%',
    minHeight: 82.55,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIconWrap: {
    width: 42,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  featureIcon: {
    width: 14.94,
    height: 19.2,
  },
  featureBody: {
    flex: 1,
  },
  featureTitle: {
    color: '#1A1D1E',
    fontSize: 14.4,
    lineHeight: 17,
    fontWeight: '700',
  },
  featureSubtitle: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '400',
  },
  suggestionList: {
    marginTop: 14,
    rowGap: 12,
  },
  suggestionCard: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  suggestionAvatar: {
    width: 50.41,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  suggestionAvatarPerson: {
    backgroundColor: '#EEEEEE',
  },
  suggestionAvatarUtility: {
    backgroundColor: '#E0F2F7',
  },
  avatarImage: {
    width: 48,
    height: 48,
    resizeMode: 'cover',
  },
  avatarInitialText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '400',
  },
  utilityAvatarIcon: {
    width: 14.94,
    height: 19.2,
  },
  suggestionBody: {
    flex: 1,
    marginRight: 8,
  },
  suggestionTitle: {
    color: '#1A1D1E',
    fontSize: 15.2,
    fontWeight: '700',
  },
  suggestionMetaRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    height: 20,
    borderRadius: 6,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  badgeText: {
    color: '#6B7280',
    fontSize: 11.2,
    fontWeight: '400',
  },
  suggestionSubtitle: {
    flex: 1,
    color: '#6B7280',
    fontSize: 12.8,
    fontWeight: '400',
  },
  actionCircle: {
    width: 33.6,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F2F4F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionComment: {
    width: 11.2,
    height: 14.4,
  },
  actionChevron: {
    width: 11.2,
    height: 14.4,
  },
});
