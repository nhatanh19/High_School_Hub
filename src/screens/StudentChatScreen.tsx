import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StudentBottomNav } from '../components/StudentBottomNav';
import { studentChatItems } from '../mocks/studentChat';

type Props = {
  onOpenCreateNew: () => void;
  onOpenClass: () => void;
  onOpenHome: () => void;
  onOpenProfile: () => void;
  onOpenConversation: (chatId: string) => void;
};

const assets = {
  compose: require('../assets/chat/student/icons/edit.png'),
  microphone: require('../assets/chat/student/icons/microphone.png'),
  search: require('../assets/chat/student/icons/search.png'),
};

export function StudentChatScreen({
  onOpenCreateNew,
  onOpenClass,
  onOpenHome,
  onOpenProfile,
  onOpenConversation,
}: Props) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return studentChatItems;
    }

    return studentChatItems.filter(
      item =>
        item.title.toLowerCase().includes(normalized) ||
        item.lastMessage.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <View style={styles.headerSide} />
        <Text style={styles.headerTitle}>Trò chuyện</Text>
        <Pressable
          hitSlop={8}
          onPress={onOpenCreateNew}
          style={styles.composeButton}
        >
          <Image source={assets.compose} style={styles.composeIcon} />
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <Image source={assets.search} style={styles.searchIcon} />
        <TextInput
          onChangeText={setQuery}
          placeholder="Tìm kiếm tin nhắn..."
          placeholderTextColor="#6B7280"
          style={styles.searchInput}
          value={query}
        />
        <Image source={assets.microphone} style={styles.micIcon} />
      </View>

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.map(item => (
          <Pressable
            key={item.id}
            style={styles.chatItem}
            onPress={() => onOpenConversation(item.id)}
          >
            <View
              style={[
                styles.avatar,
                item.avatarTone === 'teal'
                  ? styles.avatarTeal
                  : item.avatarTone === 'blue'
                    ? styles.avatarBlue
                    : item.avatarTone === 'pink'
                      ? styles.avatarPink
                      : styles.avatarGray,
              ]}
            >
              <Text style={styles.avatarText}>{item.avatarInitial}</Text>
            </View>

            <View style={styles.chatMain}>
              <View style={styles.chatTopRow}>
                <Text numberOfLines={1} style={styles.chatTitle}>
                  {item.title}
                </Text>
                <Text style={[styles.chatTime, item.unread ? styles.chatTimeUnread : null]}>
                  {item.timeLabel}
                </Text>
              </View>

              <View style={styles.chatBottomRow}>
                <Text
                  numberOfLines={1}
                  style={[styles.chatMessage, item.unread ? styles.chatMessageUnread : null]}
                >
                  {item.lastMessage}
                </Text>
                {item.unread ? <View style={styles.unreadDot} /> : null}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <StudentBottomNav
        activeTab="chat"
        onOpenChat={() => undefined}
        onOpenClass={onOpenClass}
        onOpenHome={onOpenHome}
        onOpenProfile={onOpenProfile}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    height: 46,
    marginTop: 4,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerSide: {
    width: 24,
  },
  headerTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  composeButton: {
    width: 20,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  composeIcon: {
    width: 15.5625,
    height: 28,
    resizeMode: 'contain',
  },
  searchWrap: {
    height: 44,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  searchIcon: {
    width: 12.4531,
    height: 16,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 8,
    color: '#111827',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    paddingVertical: 0,
  },
  micIcon: {
    width: 12.4531,
    height: 16,
    resizeMode: 'contain',
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 118,
  },
  chatItem: {
    height: 85,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarTeal: { backgroundColor: '#D8F3FB' },
  avatarBlue: { backgroundColor: '#DBEAFE' },
  avatarPink: { backgroundColor: '#FCE7F3' },
  avatarGray: { backgroundColor: '#E5E7EB' },
  avatarText: {
    color: '#374151',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  chatMain: {
    flex: 1,
    marginLeft: 12,
  },
  chatTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  chatTitle: {
    flex: 1,
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    paddingRight: 8,
  },
  chatTime: {
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  chatTimeUnread: {
    color: '#63BAD5',
    fontWeight: '700',
  },
  chatBottomRow: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatMessage: {
    flex: 1,
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    paddingRight: 8,
  },
  chatMessageUnread: {
    color: '#111827',
    fontWeight: '700',
  },
  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#63BAD5',
    shadowColor: '#BFDBFE',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 1,
  },
});
