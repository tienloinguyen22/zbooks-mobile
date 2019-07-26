import { Dispatch } from '@app/store';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: dispatch.currentUser.login,
});
