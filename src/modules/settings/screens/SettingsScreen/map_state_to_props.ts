import { iRootState } from '@app/store';

export const mapStateToProps = (state: iRootState) => ({
  currentUser: state.currentUser,
  language: state.settings.language,
});
