import { colors } from '@app/core';
import { Toast } from '@app/components';

export const showNotification = ({ type, message }: { type: 'success' | 'warning' | 'error'; message: string }) => {
  const backgroundColor = type === 'error' ? colors.red : type === 'warning' ? colors.yellow : colors.green;
  Toast.show({
    text: message,
    duration: 1000,
    position: 'top',
    style: {
      backgroundColor,
    },
  });
};
