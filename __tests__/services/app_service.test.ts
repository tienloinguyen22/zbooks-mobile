import { appService } from '@app/services';
import codePush, { SyncOptions } from 'react-native-code-push';
import { Platform } from 'react-native';
import * as auth from '@react-native-firebase/auth';
import * as config from '@react-native-firebase/config';
import { Alert } from '@app/components';

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
    },
    ios: {
      codePush: {
        stagingKey: 'config.ios.codePush.stagingKey',
        productionKey: 'config.ios.codePush.productionKey',
      },
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
    ((config as unknown) as jest.Mock).mockImplementation(() => ({
      setConfigSettings: async () => jest.fn(),
      setDefaults: async () => jest.fn(),
      fetchAndActivate: () => {},
      getValue: async (key: string) => {
        if (key === 'testers') {
          return {
            value: '{"testerId": true}',
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
      ((config as unknown) as jest.Mock).mockImplementation(() => ({
        setConfigSettings: async () => jest.fn(),
        setDefaults: async () => jest.fn(),
        fetchAndActivate: () => {},
        getValue: async () => {},
      }));

      const remoteConfig = await appService.getRemoteConfigJson<{ [id: string]: string }>('testers');

      expect(remoteConfig).toBeUndefined();
    });

    it('returns undefined if config value is not found', async () => {
      ((config as unknown) as jest.Mock).mockImplementation(() => ({
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
      ((config as unknown) as jest.Mock).mockImplementation(() => ({
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
});

export default {};
