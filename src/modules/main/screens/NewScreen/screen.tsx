import React from 'react';
import { ScreenProps } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { BaseLayout, Text } from '@app/components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({  }: Props) => {
  return (
    <BaseLayout>
      <Text>New screen</Text>
    </BaseLayout>
  );
};
