import React, { ReactNode, useState } from 'react';
import { CardItem as NBCardItem, NativeBase } from 'native-base';
import { combineStyles, useTheme, useEffectOnce } from '@app/core';

interface Props extends NativeBase.CardItem {
  primary?: boolean;
  children?: ReactNode;
}

export const CardItem = (props: Props): JSX.Element => {
  const { componentBackgroundColor } = useTheme();
  const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);
  useEffectOnce(() => {
    setToggleRefresh(!toggleRefresh);
  });

  const style = combineStyles(
    {
      backgroundColor: componentBackgroundColor,
    },
    props.style,
  );

  return (
    <>
      {toggleRefresh && (
        <NBCardItem {...props} style={style}>
          {props.children}
        </NBCardItem>
      )}
      {!toggleRefresh && (
        <NBCardItem {...props} style={style}>
          {props.children}
        </NBCardItem>
      )}
    </>
  );
};
