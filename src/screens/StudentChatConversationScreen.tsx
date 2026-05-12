import React, { useState, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  chatId: string;
  onBack: () => void;
};

// Modern cyan outline icons
const modernIcons = {
  plusCircle: require('../assets/chat/student/icons/modern/plus_circle.png'),
  imagePicture: require('../assets/chat/student/icons/modern/image_picture.png'),
  textDocument: require('../assets/chat/student/icons/modern/text_document.png'),
  videoPlay: require('../assets/chat/student/icons/modern/video_play.png'),
  sendButton: require('../assets/chat/student/icons/modern/send_button.png'),
  inputBg: require('../assets/chat/student/icons/modern/input_bg.png'),
};

const assets = {
  back: require('../assets/chat/student/images/conversation/back_icon.png'),
  more: require('../assets/chat/student/images/conversation/more_icon.png'),
  call: require('../assets/chat/student/images/conversation/call_icon.png'),
  video: require('../assets/chat/student/images/conversation/video_icon.png'),
  photo1: require('../assets/chat/student/images/conversation/photo_1.png'),
  photo2: require('../assets/chat/student/images/conversation/photo_2.png'),
  photo3: require('../assets/chat/student/images/conversation/photo_3.png'),
  photo4: require('../assets/chat/student/images/conversation/photo_4.png'),
  photo5: require('../assets/chat/student/images/conversation/photo_5.png'),
  photo6: require('../assets/chat/student/images/conversation/photo_6.png'),
};

const photoAssets = [assets.photo1, assets.photo2, assets.photo3, assets.photo4, assets.photo5, assets.photo6];

const avatarColors: Record<string, string> = {
  teal: '#D8F3FB',
  blue: '#DBEAFE',
  pink: '#FCE7F3',
  gray: '#E5E7EB',
};

const INITIAL_MESSAGES = [
  {
    id: 'msg-1',
    type: 'text',
    content: 'Đây là file tài liệu của lớp sinh học hôm nay',
    isMine: false,
    avatarInitial: 'T',
    avatarTone: 'teal',
  },
  {
    id: 'msg-2',
    type: 'file',
    content: 'Introduction to force',
    isMine: false,
    attachmentType: 'pdf',
    avatarInitial: 'T',
    avatarTone: 'teal',
  },
  {
    id: 'msg-3',
    type: 'file',
    content: 'Work and energy',
    isMine: false,
    attachmentType: 'gdocs',
    avatarInitial: 'T',
    avatarTone: 'teal',
  },
  {
    id: 'msg-4',
    type: 'text',
    content: 'Oke cảm ơn bạn',
    isMine: true,
  },
  {
    id: 'msg-5',
    type: 'text',
    content: 'Cái này mình vừa kiếm được ở trên mạng nè',
    isMine: false,
    avatarInitial: 'M',
    avatarTone: 'blue',
  },
];

const CHAT_TITLES: Record<string, string> = {
  'chat-class-main': 'Lớp 12A3',
  'chat-class-chem': 'Lớp Hóa 12A3',
  'chat-confession': 'Confession Trường',
  'chat-direct-dat': 'Nguyễn Lê Tiến Đạt',
};

export function StudentChatConversationScreen({ chatId, onBack }: Props) {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [showPhotos, setShowPhotos] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const conversationTitle = CHAT_TITLES[chatId] || 'Lớp 12A3';

  const handleSend = () => {
    if (!messageText.trim()) return;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const newMessage = {
      id: `msg-${Date.now()}`,
      type: 'text',
      content: messageText.trim(),
      isMine: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageText('');

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const togglePhotos = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowPhotos(prev => !prev);
  };

  const renderMessage = (message: typeof INITIAL_MESSAGES[0]) => {
    if (message.isMine) {
      return (
        <View key={message.id} style={styles.myMessageContainer}>
          <View style={styles.myMessageBubble}>
            <Text style={styles.myMessageText}>{message.content}</Text>
          </View>
        </View>
      );
    }

    const avatarBgColor = avatarColors[message.avatarTone] || '#E5E7EB';

    if (message.type === 'file') {
      return (
        <View key={message.id} style={styles.otherMessageContainer}>
          <View style={[styles.avatar, { backgroundColor: avatarBgColor }]}>
            <Text style={styles.avatarText}>{message.avatarInitial}</Text>
          </View>
          <View style={styles.fileMessageBubble}>
            <Image
              source={message.attachmentType === 'pdf' ? assets.photo1 : assets.photo2}
              style={styles.fileIcon}
            />
            <Text style={styles.fileNameText}>{message.content}</Text>
          </View>
        </View>
      );
    }

    return (
      <View key={message.id} style={styles.otherMessageContainer}>
        <View style={[styles.avatar, { backgroundColor: avatarBgColor }]}>
          <Text style={styles.avatarText}>{message.avatarInitial}</Text>
        </View>
        <View style={styles.otherMessageBubble}>
          <Text style={styles.otherMessageText}>{message.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.screen}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={8} style={styles.backButton}>
          <Image source={assets.back} style={styles.backIcon} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{conversationTitle}</Text>
          <Text style={styles.headerSubtitle}>Cuộc thảo luận</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable hitSlop={8} style={styles.headerActionBtn}>
            <Image source={assets.call} style={styles.headerActionIcon} />
          </Pressable>
          <Pressable hitSlop={8} style={styles.headerActionBtn}>
            <Image source={assets.video} style={styles.headerActionIcon} />
          </Pressable>
          <Pressable hitSlop={8} style={styles.headerActionBtn}>
            <Image source={assets.more} style={styles.moreIcon} />
          </Pressable>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesScroll}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: false })}
      >
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Photos Section */}
      {showPhotos ? (
        <View style={styles.photosSection}>
          <Text style={styles.photosTitle}>All Photos</Text>
          <View style={styles.photosGrid}>
            {photoAssets.map((photo, index) => (
              <Image
                key={`photo-${index}`}
                source={photo}
                style={styles.photoItem}
              />
            ))}
          </View>
        </View>
      ) : null}

      {/* Modern Input Area */}
      <View style={styles.inputArea}>
        {/* Plus Circle Icon */}
        <Pressable style={styles.inputIconButton}>
          <Image source={modernIcons.plusCircle} style={styles.plusIcon} />
        </Pressable>

        {/* Rounded Pill Input Container */}
        <View style={styles.inputPillContainer}>
          <TextInput
            value={messageText}
            onChangeText={setMessageText}
            placeholder="Nhập nội dung"
            placeholderTextColor="#9CA3AF"
            style={styles.textInput}
            multiline
            maxLength={500}
          />
          
          {/* Inline Action Icons */}
          <View style={styles.inlineActions}>
            <Pressable style={styles.inlineIconButton} onPress={togglePhotos}>
              <Image source={modernIcons.imagePicture} style={styles.inlineIcon} />
            </Pressable>
            <Pressable style={styles.inlineIconButton}>
              <Image source={modernIcons.videoPlay} style={styles.inlineIcon} />
            </Pressable>
            <Pressable style={styles.inlineIconButton}>
              <Image source={modernIcons.textDocument} style={styles.inlineIcon} />
            </Pressable>
          </View>
        </View>

        {/* Send Button */}
        <Pressable onPress={handleSend} style={styles.sendIconButton}>
          <Image source={modernIcons.sendButton} style={styles.sendIcon} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    height: 107,
    paddingTop: 44,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    width: 33,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: 33,
    height: 40,
    resizeMode: 'contain',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 28,
  },
  headerSubtitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 0.45)',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionBtn: {
    width: 25,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerActionIcon: {
    width: 25,
    height: 16,
    resizeMode: 'contain',
  },
  moreIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 20,
  },
  otherMessageContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#374151',
  },
  otherMessageBubble: {
    backgroundColor: 'rgba(68, 97, 84, 0.1)',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    maxWidth: 258,
  },
  otherMessageText: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
  },
  fileMessageBubble: {
    backgroundColor: 'rgba(68, 97, 84, 0.1)',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: 217,
    marginLeft: 32,
  },
  fileIcon: {
    width: 25,
    height: 27,
    resizeMode: 'contain',
  },
  fileNameText: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    lineHeight: 18,
    marginLeft: 12,
  },
  myMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  myMessageBubble: {
    backgroundColor: '#63BAD5',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    maxWidth: 150,
  },
  myMessageText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 18,
  },
  photosSection: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 8,
    paddingBottom: 16,
  },
  photosTitle: {
    fontSize: 14,
    color: '#000000',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
  },
  photoItem: {
    width: 126,
    height: 127,
    margin: 2,
    borderRadius: 8,
  },
  // Modern Input Area Styles
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F9F9F9',
    gap: 8,
  },
  inputIconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  inputPillContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F7',
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 4,
    minHeight: 50,
    borderWidth: 1,
    borderColor: 'rgba(99, 186, 213, 0.3)',
    shadowColor: '#63BAD5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#111827',
    padding: 0,
    paddingVertical: 8,
  },
  inlineActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  inlineIconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  sendIconButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
