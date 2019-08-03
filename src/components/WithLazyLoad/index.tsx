import React, { Component, ReactNode } from 'react';
import { Navigation } from 'react-native-navigation';

interface State {
  isAppeared: boolean;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppComponent = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

export const WithLazyLoad = (WrappedComponent: AppComponent): AppComponent => {
  return class HOCComponent extends Component<Props, State> {
    private constructor(props: Props) {
      super(props);
      Navigation.events().bindComponent(this);
      this.state = { isAppeared: false };
    }

    public componentDidAppear(): void {
      this.setState({ isAppeared: true });
    }

    public componentDidDisappear(): void {
      // do nothing for now
    }

    public render(): ReactNode {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      if (!this.state.isAppeared) {
        return null;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};
