import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { config } from '@app/config';
import { persistCache, CachePersistor } from 'apollo-cache-persist';
import storage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';
import { initialAppSettings } from './client/settings';
import { initialCurrentUser } from './client/current_user';
import { authService } from '../services';

const cache = new InMemoryCache();

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

export const persistor = new CachePersistor({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: cache as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage: storage as any,
});

persistCache({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: cache as any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  storage: storage as any,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpLink: any = new HttpLink({
  uri: config.apollo.uri,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authLink: any = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await authService.getIdToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const apolloClient = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {},
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
    query: {
      // fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
