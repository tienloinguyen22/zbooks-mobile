import { RootState } from '@app/store';
import { User } from '@app/core';

export const mapStateToProps = (state: RootState): { language: string; currentUser: User } => ({
  language: state.settings.language,
  currentUser: state.currentUser,
});
