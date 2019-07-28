import React, { ReactNode } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';

interface Props {
  children?: ReactNode;
}
export const BaseLayout = ({ children }: Props) => {
  return (
    <View safeArea>
      <ErrorBoundary>{children}</ErrorBoundary>
    </View>
  );
};
