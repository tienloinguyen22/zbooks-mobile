import { render, fireEvent } from '@testing-library/react-native';
import { Screen } from '@app/modules/auth/screens/LoginScreen/screen';
import React from 'react';
import { navigationService, authService, LoginResult } from '@app/services';

jest.mock('@app/store', () => {
  return {
    connect: jest.fn().mockReturnValue(() => jest.fn()),
    store: {
      getState: () => ({
        settings: {
          primaryColorCode: 'red',
          theme: 'theme',
        },
      }),
    },
  };
});

jest.mock('@app/modules/auth/screens/LoginScreen/map_state_to_props', () => {
  return {
    mapStateToProps: jest.fn().mockReturnValue(() => ({
      shouldShownUpdateWarning: true,
    })),
  };
});

jest.mock('@app/modules/auth/screens/LoginScreen/map_dispatch_to_props', () => {
  return {
    login: jest.fn().mockReturnValue(() => ({})),
    updateShownUpdateWarning: jest.fn().mockReturnValue(() => ({})),
  };
});

describe('modules/auth/screen/LoginScreen', () => {
  it('renders successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();

    const { baseElement } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });

  it('logins facebook successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    authService.loginFacebook = jest.fn().mockImplementation(
      async (): Promise<LoginResult> => {
        return {
          isSuccessful: true,
          user: {
            id: 'id',
            isLoggedIn: true,
            loginType: 'FACEBOOK',
          },
        };
      },
    );
    navigationService.setRootHome = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginFacebook = getByText('loginScreen.loginWith Facebook');
    fireEvent.press(buttonLoginFacebook);

    expect(authService.loginFacebook).toBeCalledTimes(1);
    // expect(navigationService.setRootHome).toBeCalledTimes(1);
  });

  it('logins facebook with error message', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    authService.loginFacebook = jest.fn().mockImplementation(
      async (): Promise<LoginResult> => {
        return {
          isSuccessful: false,
          isCancelled: false,
          errorMessage: 'message',
        };
      },
    );
    navigationService.setRootHome = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginFacebook = getByText('loginScreen.loginWith Facebook');
    fireEvent.press(buttonLoginFacebook);

    expect(authService.loginFacebook).toBeCalledTimes(1);
    expect(navigationService.setRootHome).toBeCalledTimes(0);
  });

  it('logins facebook without error message', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    authService.loginFacebook = jest.fn().mockImplementation(
      async (): Promise<LoginResult> => {
        return {
          isSuccessful: false,
          isCancelled: false,
          errorMessage: '',
        };
      },
    );
    navigationService.setRootHome = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginFacebook = getByText('loginScreen.loginWith Facebook');
    fireEvent.press(buttonLoginFacebook);

    expect(authService.loginFacebook).toBeCalledTimes(1);
    expect(navigationService.setRootHome).toBeCalledTimes(0);
  });

  it('logins facebook with throw error', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    authService.loginFacebook = jest.fn().mockImplementation(() => {
      throw new Error('Login error');
    });
    navigationService.setRootHome = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={false}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginFacebook = getByText('loginScreen.loginWith Facebook');
    fireEvent.press(buttonLoginFacebook);

    expect(authService.loginFacebook).toBeCalledTimes(1);
    expect(navigationService.setRootHome).toBeCalledTimes(0);
  });

  it('presses login google successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    authService.loginGoogle = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginGoogle = getByText('loginScreen.loginWith Google');
    fireEvent.press(buttonLoginGoogle);

    expect(authService.loginGoogle).toBeCalledTimes(1);
  });

  it('presses login with email successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    navigationService.navigateTo = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginEmail = getByText('loginScreen.loginWithEmail');
    fireEvent.press(buttonLoginEmail);

    expect(navigationService.navigateTo).toBeCalledTimes(1);
  });

  it('presses login with phoneNo successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    navigationService.navigateTo = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonLoginWithPhoneNo = getByText('loginScreen.loginWithPhoneNo');
    fireEvent.press(buttonLoginWithPhoneNo);

    expect(navigationService.navigateTo).toBeCalledTimes(1);
  });

  it('presses registerEmail successfully', async () => {
    const login = jest.fn();
    const updateShownUpdateWarning = jest.fn();
    navigationService.navigateTo = jest.fn();

    const { getByText } = render(
      <Screen
        login={login}
        componentId={''}
        shouldShownUpdateWarning={true}
        updateShownUpdateWarning={updateShownUpdateWarning}
      />,
    );
    const buttonRegisterEmail = getByText('loginScreen.registerByEmail');
    fireEvent.press(buttonRegisterEmail);

    expect(navigationService.navigateTo).toBeCalledTimes(1);
  });
});
