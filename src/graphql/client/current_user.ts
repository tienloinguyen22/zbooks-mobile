import { apolloClient } from '../apollo_client';

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  firebaseId: string;
  isLoggedIn: boolean;
}

export const initialCurrentUser = {
  id: '',
  fullName: '',
  email: '',
  avatarUrl: '',
  firebaseId: '',
  isLoggedIn: false,
};

export const updateCurrentUser = (userInfo: Partial<User>): void => {
  apolloClient.cache.writeData({
    data: {
      currentUser: {
        ...userInfo,
      },
    },
  });
};
