import React, { useState } from 'react';
import { Card, CardItem, Text, View, Button, Picker, DatePicker, DateValue } from '@app/components';
import { i18n, Language } from '@app/core';
import { styles } from './styles';

export const PickerSample = (): JSX.Element => {
  const [language, setLanguage] = useState<string>('vi');
  const [date, setDate] = useState<DateValue>({
    year: 2019,
    month: 8,
    day: 6,
  });
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

  const changeDate = (): void => {
    DatePicker.show({
      initialValue: date,
      onValueChanged: setDate,
      fromYear: 1990,
      toYear: 2022,
    });
  };

  return (
    <Card>
      <CardItem bordered header>
        <Text bold>Picker</Text>
      </CardItem>
      <CardItem bordered>
        <View column>
          <Text>{language}</Text>
          <Button onPress={changeLanguage} style={styles.button}>
            <Text white>Change Language</Text>
          </Button>
          <Text>
            Year: {date.year} - Month: {date.month} - Day: {date.day}
          </Text>
          <Button onPress={changeDate} style={styles.button}>
            <Text white>Change Date</Text>
          </Button>
        </View>
      </CardItem>
    </Card>
  );
};
