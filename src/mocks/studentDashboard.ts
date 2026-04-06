import type {
  DashboardLesson,
  DashboardShortcut,
  HighlightStudent,
  NewsItem,
} from '../models/dashboard';

export const studentProfile = {
  className: 'Lớp 12A9',
  name: 'Mai Thị Ly',
};

export const studentDashboardShortcuts: DashboardShortcut[] = [
  {id: 'homework', icon: '📖', iconColor: '#117F78', label: 'Bài tập', tint: '#CDF8ED'},
  {
    id: 'schedule',
    icon: '🗓',
    iconColor: '#1582C3',
    label: 'Thời khóa biểu',
    tint: '#DAEFFD',
  },
  {id: 'score', icon: '◔', iconColor: '#C68A00', label: 'Điểm số', tint: '#FFF3B8'},
  {id: 'exam', icon: '📅', iconColor: '#B77E00', label: 'Lịch thi', tint: '#FFF6C9'},
  {id: 'leave', icon: '✒', iconColor: '#E02A8A', label: 'Xin nghỉ', tint: '#FCE2F2'},
  {id: 'forum', icon: '💬', iconColor: '#1490D2', label: 'Diễn đàn', tint: '#DDF2FF'},
  {id: 'attendance', icon: '📋', iconColor: '#17A048', label: 'Chuyên cần', tint: '#D7F9E5'},
  {id: 'all', icon: '▦', iconColor: '#74BFE5', label: 'Tất cả', tint: '#DDF2FF'},
];

export const studentTodayLessons: DashboardLesson[] = [
  {
    id: 'lesson-1',
    period: 'Tiết 1',
    room: 'P.201',
    subject: 'Ngữ Văn',
    tint: '#FFFFFF',
  },
  {
    id: 'lesson-2',
    period: 'Tiết 2',
    room: 'P.305',
    status: 'Đang học',
    subject: 'Vật Lý',
    tint: '#67BCDB',
  },
  {
    id: 'lesson-3',
    period: 'Tiết 3',
    room: 'P.204',
    subject: 'Tiếng Anh',
    tint: '#FFFFFF',
  },
];

export const classmates: HighlightStudent[] = [
  {
    id: 'student-1',
    className: 'Lớp 12A9',
    name: 'Nguyễn Gia Hân',
    tint: '#F8D453',
  },
  {
    id: 'student-2',
    className: 'Lớp 12A9',
    name: 'Trần Minh Khoa',
    tint: '#F8D453',
  },
];

export const studentNews: NewsItem[] = [
  {
    id: 'news-1',
    dateTime: '16:26, 15/10/2025',
    title: 'Kế hoạch kiểm tra giữa kì 1 năm học 2025-2026',
    tint: '#F1EFE9',
  },
  {
    id: 'news-2',
    dateTime: '9:23, 29/09/2025',
    title: 'Thông báo lịch sinh hoạt dưới cờ tuần mới dành cho khối 12',
    tint: '#E8E0C9',
  },
  {
    id: 'news-3',
    dateTime: '14:36, 28/09/2025',
    title: 'Kế hoạch tổ chức Hội trại truyền thống "Tri Ân Người Lái Đò" năm học 2024-2025',
    tint: '#ECE7DB',
  },
];

export const studentQuote = {
  author: 'Nelson Mandela',
  text: 'Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới',
};
