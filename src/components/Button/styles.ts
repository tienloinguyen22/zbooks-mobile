import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  default: {
    backgroundColor: colors.primary,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  outline: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
