import { ViewStyle, StyleProp, TextStyle } from 'react-native';

export type CombineStylesParam<T> = false | StyleProp<T>;
export const combineStyles = <T extends ViewStyle | TextStyle>(...arg: CombineStylesParam<T>[]): StyleProp<T> =>
  arg.reduce((style, nextStyle) => {
    if (!nextStyle) {
      return style;
    }

    let mergedStyle = style;
    if (Array.isArray(style)) {
      if (Array.isArray(nextStyle)) {
        mergedStyle = [...style, ...nextStyle];
      } else {
        mergedStyle = [...style, nextStyle];
      }
    } else if (Array.isArray(nextStyle)) {
      mergedStyle = [style, ...nextStyle];
    } else {
      mergedStyle = Object.assign({}, style, nextStyle);
    }
    return mergedStyle;
  });
