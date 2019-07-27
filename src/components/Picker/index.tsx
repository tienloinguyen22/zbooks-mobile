import RNPicker, { PickerOptions } from 'react-native-picker';
import i18next from 'i18next';
import colorConvert from 'color-convert';
import { colors } from '@app/core';

const primaryColorHexArr = [...colorConvert.hex.rgb(colors.primary), 1];
const whiteColorHexArr = [...colorConvert.hex.rgb(colors.white), 1];

export const Picker = {
  show: (options: PickerOptions) => {
    const pickerOptions: PickerOptions = {
      pickerConfirmBtnText: i18next.t('common.confirm'),
      pickerCancelBtnText: i18next.t('common.cancel'),
      pickerTitleText: i18next.t('common.select'),
      pickerBg: whiteColorHexArr,
      pickerFontColor: primaryColorHexArr,
      pickerToolBarBg: primaryColorHexArr,
      pickerTitleColor: whiteColorHexArr,
      pickerCancelBtnColor: whiteColorHexArr,
      pickerConfirmBtnColor: whiteColorHexArr,
      ...options,
    };
    RNPicker.init(pickerOptions);
    RNPicker.show();
  },
  hide: RNPicker.hide,
  isPickerShow: RNPicker.isPickerShow,
  select: RNPicker.select,
  toggle: RNPicker.toggle,
};
