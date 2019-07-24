import React, { Component } from 'react';
import { View as ReactNativeView, ViewProps } from 'react-native';
import { styles } from './styles';

interface Props extends ViewProps {
  centerContent?: boolean;
}

export class View extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let viewStyles = this.props.style;
    if (this.props.centerContent) {
      if (Array.isArray(this.props.style)) {
        viewStyles = [...this.props.style, styles.centerContent];
      } else {
        viewStyles = Object.assign({}, this.props.style, styles.centerContent);
      }
    }
    return (
      <ReactNativeView {...this.props} style={viewStyles}>
        {this.props.children}
      </ReactNativeView>
    );
  }
}
