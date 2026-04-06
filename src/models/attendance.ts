export type AttendanceStatus = 'on-time' | 'late' | 'missing';

export type AttendanceSummary = {
  avatarLabel: string;
  dateLabel: string;
  subtitle: string;
  title: string;
};

export type AttendanceTimelineItem = {
  accuracyLabel?: string;
  actionLabel?: string;
  dayNumber: string;
  id: string;
  imageLabel: string;
  imageTint: string;
  locationLabel: string;
  note?: string;
  status: AttendanceStatus;
  statusLabel: string;
  timeLabel: string;
  weekdayLabel: string;
};
