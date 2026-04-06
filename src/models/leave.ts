export type LeaveReasonKey = 'sick' | 'family' | 'medical';

export type LeaveRequestDraft = {
  detailReason: string;
  endDate: string;
  evidenceLabel: string;
  reason: LeaveReasonKey;
  startDate: string;
  teacherClass: string;
  teacherName: string;
  totalDays: string;
};
