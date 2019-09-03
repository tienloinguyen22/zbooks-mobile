import { currentUser, defaultUser, CurrentUserState } from '@app/store/models/currentUser';
import { ModelReducers } from '@rematch/core';

jest.mock('@rematch/core', () => ({
  createModel: (config: { reducers: ModelReducers<CurrentUserState> }) => config,
}));

describe('store/models/currentUser', () => {
  it('login', async () => {
    const loggedInUser: CurrentUserState = {
      id: '1',
      displayName: 'Thinh Tran',
      avatarUrl: '',
      isLoggedIn: true,
      emailVerified: undefined,
      loginType: 'EMAIL',
    };
    const { reducers } = (currentUser as unknown) as { reducers: ModelReducers<CurrentUserState> };
    const state = reducers.login(defaultUser, loggedInUser);

    expect(state).toMatchInlineSnapshot(`
      Object {
        "avatarUrl": "",
        "displayName": "Thinh Tran",
        "emailVerified": undefined,
        "id": "1",
        "isLoggedIn": true,
        "loginType": "EMAIL",
      }
    `);
  });

  it('logout', async () => {
    const { reducers } = (currentUser as unknown) as { reducers: ModelReducers<CurrentUserState> };
    const state = reducers.logout(defaultUser, undefined);
    expect(state).toMatchInlineSnapshot(`
      Object {
        "avatarUrl": "",
        "displayName": "",
        "emailVerified": undefined,
        "id": "",
        "isLoggedIn": false,
        "loginType": "EMAIL",
      }
    `);
  });

  it('update', async () => {
    const updatedUser: CurrentUserState = {
      id: '1',
      displayName: 'Thinh Tran',
      avatarUrl: 'avatarUrl',
      isLoggedIn: true,
      emailVerified: true,
      loginType: 'EMAIL',
    };
    const { reducers } = (currentUser as unknown) as { reducers: ModelReducers<CurrentUserState> };
    const state = reducers.update(defaultUser, updatedUser);
    expect(state).toMatchInlineSnapshot(`
      Object {
        "avatarUrl": "avatarUrl",
        "displayName": "Thinh Tran",
        "emailVerified": true,
        "id": "1",
        "isLoggedIn": true,
        "loginType": "EMAIL",
      }
    `);
  });

  it('markEmailVerified', async () => {
    const { reducers } = (currentUser as unknown) as { reducers: ModelReducers<CurrentUserState> };
    const state = reducers.markEmailVerified(defaultUser, undefined);
    expect(state).toMatchInlineSnapshot(`
      Object {
        "avatarUrl": "",
        "displayName": "",
        "emailVerified": true,
        "id": "",
        "isLoggedIn": false,
        "loginType": "EMAIL",
      }
    `);
  });
});
