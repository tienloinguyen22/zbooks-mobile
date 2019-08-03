import React from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { colors } from '@app/core';
import { Tooltip } from '../Tooltip';
import { View } from '../View';
import { Text } from '../Text';
import { Label } from '../Label';
import { styles } from './styles';
import { ErrorText } from '../ErrorText';
import { Icon } from '../Icon';

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
}

export const Field = (props: Props): JSX.Element => {
  let borderColor = colors.grey;
  if (props.showError) {
    borderColor = colors.red;
  } else if (props.showSuccess) {
    borderColor = colors.green;
  }

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
            popover={<Text style={{ color: colors.white }}>{props.tooltipText}</Text>}
          >
            <Icon name='information-outline' size={14} style={styles.tooltipIcon} />
          </Tooltip>
        )}
      </View>
      <TextInput
        style={[styles.textInput, { borderColor }]}
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        secureTextEntry={props.secureTextEntry}
      />
      {props.showError && <ErrorText style={styles.error}>{props.errorMessage}</ErrorText>}
    </View>
  );
};
