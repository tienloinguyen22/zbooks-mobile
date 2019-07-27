import React, { Component } from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
} from 'react-native';

type Props = TouchableOpacityProps | TouchableNativeFeedbackProps;

export class Touchable extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    debugger;
    if (Platform.OS === 'ios') {
      return <TouchableOpacity onPress={this.props.onPress}>{this.props.children}</TouchableOpacity>;
    }

    return <TouchableNativeFeedback onPress={this.props.onPress}>{this.props.children}</TouchableNativeFeedback>;
  }
}
