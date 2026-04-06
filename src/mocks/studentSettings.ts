import type {
  SettingsProfile,
  SettingsSection,
  TuitionCard,
  TuitionPaymentConfig,
} from '../models/settings';

export const studentSettingsProfile: SettingsProfile = {
  className: 'LỚP 12A9',
  fullName: 'Mai Thị Ly',
  studentCode: 'MSHS: 210045',
};

export const studentTuitionCard: TuitionCard = {
  amount: '2.450.000 đ',
  deadline: 'Hạn: 15/10/2024',
  monthLabel: 'Học phí tháng 10',
  status: 'Chưa đóng',
};

export const studentTuitionPayment: TuitionPaymentConfig = {
  accountName: 'TRUONG THPT CHUYEN KHTN',
  accountNo: '0987654321',
  amount: 2450000,
  amountLabel: '2.450.000 đ',
  bankId: 'mbbank',
  bankLabel: 'MB BANK',
  description: 'HPHI 20248891',
  expiresInLabel: 'Đơn hàng hết hạn sau 14:59',
  orderTitle: 'Tổng thanh toán',
  template: 'compact2',
  tuitionTitle: 'Học phí học kì 1 - Mai Thị Ly',
};

export const studentSettingsSections: SettingsSection[] = [
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
