import { recordError } from '@app/core';
import { Sentry } from 'react-native-sentry';

describe('core/helpers/record_error', () => {
  it('captures error in Sentry', async () => {
    ((__DEV__ as unknown) as boolean) = false;
    const error = new Error();
    recordError(error);

    expect(Sentry.captureException).toBeCalledWith(error);
  });

  it('writes to consoles in debug mode', async () => {
    ((__DEV__ as unknown) as boolean) = true;
    jest.spyOn(global.console, 'log').mockImplementation(() => jest.fn());
    const error = new Error();
    recordError(error);

    expect(Sentry.captureException).not.toBeCalledWith();
    expect(global.console.log).toBeCalledWith(error);
  });
});
