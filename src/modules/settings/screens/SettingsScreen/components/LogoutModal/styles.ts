import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
});
