import React from 'react';
import { View, Text, Icon, Touchable } from '@app/components';
import { ViewStyle } from 'react-native';
import { combineStyles } from '@app/core';
import { styles } from './styles';

interface Props {
  title: string;
  showTopBorder?: boolean;
  showArrow?: boolean;
  onPress: () => void;
}

export const SettingMenuItem = (props: Props): JSX.Element => {
  const { title, onPress, showTopBorder, showArrow } = props;

  const style = combineStyles<ViewStyle>(styles.menuItemContainer, showTopBorder && styles.borderTop);

  return (
    <Touchable onPress={onPress}>
      <View centerVertical row style={style}>
        <Text>{title}</Text>
        {showArrow ? <Icon name='chevron-right' size={24} /> : <View />}
      </View>
    </Touchable>
  );
};
