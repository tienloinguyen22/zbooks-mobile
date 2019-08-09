import { sharks, SharksState } from './sharks';
import { dolphins, DolphinsState } from './dolphins';
import { settings, SettingsState } from './settings';
import { currentUser, CurrentUserState } from './currentUser';

export type SharksState = SharksState;
export type DolphinsState = DolphinsState;
export type SettingsState = SettingsState;
export type CurrentUserState = CurrentUserState;
export const models = {
  currentUser,
  settings,
  sharks,
  dolphins,
};
