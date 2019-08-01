import React, { Component } from 'react';
import { View as ReactNativeView, ViewProps } from 'react-native';
import { addStyles } from '@app/core';
import { styles } from './styles';

interface Props extends ViewProps {
  flex?: boolean;
  center?: boolean;
  centerVertical?: boolean;
  row?: boolean;
  column?: boolean;
  rowReverse?: boolean;
  columnReverse?: boolean;
}

export class View extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let viewStyle = addStyles(styles.default, this.props.style);
    viewStyle = this.props.flex ? addStyles(viewStyle, styles.flex) : viewStyle;
    viewStyle = this.props.center ? addStyles(viewStyle, styles.center) : viewStyle;
    viewStyle = this.props.centerVertical ? addStyles(viewStyle, styles.centerVertical) : viewStyle;
    viewStyle = this.props.row ? addStyles(viewStyle, styles.row) : viewStyle;
    viewStyle = this.props.column ? addStyles(viewStyle, styles.column) : viewStyle;
    viewStyle = this.props.rowReverse ? addStyles(viewStyle, styles.rowReverse) : viewStyle;
    viewStyle = this.props.columnReverse ? addStyles(viewStyle, styles.columnReverse) : viewStyle;

    return (
      <ReactNativeView {...this.props} style={viewStyle}>
        {this.props.children}
      </ReactNativeView>
    );
  }
}
