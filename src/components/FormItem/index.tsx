import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { ErrorText } from '@app/components';
import { styles } from './styles';

interface Props {
  children?: ReactNode;
  error?: string;
}

export const FormItem = (props: Props): JSX.Element => {
  return (
    <View style={styles.formItemContainer}>
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
