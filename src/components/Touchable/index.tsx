import React, { ReactNode } from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

interface Props {
  onPress?: () => void;
  children?: ReactNode;
}

export const Touchable = ({ children, onPress }: Props): JSX.Element => {
  if (Platform.OS === 'ios') {
    return <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>;
  }
  return <TouchableNativeFeedback onPress={onPress}>{children}</TouchableNativeFeedback>;
};
