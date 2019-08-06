import auth from './auth';
import settings from './settings';
import main from './main';

export const registerModules = (): void => {
  [auth, settings, main].forEach((module) => {
    module.registerScreens();
  });
};
