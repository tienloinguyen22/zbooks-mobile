import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  value: {
    color: colors.grey,
  },
  right: {
    flexDirection: 'row-reverse',
    minWidth: 100,
  },
});
