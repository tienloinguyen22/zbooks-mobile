import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@app/core';

const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
  categoryText: {
    color: colors.black,
    padding: 10,
  },
  labelText: {
    color: colors.grey,
  },
  spaceBetweenRow: {
    flex: 1,
    width: width - 50,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
