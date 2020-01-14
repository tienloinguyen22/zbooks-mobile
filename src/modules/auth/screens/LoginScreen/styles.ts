import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  appIconContainer: {
    marginBottom: 64,
    width: 160,
    height: 160,
    // backgroundColor: '#000',
    borderRadius: 160 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'linear-gradient(141deg, #9fb8ad 0%, #1fc8db 51%, #2cb5e8',
  },
  appIcon: {
    width: 80,
    height: 80,
    margin: 20,
  },
  button: {
    marginBottom: 20,
    width: 300,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
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
