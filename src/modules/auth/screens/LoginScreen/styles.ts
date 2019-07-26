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
    // flex: 1,
    // alignItems: 'center',
    // height: 30,
  },
  buttonFacebook: {
    backgroundColor: colors.facebook,
  },
  buttonGoogle: {
    backgroundColor: colors.google,
  },
});
