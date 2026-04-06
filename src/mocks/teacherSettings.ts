import type {
  SettingsProfile,
  SettingsSection,
  TuitionCard,
} from '../models/settings';

export const teacherSettingsProfile: SettingsProfile = {
  className: 'LỚP 12A9',
  fullName: 'Võ Nguyễn Hoàng An',
  studentCode: 'MSHS: 20248891',
};

export const teacherTuitionCard: TuitionCard = {
  amount: '2.450.000 đ',
  deadline: 'Hạn: 15/10/2024',
  monthLabel: 'Học phí tháng 10',
  status: 'Chờ đóng',
};

export const teacherSettingsSections: SettingsSection[] = [
  {
    id: 'security',
    title: 'BẢO MẬT & ĐĂNG NHẬP',
    items: [
      {
        id: 'profile',
        icon: '◡',
        iconColor: '#0078C8',
        iconTint: '#DDEEFF',
        title: 'Hồ sơ cá nhân',
        type: 'arrow',
      },
      {
        id: 'password',
        icon: '⌂',
        iconColor: '#18A84C',
        iconTint: '#DDF7E7',
        title: 'Đổi mật khẩu',
        type: 'arrow',
      },
      {
        id: 'faceid',
        icon: '◔',
        iconColor: '#8A35FF',
        iconTint: '#F0E0FF',
        title: 'Đăng nhập FaceID / Vân tay',
        type: 'switch',
        value: false,
      },
      {
        id: 'device',
        icon: '▯',
        iconColor: '#586376',
        iconTint: '#F1F3F7',
        title: 'Quản lý thiết bị',
        trailingText: 'iPhone 12',
        type: 'arrow',
      },
    ],
  },
  {
    id: 'system',
    title: 'HỆ THỐNG',
    items: [
      {
        id: 'notifications',
        icon: '◠',
        iconColor: '#FF6B00',
        iconTint: '#FFECD6',
        title: 'Thông báo',
        trailingText: 'Bật',
        type: 'arrow',
      },
      {
        id: 'theme',
        icon: '☼',
        iconColor: '#FFFFFF',
        iconTint: '#3F495D',
        title: 'Giao diện',
        trailingText: 'Sáng',
        type: 'arrow',
      },
      {
        id: 'language',
        icon: '◎',
        iconColor: '#0078C8',
        iconTint: '#DDEEFF',
        title: 'Ngôn ngữ',
        trailingText: 'Tiếng Việt',
        type: 'arrow',
      },
      {
        id: 'cache',
        icon: '⬡',
        iconColor: '#586376',
        iconTint: '#F1F3F7',
        title: 'Dữ liệu & Bộ nhớ đệm',
        type: 'arrow',
      },
    ],
  },
  {
    id: 'support',
    title: 'HỖ TRỢ',
    items: [
      {
        id: 'help',
        icon: '?',
        iconColor: '#F23939',
        iconTint: '#FFE3E3',
        title: 'Trung tâm trợ giúp',
        type: 'arrow',
      },
      {
        id: 'about',
        icon: 'i',
        iconColor: '#586376',
        iconTint: '#F1F3F7',
        title: 'Giới thiệu về ứng dụng',
        type: 'arrow',
      },
    ],
  },
];
