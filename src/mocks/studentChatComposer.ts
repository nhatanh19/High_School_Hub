export type ChatRecipient = {
  avatarKey:
    | 'avatarGroup'
    | 'avatarTeacher'
    | 'avatarMonitor'
    | 'avatarDat';
  avatarShape: 'plain' | 'round';
  id: string;
  name: string;
  subtitle: string;
  type: 'group' | 'student' | 'teacher';
};

export const studentChatRecipients: ChatRecipient[] = [
  {
    id: 'group-12a3',
    type: 'group',
    name: 'Lớp XINH 12A3 ❤️',
    subtitle: 'Nhóm lớp',
    avatarKey: 'avatarGroup',
    avatarShape: 'plain',
  },
  {
    id: 'teacher-hanh',
    type: 'teacher',
    name: 'Cô chủ nhiệm 🌻',
    subtitle: 'Giáo viên',
    avatarKey: 'avatarTeacher',
    avatarShape: 'round',
  },
  {
    id: 'student-loptruong',
    type: 'student',
    name: 'Lớp trưởng',
    subtitle: 'Học sinh',
    avatarKey: 'avatarMonitor',
    avatarShape: 'round',
  },
  {
    id: 'student-tiendat',
    type: 'student',
    name: 'Tiến Đạt',
    subtitle: 'Học sinh',
    avatarKey: 'avatarDat',
    avatarShape: 'round',
  },
  {
    id: 'student-thuhoa',
    type: 'student',
    name: 'Thu Hòa',
    subtitle: 'Học sinh',
    avatarKey: 'avatarMonitor',
    avatarShape: 'round',
  },
];
