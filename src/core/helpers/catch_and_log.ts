import i18next from 'i18next';
import { showNotification } from './show_notification';
import { recordError } from './record_error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Argument = any;
type CatchAndLog = (
  action: (...actionArgs: Argument[]) => Promise<void>,
  finallyAction?: (() => Promise<void>) | undefined,
) => (...actionArgs: Argument[]) => Promise<void>;

export const catchAndLog: CatchAndLog = (action, finallyAction) => async (...args: Argument[]) => {
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
