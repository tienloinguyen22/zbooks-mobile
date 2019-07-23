import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import App from '@app/App';
import { Platform } from 'react-native';
import { i18n } from '@app/core';

jest.mock('react-native-splash-screen', () => ({
  hide: jest.fn(),
}));

beforeAll(() => {
  i18n.initialize();
});

describe('<App/>', () => {
  beforeEach(() => {
    Platform.OS = 'ios';
    (global as any).HermesInternal = undefined;
  });
  it('renders successfully with effect', async () => {
    const { getByText, baseElement } = render(<App />);

    expect(getByText('Effect loaded: true')).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders correctly on android platform', async () => {
    Platform.OS = 'android';
    const { getByText, baseElement } = render(<App />);

    expect(getByText('Platform: android')).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders correctly with hermes engine', async () => {
    (global as any).HermesInternal = true;
    const { getByText, baseElement } = render(<App />);

    expect(getByText('Engine: Hermes')).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });
  it('shows "Hello world" when clicking Hello button', async () => {
    const { getByText } = render(<App />);
    const button = getByText('Hello');
    fireEvent.press(button);

    expect(getByText('Hello world')).toBeDefined();
  });
});
