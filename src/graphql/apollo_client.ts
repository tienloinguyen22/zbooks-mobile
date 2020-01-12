import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { config } from '@app/config';
import { persistCache } from 'apollo-cache-persist';
import storage from '@react-native-community/async-storage';
import { initialAppSettings } from './client/settings';
import { initialCurrentUser } from './client/current_user';

const cache = new InMemoryCache();

persistCache({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: cache as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage: storage as any,
});

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
