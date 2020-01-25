import React from 'react';
import { View as RNVIew, ViewProps } from 'react-native';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props extends ViewProps {
  flex?: number;
  center?: boolean;
  centerVertical?: boolean;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
  spread?: boolean;
  children?: React.ReactNode;
}

export const View = (props: Props): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let centerStyle: any = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let centerVerticalStyle: any = {};

  if (props.row) {
    centerStyle = {
      justifyContent: 'center',
    };
    centerVerticalStyle = {
      alignItems: 'center',
    };
  } else if (props.column) {
    centerStyle = {
      alignItems: 'center',
    };
    centerVerticalStyle = {
      justifyContent: 'center',
    };
  }

  const viewStyle = combineStyles(
    styles.default,
    props.style,
    props.spread && styles.spread,
    props.center && centerStyle,
    props.centerVertical && centerVerticalStyle,
    props.row && styles.row,
    props.column && styles.column,
    props.rowReverse && styles.rowReverse,
    props.columnReverse && styles.columnReverse,
    !!props.flex && {
      flex: props.flex,
    },
  );

  return (
    <RNVIew {...props} style={viewStyle}>
      {props.children}
    </RNVIew>
  );
};
