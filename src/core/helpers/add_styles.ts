import { ViewStyle, StyleProp, TextStyle } from 'react-native';

type AddStyles = <T extends ViewStyle | TextStyle>(
  sourceStyle: StyleProp<T>,
  newStyle: StyleProp<T>,
  shouldAdd?: boolean,
) => StyleProp<T>;

export interface AddedStyle<T> {
  style: StyleProp<T>;
  shouldAdd?: boolean;
}

export const addStyles: AddStyles = (sourceStyle, newStyle, shouldAdd) => {
  if (!newStyle || !shouldAdd) {
    return sourceStyle;
  }

  let style = sourceStyle;
  if (Array.isArray(sourceStyle)) {
    if (Array.isArray(newStyle)) {
      style = [...sourceStyle, ...newStyle];
    } else {
      style = [...sourceStyle, newStyle];
    }
  } else if (Array.isArray(newStyle)) {
    style = [sourceStyle, ...newStyle];
  } else {
    style = Object.assign({}, sourceStyle, newStyle);
  }
  return style;
};
