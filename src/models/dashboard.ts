export type DashboardShortcut = {
  id: string;
  icon: string;
  iconColor: string;
  label: string;
  tint: string;
};

export type DashboardLesson = {
  id: string;
  period: string;
  room: string;
  status?: string;
  subject: string;
  tint: string;
};

export type HighlightStudent = {
  id: string;
  className: string;
  name: string;
  tint: string;
};

export type NewsItem = {
  id: string;
  dateTime: string;
  title: string;
  tint: string;
};

export type TeacherClassOption = {
  buttonColor: string;
  id: string;
  label: string;
};
