import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const commonStyles = StyleSheet.create({
  boxShadow: {
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  textCenter: {
    textAlign: 'center',
  },
  maxWidth: {
    width: '100%',
  },
});
