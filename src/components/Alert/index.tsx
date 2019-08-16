import React, { Component } from 'react';
import { ViewProps } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { AlertContainer, AlertAction } from '../AlertContainer';

interface Props extends ViewProps {
  title: string;
  message: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  visible: boolean;
  actions?: AlertAction[];
  onPressCancel?: () => void;
}
const elements: RootSiblings[] = [];
class Alert extends Component {
  public static show = (props: Props): RootSiblings => {
    const alert = new RootSiblings(<AlertContainer {...props} />);
    elements.push(alert);
    return alert;
  };

  public static hide = (): void => {
    const lastSibling = elements.pop();
    lastSibling && lastSibling.destroy();
  };
}

export default Alert;
