import { store, connect } from '@app/store';
import { Screen } from '@app/modules/auth/screens/LoginScreen/screen';
import { mapDispatchToProps } from '@app/modules/auth/screens/LoginScreen/map_dispatch_to_props';
import { mapStateToProps } from '@app/modules/auth/screens/LoginScreen/map_state_to_props';

jest.mock('react-redux', () => ({
  connect: () => jest.fn(),
}));
jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockImplementation((_store, _persistorOptions, callback) => {
    callback && callback();
  }),
}));
jest.mock('@rematch/core', () => ({
  init: () => {
    return {
      getState: jest.fn().mockImplementation(() => ({
        settings: {
          appLoaded: false,
        },
      })),
      dispatch: {
        settings: {
          finishLoadingApp: jest.fn(),
        },
      },
    };
  },
  createModel: jest.fn(),
}));

describe('store/store', () => {
  it('runs successfully', async () => {
    expect(store).not.toBeNull();
  });

  it('calls redux connect succesfully', async () => {
    connect(
      mapStateToProps,
      mapDispatchToProps,
    )(Screen);
  });
});
