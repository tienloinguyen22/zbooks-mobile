import React, { ReactNode } from 'react';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { Root } from 'native-base';

interface Props {
  children?: ReactNode;
  centerContent?: boolean;
}
export const BaseLayout = ({ children }: Props) => {
  return (
    <View safeArea>
      <Root>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Root>
    </View>
  );
};
