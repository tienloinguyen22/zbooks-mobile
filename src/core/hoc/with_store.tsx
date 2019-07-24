import React, { Component, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@app/store';

export const withStore = (WrappedComponent: any) => {
  return class extends Component {
    render(): ReactNode {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <Provider store={store}>
          <WrappedComponent {...this.props} />
        </Provider>
      );
    }
  };
};
