import { Dispatch } from '@app/store';
import { Theme } from '@app/core';

interface MapDispatchToProps {
  changeLanguage: (language: string) => void;
  changeTheme: (theme: Theme) => void;
  changePrimaryColor: (primaryColor: string) => void;
  logout: () => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  changeLanguage: dispatch.settings.changeLanguageWithI18next,
  changeTheme: dispatch.settings.changeThemeAndReload,
  changePrimaryColor: dispatch.settings.changePrimaryColorAndReload,
  logout: dispatch.currentUser.logout,
});
