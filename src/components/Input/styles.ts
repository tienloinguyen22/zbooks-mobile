import { StyleSheet, Platform } from 'react-native';
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
    marginLeft: 8,
    height: '100%',
  },
  borderRight: {
    borderLeftWidth: 1,
    borderLeftColor: colors.grey,
    paddingVertical: 12,
    paddingLeft: 8,
  },
  icon: {
    marginRight: Platform.OS === 'ios' ? 8 : 0,
  },
});
