export type ScheduleDayOption = {
  dateNumber: string;
  dayLabel: string;
  id: string;
  isActive?: boolean;
};

export type ScheduleLessonCard = {
  accentColor: string;
  icon: string;
  id: string;
  platform: string;
  platformIcon: string;
  teacherName: string;
  title: string;
  topic: string;
};

export type ScheduleTimelineItem = {
  endTime: string;
  id: string;
  lesson: ScheduleLessonCard;
  startTime: string;
};
