import type { ChatConversation } from '../models/studentChatConversation';

const DEFAULT_MESSAGES = [
  {
    id: 'msg-1',
    type: 'text' as const,
    content: 'Đây là file tài liệu của lớp sinh học hôm nay',
    isMine: false,
    avatarInitial: 'T',
    avatarTone: 'teal' as const,
  },
  {
    id: 'msg-2',
    type: 'file' as const,
    content: 'Introduction to force',
    isMine: false,
    attachment: {
      type: 'pdf' as const,
      name: 'Introduction to force.pdf',
    },
    avatarInitial: 'T',
    avatarTone: 'teal' as const,
  },
  {
    id: 'msg-3',
    type: 'file' as const,
    content: 'Work and energy',
    isMine: false,
    attachment: {
      type: 'gdocs' as const,
      name: 'Work and energy',
    },
    avatarInitial: 'T',
    avatarTone: 'teal' as const,
  },
  {
    id: 'msg-4',
    type: 'text' as const,
    content: 'Oke cảm ơn bạn',
    isMine: true,
  },
  {
    id: 'msg-5',
    type: 'text' as const,
    content: 'Cái này mình vừa kiếm được ở trên mạng nè',
    isMine: false,
    avatarInitial: 'M',
    avatarTone: 'blue' as const,
  },
];

const DEFAULT_PHOTOS = [
  'photo_1',
  'photo_2',
  'photo_3',
  'photo_4',
  'photo_5',
  'photo_6',
];

export const chatConversations: Record<string, ChatConversation> = {
  'chat-class-main': {
    id: 'chat-class-main',
    title: 'Lớp 12A3',
    subtitle: 'Cuộc thảo luận',
    messages: DEFAULT_MESSAGES,
    photos: DEFAULT_PHOTOS,
  },
  'chat-class-chem': {
    id: 'chat-class-chem',
    title: 'Lớp Hóa 12A3',
    subtitle: 'Cuộc thảo luận',
    messages: DEFAULT_MESSAGES,
    photos: DEFAULT_PHOTOS,
  },
  'chat-confession': {
    id: 'chat-confession',
    title: 'Confession Trường',
    subtitle: 'Cuộc thảo luận',
    messages: DEFAULT_MESSAGES,
    photos: DEFAULT_PHOTOS,
  },
  'chat-direct-dat': {
    id: 'chat-direct-dat',
    title: 'Nguyễn Lê Tiến Đạt',
    subtitle: 'Cuộc thảo luận',
    messages: DEFAULT_MESSAGES,
    photos: DEFAULT_PHOTOS,
  },
};
