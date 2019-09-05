import { RootState, SharksState, DolphinsState } from '@app/store';

export const mapStateToProps = (
  state: RootState,
): { sharks: SharksState; dolphins: DolphinsState; shouldShownUpdateWarning: boolean } => ({
  sharks: state.sharks,
  dolphins: state.dolphins,
  shouldShownUpdateWarning: state.minimumVersionChecks.shouldShownUpdateWarning,
});
