import remoteConfig from '@react-native-firebase/config';
import auth from '@react-native-firebase/auth';
import codePush from 'react-native-code-push';
import { Alert, Platform } from 'react-native';
import i18next from 'i18next';
import { config } from '@app/config';

const TESTERS_KEY = 'testers';
interface Testers {
  [testerId: string]: boolean;
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
      Alert.alert(i18next.t('common.newUpdate'), i18next.t('common.updateInstalled'));
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
};
