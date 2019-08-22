import React from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { combineStyles, colors, useTheme, THEME_DARK } from '@app/core';
import { Icon } from '@app/components/Icon';
import { Button } from '@app/components/Button';
import { useTranslation } from 'react-i18next';
import { View } from '../View';
import { styles } from './styles';
import { Text } from '../Text';

export interface AlertAction {
  title: string;
  onPress: () => void;
  special?: boolean;
}

interface Props extends ViewProps {
  title: string;
  message: string;
  info?: boolean;
  warning?: boolean;
  error?: boolean;
  success?: boolean;
  visible: boolean;
  actions?: AlertAction[];
  onPressCancel?: () => void;
}

export const AlertContainer = (props: Props): JSX.Element => {
  const { primaryColor, theme } = useTheme();
  const { t } = useTranslation();
  const normalTextStyle = {
    color: primaryColor,
  };
  const backgroundAlert = {
    backgroundColor: theme === THEME_DARK ? colors.lightBlack : colors.white,
  };
  const messageTextStyle = {
    color: theme === THEME_DARK ? colors.white : colors.black,
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
  if (props.visible) {
    return (
      <View style={styles.container}>
        <Modal isVisible={props.visible} onBackButtonPress={props.onPressCancel} onBackdropPress={props.onPressCancel}>
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
                      <Text style={item.special ? styles.textSpecial : normalTextStyle}>{item.title}</Text>
                    </Button>
                  );
                })}
              </View>
            )}
            {!props.actions && (
              <View style={styles.reserveContainer}>
                <Button onPress={props.onPressCancel} style={styles.buttonDialog}>
                  <Text style={styles.textSpecial}>{t('dialog.close')}</Text>
                </Button>
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  }
  return <View />;
};
