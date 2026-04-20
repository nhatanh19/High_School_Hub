import React, { useEffect, useMemo, useState } from 'react';
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
import { studentChatRecipients } from '../mocks/studentChatComposer';

type Props = {
  onBack: () => void;
  onOpenClass: () => void;
  onOpenHome: () => void;
  onOpenProfile: () => void;
};

const assets = {
  avatarDat: require('../assets/chat/student/images/avatar_dat.png'),
  avatarGroup: require('../assets/chat/student/images/avatar_group.png'),
  avatarMonitor: require('../assets/chat/student/images/avatar_monitor.png'),
  avatarTeacher: require('../assets/chat/student/images/avatar_teacher.png'),
  back: require('../assets/chat/student/icons/back.png'),
  check: require('../assets/chat/student/icons/check.png'),
  close: require('../assets/chat/student/icons/close.png'),
  selectedRowMark: require('../assets/chat/student/icons/selected_row_mark.png'),
  search: require('../assets/chat/student/icons/search.png'),
};

const avatarByKey = {
  avatarDat: assets.avatarDat,
  avatarGroup: assets.avatarGroup,
  avatarMonitor: assets.avatarMonitor,
  avatarTeacher: assets.avatarTeacher,
} as const;

export function StudentNewChatScreen({
  onBack,
  onOpenClass,
  onOpenHome,
  onOpenProfile,
}: Props) {
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const selectedRecipients = useMemo(
    () => studentChatRecipients.filter(item => selectedIds.includes(item.id)),
    [selectedIds],
  );

  const filteredRecipients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return studentChatRecipients;
    }

    return studentChatRecipients.filter(
      item =>
        item.name.toLowerCase().includes(normalized) ||
        item.subtitle.toLowerCase().includes(normalized),
    );
  }, [query]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timer = setTimeout(() => setFeedback(null), 2200);
    return () => clearTimeout(timer);
  }, [feedback]);

  const toggleRecipient = (id: string) => {
    setSelectedIds(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id],
    );
  };

  const handleContinue = () => {
    if (!selectedRecipients.length) {
      setFeedback('Vui lòng chọn ít nhất 1 người nhận');
      return;
    }

    setFeedback(`Đã tạo cuộc trò chuyện với ${selectedRecipients.length} người`);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerRow}>
        <Pressable hitSlop={8} onPress={onBack} style={styles.backButton}>
          <Image source={assets.back} style={styles.backIcon} />
        </Pressable>
        <Text style={styles.headerTitle}>New message</Text>
        <Pressable hitSlop={8} onPress={handleContinue} style={styles.nextButton}>
          <Text
            style={[
              styles.nextText,
              selectedRecipients.length ? styles.nextTextActive : null,
            ]}
          >
            Tiếp
          </Text>
        </Pressable>
      </View>

      <View style={styles.searchWrap}>
        <TextInput
          onChangeText={setQuery}
          placeholder="Gửi đến: Gõ tên hoặc group"
          placeholderTextColor="#757575"
          style={styles.searchInput}
          value={query}
        />
        <Image source={assets.search} style={styles.searchIcon} />
      </View>

      {feedback ? (
        <View style={styles.feedbackWrap}>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>
      ) : null}

      <ScrollView
        bounces={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {selectedRecipients.length ? (
          <>
            <Text style={styles.sectionTitle}>
              {selectedRecipients.length === 1
                ? 'Đã chọn 1 người'
                : `Đã chọn ${selectedRecipients.length} người`}
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.selectedRow}
            >
              {selectedRecipients.map(item => (
                <View key={`chip-${item.id}`} style={styles.selectedAvatarItem}>
                  <View
                    style={[
                      styles.selectedAvatar,
                      item.avatarShape === 'round'
                        ? styles.selectedAvatarRound
                        : null,
                    ]}
                  >
                    <Image
                      source={avatarByKey[item.avatarKey]}
                      style={styles.selectedAvatarImage}
                    />
                  </View>
                  <Text numberOfLines={1} style={styles.selectedName}>
                    {item.name}
                  </Text>
                  <Pressable
                    hitSlop={6}
                    onPress={() => toggleRecipient(item.id)}
                    style={styles.removeButton}
                  >
                    <Image source={assets.close} style={styles.removeIcon} />
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Chưa có người nhận</Text>
            <Text style={styles.emptySubtitle}>
              Chọn một hoặc nhiều học sinh/giáo viên để bắt đầu cuộc trò chuyện mới.
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Gợi ý</Text>
        {filteredRecipients.map(item => {
          const selected = selectedIds.includes(item.id);
          return (
            <Pressable
              key={item.id}
              onPress={() => toggleRecipient(item.id)}
              style={styles.itemRow}
            >
              <View
                style={[
                  styles.itemAvatar,
                  item.avatarShape === 'round' ? styles.itemAvatarRound : null,
                ]}
              >
                <Image
                  source={avatarByKey[item.avatarKey]}
                  style={styles.itemAvatarImage}
                />
              </View>

              <View style={[styles.itemInfo, selected ? styles.itemInfoSelected : null]}>
                <Text numberOfLines={1} style={styles.itemName}>
                  {item.name}
                </Text>
                {selected ? <View style={styles.itemSubtitleSpacer} /> : <Text style={styles.itemSubtitle}>{item.subtitle}</Text>}
              </View>

              {selected ? (
                <Image source={assets.selectedRowMark} style={styles.selectedRowMark} />
              ) : (
                <View style={styles.checkPlaceholder} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <StudentBottomNav
        activeTab="chat"
        onOpenChat={onBack}
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
    height: 42,
    marginTop: 6,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 24,
    height: 28,
    justifyContent: 'center',
  },
  backIcon: {
    width: 14,
    height: 25,
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#111827',
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
  },
  nextButton: {
    minWidth: 38,
    alignItems: 'flex-end',
  },
  nextText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  nextTextActive: {
    color: '#111827',
  },
  searchWrap: {
    height: 44,
    marginTop: 12,
    marginHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    paddingVertical: 0,
    paddingRight: 10,
  },
  searchIcon: {
    width: 12.4531,
    height: 16,
    resizeMode: 'contain',
  },
  feedbackWrap: {
    marginTop: 8,
    marginHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    borderWidth: 1,
    borderColor: '#BAE6FD',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  feedbackText: {
    color: '#0C4A6E',
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 118,
  },
  sectionTitle: {
    marginLeft: 20,
    marginBottom: 8,
    color: '#757575',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  emptyState: {
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  emptyTitle: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  emptySubtitle: {
    marginTop: 3,
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  selectedRow: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    columnGap: 12,
  },
  selectedAvatarItem: {
    width: 62,
    position: 'relative',
  },
  selectedAvatar: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  selectedAvatarRound: {
    borderRadius: 999,
  },
  selectedAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  selectedName: {
    marginTop: 5,
    color: '#111827',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 14,
  },
  removeButton: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 21,
    height: 21,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    width: 10,
    height: 13.34,
    resizeMode: 'contain',
  },
  itemRow: {
    height: 85,
    borderTopWidth: 1,
    borderTopColor: '#F9FAFB',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemAvatar: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  itemAvatarRound: {
    borderRadius: 999,
  },
  itemAvatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    paddingRight: 8,
  },
  itemInfoSelected: {
    justifyContent: 'center',
  },
  itemName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  itemSubtitle: {
    marginTop: 2,
    color: '#9CA3AF',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  itemSubtitleSpacer: {
    height: 21,
  },
  checkIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  selectedRowMark: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  checkPlaceholder: {
    width: 20,
    height: 20,
  },
});
