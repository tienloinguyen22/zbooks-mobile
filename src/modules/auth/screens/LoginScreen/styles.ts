import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  appIconContainer: {
    marginBottom: 24,
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appIcon: {
    width: 80,
    height: 80,
    margin: 20,
  },
  button: {
    width: 300,
    borderRadius: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    margin: 12,
    marginBottom: 20,
  },
  facebookButton: {
    backgroundColor: colors.facebook,
  },
  googleButton: {
    backgroundColor: colors.white,
  },
  notHaveAccountText: {
    marginBottom: 20,
  },
  icon: {
    marginRight: 40,
  },
  textCenter: {
    textAlign: 'center',
    paddingHorizontal: 12,
  },
  titleContainer: {
    marginBottom: 12,
  },
  welcomeContainer: {
    marginBottom: 84,
  },
});
