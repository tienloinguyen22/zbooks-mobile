import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ErrorText, Text } from '@app/components';
import { styles } from './styles';

interface Props {
  children?: ReactNode;
  error?: string;
  label?: string;
}

export const FormItem = (props: Props): JSX.Element => {
  return (
    <View style={styles.formItemContainer}>
      {props.label ? (
        <View style={styles.labelContainer}>
          <Text s2>{props.label}:</Text>
        </View>
      ) : (
        <></>
      )}

      {props.children}

      {props.error ? (
        <View style={styles.errorContainer}>
          <ErrorText>{props.error}</ErrorText>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};
