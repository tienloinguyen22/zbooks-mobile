import { RootState } from '@app/store';
import { User } from '@app/core';

export const mapStateToProps = (state: RootState): { language: string; appLoaded: boolean; currentUser: User } => ({
  language: state.settings.language,
  appLoaded: state.settings.appLoaded,
  currentUser: state.currentUser,
});
