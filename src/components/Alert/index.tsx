import React from 'react';
import { ViewProps } from 'react-native';
import RootSiblings from 'react-native-root-siblings';
import { AlertContainer, AlertAction } from '../AlertContainer';

interface Props extends ViewProps {
  title: string;
  message: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
  visible: boolean;
  actions?: AlertAction[];
  onPressCancel: () => void;
}
let alert: RootSiblings | undefined;
const show = (props: Props): RootSiblings => {
  alert = new RootSiblings(<AlertContainer {...props} />);
  return alert;
};

const hide = (): void => {
  alert && alert.destroy();
};

export const Alert = {
  show,
  hide,
};
