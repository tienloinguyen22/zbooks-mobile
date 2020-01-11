import React from 'react';
import { ScreenProps } from '@app/core';
import { useTranslation } from 'react-i18next';
import { Container } from '@app/components';
import { Text } from 'react-native';

type Props = ScreenProps;

export const Screen = (_props: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Container showHeader headerTitle={t('settingsScreen.settings')}>
      <Text>Settings</Text>
    </Container>
  );
};
