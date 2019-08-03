import { RootState } from '@app/store';

export const mapStateToProps = (state: RootState): { language: string; appLoaded: boolean; isLoggedIn: boolean } => ({
  language: state.settings.language,
  appLoaded: state.settings.appLoaded,
  isLoggedIn: state.currentUser.isLoggedIn,
});
