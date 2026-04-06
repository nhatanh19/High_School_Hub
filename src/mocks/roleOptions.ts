import {VI_STRINGS} from '../constants/vi';
import type {RoleOption} from '../models/ui';

export const roleOptions: RoleOption[] = [
  {
    id: 'student',
    label: VI_STRINGS.student,
    color: '#69BFDE',
  },
  {
    id: 'teacher',
    label: VI_STRINGS.teacher,
    color: '#0E6CA4',
  },
];
