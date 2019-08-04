import { RootState } from '@app/store';

export const mapStateToProps = (state: RootState): { language: string } => ({
  language: state.settings.language,
});
