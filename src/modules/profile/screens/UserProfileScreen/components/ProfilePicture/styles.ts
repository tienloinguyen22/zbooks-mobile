import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  backgroundImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 6,
  },
  buttonText: {
    color: colors.link,
  },
});
