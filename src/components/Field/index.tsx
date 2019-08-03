import React from 'react';
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { colors } from '@app/core';
import { View } from '../View';
import { Label } from '../Label';
import { styles } from './styles';
import { ErrorText } from '../ErrorText';

interface Props {
  label: string;
  value: string;
  showError?: boolean;
  errorMessage?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  secureTextEntry?: boolean;
}

export const Field = (props: Props): JSX.Element => (
  <View style={styles.container}>
    <Label style={styles.label}>{props.label}</Label>
    <TextInput
      style={[styles.textInput, { borderColor: props.showError ? colors.red : colors.grey }]}
      value={props.value}
      onChangeText={props.onChangeText}
      onBlur={props.onBlur}
      secureTextEntry={props.secureTextEntry}
    />
    {props.showError && <ErrorText style={styles.error}>{props.errorMessage}</ErrorText>}
  </View>
);
