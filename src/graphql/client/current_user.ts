import { apolloClient } from '../apollo_client';

export interface User {
  id: string;
  email: string;
  fullName: string;
  countryCode?: string;
  phoneNo?: string;
  address?: string;
  avatarUrl?: string;
  dob?: string;
  gender?: string;
  firebaseId: string;
  isLoggedIn: boolean;
  preferenceCategories: string[];
}

export const initialCurrentUser = {
  id: '',
  email: '',
  fullName: '',
  countryCode: '',
  phoneNo: '',
  address: '',
  avatarUrl: '',
  dob: '',
  gender: '',
  firebaseId: '',
  isLoggedIn: false,
  preferenceCategories: [],
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
