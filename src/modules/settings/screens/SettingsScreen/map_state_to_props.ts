import { RootState, CurrentUserState } from '@app/store';
import { LanguageType, Theme } from '@app/core';

interface MapStateToProps {
  currentUser: CurrentUserState;
  language: LanguageType;
  theme: Theme;
  primaryColorCode: string;
}

export const mapStateToProps = (state: RootState): MapStateToProps => ({
  currentUser: state.currentUser,
  language: state.settings.language,
  theme: state.settings.theme,
  primaryColorCode: state.settings.primaryColorCode,
});
