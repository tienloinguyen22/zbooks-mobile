import { Dispatch } from '@app/store';

interface MapDispatchToProps {
  markEmailVerified: () => void;
  logout: () => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  logout: dispatch.currentUser.logout,
  markEmailVerified: dispatch.currentUser.markEmailVerified,
});
