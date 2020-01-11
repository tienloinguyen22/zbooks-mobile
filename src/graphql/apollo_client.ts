import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { config } from '@app/config';
import { initialAppSettings } from './client/settings';
import { initialCurrentUser } from './client/current_user';

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: config.apollo.uri,
  }),
  resolvers: {},
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});

cache.writeData({
  data: {
    appSettings: {
      ...initialAppSettings,
      __typename: 'appSettings',
    },
    currentUser: {
      ...initialCurrentUser,
      __typename: 'currentUser',
    },
  },
});
