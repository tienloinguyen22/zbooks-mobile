import auth from './auth';
import settings from './settings';
import main from './main';

export const screenNames = {
  ...auth.screenNames,
  ...settings.screenNames,
  ...main.screenNames,
};

export const registerModules = () => {
  // register screens & set root
  const modules = [auth, settings, main];
  for (const module of modules) {
    module.registerScreens();
  }
};
