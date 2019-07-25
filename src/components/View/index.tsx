import React, { Component } from 'react';
import { View as ReactNativeView, ViewProps, SafeAreaView } from 'react-native';
import { addStyles } from '@app/core';
import { styles } from './styles';

interface Props extends ViewProps {
  center?: boolean;
  centerVertical?: boolean;
  safeArea?: boolean;
  flex?: boolean;
}

export class View extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let viewStyle = addStyles(styles.default, this.props.style);
    viewStyle = this.props.center ? addStyles(viewStyle, styles.center) : viewStyle;
    viewStyle = this.props.centerVertical ? addStyles(viewStyle, styles.centerVertical) : viewStyle;

    if (!this.props.safeArea) {
      return (
        <ReactNativeView {...this.props} style={viewStyle}>
          {this.props.children}
        </ReactNativeView>
      );
    }

    return (
      <SafeAreaView style={styles.default}>
        <ReactNativeView {...this.props} style={viewStyle}>
          {this.props.children}
        </ReactNativeView>
      </SafeAreaView>
    );
  }
}
