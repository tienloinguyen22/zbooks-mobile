import React from 'react';
import { BaseLayout, View, Image, Button, Text } from '@app/components';
import { navigationService } from '@app/services';
import { ScreenProps, images } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { styles } from './styles';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({  }: Props) => {
  const login = () => {
    navigationService.setRootHome();
  };

  return (
    <BaseLayout>
      <View center centerVertical>
        <Image style={styles.appIcon} source={images.appIcon} />
        <Button onPress={login} style={{ width: 200 }}>
          <Text>Login</Text>
        </Button>
      </View>
    </BaseLayout>
  );
};
