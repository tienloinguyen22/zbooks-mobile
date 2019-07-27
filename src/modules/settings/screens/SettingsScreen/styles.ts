import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  displayName: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginTop: 20,
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius: 150,
    borderColor: colors.primary,
    borderWidth: 1,
    alignSelf: 'center',
  },
});
