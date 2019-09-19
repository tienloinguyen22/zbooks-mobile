import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { navigationService, authService } from '@app/services';
import { store, Dispatch, RootState } from '@app/store';
import { THEME_DARK, screenNames, sleep, ErrorWithCode, User } from '@app/core';
import * as handleError from '@app/core/helpers/handle_error';
import { EmailLoginScreen } from '@app/modules/auth/screens';
import { mockTheme } from '../../../test_helpers';

describe('modules/auth/screen/EmailLoginScreen', () => {
  const componentId = 'componentId';
  const email = 'email@email.com';
  const password = 'Password@12345';
  beforeEach(() => {
    mockTheme(THEME_DARK);
    navigationService.navigateTo = jest.fn();
    navigationService.setRootEmailVerification = jest.fn();
    store.getState = () =>
      (({
        settings: {
          language: 'en',
        },
      } as unknown) as RootState);
    store.dispatch = ({
      currentUser: {
        login: jest.fn(),
      },
    } as unknown) as Dispatch;
  });

  it('renders successfully', async () => {
    const { baseElement } = render(<EmailLoginScreen componentId={componentId} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with Vietnamese language', async () => {
    store.getState = () =>
      (({
        settings: {
          language: 'vi',
        },
      } as unknown) as RootState);

    const { baseElement } = render(<EmailLoginScreen componentId={componentId} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('navigates to Forgot Password screen after Forgot Password button is pressed', async () => {
    const { getByText } = render(<EmailLoginScreen componentId={componentId} />);
    const buttonForgotPassword = getByText('emailLoginScreen.forgotPassword');
    fireEvent.press(buttonForgotPassword);

    expect(navigationService.navigateTo).toBeCalledWith({
      componentId,
      screenName: screenNames.ForgotPasswordScreen,
    });
  });

  it('navigates to home when user logins successfully', async () => {
    const user: User = {
      id: 'id',
      avatarUrl: 'avatarUrl',
      isLoggedIn: true,
      loginType: 'EMAIL',
      emailVerified: true,
    };
    jest.spyOn(authService, 'signInWithEmailAndPassword').mockImplementation(async () => user);
    jest.spyOn(navigationService, 'setRootHome').mockImplementation(async () => {});

    const { getByPlaceholderText, getAllByText } = render(<EmailLoginScreen componentId={componentId} />);
    const buttonLogin = getAllByText('emailLoginScreen.login')[1];
    const fieldEmail = getByPlaceholderText('emailLoginScreen.email');
    const fieldPassword = getByPlaceholderText('emailLoginScreen.password');
    fireEvent.changeText(fieldEmail, email);
    fireEvent.changeText(fieldPassword, password);
    fireEvent.press(buttonLogin);

    // wait for event triggered by Formik
    await sleep(1000);

    expect(authService.signInWithEmailAndPassword).toBeCalledWith(email, password);
    expect(store.dispatch.currentUser.login).toBeCalledWith(user);
    expect(navigationService.setRootHome).toBeCalledTimes(1);
  });

  it('navigates to Email Verification screen when user logins successfully but his email is not verified', async () => {
    jest.spyOn(authService, 'signInWithEmailAndPassword').mockImplementation(async () => ({
      id: 'id',
      avatarUrl: 'avatarUrl',
      isLoggedIn: true,
      loginType: 'EMAIL',
      emailVerified: false,
    }));

    const { getByPlaceholderText, getAllByText } = render(<EmailLoginScreen componentId={componentId} />);
    const buttonLogin = getAllByText('emailLoginScreen.login')[1];
    const fieldEmail = getByPlaceholderText('emailLoginScreen.email');
    const fieldPassword = getByPlaceholderText('emailLoginScreen.password');
    fireEvent.changeText(fieldEmail, email);
    fireEvent.changeText(fieldPassword, password);
    fireEvent.press(buttonLogin);

    // wait for event triggered by Formik
    await sleep(1000);

    expect(authService.signInWithEmailAndPassword).toBeCalledWith(email, password);
    expect(navigationService.setRootEmailVerification).toBeCalledTimes(1);
  });

  it('shows warnings if wrong password is inputted', async () => {
    jest.spyOn(authService, 'signInWithEmailAndPassword').mockImplementation(async () => {
      const error = new Error() as ErrorWithCode;
      error.code = 'auth/wrong-password';
      throw error;
    });
    jest.spyOn(handleError, 'handleError').mockImplementation(async () => {});

    const { getByPlaceholderText, getAllByText } = render(<EmailLoginScreen componentId={componentId} />);
    const buttonLogin = getAllByText('emailLoginScreen.login')[1];
    const fieldEmail = getByPlaceholderText('emailLoginScreen.email');
    const fieldPassword = getByPlaceholderText('emailLoginScreen.password');
    fireEvent.changeText(fieldEmail, email);
    fireEvent.changeText(fieldPassword, password);
    fireEvent.press(buttonLogin);

    // wait for event triggered by Formik
    await sleep(1000);

    expect(handleError.handleError).toBeCalled();
  });

  it('shows warnings if information is inputted incorrectly', async () => {
    jest.spyOn(authService, 'signInWithEmailAndPassword').mockImplementation(async () => {
      const error = new Error() as ErrorWithCode;
      error.code = 'auth/wrong-password';
      throw error;
    });
    jest.spyOn(handleError, 'handleError').mockImplementation(async () => {});

    const { getByPlaceholderText, getAllByText, getByText } = render(<EmailLoginScreen componentId={componentId} />);
    const buttonLogin = getAllByText('emailLoginScreen.login')[1];
    const fieldEmail = getByPlaceholderText('emailLoginScreen.email');
    const fieldPassword = getByPlaceholderText('emailLoginScreen.password');
    fireEvent.changeText(fieldEmail, email);
    fireEvent.changeText(fieldPassword, '');
    fireEvent.press(buttonLogin);

    // wait for event triggered by Formik
    await sleep(1000);
    const error = getByText('error.required');

    expect(authService.signInWithEmailAndPassword).not.toBeCalled();
    expect(error).toBeDefined();
  });
});
