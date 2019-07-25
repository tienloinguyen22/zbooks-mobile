import React from 'react';
import { ScreenProps } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
// import { navigationService } from '@app/services';
import { BaseLayout, Text, Button } from '@app/components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({
  sharks,
  dolphins,
  incrementShark,
  incrementSharkAsync,
  incrementDolphin,
  incrementDolphinAsync,
}: Props) => {
  return (
    <BaseLayout>
      <Text>Sharks: {sharks.count}</Text>
      <Button onPress={incrementShark}>
        <Text>Raise shark</Text>
      </Button>
      <Button onPress={incrementSharkAsync}>
        <Text>Raise shark async</Text>
      </Button>
      <Text>Dolphins: {dolphins.count}</Text>
      <Button onPress={incrementDolphin}>
        <Text>Raise dolphin</Text>
      </Button>
      <Button onPress={incrementDolphinAsync}>
        <Text>Raise dolphin async</Text>
      </Button>
    </BaseLayout>
  );
};
