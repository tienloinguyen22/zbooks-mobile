import remoteConfig from '@react-native-firebase/config';
import auth from '@react-native-firebase/auth';
import codePush from 'react-native-code-push';
import { Platform, Linking } from 'react-native';
import i18next from 'i18next';
import { config } from '@app/config';
import { Alert } from '@app/components/Alert';
import { AlertAction } from '@app/components/AlertContainer';

const TESTERS_KEY = 'testers';
const MINIMUM_VERSION_KEY = 'minimumVersion';
interface Testers {
  [testerId: string]: boolean;
}
interface Version {
  ios: string;
  android: string;
  forceUpdate: boolean;
}

const getRemoteConfigJson = async <T>(key: string): Promise<T | undefined> => {
  await remoteConfig().fetchAndActivate();
  const configValue = await remoteConfig().getValue(key);

  try {
    if (!configValue.value) {
      return undefined;
    }
    return JSON.parse(configValue.value.toString());
  } catch (error) {
    return undefined;
  }
};

const onSyncStatusChange = (syncStatus: codePush.SyncStatus): void => {
  switch (syncStatus) {
    case codePush.SyncStatus.UPDATE_INSTALLED:
      Alert.show({
        type: 'INFO',
        title: i18next.t('common.newUpdate'),
        message: i18next.t('common.updateInstalled'),
        onPressClose: Alert.hide,
      });
      break;
    default:
      break;
  }
};

const checkIsTester = async (): Promise<boolean> => {
  const { currentUser } = auth();
  if (!currentUser) {
    return false;
  }

  const testers = await getRemoteConfigJson<Testers>(TESTERS_KEY);

  if (!testers) {
    return false;
  }
  return testers[currentUser.uid] === true;
};

export const checkNeedUpdateNewBinaryVersion = async (): Promise<void> => {
  const minimumVersion = await getRemoteConfigJson<Version>(MINIMUM_VERSION_KEY);
  if (!minimumVersion) {
    return;
  }
  const gotoStore = (): Promise<void> =>
    Linking.openURL(Platform.OS === 'ios' ? config.ios.storeLink : config.android.storeLink);
  const currentVersion = Platform.OS === 'ios' ? config.ios.version : config.android.version;
  const checkVersion = Platform.OS === 'ios' ? minimumVersion.ios : minimumVersion.android;
  const forceUpdateAction: AlertAction[] = [
    {
      title: i18next.t('common.update'),
      onPress: gotoStore,
    },
  ];
  const notifyUpdateActions: AlertAction[] = [
    {
      title: i18next.t('common.update'),
      onPress: gotoStore,
    },
    {
      title: i18next.t('common.close'),
      onPress: Alert.hide,
      outline: true,
    },
  ];

  checkVersion > currentVersion &&
    Alert.show({
      type: 'WARNING',
      title: i18next.t('common.newUpdate'),
      message: i18next.t('common.newVersionInAppStore'),
      closeable: false,
      actions: minimumVersion.forceUpdate ? forceUpdateAction : notifyUpdateActions,
    });
};

export const checkUpdate = async (): Promise<void> => {
  if (__DEV__) {
    return;
  }
  const useStagingKey = await checkIsTester();
  let deploymentKey = '';
  if (Platform.OS === 'android') {
    deploymentKey = useStagingKey ? config.android.codePush.stagingKey : config.android.codePush.productionKey;
  } else {
    deploymentKey = useStagingKey ? config.ios.codePush.stagingKey : config.ios.codePush.productionKey;
  }

  await codePush.sync(
    {
      deploymentKey,
      installMode: codePush.InstallMode.ON_NEXT_RESUME,
    },
    onSyncStatusChange,
  );
};

const setDefaults = async (): Promise<void> => {
  await remoteConfig().setConfigSettings({
    isDeveloperModeEnabled: __DEV__,
  });

  await remoteConfig().setDefaults({
    testers: '{}',
    minimumVersion: '{"ios":"0.0.1","android":"0.0.1"}',
  });
};

export const appService = {
  setDefaults,
  getRemoteConfigJson,
  checkUpdate,
  checkNeedUpdateNewBinaryVersion,
};
