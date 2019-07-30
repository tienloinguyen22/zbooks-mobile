import React, { ReactNode } from 'react';
import { Header } from '../Header';
import { Left } from '../Left';
import { Button } from '../Button';
import { MaterialIcon } from '../MaterialIcon';
import { Right } from '../Right';
import { Title } from '../Title';
import { Body } from '../Body';
import { ScreenProps } from '@app/core';
import { navigationService } from '@app/services';

interface Props extends ScreenProps {
  showBackButton?: boolean;
  title?: ReactNode;
}
export const TopBar = ({ showBackButton, title, componentId }: Props) => {
  const goBack = () => navigationService.goBack({ componentId });

  return (
    <Header>
      {showBackButton && (
        <Left>
          <Button transparent onPress={goBack}>
            <MaterialIcon name='chevron-left' />
          </Button>
        </Left>
      )}
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};
