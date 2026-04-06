import React from 'react';
import {NotificationScreenContent} from '../components/NotificationScreenContent';
import {studentNotificationContent} from '../mocks/notifications';

type Props = {
  onBack: () => void;
  onOpenSearch: () => void;
};

export function StudentNotificationsScreen({onBack, onOpenSearch}: Props) {
  return (
    <NotificationScreenContent
      data={studentNotificationContent}
      onBack={onBack}
      onOpenSearch={onOpenSearch}
    />
  );
}
