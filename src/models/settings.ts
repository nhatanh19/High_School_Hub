export type SettingsListItem = {
  id: string;
  icon: string;
  iconColor: string;
  iconTint: string;
  trailingText?: string;
  type: 'arrow' | 'switch';
  value?: boolean;
  title: string;
};

export type SettingsSection = {
  id: string;
  items: SettingsListItem[];
  title: string;
};

export type SettingsProfile = {
  className: string;
  fullName: string;
  studentCode: string;
};

export type TuitionCard = {
  amount: string;
  deadline: string;
  monthLabel: string;
  status: string;
};

export type TuitionPaymentConfig = {
  accountName: string;
  accountNo: string;
  amount: number;
  amountLabel: string;
  bankId: string;
  bankLabel: string;
  description: string;
  expiresInLabel: string;
  orderTitle: string;
  template: string;
  tuitionTitle: string;
};
