/* eslint-disable global-require */

export const imageSources = {
  appIcon: () => require('./images/app_icon.png'),
  appIconRound: () => require('./images/app_icon_round.png'),
  appIconNoAlpha: () => require('./images/app_icon_no_alpha.png'),
  loginIcon: () => require('./images/login_icon.png'),
  facebookIcon: () => require('./images/facebook.png'),
  googleIcon: () => require('./images/google.png'),
};

export interface CountryCode {
  name: string;
  dialCode: string;
  code: string;
}

export const jsonSources = {
  countries: () => require('./json/country_code.json') as CountryCode[],
  categories: () => require('./json/categories.json'),
  loading: () => require('./json/loading.json'),
};
/* eslint-enable global-require */
