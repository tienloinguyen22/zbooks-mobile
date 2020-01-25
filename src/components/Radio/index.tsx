import React from 'react';
import { Touchable, View, Text } from '@app/components';
import { colors } from '@app/core';
import { styles } from './styles';

interface Props {
  value: string;
  label: string;
  isActive: boolean;
  onSelect: (value: string) => void;
}

export const Radio = (props: Props): JSX.Element => {
  return (
    <Touchable onPress={() => props.onSelect(props.value)}>
      <View row spread centerVertical style={styles.container}>
        <Text>{props.label}</Text>
        <View
          style={[
            styles.outerCircle,
            {
              borderColor: props.isActive ? colors.primaryColor : colors.grey,
            },
          ]}
          column
          centerVertical
          center
        >
          {props.isActive ? <View style={styles.innerCircle} /> : <></>}
        </View>
      </View>
    </Touchable>
  );
};
