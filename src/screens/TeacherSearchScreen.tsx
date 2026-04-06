import React from 'react';
import {SearchScreenContent} from '../components/SearchScreenContent';
import {teacherSearchContent} from '../mocks/search';

type Props = {
  onBack: () => void;
};

export function TeacherSearchScreen({onBack}: Props) {
  return <SearchScreenContent data={teacherSearchContent} onBack={onBack} />;
}
