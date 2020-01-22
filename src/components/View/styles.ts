import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  default: {},
  center: {
    justifyContent: 'center',
  },
  centerVertical: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  spread: {
    justifyContent: 'space-between',
  },
});
