import React from 'react';
import { ScreenProps, screenNames, showNotification } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { navigationService } from '@app/services';
import { BaseLayout, Text, Button } from '@app/components';
import { styles } from './styles';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const crashTest = () => (null as any).crash();

  const crashTestAsync = async () => {
    console.log('crashTestAsync');
    (null as any).crash();
  };

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

  const showMessage = () => {
    showNotification({ type: 'success', message: 'Hello' });
  };

  return (
    <BaseLayout>
      <Text>{t('home.hello')}</Text>
      <Text>Sharks: {sharks.count}</Text>
      <Button onPress={incrementShark} style={styles.button}>
        <Text>Raise shark</Text>
      </Button>
      <Button onPress={incrementSharkAsync} style={styles.button}>
        <Text>Raise shark async</Text>
      </Button>
      <Text>Dolphins: {dolphins.count}</Text>
      <Button onPress={incrementDolphin} style={styles.button}>
        <Text>Raise dolphin</Text>
      </Button>
      <Button onPress={incrementDolphinAsync} style={styles.button}>
        <Text>Raise dolphin async</Text>
      </Button>
      <Button onPress={crashTest} style={styles.button}>
        <Text>Crash Test</Text>
      </Button>
      <Button onPress={crashTestAsync} style={styles.button}>
        <Text>Crash Test Async</Text>
      </Button>
      <Button onPress={pushNewScreen} style={styles.button}>
        <Text>Push New Screen</Text>
      </Button>
      <Button onPress={changeTab} style={styles.button}>
        <Text>Change Tab Settings</Text>
      </Button>
      <Button onPress={showMessage} style={styles.button}>
        <Text>Show notification</Text>
      </Button>
    </BaseLayout>
  );
};
