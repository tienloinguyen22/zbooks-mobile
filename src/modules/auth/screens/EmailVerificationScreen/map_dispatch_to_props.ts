import { Dispatch } from '@app/store';
import { User } from '@app/core';

interface MapDispatchToProps {
  updateUser: (user: User) => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  updateUser: dispatch.currentUser.update,
});
