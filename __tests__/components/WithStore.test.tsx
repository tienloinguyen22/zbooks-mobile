import { render } from '@testing-library/react-native';
import { WithStore } from '@app/components';
import { LoginScreen } from '@app/modules/auth/screens';
import { THEME_DARK } from '@app/core';
import { mockTheme } from '../helper';

describe('components/WithStore', () => {
  beforeEach(() => {
    mockTheme(THEME_DARK);
  });

  it('renders successfully', async () => {
    const { baseElement } = render(WithStore(LoginScreen));
    expect(baseElement).toMatchSnapshot();
  });
});
