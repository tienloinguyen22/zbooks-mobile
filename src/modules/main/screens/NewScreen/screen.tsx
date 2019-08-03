import React from 'react';
import { ScreenProps } from '@app/core';
import { Text, Container, Content } from '@app/components';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ componentId }: Props): JSX.Element => (
  <Container componentId={componentId} showHeader showBackButton headerTitle='New Screen'>
    <Content>
      <Text>This is Content Section</Text>
    </Content>
  </Container>
);
