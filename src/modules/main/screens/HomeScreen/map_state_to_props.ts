import { RootState } from '@app/store';

export const mapStateToProps = (state: RootState) => ({
  sharks: state.sharks,
  dolphins: state.dolphins,
});
