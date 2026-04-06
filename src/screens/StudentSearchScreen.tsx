import React from 'react';
import {SearchScreenContent} from '../components/SearchScreenContent';
import {studentSearchContent} from '../mocks/search';

type Props = {
  onBack: () => void;
};

export function StudentSearchScreen({onBack}: Props) {
  return <SearchScreenContent data={studentSearchContent} onBack={onBack} />;
}
