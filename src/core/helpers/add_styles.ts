import { ViewStyle, StyleProp, TextStyle } from 'react-native';

export const addStyles = <T extends ViewStyle | TextStyle>(
  sourceStyle: StyleProp<T>,
  newStyle: StyleProp<T>,
): StyleProp<T> => {
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
