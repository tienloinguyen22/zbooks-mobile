import { StyleSheet } from 'react-native';
import { colors } from '../../core';

export const styles = StyleSheet.create({
  coverContainer: {
    margin: 12,
    backgroundColor: colors.lightGrey,
    borderRadius: 4,
  },
  largeImage: {
    width: 140,
    height: 220,
    borderRadius: 4,
  },
  smallContainer: {
    width: 124,
  },
  smallImage: {
    width: 100,
    height: 160,
    borderRadius: 4,
  },
  nameContainer: {
    marginTop: 15,
    paddingHorizontal: 12,
  },
  author: {
    marginTop: 4,
  },
});
