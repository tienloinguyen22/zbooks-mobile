import React, { ReactNode } from 'react';
import { combineStyles } from '@app/core';
import { useTheme } from '@app/hooks';
import { ViewProps } from 'react-native';
import { Touchable } from '@app/components/Touchable';
import { styles } from './styles';

interface Props extends ViewProps {
  children?: ReactNode;
  transparent?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  width?: number;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
  onPress: () => void;
}

export const Button = (props: Props): JSX.Element => {
  const { primaryColor } = useTheme();
  const rounded = props.rounded !== false;
  const style = combineStyles(
    styles.default,
    {
      backgroundColor: primaryColor,
      width: props.width ? props.width : 200,
    },
    props.style,
    props.transparent && styles.transparent,
    props.disabled && styles.disabled,
    props.success && styles.success,
    props.info && styles.info,
    props.warning && styles.warning,
    props.danger && styles.danger,
    rounded && styles.rounded,
  );
  const boldStyle = {
    fontWeight: 'bold',
  };
  const addedStyle = {
    style: boldStyle,
    numberOfLines: 1,
  };
  const childrenWithProps = React.Children.map(props.children, (child) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    child ? React.cloneElement(child as any, addedStyle) : child,
  );
  // work around to re-render component after changing state
  return (
    <>
      <Touchable {...props} style={style}>
        {childrenWithProps}
      </Touchable>
    </>
  );
};
