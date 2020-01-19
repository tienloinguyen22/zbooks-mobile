import React, { ReactNode } from 'react';
import { TouchableOpacity, ViewProps } from 'react-native';
import { View } from '../View';

interface Props extends ViewProps {
  onPress?: () => void;
  children?: ReactNode;
}

export const Touchable = (props: Props): JSX.Element => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View {...props}>{props.children}</View>
    </TouchableOpacity>
  );
};
