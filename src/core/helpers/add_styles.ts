import { ViewStyle, StyleProp } from 'react-native';

export const addStyles = (sourceStyle: StyleProp<ViewStyle>, newStyle: StyleProp<ViewStyle>): StyleProp<ViewStyle> => {
  if (!newStyle) {
    return sourceStyle;
  }

  let style = sourceStyle;
  if (Array.isArray(sourceStyle)) {
    if (Array.isArray(newStyle)) {
      style = [...sourceStyle, ...newStyle];
    } else {
      style = [...sourceStyle, newStyle];
    }
  } else {
    if (Array.isArray(newStyle)) {
      style = [sourceStyle, ...newStyle];
    } else {
      style = Object.assign({}, sourceStyle, newStyle);
    }
  }
  return style;
};
