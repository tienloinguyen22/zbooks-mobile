import React, { ReactNode } from 'react';
import { Text as NBText, NativeBase } from 'native-base';
import { addStyles, colors } from '@app/core';
import { styles } from './styles';
import { TextStyle } from 'react-native';

interface Props extends NativeBase.Text {
  primary?: boolean;
  children?: ReactNode;
}

export const Text = (props: Props) => {
  let textStyle = addStyles<TextStyle>(styles.text, props.style);
  if (props.primary) {
    textStyle = addStyles<TextStyle>(textStyle, { color: colors.primary });
  }

  return (
    <NBText {...props} style={textStyle}>
      {props.children}
    </NBText>
  );
};
