import React, { Component, ReactNode } from 'react';
import { Navigation } from 'react-native-navigation';
import { View } from '../View';

interface State {
  isAppeared: boolean;
}
export const WithLazyLoad = (WrappedComponent: any) => {
  return class extends Component<any, State> {
    constructor(props: any) {
      super(props);
      Navigation.events().bindComponent(this);
      this.state = {
        isAppeared: false,
      };
    }
    componentDidAppear(): void {
      this.setState({ isAppeared: true });
    }

    componentDidDisappear(): void {
      // do nothing for now
    }

    render(): ReactNode {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return <View>{this.state.isAppeared && <WrappedComponent {...this.props} />}</View>;
    }
  };
};
