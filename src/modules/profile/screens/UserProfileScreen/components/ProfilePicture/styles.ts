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
  button: {
    marginTop: 6,
  },
  buttonText: {
    color: colors.link,
  },
});
