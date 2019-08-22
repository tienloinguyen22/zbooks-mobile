import React, { ReactNode, useState } from 'react';
import { Title as NBTitle, NativeBase } from 'native-base';
import { combineStyles, useTheme, useEffectOnce } from '@app/core';

interface Props extends NativeBase.Text {
  primary?: boolean;
  children?: ReactNode;
}

export const Title = (props: Props): JSX.Element => {
  const { primaryColor, textColor } = useTheme();
  const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);
  useEffectOnce(() => {
    setToggleRefresh(!toggleRefresh);
  });

  const style = combineStyles(
    {
      color: textColor,
    },
    props.style,
    props.primary && {
      color: primaryColor,
    },
  );

  return (
    <>
      {toggleRefresh && (
        <NBTitle {...props} style={style}>
          {props.children}
        </NBTitle>
      )}
      {!toggleRefresh && (
        <NBTitle {...props} style={style}>
          {props.children}
        </NBTitle>
      )}
    </>
  );
};
