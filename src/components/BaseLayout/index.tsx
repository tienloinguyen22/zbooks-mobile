import React, { ReactNode } from 'react';
import { ErrorBoundary, View } from '@app/components';
import { styles } from './styles';

interface Props {
  children?: ReactNode;
}
export const BaseLayout = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <ErrorBoundary>{children}</ErrorBoundary>
    </View>
  );
};
