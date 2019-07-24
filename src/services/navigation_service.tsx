import { Navigation, LayoutBottomTabsChildren } from 'react-native-navigation';
import { screenNames } from '@app/modules';
import { colors } from '@app/core';
import { MaterialVectorIcon } from '@app/components';
import i18next from 'i18next';

interface TabItem {
  screenName: string;
  text: string;
  icon: any;
  color?: string;
}

export interface NavigationOption {}

const navigateTo = ({
  screenName,
  componentId,
}: {
  screenName: string;
  componentId: string;
  options: NavigationOption;
}) => {
  Navigation.push(componentId, {
    component: {
      name: screenName,
    },
  });
};

const goBack = ({ componentId }: { componentId: string }) => {
  Navigation.pop(componentId);
};

const initializeNavigation = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {
        drawBehind: true,
        visible: false,
      },
    });
    setRootAppLoader();
  });
};

const setRootAppLoader = () => {
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
              name: screenNames.AppLoaderScreen,
            },
          },
        ],
      },
    },
  });
};

const setRootLogin = () => {
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
              name: screenNames.LoginScreen,
            },
          },
        ],
      },
    },
  });
};

const getTabItem = ({ screenName, icon, color, text }: TabItem): LayoutBottomTabsChildren => {
  return {
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
  };
};

const setRootHome = async (currentTabIndex?: number) => {
  const homeIcon = await MaterialVectorIcon.getImageSource('home', 30);
  const moreIcon = await MaterialVectorIcon.getImageSource('dots-horizontal', 30);
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            currentTabIndex: currentTabIndex || 0,
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
  initializeNavigation,
  setRootAppLoader,
  setRootHome,
  setRootLogin,
  navigateTo,
  goBack,
};
