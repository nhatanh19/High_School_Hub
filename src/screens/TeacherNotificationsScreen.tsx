import React from 'react';
import {NotificationScreenContent} from '../components/NotificationScreenContent';
import {teacherNotificationContent} from '../mocks/notifications';

type Props = {
  onBack: () => void;
  onOpenSearch: () => void;
};

export function TeacherNotificationsScreen({onBack, onOpenSearch}: Props) {
  return (
    <NotificationScreenContent
      data={teacherNotificationContent}
      onBack={onBack}
      onOpenSearch={onOpenSearch}
    />
  );
}
