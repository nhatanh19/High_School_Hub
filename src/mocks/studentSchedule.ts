import type {ScheduleDayOption, ScheduleTimelineItem} from '../models/schedule';

export const studentScheduleDays: ScheduleDayOption[] = [
  {dateNumber: '14', dayLabel: 'Mon', id: 'mon'},
  {dateNumber: '15', dayLabel: 'Tue', id: 'tue'},
  {dateNumber: '16', dayLabel: 'Wed', id: 'wed'},
  {dateNumber: '17', dayLabel: 'Thu', id: 'thu', isActive: true},
  {dateNumber: '18', dayLabel: 'Fri', id: 'fri'},
  {dateNumber: '19', dayLabel: 'Sat', id: 'sat'},
  {dateNumber: '20', dayLabel: 'Sun', id: 'sun'},
];

export const studentScheduleTimeline: ScheduleTimelineItem[] = [
  {
    endTime: '10:20',
    id: 'schedule-1',
    lesson: {
      accentColor: '#7E80F2',
      icon: '⚛',
      id: 'lesson-physics',
      platform: 'Google Meet',
      platformIcon: '◉',
      teacherName: 'Trịnh Văn Quyết',
      title: 'Vật lý lượng tử',
      topic: 'Chương 3: Lực lượng',
    },
    startTime: '9:30',
  },
  {
    endTime: '11:50',
    id: 'schedule-2',
    lesson: {
      accentColor: '#DDF9FC',
      icon: '◌',
      id: 'lesson-geology',
      platform: 'Zoom',
      platformIcon: '◉',
      teacherName: 'Đặng Tiểu Bình',
      title: 'Địa chất học',
      topic: 'Chương 12: Hồ sơ đất',
    },
    startTime: '11:00',
  },
  {
    endTime: '13:00',
    id: 'schedule-3',
    lesson: {
      accentColor: '#CFF7FB',
      icon: '◍',
      id: 'lesson-task',
      platform: 'Google Docs',
      platformIcon: '▤',
      teacherName: 'Chu Văn An',
      title: 'Phân công việc',
      topic: 'Mô hình khu vực thế giới',
    },
    startTime: '12:20',
  },
];
