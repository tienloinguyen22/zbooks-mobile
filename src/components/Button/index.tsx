import React, { ReactNode } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { addStyles, colors } from '@app/core';
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
  if (props.disabled) {
    buttonStyle = addStyles<ViewStyle>(buttonStyle, { backgroundColor: colors.grey });
  }
  // work around to re-render component after changing disable state
  return (
    <>
      {props.disabled && (
        <NativeBaseButton {...props} style={buttonStyle} rounded={props.rounded !== false}>
          {props.children}
        </NativeBaseButton>
      )}
      {!props.disabled && (
        <NativeBaseButton {...props} style={buttonStyle} rounded={props.rounded !== false}>
          {props.children}
        </NativeBaseButton>
      )}
    </>
  );
};
