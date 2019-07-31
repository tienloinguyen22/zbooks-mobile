import React, { ReactNode } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { addStyles } from '@app/core';
import { styles } from './styles';
import { ViewStyle } from 'react-native';

interface Props extends NativeBase.Button {
  children?: ReactNode;
}

export const Button = (props: Props) => {
  let buttonStyle = addStyles(styles.button, props.style);
  if (props.transparent) {
    buttonStyle = addStyles<ViewStyle>(buttonStyle, { backgroundColor: 'transparent' });
  }

  return (
    <NativeBaseButton {...props} style={buttonStyle} rounded={props.rounded !== false}>
      {props.children}
    </NativeBaseButton>
  );
};
