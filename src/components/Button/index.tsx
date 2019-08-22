import React, { ReactNode, useState } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { combineStyles, useTheme, useEffectOnce } from '@app/core';
import { styles } from './styles';

interface Props extends NativeBase.Button {
  outline?: boolean;
  children?: ReactNode;
}

export const Button = (props: Props): JSX.Element => {
  const { primaryColor } = useTheme();
  const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);
  useEffectOnce(() => {
    setToggleRefresh(!toggleRefresh);
  });
  const style = combineStyles(
    styles.default,
    {
      backgroundColor: primaryColor,
    },
    props.style,
    props.transparent && styles.transparent,
    props.disabled && styles.disabled,
    props.outline && styles.outline,
    props.outline && {
      borderColor: primaryColor,
    },
  );
  const rounded = props.rounded !== false;

  // work around to re-render component after changing state
  return (
    <>
      {toggleRefresh && (
        <NativeBaseButton {...props} style={style} rounded={rounded}>
          {props.children}
        </NativeBaseButton>
      )}
      {!toggleRefresh && (
        <NativeBaseButton {...props} style={style} rounded={rounded}>
          {props.children}
        </NativeBaseButton>
      )}
    </>
  );
};
