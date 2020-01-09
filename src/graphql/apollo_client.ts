import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { config } from '@app/config';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: config.apollo.uri,
  }),
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
      fetchPolicy: 'network-only',
    },
  },
});
