import { Dispatch, CurrentUserState } from '@app/store';

interface MapDispatchToProps {
  login: (user: CurrentUserState) => void;
  updateShownUpdateWarning: (isShowWarning: boolean) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  login: dispatch.currentUser.login,
  updateShownUpdateWarning: dispatch.minimumVersionChecks.updateShownUpdateWarning,
});
