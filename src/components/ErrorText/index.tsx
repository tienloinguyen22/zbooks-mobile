import React, { ReactNode } from 'react';
import { TextStyle } from 'react-native';
import { Text } from '../Text';
import { addStyles } from '@app/core';
import { styles } from './styles';

interface Props {
  children: ReactNode;
  style?: TextStyle;
}

export const ErrorText = (props: Props) => {
  let style = addStyles<TextStyle>(styles.error, props.style);
  return (
    <Text {...props} style={style}>
      {props.children}
    </Text>
  );
};
