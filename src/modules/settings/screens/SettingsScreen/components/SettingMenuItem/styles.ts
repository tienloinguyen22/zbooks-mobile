import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
  },
  menuItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    height: 50,
    paddingRight: 4,
  },
});
