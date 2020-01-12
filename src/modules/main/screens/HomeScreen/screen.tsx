import React from 'react';
import gql from 'graphql-tag';
import { ScreenProps } from '@app/core';
import { Container } from '@app/components';
import { useQuery } from '@apollo/client';
import { Text } from 'react-native';

type Props = ScreenProps;

const APP_SETTINGS = gql`
  query GetAppSettings {
    appSettings @client
  }
`;

export const Screen = ({ componentId }: Props): JSX.Element => {
  const { data } = useQuery(APP_SETTINGS);
  // eslint-disable-next-line no-console
  console.log('TCL: data', data);

  return (
    <Container componentId={componentId}>
      <Text>Home</Text>
    </Container>
  );
};
