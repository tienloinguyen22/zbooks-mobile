import React from 'react';
import { ScreenProps, i18n } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { Text, Button, BaseLayout } from '@app/components';
import { useTranslation } from 'react-i18next';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ changeLanguage, currentUser }: Props) => {
  const { t } = useTranslation();
  const changeToVietnamese = () => changeLanguage(i18n.LANGUAGE_VI);
  const changeToEnglish = () => changeLanguage(i18n.LANGUAGE_EN);

  const logout = () => {};
  return (
    <BaseLayout>
      <Text>{t('settings.settings')}</Text>
      <Text>User: ${currentUser.displayName}</Text>
      <Button onPress={changeToVietnamese}>
        <Text>Change to Vietnames</Text>
      </Button>
      <Button onPress={changeToEnglish}>
        <Text>Change to English</Text>
      </Button>
      <Button onPress={logout}>
        <Text>Logout</Text>
      </Button>
    </BaseLayout>
  );
};
