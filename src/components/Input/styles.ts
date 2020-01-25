import { StyleSheet } from 'react-native';
import { colors } from '../../core';

export const styles = StyleSheet.create({
  default: {
    borderRadius: 20,
    width: 200,
    height: 45,
    backgroundColor: colors.lightGrey,
    paddingHorizontal: 12,
  },
  rightContent: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: colors.grey,
    marginLeft: 8,
    paddingLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
});
