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
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
