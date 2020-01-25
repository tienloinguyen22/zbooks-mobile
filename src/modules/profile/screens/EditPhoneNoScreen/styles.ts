import { StyleSheet } from 'react-native';
import { colors } from '../../../../core';

export const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 42,
    height: 320,
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
  countryCodeContainer: {
    flex: 1,
    marginTop: 16,
  },
  countryCodeItem: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});
