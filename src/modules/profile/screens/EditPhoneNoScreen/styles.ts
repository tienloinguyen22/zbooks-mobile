import { StyleSheet } from 'react-native';
import { colors } from '../../../../core';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    height: 400,
  },
  titleContainer: {
    paddingVertical: 20,
    paddingBottom: 32,
  },
  countryCodeText: {
    color: colors.link,
    marginRight: 4,
  },
  countryCodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
