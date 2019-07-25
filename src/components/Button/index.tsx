import React, { Component } from 'react';
import { Button as NativeBaseButton, NativeBase } from 'native-base';
import { addStyles } from '@app/core';
import { styles } from './styles';

interface Props extends NativeBase.Button {
  centerContent?: boolean;
  safeArea?: boolean;
  flex?: boolean;
}

export class Button extends Component<NativeBase.Button> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let buttonStyle = addStyles(styles.button, this.props.style);

    return (
      <NativeBaseButton {...this.props} style={buttonStyle}>
        {this.props.children}
      </NativeBaseButton>
    );
  }
}
