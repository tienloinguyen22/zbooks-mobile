import React from 'react';
import { ScreenProps, screenNames } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { navigationService } from '@app/services';
import { ScrollView, Container } from '@app/components';
import { NavigationSample, RematchSample, IconSample, CrashSample, NotificationSample } from './components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({
  componentId,
  sharks,
  dolphins,
  incrementShark,
  incrementSharkAsync,
  incrementDolphin,
  incrementDolphinAsync,
}: Props) => {
  const pushNewScreen = () => {
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.NewScreen,
    });
  };

  const changeTab = () => {
    navigationService.changeTab({
      componentId,
      tabIndex: 1,
    });
  };

  return (
    <Container componentId={componentId}>
      <ScrollView>
        <NavigationSample pushNewScreen={pushNewScreen} changeTab={changeTab} />
        <IconSample />
        <RematchSample
          sharks={sharks}
          dolphins={dolphins}
          incrementShark={incrementShark}
          incrementSharkAsync={incrementSharkAsync}
          incrementDolphin={incrementDolphin}
          incrementDolphinAsync={incrementDolphinAsync}
        />
        <CrashSample />
        <NotificationSample />
      </ScrollView>
    </Container>
  );
};
