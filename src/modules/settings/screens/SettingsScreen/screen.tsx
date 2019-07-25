import React from 'react';
import { ScreenProps, i18n } from '@app/core';
import { mapStateToProps } from './map_state_to_props';
import { mapDispatchToProps } from './map_dispatch_to_props';
import { View, Text, Button } from '@app/components';
import { useTranslation } from 'react-i18next';

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & ScreenProps;

export const Screen = ({ changeLanguage }: Props) => {
  const { t } = useTranslation();
  const changeToVietnamese = () => changeLanguage(i18n.LANGUAGE_VI);
  const changeToEnglish = () => changeLanguage(i18n.LANGUAGE_EN);
  return (
    <View>
      <Text>{t('settings.settings')}</Text>
      <Button onPress={changeToVietnamese}>
        <Text>Change to Vietnames</Text>
      </Button>
      <Button onPress={changeToEnglish}>
        <Text>Change to English</Text>
      </Button>
    </View>
  );
};
