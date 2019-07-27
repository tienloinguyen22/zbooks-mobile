import { RootState } from '@app/store';

export const mapStateToProps = (state: RootState) => ({
  currentUser: state.currentUser,
  language: state.settings.language,
});
