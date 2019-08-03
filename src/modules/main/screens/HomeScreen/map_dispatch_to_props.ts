import { Dispatch } from '@app/store';

interface MapDispatchToProps {
  incrementShark: () => void;
  incrementSharkAsync: () => void;
  incrementDolphin: () => void;
  incrementDolphinAsync: () => void;
}

export const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => ({
  incrementShark: () => dispatch.sharks.increment(1),
  incrementSharkAsync: () => dispatch.sharks.incrementAsync(1),
  incrementDolphin: () => dispatch.dolphins.increment(1),
  incrementDolphinAsync: () => dispatch.dolphins.incrementAsync(1),
});
