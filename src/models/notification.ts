export type NotificationTabKey = 'all' | 'unread';

export type NotificationItemVariant = 'default' | 'highlight';

export type NotificationItem = {
  accentColor: string;
  description: string;
  icon: string;
  iconColor: string;
  iconTint: string;
  id: string;
  isUnread: boolean;
  timeLabel: string;
  title: string;
  variant: NotificationItemVariant;
};

export type NotificationGroup = {
  id: string;
  items: NotificationItem[];
  title: string;
};

export type NotificationScreenData = {
  groups: NotificationGroup[];
};
