import { RootState, SharksState, DolphinsState } from '@app/store';

export const mapStateToProps = (state: RootState): { sharks: SharksState; dolphins: DolphinsState } => ({
  sharks: state.sharks,
  dolphins: state.dolphins,
});
