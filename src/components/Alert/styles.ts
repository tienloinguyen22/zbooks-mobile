import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '@app/core';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: colors.red,
  },
  contentContainer: {},
  alertContainer: {
    width: (width * 2) / 3,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  lineGrey: {
    backgroundColor: colors.grey,
    height: 1,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 14,
    paddingVertical: 10,
    color: colors.white,
  },
  titleDefault: {
    backgroundColor: colors.primary,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
  },
  buttonDialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonOK: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  columnGrey: {
    width: 1,
    height: '100%',
    backgroundColor: colors.grey,
  },
  reserveContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
