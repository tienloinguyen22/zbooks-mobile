import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Container } from '@app/components';
import { navigationService } from '@app/services';

beforeAll(() => {});

describe('components/Container', () => {
  const headerTitle = 'App header';
  const backButtonText = '';

  beforeEach(() => {
    jest.mock('@app/core', () => ({
      colors: {
        primaryColor: 'blue',
      },
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders successfully', async () => {
    const { baseElement } = render(<Container />);
    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with its header', async () => {
    const { baseElement, getByText } = render(<Container showHeader headerTitle={headerTitle} />);
    expect(getByText(headerTitle)).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });

  it('renders successfully with its header and Back button', async () => {
    const { baseElement, getByText } = render(
      <Container showHeader headerTitle={headerTitle} showBackButton componentId='1' />,
    );
    expect(getByText(headerTitle)).toBeDefined();
    expect(getByText(backButtonText)).toBeDefined();
    expect(baseElement).toMatchSnapshot();
  });

  it('go back when clicking Back button', async () => {
    navigationService.goBack = jest.fn();
    const { getByText } = render(<Container showHeader headerTitle={headerTitle} showBackButton componentId='1' />);
    const button = getByText(backButtonText);
    fireEvent.press(button);
    expect(navigationService.goBack).toBeCalledTimes(1);
  });
});
