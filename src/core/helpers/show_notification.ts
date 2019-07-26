import { colors } from '../themes/colors';
import Toast from 'react-native-root-toast';

export const showNotification = ({ type, message }: { type: 'success' | 'warning' | 'error'; message: string }) => {
  const backgroundColor = type === 'error' ? colors.red : type === 'warning' ? colors.yellow : colors.green;
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
