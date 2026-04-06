import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {VI_STRINGS} from '../constants/vi';
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

export function NotificationScreenContent({data, onBack, onOpenSearch}: Props) {
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
        activeTab === 'all' ? group.items : group.items.filter(item => item.isUnread),
    }))
    .filter(group => group.items.length > 0);

  const markAllAsRead = () => {
    setGroups(currentGroups =>
      currentGroups.map(group => ({
        ...group,
        items: group.items.map(item => ({...item, isUnread: false})),
      })),
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Pressable hitSlop={8} onPress={onBack} style={styles.backWrap}>
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.title}>{VI_STRINGS.notificationsTitle}</Text>

            <Pressable hitSlop={8} onPress={markAllAsRead} style={styles.markReadWrap}>
              <Text style={styles.markReadText}>{VI_STRINGS.notificationsMarkAllRead}</Text>
            </Pressable>

            <Pressable hitSlop={8} onPress={onOpenSearch} style={styles.searchWrap}>
              <Text style={styles.searchIcon}>⌕</Text>
            </Pressable>
          </View>

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

        <View style={styles.body}>
          {filteredGroups.map(group => (
            <View key={group.id} style={styles.groupBlock}>
              <Text style={styles.groupTitle}>{group.title}</Text>
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

type TabButtonProps = {
  active: boolean;
  label: string;
  onPress: () => void;
};

function TabButton({active, label, onPress}: TabButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tabButton, active ? styles.tabButtonActive : null]}>
      <Text style={[styles.tabLabel, active ? styles.tabLabelActive : null]}>{label}</Text>
    </Pressable>
  );
}

type NotificationCardProps = {
  item: NotificationItem;
};

function NotificationCard({item}: NotificationCardProps) {
  const isHighlight = item.variant === 'highlight';

  return (
    <View style={styles.itemShell}>
      {isHighlight ? (
        <View style={[styles.accentBar, {backgroundColor: item.accentColor}]} />
      ) : null}
      <View style={[styles.itemCard, isHighlight ? styles.itemCardHighlight : null]}>
        <View style={[styles.itemIconWrap, {backgroundColor: item.iconTint}]}>
          <Text style={[styles.itemIcon, {color: item.iconColor}]}>{item.icon}</Text>
        </View>

        <View style={styles.itemBody}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>

        <View style={styles.itemMeta}>
          {item.isUnread ? <View style={styles.unreadDot} /> : null}
          <Text style={styles.itemTime}>{item.timeLabel}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EEF3F8',
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backWrap: {
    marginRight: 10,
  },
  backIcon: {
    color: '#1F2935',
    fontSize: 34,
    lineHeight: 34,
    fontWeight: '400',
  },
  title: {
    color: '#1C2430',
    fontSize: 24,
    fontWeight: '900',
  },
  markReadWrap: {
    marginLeft: 'auto',
    marginRight: 10,
    maxWidth: 128,
  },
  markReadText: {
    color: '#63BAD9',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  searchWrap: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchIcon: {
    color: '#283142',
    fontSize: 26,
    lineHeight: 26,
  },
  tabRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  tabButton: {
    minWidth: 92,
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: '#F1F3F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#69BFDE',
    shadowColor: '#90D6EC',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 4,
  },
  tabLabel: {
    color: '#6F798B',
    fontSize: 15,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  body: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 32,
  },
  groupBlock: {
    marginBottom: 18,
  },
  groupTitle: {
    color: '#6C7486',
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 12,
    letterSpacing: 0.4,
  },
  groupList: {
    gap: 12,
  },
  itemShell: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  accentBar: {
    width: 5,
    borderRadius: 4,
    marginRight: 8,
  },
  itemCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 14,
  },
  itemCardHighlight: {
    backgroundColor: '#F0FAFD',
  },
  itemIconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemIcon: {
    fontSize: 22,
    fontWeight: '700',
  },
  itemBody: {
    flex: 1,
    paddingRight: 8,
  },
  itemTitle: {
    color: '#212A37',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '900',
  },
  itemDescription: {
    color: '#6F7A8E',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
  },
  itemMeta: {
    width: 58,
    alignItems: 'flex-end',
    paddingTop: 2,
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF4B4B',
    marginBottom: 8,
  },
  itemTime: {
    color: '#A0A8B7',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'right',
  },
});
