import { iRootState } from '@app/store';

export const mapStateToProps = (state: iRootState) => ({
  language: state.language,
  appStateLoadStatus: state.appStateLoadStatus,
});
