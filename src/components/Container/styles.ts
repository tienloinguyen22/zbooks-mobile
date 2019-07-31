import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    backgroundColor: colors.primary,
    height: 50,
    flex: 0,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  title: {
    color: colors.white,
  },
  icon: {
    color: colors.white,
  },
  body: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
