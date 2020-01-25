import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  rootContainerBackground: {
    flex: 0,
  },
  rootContainer: {
    flex: 1,
  },
  header: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    minWidth: 150,
    paddingHorizontal: 30,
  },
  title: {
    color: colors.white,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
  backButton: {
    width: 50,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 16,
  },
});
