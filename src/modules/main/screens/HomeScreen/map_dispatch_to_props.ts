import { Dispatch } from '@app/store';

export const mapDispatchToProps = (_dispatch: Dispatch) => ({
  incrementShark: () => _dispatch.sharks.increment(1),
  incrementSharkAsync: () => _dispatch.sharks.incrementAsync(1),
  incrementDolphin: () => _dispatch.dolphins.increment(1),
  incrementDolphinAsync: () => _dispatch.dolphins.incrementAsync(1),
});
