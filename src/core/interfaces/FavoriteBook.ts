import { ISODate, Book } from '@app/core';
import { User } from '@app/graphql';

export interface FavoriteBook {
  id: string;
  user: User;
  book: Book;
  createdBy?: string;
  createdAt?: ISODate;
  lastModifiedBy?: string;
  lastModifiedAt?: ISODate;
}
