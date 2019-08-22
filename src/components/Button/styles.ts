import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  default: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 45,
  },
  rounded: {
    borderRadius: 20,
  },
  success: {
    backgroundColor: colors.green,
  },
  info: {
    backgroundColor: colors.blue,
  },
  warning: {
    backgroundColor: colors.orange,
  },
  danger: {
    backgroundColor: colors.red,
  },
});
