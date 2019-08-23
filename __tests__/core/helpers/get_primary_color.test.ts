import { getPrimaryColor } from '@app/core';

describe('core/helpers/get_primary_color', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('returns default color if not found', async () => {
    const color = getPrimaryColor('notFoundColor', 'light');
    expect(color).toMatchSnapshot();
  });

  it('returns default light color if the current theme is light', async () => {
    const color = getPrimaryColor('red', 'light');
    expect(color).toMatchSnapshot();
  });

  it('returns default light color if the current theme is dark', async () => {
    const color = getPrimaryColor('red', 'dark');
    expect(color).toMatchSnapshot();
  });
});
