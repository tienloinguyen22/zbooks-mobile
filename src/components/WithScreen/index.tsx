import React, { Component, ReactNode } from 'react';
import { Navigation } from 'react-native-navigation';
import * as Orientation from 'react-native-orientation';

interface State {
  isAppeared: boolean;
  toggleRefresh: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppComponent = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

interface Options {
  lazyLoad?: boolean;
  alwaysRefresh?: boolean;
  orientation?: 'LANDSCAPE-LEFT' | 'LANDSCAPE-RIGHT' | 'PORTRAIT' | 'LANDSCAPE';
}

export const WithScreen = (WrappedComponent: AppComponent, options?: Options): AppComponent => {
  return class HOCComponent extends Component<Props, State> {
    private constructor(props: Props) {
      super(props);
      Navigation.events().bindComponent(this);
      this.state = {
        isAppeared: false,
        toggleRefresh: false,
      };
    }

    public componentDidAppear(): void {
      if (!this.state.isAppeared) {
        this.setState({
          isAppeared: true,
        });
      }
      if (options && options.alwaysRefresh) {
        this.setState({
          toggleRefresh: !this.state.toggleRefresh,
        });
      }

      switch (options && options.orientation) {
        case 'PORTRAIT':
          Orientation.lockToPortrait();
          break;
        case 'LANDSCAPE':
          Orientation.lockToLandscape();
          break;
        case 'LANDSCAPE-LEFT':
          Orientation.lockToLandscapeLeft();
          break;
        case 'LANDSCAPE-RIGHT':
          Orientation.lockToLandscapeRight();
          break;
        default:
          Orientation.unlockAllOrientations();
      }
    }

    public componentDidDisappear(): void {
      // nothing for now
    }

    public render(): ReactNode {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      if (!this.state.isAppeared && options && (options.lazyLoad || options.alwaysRefresh)) {
        return <></>;
      }

      return <WrappedComponent {...this.props} toggleRefresh={this.state.toggleRefresh} />;
    }
  };
};
