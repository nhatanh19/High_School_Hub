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
  NotificationGroup,
  NotificationItem,
  NotificationScreenData,
  NotificationTabKey,
} from '../models/notification';

type Props = {
  data: NotificationScreenData;
  onBack: () => void;
  onOpenSearch?: () => void;
};

const assets = {
  chalkboardUser: require('../assets/notifications/icons/chalkboard_user.png'),
  chartLine: require('../assets/notifications/icons/chart_line.png'),
  chevronLeft: require('../assets/notifications/icons/chevron_left.png'),
  flag: require('../assets/notifications/icons/flag.png'),
  gear: require('../assets/notifications/icons/gear.png'),
  highlightBorder: require('../assets/notifications/icons/highlight_border_primary.png'),
  magnifyingGlass: require('../assets/notifications/icons/magnifying_glass.png'),
  moneyBillWave: require('../assets/notifications/icons/money_bill_wave.png'),
  penNib: require('../assets/notifications/icons/pen_nib.png'),
  triangleExclamation: require('../assets/notifications/icons/triangle_exclamation.png'),
};

const iconSourceBySymbol: Record<string, number> = {
  '⚑': assets.flag,
  '⚙': assets.gear,
  '⚠': assets.triangleExclamation,
  '◉': assets.moneyBillWave,
  '⌁': assets.chartLine,
  '▣': assets.chalkboardUser,
  '✎': assets.penNib,
};

export function NotificationScreenContent({
  data,
  onBack,
  onOpenSearch,
}: Props) {
  const [activeTab, setActiveTab] = useState<NotificationTabKey>('all');
  const [groups, setGroups] = useState<NotificationGroup[]>(data.groups);

  useEffect(() => {
    setGroups(data.groups);
    setActiveTab('all');
  }, [data]);

  const filteredGroups = groups
    .map(group => ({
      ...group,
      items:
        activeTab === 'all'
          ? group.items
          : group.items.filter(item => item.isUnread),
    }))
    .filter(group => group.items.length > 0);

  const markAllAsRead = () => {
    setGroups(currentGroups =>
      currentGroups.map(group => ({
        ...group,
        items: group.items.map(item => ({ ...item, isUnread: false })),
      })),
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerCluster}>
          <View style={styles.headerRow}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backWrap}>
              <Image source={assets.chevronLeft} style={styles.backIcon} />
            </Pressable>

            <Text style={styles.title}>{VI_STRINGS.notificationsTitle}</Text>

            <Pressable
              hitSlop={8}
              onPress={markAllAsRead}
              style={styles.markReadWrap}
            >
              <Text style={styles.markReadText}>
                {VI_STRINGS.notificationsMarkAllRead}
              </Text>
            </Pressable>

            <Pressable
              hitSlop={8}
              onPress={onOpenSearch}
              style={styles.searchWrap}
            >
              <Image
                source={assets.magnifyingGlass}
                style={styles.searchIcon}
              />
            </Pressable>
          </View>

          <View style={styles.tabContainer}>
            <View style={styles.tabRow}>
              <TabButton
                active={activeTab === 'all'}
                label={VI_STRINGS.notificationsTabAll}
                onPress={() => setActiveTab('all')}
              />

              <TabButton
                active={activeTab === 'unread'}
                label={VI_STRINGS.notificationsTabUnread}
                onPress={() => setActiveTab('unread')}
              />
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {filteredGroups.map(group => (
            <View key={group.id} style={styles.groupBlock}>
              <Text style={styles.groupTitle}>{resolveGroupTitle(group)}</Text>

              <View style={styles.groupList}>
                {group.items.map(item => (
                  <NotificationCard item={item} key={item.id} />
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function resolveGroupTitle(group: NotificationGroup) {
  if (group.id === 'today') {
    return 'Hôm nay';
  }

  if (group.id === 'yesterday') {
    return 'Hôm qua';
  }

  if (group.id === 'older') {
    return 'Cũ hơn';
  }

  return group.title;
}

type TabButtonProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function TabButton({ active, label, onPress }: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active ? styles.tabButtonActive : null]}
    >
      <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>
        {label}
      </Text>
    </Pressable>
  );
}

function NotificationCard({ item }: { item: NotificationItem }) {
  const iconSource = iconSourceBySymbol[item.icon];
  const isHighlight = item.variant === 'highlight';

  return (
    <View
      style={[styles.itemCard, isHighlight ? styles.itemCardHighlight : null]}
    >
      {isHighlight ? (
        <Image source={assets.highlightBorder} style={styles.highlightBorder} />
      ) : null}

      <View style={[styles.itemIconWrap, { backgroundColor: item.iconTint }]}>
        {iconSource ? (
          <Image source={iconSource} style={styles.itemIconImage} />
        ) : (
          <Text style={[styles.itemIconFallback, { color: item.iconColor }]}>
            {item.icon}
          </Text>
        )}
      </View>

      <View style={styles.itemBody}>
        <View style={styles.itemHeader}>
          <Text numberOfLines={2} style={styles.itemTitle}>
            {item.title}
          </Text>
          <Text style={styles.itemTime}>{item.timeLabel}</Text>
        </View>

        <Text numberOfLines={2} style={styles.itemDescription}>
          {item.description}
        </Text>
      </View>

      {item.isUnread ? <View style={styles.unreadDot} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF2F5',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerCluster: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingTop: 34,
  },
  headerRow: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backWrap: {
    width: 30,
    height: 30,
    justifyContent: 'center',
  },
  backIcon: {
    width: 14.94,
    height: 19.2,
    resizeMode: 'contain',
  },
  title: {
    marginLeft: 12,
    color: '#1F2937',
    fontSize: 20,
    fontWeight: '700',
  },
  markReadWrap: {
    marginLeft: 'auto',
    maxWidth: 120,
    marginRight: 12,
  },
  markReadText: {
    color: '#63BAD5',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
  },
  searchWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    width: 15.56,
    height: 20,
    resizeMode: 'contain',
  },
  tabContainer: {
    marginTop: 4,
    height: 46,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    justifyContent: 'center',
  },
  tabRow: {
    flexDirection: 'row',
    columnGap: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  tabButton: {
    minWidth: 70,
    height: 32.1,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  tabButtonActive: {
    backgroundColor: '#63BAD5',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 3,
  },
  tabLabel: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  groupBlock: {
    marginBottom: 14,
  },
  groupTitle: {
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  groupList: {
    rowGap: 12,
  },
  itemCard: {
    position: 'relative',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 15,
    overflow: 'hidden',
  },
  itemCardHighlight: {
    backgroundColor: 'rgba(99, 186, 213, 0.05)',
  },
  highlightBorder: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    opacity: 0.55,
  },
  itemIconWrap: {
    width: 50.2,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  itemIconImage: {
    width: 15.56,
    height: 20,
    resizeMode: 'contain',
  },
  itemIconFallback: {
    fontSize: 20,
    fontWeight: '700',
  },
  itemBody: {
    flex: 1,
    minHeight: 58,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  itemTitle: {
    flex: 1,
    color: '#1F2937',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 19.5,
    paddingRight: 8,
  },
  itemTime: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  itemDescription: {
    marginTop: 4,
    color: '#6B7280',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18.2,
    paddingRight: 8,
  },
  unreadDot: {
    position: 'absolute',
    right: 14,
    top: 14,
    width: 8.36,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
});
