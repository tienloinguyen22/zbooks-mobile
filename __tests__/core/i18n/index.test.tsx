import { i18n } from '@app/core';

describe('core/i18n/index', () => {
  beforeEach(() => {});

  it('getLanguageName success', async () => {
    const english = i18n.getLanguageName('en');
    const vn = i18n.getLanguageName('vi');

    expect(english).toMatchInlineSnapshot(`"English"`);
    expect(vn).toMatchInlineSnapshot(`"Tiếng Việt"`);
  });

  it('getLanguageByName success', async () => {
    const english = i18n.getLanguageByName('English');
    const vn = i18n.getLanguageByName('Tiếng Việt');
    const undefinedLanguage = i18n.getLanguageByName('');

    expect(english).toBeDefined();
    expect(vn).toBeDefined();
    expect(undefinedLanguage).toMatchInlineSnapshot(`undefined`);
  });
});
