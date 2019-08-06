import RNPicker, { PickerOptions } from 'react-native-picker';
import i18next from 'i18next';
import colorConvert from 'color-convert';
import { colors } from '@app/core';

const primaryColorHexArr = [...colorConvert.hex.rgb(colors.primary), 1];
const whiteColorHexArr = [...colorConvert.hex.rgb(colors.white), 1];

interface PickerDataItem<T> {
  value: T;
  text: string;
}
interface PickerParams<T> {
  dataSources: PickerDataItem<T>[];
  initialValue?: T;
  onValueChanged: (value: T) => void;
}

const show: <T>(options: PickerParams<T>) => void = (options) => {
  const { onValueChanged, dataSources, initialValue } = options;
  if (!dataSources) {
    return;
  }

  const pickerData = options.dataSources ? options.dataSources.map((data) => data.text) : undefined;
  const onPickerConfirm = (selectedItems: string[]): void => {
    if (!onValueChanged) {
      return;
    }
    const selectedText = selectedItems[0];
    const selectedItem = dataSources.find((data) => data.text === selectedText);
    selectedItem && selectedItem.value !== initialValue && onValueChanged(selectedItem.value);
  };
  const selectedItem = dataSources.find((data) => data.value === initialValue);
  let selectedValue: string[] | undefined;
  if (selectedItem) {
    selectedValue = [selectedItem.text];
  }
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
    pickerData,
    onPickerConfirm,
    selectedValue,
  };
  RNPicker.init(pickerOptions);
  RNPicker.show();
};

export const Picker = {
  show,
  hide: RNPicker.hide,
  isPickerShow: RNPicker.isPickerShow,
  select: RNPicker.select,
  toggle: RNPicker.toggle,
};
