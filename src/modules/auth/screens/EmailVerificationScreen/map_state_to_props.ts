import { RootState } from '@app/store';
import { User } from '@app/core';

export const mapStateToProps = (state: RootState): { currentUser: User } => ({
  currentUser: state.currentUser,
});
