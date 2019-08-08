import React, { useState } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, KeyboardTypeOptions } from 'react-native';
import { colors } from '@app/core';
import { Tooltip } from '../Tooltip';
import { View } from '../View';
import { Text } from '../Text';
import { Label } from '../Label';
import { styles } from './styles';
import { ErrorText } from '../ErrorText';
import { Icon } from '../Icon';
import { Picker, PickerDataItem } from '../Picker';
import { Touchable } from '../Touchable';

interface Props {
  label: string;
  value: string;
  showError?: boolean;
  showSuccess?: boolean;
  errorMessage?: string;
  hasTooltip?: boolean;
  tooltipHeight?: number;
  tooltipWidth?: number;
  tooltipText?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
  type?: 'text' | 'picker' | 'datepicker';
  pickerDataSources?: PickerDataItem<string>[];
  keyboardType?: KeyboardTypeOptions;
}

export const Field = (props: Props): JSX.Element => {
  let borderColor = colors.grey;
  if (props.showError) {
    borderColor = colors.red;
  } else if (props.showSuccess) {
    borderColor = colors.green;
  }

  let initialItem: PickerDataItem<string> | undefined;
  if (props.pickerDataSources) {
    initialItem = props.pickerDataSources.find((item) => item.value === props.value);
  }
  const [selectedItem, setSelectedItem] = useState<PickerDataItem<string> | undefined>(initialItem);

  const openPicker = (): void => {
    if (!props.pickerDataSources) {
      return;
    }
    Picker.show({
      dataSources: props.pickerDataSources,
      initialValue: props.value,
      onValueChanged: (value, item) => {
        setSelectedItem(item);
        props.onChangeText && props.onChangeText(value);
      },
    });
  };

  return (
    <View style={styles.container}>
      <View row center>
        <Label style={styles.label}>{props.label}</Label>
        {props.hasTooltip && !!props.tooltipText && (
          <Tooltip
            width={props.tooltipWidth || 250}
            height={props.tooltipHeight || 50}
            backgroundColor={colors.black}
            withOverlay={false}
            popover={
              <Text
                style={{
                  color: colors.white,
                }}
              >
                {props.tooltipText}
              </Text>
            }
          >
            <Icon name='information-outline' size={14} style={styles.tooltipIcon} />
          </Tooltip>
        )}
      </View>
      {(!props.type || props.type === 'text') && (
        <TextInput
          style={[
            styles.textInput,
            {
              borderColor,
            },
          ]}
          value={props.value}
          onChangeText={props.onChangeText}
          onBlur={props.onBlur}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
        />
      )}
      {props.type === 'picker' && (
        <Touchable onPress={openPicker}>
          <View
            style={[
              styles.textInput,
              {
                borderColor,
              },
            ]}
          >
            <Text style={styles.pickerText}>{selectedItem ? selectedItem.text : ''} </Text>
          </View>
        </Touchable>
      )}
      {props.showError && <ErrorText style={styles.error}>{props.errorMessage}</ErrorText>}
    </View>
  );
};
