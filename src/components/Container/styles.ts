import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  rootContainerBackground: {
    flex: 0,
    backgroundColor: colors.primary,
  },
  rootContainer: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    height: 50,
    flexDirection: 'row',
    alignSelf: 'flex-start',
  },
  title: {
    color: colors.white,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
