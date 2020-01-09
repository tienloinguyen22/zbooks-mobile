import React, { Component } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@app/graphql';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithApolloClient = (WrappedComponent: any): any => {
  return class HOCComponent extends Component {
    public render(): JSX.Element {
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <ApolloProvider client={apolloClient}>
          <WrappedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
