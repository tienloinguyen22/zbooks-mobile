import React from 'react';
import { ScreenProps } from '@app/core';
import { Container } from '@app/components';
import { Text } from 'react-native';

type Props = ScreenProps;

const BaseScreen = ({ componentId }: Props): JSX.Element => {
  return (
    <Container componentId={componentId}>
      <Text>Home</Text>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
