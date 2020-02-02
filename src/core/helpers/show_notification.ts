import Toast from 'react-native-root-toast';
import { colors } from '../themes/colors';

export enum NotificationTypes {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export const showNotification = ({ type, message }: { type: NotificationTypes; message: string }): void => {
  let textColor: string;
  switch (type) {
    case NotificationTypes.ERROR:
      textColor = colors.red;
      break;
    case NotificationTypes.WARNING:
      textColor = colors.orange;
      break;
    default:
      textColor = colors.primaryColor;
      break;
  }

  Toast.show(message, {
    position: 80,
    textColor,
    backgroundColor: colors.white,
    opacity: 1,
    shadow: true,
    shadowColor: colors.shadow,
    animation: true,
    hideOnPress: true,
    delay: 0,
    duration: type === 'SUCCESS' ? 1000 : Toast.durations.LONG,
  });
};
