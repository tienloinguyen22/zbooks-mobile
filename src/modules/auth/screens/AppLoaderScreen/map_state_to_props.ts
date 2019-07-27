import { RootState } from '@app/store';

export const mapStateToProps = (state: RootState) => ({
  language: state.settings.language,
  appLoaded: state.settings.appLoaded,
  isLoggedIn: state.currentUser.isLoggedIn,
});
