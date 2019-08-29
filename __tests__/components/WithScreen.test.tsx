import { render } from '@testing-library/react-native';
import { WithScreen, WithStore } from '@app/components';
import { LoginScreen } from '@app/modules/auth/screens';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../helper';

beforeAll(() => {});

describe('components/WithScreen', () => {
  beforeEach(() => {
    mockTheme(THEME_DARK);
  });

  it('renders portrait successfully', async () => {
    const { baseElement } = render(
      WithScreen(WithStore(LoginScreen), {
        orientation: 'PORTRAIT',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders landscape successfully', async () => {
    const { baseElement } = render(
      WithScreen(WithStore(LoginScreen), {
        orientation: 'LANDSCAPE',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders landscape left successfully', async () => {
    const { baseElement } = render(
      WithScreen(WithStore(LoginScreen), {
        orientation: 'LANDSCAPE-LEFT',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders landscape right successfully', async () => {
    const { baseElement } = render(
      WithScreen(WithStore(LoginScreen), {
        orientation: 'LANDSCAPE-RIGHT',
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('renders landscape default successfully', async () => {
    const { baseElement } = render(
      WithScreen(WithStore(LoginScreen), {
        orientation: undefined,
      }),
    );
    expect(baseElement).toMatchSnapshot();
  });
});
