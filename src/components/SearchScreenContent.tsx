import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {VI_STRINGS} from '../constants/vi';
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

export function SearchScreenContent({data, onBack}: Props) {
  const [recentItems, setRecentItems] = useState<SearchRecentItem[]>(data.recentItems);

  useEffect(() => {
    setRecentItems(data.recentItems);
  }, [data]);

  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backWrap}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>
            <Text style={styles.title}>{VI_STRINGS.searchTitle}</Text>
          </View>

          <View style={styles.searchInputWrap}>
            <Text style={styles.searchIcon}>⌕</Text>
            <Text style={styles.searchPlaceholder}>{data.placeholder}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{VI_STRINGS.searchRecent}</Text>
            <Pressable hitSlop={8} onPress={() => setRecentItems([])}>
              <Text style={styles.sectionAction}>{VI_STRINGS.searchClearAll}</Text>
            </Pressable>
          </View>

          <View style={styles.recentWrap}>
            {recentItems.map(item => (
              <RecentChip item={item} key={item.id} />
            ))}
          </View>

          <View style={styles.sectionHeaderAlt}>
            <Text style={styles.sectionTitle}>{VI_STRINGS.searchFeatured}</Text>
            <Text style={styles.sectionAction}>{VI_STRINGS.searchAll}</Text>
          </View>

          <View style={styles.featureGrid}>
            {data.features.map(item => (
              <FeatureCard item={item} key={item.id} />
            ))}
          </View>

          <Text style={styles.sectionTitle}>{VI_STRINGS.searchQuickSuggestions}</Text>
          <View style={styles.suggestionList}>
            {data.suggestions.map(item => (
              <SuggestionCard item={item} key={item.id} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

type RecentChipProps = {
  item: SearchRecentItem;
};

function RecentChip({item}: RecentChipProps) {
  return (
    <View style={styles.recentChip}>
      <Text style={styles.recentClock}>◔</Text>
      <Text style={styles.recentText}>{item.label}</Text>
    </View>
  );
}

type FeatureCardProps = {
  item: SearchFeatureItem;
};

function FeatureCard({item}: FeatureCardProps) {
  return (
    <View style={styles.featureCard}>
      <View style={[styles.featureIconWrap, {backgroundColor: item.tint}]}>
        <Text style={[styles.featureIcon, {color: item.iconColor}]}>{item.icon}</Text>
      </View>
      <View style={styles.featureBody}>
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
}

type SuggestionCardProps = {
  item: SearchSuggestionItem;
};

function SuggestionCard({item}: SuggestionCardProps) {
  return (
    <View style={styles.suggestionCard}>
      <View style={[styles.suggestionAvatar, {backgroundColor: item.tint}]}>
        <Text style={styles.suggestionAvatarText}>{item.avatarLabel}</Text>
      </View>
      <View style={styles.suggestionBody}>
        <Text style={styles.suggestionTitle}>{item.title}</Text>
        <View style={styles.suggestionMetaRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
          <Text style={styles.suggestionSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <View style={styles.suggestionActionCircle}>
        <Text style={[styles.suggestionActionIcon, {color: item.iconTint}]}>{item.icon}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EFF3F8',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#BFC9D6',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.14,
    shadowRadius: 14,
    elevation: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backWrap: {
    marginRight: 10,
  },
  backIcon: {
    color: '#232A33',
    fontSize: 34,
    lineHeight: 34,
    fontWeight: '400',
  },
  title: {
    color: '#232A33',
    fontSize: 24,
    fontWeight: '900',
  },
  searchInputWrap: {
    marginTop: 22,
    minHeight: 54,
    borderRadius: 18,
    backgroundColor: '#F1F5FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    color: '#67BCDB',
    fontSize: 24,
    marginRight: 10,
    lineHeight: 24,
  },
  searchPlaceholder: {
    color: '#8A8F97',
    fontSize: 16,
    fontWeight: '500',
    flexShrink: 1,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionHeaderAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#20262E',
    fontSize: 18,
    fontWeight: '900',
  },
  sectionAction: {
    color: '#727D93',
    fontSize: 14,
    fontWeight: '500',
  },
  recentWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recentChip: {
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    shadowColor: '#C9D3DE',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  recentClock: {
    color: '#98A4B6',
    fontSize: 18,
    marginRight: 8,
  },
  recentText: {
    color: '#707A8F',
    fontSize: 15,
    fontWeight: '500',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },
  featureCard: {
    width: '47.5%',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#C9D3DE',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  featureIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 24,
  },
  featureBody: {
    marginTop: 12,
  },
  featureTitle: {
    color: '#22272E',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  featureSubtitle: {
    color: '#717D91',
    fontSize: 13,
    marginTop: 4,
  },
  suggestionList: {
    marginTop: 10,
    gap: 12,
  },
  suggestionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 14,
    shadowColor: '#C9D3DE',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 3,
  },
  suggestionAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  suggestionAvatarText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  suggestionBody: {
    flex: 1,
  },
  suggestionTitle: {
    color: '#20262E',
    fontSize: 16,
    fontWeight: '900',
  },
  suggestionMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#F2F4F7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 8,
  },
  badgeText: {
    color: '#6D7687',
    fontSize: 12,
    fontWeight: '500',
  },
  suggestionSubtitle: {
    color: '#737E91',
    fontSize: 14,
    fontWeight: '500',
  },
  suggestionActionCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F3F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  suggestionActionIcon: {
    fontSize: 18,
    fontWeight: '700',
  },
});
