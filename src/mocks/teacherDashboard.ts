import type {
  DashboardLesson,
  DashboardShortcut,
  HighlightStudent,
  NewsItem,
  TeacherClassOption,
} from '../models/dashboard';

export const teacherProfile = {
  className: 'Lớp 12A1',
  name: 'Nguyễn Văn A',
};

export const teacherClassOptions: TeacherClassOption[] = [
  {id: 'class-12a2', label: 'Lớp 12A2', buttonColor: '#1A0E0E'},
  {id: 'class-12a3', label: 'Lớp 12A3', buttonColor: '#D49800'},
  {id: 'class-12a4', label: 'Lớp 12A4', buttonColor: '#1394D2'},
];

export const teacherDashboardShortcuts: DashboardShortcut[] = [
  {id: 'schedule', icon: '▦', iconColor: '#2897ED', label: 'Lịch dạy', tint: '#E4F4FF'},
  {
    id: 'score',
    icon: '◫',
    iconColor: '#F28736',
    label: 'Sổ điểm',
    tint: '#FFF0DF',
  },
  {id: 'attendance', icon: '▣', iconColor: '#3DB669', label: 'Điểm danh', tint: '#E4F8E9'},
  {id: 'approval', icon: '✉', iconColor: '#E35F6A', label: 'Duyệt đơn', tint: '#FFE8EC'},
  {id: 'lesson-book', icon: '▤', iconColor: '#E55A95', label: 'Sổ đầu bài', tint: '#FFE8F1'},
  {id: 'report', icon: '◔', iconColor: '#5766F0', label: 'Báo giảng', tint: '#E9ECFF'},
  {id: 'parents', icon: '◌', iconColor: '#1FA8D0', label: 'Phụ huynh', tint: '#E2F8FF'},
  {id: 'all', icon: '▥', iconColor: '#82BEDF', label: 'Tất cả', tint: '#EAF5FE'},
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
