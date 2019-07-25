import auth from './auth';
import settings from './settings';
import main from './main';

export const registerModules = () => {
  const modules = [auth, settings, main];
  for (const module of modules) {
    module.registerScreens();
  }
};
