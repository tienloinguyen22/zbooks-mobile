import auth from './auth';
import settings from './settings';
import main from './main';
import books from './books';

export const registerModules = (): void => {
  [auth, settings, main, books].forEach((module) => {
    module.registerScreens();
  });
};
