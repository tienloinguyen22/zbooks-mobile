import i18next from 'i18next';
import { showNotification } from './show_notification';
import { recordError } from './record_error';

export const catchAndLog = (
  action: (...actionArgs: any[]) => Promise<void>,
  finallyAction: (() => Promise<void>) | undefined = undefined,
) => {
  return async (...args: any[]) => {
    try {
      await action(...args);
    } catch (error) {
      if (error.message && error.message.indexOf('Network request failed') > -1) {
        showNotification({ type: 'error', message: i18next.t('error.networkRequestFailed') });
      } else {
        recordError(error);
      }
    } finally {
      try {
        if (finallyAction) {
          await finallyAction();
        }
      } catch (error) {
        recordError(error);
      }
    }
  };
};
