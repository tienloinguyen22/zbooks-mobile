import React, { useState } from 'react';
import { Card, CardItem, Text, View, Button, Picker } from '@app/components';
import { i18n, Language } from '@app/core';
import { styles } from './styles';

export const PickerSample = (): JSX.Element => {
  const [language, setLanguage] = useState<string>('vi');
  const changeLanguage = (): void => {
    Picker.show<string>({
      dataSources: i18n.LANGUAGES.map((lang: Language) => ({
        value: lang.id,
        text: lang.name,
      })),
      initialValue: language,
      onValueChanged: setLanguage,
    });
  };

  return (
    <Card>
      <CardItem header bordered>
        <Text primary>Picker</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Text>{language}</Text>
          <Button onPress={changeLanguage} style={styles.button}>
            <Text>Change Language</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
