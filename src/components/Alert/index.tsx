import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import { AlertContainer, AlertAction } from '../AlertContainer';

interface Props {
  title: string;
  message: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
  closeable?: boolean;
  actions?: AlertAction[];
  onPressCancel: () => void;
}
let alert: RootSiblings | undefined;
const show = ({
  type,
  title,
  message,
  closeable,
  actions,
  onPressCancel,
}: {
  type: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO';
  title: string;
  message: string;
  closeable?: boolean;
  actions?: AlertAction[];
  onPressCancel: () => void;
}): RootSiblings => {
  const props: Props = {
    title,
    message,
    closeable,
    actions,
    onPressCancel,
  };
  switch (type) {
    case 'INFO':
      props.info = true;
      break;
    case 'WARNING':
      props.warning = true;
      break;
    case 'SUCCESS':
      props.success = true;
      break;
    case 'ERROR':
      props.error = true;
      break;
    default:
      props.info = true;
      break;
  }
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
