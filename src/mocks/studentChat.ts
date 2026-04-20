export type StudentChatItem = {
  avatarInitial: string;
  avatarTone: 'teal' | 'blue' | 'pink' | 'gray';
  id: string;
  lastMessage: string;
  timeLabel: string;
  title: string;
  unread: boolean;
};

export const studentChatItems: StudentChatItem[] = [
  {
    id: 'chat-class-main',
    title: 'Lớp 12A3 ❤️',
    lastMessage: 'Thảo: Mai có kiểm tra không mng?',
    timeLabel: '8:34 am',
    unread: true,
    avatarInitial: '12',
    avatarTone: 'teal',
  },
  {
    id: 'chat-class-chem',
    title: 'Lớp Hóa 12A3',
    lastMessage: 'Cô giáo: Nhớ nộp bài tập nhé các em',
    timeLabel: '8:30 am',
    unread: true,
    avatarInitial: 'H',
    avatarTone: 'blue',
  },
  {
    id: 'chat-confession',
    title: 'Confession Trường',
    lastMessage: 'Bạn: Mình muốn gửi một bài ẩn danh...',
    timeLabel: 'Hôm qua',
    unread: false,
    avatarInitial: 'C',
    avatarTone: 'pink',
  },
  {
    id: 'chat-direct-dat',
    title: 'Nguyễn Lê Tiến Đạt',
    lastMessage: 'Bạn: Mai bạn tới lấy áo nha.',
    timeLabel: 'CN',
    unread: false,
    avatarInitial: 'Đ',
    avatarTone: 'gray',
  },
];
