import React, { ReactNode } from 'react';
import { Container as NBContainer } from 'native-base';
import { Header } from '../Header';
import { Left } from '../Left';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import { Body } from '../Body';
import { Title } from '../Title';
import { Right } from '../Right';
import { ErrorBoundary } from '../ErrorBoundary';
import { View } from '../View';
import { navigationService } from '@app/services';

interface Props {
  componentId?: string;
  showHeader?: boolean;
  showBackButton?: boolean;
  headerTitle?: string;
  children?: ReactNode;
}
export const Container = ({ children, showHeader, showBackButton, headerTitle, componentId }: Props) => {
  const goBack = () => {
    componentId && navigationService.goBack({ componentId });
  };
  return (
    <View safeArea={!showHeader}>
      <ErrorBoundary>
        <NBContainer>
          {showHeader && (
            <Header>
              {showBackButton && (
                <Left>
                  <Button transparent onPress={goBack}>
                    <MaterialIcon name='chevron-left' />
                  </Button>
                </Left>
              )}
              <Body>
                <Title>{headerTitle}</Title>
              </Body>
              <Right />
            </Header>
          )}
          {children}
        </NBContainer>
      </ErrorBoundary>
    </View>
  );
};
