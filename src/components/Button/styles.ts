import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
  },
  default: {
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
  },
});
