import React from 'react';
import { ViewProps, TouchableOpacity, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { combineStyles, colors } from '@app/core';
import { Icon } from '@app/components/Icon';
import { Button } from '@app/components/Button';
import { View } from '../View';
import { styles } from './styles';
import { Text } from '../Text';
import { useTranslation } from '../../../node_modules/react-i18next';

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
  visible: boolean;
  actions?: AlertAction[];
  onPressCancel?: () => void;
}

export const AlertContainer = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const titleContainer = combineStyles<ViewStyle>(
    styles.titleDefault,
    props.info && {
      backgroundColor: colors.primary,
    },
    props.warning && {
      backgroundColor: colors.orange1,
    },
    props.error && {
      backgroundColor: colors.red,
    },
  );
  let titleStr = '';
  if (props.title) {
    titleStr = props.title;
  } else if (props.info) {
    titleStr = t('dialog.info');
  } else if (props.warning) {
    titleStr = t('dialog.warning');
  } else if (props.error) {
    titleStr = t('dialog.error');
  }
  if (props.visible) {
    return (
      <View style={styles.container}>
        <Modal isVisible={props.visible} onBackButtonPress={props.onPressCancel} onBackdropPress={props.onPressCancel}>
          <View style={styles.alertContainer}>
            <View style={titleContainer}>
              {props.info && <Icon name={'information-outline'} color={colors.white} size={25} />}
              {props.warning && <Icon name={'alert-circle-outline'} color={colors.white} size={25} />}
              {props.error && <Icon name={'alert-outline'} color={colors.white} size={25} />}
              <Text style={styles.titleText}>{titleStr}</Text>
              <View style={styles.dialogIcon} />
            </View>
            <Text style={styles.messageText}>{props.message}</Text>
            {props.actions && (
              <View style={styles.buttonContainer}>
                {props.actions.map((item) => {
                  return (
                    <Button
                      outline={!item.special}
                      onPress={item.onPress}
                      key={item.title}
                      style={styles.buttonDialogOutline}
                    >
                      <Text style={item.special ? styles.textSpecial : styles.textNormal}>{item.title}</Text>
                    </Button>
                  );
                })}
              </View>
            )}
            {!props.actions && (
              <View style={styles.reserveContainer}>
                <TouchableOpacity style={styles.buttonClose} onPress={props.onPressCancel}>
                  <Text style={styles.textSpecial}>{t('dialog.close')}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  }
  return <View />;
};
