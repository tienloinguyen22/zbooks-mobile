import { iRootState } from '@app/store';

export const mapStateToProps = (state: iRootState) => ({
  sharks: state.sharks,
  dolphins: state.dolphins,
});
