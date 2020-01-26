import React, { ReactNode } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { View } from '../View';

interface Props extends TouchableOpacityProps {
  onPress?: () => void;
  children?: ReactNode;
}

export const Touchable = (props: Props): JSX.Element => {
  const emptyStyle = {};

  return (
    <TouchableOpacity onPress={props.onPress} {...props} style={emptyStyle}>
      <View {...props}>{props.children}</View>
    </TouchableOpacity>
  );
};
