import { ApolloCache } from '@apollo/client';
import { Resolvers } from 'apollo-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolverFn = (parent: any, args: any, { cache }: { cache: ApolloCache<any> }) => any;

export interface ResolverMap {
  [field: string]: ResolverFn;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppResolvers extends Resolvers {
  // We will update this with our app's resolvers later
}
