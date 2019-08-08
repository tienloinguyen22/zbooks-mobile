import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },
  textInput: {
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  error: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  tooltipIcon: {
    margin: 8,
  },
  pickerText: {
    color: colors.black,
    fontSize: 20,
  },
});
