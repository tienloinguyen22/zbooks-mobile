import React from 'react';
import { Card, CardItem, Text, View } from '@app/components';
import { styles } from './styles';

interface HeadingItem {
  label: string;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  s1?: boolean;
  s2?: boolean;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
}
const arrayHeadlines: HeadingItem[] = [
  {
    label: 'H1 Headline',
    h1: true,
  },
  {
    label: 'H2 Headline',
    h2: true,
  },
  {
    label: 'H3 Headline',
    h3: true,
  },
  {
    label: 'H4 Headline',
    h4: true,
  },
  {
    label: 'H5 Headline',
    h5: true,
  },
  {
    label: 'H6 Headline',
    h6: true,
  },
  {
    label: 'S1 Subtitle',
    s1: true,
  },
  {
    label: 'S2 Subtitle',
    s2: true,
  },
  {
    label: 'Success',
    success: true,
  },
  {
    label: 'Info',
    info: true,
  },
  {
    label: 'Warning',
    warning: true,
  },
  {
    label: 'Danger',
    danger: true,
  },
];
export const TextStyleSample = (): JSX.Element => (
  <Card>
    <CardItem bordered header>
      <Text bold>Sample Text</Text>
    </CardItem>
    <CardItem bordered>
      <View column>
        {arrayHeadlines.map((item) => (
          <View row style={styles.spaceBetweenRow} key={item.label}>
            <Text s2 style={styles.labelText}>
              {item.label}
            </Text>
            <Text
              h1={item.h1}
              h2={item.h2}
              h3={item.h3}
              h4={item.h4}
              h5={item.h5}
              h6={item.h6}
              s1={item.s1}
              s2={item.s2}
              success={item.success}
              info={item.info}
              warning={item.warning}
              danger={item.danger}
            >
              {'Sample Text'}
            </Text>
          </View>
        ))}
      </View>
    </CardItem>
  </Card>
);
