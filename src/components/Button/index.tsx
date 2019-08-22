import React, { ReactNode, useState } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { combineStyles } from '@app/core';
import { useTheme, useEffectOnce } from '@app/hooks';
import { styles } from './styles';

interface Props extends NativeBase.Button {
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
