import React from 'react';
import { ScreenProps, screenNames, sleep } from '@app/core';
import { navigationService, appService } from '@app/services';
import { ScrollView, Container } from '@app/components';
import { AlertSample } from '@app/modules/main/screens/HomeScreen/components/AlertSample';
import { LottieSample } from '@app/modules/main/screens/HomeScreen/components/LottieSample';
import { useEffectOnce } from '@app/hooks';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import {
  NavigationSample,
  RematchSample,
  IconSample,
  CrashSample,
  NotificationSample,
  PickerSample,
  AnalyticsSample,
  TextStyleSample,
} from './components';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({
  componentId,
  sharks,
  dolphins,
  incrementShark,
  incrementDolphin,
  shouldShownUpdateWarning,
  updateShownUpdateWarning,
}: Props): JSX.Element => {
  useEffectOnce(() => {
    if (shouldShownUpdateWarning) {
      appService.checkNeedUpdateNewBinaryVersion();
      updateShownUpdateWarning(false);
    }
  });
  const pushNewScreen = (): void => {
    navigationService.navigateTo({
      componentId,
      screenName: screenNames.NewScreen,
    });
  };

  const changeTab = (): void => {
    navigationService.changeTab({
      componentId,
      tabIndex: 1,
    });
  };

  const incrementSharkAsync = async (): Promise<void> => {
    await sleep(500);
    incrementShark(1);
  };

  const incrementDolphinAsync = async (): Promise<void> => {
    await sleep(500);
    incrementDolphin(1);
  };

  const incrementShark1 = (): void => {
    incrementShark(1);
  };

  const incrementDolphin1 = (): void => {
    incrementDolphin(1);
  };

  return (
    <Container componentId={componentId}>
      <ScrollView>
        <AnalyticsSample />
        <CrashSample />
        <PickerSample />
        <NavigationSample pushNewScreen={pushNewScreen} changeTab={changeTab} />
        <IconSample />
        <RematchSample
          sharks={sharks}
          dolphins={dolphins}
          incrementShark={incrementShark1}
          incrementSharkAsync={incrementSharkAsync}
          incrementDolphin={incrementDolphin1}
          incrementDolphinAsync={incrementDolphinAsync}
        />
        <NotificationSample />
        <AlertSample />
        <LottieSample />
        <TextStyleSample />
      </ScrollView>
    </Container>
  );
};
