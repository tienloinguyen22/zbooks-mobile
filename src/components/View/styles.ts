import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  default: { flex: 1 },
  flex: { flex: 1 },
  centerVertical: {
    flex: 1,
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  rowReverse: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  columnReverse: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
});
