import { sharks, SharksState } from './sharks';
import { dolphins, DolphinsState } from './dolphins';
import { settings, SettingsState } from './settings';
export type SharksState = SharksState;
export type DolphinsState = DolphinsState;
export type SettingsState = SettingsState;
export const models = {
  settings,
  sharks,
  dolphins,
};
