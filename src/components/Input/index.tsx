import React, { ReactNode } from 'react';
import { TextInput, ViewStyle, TextInputProps } from 'react-native';
import { combineStyles, colors } from '@app/core';
import { View, Icon } from '@app/components';
import { styles } from './styles';

type Props = {
  addonBefore?: ReactNode;
  icon?: string;
} & TextInputProps;

const Input = (props: Props): JSX.Element => {
  const style = combineStyles<ViewStyle>(styles.default, props.style);

  if (props.addonBefore) {
    return (
      <View style={style} row centerVertical>
        {props.addonBefore}

        <View style={styles.rightContent} row centerVertical>
          {props.icon ? <Icon name={props.icon} color={colors.grey} size={20} style={styles.icon} /> : <></>}
          <TextInput {...props} />
        </View>
      </View>
    );
  }

  return (
    <View style={style} row centerVertical>
      {props.icon ? <Icon name={props.icon} color={colors.grey} size={20} style={styles.icon} /> : <></>}
      <TextInput {...props} />
    </View>
  );
};

export { Input };
