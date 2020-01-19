import React from 'react';
import { TextInput, ViewStyle, TextInputProps } from 'react-native';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props extends TextInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref?: any;
}

const Input = (props: Props): JSX.Element => {
  const style = combineStyles<ViewStyle>(styles.default, props.style);

  return <TextInput {...props} style={style} />;
};

export { Input };
