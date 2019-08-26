import React from 'react';
import { ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { combineStyles, colors, THEME_DARK } from '@app/core';
import { Icon } from '@app/components/Icon';
import { Button } from '@app/components/Button';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@app/hooks';
import { View } from '../View';
import { styles } from './styles';
import { Text } from '../Text';

export interface AlertAction {
  title: string;
  onPress: () => void;
  special?: boolean;
}

interface Props {
  title: string;
  message: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
  actions?: AlertAction[];
  onPressCancel: () => void;
  closeable?: boolean;
}

export const AlertContainer = (props: Props): JSX.Element => {
  const { primaryColor, theme } = useTheme();
  const { t } = useTranslation();
  const backgroundAlert = {
    backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
  };
  const messageTextStyle = {
    color: theme === THEME_DARK ? colors.white : colors.black,
  };
  const clickOutsideModal = (): void => {
    if (props.closeable !== false) {
      props.onPressCancel();
    }
  };
  const titleContainer = combineStyles<ViewStyle>(
    styles.titleDefault,
    {
      backgroundColor: primaryColor,
    },
    props.info && {
      backgroundColor: primaryColor,
    },
    props.warning && {
      backgroundColor: colors.orange,
    },
    props.error && {
      backgroundColor: colors.red,
    },
    props.success && {
      backgroundColor: colors.green,
    },
  );
  let titleStr = t('dialog.info');
  if (props.title) {
    titleStr = props.title;
  } else if (props.info) {
    titleStr = t('dialog.info');
  } else if (props.warning) {
    titleStr = t('dialog.warning');
  } else if (props.error) {
    titleStr = t('dialog.error');
  } else if (props.success) {
    titleStr = t('dialog.success');
  }
  let iconName = 'information-outline';
  if (props.warning) {
    iconName = 'alert-circle-outline';
  } else if (props.error) {
    iconName = 'alert-outline';
  } else if (props.success) {
    iconName = 'check';
  }
  return (
    <View style={styles.container}>
      <Modal isVisible={true} onBackButtonPress={clickOutsideModal} onBackdropPress={clickOutsideModal}>
        <View style={[styles.alertContainer, backgroundAlert]}>
          <View style={titleContainer}>
            <Icon name={iconName} color={colors.white} size={25} />
            <Text style={styles.titleText}>{titleStr}</Text>
            <View style={styles.dialogIcon} />
          </View>
          <Text style={[styles.messageText, messageTextStyle]}>{props.message}</Text>
          {props.actions && (
            <View style={styles.buttonContainer}>
              {props.actions.map((item) => {
                return (
                  <Button outline={!item.special} onPress={item.onPress} key={item.title} style={styles.buttonDialog}>
                    <Text white={item.special} primary={!item.special}>
                      {item.title}
                    </Text>
                  </Button>
                );
              })}
            </View>
          )}
          {!props.actions && (
            <View style={styles.reserveContainer}>
              <Button onPress={props.onPressCancel} style={styles.buttonDialog}>
                <Text white>{t('dialog.close')}</Text>
              </Button>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};
