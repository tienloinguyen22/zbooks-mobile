import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@app/core';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  default: {
    width: width - 10,
    margin: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },
});
