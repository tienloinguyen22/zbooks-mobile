import React, { ReactNode } from 'react';
import { combineStyles, useTheme } from '@app/core';
import { ViewProps } from 'react-native';
import { View } from '../View';
import { styles } from './styles';

interface Props extends ViewProps {
  primary?: boolean;
  children?: ReactNode;
  bordered?: boolean;
}

export const CardItem = (props: Props): JSX.Element => {
  const { componentBackgroundColor } = useTheme();

  const style = combineStyles(
    styles.default,
    {
      backgroundColor: componentBackgroundColor,
    },
    props.style,
    props.bordered && styles.bordered,
  );

  return (
    <>
      <View {...props} style={style}>
        {props.children}
      </View>
    </>
  );
};
