import React, { ReactNode, useState } from 'react';
import { Card as NBCard, NativeBase } from 'native-base';
import { combineStyles } from '@app/core';
import { useTheme, useEffectOnce } from '@app/hooks';

interface Props extends NativeBase.Text {
  primary?: boolean;
  children?: ReactNode;
}

export const Card = (props: Props): JSX.Element => {
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
        <NBCard {...props} style={style}>
          {props.children}
        </NBCard>
      )}
      {!toggleRefresh && (
        <NBCard {...props} style={style}>
          {props.children}
        </NBCard>
      )}
    </>
  );
};
