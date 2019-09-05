import React, { useState } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, KeyboardTypeOptions } from 'react-native';
import { colors, THEME_DARK } from '@app/core';
import { useTheme } from '@app/hooks';
import { Tooltip } from '../Tooltip';
import { View } from '../View';
import { Text } from '../Text';
import { styles } from './styles';
import { ErrorText } from '../ErrorText';
import { Icon } from '../Icon';
import { Picker, PickerDataItem } from '../Picker';
import { Touchable } from '../Touchable';

interface Props {
  label: string;
  value: string;
  error?: boolean;
  success?: boolean;
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
  const { primaryColor, textColor, screenBackgroundColor, theme } = useTheme();
  let borderColor = primaryColor;
  if (props.error) {
    borderColor = colors.red;
  } else if (props.success) {
    borderColor = colors.green;
  }
  let tooltipBackgroundColor = colors.black;
  let tooltipTextColor = colors.white;
  if (theme === THEME_DARK) {
    tooltipBackgroundColor = colors.white;
    tooltipTextColor = colors.black;
  } else {
    tooltipBackgroundColor = colors.black;
    tooltipTextColor = colors.white;
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
    <View
      style={[
        styles.container,
        {
          backgroundColor: screenBackgroundColor,
        },
      ]}
    >
      <View
        row
        center
        style={{
          backgroundColor: screenBackgroundColor,
        }}
      >
        <Text
          bold
          style={[
            styles.label,
            {
              color: textColor,
            },
          ]}
        >
          {props.label}
        </Text>
        {props.hasTooltip && !!props.tooltipText && (
          <Tooltip
            width={props.tooltipWidth || 250}
            height={props.tooltipHeight || 50}
            backgroundColor={tooltipBackgroundColor}
            withOverlay={false}
            popover={
              <Text
                style={{
                  color: tooltipTextColor,
                }}
              >
                {props.tooltipText}
              </Text>
            }
          >
            <Icon name='information-outline' size={14} style={styles.tooltipIcon} color={textColor} />
          </Tooltip>
        )}
      </View>
      {(!props.type || props.type === 'text') && (
        <TextInput
          style={[
            styles.textInput,
            {
              borderColor,
              color: textColor,
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
                backgroundColor: screenBackgroundColor,
              },
            ]}
          >
            <Text
              style={[
                styles.pickerText,
                {
                  color: textColor,
                },
              ]}
            >
              {selectedItem ? selectedItem.text : ''}{' '}
            </Text>
          </View>
        </Touchable>
      )}
      {props.error && (
        <ErrorText
          style={[
            styles.error,
            {
              color: colors.red,
            },
          ]}
        >
          {props.errorMessage}
        </ErrorText>
      )}
    </View>
  );
};
