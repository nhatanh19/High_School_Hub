import type {
  DashboardLesson,
  DashboardShortcut,
  HighlightStudent,
  NewsItem,
  TeacherClassOption,
} from '../models/dashboard';

export const teacherProfile = {
  className: 'Lớp 12A9',
  name: 'Võ Nguyễn Hoàng An',
};

export const teacherClassOptions: TeacherClassOption[] = [
  {id: 'class-12a2', label: 'Lớp 12A2', buttonColor: '#1A0E0E'},
  {id: 'class-12a3', label: 'Lớp 12A3', buttonColor: '#D49800'},
  {id: 'class-12a4', label: 'Lớp 12A4', buttonColor: '#1394D2'},
];

export const teacherDashboardShortcuts: DashboardShortcut[] = [
  {id: 'homework', icon: '📖', iconColor: '#117F78', label: 'Bài tập', tint: '#CDF8ED'},
  {
    id: 'schedule',
    icon: '🗓',
    iconColor: '#1582C3',
    label: 'Thời khoá biểu',
    tint: '#DAEFFD',
  },
  {id: 'score', icon: '◔', iconColor: '#C68A00', label: 'Điểm số', tint: '#FFF3B8'},
  {id: 'exam', icon: '📅', iconColor: '#B77E00', label: 'Lịch thi', tint: '#FFF3B8'},
  {id: 'leave', icon: '✒', iconColor: '#E02A8A', label: 'Xin phép', tint: '#FCE2F2'},
  {id: 'forum', icon: '💬', iconColor: '#1490D2', label: 'Diễn đàn', tint: '#DDF2FF'},
  {id: 'attendance', icon: '📋', iconColor: '#17A048', label: 'Điểm danh', tint: '#D7F9E5'},
  {id: 'all', icon: '▦', iconColor: '#74BFE5', label: 'Tất cả', tint: '#DDF2FF'},
];

export const todayLessons: DashboardLesson[] = [
  {
    id: 'lesson-1',
    period: 'Tiết 1',
    room: 'P.201',
    subject: 'Toán Học',
    tint: '#FFFFFF',
  },
  {
    id: 'lesson-2',
    period: 'Tiết 2',
    room: 'P.Thí nghiệm',
    status: 'Đang học',
    subject: 'Hóa Học',
    tint: '#67BCDB',
  },
  {
    id: 'lesson-3',
    period: 'Tiết 3',
    room: 'P.201',
    subject: 'Ngữ Văn',
    tint: '#FFFFFF',
  },
];

export const topStudents: HighlightStudent[] = [
  {
    id: 'student-1',
    className: 'Lớp 12A9',
    name: 'Lê Văn Tiến',
    tint: '#F8D453',
  },
  {
    id: 'student-2',
    className: 'Lớp 10A1',
    name: 'Mai Ăn Táo',
    tint: '#F8D453',
  },
];

export const teacherNews: NewsItem[] = [
  {
    id: 'news-1',
    dateTime: '16:26, 15/10/2025',
    title: 'Kế hoạch kiểm tra giữa kì 1 năm học 2025-2026',
    tint: '#F1EFE9',
  },
  {
    id: 'news-2',
    dateTime: '9:23, 29/09/2025',
    title: 'Quyết định về việc kiểm tra hoạt động sư phạm của nhà giáo năm học 2025-2026',
    tint: '#E8E0C9',
  },
  {
    id: 'news-3',
    dateTime: '14:36, 28/09/2025',
    title: 'Kế hoạch tổ chức Hội trại truyền thống "Tri Ân Người Lái Đò" năm học 2024-2025',
    tint: '#ECE7DB',
  },
];

export const teacherQuote = {
  author: 'Aristotle',
  text: 'Mục đích của giáo dục không phải là dạy cách kiếm sống, mà là dạy cách sống',
};
