import { iRootState } from '@app/store';

export const mapStateToProps = (state: iRootState) => ({
  language: state.settings.language,
  appLoaded: state.settings.appLoaded,
  isLoggedIn: state.currentUser.isLoggedIn,
});
