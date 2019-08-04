import React, { ReactNode } from 'react';
import { Text as NBText, NativeBase } from 'native-base';
import { colors, combineStyles } from '@app/core';
import { styles } from './styles';

interface Props extends NativeBase.Text {
  primary?: boolean;
  children?: ReactNode;
}

export const Text = (props: Props): JSX.Element => {
  const style = combineStyles(
    styles.default,
    props.style,
    props.primary && {
      color: colors.primary,
    },
  );

  return (
    <NBText {...props} style={style}>
      {props.children}
    </NBText>
  );
};
