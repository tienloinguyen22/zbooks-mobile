import React, { useState } from 'react';
import { getLayout, commonStyles, showNotification, NotificationTypes } from '@app/core';
import Modal from 'react-native-modal';
import { View, Text, Button } from '@app/components';
import { authService, navigationService } from '@app/services';
import { persistor } from '@app/graphql';
import { styles } from './styles';

interface Props {
  visible: boolean;
  closeLogoutModal: () => void;
}

const layouts = getLayout();

export const LogoutModal = (props: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const { visible, closeLogoutModal } = props;

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);

      await authService.logout();
      await persistor.purge();
      navigationService.setRootLogin();
    } catch (error) {
      showNotification({
        type: NotificationTypes.ERROR,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      deviceWidth={layouts.deviceWidth}
      deviceHeight={layouts.deviceHeight}
      isVisible={visible}
      onBackButtonPress={closeLogoutModal}
      onBackdropPress={closeLogoutModal}
    >
      <View style={styles.container}>
        <Text h4 style={styles.title}>
          Logout
        </Text>
        <Text textCenter>You will be return to the Login screen</Text>

        <View row centerVertical spread style={styles.buttonsContainer}>
          <Button outline small style={commonStyles.boxShadow} onPress={closeLogoutModal} disabled={loading}>
            <Text>Cancel</Text>
          </Button>
          <Button small style={commonStyles.boxShadow} onPress={logout} disabled={loading}>
            <Text white>Logout</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
