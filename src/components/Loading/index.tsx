import React from 'react';
import { jsonSources } from '@app/assets';
import { Animation } from '../Animation';

interface Props {
  size?: 'large' | 'small';
}

const loading = jsonSources.loading();

export const Loading = ({ size }: Props): JSX.Element => {
  const loadingSize = size === 'large' ? 200 : 100;
  return <Animation source={loading} width={loadingSize} height={loadingSize} autoPlay loop />;
};
