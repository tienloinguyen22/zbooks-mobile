import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

const diameter = 18;
const innerDiameter = 12;

export const styles = StyleSheet.create({
  container: {
    height: 45,
  },
  outerCircle: {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    borderWidth: 1,
  },
  innerCircle: {
    width: innerDiameter,
    height: innerDiameter,
    borderRadius: innerDiameter / 2,
    backgroundColor: colors.primaryColor,
  },
});
