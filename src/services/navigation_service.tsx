import { Navigation, LayoutBottomTabsChildren } from 'react-native-navigation';
import { colors, screenNames, Resource } from '@app/core';
import { MaterialVectorIcon } from '@app/components/VectorIcon';
import i18next from 'i18next';

interface TabItem {
  screenName: string;
  text: string;
  icon: Resource;
  color?: string;
}

const navigateTo = ({ screenName, componentId }: { screenName: string; componentId: string; options?: {} }): void => {
  Navigation.push(componentId, { component: { name: screenName } });
};

const changeTab = ({ componentId, tabIndex }: { componentId: string; tabIndex: number }): void => {
  Navigation.mergeOptions(componentId, { bottomTabs: { currentTabIndex: tabIndex } });
};

const goBack = ({ componentId }: { componentId: string }): void => {
  Navigation.pop(componentId);
};

const setRootStack = (screenName: string): void => {
  Navigation.setRoot({
    root: {
      stack: {
        options: { topBar: { visible: false } },
        children: [{ component: { name: screenName } }],
      },
    },
  });
};

const setRootAppLoader = (): void => setRootStack(screenNames.AppLoaderScreen);

const setRootLogin = (): void => setRootStack(screenNames.LoginScreen);

const initialize = (): void => {
  Navigation.events().registerAppLaunchedListener((): void => {
    Navigation.setDefaultOptions({
      statusBar: {
        backgroundColor: colors.primary,
        style: 'light',
      },
      topBar: {
        drawBehind: true,
        visible: false,
      },
    });
    setRootAppLoader();
  });
};

const getTabItem = ({ screenName, icon, color, text }: TabItem): LayoutBottomTabsChildren => ({
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
        selectedIconColor: color || colors.primary,
        selectedTextColor: color || colors.primary,
      },
    },
  },
});

const setRootHome = async (currentTabIndex?: number): Promise<void> => {
  const homeIcon = await MaterialVectorIcon.getImageSource('home', 30);
  const moreIcon = await MaterialVectorIcon.getImageSource('dots-horizontal', 30);
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            currentTabIndex: currentTabIndex || 0,
            titleDisplayMode: 'alwaysShow',
          },
        },
        children: [
          getTabItem({
            screenName: screenNames.HomeScreen,
            icon: homeIcon,
            text: i18next.t('common.home'),
          }),
          getTabItem({
            screenName: screenNames.SettingsScreen,
            icon: moreIcon,
            text: i18next.t('common.settings'),
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
  navigateTo,
  goBack,
  changeTab,
};
