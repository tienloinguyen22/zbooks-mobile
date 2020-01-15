import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const commonStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
