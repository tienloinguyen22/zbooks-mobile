import auth from './auth';
import settings from './settings';
import main from './main';
import books from './books';
import profile from './profile';

export const registerModules = (): void => {
  [auth, settings, main, books, profile].forEach((module) => {
    module.registerScreens();
  });
};
