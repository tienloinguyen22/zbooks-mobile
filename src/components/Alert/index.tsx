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
let alert: RootSiblings | undefined;
class Alert extends Component {
  public static show = (props: Props): RootSiblings => {
    alert = new RootSiblings(<AlertContainer {...props} />);
    return alert;
  };

  public static hide = (): void => {
    alert && alert.destroy();
  };
}

export default Alert;
