import { sharks, SharksState } from './sharks';
import { dolphins, DolphinsState } from './dolphins';
import { language, LanguageState } from './language';
import { appStateLoadStatus, AppStateLoadStatusState } from './app_state_load_status';
export type SharksState = SharksState;
export type DolphinsState = DolphinsState;
export type LanguageState = LanguageState;
export type AppStateLoadStatusState = AppStateLoadStatusState;
export const models = {
  appStateLoadStatus,
  language,
  sharks,
  dolphins,
};
