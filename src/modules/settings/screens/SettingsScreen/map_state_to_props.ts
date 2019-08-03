import { RootState, CurrentUserState } from '@app/store';
import { LanguageType } from '@app/core';

export const mapStateToProps = (state: RootState): { currentUser: CurrentUserState; language: LanguageType } => ({
  currentUser: state.currentUser,
  language: state.settings.language,
});
