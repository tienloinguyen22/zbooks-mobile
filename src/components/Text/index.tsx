import React, { ReactNode, useState } from 'react';
import { Text as NBText, NativeBase } from 'native-base';
import { combineStyles, useTheme, useEffectOnce, colors } from '@app/core';
import { styles } from './styles';

interface Props extends NativeBase.Text {
  primary?: boolean;
  children?: ReactNode;
  white?: boolean;
  large?: boolean;
  normal?: boolean;
  medium?: boolean;
  small?: boolean;
  bold?: boolean;
  semiBold?: boolean;
}

export const Text = (props: Props): JSX.Element => {
  const { primaryColor, textColor } = useTheme();
  const [toggleRefresh, setToggleRefresh] = useState<boolean>(false);
  useEffectOnce(() => {
    setToggleRefresh(!toggleRefresh);
  });

  const style = combineStyles(
    styles.default,
    {
      color: textColor,
    },
    props.style,
    props.primary && {
      color: primaryColor,
    },
    props.white && {
      color: colors.white,
    },
    props.large && styles.large,
    props.normal && styles.normal,
    props.small && styles.small,
    props.medium && styles.medium,
    props.bold && styles.bold,
    props.semiBold && styles.semiBold,
  );

  return (
    <>
      {toggleRefresh && (
        <NBText {...props} style={style}>
          {props.children}
        </NBText>
      )}
      {!toggleRefresh && (
        <NBText {...props} style={style}>
          {props.children}
        </NBText>
      )}
    </>
  );
};
