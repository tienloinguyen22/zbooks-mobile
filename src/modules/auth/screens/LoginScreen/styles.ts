import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  appIcon: {
    width: 150,
    height: 150,
    margin: 20,
  },
  button: {
    marginBottom: 20,
    width: 300,
    alignSelf: 'center',
  },
  facebookButton: {
    backgroundColor: colors.facebook,
  },
  googleButton: {
    backgroundColor: colors.google,
  },
  notHaveAccountText: {
    marginBottom: 20,
  },
  icon: {
    marginRight: 40,
  },
});
