import { Navigation, LayoutBottomTabsChildren } from 'react-native-navigation';
import i18next from 'i18next';
import { screenNames, Resource, THEME_DARK, colors } from '@app/core';
import { getIconImageSource } from '@app/components/Icon';
import gql from 'graphql-tag';
import { apolloClient } from '@app/graphql';
import _ from 'lodash';

interface TabItem {
  screenName: string;
  text: string;
  icon: Resource;
  color?: string;
  selectedColor?: string;
}

interface NavigationToOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  passProps?: { [key: string]: any };
}

const navigateTo = ({
  screenName,
  componentId,
  options,
}: {
  screenName: string;
  componentId: string;
  options?: NavigationToOptions;
}): void => {
  Navigation.push(componentId, {
    component: {
      name: screenName,
      passProps: _.get(options, 'passProps', {}),
      options: {
        bottomTabs: {
          visible: false,
          drawBehind: true,
        },
      },
    },
  });
};

const changeTab = ({ componentId, tabIndex }: { componentId: string; tabIndex: number }): void => {
  Navigation.mergeOptions(componentId, {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  });
};

const goBack = ({ componentId }: { componentId: string }): void => {
  Navigation.pop(componentId);
};

const APP_SETTINGS = gql`
  query GetAppSettings {
    appSettings @client
  }
`;

const setDefaultOptions = (): void => {
  Navigation.setDefaultOptions({
    topBar: {
      drawBehind: true,
      visible: false,
    },
    bottomTabs: {
      drawBehind: true,
    },
  });
};

const setRootStack = (screenName: string): void => {
  setDefaultOptions();
  Navigation.setRoot({
    root: {
      stack: {
        options: {
          topBar: {
            visible: false,
          },
        },
        children: [
          {
            component: {
              name: screenName,
            },
          },
        ],
      },
    },
  });
};

const setRootAppLoader = (): void => setRootStack(screenNames.AppLoaderScreen);

const setRootLogin = (): void => setRootStack(screenNames.LoginScreen);

const setRootEmailVerification = (): void => setRootStack(screenNames.EmailVerificationScreen);

const initialize = (): void => {
  Navigation.events().registerAppLaunchedListener((): void => {
    setRootAppLoader();
  });
};

const getTabItem = ({ screenName, icon, color, text, selectedColor }: TabItem): LayoutBottomTabsChildren => ({
  stack: {
    children: [
      {
        component: {
          name: screenName,
          passProps: {},
        },
      },
    ],
    options: {
      bottomTab: {
        text,
        icon,
        selectedIconColor: selectedColor,
        selectedTextColor: selectedColor,
        textColor: color,
        iconColor: color,
      },
    },
  },
});

const setRootHome = async (currentTabIndex?: number): Promise<void> => {
  setDefaultOptions();
  const homeIcon = await getIconImageSource('home', 30);
  const favoritesIcon = await getIconImageSource('heart', 30);
  const settingsIcon = await getIconImageSource('settings', 30);
  const graphQlData = apolloClient.readQuery({
    query: APP_SETTINGS,
  });

  const { theme } = graphQlData.appSettings;
  const { primaryColor } = colors;
  let tabColor = colors.white;
  let tabTextColor = colors.grey;
  if (theme === THEME_DARK) {
    tabColor = colors.black;
    tabTextColor = colors.white;
  } else {
    tabColor = colors.white;
  }

  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            currentTabIndex: currentTabIndex || 0,
            titleDisplayMode: 'alwaysShow',
            backgroundColor: tabColor,
          },
        },
        children: [
          getTabItem({
            screenName: screenNames.HomeScreen,
            icon: homeIcon,
            text: i18next.t('common.home'),
            color: tabTextColor,
            selectedColor: primaryColor,
          }),
          getTabItem({
            screenName: screenNames.FavoriteBooksScreen,
            icon: favoritesIcon,
            text: i18next.t('common.myFavorite'),
            color: tabTextColor,
            selectedColor: primaryColor,
          }),
          getTabItem({
            screenName: screenNames.SettingsScreen,
            icon: settingsIcon,
            text: i18next.t('common.settings'),
            color: tabTextColor,
            selectedColor: primaryColor,
          }),
        ],
      },
    },
  });
};

export const navigationService = {
  initialize,
  setRootAppLoader,
  setRootHome,
  setRootLogin,
  setRootEmailVerification,
  navigateTo,
  goBack,
  changeTab,
};
