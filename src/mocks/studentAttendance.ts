import type {AttendanceSummary, AttendanceTimelineItem} from '../models/attendance';

export const studentAttendanceSummary: AttendanceSummary = {
  avatarLabel: 'An',
  dateLabel: 'HÔM NAY, 20/02',
  subtitle: 'Lúc 07:15 tại Cổng chính',
  title: 'Đã điểm danh',
};

export const studentAttendanceWeekLabel = 'TUẦN NÀY (18/12 - 23/12)';

export const studentAttendanceTimeline: AttendanceTimelineItem[] = [
  {
    accuracyLabel: 'Độ chính xác: 98%',
    dayNumber: '20',
    id: 'attendance-20',
    imageLabel: 'AN',
    imageTint: '#0E1015',
    locationLabel: 'Camera Cổng A',
    status: 'on-time',
    statusLabel: 'Đúng giờ',
    timeLabel: '07:15',
    weekdayLabel: 'T4',
  },
  {
    accuracyLabel: 'Độ chính xác: 92%',
    dayNumber: '19',
    id: 'attendance-19',
    imageLabel: 'AN',
    imageTint: '#36383D',
    locationLabel: 'Camera Hành lang',
    note: 'Hệ thống ghi nhận đi muộn.',
    status: 'late',
    statusLabel: 'Trễ 10p',
    timeLabel: '07:25',
    weekdayLabel: 'T3',
  },
  {
    actionLabel: 'Báo cáo: Tôi có đi học',
    dayNumber: '18',
    id: 'attendance-18',
    imageLabel: '',
    imageTint: '#F3F6FB',
    locationLabel: 'AI không tìm thấy dữ liệu.',
    status: 'missing',
    statusLabel: 'Vắng?',
    timeLabel: '--:--',
    weekdayLabel: 'T2',
  },
];
