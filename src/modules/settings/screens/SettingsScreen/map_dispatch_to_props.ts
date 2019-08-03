import { Dispatch } from '@app/store';

interface MapDispatchToProps {
  changeLanguage: (language: string) => void;
  logout: () => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  changeLanguage: dispatch.settings.changeLanguageWithI18next,
  logout: dispatch.currentUser.logout,
});
