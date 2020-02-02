import React from 'react';
import { Image, ImageStyle, ImageSourcePropType } from 'react-native';
import { styles } from './styles';

interface Props {
  source: ImageSourcePropType;
  styles?: ImageStyle;
}

export const ImageIcon = (props: Props): JSX.Element => {
  const iconStyles = {
    ...styles.iconSize,
    ...(props.styles ? props.styles : {}),
  };

  return <Image style={iconStyles} source={props.source} resizeMode='contain' />;
};
