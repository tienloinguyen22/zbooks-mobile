import { Dispatch } from '@app/store';

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  changeLanguage: dispatch.settings.changeLanguageWithI18next,
});
