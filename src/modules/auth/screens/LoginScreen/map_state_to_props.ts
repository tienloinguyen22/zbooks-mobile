import { RootState } from '@app/store';

interface MapStateToProps {
  shouldShownUpdateWarning: boolean;
}
export const mapStateToProps = (state: RootState): MapStateToProps => ({
  shouldShownUpdateWarning: state.minimumVersionChecks.shouldShownUpdateWarning,
});
