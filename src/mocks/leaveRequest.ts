import type {LeaveRequestDraft} from '../models/leave';

export const defaultLeaveRequestDraft: LeaveRequestDraft = {
  detailReason: '',
  endDate: '09/04/2026',
  evidenceLabel: 'Đơn thuốc, giấy hẹn khám...',
  reason: 'sick',
  startDate: '01/04/2026',
  teacherClass: '12A9',
  teacherName: 'Nguyễn Văn A',
  totalDays: '9 ngày',
};
