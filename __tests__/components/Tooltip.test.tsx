import React from 'react';
import { render } from '@testing-library/react-native';
import { Tooltip } from '@app/components';
import { colors, THEME_DARK } from '@app/core';
import { mockTheme } from '../test_helpers';

describe('components/Tooltip', () => {
  beforeEach(() => {
    mockTheme(THEME_DARK);
  });

  it('renders successfully', async () => {
    const { baseElement } = render(<Tooltip />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with pointer successfully', async () => {
    const { baseElement } = render(<Tooltip withPointer />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with toggleOnPress successfully', async () => {
    const { baseElement } = render(<Tooltip toggleOnPress />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with overlay successfully', async () => {
    const { baseElement } = render(<Tooltip withOverlay overlayColor={colors.black} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with custom size successfully', async () => {
    const { baseElement } = render(<Tooltip width={100} height={100} />);

    expect(baseElement).toMatchSnapshot();
  });

  it('renders with custom color successfully', async () => {
    const { baseElement } = render(
      <Tooltip
        pointerColor={colors.white}
        overlayColor={colors.black}
        backgroundColor={colors.black}
        highlightColor={colors.white}
      />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
