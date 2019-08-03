import Toast from 'react-native-root-toast';
import { colors } from '../themes/colors';

export const showNotification = ({
  type,
  message,
}: {
  type: 'success' | 'warning' | 'error';
  message: string;
}): void => {
  let backgroundColor: string;
  switch (type) {
    case 'error':
      backgroundColor = colors.red;
      break;
    case 'warning':
      backgroundColor = colors.yellow;
      break;
    default:
      backgroundColor = colors.green;
      break;
  }
  Toast.show(message, {
    position: Toast.positions.TOP,
    backgroundColor,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    duration: type === 'success' ? 1000 : Toast.durations.LONG,
  });
};
