import React from 'react';
import { ScreenProps } from '@app/core';
import { Container } from '@app/components';
import { Text } from 'react-native';
// import { useEffectOnce } from '@app/hooks';
// import { authService } from '@app/services';

type Props = ScreenProps;

const BaseScreen = ({ componentId }: Props): JSX.Element => {
  // const retrieveIdToken = async (): Promise<void> => {
  //   const idToken = await authService.getIdToken();
  //   console.log('TCL: idToken', idToken);
  // };
  // useEffectOnce(() => {
  //   retrieveIdToken();
  // });

  return (
    <Container componentId={componentId}>
      <Text>Home</Text>
    </Container>
  );
};

export const Screen = React.memo<Props>(BaseScreen);
