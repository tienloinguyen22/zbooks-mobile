import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  coverContainer: {
    margin: 12,
    backgroundColor: colors.lightGrey,
    borderRadius: 4,
  },
  cover: {
    width: 200,
    height: 300,
    borderRadius: 4,
  },
  nameContainer: {
    marginVertical: 30,
  },
  author: {
    marginTop: 8,
  },
  greyTitle: {
    color: colors.grey,
    marginTop: 20,
    marginBottom: 12,
  },
  bookInfoContainer: {
    paddingRight: 12,
  },
  saveButtonContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  saveButton: {
    width: '100%',
  },
  saveIcon: {
    marginRight: 8,
  },
  saveText: {
    color: colors.white,
  },
});
