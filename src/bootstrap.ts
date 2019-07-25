import { navigationService } from '@app/services';
import { registerModules } from '@app/modules';
import { i18n, catchAndLog, handleGlobalErrors } from '@app/core';

catchAndLog(
  async (): Promise<void> => {
    handleGlobalErrors();
    await i18n.initialize();
    registerModules();
    navigationService.initializeNavigation();
  },
)();
