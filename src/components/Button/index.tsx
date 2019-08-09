import React, { ReactNode } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props extends NativeBase.Button {
  children?: ReactNode;
}

export const Button = (props: Props): JSX.Element => {
  const style = combineStyles(
    styles.default,
    props.style,
    props.transparent && styles.transparent,
    props.disabled && styles.disabled,
  );
  const rounded = props.rounded !== false;

  // work around to re-render component after changing disable state
  return (
    <>
      {props.disabled && (
        <NativeBaseButton {...props} style={style} rounded={rounded}>
          {props.children}
        </NativeBaseButton>
      )}
      {!props.disabled && (
        <NativeBaseButton {...props} style={style} rounded={rounded}>
          {props.children}
        </NativeBaseButton>
      )}
    </>
  );
};
