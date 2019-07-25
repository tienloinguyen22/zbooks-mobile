import { navigationService } from '@app/services';
import { registerModules } from '@app/modules';
import { i18n, catchAndLog } from '@app/core';

catchAndLog(
  async (): Promise<void> => {
    await i18n.initialize();
    registerModules();
    navigationService.initializeNavigation();
  },
)();
