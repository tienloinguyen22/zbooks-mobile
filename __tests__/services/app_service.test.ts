import { appService } from '@app/services';
import codePush, { SyncOptions } from 'react-native-code-push';
import { Platform, Linking } from 'react-native';
import * as auth from '@react-native-firebase/auth';
import * as firebaseConfig from '@react-native-firebase/config';
import { Alert } from '@app/components';
import { config } from '@app/config';

jest.mock('@react-native-firebase/config', () => jest.fn());
jest.mock('@react-native-firebase/auth', () => jest.fn());
jest.mock('react-native-code-push', () => ({
  sync: jest.fn(),
  InstallMode: {
    ON_NEXT_RESUME: 'ON_NEXT_RESUME',
  },
  SyncStatus: {
    UPDATE_INSTALLED: 'UPDATE_INSTALLED',
    CHECKING_FOR_UPDATE: 'CHECKING_FOR_UPDATE',
  },
}));
jest.mock('@app/config', () => ({
  config: {
    android: {
      codePush: {
        stagingKey: 'config.android.codePush.stagingKey',
        productionKey: 'config.android.codePush.productionKey',
      },
      version: '1.3.0',
    },
    ios: {
      codePush: {
        stagingKey: 'config.ios.codePush.stagingKey',
        productionKey: 'config.ios.codePush.productionKey',
      },
      version: '1.3.0',
    },
  },
}));

describe('services/app_service', () => {
  beforeEach(() => {
    ((__DEV__ as unknown) as boolean) = false;
    ((auth as unknown) as jest.Mock).mockImplementation(() => ({
      currentUser: {
        uid: 'testerId',
      },
    }));
    ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
      setConfigSettings: async () => jest.fn(),
      setDefaults: async () => jest.fn(),
      fetchAndActivate: () => {},
      getValue: async (key: string) => {
        if (key === 'testers') {
          return {
            value: '{"testerId": true}',
          };
        }
        if (key === 'minimumVersion') {
          return {
            value: '{"ios":"1.4.0","android":"1.4.0","forceUpdate":false}',
          };
        }
        return undefined;
      },
    }));
    Alert.show = jest.fn();
  });

  describe('setDefaults', () => {
    it('runs successfully', async () => {
      await appService.setDefaults();
    });
  });

  describe('getRemoteConfigJson', () => {
    it('returns undefined if key not found', async () => {
      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('notFoundKey');

      expect(remoteConfig).toBeUndefined();
    });

    it('returns undefined if exception', async () => {
      ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: async () => {},
      }));

      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('testers');

      expect(remoteConfig).toBeUndefined();
    });

    it('returns undefined if config value is not found', async () => {
      ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: async (key: string) => {
          if (key === 'testers') {
            return {
              value: undefined,
            };
          }
          return undefined;
        },
      }));

      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('testers');

      expect(remoteConfig).toBeUndefined();
    });

    it('returns testers configurations', async () => {
      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('testers');

      expect(remoteConfig).toMatchInlineSnapshot(`
                Object {
                  "testerId": true,
                }
            `);
    });
  });

  describe('checkUpdate', () => {
    it('runs successfully on ios', async () => {
      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
    });

    it('runs successfully on android', async () => {
      Platform.OS = 'android';

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
    });

    it('shows alert when a new update is installed', async () => {
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (_options, callback): Promise<codePush.SyncStatus> => {
          callback && callback(codePush.SyncStatus.UPDATE_INSTALLED);
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(Alert.show).toBeCalled();
    });

    it('does not show alert when if codepush status is not UPDATE_INSTALLED', async () => {
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (_options, callback): Promise<codePush.SyncStatus> => {
          callback && callback(codePush.SyncStatus.CHECKING_FOR_UPDATE);
          return codePush.SyncStatus.CHECKING_FOR_UPDATE;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(Alert.show).not.toBeCalled();
    });

    it('does nothing if in debug mode', async () => {
      ((__DEV__ as unknown) as boolean) = true;
      await appService.checkUpdate();
      expect(codePush.sync).not.toBeCalled();
    });

    it('uses production key if the current user is not logged in', async () => {
      Platform.OS = 'ios';
      ((auth as unknown) as jest.Mock).mockImplementation(() => ({}));
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(auth.default().currentUser).toBeFalsy();
      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.ios.codePush.productionKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });

    it('uses production key if testers are blank on ios', async () => {
      Platform.OS = 'ios';
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );
      ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: async () => {
          return undefined;
        },
      }));

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.ios.codePush.productionKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });

    it('uses production key if the current user is not a tester on ios', async () => {
      Platform.OS = 'ios';
      ((auth as unknown) as jest.Mock).mockImplementation(() => ({
        currentUser: {
          uid: 'notTesterId',
        },
      }));
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.ios.codePush.productionKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });

    it('uses production key if the current user is not a tester on android', async () => {
      Platform.OS = 'android';
      ((auth as unknown) as jest.Mock).mockImplementation(() => ({
        currentUser: {
          uid: 'notTesterId',
        },
      }));
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.android.codePush.productionKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });

    it('uses staging key if the current user is a tester on ios', async () => {
      Platform.OS = 'ios';
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.ios.codePush.stagingKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });

    it('uses staging key if the current user is a tester on android', async () => {
      Platform.OS = 'android';
      let options: SyncOptions | undefined;
      jest.spyOn(codePush, 'sync').mockImplementation(
        async (codePushOptions, _callback): Promise<codePush.SyncStatus> => {
          options = codePushOptions;
          return codePush.SyncStatus.UPDATE_INSTALLED;
        },
      );

      await appService.checkUpdate();

      expect(codePush.sync).toBeCalled();
      expect(options).toMatchInlineSnapshot(`
                Object {
                  "deploymentKey": "config.android.codePush.stagingKey",
                  "installMode": "ON_NEXT_RESUME",
                }
            `);
    });
  });

  describe('checkNeedUpdateNewBinaryVersion', () => {
    it('returns minimumVersion configurations', async () => {
      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('minimumVersion');

      expect(remoteConfig).toMatchInlineSnapshot(`
        Object {
          "android": "1.4.0",
          "forceUpdate": false,
          "ios": "1.4.0",
        }
      `);
    });

    it('shows Alert update when minimum version greater than version in Android app', async () => {
      Platform.OS = 'android';

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(1);
    });

    it('shows Alert update when minimum version greater than version in ios app', async () => {
      Platform.OS = 'ios';

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(1);
    });

    it('shows Alert forceUpdate when minimum version greater than version in app', async () => {
      ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: async (key: string) => {
          if (key === 'testers') {
            return {
              value: '{"testerId": true}',
            };
          }
          if (key === 'minimumVersion') {
            return {
              value: '{"ios":"1.4.0","android":"1.4.0","forceUpdate":true}',
            };
          }
          return undefined;
        },
      }));

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(1);
    });

    it('not shows Alert when minimumVersion config undefined', async () => {
      ((firebaseConfig as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: () => {},
      }));

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(0);
    });

    it('opens store link after clicking Update button on ios', async () => {
      Platform.OS = 'ios';
      Alert.show = jest.fn().mockImplementation(({ actions }) => {
        actions[0].onPress();
      });
      Linking.openURL = jest.fn();

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(1);
      expect(Linking.openURL).toBeCalledWith(config.ios.storeLink);
    });

    it('opens store link after clicking Update button on android', async () => {
      Platform.OS = 'android';
      Alert.show = jest.fn().mockImplementation(({ actions }) => {
        actions[0].onPress();
      });
      Linking.openURL = jest.fn();

      await appService.checkNeedUpdateNewBinaryVersion();

      expect(Alert.show).toBeCalledTimes(1);
      expect(Linking.openURL).toBeCalledWith(config.android.storeLink);
    });
  });
});

export default {};
